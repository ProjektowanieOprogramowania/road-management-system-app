import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tariff-create-form',
  templateUrl: './tariff-create-form.component.html',
  styleUrls: ['./tariff-create-form.component.scss']
})
export class TariffCreateFormComponent implements OnInit {

  tariffName : string = "";

  active : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
