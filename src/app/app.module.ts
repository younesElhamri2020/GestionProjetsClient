import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ProjetsComponent } from './projets/projets.component';
import { CompetencesComponent } from './competences/competences.component';
import { TachesComponent } from './taches/taches.component';
import { CollaborateursComponent } from './collaborateurs/collaborateurs.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { AffectationsComponent } from './affectations/affectations.component';
import { AcceuilsComponent } from './acceuils/acceuils.component';
const  appRoutes: Routes = [
  {path : 'acceuil' , component : AcceuilsComponent},
  {path : 'competence' , component : CompetencesComponent},
  {path : 'projets' , component : ProjetsComponent},
  {path : 'collaborateurs' , component : CollaborateursComponent},
  {path : 'affectation' , component : AffectationsComponent},
  {path : 'taches' , component : TachesComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    ProjetsComponent,
    CompetencesComponent,
    TachesComponent,
    CollaborateursComponent,
    AffectationsComponent,
    AcceuilsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
