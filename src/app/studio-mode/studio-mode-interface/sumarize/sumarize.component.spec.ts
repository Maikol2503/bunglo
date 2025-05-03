import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SumarizeComponent } from './sumarize.component';

describe('SumarizeComponent', () => {
  let component: SumarizeComponent;
  let fixture: ComponentFixture<SumarizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SumarizeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SumarizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
