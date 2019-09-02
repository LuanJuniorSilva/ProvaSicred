import { Component, OnInit } from '@angular/core';
import { Autenticacao } from '../autenticacao.service';
import { DragoesService } from '../dragoes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ DragoesService ]
})
export class HomeComponent implements OnInit {
  public listaDragoes: any;
  constructor(private autenticacao: Autenticacao, private dragoes: DragoesService) { }

  ngOnInit() {
  	this.dragoes.listarDragoes().subscribe((resposta: any) => {
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


}
