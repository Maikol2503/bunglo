import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtnBackComponent } from '../btn-back/btn-back.component';

@Component({
    selector: 'app-image',
    imports: [RouterModule, BtnBackComponent],
    templateUrl: './image.component.html',
    styleUrl: './image.component.css'
})
export class ImageComponent {

}
