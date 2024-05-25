import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemComponent } from './task-item.component';
import { TimeagoModule } from 'ngx-timeago';
import { RouterModule } from '@angular/router';
import { TaskService } from '../../services/task.service';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent, RouterModule.forRoot([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.index = 1;
    const task = { id: 1, title: 'Task 1', description: 'Description 1', isComplete: false, modifiedAt: new Date() }
    component.task = task;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
