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
  public listaDragoes: Dragoes[];
  public idSelecionado: number;
  public list: any;
  public loader: boolean = false;

  public formulario: FormGroup = new FormGroup({
    'name': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(120)]),
    'type': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(80)])
  });

  constructor(
     private autenticacao: Autenticacao, 
     private dragoesService: DragoesService
    ) { }

  ngOnInit() {
    this.loader = true;
  	this.dragoesService.listarDragoes().subscribe((resposta: any) => {
      resposta.sort((a: any,b: any) => {
        if(a.name > b.name) return 1;
        if(a.name < b.name) return -1;

        return 0;
      });

      this.listaDragoes = resposta;
      this.loader = false;
    });

  }

  /*
  *  método para chamar autenticacão para fazer logout
  */

  public sair(): void {
  	this.autenticacao.sair();
  }

  /*
  *  método para preenchar os campos editaveis
  * Obs: Invés de pesquisar pelo id e mostrar o detalhe do dragão é setado o objeo dragão selecionado
  */

  public editarDragao(lista: any): void {
    this.markAs(this.formulario, 'markAsUntouched')
    this.list = lista;
  }

  /*
  *  método marcar/desmarcar valores no campo
  */

  private markAs (form: FormGroup, state: string): FormGroup {
    if (['markAsTouched', 'markAsUntouched', 'markAsDirty', 'markAsPending', 'markAsPristine'].indexOf(state) === -1) {
      return form;
    }

    const controls: Array<string> = Object.keys(form.controls);

    for (const control of controls) {
      form.controls[control][state]();
    }

    return form;
  }

  /*
  *  método limpar todos os valores nos campos
  */

  public limparCampos(): void {
    this.list = null;
    this.formulario.reset();
  }

  /*
  *  método para setar o id para ser deletado
  */

  public setarId(id: number): void{
    this.idSelecionado = id;
  }
}
