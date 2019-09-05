import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'App Dragão';

  ngOnInit(): void {
    //Configuração do firebase
    var firebaseConfig = {
	    apiKey: "AIzaSyAVpmhns8F0-8qNUtRkq6A7eGJf3G5Iui4",
	    authDomain: "provasicred.firebaseapp.com",
	    databaseURL: "https://provasicred.firebaseio.com",
	    projectId: "provasicred",
	    storageBucket: "",
	    messagingSenderId: "509580112017",
	    appId: "1:509580112017:web:4ff43e6ddb24bd82"
    };

   //Iniciando a conexão com o firebase
    firebase.initializeApp(firebaseConfig);
  }
}
