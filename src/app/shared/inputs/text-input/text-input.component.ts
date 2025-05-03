import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-text-input',
  imports: [CommonModule, RouterModule, RouterLink, FormsModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
  @Output() sendDataEvent = new EventEmitter<string>(); // No necesitamos datos, solo notificar al padre
  
  // textInput: string = `Los perfumes han sido una parte fundamental de la historia de la humanidad utilizados no solo para realzar el atractivo personal sino también con fines religiosos medicinales y ceremoniales Desde las antiguas civilizaciones egipcias que empleaban aceites aromáticos en rituales sagrados hasta las sofisticadas fragancias creadas en la moderna perfumería francesa los perfumes han evolucionado enormemente en términos de composición y complejidad Una fragancia se compone de tres niveles de notas las notas de salida que son las más volátiles y se perciben inmediatamente al aplicar el perfume; las notas de corazón, que definen la personalidad del aroma y aparecen después de la evaporación inicial y las notas de fondo las más persistentes que pueden durar horas o incluso días en la piel. Entre las familias olfativas más populares encontramos las florales, que evocan la frescura y dulzura de las flores como el jazmín, la rosa o el lirio; las orientales, con notas especiadas como la vainilla, el ámbar y la canela, que aportan una sensación cálida e intensa; las amaderadas, que incluyen ingredientes como el sándalo, el vetiver y el cedro, evocando una sensación terrosa y sofisticada; y las cítricas, que proporcionan frescura y energía gracias a esencias de limón, bergamota y naranja. Además, en la perfumería moderna se han desarrollado composiciones más innovadoras, como los perfumes gourmand, que recuerdan a postres y golosinas mediante notas de caramelo, chocolate y café, o los perfumes acuáticos, que imitan la brisa marina con acordes de ozono y algas.`;
  textInput: string = '';
  constructor() {}

  sendDataToParent(): void {
    const trimmedText = this.textInput.trim();
    if (!trimmedText) {
      alert('Por favor, introduce un texto antes de continuar.');
      return;
    }
    this.sendDataEvent.emit(trimmedText); // Emite el evento cuando se hace clic en el botón
  }
}
