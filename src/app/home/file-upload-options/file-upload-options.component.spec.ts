import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadOptionsComponent } from './file-upload-options.component';

describe('FileUploadOptionsComponent', () => {
  let component: FileUploadOptionsComponent;
  let fixture: ComponentFixture<FileUploadOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileUploadOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
