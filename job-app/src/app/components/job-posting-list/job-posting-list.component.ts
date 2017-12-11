import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service';

import { IJob } from '../../models/job.model';

@Component({
  selector: 'app-job-posting-list',
  templateUrl: './job-posting-list.component.html',
  styleUrls: ['./job-posting-list.component.css']
})
export class JobPostingListComponent implements OnInit {

  jobs: IJob[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getJobs()
      .subscribe(jobs => this.jobs = jobs );
  }

}
