import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../../../domains/client/services/client.service';
import {ClientModel} from '../../../../domains/client/model/client.model';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {CreateClientComponent} from '../create-client/create-client.component';
import {ClientDialogComponent} from '../client-dialog/client-dialog.component';

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
    const dialogCreateClient: MatDialogRef<CreateClientComponent> = this.matDialog.open(CreateClientComponent, { data: {client: null}});
    dialogCreateClient.afterClosed().subscribe(
      (clientModule: ClientModel) => {
        this.clients.push(clientModule);
      }
    );
  }

  onEdit(clientModel: ClientModel): void {
    console.log('model edit>>', clientModel);
    const dialogCreateClient: MatDialogRef<CreateClientComponent> = this.matDialog.open(CreateClientComponent, {data: {client: clientModel}});
  }

  onDelete(client: ClientModel): void {
    this.clients = this.clients.filter((clientModel: ClientModel) => clientModel.idClient !== client.idClient);
    this.clientService.delete(client.idClient).subscribe(
      (isDelete: boolean) => {
        if (isDelete) {
          const dialogRef: MatDialogRef<ClientDialogComponent> = this.matDialog.open(ClientDialogComponent);
        }
      }
    );
  }

}
