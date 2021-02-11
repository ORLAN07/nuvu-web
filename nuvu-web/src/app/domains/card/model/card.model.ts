import {CardLevelModel} from './card-level.model';
import {CityModel} from '../../city/model/city-model';
import {CountryModel} from '../../country/model/country-model';
import {CardBrandModel} from './card-brand.model';

export class CardModel {
  idCard: number;
  brand: CardBrandModel;
  credit: boolean;
  isCreditDescription: string;
  dateDue: Date;
  cardLevel: CardLevelModel;
  securityCode: string;
  city: CityModel;
  country?: string;
  price: number;
}
