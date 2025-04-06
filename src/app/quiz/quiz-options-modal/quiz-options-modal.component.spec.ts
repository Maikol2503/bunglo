import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizOptionsModalComponent } from './quiz-options-modal.component';

describe('QuizOptionsModalComponent', () => {
  let component: QuizOptionsModalComponent;
  let fixture: ComponentFixture<QuizOptionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizOptionsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizOptionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
