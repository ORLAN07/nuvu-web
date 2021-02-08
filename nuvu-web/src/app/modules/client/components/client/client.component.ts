import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../../domains/client/services/client.service';
import {ClientModel} from '../../../../domains/client/model/client.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreateClientComponent} from '../create-client/create-client.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  displayedColumns: string[] = ['name1', 'name2', 'surname1', 'surname2', 'year', 'phone', 'email', 'isCredit', 'options', 'create'];
  clients: ClientModel[] = [];

  constructor(private clientService: ClientService,
              public matDialog: MatDialog) { }

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
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAll().subscribe(
      (clientModels: ClientModel[]) => {
        this.clients = clientModels;
        console.log('clients>>', this.clients);
      }
    );
  }

  onCreate(): void {
    const dialogCreateClient: MatDialogRef<CreateClientComponent> = this.matDialog.open(CreateClientComponent);
  }

}
