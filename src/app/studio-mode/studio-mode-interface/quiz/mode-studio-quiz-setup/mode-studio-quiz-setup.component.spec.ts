import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeStudioQuizSetupComponent } from './mode-studio-quiz-setup.component';

describe('ModeStudioQuizSetupComponent', () => {
  let component: ModeStudioQuizSetupComponent;
  let fixture: ComponentFixture<ModeStudioQuizSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeStudioQuizSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeStudioQuizSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
