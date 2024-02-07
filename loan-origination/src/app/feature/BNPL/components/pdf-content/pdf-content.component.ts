import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pdf-content',
  templateUrl: './pdf-content.component.html',
  styleUrls: ['./pdf-content.component.css']
})
export class PdfContentComponent implements OnInit, AfterViewInit {

  @Input() documento: any;

  constructor(
    private readonly modalService: BsModalService,
    private readonly modalRef: BsModalRef,
  ) {
    this.documento = this.modalService.config.initialState?.['documento'];
  }
  ngAfterViewInit(): void {
    this.documento = this.modalService.config.initialState?.['documento'];
  }
  ngOnInit(): void {
    this.documento = this.modalService.config.initialState?.['documento'];
    console.log(this.documento)
  }

  cerrarModal() {
    this.modalService.hide();
  }
  

}
