import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {
  @Input() listOfSettings;
  banks = [
    {bankshortname: "ICICI", bankfullname: "ICICI Bank"},
    {bankshortname: "HDFC", bankfullname: "HDFC Bank"},
    {bankshortname: "SBI", bankfullname: "SBI Bank"},
    {bankshortname: "SBI", bankfullname: "SBI Bank"},
    {bankshortname: "SBI", bankfullname: "SBI Bank"},
    {bankshortname: "SBI", bankfullname: "SBI Bank"},
    {bankshortname: "SBI", bankfullname: "SBI Bank"}
  ];

  constructor(private activeModal: NgbActiveModal) { }

  deleteSetting() {

  }

}
