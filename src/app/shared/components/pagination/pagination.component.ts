import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  @Input() collectionSize: any
  @Input() currentPage: any
  @Input() pageSize: any
  @Output() changePage = new EventEmitter<any>();



  chagePaginationPage(event: any) {
    this.changePage.emit(event);
  }
}
