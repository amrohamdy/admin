import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  standalone: true,
  imports: [],
  templateUrl: './confirmation-popup.component.html',
  styleUrl: './confirmation-popup.component.scss'
})
export class ConfirmationPopupComponent {
  @Output() confirmSelection: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor (public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  closeModal(result: boolean) {
    this.dialogRef.close(result);
  }

  handleConfirmSelection(confirm: boolean) {
    this.dialogRef.close(confirm);
    this.confirmSelection.emit(confirm);
  }

}
