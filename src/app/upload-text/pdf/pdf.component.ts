import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtnBackComponent } from '../btn-back/btn-back.component';

@Component({
    selector: 'app-pdf',
    imports: [RouterModule, BtnBackComponent],
    templateUrl: './pdf.component.html',
    styleUrl: './pdf.component.css'
})
export class PdfComponent {

}
