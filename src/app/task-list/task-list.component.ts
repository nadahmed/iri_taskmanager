import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { TaskItemComponent } from '../components/task-item/task-item.component';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, AsyncPipe, MatGridListModule, MatCardModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  constructor(public taskService:TaskService){}
}
