import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizOfSummarizeComponent } from './quiz-of-summarize.component';

describe('QuizOfSummarizeComponent', () => {
  let component: QuizOfSummarizeComponent;
  let fixture: ComponentFixture<QuizOfSummarizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizOfSummarizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizOfSummarizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
