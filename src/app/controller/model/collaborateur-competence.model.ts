import {Competence} from './competence.model';
import {Collaborateur} from './collaborateur.model';

export class CollaborateurCompetence {
  public id: number;
  public competence : Competence;
  public collaborateur : Collaborateur;
  public niveau: string ;
}
