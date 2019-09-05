import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dragoes } from './shared/dragoes.model';
import { URL_API } from './app.api';
import { Observable } from 'rxjs';

import { map, retry } from 'rxjs/operators';
import { Response } from 'selenium-webdriver/http';

@Injectable()
export class DragoesService {

	constructor(private http: HttpClient){}

	/*
	*  Metodo para listar todos os dragões
	*/

	public listarDragoes(): Observable<Dragoes[]> {
		return this.http.get<Dragoes>(URL_API).pipe(
            retry(10),
            map((respota: any) => respota)
        );
	}

	/*
	*  Metodo para alterar dragão
	* Obs: Adicionado o headers para fazer a alteração
	*/

	public atualizarDragao(dragao: Dragoes, id: number): Observable<Dragoes>{

		let headers = new HttpHeaders({
            'Content-Type': 'application/json'
         });

         let options = {
            headers: headers
         };

		return this.http.put<Dragoes>(`${URL_API}/${id}`, dragao, options);
	}

	/*
	*  Metodo para inserir dragão
	* Obs: Adicionado o headers para fazer a inserção
	*/

	public inserirDragao(dragao: Dragoes): Observable<Dragoes>{
		let headers = new HttpHeaders({
            'Content-Type': 'application/json'
         });

         let options = {
            headers: headers
		 };
		 
		return this.http.post<Dragoes>(URL_API, dragao, options);
	}

	/*
	*  Metodo para excluir o dragão
	*/
	public deletarItem(id: number): Observable<Dragoes>{
		return this.http.delete<Dragoes>(`${URL_API}/${id}`);
	}

}