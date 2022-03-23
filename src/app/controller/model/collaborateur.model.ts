import {Competence} from './competence.model';
import {CollaborateurCompetence} from './collaborateur-competence.model';

export class Collaborateur {
  public idCollaborateur: number;
  public codeCollaborateur: string ;
  public nom: string ;
  public prenom: string ;
  public collaborateurCompetences = new Array<CollaborateurCompetence>();
}
