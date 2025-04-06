import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
    selector: 'app-file-upload-options',
    imports: [CommonModule, RouterLink, RouterModule],
    templateUrl: './file-upload-options.component.html',
    styleUrl: './file-upload-options.component.css'
})
export class FileUploadOptionsComponent {
    applyDisplayNone=false
}
