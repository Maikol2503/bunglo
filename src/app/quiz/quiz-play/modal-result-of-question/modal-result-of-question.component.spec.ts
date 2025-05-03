import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResultOfQuestionComponent } from './modal-result-of-question.component';

describe('ModalResultOfQuestionComponent', () => {
  let component: ModalResultOfQuestionComponent;
  let fixture: ComponentFixture<ModalResultOfQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalResultOfQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalResultOfQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
