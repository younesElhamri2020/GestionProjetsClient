import { Component, OnInit } from '@angular/core';
import {Collaborateur} from '../controller/model/collaborateur.model';
import {CollaborateurService} from '../controller/service/collaborateur.service';
import {Competence} from '../controller/model/competence.model';
import {CompetenceService} from '../controller/service/competence.service';
import {CollaborateurCompetence} from '../controller/model/collaborateur-competence.model';

@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.css']
})
export class CollaborateursComponent implements OnInit {
  editForm = false;
  showForm = false;
  show= false;
  selected=false;
  constructor(private collaborateurService: CollaborateurService, private competenceService: CompetenceService) { }
  modifiertext: string ;
  ngOnInit(): void {
    this.collaborateurService.findAll();
    this.collaborateurService.findComp();
    this.selected=true;
  }
  onCompetenceSlecte(val: any ){
    this.customfonction(val);
  }
  customfonction(val: any ){
    this.modifiertext = val ;
  }
  public save(){
    this.collaborateurService.save();
    this.showForm = false;
  }
  public validatesave(){
    return this.collaborateurService.validatesave();
  }

  get collaborateur(): Collaborateur {
    return this.collaborateurService.collaborateur;
  }

  public Taskasselected(designation){
    this.collaborateurService.Taskasselected(designation);
  }
  public TaskasAnulle(designation){
    this.collaborateurService.TaskasAnulle(designation);
  }
  public delete(id){
    this.collaborateurService.delete(id);
  }
  public edit(code){
    this.show=true;
    this.editForm=true;
    this.showForm = true;
    this.collaborateurService.findByCodeCollaborateur(code);
  }
  public update(){
  this.collaborateurService.update(this.collaborateur);
  this.showForm=false;
  }
  get collaborateurs(): Array<Collaborateur> {

    return this.collaborateurService.collaborateurs;
  }
  get collaborateurCompetence(): CollaborateurCompetence {
    return this.collaborateurService.collaborateurCompetence;
  }
  get competences(): Array<Competence> {

    return this.collaborateurService.competences;
  }

}
