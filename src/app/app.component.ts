/* Angular */
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Proyect */
import { TaskService } from './Services/task.service';
import { Task } from './models/task';
import { ListComponent } from "./task/list/list.component";

/* Angular Material */
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass',
    imports: [CommonModule, 
      MatDividerModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, 
      ListComponent,
      ReactiveFormsModule
      ]
})
export class AppComponent {

  taskForm: FormGroup ;
  task = new Task();
  taskName = '';
  taskNameError: string = '';
  @ViewChild('selectorTaskList') selectorTaskList!: ListComponent;

  constructor(private fb: FormBuilder,private productService: TaskService ){
   this.taskForm = this.fb.group({
      taskname: ['', [Validators.required, Validators.maxLength(50)]],
    });

}

/* pubic methods */
Add(){

   if (this.taskForm && this.taskForm.valid) {
     const taskname =  this.taskForm && this.taskForm.get('taskname') ? this.taskForm.get('taskname')!.value : '';
     this.productService.addTask(taskname).subscribe((result) =>{
     this.selectorTaskList.getTaks();
     this.taskForm.reset();
   });
   }
  
 }

}