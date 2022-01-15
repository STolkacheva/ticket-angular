import { TestBed } from '@angular/core/testing';
import { createMappedTypeNode } from 'typescript';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('calculate', () => {
    it('багаж превышает максимальный', () => {
      const comp = new AppComponent();
      comp.bag = 61
      comp.calculate();
      expect(comp.aero.length).toBe(0);
      expect(comp.rzd.length).toBe(0);
    });
    it('расчет тарифов для аэрофлота и ржд, детские', () => {
      const comp = new AppComponent();
      comp.km = 10
      comp.age = 4
      comp.bag = 5
      comp.calculate();

      expect(comp.aero.length).toBe(3);
      expect({ ...comp.aero[0] }).toEqual({ type: 'Эконом', price: 40, currency: '₽' });
      expect({ ...comp.aero[1] }).toEqual({ type: 'Продвинутый', price: 56, currency: '₽' });
      expect({ ...comp.aero[2] }).toEqual({ type: 'Люкс', price: 105, currency: '₽' });
      expect(comp.rzd.length).toBe(3);
      expect({ ...comp.rzd[0] }).toEqual({ type: 'Эконом', price: 2.5, currency: '₽' });
      expect({ ...comp.rzd[1] }).toEqual({ type: 'Продвинутый', price: 14, currency: '₽' });
      expect({ ...comp.rzd[2] }).toEqual({ type: 'Люкс', price: 32, currency: '₽' });
    });

    it('расчет тарифов для аэрофлота и ржд, взрослые', () => {
      const comp = new AppComponent();
      comp.km = 10
      comp.age = 25
      comp.bag = 10
      comp.calculate();
      expect(comp.aero.length).toBe(3);
      expect({ ...comp.aero[0] }).toEqual({ type: 'Эконом', price: 4040, currency: '₽' });
      expect({ ...comp.aero[1] }).toEqual({ type: 'Продвинутый', price: 80, currency: '₽' });
      expect({ ...comp.aero[2] }).toEqual({ type: 'Люкс', price: 150, currency: '₽' });
      expect(comp.rzd.length).toBe(3);
      expect({ ...comp.rzd[0] }).toEqual({ type: 'Эконом', price: 5, currency: '₽' });
      expect({ ...comp.rzd[1] }).toEqual({ type: 'Продвинутый', price: 20, currency: '₽' });
      expect({ ...comp.rzd[2] }).toEqual({ type: 'Люкс', price: 40, currency: '₽' });
    });
    it('расчет тарифов для аэрофлота и ржд, доплата за превышение', () => {
      const comp = new AppComponent();
      comp.km = 10
      comp.age = 25
      comp.bag = 21
      comp.calculate();
      expect(comp.aero.length).toBe(2);
      expect({ ...comp.aero[0] }).toEqual({ type: 'Продвинутый', price: 5080, currency: '₽' });
      expect({ ...comp.aero[1] }).toEqual({ type: 'Люкс', price: 150, currency: '₽' });
      expect(comp.rzd.length).toBe(3);
      expect({ ...comp.rzd[0] }).toEqual({ type: 'Эконом', price: 305, currency: '₽' });
      expect({ ...comp.rzd[1] }).toEqual({ type: 'Продвинутый', price: 70, currency: '₽' });
      expect({ ...comp.rzd[2] }).toEqual({ type: 'Люкс', price: 40, currency: '₽' });
    });
  });
});
