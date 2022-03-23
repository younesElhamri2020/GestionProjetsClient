import { Injectable } from '@angular/core';
import {Projet} from '../model/projet.model';
import {Tache} from '../model/tache.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private _taches: Array<Tache>;
  private  _tache: Tache;

  constructor(private http: HttpClient) { }

  public findAll(){
    this.http.get<Array<Tache>>("http://localhost:8090/GestionProjet/Tache/" ).subscribe(
      data => {
        console.log('data' + data)
        this.taches = data;
      },

    );
  }
  public delete(idTache){
    this.http.delete<number>('http://localhost:8090/GestionProjet/Tache/delete/idTache/'+idTache)
      .subscribe(
        data => {
          alert('La Tache a été suppremer avec succes');
          this.findAll();
        },eror => {
          console.log('eror');
        }
      );
  }
  public findTache(intitule){
    this.http.get<Tache>('http://localhost:8090/GestionProjet/Tache/findTache/intitule/'+intitule)
      .subscribe(
        data => {
          this.tache=data;
        },eror => {
          console.log('eror');
        }
      );
  }
  public update(tache){
    this.http.put('http://localhost:8090/GestionProjet/Tache/update/tache/',tache).subscribe(
      data => {
        this.findAll();
        console.log(data);
      },

    );
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
      this._tache  = new Tache();
    }
    return this._tache;
  }

  set tache(value: Tache) {
    this._tache = value;
  }
}
