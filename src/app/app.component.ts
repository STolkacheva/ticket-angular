import { Component } from '@angular/core';

class Ticket {
  type: string;
  price: number;
  currency: string

  constructor(type: string, price: number) {
    this.type = type;
    this.price = price;
    this.currency = "\u20bd";
  }
}

@Component({
  selector: 'app-root',
  template: `
  <div id="app" class = "container pt-5">
    <div>
      <div class="mb-3 row">
        <label class="col-sm-4 col-form-label">Количество&nbsp;километров</label>
        <div class="col-sm-8"> <input class="form-control" type = "number" [(ngModel)]="km"/> </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-4 col-form-label">Возраст</label>
        <div class="col-sm-8"> <input class="form-control" type = "number" [(ngModel)]="age"/> </div>
      </div>
      <div class="mb-3 row">
        <label class="col-sm-4 col-form-label">Вес багажа</label>
        <div class="col-sm-8"> <input class="form-control" type = "number" [(ngModel)]="bag"/> </div>
      </div>
      <div class="mb-3 row">
        <div class="col-sm-12">
            <button class="btn btn-primary w-100" (click)="calculate()" > Рассчитать </button>
        </div>
      </div>
    </div>

    <div>
      <div class="mb-3 row">
        <label class="col-sm-3 col-form-label" *ngIf="this.aero.length > 0 || this.rzd.length > 0">Предложения:</label>
      </div>
      <ul class="list-group">
        <li class="list-group-item list-group-item-secondary" *ngIf="this.aero.length > 0"><strong>Аэрофлот</strong></li>
        <li class="list-group-item list-group-item-light" *ngFor="let ticket of aero" >{{ticket.type}}: {{ticket.price | number : '1.0-2'}} {{ticket.currency}}</li>
        <li class="list-group-item list-group-item-secondary"*ngIf="this.rzd.length > 0"><strong>РЖД</strong></li>
        <li class="list-group-item list-group-item-light" *ngFor="let ticket of rzd" >{{ticket.type}}: {{ticket.price | number : '1.0-2'}} {{ticket.currency}}</li>
      </ul>
   </div>
</div>
  `,

})

export class AppComponent {
  km: number = 0;
  age: number = 0;
  bag: number = 0;

  aero: Ticket[] = [];
  rzd: Ticket[] = [];

  calculate(): void {
    this.aero = [];
    this.rzd = [];
    let price = 0;

    // Аэрофлот
    // Эконом
    if (this.bag <= 20) {
      price = this.km * 4 + (this.bag > 5 ? 4000 : 0);
      this.aero.push(new Ticket("Эконом", price));
    }
    // Продвинутый
    if (this.bag <= 50) {
      price = (this.km * 8) * (this.age > 7 ? 1 : 0.7) + (this.bag > 20 ? 5000 : 0);
      this.aero.push(new Ticket("Продвинутый", price));
    }
    // Люкс
    if (this.bag <= 50) {
      price = (this.km * 15) * (this.age > 16 ? 1 : 0.7);
      this.aero.push(new Ticket("Люкс", price));
    }

    // РЖД
    // Эконом
    if (this.bag <= 50) {
      price = (this.km * 0.5) * (this.age > 5 ? 1 : 0.5) + (this.bag > 15 ? ((this.bag - 15) * 50) : 0);
      this.rzd.push(new Ticket("Эконом", price));
    }
    // Продвинутый
    if (this.bag <= 60) {
      price = (this.km * 2) * (this.age > 8 ? 1 : 0.7) + (this.bag > 20 ? ((this.bag - 20) * 50) : 0);
      this.rzd.push(new Ticket("Продвинутый", price));
    }
    // Люкс
    if (this.bag <= 60) {
      price = (this.km * 4) * (this.age > 16 ? 1 : 0.8);
      this.rzd.push(new Ticket("Люкс", price));
    }
  }
}