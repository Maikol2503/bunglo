import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeStudioQuizComponent } from './mode-studio-quiz.component';

describe('ModeStudioQuizComponent', () => {
  let component: ModeStudioQuizComponent;
  let fixture: ComponentFixture<ModeStudioQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeStudioQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeStudioQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
