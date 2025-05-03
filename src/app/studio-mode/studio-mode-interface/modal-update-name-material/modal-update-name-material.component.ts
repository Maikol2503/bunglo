import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-update-name-material',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-update-name-material.component.html',
  styleUrl: './modal-update-name-material.component.css'
})
export class ModalUpdateNameMaterialComponent {
  @Input() title?: any;
  @Output() emitNewName = new EventEmitter<string>(); 

  emitNewNameFuntion(){
    this.emitNewName.emit(this.title)
  }
}
