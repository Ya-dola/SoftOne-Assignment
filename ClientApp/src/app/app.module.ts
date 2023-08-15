import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { StudentGridComponent } from './student-grid/student-grid.component';

@NgModule({
  declarations: [AppComponent, NavMenuComponent, StudentGridComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([{ path: '', component: StudentGridComponent }]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
