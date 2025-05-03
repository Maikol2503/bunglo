import { CommonModule } from '@angular/common';
import {  CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();
interface FlashCard {
  question: string;
  answer: string;
  flipped: boolean;
}
@Component({
  selector: 'app-flash-card',
  imports: [CommonModule],
  templateUrl: './flash-card.component.html',
  styleUrl: './flash-card.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FlashCardComponent  {

  @Input() data:FlashCard[] = []

  toggleCard(index: number) {
    this.data[index].flipped = !this.data[index].flipped;
  }
}
