import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UploadTextComponent } from './upload-text/upload-text.component';
import { StudioModeInterfaceComponent } from './studio-mode-interface/studio-mode-interface.component';
import { PruebaMapaComponent } from './prueba-mapa/prueba-mapa.component';
import { MindmapComponent } from './studio-mode-interface/mindmap/mindmap.component';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'upload/:type', component: UploadTextComponent },
    { path: 'mode-stude/:id', component: StudioModeInterfaceComponent },
    { path: 'quiz/:id', component: QuizComponent },
    { path: 'prueba', component: PruebaMapaComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },

];