import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../../domains/client/services/client.service';
import {ClientModel} from '../../../../domains/client/model/client.model';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    const client: ClientModel = new ClientModel();
    client.idClient = 1;
    client.name1 = 'Juan';
    client.name2 = 'camilo';
    client.surname1 = 'guarnizo';
    client.surname2 = 'cerrano';
    client.year = 30;
    client.phone = '3675436798';
    client.email = 'juan@nuvu.com';
    this.clientService.create(client).subscribe(
      (clientResponse: ClientModel) => {
        console.log('client created>>', clientResponse);
      }
    );
  }

}
