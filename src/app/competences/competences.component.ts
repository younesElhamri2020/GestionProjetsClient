import { Component, OnInit } from '@angular/core';
import {CompetenceService} from '../controller/service/competence.service';
import {Competence} from '../controller/model/competence.model';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent implements OnInit {
  private _competencesR: Array<Competence>;
  private _competenceR: Competence;

  showForm = false;
  _editForm = false;
  get editForm(): boolean{
    return this._editForm;
  }
  public edit(competence){
    this.showForm = true;
    this._editForm = true;
    this.competenceService.edit(competence);
  }
  public delete(id){
    this.competenceService.delete(id);
  }
  public search(){
    this.competenceService.search();
  }
  public update(){
    this.competenceService.update(this.competence);
    this._editForm = false;
    this.showForm = false;
  }
  constructor(private  competenceService: CompetenceService) { }

  ngOnInit(): void {
    this.competenceService.findAll();
  }
  public save(){
    this.competenceService.save();
    this.showForm = false;
  }

  get competence(): Competence {
    return  this.competenceService.competence;
  }
  get competenceR(): Competence {
    return  this.competenceService.competenceR;
  }
  get competences(): Array<Competence> {

    return this.competenceService.competences;
  }
  get competencesR(): Array<Competence> {
    return  this.competenceService.competencesR;
  }

}
