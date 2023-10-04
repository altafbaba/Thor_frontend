import { Component, OnInit, ViewChild } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { UserService } from 'src/app/core/user/user.service';
import { IUser } from 'src/app/core/user/user.type';
import { UserFormComponent } from './user-form/user-form.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: IUser = null;

  uForm: FormGroup = new FormGroup({
    uName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    isAdmin: new FormControl('',),
    isNormal: new FormControl('',),
  });

  displayedColumns: string[] = [
    'id',
    'uName',
    'uRole',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<IUser> = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,private userServices:UserService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    //get user
    this.userServices.getUser().subscribe();
    this.userServices.users$.subscribe((usr)=>{
      this.dataSource.data = usr


       //auto fill for update
    this.userServices.user$.subscribe((usr) => {
      if (usr) {
        this.user = usr;
        this.uForm.patchValue(usr);
      }
    });
    })
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

  openDialog() {
    const dialogRef = this.dialog.open(UserFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  save() {
    this.uForm.markAllAsTouched();
    if (this.uForm.invalid) return;

    //update user
    if (this.user) {
      this.userServices.userUpdate(this.user._id, this.uForm.value).subscribe({
        error: (err) => {
          this.snackBar.open(err.message, 'close')._dismissAfter(3000);
        },
        next: (res) => {
          this.snackBar.open('User Update', 'close')._dismissAfter(3000);
          
        },
      });
    }

//user create

    else{
      this.userServices.createUser(this.uForm.value).subscribe({
        error: (err) => {
          this.snackBar.open(err.message, 'close')._dismissAfter(3000);
        },
        next: (res) => {
          this.snackBar
            .open('user Created', 'close')
            ._dismissAfter(3000);
           
        },
      })
      console.log(this.uForm.value);
      
    }
  }

}
