import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-task-home',
  standalone: true,
  imports: [MatToolbarModule, RouterModule],
  templateUrl: './task-home.component.html',
  styleUrl: './task-home.component.scss'
})
export class TaskHomeComponent {}
