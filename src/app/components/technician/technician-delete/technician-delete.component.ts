import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Technician } from 'src/app/models/technician';
import { TechnicianService } from 'src/app/services/technician.service';

@Component({
  selector: 'app-technician-delete',
  templateUrl: './technician-delete.component.html',
  styleUrls: ['./technician-delete.component.css']
})
export class TechnicianDeleteComponent implements OnInit {

  technician: Technician = {
    id: '',
    name: '',
    cpf: '',
    email: '',
    password: '',
    profiles: [],
    createdAt: ''
  }

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
    });
  }

  verifyCustomerProfile(): boolean{
    return this.technician.profiles.includes('CUSTOMER');
  }
  verifyAdminProfile(): boolean{
    return this.technician.profiles.includes('ADMIN');
  }
  
  delete(): void {
    this.service.delete(this.technician).subscribe(() => {
      this.toast.success('Technician successfully delete', 'Deleted');
      this.router.navigate(['technicians']);
    }, ex => {
      console.log(ex)
      const message = ex.error?.message || 'Unexpected error deleting technician'
      this.toast.error(message, 'Error')
    });
  }
}
