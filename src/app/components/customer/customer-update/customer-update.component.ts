import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

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
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.customer.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.customer.id).subscribe(response => {
      this.customer = response;
    })
  }

  verifyCustomerProfile(): boolean{
    return this.customer.profiles.includes('CUSTOMER')
  }
  verifyAdminProfile(): boolean{
    return this.customer.profiles.includes('ADMIN')
  }
  
  update(): void {
    this.service.update(this.customer).subscribe(() => {
      this.toast.success('Customer successfully updated', 'Updated');
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
