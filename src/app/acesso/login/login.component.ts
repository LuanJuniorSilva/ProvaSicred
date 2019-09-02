import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { Autenticacao } from '../../autenticacao.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
export class LoginComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public msgError: string;
  public estadoLogin: string = 'criado';
  public alertarErro: boolean = false;
  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(120), Validators.pattern(/^[a-z]{2,}(.*[0-9a-z])@[a-z]{3,}\.[a-z]{2,}(.[a-z]{2,})?$/)]),
    'senha': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(80)])
  });
  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public exibirPainelCadastro(): void {
  	this.exibirPainel.emit('cadastro');
  }

  public autenticar(): void {
    this.alertarErro = false;
    
    let {email, senha} = this.formulario.value;
 
    if(this.formulario.status !== 'VALID'){
      if(!email || this.formulario.get('email').status !== 'VALID') this.formulario.get('email').markAsTouched();
      if(!senha) this.formulario.get('senha').markAsTouched();
      this.alertarErro = true;
    }else{
      this.autenticacao.autenticar(email, senha).then((message: string) => {
        this.msgError = message;
        if(this.msgError) this.alertarErro = true;
      });

    }

  }

}
