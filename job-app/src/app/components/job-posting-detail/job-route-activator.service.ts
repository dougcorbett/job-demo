import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { IJob } from '../../models/job.model';

import { DataService } from '../../services/data.service';

@Injectable()
export class JobRouteActivatorService implements CanActivate {

  constructor(private dataService: DataService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot) {

    let jobExists = false;

    this.dataService.getJob(route.params['id'])
      .subscribe( (job: IJob) => { jobExists = !!job; } );

      if (!jobExists) {
        this.router.navigate(['/page-not-found']);
      }
    
      return jobExists;
  }
}
