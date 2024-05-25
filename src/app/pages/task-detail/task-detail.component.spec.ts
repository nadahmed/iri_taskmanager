import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailComponent } from './task-detail.component';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TimeagoModule } from 'ngx-timeago';
import { of } from 'rxjs';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskDetailComponent,
        NoopAnimationsModule,
       ],
       providers: [
        {
          provide: ActivatedRoute,
          useClass: class {
            data = of({task:{ id: 2, title: 'Task 1', description: 'Description 1', isComplete: false, modifiedAt: new Date() }});
          }
       }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });

});
