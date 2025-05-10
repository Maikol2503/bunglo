import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-modal-chuleta',
  imports: [CommonModule],
  templateUrl: './modal-chuleta.component.html',
  styleUrl: './modal-chuleta.component.css'
})
export class ModalChuletaComponent {
  @Input() data:any
}
