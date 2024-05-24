import { Component, Inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../interfaces/task';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

interface TaskForm {
  title: FormControl<string>;
  description: FormControl<string>;
  isComplete: FormControl<boolean>;
}

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatDialogModule],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.scss'
})
export class TaskAddComponent {

  constructor(private taskService: TaskService, @Inject(MAT_DIALOG_DATA) public data: Task) {}

  form = new FormGroup<TaskForm>({
    title: new FormControl('', {validators:[Validators.required], nonNullable:true}),
    description: new FormControl('', {validators:[Validators.required], nonNullable:true}),
    isComplete: new FormControl(false, {nonNullable:true})
  });

  card_title = 'Add a new task';
  editMode = false;
  ngOnInit(): void {
    if (this.data) {
      this.card_title = `${this.data.title}`;
      this.form.patchValue(this.data);
      this.editMode = true;
    }
  }
  onSubmit(form: FormGroup<TaskForm>) {
    if (!form.valid) return;

    const task: Task = {
      title: form.value.title!,
      description: form.value.description!,
      isComplete: form.value.isComplete!
    };

    if (this.editMode) {
      task.id = this.data.id;
      this.taskService.update(task);
      this.editMode = false;
    } else {
      this.taskService.add(task);
    }
    form.reset();
  }
}
