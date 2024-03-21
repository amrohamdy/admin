import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { NoDataFoundComponent } from '../../../../shared/components/no-data-found/no-data-found.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { ConfirmationPopupComponent } from '../../../../shared/confirmation-popup/confirmation-popup.component';
import { RequestsService } from '../../../../shared/services/requests.service';

@Component({
  selector: 'app-organizations',
  standalone: true,
  imports: [RouterModule, NgSelectModule, FormsModule, CommonModule, PaginationComponent, NoDataFoundComponent],
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.scss'
})
export class OrganizationsComponent implements OnInit {
  // pagination
  collectionSize = 15;
  currentPage = 1;
  pageSize = 15

  organizations: any;
  showSpinner: boolean = false;

  constructor (private dialog: MatDialog, private requestService: RequestsService, private ToastService: ToastrService) {

  }

  ngOnInit(): void {
    this.showSpinner = true
    this.getOrgs()
  }

  getOrgs(page: any = 1) {
    this.requestService.get(`admins/organizations?is_pagination=1&&page=${ page }`).subscribe((response: any) => {
      this.organizations = response.body
      this.showSpinner = false
      this.preparePagination({
        pageIndex: Number(response.pagination.current_page),
        totalPages: response.pagination.last_page,
        totalCount: response.pagination.total
      })
    }, err => {
      this.showSpinner = false

    })
  }


  deleteOrg(id: any) {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      width: '600px',
      data: {
        message: "Are you certain that you want to delete this organizationt?"
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {

        this.requestService.delete(`customers/organization/${ id }`,).subscribe((res: any) => {
          this.ToastService.success(res.message)
          this.getOrgs()

        }, err => {
          this.ToastService.error(err?.erro?.message)

        })
      }
    });
  }


  /* pagination functionality
============================ */
  preparePagination(pagination: any) {
    this.collectionSize = pagination['totalCount'];
    this.currentPage = pagination['pageIndex'];
  }
  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getOrgs(pageNumber)
  }
}
