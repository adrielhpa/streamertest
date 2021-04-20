import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ProjectService } from './_services/_projectServices/ProjectService.service';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    routingComponents
   ],
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
