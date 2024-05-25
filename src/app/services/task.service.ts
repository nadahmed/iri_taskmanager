import { Injectable, inject } from '@angular/core';
import { Task } from '../interfaces/task';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskAddComponent } from '../components/task-add/task-add.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  #dialog:MatDialog = inject(MatDialog);
  constructor() {}


  private _tasks$:BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.getTasks());

  getTasks() {
    const tasks = JSON.parse(window.localStorage.getItem('tasks') || '[]') as Task[];
    return tasks.map(task => {
      task.modifiedAt = new Date(task.modifiedAt!);
      return task;
    })
  }

  getTask(taskId: number) {
    const tasks = this.getTasks();
    return tasks.find(task => task.id === taskId);
  }

  get watch():Observable<Task[]> {
    return this._tasks$.asObservable();
  }

  save(tasks: Task[]) {
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    this._tasks$.next(tasks);
  }

  add(task: Task) {
    task.modifiedAt = new Date();
    const tasks = this.getTasks();
    task.id = tasks.length ? tasks[0]!.id! + 1 : 1;
    tasks.unshift(task);
    this.save(tasks);
  }

  delete(id: number) {
    const tasks = this.getTasks();
    this.save(tasks.filter(task => task.id !== id));
  }

  update(task: Task) {
    task.modifiedAt = new Date();
    const tasks = this.getTasks();
    this.save(tasks.map(t => t.id === task.id ? task : t));
  }

  empty() {
    this.save([]);
  }

  addTaskDialog(): void {
    this.#dialog.open(TaskAddComponent, {
      width: '400px',
    });
  }

  editTaskDialog(task: Task): void {
    this.#dialog.open(TaskAddComponent, {
      width: '400px',
      data: task
    });
  }
}
