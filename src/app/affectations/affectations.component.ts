import { Component, OnInit } from '@angular/core';
import {Projet} from '../controller/model/projet.model';
import {AffectationService} from '../controller/service/affectation.service';
import {Tache} from '../controller/model/tache.model';
import {Collaborateur} from '../controller/model/collaborateur.model';
import {Affectation} from '../controller/model/affectation.model';

@Component({
  selector: 'app-affectations',
  templateUrl: './affectations.component.html',
  styleUrls: ['./affectations.component.css']
})
export class AffectationsComponent implements OnInit {

    klik=false;
    klikk=false;
    intitule :string;
    proj:string;
    idTach:number;
    resultat =false;
    l=false;
    t=false;
  constructor(private affectationService: AffectationService) { }
  public Collaborateurselected(codeColab, idTache){
    this.affectationService.Collaborateurselected(codeColab, idTache);
  }
  ngOnInit(): void {
    this.affectationService.findAllPrjet();
    this.affectationService.recupererIdTach(this.idTach);
  }
  public affectationCollaboratteur(){
  this.affectationService.recupererIdTach(this.idTach);
    this.affectationService.affectationCollaboratteur();
    this.resultat=true;
  }
  public findByIdProjet(idProjet,intituleP ){
    this.proj=intituleP;
    this.klik=true;
    this.affectationService.findByIdProjet(idProjet);
  }
  get collaborateurs(): Array<Collaborateur> {
    return this.affectationService.collaborateurs;
  }
  public findcollcomptache(idTache,intit){
    this.idTach=idTache;
    this.intitule=intit;
    this.klikk = true;
    this.l=true;
    this.t=false;
    this.affectationService.detail(idTache);
    this.affectationService.details(idTache);
    return this.affectationService.findcollcomptache(idTache);
  }
  public validateaffectation(){
    return this.affectationService.validateaffectation();
  }
  public MaxVHTcollabTach( idTache, idCollaborateur){
    return this.affectationService.MaxVHTcollabTache(idTache, idCollaborateur);
  }

  get lists(): Array<Affectation> {
    return  this.affectationService.lists;
  }
  get maxVHT(): number {
    return this.affectationService.maxVHT;
  }
  get collaborateur(): Collaborateur {
    return  this.affectationService.collaborateur;
  }
  get projets(): Array<Projet> {
    return this.affectationService.projets;
  }
  get taches(): Array<Tache> {
    return this.affectationService.taches;
  }
  get tache(): Tache{
    return this.affectationService.tache;
  }
  get affectation(): Affectation{
    return this.affectationService.affectation;
  }
  get result(): number{
    return this.affectationService.result;
  }

}
