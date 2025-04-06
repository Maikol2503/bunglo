import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaMapaComponent } from './prueba-mapa.component';

describe('PruebaMapaComponent', () => {
  let component: PruebaMapaComponent;
  let fixture: ComponentFixture<PruebaMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaMapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebaMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
