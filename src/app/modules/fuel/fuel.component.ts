import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { FuelService } from 'src/app/core/fuel/fuel.service';
import { IFuel } from 'src/app/core/fuel/fuel.type';
import { FuelFormComponent } from './fuel-form/fuel-form.component';

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.scss']
})
export class FuelComponent implements OnInit {

  displayedColumns: string[] = ['id', 'fType','date', 'vName','dName','petrolPumpName','quantity','edit','delete',];
  dataSource: MatTableDataSource<IFuel> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public dialog: MatDialog, private fuelServices : FuelService) { }

  ngOnInit(): void {
//get Fuel

    this.fuelServices.getFuel().subscribe();

    this.fuelServices.fuels$.subscribe((ful)=>{
      this.dataSource.data = ful
      console.log(ful);
      
    })


    //paginator
    
    this.dataSource.paginator = this.paginator;

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDialog() {
    const dialogRef = this.dialog.open(FuelFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
