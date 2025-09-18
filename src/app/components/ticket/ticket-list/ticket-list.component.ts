import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/models/customer';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  ELEMENT_DATA: Ticket[] = [
    {
      id: 1,
      title: 'Ticket 1',
      createdAt: '17/09/2026',
      closedAt: '17/09/2026',
      priority: 'MEDIUM',
      status: 'OPEN',
      observation: 'First ticket',
      technicianId: 1,
      technicianName: 'Higor',
      customerId: 13,
      customerName: 'Linus Torvalds'
    }
  ] 

  displayedColumns: string[] = ['id', 'title', 'createdAt', 'closedAt', 'customerName', 'technicianName', 'priority', 'status', 'actions'];
  dataSource = new MatTableDataSource<Ticket>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
