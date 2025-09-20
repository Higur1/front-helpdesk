import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.css']
})
export class TicketCreateComponent implements OnInit {

  priority: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  title: FormControl = new FormControl(null, [Validators.required])
  observaton: FormControl = new FormControl(null, [Validators.required])
  technician: FormControl = new FormControl(null, [Validators.required])
  customer: FormControl = new FormControl(null, [Validators.required])

  constructor() { }

  ngOnInit(): void {
  }


  fieldValidation(): boolean {
    return this.priority.valid &&
      this.status.valid &&
      this.title.valid &&
      this.observaton.valid &&
      this.technician.valid &&
      this.customer.valid 
  }
}
