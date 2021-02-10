import {CardModel} from '../../card/model/card.model';
import {CityModel} from '../../city/model/city-model';

export class ClientModel {
  idClient: number;
  name1: string;
  name2: string;
  surname1: string;
  surname2: string;
  year: number;
  phone: string;
  email: string;
  city: CityModel;
  cards: CardModel[];
}
