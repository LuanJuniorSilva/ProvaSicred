import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'formatDate'
})
export class FormatarData implements PipeTransform {
	transform(data: any): any{

		let novaData: any;
		let num: any = /[^0-9]/;

		if(!num.test(data)){//Se a data vir de tipo TimeStamp irá converter em números inteiros
			novaData = parseInt(data)
		}else{//Caso venha de tipo string normal não fazer nada, pois vai ser manipulado pelo moment
			novaData = data;
		}

		return moment(new Date(novaData)).format('DD/MM/YYYY');
	}
}