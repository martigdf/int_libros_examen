import { Component, OnInit } from '@angular/core';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [UpperCasePipe]
})
export class LoginPage implements OnInit {

  constructor(){ }

  ngOnInit(){ }

}
