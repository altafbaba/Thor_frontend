import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IDriver } from 'src/app/core/driver/driver.type';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DriverService } from 'src/app/core/driver/driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
})
export class DriverComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'dFirstName',
    'dMobile',
    'dAdharCard',
    'dLicense',
    'edit',
    'delete'
  ];
  dataSource: MatTableDataSource<IDriver> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private driverSerivec: DriverService) {}

  ngOnInit(): void {
    //get driver
    this.driverSerivec.getDriver().subscribe();
    this.driverSerivec.drivers$.subscribe((dri) => {
      this.dataSource.data = dri;

      //paginator
      this.dataSource.paginator = this.paginator;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
