import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { DragoesService } from '../../dragoes.service';
import { Dragoes } from '../../shared/dragoes.model';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css'],
  providers: [ DragoesService ]
})

export class ModalDeleteComponent implements OnInit {

  @ViewChild('closeModalDel', {static: false}) closeModalDel: ElementRef;//captura o valor closeModalDel da view da home
  @Input() private idSelecionado: number;//captura o valor idSelecionado da view da home
  @Input() private listaDragoes: Dragoes[];//captura o valor listaDragoes da view da home
  constructor(private dragoesService: DragoesService) { }

  ngOnInit() {

  }

  /*
  *  método chama o serviço de deletar dragão (deletarItem)
  */

  public deletarDragao(): void {
    this.dragoesService.deletarItem(this.idSelecionado).subscribe(() => {
      let indice = this.listaDragoes.findIndex((obj: any) => obj.id === this.idSelecionado);
      if(indice >= 0) this.listaDragoes.splice(indice, 1);
      this.closeModalDel.nativeElement.click();
    });
  }

}
