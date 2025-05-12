import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChuletaComponent } from './modal-chuleta.component';

describe('ModalChuletaComponent', () => {
  let component: ModalChuletaComponent;
  let fixture: ComponentFixture<ModalChuletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalChuletaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalChuletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
