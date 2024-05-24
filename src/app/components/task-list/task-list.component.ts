import { Component, Input } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { AsyncPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent, MatCardModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

  @Input() tasks:Task[] = []

  constructor(){}
}
