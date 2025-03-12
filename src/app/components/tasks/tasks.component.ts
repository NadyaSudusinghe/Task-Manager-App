import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Category, Status } from '../../models/enums';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, MatCardModule, MatCheckboxModule, FormsModule, ReactiveFormsModule, MatTableModule,
    MatPaginatorModule, MatDatepickerModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements AfterViewInit {
  taskForm: FormGroup;
  isEdit: boolean = false;
  selectedRow: any = null;
  selectedRows: any[] = [];
  tasks: Task[] = [];
  displayedColumns: string[] = ['select','id', 'name', 'status', 'deadline'];
  dataSource = new MatTableDataSource<Task>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  categories: FormGroup;



  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      task: [''],
      category: [''],
      status: [''],
      deadline: [''],
    });

    this.categories = this.fb.group({
      personal: [true],
      work: [true]
    });

    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.dataSource.data = tasks;
    });

    this.categories.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onRowClick(row: Task) {
    // if(row != null){
    //   this.editTask();
    // }
    // console.log(row);
  }

  selectRow(row: any) {
    if (this.selectedRow && this.selectedRow !== row) {
      this.selectedRow.selected = false;
    }

    if (row.selected) {
      this.selectedRow = row;
      this.editTask();
    } else {
      this.selectedRow = null;
      this.isEdit = false;
      this.cancel();
    }
  }

  editTask() {
    const task = this.selectedRow;
    console.log('Selected task:', task);

    this.isEdit = true;
    this.taskForm.patchValue({
      task: task.name,
      category: Category[task.category as keyof typeof Category],
      status: task.status,
      deadline: task.deadline,
    });
    console.log('Form after patchValue:', this.taskForm.value);

  }

  deleteTask(){
    const task = this.selectedRow;
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');
    if(isConfirmed && task.id){
      this.taskService.deleteTask(task);
      this.cancel();
    }
  }

  onSubmit() {
    Object.keys(this.taskForm.controls).forEach(field => {
      const control = this.taskForm.get(field);
      if (control?.value == null || control?.value == "") {
        control?.setValidators(Validators.required);
        control?.markAsDirty();
        control?.markAsTouched();
        control?.setErrors({ required: true })
      }
    });

    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    else {
      const formValues = this.taskForm.value;
      const task: Task = {
        id: this.isEdit ? this.selectedRow.id : this.tasks.length + 1,
        name: formValues.task,
        status: formValues.status,
        deadline: formValues.deadline,
        category: Category[formValues.category as keyof typeof Category],
      };

      if (this.isEdit) {
        this.taskService.updateTask(task);
      } else {
        this.taskService.addTask(task);
        this.taskForm.reset();
      }

      // this.dataSource.data = [...this.tasks];
      this.taskForm.markAsUntouched();
      this.applyFilter();
      this.cancel();
    }
  }

  applyFilter() {
    const personalChecked = this.categories.value.personal;
    const workChecked = this.categories.value.work;
    let filteredTasks: Task[] = [];

    if (personalChecked && workChecked) {
      filteredTasks = this.tasks;
    } else if (personalChecked) {
      filteredTasks = this.tasks.filter(task => task.category === Category.personal);
    } else if (workChecked) {
      filteredTasks = this.tasks.filter(task => task.category === Category.work);
    }

    // return filteredTasks;
    this.dataSource.data = [...filteredTasks];
  }

  cancel() {
    this.taskForm.reset();
    this.taskForm.markAsPristine();
    this.taskForm.markAsUntouched();
    this.isEdit = false;
    Object.keys(this.taskForm.controls).forEach(field => {
      const control = this.taskForm.get(field);
      control?.clearValidators();
      control?.markAsUntouched();
      control?.markAsPristine();
      control?.updateValueAndValidity();
    });
    this.selectedRow.selected = false;
    this.selectedRow = null;
  }

}
