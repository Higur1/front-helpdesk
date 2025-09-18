import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {

  customer: Customer = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    profiles: [],
    createdAt: ''
  }

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
    });
  }

  verifyCustomerProfile(): boolean{
    return this.customer.profiles.includes('CUSTOMER');
  }
  verifyAdminProfile(): boolean{
    return this.customer.profiles.includes('ADMIN');
  }
  
  delete(): void {
    this.service.delete(this.customer).subscribe(() => {
      this.toast.success('Customer successfully delete', 'Deleted');
      this.router.navigate(['customers']);
    }, ex => {
      console.log(ex)
      const message = ex.error?.message || 'Unexpected error deleting customer'
      this.toast.error(message, 'Error')
    });
  }
}
