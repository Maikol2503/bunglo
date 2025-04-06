import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSessionModalComponent } from './quiz-session-modal.component';

describe('QuizSessionModalComponent', () => {
  let component: QuizSessionModalComponent;
  let fixture: ComponentFixture<QuizSessionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSessionModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSessionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
