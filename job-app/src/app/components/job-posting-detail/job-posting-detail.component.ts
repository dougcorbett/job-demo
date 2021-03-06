import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router"

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { IJob } from '../../models/job.model';

@Component({
  selector: 'app-job-posting-detail',
  templateUrl: './job-posting-detail.component.html',
  styleUrls: ['./job-posting-detail.component.css']
})
export class JobPostingDetailComponent implements OnInit {

  job: IJob;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private route:ActivatedRoute, 
    private router:Router) 
  { 

  }

  ngOnInit() {
    this.route.params.subscribe((params:Params) => {
      this.dataService.getJob(params.id)
          .subscribe( (job: IJob) => { this.job = job; } );
    });
  }

  hasPermission(): boolean {
    return true;
  }

  delete(id:string) {
    if(confirm("Are you sure you want to delete " + this.job.position + " at " + this.job.locationCity + ", " + this.job.locationState + "?")){
      this.dataService.removeJob(id)
      .then(() => this.router.navigate(['jobs']));
    }
  }

  isAuthenticated(): boolean {
    //console.log(this.authService.currentUser);
    return this.authService.isAuthenticated();
    //return false;
  }
}