import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tariff-create-form',
  templateUrl: './tariff-create-form.component.html',
  styleUrls: ['./tariff-create-form.component.scss']
})
export class TariffCreateFormComponent implements OnInit {

  active : boolean = true;
  name: string = "";
  prices: Map<string, number> = new Map<string, number>;

  constructor() { }

  ngOnInit(): void {
  }

  getArray(map: Map<string, number>) {
    return Array.from(map, ([name, value]) => ({ name, value }));
  }

}
