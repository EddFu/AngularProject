import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//routing
import { TasksComponent } from './pages/tasks/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: '',
        redirectTo: 'grid',
        pathMatch: "full"
      },

      {
        path: 'grid',
        component: GridComponent
      },

      {
        path: 'tasks',
        component: TasksComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
