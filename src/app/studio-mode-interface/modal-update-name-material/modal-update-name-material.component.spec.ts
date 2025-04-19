import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUpdateNameMaterialComponent } from './modal-update-name-material.component';

describe('ModalUpdateNameMaterialComponent', () => {
  let component: ModalUpdateNameMaterialComponent;
  let fixture: ComponentFixture<ModalUpdateNameMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalUpdateNameMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUpdateNameMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
