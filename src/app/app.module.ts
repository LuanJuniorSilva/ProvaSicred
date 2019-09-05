import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ROUTES } from './routes/app.routes';

import { Autenticacao } from './autenticacao.service';
import { AutenticacaoGuard } from './autenticacao-guard.service';

import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { LoginComponent } from './acesso/login/login.component';
import { HomeComponent } from './home/home.component';
import { FormatarData } from './utils/formatarData.pipe';
import { LoaderComponent } from './loader/loader.component';
import { FooterComponent } from './footer/footer.component';
import { TopoComponent } from './home/topo/topo.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ModalEditComponent } from './home/modal-edit/modal-edit.component';
import { ModalDeleteComponent } from './home/modal-delete/modal-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    LoginComponent,
    HomeComponent,
    FormatarData,
    LoaderComponent,
    FooterComponent,
    TopoComponent,
    PaginationComponent,
    ModalEditComponent,
    ModalDeleteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ Autenticacao, AutenticacaoGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
