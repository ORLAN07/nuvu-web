import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../../domains/client/services/client.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClientModel} from '../../../../domains/client/model/client.model';
import {CardModel} from '../../../../domains/card/model/card.model';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {CityService} from '../../../../domains/city/service/city.service';
import {CityModel} from '../../../../domains/city/model/city-model';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  constructor(private clientService: ClientService,
              private formBuilder: FormBuilder,
              private cityService: CityService) { }

  isAddCard: boolean = false;
  cards: CardModel[] = [];
  cities: CityModel[] = [];
  clientFormGroup: FormGroup = this.formBuilder.group({
    name1: [, Validators.required],
    name2: [''],
    surname1: [, Validators.required],
    surname2: [''],
    year: [, Validators.required],
    phone: [, Validators.required],
    email: [, Validators.required]
  });

  cardFormGroup: FormGroup = this.formBuilder.group(
    {
      brand: [, Validators.required],
      isCredit: [, Validators.required],
      cardLevel: [, Validators.required],
      dateDue: [, Validators.required],
      securityCode: [, Validators.required],
      city: [, Validators.required],
      price: [, Validators.required]
    }
  );

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.cityService.get().subscribe(
      (cities: CityModel[]) => {
        this.cities = cities;
        console.log('cities>>', this.cities);
      }
    );
  }

  onCreate(): void {
    console.log('name1>>', this.clientFormGroup.get('name1'));
    this.clientService.create(this.buildObjectClient()).subscribe(
      (client: ClientModel) => {
        console.log('clientCreated>>', client);
      }
    );
  }

  onAddCard(): void {
    this.isAddCard ? this.isAddCard = false : this.isAddCard = true;
  }

  add(): void {
    this.cards.push(this.buildObjectCard());
  }

  buildObjectCard(): CardModel {
    const card: CardModel = new CardModel();
    card.brand = this.cardFormGroup.get('brand').value;
    card.isCredit = this.cardFormGroup.get('isCredit').value;
    card.brand = this.cardFormGroup.get('brand').value;
    card.brand = this.cardFormGroup.get('brand').value;
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
    return client;
  }

  remove(card: CardModel): void {
    const index = this.cards.indexOf(card);
    if (index >= 0) {
      this.cards.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    //this.cards.push(event.option.viewValue);
  }

}
