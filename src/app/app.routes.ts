import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudioModeInterfaceComponent } from './studio-mode/studio-mode-interface/studio-mode-interface.component';
import { MindmapComponent } from './MindMap/mindmap/mindmap.component';
import { QuizSetupComponent } from './quiz/quiz-setup/quiz-setup.component';
import { QuizPlayComponent } from './quiz/quiz-play/quiz-play.component';
import { MindMapSetupComponent } from './MindMap/mind-map-setup/mind-map-setup.component';
import { SumarizeComponent } from './sumarize/sumarize/sumarize.component';
import { SumarizeSetupComponent } from './sumarize/sumarize-setup/sumarize-setup.component';
import { StudioModeSetupComponent } from './studio-mode/studio-mode-setup/studio-mode-setup.component';
import { ModeStudioQuizSetupComponent } from './studio-mode/studio-mode-interface/quiz/mode-studio-quiz-setup/mode-studio-quiz-setup.component';
import { ModeStudioQuizComponent } from './studio-mode/studio-mode-interface/quiz/mode-studio-quiz/mode-studio-quiz.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'mode-stude/:id', component: StudioModeInterfaceComponent },
    { path: 'quiz/:id', component: QuizPlayComponent},
    { path: 'quiz-setup', component: QuizSetupComponent },
    { path: 'quiz-setup/:id', component: QuizSetupComponent },
    { path: 'mindmap-setup', component: MindMapSetupComponent },
    { path: 'mindmap/:id', component: MindmapComponent },
    { path: 'sumarize-setup', component:SumarizeSetupComponent },
    { path: 'sumarize/:id', component:SumarizeComponent },
    { path: 'mode-studio/:id', component:StudioModeInterfaceComponent},
    { path: 'mode-studio-setup', component:StudioModeSetupComponent },
    { path: 'material/mode-studio/quiz-play/:id', component:ModeStudioQuizComponent },
    { path: 'material/mode-studio/quiz-setup/:id', component:ModeStudioQuizSetupComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },

];