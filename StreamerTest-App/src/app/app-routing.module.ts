import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {path: 'projects/:id', component: ProjectsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [ProjectsComponent]
