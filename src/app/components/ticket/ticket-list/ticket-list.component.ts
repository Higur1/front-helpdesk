import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  ELEMENT_DATA: Ticket[] = [];
  FILTERED_DATA: Ticket[] = [];

  displayedColumns: string[] = [
    'id',
    'title',
    'createdAt',
    'closedAt',
    'customerName',
    'technicianName',
    'priority',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<Ticket>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: TicketService) { }

  ngOnInit(): void {
    this.findAll();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  findAll(): void {
    this.service.findAll().subscribe(response => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Ticket>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  orderByStatus(status: any): void {
    let list: Ticket[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if (element.status == status) {
        list.push(element);
      }
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Ticket>(list);
    this.dataSource.paginator = this.paginator;
  }
}
