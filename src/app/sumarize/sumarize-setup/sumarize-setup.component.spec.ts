import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumarizeSetupComponent } from './sumarize-setup.component';

describe('SumarizeSetupComponent', () => {
  let component: SumarizeSetupComponent;
  let fixture: ComponentFixture<SumarizeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumarizeSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumarizeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
