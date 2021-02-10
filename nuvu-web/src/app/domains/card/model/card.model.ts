import {CardLevelModel} from './card-level.model';
import {CityModel} from '../../city/model/city-model';
import {CountryModel} from '../../country/model/country-model';

export class CardModel {
  idCard: number;
  brand: number;
  isCredit: boolean;
  dateDue: Date;
  cardLevel: CardLevelModel;
  securityCode: string;
  city: CityModel;
  country?: CountryModel;
  price: number;
}
