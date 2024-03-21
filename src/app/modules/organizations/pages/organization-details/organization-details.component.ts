import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestsService } from '../../../../shared/services/requests.service';

@Component({
  selector: 'app-organization-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organization-details.component.html',
  styleUrl: './organization-details.component.scss'
})
export class OrganizationDetailsComponent {
  showSpinner: boolean = false;
  orgDeatils: any

  constructor (private router: Router, private requestsService: RequestsService, private activeRoute: ActivatedRoute) {

    this.showSpinner = true
    this.activeRoute.params.subscribe((params: any) => {
      this.requestsService.get(`admins/organizations/${ params.id }`).subscribe((res: any) => {
        this.orgDeatils = res.body
        this.showSpinner = false

      }, err => {
        this.showSpinner = false

      })
    })

  }
}
