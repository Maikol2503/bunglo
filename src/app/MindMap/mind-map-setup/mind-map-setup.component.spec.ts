import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindMapSetupComponent } from './mind-map-setup.component';

describe('MindMapSetupComponent', () => {
  let component: MindMapSetupComponent;
  let fixture: ComponentFixture<MindMapSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MindMapSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MindMapSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
