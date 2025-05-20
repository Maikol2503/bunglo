import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-summary-style',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-summary-style.component.html',
  styleUrl: './modal-summary-style.component.css'
})
export class ModalSummaryStyleComponent {
@Output() sendDataEvent = new EventEmitter<string>();

  constructor(private eRef: ElementRef){}

  selected: string = 'clasico';
  selectedLabel: string = 'Formal Academico';
  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(value: string, label: string, event: MouseEvent) {
    event.stopPropagation();
    this.selected = value;
    this.selectedLabel = label;
    this.isOpen = false;
  }

  handleSendData() {
    this.sendDataEvent.emit(this.selected);
  }

  
}
