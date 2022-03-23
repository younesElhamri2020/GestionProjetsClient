import {Competence} from './competence.model';

export class Tache {
  public idTache:number;
  public intitule: string ;
  public dateDebutT: Date ;
  public dateFinT: Date ;
  public  vhTache: number;
  public competences = new Array<Competence>();
}
