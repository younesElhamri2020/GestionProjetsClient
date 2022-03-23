import { Component, OnInit } from '@angular/core';
import {Tache} from '../controller/model/tache.model';
import {TacheService} from '../controller/service/tache.service';

@Component({
  selector: 'app-taches',
  templateUrl: './taches.component.html',
  styleUrls: ['./taches.component.css']
})
export class TachesComponent implements OnInit {
 show=false;
  constructor(private tacheService: TacheService) { }

  ngOnInit(): void {
    this.tacheService.findAll();
  }
  get taches(): Array<Tache> {
    return  this.tacheService.taches;

  }
  get tache(): Tache{
    return  this.tacheService.tache;

  }
  public edit(intitule){
    this.show=true;
    this.tacheService.findTache(intitule);
  }
  public update(){
    this.tacheService.update(this.tache);
    this.show=false;
  }
  public delete(idTache){
    this.tacheService.delete(idTache);
  }

}
