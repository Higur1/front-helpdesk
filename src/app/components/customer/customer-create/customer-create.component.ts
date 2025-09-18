import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.css']
})
export class CustomerCreateComponent implements OnInit {

  customer: Customer = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    profiles: [],
    createdAt: ''
  }
  name: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, [Validators.minLength(11), Validators.required]);
  email: FormControl = new FormControl(null, Validators.email);
  password: FormControl = new FormControl(null, Validators.minLength(3));


  constructor(
    private service: CustomerService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.customer).subscribe(() => {
      this.toast.success('Customer successfully registered', 'Registered');
      this.router.navigate(['customers'])
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message, 'Error');
        });
      } else {
        this.toast.error(ex.error.message, 'Error');
      }
    })
  }

  fieldValidation(): boolean {
    return this.name.valid &&
      this.cpf.valid &&
      this.email.valid &&
      this.password.valid;
  }

  addProfile(profile: any): void {
    if (this.customer.profiles.includes(profile)) {
      this.customer.profiles.splice(this.customer.profiles.indexOf(profile), 1);
    } else {
      this.customer.profiles.push(profile);
    }
  }
}
