import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskModel } from '../task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  public getAllTasks(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>('http://localhost:3000/api/tasks');
  }

  public getTaskById(id: string): Observable<TaskModel> {
    return this.http.get<TaskModel>('http://localhost:3000/api/tasks/' + id);
  }

  public createTask(task: TaskModel) {
    return this.http.post<TaskModel>('http://localhost:3000/api/tasks',
      { tittle: task.tittle, date: task.date, status: task.status });
  }

  public updateTask(task: TaskModel) {
    return this.http.put<TaskModel>('http://localhost:3000/api/tasks/' + task._id,
      { tittle: task.tittle, date: task.date, status: task.status });
  }

  public deleteTask(id: string) {
    return this.http.delete<string>('http://localhost:3000/api/tasks/' + id);
  }

}
