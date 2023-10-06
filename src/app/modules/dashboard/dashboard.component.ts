import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { DashboardService } from 'src/app/core/dashboard/dashboard.service';
import { IDashboard } from 'src/app/core/dashboard/dashboard.type';
import { InsuranceService } from 'src/app/core/insurance/insurance.service';
import { IInsurance } from 'src/app/core/insurance/insurance.type';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  Idash: IDashboard;
  Idash2=[]
  
  // Chart data
 
  name = 'Angular';
  //view: any[];
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;
  //view:[] = [600, 400];
  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Sales';
  timeline = true;
  doughnut = true;
  colorScheme = {
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  //pie
  showLabels = true;
  // data goes here
public single = JSON.stringify(this.Idash2)

// [
  

//   {
//     "name": "india",
//     "value": 224
//   },
//   {
//     "name": "USA",
//     "value": 112
//   },
//   {
//     "name": "Norway",
//     "value": 29
//   },
//   {
//     "name": "Japan",
//     "value": 25
//   },
//   {
//     "name": "Germany",
//     "value": 19
//   },
//   {
//     "name": "France",
//     "value": 20
//   }
// ];

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
      this.Idash2.push(val)
      //this.Idash = val;
       const abc = JSON.stringify(this.Idash2)

      //key 
      // let x =Object.keys(this.Idash);
      // //value
      // let y = Object.values(this.Idash)
      // console.log(x ,y)
      console.log(this.Idash2)
      console.log(abc)


    });
    // for chart
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: 'All',
    //       data: [30, 40,],
    //       //data2 : Object.values(this.data)
          
    //     },
    //   ],
    //   chart: {
    //     height: 300,
    //     type: 'bar',
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       columnWidth: '55%',
    //       endingShape: 'rounded',
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   stroke: {
    //     show: true,
    //     width: 2,
    //     colors: ['transparent'],
    //   },
    //   xaxis: {
    //     // Object.key
    //    //categories: ["abc","cbd"]
    //    categories: [] ,
    //   },
    //   yaxis: {
    //     title: {
    //       text: 'All Units',
    //     },
    //   },
    //   fill: {
    //     opacity: 1,
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: function (val: any) {
    //         return val + ' units';
    //       },
    //     },
    //   },
    // };

    
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
