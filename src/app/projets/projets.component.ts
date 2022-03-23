import { Component, OnInit } from '@angular/core';
import {Projet} from '../controller/model/projet.model';
import {ProjetService} from '../controller/service/projet.service';
import {Tache} from '../controller/model/tache.model';
import {CompetenceService} from '../controller/service/competence.service';
import {Competence} from '../controller/model/competence.model';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {
  showForm = false;
  nouveau=false;

  constructor(private projetService: ProjetService, private competenceService: CompetenceService) { }

  ngOnInit(): void {
    this.projetService.findAll();
    this.projetService.findComp();
  }
  public save(){
    this.projetService.save();
    this.showForm = false;
  }
  public delete(intituleP){
    this.projetService.delete(intituleP);
  }

  get competences(): Array<Competence> {

    return this.projetService.competences;
  }
  public TaskasAnulle(designation){
    this.projetService.TaskasAnulle(designation);
  }
  public validateaddTache(){
    return this.projetService.validateaddTache();
  }
  public addListeCompetence(designation){
    this.projetService.addListeCompetence(designation);
  }
  public validatesave(){
    return this.projetService.validatesave();
  }
  public addTache(){
    this.projetService.addTache();
  }

  get projet(): Projet {
    return this.projetService.projet;
  }

  get projets(): Array<Projet> {

    return this.projetService.projets;
  }

  get tache(): Tache {
    return this.projetService.tache;
  }
}
