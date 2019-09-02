import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './acesso/usuario.model';


import * as firebase from 'firebase';

@Injectable()
export class Autenticacao {

	public token_id: string;
	private msg: string;

	constructor(private router: Router){
		if(localStorage.getItem('idToken')){
			this.router.navigate(['/home']);
		}		
	}

	public cadastrarUsuario(usuario: Usuario): Promise<any> {
		return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
		.then((resposta: any) => {
			delete usuario.senha;
			//btoa criptografa em bas64
			//atob descriptografa em bas64

			//firebase.auth().onAuthStateChanged((user) => {
			//	if(user){
					//firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
					//.set(usuario);
					firebase.database().ref('usuarios').child(firebase.database().ref('usuarios').push().key).set(usuario);
			//	}
			//})
		}).catch((error: Error) => {
			console.error('Erro: '+error)
			return error.message;
		})
	}

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
			this.msg = error.message;
		})

		return this.msg;
	}

	public autenticado(): boolean {
		if(this.token_id === undefined && localStorage.getItem('idToken') !== null){
			this.token_id = localStorage.getItem('idToken');
		}

		if(this.token_id === undefined){
			this.router.navigate(['/']);
		}

		return this.token_id !== undefined;
	}

	public sair(): void {
		firebase.auth().signOut().then(() => {
			localStorage.removeItem('idToken');
			this.token_id = undefined;
			//this.router.navigate(['/login']);
		});
	}

	
}