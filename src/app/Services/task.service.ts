import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task';

import { environmentDev } from '../../environments/environments-dev';

const STORAGE_KEY: any = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 
  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = document.defaultView?.localStorage;

    if (localStorage) {
      const counter = localStorage.getItem('counter');

      if (counter) {
        localStorage.setItem('counter', (parseInt(counter) + 1).toString());
      } else {
        localStorage.setItem('counter', '1');
      }
    }
  }

  tasks: Task[] = [];
  selectedTask: Task | null = null;

  /* private methods */
  private generateUniqueId(): number {
    return Math.floor(Math.random() * 1000);
  }

  private getTasksFromStorage(): Task[] {

    if (typeof localStorage !== 'undefined') {
      const tasksJson = localStorage.getItem(environmentDev.STORAGE_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
    } else {
      return [];
    }

  }

  private saveTasksToStorage(tasks: Task[]): void {
    localStorage.setItem(environmentDev.STORAGE_KEY, JSON.stringify(tasks));
  }


  /* pubic methods */
  addTask(newTaskText: string):  Observable<string> {
    const newTask: Task = {
           _id: this.generateUniqueId(), 
           name: newTaskText,
           completed: false
         };
    
    const tasks = this.getTasksFromStorage();
    tasks.push(newTask);
    this.saveTasksToStorage(tasks);
    return of(newTaskText);
  }

  getAllTasks(): Observable<Task[]>{
    return of(this.getTasksFromStorage());
  }

  updateTask(updatedTask: Task): Observable<Task> {
    const tasks = this.getTasksFromStorage();
    const index = tasks.findIndex(task => task._id === updatedTask._id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      this.saveTasksToStorage(tasks);
    }
    return of(updatedTask);
  }

  deleteTask(taskId: number): Observable<number> {
    const tasks = this.getTasksFromStorage();
    const updatedTasks = tasks.filter(task => task._id !== taskId);
    this.saveTasksToStorage(updatedTasks);
    return of(taskId);
  }

}
