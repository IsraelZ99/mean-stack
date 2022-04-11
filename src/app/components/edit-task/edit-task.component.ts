import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel, TaskStatusSelected } from '../../shared/task.model';
import { TaskService } from '../../shared/services/task.service';
import { map, switchMap, Observable } from 'rxjs';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  public task: TaskModel | any;
  public taskStatusSelected: any = [];

  constructor(private route: ActivatedRoute, private router: Router,
    private taskService: TaskService) {
    this.task = new TaskModel('', '', new Date(), 'To do it');
  }

  ngOnInit(): void {
    this.taskStatusSelected = TaskStatusSelected;

    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        if (id) return this.taskService.getTaskById(id);
        else return new Observable(obs => obs.next(new TaskModel("", '', new Date(), "To do it")));
      })
    ).subscribe({
      next: (task) => {
        this.task = task;
        console.log(task);
      },
      error: (err) => console.error(err)
    });
  }

  public onSubmit(): void {
    if (this.task._id) {
      this.taskService.updateTask(this.task)
        .subscribe({
          next: taskModified => {
            console.log(taskModified);
            this.router.navigate(['/tasks']);
          },
          error: err => console.error(err)
        });
    } else {
      this.taskService.createTask(this.task)
        .subscribe({
          next: taskAdded => {
            console.log(taskAdded);
            this.router.navigate(['tasks']);
          },
          error: err => console.error(err)
        })
    }
  }

}
