import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() public loader: boolean;//ira escutar a interpolação que está vinculado o component

  constructor() { }

  ngOnInit() {
  }

}
