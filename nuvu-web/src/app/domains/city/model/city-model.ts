import {CountryModel} from '../../country/model/country-model';

export class CityModel {
  idCity: number;
  country: CountryModel;
  name: string;
}
