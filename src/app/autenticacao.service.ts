import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './acesso/usuario.model';


import * as firebase from 'firebase';

@Injectable()
export class Autenticacao {

	public token_id: string;
	private msg: string;

	constructor(private router: Router){
		//Verificando se o idToken existe, caso exista ele entra na página home.
		if(localStorage.getItem('idToken')){
			this.router.navigate(['/home']);
		}		
	}

	/*
	* Metodo para autenticar o usuário
	* A autenticação é feita pelo firebase e sua mensagem de erro em inglês é trocada por outra em portugues
	* Após retornar sucesso é setado o idToken no atributo da classe e criado uma SessionStorage
	* Após setar o token é feito um redirect para a rota Home
	*/

	public async autenticar(email: string, senha: string): Promise<string> {
		await firebase.auth().signInWithEmailAndPassword(email, senha)
		.then((resposta: any) => {
			firebase.auth().currentUser.getIdToken()
			.then((idToken: string) => {
				this.token_id = idToken;
				localStorage.setItem('idToken', idToken);
				this.router.navigate(['/home']);
			});
		})
		.catch((error: Error) => {
			console.error('Erro: '+error);
			// this.msg = this.mensagemErro(error.code);
		})

		return this.msg;
	}

	/*
	* Metodo para verificar se o usuário está logado
	* esse método adiciona o idToken na classe verificando se tem um item na SessionStorage que fica gravado no navegador
	* Forçando para o usuário continuar logado
	*/

	public autenticado(): boolean {
		if(this.token_id === undefined && localStorage.getItem('idToken') !== null){
			this.token_id = localStorage.getItem('idToken');
		}

		if(this.token_id === undefined){
			this.router.navigate(['/']);
		}

		return this.token_id !== undefined;
	}

	/*
	* Metodo para fazer logout/logoff da tela inicial
	* esse método remove o idToken da classe e da SessionStorage que fica gravado no browser
	* Obs: foi comentado o redirecionamento da rota pois dependendo da versão do Angular ele já faz o redirect
	*/

	public sair(): void {
		firebase.auth().signOut().then(() => {
			localStorage.removeItem('idToken');
			this.token_id = undefined;
			//this.router.navigate(['/login']);
		});
	}

	/*
	* Metodo privado para mostrar uma mensagem de erro em português de acordo com seu código.
	*/
	private mensagemErro(codigo: string): string {
		let msg: string = '';
		switch (codigo) {
			case "auth/user-not-found":
				msg = 'Usuário não encontrado';
				break;
			
			case "auth/wrong-password":
				msg = 'Usuário ou senha invalida.';
				break;

			default:
				msg = '';
				break;
		}

		return msg;
	}

	
}