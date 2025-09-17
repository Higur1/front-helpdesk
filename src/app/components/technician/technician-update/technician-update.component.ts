import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Technician } from 'src/app/models/technician';
import { TechnicianService } from 'src/app/services/technician.service';

@Component({
  selector: 'app-technician-update',
  templateUrl: './technician-update.component.html',
  styleUrls: ['./technician-update.component.css']
})
export class TechnicianUpdateComponent implements OnInit {

  technician: Technician = {
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
    private service: TechnicianService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.technician.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.technician.id).subscribe(response => {
      this.technician = response;
    })
  }

  verifyCustomerProfile(): boolean{
    return this.technician.profiles.includes('CUSTOMER')
  }
  verifyAdminProfile(): boolean{
    return this.technician.profiles.includes('ADMIN')
  }
  
  update(): void {
    console.log(this.technician.profiles)
    this.service.update(this.technician).subscribe(() => {
      this.toast.success('Technician successfully update', 'Updated');
      this.router.navigate(['technicians'])
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
    if (this.technician.profiles.includes(profile)) {
      this.technician.profiles.splice(this.technician.profiles.indexOf(profile), 1);
    } else {
      this.technician.profiles.push(profile);
    }
  }
}
