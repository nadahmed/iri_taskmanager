import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { taskDetailResolver } from './task-detail.resolver';
import { Task } from '../interfaces/task';

describe('taskDetailResolver', () => {
  const executeResolver: ResolveFn<Task|undefined> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => taskDetailResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
