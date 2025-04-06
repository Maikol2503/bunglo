import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sumarize',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sumarize.component.html',
  styleUrls: ['./sumarize.component.css']
})
export class SumarizeComponent {
  @Input() data?: any;

  expandedItems: number[] = []; // Guarda los índices abiertos

  toggleDescription(index: number): void {
    if (this.expandedItems.includes(index)) {
      // Si ya está abierto, lo cerramos
      this.expandedItems = this.expandedItems.filter(i => i !== index);
    } else {
      // Si no está abierto, lo agregamos
      this.expandedItems.push(index);
    }
  }

  isExpanded(index: number): boolean {
    return this.expandedItems.includes(index);
  }
}
