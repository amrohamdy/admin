import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './main/main.component';

const routes: Routes = [

  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: 'home',
        loadChildren: () =>
          import('../home/home.module').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: 'organizations', loadChildren: () =>
          import('../organizations/organizations.module').then(
            (m) => m.BranchesModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
