import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioModeInterfaceComponent } from './studio-mode-interface.component';

describe('StudioModeInterfaceComponent', () => {
  let component: StudioModeInterfaceComponent;
  let fixture: ComponentFixture<StudioModeInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioModeInterfaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioModeInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
