import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Usuario } from '../usuario.model';

import { Autenticacao } from '../../autenticacao.service';

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  animations: [
    trigger('animacao-erro-login', [
      state('criado', style({
        opacity: 1,
      })),
      transition('void => criado', [
        animate('1s 0s ease-in-out', keyframes([
          style({offset: 0.88, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.90, opacity: 1, transform: 'translateY(10px)'}),
          style({offset: 0.92, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.94, opacity: 1, transform: 'translateY(10px)'}),
          style({offset: 0.96, opacity: 1, transform: 'translateY(-10px)'}),
          style({offset: 0.98, opacity: 1, transform: 'translateY(10px)'}),
        ]))
      ])
    ])
  ]
})
export class CadastroComponent implements OnInit {

  public msgError: string;
  public estadoCad: string = 'criado';
  public alertarErro: boolean = false;

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(120), Validators.pattern(/^[a-z]{2,}(.*[0-9a-z])@[a-z]{3,}\.[a-z]{2,}(.[a-z]{2,})?$/)]),
    'nome_completo':new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(80)]),
    'nome_usuario': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(80)]),
  });

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
  	this.exibirPainel.emit('login');
  }

  public cadastrarUsuario(): void {
    this.alertarErro = false;
    let {email, nome_completo, nome_usuario, senha} = this.formulario.value;
    
    if(this.formulario.status !== 'VALID'){
      if(!email || this.formulario.get('email').status !== 'VALID') this.formulario.get('email').markAsTouched();
      if(!nome_completo) this.formulario.get('nome_completo').markAsTouched();
      if(!nome_usuario) this.formulario.get('nome_usuario').markAsTouched();
      if(!senha) this.formulario.get('senha').markAsTouched();

      this.alertarErro = true;
    }else{

      let usuario: Usuario = new Usuario(email, nome_completo, nome_usuario, senha);

      this.autenticacao.cadastrarUsuario(usuario).then((message: string) => {
        if(message){
          this.alertarErro = true;
          this.msgError = message;
        }else{          
          this.exibirPainelLogin()
        }
      });
    }
  }

}
