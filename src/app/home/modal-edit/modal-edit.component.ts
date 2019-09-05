import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DragoesService } from '../../dragoes.service';
import { FormGroup } from '@angular/forms';
import { Dragoes } from '../../shared/dragoes.model';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css'],
  providers: [ DragoesService ]
})

export class ModalEditComponent implements OnInit {

  @ViewChild('closeModal', {static: false}) closeModal: ElementRef;//captura o valor closeModal da view da home
  @Input() private listaDragoes: Dragoes[];//captura o valor listaDragoes da view da home
  @Input() private list: Dragoes;//captura o valor list da view da home

  @Input() public formulario: FormGroup;//captura o valor do formulario da view da home

  constructor(private dragoesService: DragoesService) { }

  ngOnInit() {}

  /*
  * Método que o serviço e o metodo de cadastrar dragão
  */

  public cadastrarDragao(): void {
    let {name, type} = this.formulario.value;

    if(this.formulario.status !== 'VALID'){
      if(!name || this.formulario.get('name').status !== 'VALID') this.formulario.get('name').markAsTouched();
      if(!type) this.formulario.get('type').markAsTouched();
    }else{
      let dragao: Dragoes = new Dragoes(null, new Date().toString(),name,type, []);
    
      this.dragoesService.inserirDragao(dragao).subscribe((dragao: Dragoes) => {
        this.listaDragoes.push(dragao);
        this.sort(this.listaDragoes);
        this.formulario.reset();
        
        this.closeModal.nativeElement.click()
      });
    }
  }

  /*
  * Método para ordenar o array de Dragões
  */

  private sort(array: Dragoes[]): void {
    array.sort((a: any,b: any) => {
      if(a.name > b.name) return 1;
      if(a.name < b.name) return -1;

      return 0;
    });
  }

  /*
  * Método que o serviço e o metodo de atualizar dragão
  */

   public atualizarDragoes(): void{
    
    let {name, type} = this.formulario.value;

    if(this.formulario.controls.name.pristine){
      name = this.list.name;
    }

    if(this.formulario.controls.type.pristine){      
      type = this.list.type;
    }

    if(!name || !type){
      if(!name)this.formulario.get('name').markAsTouched();
      if(!type)this.formulario.get('type').markAsTouched();
    }else{

      this.list.name = name;
      this.list.type = type;

      this.dragoesService.atualizarDragao(this.list, this.list.id).subscribe(() => {
        this.closeModal.nativeElement.click()
      });
    }
  }

}
