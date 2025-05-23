import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSetupOfSummarizeComponent } from './quiz-setup-of-summarize.component';

describe('QuizSetupOfSummarizeComponent', () => {
  let component: QuizSetupOfSummarizeComponent;
  let fixture: ComponentFixture<QuizSetupOfSummarizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizSetupOfSummarizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizSetupOfSummarizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
