import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioModeSetupComponent } from './studio-mode-setup.component';

describe('StudioModeSetupComponent', () => {
  let component: StudioModeSetupComponent;
  let fixture: ComponentFixture<StudioModeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioModeSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioModeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
