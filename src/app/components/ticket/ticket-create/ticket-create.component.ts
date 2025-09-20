import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Technician } from 'src/app/models/technician';
import { Ticket } from 'src/app/models/ticket';
import { CustomerService } from 'src/app/services/customer.service';
import { TechnicianService } from 'src/app/services/technician.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {

  customers: Customer[] = [];
  technicians: Technician[] = [];
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

  priority: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  title: FormControl = new FormControl(null, [Validators.required]);
  observation: FormControl = new FormControl(null, [Validators.required]);
  technician: FormControl = new FormControl(null, [Validators.required]);
  customer: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private ticketService: TicketService,
    private customerService: CustomerService,
    private technicianService: TechnicianService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllCustomers();
    this.findAllTechnician();
  }

  create(): void {
    this.ticketService.create(this.ticket).subscribe(response =>{
      this.toastrService.success('Ticket successfully registered', 'Registered');
      this.router.navigate(['tickets']);
    }, ex => {
      this.toastrService.error(ex.error.error, 'Error');
    })
  }

  fieldValidation(): boolean {
    return this.priority.valid &&
      this.status.valid &&
      this.title.valid &&
      this.observation.valid &&
      this.technician.valid &&
      this.customer.valid
  }

  findAllCustomers(): void {
    this.customerService.findAll().subscribe(response => {
      this.customers = response.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  findAllTechnician(): void {
    this.technicianService.findAll().subscribe(response => {
      this.technicians = response.sort((a, b) => a.name.localeCompare(b.name));
    });
  }
}
