import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { LocalstorageService } from '../services/localstorage.service';
import { Router, RouterModule } from '@angular/router';
import { ModalUpdateNameMaterialComponent } from '../shared/modals/modal-update-name-material/modal-update-name-material.component';
import { SVG, SvgMaterial } from '../shared/svg';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SidebarService } from '../services-interfas/sidebar.service';

@Component({
  selector: 'app-materials',
  imports: [CommonModule, RouterModule, ModalUpdateNameMaterialComponent],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.css'
})
export class MaterialsComponent implements OnInit{

svg: (SvgMaterial  & { safeSvg: SafeHtml })[]; 

constructor( private router:Router, private localStorageservices:LocalstorageService, private eRef: ElementRef, private sanitizer: DomSanitizer, private sideBarServices:SidebarService){
    this.sideBarServices.sidebar_apply_minimize(true)
    this.svg = SVG.map(svg => ({
      ...svg,
      safeSvg: this.sanitizer.bypassSecurityTrustHtml(svg.svg)
    }));
}


    materialsData:any[]=[]
    activeModalId: string | null = null;
    idMaterialSelect!:string;
    updatedMaterialData!:any;
    showModaleditNameMaterial:boolean=false;

    async ngOnInit(): Promise<any> {
        this.loadMaterials()
    }

    
    async loadMaterials(){
        this.materialsData = await this.localStorageservices.getMaterialsData()
    }

    openModalUpdateName(id:string){
        this.idMaterialSelect=id;
        this.showModaleditNameMaterial=true;
    }

    closeModalUpdateName(){
        this.idMaterialSelect='';
        this.showModaleditNameMaterial=false;
    }

    onMaterialUpdated(data: any) {
        const index = this.materialsData.findIndex((material:any)=> material.id === data.id);
        if (index !== -1){
            this.materialsData[index] = data;
        }
        this.closeModalUpdateName();
        this.activeModalId = null;
        // Aquí puedes actualizar listas, cerrar el modal, etc.
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
        this.activeModalId = this.activeModalId === id ? null : id;
    }

    getSvgByType(type: string): string {
        const svgMatch:any = this.svg.find(s => s.type === type);
        return svgMatch ? svgMatch.safeSvg : '';
    }

    async delete(id:string){
        if(confirm('¿Seguro que desea eliminar este material?')){
            await this.localStorageservices.deleteMaterial(id);
            await this.loadMaterials()
        }
        this.activeModalId = null;
    }

    close(){
      this.router.navigate(['/home'])
    }

    redirectToMaterial(ruta:any){
        this.router.navigate([ruta])
    }
}

