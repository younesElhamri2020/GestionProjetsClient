import {Tache} from './tache.model';
import {Collaborateur} from './collaborateur.model';


export class Projet {
  public  idProjet :number;
  public intituleP: string ;
  public dateDebutP: Date ;
  public dateFinP: Date ;
  public nbrCollaborateur: number;
  public  vhProjet: number;
  public taches = new Array<Tache>();

  constructor() {
    this.vhProjet = 0;
  }
}
