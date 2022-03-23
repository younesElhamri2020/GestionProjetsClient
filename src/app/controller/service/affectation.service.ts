import { Injectable } from '@angular/core';
import {Tache} from '../model/tache.model';
import {Projet} from '../model/projet.model';
import {HttpClient} from '@angular/common/http';
import {Collaborateur} from '../model/collaborateur.model';
import {Affectation} from '../model/affectation.model';
import {Competence} from '../model/competence.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {
  private _affectation :Affectation;
  private _affectations :Array<Affectation>;
  private _projets: Array<Projet>;
  private _taches: Array<Tache>;
  private  _tache:Tache;
  private _projet: Projet;
  private _collaborateurs: Array<Collaborateur>;
  private _collaborateur: Collaborateur;
  public result:number;
  private idTache:number;
  private _maxVHT: number;
  private _lists: Array<Affectation>;
  private _mapp:Array<Map<Affectation,number>>;
  constructor(private http: HttpClient) { }

  public affectationCollaboratteur(){
    this.http.post<number>('http://localhost:8090/GestionProjet/Affectation/affectation/', this.affectation).subscribe(
      data => {
        console.log(data);
        this.result=data;
        if(this.result==1){
          this.affectations.push(this.cloneAffectation(this.affectation));
          this.affectation = null;
        }
        this.detail(this.idTache);
      },eror => {
        console.log('eror');
      }
    );
  }

  public MaxVHTcollabTache( idTache, idCollaborateur):number{
    this.http.get<number>('http://localhost:8090/GestionProjet/Affectation/max/idTache/' + idTache + '/idCollaborateur/' + idCollaborateur ).subscribe(
      data => {
        console.log('data' + data);
        this._maxVHT =data;
      },

    );
    return this._maxVHT;
  }

  public detail(idTache){
    this.http.get<Array<Affectation>>('http://localhost:8090/GestionProjet/Affectation/detailAffectationTache/idTache/' + idTache ).subscribe(
      data => {
        console.log('data' + data);
        this._lists = data ;
      },

    );
  }

  public details( idTache){
    this.http.get<Array<object[]>>('http://localhost:8090/GestionProjet/Affectation/details/idTache/' + idTache ).subscribe(
      data => {
        console.log('data' + data);
      },
    );
  }

  public recupererIdTach(id){
    this.idTache=id;
  }
  public Collaborateurselected(codeColab, idTache){
    const collaborateur = new Collaborateur();
    collaborateur.codeCollaborateur = codeColab;
    collaborateur.idCollaborateur=0;
    collaborateur.nom=null;
    collaborateur.prenom=null;
    this.affectation.collaborateur = collaborateur;

    const tache = new Tache();
    tache.idTache = idTache;
    this.affectation.tache = tache ;
    this.affectations.push(this.cloneAffectation(this.affectation));
  }

  public validateaffectation(): boolean{
    return this.affectation.vhT != null && this.affectation.collaborateur != null ;
  }



  public findcollcomptache(idTache){
    this.http.get<Array<Collaborateur>>('http://localhost:8090/GestionProjet/Tache/colaborateur/id/' + idTache).subscribe(
      data => {
        console.log('data' + data);
        this.collaborateurs = data ;
      },
    );
  }

  public findAllPrjet(){
    this.http.get<Array<Projet>>('http://localhost:8090/GestionProjet/Projet/' ).subscribe(
      data => {
        console.log('data' + data);
        this.projets = data;
      },
    );
  }

  public findByIdProjet(idProjet){
    this.http.get<Array<Tache>>('http://localhost:8090/GestionProjet/Tache/projet/idProjet/' + idProjet).subscribe(
      data => {
        this.taches=data;
        console.log('data' + data);
      },
    );
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

  get taches(): Array<Tache> {
    if (this._taches == null){
      this._taches = new Array<Tache>();
    }
    return this._taches;
  }

  set taches(value: Array<Tache>) {
    this._taches = value;
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

  get projet(): Projet {
    if (this._projet == null){
      this._projet = new Projet();
    }
    return this._projet;
  }

  set projet(value: Projet) {
    this._projet = value;
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

  get collaborateur(): Collaborateur {
    if (this._collaborateur == null){
      this._collaborateur = new Collaborateur();
    }
    return this._collaborateur;
  }

  set collaborateur(value: Collaborateur) {
    this._collaborateur = value;
  }

  get affectation(): Affectation {
    if (this._affectation == null){
      this._affectation = new Affectation();
    }
    return this._affectation;
  }

  set affectation(value: Affectation) {
    this._affectation = value;
  }
  get affectations(): Array<Affectation> {
    if (this._affectations == null){
      this._affectations = new Array<Affectation>() ;
    }
    return this._affectations;
  }

  set affectations(value: Array<Affectation>) {
    this._affectations = value;
  }
  get maxVHT(): number {
    return this._maxVHT;
  }

  set maxVHT(value: number) {
    this._maxVHT = value;
  }

  get lists(): Array<Affectation> {
    if (this._lists == null){
      this._lists = new Array<Affectation>() ;
    }
    return this._lists;
  }

  set lists(value: Array<Affectation>) {
    this._lists= value;
  }
  private cloneAffectation(affectation: Affectation) {
    const monCloneAffectation = new Affectation();
    monCloneAffectation.collaborateur = affectation.collaborateur;
    monCloneAffectation.tache = affectation.tache;
    monCloneAffectation.vhT = affectation.vhT;
    return monCloneAffectation;
  }
}
