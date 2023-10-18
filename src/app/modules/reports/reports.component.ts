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

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  Maintenance = [];
  Fuel = [];
  Insurance = [];

  constructor(
    private maintenanceServices: MaintenanceService,
    private fuelServices: FuelService,
    private insuranceServices: InsuranceService
  ) {}

  rData: FormGroup = new FormGroup({
    name: new FormControl(''),
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
    //get Maintenance
    this.maintenanceServices.getmaintenance().subscribe();
    this.maintenanceServices.maintenances$.subscribe((man) => {
      this.dataSource.data = man;
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
}
