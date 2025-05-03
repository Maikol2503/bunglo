import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderBungloComponent } from './loader-bunglo.component';

describe('LoaderBungloComponent', () => {
  let component: LoaderBungloComponent;
  let fixture: ComponentFixture<LoaderBungloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderBungloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderBungloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
