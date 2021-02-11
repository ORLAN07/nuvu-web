import {Component, Inject, OnInit} from '@angular/core';
import {ClientService} from '../../../../domains/client/services/client.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientModel} from '../../../../domains/client/model/client.model';
import {CardModel} from '../../../../domains/card/model/card.model';
import {CityService} from '../../../../domains/city/service/city.service';
import {CityModel} from '../../../../domains/city/model/city-model';
import {CardBrandModel} from '../../../../domains/card/model/card-brand.model';
import {CardLevelModel} from '../../../../domains/card/model/card-level.model';
import {CardBrandService} from '../../../../domains/card/service/Card-brand.service';
import {CardLevelService} from '../../../../domains/card/service/card-level.service';
import {CountryService} from '../../../../domains/country/service/country.service';
import {CountryModel} from '../../../../domains/country/model/country-model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';
import {formatDate} from '@angular/common';

export interface MatDialogDataClient {
  client: ClientModel;
}

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

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: MatDialogDataClient,
              private clientService: ClientService,
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
      isCreditDescription: [],
      cardLevel: [, Validators.required],
      dateDue: [, Validators.required],
      securityCode: [, Validators.required],
      city: [, Validators.required],
      country: [, Validators.required],
      price: [, Validators.required]
    }
  );

  ngOnInit(): void {
    if (this.dialogData.client !== null) {
      this.chargeClient();
    }
    this.loadCountry();
    //this.loadCities();
    this.loadCardBrand();
    this.loadCardLevel();
  }

  chargeClient(): void {
    console.log('datainput>>', this.dialogData);
    this.clientFormGroup.get('name1').setValue(this.dialogData.client.name1);
    this.clientFormGroup.get('name2').setValue(this.dialogData.client.name2);
    this.clientFormGroup.get('surname1').setValue(this.dialogData.client.surname1);
    this.clientFormGroup.get('surname2').setValue(this.dialogData.client.surname2);
    this.clientFormGroup.get('year').setValue(this.dialogData.client.year);
    this.clientFormGroup.get('phone').setValue(this.dialogData.client.phone);
    this.clientFormGroup.get('email').setValue(this.dialogData.client.email);
    this.clientFormGroup.get('city').setValue(this.dialogData.client.city.idCity);
    this.clientFormGroup.get('country').setValue(this.dialogData.client.city.country.code);
    this.onSelectChangeCountry(1, this.dialogData.client.city.country.code);
    this.dialogData.client.cards.forEach((card: CardModel) => {
      console.log('loadCard>>', card.credit);
      card.isCreditDescription = card.credit ? 'Credito' : 'Debito';
      card.country = card.city.country.code;
      this.cards.push(card);
    });
    this.dialogData.client.cards.length > 0 ? this.isAddCard = true : this.isAddCard = false;
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
    if (this.cardFormGroup.valid) {
      this.add();
    }
    this.clientService.create(this.buildObjectClient()).subscribe(
      (client: ClientModel) => {
        if (client !== null && client !== undefined) {
          this.dialog.close(client);
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
  }

  clean(): void {
    this.cardFormGroup.reset();
  }

  buildObjectCard(): CardModel {
    const card: CardModel = new CardModel();
    card.brand = new CardBrandModel();
    card.brand.idCardBrand = this.cardFormGroup.get('brand').value;
    card.credit = this.cardFormGroup.get('isCredit').value === 'Credito' ? true : false;
    card.isCreditDescription = this.cardFormGroup.get('isCredit').value;
    card.cardLevel = new CardLevelModel();
    card.cardLevel.idCardLevel = this.cardFormGroup.get('cardLevel').value;
    card.dateDue = this.cardFormGroup.get('dateDue').value;
    card.securityCode = this.cardFormGroup.get('securityCode').value;
    const city: CityModel = new CityModel();
    const country: CountryModel = new CountryModel();
    country.code = this.cardFormGroup.get('country').value;
    city.country = country;
    city.idCity = this.cardFormGroup.get('city').value;
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
    //client.cards = this.cards;
    return client;
  }

  remove(card: CardModel): void {
    const index = this.cards.indexOf(card);
    if (index >= 0) {
      this.cards.splice(index, 1);
    }
  }

  selected(card: CardModel): void {
    console.log('card select>>', card);
    this.buildObjectCardToForm(card);
    this.onSelectChangeCountry(0, card.country);
  }

  buildObjectCardToForm(card: CardModel): void {
    this.cardFormGroup.get('brand').setValue(card.brand.idCardBrand);
    this.cardFormGroup.get('isCredit').setValue(card.isCreditDescription);
    this.cardFormGroup.get('cardLevel').setValue(card.cardLevel.idCardLevel);
    this.cardFormGroup.get('dateDue').setValue(formatDate(card.dateDue, 'yyyy-MM-dd', 'en'));
    this.cardFormGroup.get('securityCode').setValue(card.securityCode);
    this.cardFormGroup.get('city').setValue(card.city.idCity);
    this.cardFormGroup.get('country').setValue(card.country);
    this.cardFormGroup.get('price').setValue(card.price);
    this.cardFormGroup.get('isCreditDescription').setValue(card.isCreditDescription);
    console.log('this>>', this.cardFormGroup);
  }

}
