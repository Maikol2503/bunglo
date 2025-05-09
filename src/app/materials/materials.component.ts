import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-materials',
    imports: [CommonModule, RouterModule],
    templateUrl: './materials.component.html',
    styleUrl: './materials.component.css'
})
export class MaterialsComponent implements OnInit{
constructor( private localStorageservices:LocalstorageService, private eRef: ElementRef){}
    materialsData:any[]=[]
    activeModalId: string | null = null;
    idMaterialSelect!:string;
    async ngOnInit(): Promise<any> {
        this.loadMaterials()
    }

    async loadMaterials(){
        this.materialsData = await this.localStorageservices.getMaterialsData()
        console.log(this.materialsData)
    }

    updateName(id:string){

    }

    // Detectar clic fuera
    @HostListener('document:click', ['$event'])
    handleClickOutside(event: Event) {
        const target = event.target as HTMLElement;
        const clickedInside = this.eRef.nativeElement.contains(target);
        if (!clickedInside) {
            this.activeModalId = null;
        }
    }

    toggleModal(id: string): void {
        this.idMaterialSelect=id;
        this.activeModalId = this.activeModalId === id ? null : id;
    }

    async delete(id:string){
        if(confirm('¿Seguro que desea eliminar este material?')){
            await this.localStorageservices.deleteMaterial(id);
            await this.loadMaterials()
        }
        this.activeModalId = null;
    }
}
