import { Injectable } from '@angular/core';

import {Competence} from '../model/competence.model';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CompetenceService {
  private _competence: Competence;
  private _competenceR: Competence;
  private _competences: Array<Competence>;
  private _competencesR: Array<Competence>;
  constructor(private  http: HttpClient) { }
  c = {
    designation : ''
  };
  public save(){
    this.http.post<void>("http://localhost:8090/GestionProjet/Competence/" , this.competence).subscribe(
      data => {
        if (this.competence.designation != null){
          this.competences.push(this.cloneCompetence(this.competence));
          this.competence = null;
          this.findAll();
          this.c = {
            designation : ''
          }; }
      },eror => {
        console.log('eror');
      }
    );

  }

  public edit(c){
    this.competence = c ;
  }
  public update(competence){
    this.http.put('http://localhost:8090/GestionProjet/Competence/idCompetence/'+competence.idCompetence, competence).subscribe(
      data => {
        this.competence = null;
        this.findAll();
      },eror => {
        console.log('eror');
      }
    );
  }
  public delete(idCompetence){
    this.http.delete('http://localhost:8090/GestionProjet/Competence/idCompetence/'+idCompetence)
      .subscribe(
        data => {
          this.competence = null;
          alert('La compétence a été supprimer avec succes');
          this.findAll();
        },eror => {
          console.log('eror');
        }
      );
  }


  public findAll(){
    this.http.get<Array<Competence>>("http://localhost:8090/GestionProjet/Competence/" ).subscribe(
      data => {
        console.log('data' + data);
        this.competencesR =  this.competences = data;
      },
    );
  }


  public search(){
    this.http.get<Array<Competence>>('http://localhost:8090/GestionProjet/Competence/designation/'+this.competence.designation).subscribe(
      data => {
        console.log('data' + data);
        this.competencesR = data;
      },
    );
  }
  get competence(): Competence {
    if (this._competence == null){
      this._competence = new Competence();
    }
    return this._competence;
  }

  set competence(value: Competence) {
    this._competence = value;
  }
  get competenceR(): Competence {
    if (this._competenceR == null){
      this._competenceR = new Competence();
    }
    return this._competenceR;
  }

  set competenceR(value: Competence) {
    this._competenceR = value;
  }
  get competencesR(): Array<Competence> {
    if (this._competencesR == null){
      this._competencesR = new Array<Competence>();
    }
    return this._competencesR;
  }

  set competencesR(value: Array<Competence>) {
    this._competencesR = value;
  }
  get competences(): Array<Competence> {
    if (this._competences == null){
      this._competences = new Array<Competence>();
    }
    return this._competences;
  }

  set competences(value: Array<Competence>) {
    this._competences = value;
  }
  private cloneCompetence(competence: Competence) {
    const monCloneCompetence = new Competence();
    monCloneCompetence.designation = competence.designation;

    return monCloneCompetence;
  }
}
