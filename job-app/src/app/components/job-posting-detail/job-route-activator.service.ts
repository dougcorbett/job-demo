import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';

import { DataService } from '../../services/data.service';

@Injectable()
export class JobRouteActivatorService implements CanActivate {

  constructor(private dataService: DataService, private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
      const jobExists = !!this.dataService.getJob(route.params['id']);

      if (!jobExists) {
        this.router.navigate(['/page-not-found']);
      }
    
      return jobExists;
  }
}
