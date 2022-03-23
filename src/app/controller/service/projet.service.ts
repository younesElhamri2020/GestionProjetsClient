import { Injectable } from '@angular/core';
import {Projet} from '../model/projet.model';
import {Tache} from '../model/tache.model';
import {HttpClient} from '@angular/common/http';
import {Competence} from '../model/competence.model';
import {Collaborateur} from '../model/collaborateur.model';
import {Affectation} from '../model/affectation.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private _projet: Projet;
  private _tache: Tache ;
  private _competences: Array<Competence>;
  private _competencesC: Array<Competence>;
  private _projets: Array<Projet>;
  private _projetA: Projet;
  private _affect:number;
  private _rest:number;
  private _restt:number;
  private _taux:number;
  private _list: Array<Affectation>;

  ngOnInit(): void {
    this.findComp();
    this.findAll();
    this.competencesC.length=0;
  }

  constructor(private http: HttpClient) { }

  public save(){
    this.http.post<number>("http://localhost:8090/GestionProjet/Projet/" , this.projet).subscribe(
      data => {
        if (data > 0){
          this.projets.push(this.cloneProjet(this.projet));
          this.projet = null;
        }
      }, eror => {
        console.log('eror');
      } );
  }

  public findComp(){
    this.http.get<Array<Competence>>("http://localhost:8090/GestionProjet/Competence/").subscribe(
      data => {
        console.log('data' + data);
        this.competences = data;
      },
    );
  }

  public TaskasAnulle(designation){
    this.tache.competences.splice(designation,1);
  }
  public validatesave(): boolean{
    return this.projet.intituleP != null && this.projet.dateDebutP != null && this.projet.dateFinP != null && this.projet.nbrCollaborateur != null && this.projet.taches.length > 0;
  }

  public delete(intituleP){
    this.http.delete('http://localhost:8090/GestionProjet/Projet/intituleP/'+intituleP)
      .subscribe(
        data => {
          this.projet = null;
          alert('Le projet a été suppremer avec succes');
          this.findAll();
        },eror => {
          console.log('eror');
        }
      );
  }

  public addListeCompetence(designation){
    const competence = new Competence();
    competence.designation = designation;
    this.tache.competences.push(competence);
    console.log(this.tache.competences[0].designation);
    console.log(this.tache.competences.length);
  }
  public addTache(){
    this.projet.vhProjet += this.tache.vhTache;
    this.projet.taches.push(this.clonTache(this.tache));
    this.tache=null;
    console.log(this.tache);
  }
  public validateaddTache(): boolean{
    return this.tache.intitule != null && this.tache.dateDebutT != null && this.tache.dateFinT != null && this.tache.vhTache != null && this.tache.competences.length>0;
  }

  public nbAffectTache(idTache,idProjet):number{
    console.log('okk');
    this.http.get<number>('http://localhost:8090/GestionProjet/Affectation/sumHeure/idt/'+idTache+'/idp/'+idProjet).subscribe(
      data => {
        console.log('data' + data);
        this.affect=data;
      },

    );
    return this.affect;
  }
  public tauxTache(intitule):number{
    this.http.get<number>("http://localhost:8090/GestionProjet/Affectation/tauxTache/intitule/"+intitule).subscribe(
      data => {
        console.log('data' + data);
        this.restt=data;
      },
    );
    return this.restt;
  }
  public nbAffect(idProjet){
    console.log('okk');
    this.http.get<number>("http://localhost:8090/GestionProjet/Projet/id/"+idProjet).subscribe(
      data => {
        console.log('data' + data);
        this.affect=data;
      },
    );
  }

  public nbRest(intitule){
    console.log('okk');
    this.http.get<number>("http://localhost:8090/GestionProjet/Projet/intitul/"+intitule).subscribe(
      data => {
        console.log('data' + data);
        this.rest=data;
      },
    );
  }
  public tauxRealisation(intitule){
    this.http.get<number>("http://localhost:8090/GestionProjet/Projet/taux/intitule/"+intitule).subscribe(
      data => {
        console.log('data' + data);
        this.taux=data;
      },
    );
  }
  public findProjet(intitule){
    this.http.get<Projet>("http://localhost:8090/GestionProjet/Projet/intituleP/"+intitule).subscribe(
      data => {
        console.log('data' + data);
        this.projetA=data;
      },
    );
  }


  public findAll(){
    this.http.get<Array<Projet>>("http://localhost:8090/GestionProjet/Projet/" ).subscribe(
      data => {
        console.log('data' + data)
        this.projets = data;
      },

    );
  }
  public findTacheProjet(idProjet){
    console.log('tache');
    this.http.get<Array<Affectation>>('http://localhost:8090/GestionProjet/Affectation/listeTache/idProjet/' + idProjet).subscribe(
      data => {
        this.list=data;
        console.log('data' + data);
        console.log(this.projet.taches );
        console.log('fin------------' );
      },

    );
  }

  get taux(): number {
    return this._taux;
  }

  set taux(value: number) {
    this._taux = value;
  }
  get affect(): number {
    return this._affect;
  }

  set affect(value: number) {
    this._affect = value;
  }
  get rest(): number {
    return this._rest;
  }

  set rest(value: number) {
    this._rest= value;
  }
  get restt(): number {
    return this._restt;
  }

  set restt(value: number) {
    this._restt= value;
  }
  get projetA(): Projet {
    if (this._projetA == null){
      this._projetA = new Projet();
    }
    return this._projetA;
  }

  set projetA(value: Projet) {
    this._projetA = value;
  }
  get projet(): Projet {
    if (this._projet == null){
      this._projet = new Projet();
    }
    return this._projet;
  }

  set projet(value: Projet) {
    this._projet = value;
  }

  get projets(): Array<Projet> {
    if (this._projets == null){
      this._projets = new Array<Projet>();
    }
    return this._projets;
  }

  set projets(value: Array<Projet>) {
    this._projets = value;
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
  get competencesC(): Array<Competence> {
    if (this._competencesC == null){
      this._competencesC = new Array<Competence>();
    }
    return this._competencesC;
  }

  set competencesC(value: Array<Competence>) {
    this._competencesC = value;
  }
  get tache(): Tache {
    if (this._tache == null){
      this._tache = new Tache();
    }
    return this._tache;
  }

  set tache(value: Tache) {
    this._tache = value;
  }
  get list(): Array<Affectation> {
    if (this._list == null){
      this._list = new Array<Affectation>() ;
    }
    return this._list;
  }

  set list(value: Array<Affectation>) {
    this._list = value;
  }

  private cloneProjet(projet: Projet) {
    const monClone = new Projet();
    monClone.intituleP = projet.intituleP;
    monClone.dateDebutP = projet.dateDebutP;
    monClone.dateFinP =  projet.dateFinP;
    monClone.nbrCollaborateur = projet.nbrCollaborateur;
    monClone.vhProjet = projet.vhProjet;
    return monClone;
  }
  private clonTache(tache: Tache){
    const  tachec = new Tache();
    tachec.intitule = tache.intitule;
    tachec.dateDebutT = tache.dateDebutT;
    tachec.dateFinT = tache.dateFinT;
    tachec.vhTache = tache.vhTache;
    tachec.competences = tache.competences;
    return tachec;

  }
}
