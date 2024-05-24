import { TestBed } from "@angular/core/testing";
import { TaskAddComponent } from "../components/task-add/task-add.component";
import { TaskService } from "./task.service";

describe('TaskService', () => {
    let service: TaskService;
  
    beforeEach(() => {
      service = TestBed.inject(TaskService);
      service.empty();
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    
    it('should add a task', () => {
      const task = { title: 'Task 1', description: 'Description 1', isComplete: false };
      service.add(task);
      expect(service.getTasks()).toContain(jasmine.objectContaining(task));
    });
  
    it('should delete a task', () => {
      const task = { id: 1, title: 'Task 1', description: 'Description 1', isComplete: false };
      service.add(task);
      service.delete(1);
      expect(service.getTasks()).not.toContain(jasmine.objectContaining(task));
    });
  
    it('should update a task', () => {
      const task = { id: 1, title: 'Task 1', description: 'Description 1', isComplete: false };
      service.add(task);
      const updatedTask = { ...task, title: 'Updated Task' };
      service.update(updatedTask);
      expect(service.getTasks()).toContain(jasmine.objectContaining(updatedTask));
    });
  
    it('should empty tasks', () => {
      const task = { id: 1, title: 'Task 1', description: 'Description 1', isComplete: false };
      service.add(task);
      service.empty();
      expect(service.getTasks()).toEqual([]);
    });
  
    afterEach(() => {
      localStorage.removeItem('tasks');
    });
  });