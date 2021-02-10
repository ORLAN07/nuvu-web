import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../domains/client/services/client.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientModel} from '../../../../domains/client/model/client.model';
import {CardModel} from '../../../../domains/card/model/card.model';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {CityService} from '../../../../domains/city/service/city.service';
import {CityModel} from '../../../../domains/city/model/city-model';
import {CardBrandModel} from '../../../../domains/card/model/card-brand.model';
import {CardLevelModel} from '../../../../domains/card/model/card-level.model';
import {CardBrandService} from '../../../../domains/card/service/Card-brand.service';
import {CardLevelService} from '../../../../domains/card/service/card-level.service';
import {CountryService} from '../../../../domains/country/service/country.service';
import {CountryModel} from '../../../../domains/country/model/country-model';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  isAddCard: boolean = false;
  cardBrands: CardBrandModel[] = [];
  cardLevels: CardLevelModel[] = [];
  cards: CardModel[] = [];
  cities: CityModel[] = [];
  citiesByCard: CityModel[] = [];
  countries: CountryModel[] = [];
  cardType: string[] = ['Credito', 'Debito'];

  constructor(private clientService: ClientService,
              private formBuilder: FormBuilder,
              private cityService: CityService,
              private cardBrandService: CardBrandService,
              private cardLevelService: CardLevelService,
              private countryService: CountryService,
              private dialog: MatDialogRef<CreateClientComponent>) {
  }

  clientFormGroup: FormGroup = this.formBuilder.group({
    name1: [, Validators.required],
    name2: [''],
    surname1: [, Validators.required],
    surname2: [''],
    year: [, Validators.required],
    phone: [, Validators.required],
    email: [, Validators.required],
    city: [, Validators.required],
    country: [, Validators.required]
  });
  cardFormGroup: FormGroup = this.formBuilder.group(
    {
      brand: [, Validators.required],
      isCredit: [, Validators.required],
      cardLevel: [, Validators.required],
      dateDue: [, Validators.required],
      securityCode: [, Validators.required],
      city: [, Validators.required],
      country: [, Validators.required],
      price: [, Validators.required]
    }
  );

  ngOnInit(): void {
    this.loadCountry();
    //this.loadCities();
    this.loadCardBrand();
    this.loadCardLevel();
  }

  loadCountry(): void {
    this.countryService.get().subscribe(
      (countries: CountryModel[]) => {
        this.countries = countries;
        this.countries.sort((a: CountryModel, b: CountryModel) => {
          return a.name < b.name ? -1 : 1;
        });
      }
    );
  }

  loadCardBrand(): void {
    this.cardBrandService.get().subscribe(
      (cardBrand: CardBrandModel[]) => {
        this.cardBrands = cardBrand;
      }
    );
  }

  loadCardLevel(): void {
    this.cardLevelService.get().subscribe(
      (cardLevel: CardLevelModel[]) => {
        this.cardLevels = cardLevel;
      }
    );
  }

  loadCities(): void {
    this.cityService.get().subscribe(
      (cities: CityModel[]) => {
        this.cities = cities;
        console.log('cities>>', this.cities);
      }
    );
  }

  onSelectChangeCountry(index: number, codeCountry: string): void {
    if (index === 0) {
      this.cardFormGroup.get('country').setValue(codeCountry);
      console.log('set code>>>', this.cardFormGroup);
    }
    this.cityService.getByCountry(codeCountry).subscribe(
      (cities: CityModel[]) => {
        if (index === 1) {
          this.cities = cities;
        } else {
          this.citiesByCard = cities;
        }
        console.log('find By Country>>', cities);
      }
    );
  }

  onSelectCity(index: number, idCity: number): void {
    if (index === 1) {
      this.clientFormGroup.get('city').setValue(idCity);
    } else {
      this.cardFormGroup.get('city').setValue(idCity);
    }
    console.log('card>>', this.cardFormGroup);
  }

  onSelectCardBrand(idBrand: number): void {
    this.cardFormGroup.get('brand').setValue(idBrand);
  }

  onSelectCardType(type: string): void {
    this.cardFormGroup.get('isCredit').setValue(type);
  }

  onSelectCardLevel(cardLevel: number): void {
    this.cardFormGroup.get('cardLevel').setValue(cardLevel);
  }

  onCreate(): void {
    console.log('name1>>', this.clientFormGroup.get('name1'));
    if (this.cardFormGroup.valid) {
      this.add();
    }
    this.clientService.create(this.buildObjectClient()).subscribe(
      (client: ClientModel) => {
        if (client !== null && client !== undefined) {
          this.dialog.close();
        }
        console.log('clientCreated>>', client);
      }
    );
  }

  onAddCard(): void {
    this.isAddCard ? this.isAddCard = false : this.isAddCard = true;
  }

  add(): void {
    this.cards.push(this.buildObjectCard());
    this.cardFormGroup.reset();
    console.log('cards>>', this.cards);
  }

  buildObjectCard(): CardModel {
    const card: CardModel = new CardModel();
    card.brand = new CardBrandModel();
    card.brand.idCardBrand = this.cardFormGroup.get('brand').value;
    card.isCredit = this.cardFormGroup.get('isCredit').value === 'Credito' ? true : false;
    card.cardLevel = new CardLevelModel();
    card.cardLevel.idCardLevel = this.cardFormGroup.get('cardLevel').value;
    card.dateDue = this.cardFormGroup.get('dateDue').value;
    card.securityCode = this.cardFormGroup.get('securityCode').value;
    const city: CityModel = new CityModel();
    const country: CountryModel = new CountryModel();
    country.code = this.clientFormGroup.get('country').value;
    city.country = country;
    city.idCity = this.clientFormGroup.get('city').value;
    card.city = city;
    card.country = this.cardFormGroup.get('country').value;
    card.price = this.cardFormGroup.get('price').value;
    return card;
  }

  buildObjectClient(): ClientModel {
    const client: ClientModel = new ClientModel();
    client.name1 = this.clientFormGroup.get('name1').value;
    client.name2 = this.clientFormGroup.get('name2').value;
    client.surname1 = this.clientFormGroup.get('surname1').value;
    client.surname2 = this.clientFormGroup.get('surname2').value;
    client.year = this.clientFormGroup.get('year').value;
    client.phone = this.clientFormGroup.get('phone').value;
    client.email = this.clientFormGroup.get('email').value;
    const city: CityModel = new CityModel();
    const country: CountryModel = new CountryModel();
    country.code = this.clientFormGroup.get('country').value;
    city.country = country;
    city.idCity = this.clientFormGroup.get('city').value;
    client.city = city;
    client.cards = this.cards;
    return client;
  }

  remove(card: CardModel): void {
    const index = this.cards.indexOf(card);
    if (index >= 0) {
      this.cards.splice(index, 1);
    }
  }

  selected(card: CardModel): void {
    //this.cards.push(event.option.viewValue);
    console.log('on select>>', card);
    this.buildObjectCardToForm(card);
  }

  buildObjectCardToForm(card: CardModel): void {
    this.cardFormGroup.get('brand').setValue(card.brand);
    this.cardFormGroup.get('isCredit').setValue(card.isCredit);
    this.cardFormGroup.get('cardLevel').setValue(card.cardLevel);
    this.cardFormGroup.get('dateDue').setValue(card.dateDue);
    this.cardFormGroup.get('securityCode').setValue(card.securityCode);
    this.cardFormGroup.get('city').setValue(card.city);
    this.cardFormGroup.get('country').setValue(card.country);
    this.cardFormGroup.get('price').setValue(card.price);
  }

}
