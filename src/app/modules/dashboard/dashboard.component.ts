import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { DashboardService } from 'src/app/core/dashboard/dashboard.service';
import { IDashboard } from 'src/app/core/dashboard/dashboard.type';
import { InsuranceService } from 'src/app/core/insurance/insurance.service';
import { IInsurance } from 'src/app/core/insurance/insurance.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data : IDashboard

  displayedColumns: string[] = [
    'id',
    'iName',
    'vNumber',
    'iStartDate',
    'iEndDate',
    'iAmount',
  ];

  

  dataSource: MatTableDataSource<IInsurance> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private dashboardSerives:DashboardService,private insuranceServices:InsuranceService) { }

  ngOnInit(): void {
    this.dashboardSerives.getDashboard().subscribe((val:any)=>{
      this.data = val
      console.log(val);
      
    })
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    //get Insurance
    this.insuranceServices.getInsurance().subscribe();
    this.insuranceServices.insurances$.subscribe((ince)=>{
      this.dataSource.data= ince

      
      
    })

  }

  displayFn(value: any) {
    return value.name;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
