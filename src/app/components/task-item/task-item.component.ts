import { Component, Input } from '@angular/core';
import { Task } from '../../interfaces/task';
import { TaskService } from '../../services/task.service';
import { RouterModule } from '@angular/router';
import { map, tap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { TimeagoModule } from 'ngx-timeago';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    TimeagoModule,
    TruncatePipe,
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {

  constructor(public taskService: TaskService) {}

  @Input('task') task!: Task;
  @Input('index') index!:number;

  editable = false;

  ngOnInit() {

    this.taskService.watch.pipe(
      map(tasks => tasks.find(t => t.id === this.task.id)!),
      tap(task => {
        this.task = task
      })
    )
    .subscribe()
  }

  toggleComplete(task: Task) {
    task.isComplete = !task.isComplete;
    this.taskService.update(task);
  }


  cancel(){
    this.editable = false;
    this.task = this.taskService.getTask(this.task.id!)!;
  }
}
