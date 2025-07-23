import { Component, OnInit } from '@angular/core';
import { NavbarPage } from '../pages/navbar/navbar.page';

@Component({
  selector: 'app-layout',
  imports: [NavbarPage],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
