import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'formatDate'
})
export class DescricaoReduzida implements PipeTransform {
	transform(data: any): Date{
		

		return new Date(data);
	}
}