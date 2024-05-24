import { Routes } from '@angular/router';
import { taskDetailResolver } from './resolvers/task-detail.resolver';

export const routes: Routes = [
    {path: '', redirectTo: 'tasks', pathMatch: 'full'},
    { path: 'tasks', loadComponent: () => import('./pages/task-home/task-home.component').then(m => m.TaskHomeComponent),children: [
        {path: '', loadComponent: () => import('./pages/task-board/task-board.component').then(m => m.TaskBoardComponent)},
        {path: ':id', loadComponent: () => import('./pages/task-detail/task-detail.component').then(m => m.TaskDetailComponent), resolve: {task:taskDetailResolver}},
    ]},
    { path: 'not-found', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) },
    { path: '**', redirectTo: 'not-found' }
];
