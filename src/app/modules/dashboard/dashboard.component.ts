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
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: IDashboard;
//for chart
  chartOptions: any;

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

  constructor(
    private dashboardSerives: DashboardService,
    private insuranceServices: InsuranceService
  ) {}

  ngOnInit(): void {
    this.dashboardSerives.getDashboard().subscribe((val: any) => {
      this.data = val;
      console.log(val);
    });
// for chart
this.chartOptions = {
  series: [{
    name: 'All',
    data1: [30, 40, 45, 50, 49, 60, 70, 91, 125]


  }],
  chart: {
    height: 300,
    type: 'bar'
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
     // Object.key
    categories: Object.keys(this.data)
  
   
  },
  yaxis: {
    title: {
      text: 'All Units'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val: any) {
        return val + " units";
      }
    }
  }
};


  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    //get Insurance
    this.insuranceServices.getInsurance().subscribe();
    this.insuranceServices.insurances$.subscribe((ince) => {
      this.dataSource.data = ince;
    });
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
