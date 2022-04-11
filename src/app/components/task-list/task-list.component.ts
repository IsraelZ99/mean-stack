import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/services/task.service';
import { Observable } from 'rxjs';
import { TaskModel } from '../../shared/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public tasks?: Observable<TaskModel[]>;

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getAllTasks();
  }

  public deleteTask(id: string) {
    this.taskService.deleteTask(id)
      .subscribe({
        next: msg => console.log(msg),
        error: err => console.error(err)
      });
    this.tasks = this.taskService.getAllTasks();
  }

}
