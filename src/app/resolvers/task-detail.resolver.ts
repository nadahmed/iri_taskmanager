import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../interfaces/task';

export const taskDetailResolver: ResolveFn<Task|undefined> = (route, state) => {
  const taskId = route.paramMap.get('id');
  const task = inject(TaskService).getTasks().find(task => task.id === Number(taskId));
  if (!task) {
    inject(Router).navigate(['not-found'])
    return undefined;
  }
  return task;
};
