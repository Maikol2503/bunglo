import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSummaryStyleComponent } from './modal-summary-style.component';

describe('ModalSummaryStyleComponent', () => {
  let component: ModalSummaryStyleComponent;
  let fixture: ComponentFixture<ModalSummaryStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSummaryStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSummaryStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
