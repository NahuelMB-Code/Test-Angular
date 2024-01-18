/* Angular */ 
import { Component, OnInit } from '@angular/core';

/* Proyect */
import { TaskService } from '../../Services/task.service';
import { Task } from '../../models/task';

/* Angular Material */
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'task-list',
  standalone: true,
  imports: [MatTableModule, MatListModule, MatCheckboxModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.sass'
})
export class ListComponent implements OnInit {

  tasks: Task[] = [];
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol'];
  constructor(private taskService:TaskService){

  }
 
  /* pubic methods */

  ngOnInit(): void {
    this.getTaks();
 
  }

  markAsCompleted(task:any){
   
    task.completed = task.completed ? false : true;
   
    console.log('expresionnnn',  task.completed);
    this.taskService.updateTask(task).subscribe((result) =>{
      console.log('listaaa', result);
      this.getTaks();
      
    });

  }

  removeTask(id:any){
    this.taskService.deleteTask(id).subscribe((result) =>{
      console.log('listaaa', result);
      this.getTaks();
      
    });

  }

   getTaks(){

    console.log('listaaa22222');
    this.taskService.getAllTasks().subscribe((result) =>{
      console.log('listaaa', result);
      this.tasks = result;
      
    });
  }

}
