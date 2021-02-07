import {CardModel} from '../../card/model/card.model';

export class ClientModel {
  idClient: number;
  name1: string;
  name2: string;
  surname1: string;
  surname2: string;
  year: number;
  phone: string;
  email: string;
  cards: CardModel[];
}
