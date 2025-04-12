import { AfterViewChecked, Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtnBackComponent } from '../btn-back/btn-back.component';
import * as pdfjsLib from 'pdfjs-dist';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pdf',
  imports: [RouterModule, BtnBackComponent, CommonModule, FormsModule],
  templateUrl: './pdf.component.html',
  styleUrl: './pdf.component.css'
})
export class PdfComponent implements AfterViewChecked {
    constructor() {
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
    }
  
    @Output() onTextExtracted = new EventEmitter<string>();
    numCharacter:number=0
    maxCharacter:number=50000
    minCharacter:number=1500
    pdfList: {
      pages: { canvasId: string; page: any; selected: boolean }[]; // Agregar la propiedad 'selected'
      extractedText: string;
      rendered: boolean;
    }[] = [];
  
    async handleFileUpload(event: any) {
      const files: FileList = event.target.files;
  
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
  
        const { pages, text } = await this.extractTextAndPreparePages(file);
  
        this.pdfList.push({
          pages: pages,
          extractedText: text,
          rendered: false
        });
      }
    }

     // Formatear el número con separadores de miles
     formatNumber(num: number): string {
        return num.toLocaleString('en-US');  // Agrega separador de miles
    }
  
    async extractTextAndPreparePages(file: File): Promise<{
      pages: { canvasId: string; page: any; selected: boolean }[]; // Agregar la propiedad 'selected'
      text: string;
    }> {
      const arrayBuffer = await file.arrayBuffer();
      const typedArray = new Uint8Array(arrayBuffer);
      const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
  
      const pages: { canvasId: string; page: any; selected: boolean }[] = [];
      let textContent = '';
  
      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const canvasId = `pdf-${Date.now()}-${pageNum}`;
        pages.push({ canvasId, page, selected: false }); // Inicialmente, no está seleccionada
  
        const content = await page.getTextContent();
        const strings = content.items.map((item: any) => item.str);
        textContent += strings.join(' ') + '\n';
      }
  
      return { pages, text: textContent };
    }
  
    // Angular hook para asegurarse que los canvases ya están en el DOM
    ngAfterViewChecked(): void {
      this.pdfList.forEach((pdf) => {
        if (!pdf.rendered) {
          pdf.pages.forEach(({ canvasId, page }) => {
            const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
            if (canvas) {
              const viewport = page.getViewport({ scale: 1.5 });
              const context = canvas.getContext('2d')!;
              canvas.height = viewport.height;
              canvas.width = viewport.width;
  
              page.render({
                canvasContext: context,
                viewport: viewport
              });
            }
          });
          pdf.rendered = true;
        }
      });
    }
  
    updateSelection(pdfIndex: number, pageIndex: number) {
        const pdf = this.pdfList[pdfIndex];
        const page = pdf.pages[pageIndex];
    
        // Calcular el número de caracteres con la selección actual
        const textLength = this.getTextLength(pdf, pageIndex);
        const currentCharacterCount = this.getCharacterCount();
    
        // Si la página está seleccionada, veremos si el nuevo total de caracteres al agregar esta página excede el límite
        if (page.selected) {
            const newCharacterCount = currentCharacterCount - textLength; // Si deseleccionamos, restamos los caracteres
            if (newCharacterCount >= 0) {
                // Permitir deseleccionar si no se excede el límite
                page.selected = false;
            }
        } else {
            // Si la página no está seleccionada, verificamos si al seleccionarla no excedemos el límite
            const newCharacterCount = currentCharacterCount + textLength; // Si seleccionamos, sumamos los caracteres
            if (newCharacterCount <= this.maxCharacter) {
                // Permitir seleccionar si no se excede el límite
                page.selected = true;
            }
        }
    
        // Actualiza el número total de caracteres después de la operación
        this.numCharacter = this.getCharacterCount();
    }
    
    
    
    // Función para extraer el texto solo de las páginas seleccionadas
   // Función para extraer el texto solo de las páginas seleccionadas
    extractTextFromSelectedPages(): string {
        let combinedText = '';
        this.pdfList.forEach((pdf) => {
        pdf.pages.forEach((page, index) => {
            if (page.selected) {
            // Extrae el texto de la página seleccionada usando el índice
            const pageText = pdf.extractedText.split('\n')[index];
            combinedText += pageText + '\n'; 
            }
        });
        });
        return combinedText;
    }
    
  
    

    getCharacterCount(): number {
        let combinedText = '';
    
        // Recorremos todos los PDFs y sus páginas
        this.pdfList.forEach(pdf => {
            pdf.pages.forEach((page) => {
                if (page.selected) {
                    // Usa extractedText para obtener el texto de la página seleccionada
                    combinedText += page.selected ? pdf.extractedText.split('\n')[pdf.pages.indexOf(page)] : '';
                }
            });
        });
    
        return combinedText.length; // Devuelve la cantidad de caracteres
    }


    getTextLength(pdf: any, pageIndex: number): number {
        const pageText = pdf.extractedText.split('\n')[pageIndex];
        return pageText.length;
    }
    
        

   
  
    emitCombinedText() {
      const combinedText = this.extractTextFromSelectedPages();
      this.onTextExtracted.emit(combinedText);
    }
  }