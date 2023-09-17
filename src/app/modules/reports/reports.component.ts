import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MaintenanceService } from 'src/app/core/maintenance/maintenance.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {

  constructor(private MaintenanceServices:MaintenanceService){}
Manin = []

  displayedColumns: string[] = [
    'vName',
    'vNumber',]
  dataSource = new MatTableDataSource<Task>([]);
  filteredSource = new MatTableDataSource<Task>([]);
  _searchFiltered = new MatTableDataSource<Task>([]);

  RForm = new FormGroup({
    search : new FormControl(""),
  })


  ngOnInit(){
    this.MaintenanceServices.getmaintenance().subscribe();
    this.MaintenanceServices.maintenances$.subscribe((man)=>{
      this.Manin = man

      console.log(man)
    })
  }
export(){}



  data1 = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Alice', age: 25, city: 'Los Angeles' },
    { name: 'Bob', age: 35, city: 'Chicago' },
  ];

  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.Manin);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, 'data');
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const a: HTMLAnchorElement = document.createElement('a');
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName + '.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

}
