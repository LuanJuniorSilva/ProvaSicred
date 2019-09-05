import { Component, OnInit, Directive, Renderer2, ElementRef, ViewChild  } from '@angular/core';
import { Autenticacao } from '../autenticacao.service';
import { DragoesService } from '../dragoes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Dragoes } from '../shared/dragoes.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ DragoesService ]
})

@Directive({
  selector: '[appModalClose]'
})

export class HomeComponent implements OnInit {
  public listaDragoes: any;
  private idSelecionado: number;
  public list: any;
  public formulario: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(120)]),
    'type': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(80)])
  });

   @ViewChild('closeModal', {static: false}) closeModal: ElementRef
   @ViewChild('closeModalDel', {static: false}) closeModalDel: ElementRef

  constructor(
     private autenticacao: Autenticacao, 
     private dragoesService: DragoesService,
     private renderer: Renderer2,
     private el: ElementRef ) { }

  ngOnInit() {
  	this.dragoesService.listarDragoes().subscribe((resposta: any) => {
      resposta.sort((a: any,b: any) => {
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;

        return 0;
      });

      this.listaDragoes = resposta;

    });

  }

  public sair(): void {
  	this.autenticacao.sair();
  }

  public editarDragao(lista: any): void {
    this.list = lista;
  }

  public limparCampos(): void {
    this.list = null;
    this.formulario.reset();
  }

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

  private sort(array: []): void {
    array.sort((a: any,b: any) => {
      if(a.name > b.name) return 1;
      if(a.name < b.name) return -1;

      return 0;
    });
  }

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

  public setarId(id: number): void{
    this.idSelecionado = id;
  }
  
  public deletarDragao(): void {
    this.dragoesService.deletarItem(this.idSelecionado).subscribe(() => {
      let indice = this.listaDragoes.findIndex((obj: any) => obj.id === this.idSelecionado);
      if(indice >= 0) this.listaDragoes.splice(indice, 1);
      this.closeModalDel.nativeElement.click();
    });
  }

}
