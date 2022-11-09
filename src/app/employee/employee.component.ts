import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = [
    'Id',
    'name',
    'lastname',
    'email',
    'mobilenumber',
    'city',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;
  constructor(private service: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }
  /**---------------------------------open dialog---------------------------------------------- */
  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllEmployees();
        }
      });
  }
  /**---------------------------------get Employee data---------------------------------------------- */
  getAllEmployees() {
    this.service.getEmployeeData().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: (err) => {
        alert('error while fetching the records');
      },
    });
  }

  /**---------------------------------edit Employee---------------------------------------------- */
  editEmployee(row: any) {
    this.dialog
      .open(DialogComponent, {
        width: '50%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllEmployees();
        }
      });
  }
  /**---------------------------------delete Employee---------------------------------------------- */
  deleteEmployee(id: number) {
    this.service.deleteEmployeeData(id).subscribe({
      next: (res) => {
        alert('product deleted successfully');
      },
      error: (err) => {
        alert('error while deleting the product');
      },
    });
  }
}
