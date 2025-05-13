import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateNewMaterialComponent } from './generate-new-material.component';

describe('GenerateNewMaterialComponent', () => {
  let component: GenerateNewMaterialComponent;
  let fixture: ComponentFixture<GenerateNewMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateNewMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateNewMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
