import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BNPLModule } from './feature/BNPL/bnpl.module';
import { CoreModule } from './core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxExtendedPdfViewerModule,
    AppRoutingModule,
    CoreModule,
    BNPLModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-co' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
