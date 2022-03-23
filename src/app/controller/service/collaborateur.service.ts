import { Injectable } from '@angular/core';
import {Collaborateur} from '../model/collaborateur.model';
import {HttpClient} from '@angular/common/http';
import {Competence} from '../model/competence.model';
import {CompetenceService} from '../service/competence.service';
import {CollaborateurCompetence} from '../model/collaborateur-competence.model';

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {
  private _collaborateur: Collaborateur;
  private _collaborateurCompetence: CollaborateurCompetence;
  private _collaborateurs: Array<Collaborateur>;
  private _competences: Array<Competence>;
  ngOnInit(): void {
    this.findComp();
  }
  constructor(private  http: HttpClient) { }

  public save() {
    console.log(this.collaborateur);
    this.http.post<number>('http://localhost:8090/GestionProjet/Collaborateur/', this.collaborateur).subscribe(
      data => {
        console.log(data);
        if (data > 0) {
          this.collaborateurs.push(this.cloneCollaboratteur(this.collaborateur));
          this.collaborateur = null;
        }
        this.findAll();
      }, eror => {
        console.log('eror');
      });
  }
  public Taskasselected(designation){
    const competence = new Competence();
    competence.designation = designation;
    this.collaborateurCompetence.competence = competence ;
    this.collaborateur.collaborateurCompetences.push(this.cloneCollaboratteurCompetence(this.collaborateurCompetence));

  }
  public TaskasAnulle(designation){
    this.collaborateur.collaborateurCompetences.splice(designation,1);
  }
  public validatesave(): boolean{
    return this.collaborateur.codeCollaborateur != null && this.collaborateur.nom != null && this.collaborateur.prenom != null ;
  }
  public findByCodeCollaborateur(code){
    console.log(code);
    this.http.get<Collaborateur>("http://localhost:8090/GestionProjet/Collaborateur/codeCollaborateur/"+code ).subscribe(
      data => {
        this.collaborateur = data;
        console.log(data);
      },
    );
  }
  public update(collaborateur){
    this.http.put('http://localhost:8090/GestionProjet/Collaborateur/colaborateurUpdate/', collaborateur).subscribe(
      data => {
        this.findAll();
        console.log(data);
      },

    );
  }

  public delete(idCollaborateur){
    this.http.delete('http://localhost:8090/GestionProjet/Collaborateur/idCollaborateur/' + idCollaborateur)
      .subscribe(
        data => {
          this.collaborateur = null;
          alert('Le collobarateur a été suppremer avec succes');
          this.findAll();
        },eror => {
          console.log('eror');
        }
      );
  }
  public findComp(){
    this.http.get<Array<Competence>>("http://localhost:8090/GestionProjet/Competence/" ).subscribe(
      data => {
        console.log('data' + data);
        this.competences=data;
      },
    );
  }


  public findAll(){
    this.http.get<Array<Collaborateur>>("http://localhost:8090/GestionProjet/Collaborateur/" ).subscribe(
      data => {
        console.log('data' + data);
        this.collaborateurs = data;
      },

    );
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
  get collaborateur(): Collaborateur {
    if (this._collaborateur == null){
      this._collaborateur = new Collaborateur();
    }
    return this._collaborateur;
  }

  set collaborateur(value: Collaborateur) {
    this._collaborateur = value;
  }

  get collaborateurs(): Array<Collaborateur> {
    if (this._collaborateurs == null){
      this._collaborateurs = new Array<Collaborateur>();
    }
    return this._collaborateurs;
  }

  set collaborateurs(value: Array<Collaborateur>) {
    this._collaborateurs = value;
  }

  get collaborateurCompetence(): CollaborateurCompetence {
    if (this._collaborateurCompetence == null){
      this._collaborateurCompetence = new CollaborateurCompetence();
    }
    return this._collaborateurCompetence;
  }

  set collaborateurCompetence(value: CollaborateurCompetence) {
    this._collaborateurCompetence = value;
  }

  private cloneCollaboratteur(collaborateur: Collaborateur) {
    const monCloneCollaboratteur = new Collaborateur();
    monCloneCollaboratteur.codeCollaborateur = collaborateur.codeCollaborateur;
    monCloneCollaboratteur.nom = collaborateur.nom
    monCloneCollaboratteur.prenom = collaborateur.prenom;
    return monCloneCollaboratteur;
  }
  private cloneCollaboratteurCompetence(collaborateurCompetence: CollaborateurCompetence) {
    const monCloneColCOMP = new CollaborateurCompetence();
    monCloneColCOMP.niveau = collaborateurCompetence.niveau;
    monCloneColCOMP.competence = collaborateurCompetence.competence
    return monCloneColCOMP;
  }

}
