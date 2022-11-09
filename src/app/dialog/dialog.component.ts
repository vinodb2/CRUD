import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  employeeForm!: FormGroup;
  actionBtn: string = 'save';

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private service: DataService,
    private formbuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editEmployee: any
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formbuilder.group({
      Id: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      mobilenumber: ['', Validators.required],
      city: ['', Validators.required],
    });

    if (this.editEmployee) {
      this.actionBtn = 'Update';
      this.employeeForm.controls['Id'].setValue(this.editEmployee.Id);
      this.employeeForm.controls['name'].setValue(this.editEmployee.name);
      this.employeeForm.controls['lastname'].setValue(this.editEmployee.lastname);
      this.employeeForm.controls['email'].setValue(this.editEmployee.email);
      this.employeeForm.controls['mobilenumber'].setValue(this.editEmployee.mobilenumber);
      this.employeeForm.controls['city'].setValue(this.editEmployee.city);
    }
  }
  /**---------------------------------Add Employee---------------------------------------------- */
  addEmployee() {
    if (!this.editEmployee) {
      if (this.employeeForm.valid) {
        this.service.postEmployeeData(this.employeeForm.value).subscribe({
          next: (res) => {
            alert('employee added successfully');
            this.employeeForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('error while adding the employee');
          },
        });
      }
    } else {
      this.updateEmployee();
    }
  }

  /**---------------------------------Update Employee---------------------------------------------- */
  updateEmployee() {
    this.service
      .putEmployeeData(this.employeeForm.value,this.editEmployee.id)
      .subscribe({
        next: (res) => {
          alert('employee updated successfully');
          this.employeeForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert('error while updating the employee');
        },
      });
  }
}
