import { Component, OnInit } from '@angular/core';
import {ProjetService} from '../controller/service/projet.service';
import {Projet} from '../controller/model/projet.model';
import {Affectation} from '../controller/model/affectation.model';
import {AffectationService} from '../controller/service/affectation.service';

@Component({
  selector: 'app-acceuils',
  templateUrl: './acceuils.component.html',
  styleUrls: ['./acceuils.component.css']
})
export class AcceuilsComponent implements OnInit {

  showT=false;
  constructor(private projetService: ProjetService,private affectationService :AffectationService) { }

  ngOnInit(): void {
    this.projetService.findAll();
  }
  public Suiver(idProjet,intituleProjet){
    this.showT=true;
    this.projetService.findProjet(intituleProjet);
    this.projetService.nbAffect(idProjet);
    this.projetService.nbRest(intituleProjet);
    this.projetService.tauxRealisation(intituleProjet);
    this.projetService.findTacheProjet(idProjet);
    console.log('suiv');
  }
  get lists(): Array<Affectation> {
    return  this.affectationService.lists;
  }
  get taux(): number {
    return this.projetService.taux;
  }
  get affect(): number {
    return this.projetService.affect;
  }
  get rest(): number {
    return this.projetService.rest;
  }

  get projets(): Array<Projet> {

    return this.projetService.projets;
  }
  get projetA(): Projet{

    return this.projetService.projetA;
  }

  get list(): Array<Affectation> {
    return this.projetService.list;
  }
  public nbAffectTache(idTache,idProjet):number{
    return this.projetService.nbAffectTache(idTache,idProjet);
  }
  public tauxTache(intitule):number{
    return this.projetService.tauxTache(intitule);
  }

}
