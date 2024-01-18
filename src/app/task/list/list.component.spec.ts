/* Angular */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

/* Proyect */
import { ListComponent } from './list.component';
import { Task } from '../../models/task';
import { TaskService } from '../../Services/task.service';

/* Angular Material */
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';




const information = [
  {_id: 1, name: 'Task 1', completed: false}];

const mockedSharingService : {
  getAllTasks:() => Observable<Task[]>
}
=
{
  getAllTasks: () => of(information)
};

describe('ListComponent', () => {
 
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let productService: jasmine.SpyObj<TaskService>;

  beforeEach(() => {
      TestBed.configureTestingModule({
      imports: [ListComponent,MatTableModule, MatListModule, MatCheckboxModule, MatIconModule, MatDividerModule, MatButtonModule],
      providers: [{ provide: TaskService, useValue: mockedSharingService }]
    });

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
  });


  it('test getAllTasks', () => {

    const getTasks = spyOn(mockedSharingService, 'getAllTasks' );
    getTasks.and.returnValue(of(information));
    component.getTaks();
    expect(mockedSharingService.getAllTasks).toHaveBeenCalled();
  });

});
