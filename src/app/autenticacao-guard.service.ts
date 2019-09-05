import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Autenticacao } from './autenticacao.service';

/*
 * Classe para proteger a rotas
*/
@Injectable()
export class AutenticacaoGuard implements CanActivate {

	constructor(private autenticacao: Autenticacao){}

	canActivate(): boolean {
		return this.autenticacao.autenticado();
	}
}