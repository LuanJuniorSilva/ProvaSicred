import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
	name: 'formatDate'
})
export class FormatarData implements PipeTransform {
	transform(data: any): any{

		let novaData: any;
		let num: any = /[^0-9]/;

		if(!num.test(data)){
			novaData = parseInt(data)
		}else{
			novaData = data;
		}

		return moment(new Date(novaData)).format('DD/MM/YYYY');
	}
}