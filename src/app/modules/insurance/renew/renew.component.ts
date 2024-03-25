import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsuranceService } from 'src/app/core/insurance/insurance.service';
import { IInsurance } from 'src/app/core/insurance/insurance.type';
import { VehicleService } from 'src/app/core/vehicle/vehicle.service';

@Component({
  selector: 'app-renew',
  templateUrl: './renew.component.html',
  styleUrls: ['./renew.component.scss']
})
export class RenewComponent {
  insuranceData = [] 
  vehicles = [];

  iForm: FormGroup = new FormGroup({
    iName: new FormControl('', [Validators.required,Validators.maxLength(255),Validators.minLength(2)]),
    iNumber: new FormControl('', [Validators.required,Validators.maxLength(255),Validators.minLength(2)]),
    startDate: new FormControl('', [Validators.required,Validators.maxLength(255),Validators.minLength(2)]),
    endDate: new FormControl('', [Validators.required,Validators.maxLength(255),Validators.minLength(2)]),
    iAmount: new FormControl('', [Validators.required,Validators.maxLength(255),Validators.minLength(2)]),
    vNumber: new FormControl('', [Validators.required,Validators.maxLength(255),Validators.minLength(2)]),
  });


  constructor(@Inject(MAT_DIALOG_DATA) public data: IInsurance,private VehiclesServices: VehicleService,private insuranceServices:InsuranceService){}

ngOnInit(){
 //get vehicles
 this.VehiclesServices.getVehical().subscribe();
 this.VehiclesServices.vehicals$.subscribe((veh) => {
   this.vehicles = veh;
 });

//get insurance
// this.insuranceServices.renewInsurance(this.data.vNumber).subscribe((res)=>{
//   this.insuranceData = res
// })

}

  // save(){
  //   this.insuranceServices.renewInsurance(this.iForm.value,).subscribe({
      
  //   })

  // }

}
