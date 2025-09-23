import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-read',
  templateUrl: './ticket-read.component.html',
  styleUrls: ['./ticket-read.component.css']
})
export class TicketReadComponent implements OnInit {

  ticket: Ticket = {
    priority: '',
    status: '',
    title: '',
    observation: '',
    customerId: '',
    customerName: '',
    technicianId: '',
    technicianName: ''
  }

  constructor(
    private ticketService: TicketService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.ticket.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.ticketService.findById(this.ticket.id).subscribe(response => {
      console.log(response)
      this.ticket = response;
    }, ex => {
      this.toastrService.error(ex.error.error, 'Error');
    })
  }
}
