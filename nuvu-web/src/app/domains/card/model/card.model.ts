import {CardLevelModel} from './card-level.model';
import {CityModel} from '../../city/model/city-model';

export class CardModel {
  idCard: number;
  brand: string;
  isCredit: boolean;
  dateDue: Date;
  cardLevel: CardLevelModel;
  securityCode: string;
  city: CityModel;
  price: number;
}
