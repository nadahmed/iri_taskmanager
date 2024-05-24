import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Task } from '../../interfaces/task';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services/task.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subject, map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    TimeagoModule,
    MatButtonModule,
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    AsyncPipe,
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss'
})
export class TaskDetailComponent implements OnInit {

  task!:Task;

  completedTasks:Task[] = [];
  pendingTasks:Task[] = [];

  destroy$ = new Subject<void>();

  constructor(private activatedRoute:ActivatedRoute, public taskService:TaskService, public router:Router){}

  ngOnInit(): void {
    this.activatedRoute.data
    .pipe(
      takeUntil(this.destroy$),
      tap(({task}) => this.task = task),
    )
    .subscribe();

    this.taskService.watch.pipe(
      takeUntil(this.destroy$),
      tap(tasks =>{
        this.completedTasks = tasks.filter(task => task.isComplete);
        this.pendingTasks = tasks.filter(task => !task.isComplete);
      }),
      map(tasks => tasks.find(t => t.id === this.task.id)!),
      tap(task => {
        this.task = task
      })
    )
    .subscribe()
  }


  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
