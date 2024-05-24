import { Component } from '@angular/core';
import { TaskAddComponent } from '../../components/task-add/task-add.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TaskListComponent } from '../../components/task-list/task-list.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { Subject, map, switchMap, takeUntil, tap } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

interface FilterState{
  isComplete: boolean;
  activated: boolean;
}

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [TaskListComponent, TaskAddComponent, MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule, CommonModule],
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss'
})
export class TaskBoardComponent {
  tasks:Task[] = [];

  private destroy$ = new Subject<void>();
  private event$ = new Subject<void>();

  taskStatus = {
    pending: 0,
    completed: 0
  }

  filterState:FilterState = {
    isComplete: false,
    activated: false
  }

  constructor(public taskService:TaskService) {}

  ngOnInit(): void {
    this.event$.pipe(
      takeUntil(this.destroy$),
      switchMap(() => this.taskObserver())
    ).subscribe();

    this.event$.next();
  }

  taskObserver() {
    return this.taskService.watch
    .pipe(
      tap(tasks => {
        this.taskStatus.pending = tasks.filter(task => !task.isComplete).length;
        this.taskStatus.completed = tasks.filter(task => task.isComplete).length;
      }),
      map(tasks => this.filterByState(tasks)),
      tap(tasks => this.tasks = tasks)
    );
  }

  filterByState(tasks:Task[]) {
    if (!this.filterState.activated) {
      return tasks;
    }
    return tasks.filter(task => task.isComplete === this.filterState.isComplete);
  }

  filterByCompleted(isComplete:boolean) {
    this.filterState.activated = true;
    this.filterState.isComplete = isComplete;
    this.event$.next();
  }

  clearFilter() {
    this.filterState.activated = false;
    this.filterState.isComplete = false;
    this.event$.next();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
