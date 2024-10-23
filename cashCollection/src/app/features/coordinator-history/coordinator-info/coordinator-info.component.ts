import { Component, Input } from '@angular/core';
import { ExcelService } from '../../../core/services/excel.service';
import { HistoryService } from '../../../core/services/history.service';
import { CoordinatorHistoryService } from '../../../core/services/coordinator-history.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-coordinator-info',
  templateUrl: './coordinator-info.component.html',
  styleUrl: './coordinator-info.component.scss',
  standalone: true,
  imports: [CommonModule, SharedModule]
})
export class CoordinatorInfoComponent {
  @Input() totalResults: number = 1000; // Número total de resultados desde el backend
  totalCollection: any[] = [];
  pagedTransactions: any[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  pages: number[] = [];
  visiblePages: number[] = [];
  endPages: number[] = [];
  showEllipsis: boolean = false;
  expanded: boolean[] = [];

  constructor(
    private coordinatorHistory: CoordinatorHistoryService,
    private excelService: ExcelService,
  ) {}

  ngOnInit(): void {
    this.calculatePages();
    this.updateVisiblePages();
    this.fetchPage();
  }

  calculatePages() {
    this.totalPages = Math.ceil(this.totalResults / this.itemsPerPage);
    this.pages = new Array(this.totalPages).fill(0).map((x, i) => i);
  }

  updatePagedTransactions() {
    this.expanded = new Array(this.pagedTransactions.length).fill(false);
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
      this.fetchPage();
      this.updateVisiblePages()
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage++;
      this.fetchPage();
      this.updateVisiblePages()
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.fetchPage();
    this.updateVisiblePages()
  }

  fetchPage() {
    const start = this.currentPage * this.itemsPerPage;
    const observerCashierCollection = {
      next: (response: any) => {
        this.totalCollection = response
      }
    }
    this.coordinatorHistory.getRegistersCasheer(start, this.itemsPerPage).subscribe(observerCashierCollection);
  }

  toggleSubtable(index: number) {
    this.expanded[index] = !this.expanded[index];
  }

  parseJsonCredits(credits: string): Array<any> {
    return JSON.parse(credits);
  }

  exportToExcel(): void {
    this.excelService.exportAsExcelFile(this.totalResults);
  }
}
