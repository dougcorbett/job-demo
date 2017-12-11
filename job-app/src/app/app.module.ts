import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { JobPostingListComponent } from './components/job-posting-list/job-posting-list.component';
import { JobPostingDetailComponent } from './components/job-posting-detail/job-posting-detail.component';

import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';
import { JobRouteActivatorService } from './components/job-posting-detail/job-route-activator.service';
import { JobPostingNewComponent } from './components/job-posting-new/job-posting-new.component';
import { JobPostingEditComponent } from './components/job-posting-edit/job-posting-edit.component';
import { LoginComponent } from './components/login/login.component'


const appRoutes: Routes = [
  { pathMatch: 'full',  path: '', component: HomeComponent },
  { pathMatch: 'full',  path: 'jobs', component: JobPostingListComponent },
  { pathMatch: 'full',  path: 'jobs/new', component: JobPostingNewComponent },
  // { pathMatch: 'full',  path: 'jobs/:id', component: JobPostingDetailComponent, canActivate: [JobRouteActivatorService] },
  // { pathMatch: 'full',  path: 'jobs/:id/edit', component: JobPostingEditComponent, canActivate: [JobRouteActivatorService] },
  { pathMatch: 'full',  path: 'jobs/:id', component: JobPostingDetailComponent },
  { pathMatch: 'full',  path: 'jobs/:id/edit', component: JobPostingEditComponent },
  { pathMatch: 'full',  path: 'contact', component: ContactUsComponent },
  { pathMatch: 'full',  path: 'login', component: LoginComponent },
  { pathMatch: 'full',  path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    JobPostingListComponent,
    JobPostingDetailComponent,
    ContactUsComponent,
    JobPostingNewComponent,
    JobPostingEditComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FlashMessagesModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    DataService, 
    AuthService,
    JobRouteActivatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
