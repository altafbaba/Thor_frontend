import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import { FuelService } from 'src/app/core/fuel/fuel.service';
import { InsuranceService } from 'src/app/core/insurance/insurance.service';
import { MaintenanceService } from 'src/app/core/maintenance/maintenance.service';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import { IMaintenance } from 'src/app/core/maintenance/maintenance.type';
import { VehicleService } from 'src/app/core/vehicle/vehicle.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  Maintenance = [];
  Fuel = [];
  Insurance = [];
  filterReports = [];
  vehicles = [];

  constructor(
    private maintenanceServices: MaintenanceService,
    private fuelServices: FuelService,
    private insuranceServices: InsuranceService,
    private VehiclesServices: VehicleService
  ) {}

  rData: FormGroup = new FormGroup({
    vNumber: new FormControl(''),
    sDate: new FormControl(''),
    eDate: new FormControl(''),
  });

  dataSource: MatTableDataSource<IMaintenance> = new MatTableDataSource([]);

  displayedColumns: string[] = [
    'id',
    'maintenanceType',
    'vNumber',
    'mPart',
    'garageName',
    'vDate',
  ];
  ngOnInit() {
    //get vehicles
    this.VehiclesServices.getVehical().subscribe();
    this.VehiclesServices.vehicals$.subscribe((veh) => {
      this.vehicles = veh;
    });

    //get Maintenance
    this.maintenanceServices.getmaintenance().subscribe();
    this.maintenanceServices.maintenances$.subscribe((man) => {
      this.Maintenance = man;
      // console.log(man);
    });

    //get fuel
    this.fuelServices.getFuel().subscribe();
    this.fuelServices.fuels$.subscribe((ful) => {
      this.Fuel = ful;
    });

    //get Insurance
    this.insuranceServices.getInsurance().subscribe();
    this.insuranceServices.insurances$.subscribe((ins) => {
      this.Insurance = ins;
    });
  }

  exportToExcelMaintenance() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.Maintenance
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'data');
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const a: HTMLAnchorElement = document.createElement('a');
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName + '.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  exportToExcelFuel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.Fuel);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'data');
  }

  exportToExcelInsurance() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.Insurance);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    this.saveAsExcelFile(excelBuffer, 'data');
  }

  createPDF() {
    html2canvas(document.getElementById('my-table')).then((canvas) => {
      const data = canvas.toDataURL('image/png');
      let pdf = new jsPDF();
      // pdf.text( "My PDF", 0, 0);

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(data, 'png', 0, 0, width, height);
      pdf.save('output.pdf');
    });
  }
  search() {
    let input = this.rData.value;

    const startDate = new Date(input.sDate);
    const endDate = new Date(input.eDate);

    const result = this.Maintenance.filter((item) => {
      const itemDate = new Date(item.mDate);
      return (
        item.vNumber === input.vNumber &&
        itemDate >= startDate &&
        itemDate <= endDate
      );
    });
    this.filterReports = result;
  }
}
