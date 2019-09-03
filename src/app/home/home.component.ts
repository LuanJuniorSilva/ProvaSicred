import { Component, OnInit, Directive, Renderer2, ElementRef, ViewChild  } from '@angular/core';
import { Autenticacao } from '../autenticacao.service';
import { DragoesService } from '../dragoes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


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
  public list: any;
  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(120)]),
    'tipo': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(80)])
  });

   @ViewChild('closeModal', {static: false}) closeModal: ElementRef

  constructor(
     private autenticacao: Autenticacao, 
     private dragoesService: DragoesService,
     private renderer: Renderer2,
     private el: ElementRef ) { }

  ngOnInit() {
  	this.dragoesService.listarDragoes().subscribe((resposta: any) => {
      resposta.sort((a,b) => {
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
  }

  public atualizarDragoes(): void{
    let {nome, tipo} = this.formulario.value;

    if(this.formulario.controls.nome.pristine){
      nome = this.list.name;
    }

    if(this.formulario.controls.tipo.pristine){      
      tipo = this.list.type;
    }

    if(!nome || !tipo){
      if(!nome)this.formulario.get('nome').markAsTouched();
      if(!tipo)this.formulario.get('tipo').markAsTouched();
    }else{

      this.list.name = nome;
      this.list.type = tipo;

      this.dragoesService.atualizarDragao(this.list, this.list.id).subscribe(() => {
        this.closeModal.nativeElement.click()
      });
    }
  }

}
