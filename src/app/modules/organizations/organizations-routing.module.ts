import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrganizationComponent } from './pages/add_organization/addOrganization.component';
import { OrganizationDetailsComponent } from './pages/organization-details/organization-details.component';
import { OrganizationsComponent } from './pages/organizations_index/organizations.component';


const routes: Routes = [
  { path: '', component: OrganizationsComponent },
  { path: 'add_organization', component: AddOrganizationComponent },
  { path: 'organization_details/:id', component: OrganizationDetailsComponent },
  { path: 'edit_organization/:id', component: AddOrganizationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
