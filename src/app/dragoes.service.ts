import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dragoes } from './shared/dragoes.model';
import { URL_API } from './app.api';
import { Observable } from 'rxjs';

import { map, retry } from 'rxjs/operators';
import { Response } from 'selenium-webdriver/http';

@Injectable()
export class DragoesService {

	constructor(private http: HttpClient){}

	public listarDragoes(): Observable<Dragoes[]> {
		return this.http.get(URL_API).pipe(
            retry(10),
            map((respota: any) => respota)
        );
	}

}