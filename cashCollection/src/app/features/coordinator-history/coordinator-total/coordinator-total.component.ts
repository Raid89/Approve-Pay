import { Component, Input, SimpleChanges } from '@angular/core';
import moment from 'moment';
import { IResponseTotales } from '../../../shared/interfaces/history.interface';
import { CoordinatorInfoComponent } from '../coordinator-info/coordinator-info.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-coordinator-total',
  templateUrl: './coordinator-total.component.html',
  styleUrl: './coordinator-total.component.scss',
  standalone: true,
  imports: [SharedModule, CommonModule, CoordinatorInfoComponent],
})
export class CoordinatorTotalComponent {
  @Input() totalCollection!: IResponseTotales[];
  @Input() totalAmmountCollection!: number;
  public pagedCollection: IResponseTotales[] = [];
  public currentPage = 0;
  public itemsPerPage = 5;
  public pages: any = [];
  public visiblePages: number[] = [];
  public maxVisiblePages: number = 5;
  public endPages: number[] = [];
  public showEllipsis: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalCollection']) {
      this.calculatePages();
      this.updatePagedCollection();
      this.updateVisiblePages();
    }
  }

  formatDateToTable(dateToParse: string){
    return moment(dateToParse).format('DD-MM-YYYY');
  }

  calculatePages() {
    const totalPages = Math.ceil(this.totalCollection.length / this.itemsPerPage);
    this.pages = new Array(totalPages).fill(0).map((x, i) => i);
  }

  updatePagedCollection() {
    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.pagedCollection = this.totalCollection.slice(start, end);
  }

  updateVisiblePages() {
    const totalPages = this.pages.length;
    this.visiblePages = [];
    this.endPages = [];
    this.showEllipsis = false;

    if (totalPages <= 5) {
      this.visiblePages = this.pages;
    } else {
      const startPages = this.pages.slice(Math.max(0, this.currentPage - 1), this.currentPage + 1);
      const endPages = this.pages.slice(totalPages - 2, totalPages);

      if (startPages[0] > 0) {
        this.visiblePages = startPages;
        this.showEllipsis = true;
      } else {
        this.visiblePages = this.pages.slice(0, 2);
      }

      this.endPages = endPages;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePagedCollection();
      this.updateVisiblePages();
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
      this.updatePagedCollection();
      this.updateVisiblePages();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagedCollection();
    this.updateVisiblePages();
  }
}
