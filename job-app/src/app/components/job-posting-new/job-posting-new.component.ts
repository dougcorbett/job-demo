import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime'; 

import { DataService } from '../../services/data.service';
import { IJob } from '../../models/job.model';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';
import { AbstractControl } from '@angular/forms/src/model';


@Component({
  selector: 'app-job-posting-new',
  templateUrl: './job-posting-new.component.html',
  styleUrls: ['./job-posting-new.component.css']
})
export class JobPostingNewComponent implements OnInit {

  jobForm: FormGroup;  

  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private dataService: DataService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.jobForm = this.fb.group({
      position: ['', [ Validators.required, Validators.minLength(2) ] ],
      locationCity: ['', [ Validators.required, Validators.minLength(2) ] ],
      locationState: ['', [ Validators.required, Validators.minLength(2) ] ],
      company: ['', [ Validators.required, Validators.minLength(2) ] ],
      type: ['Full Time', [ Validators.required ]],
      payRate: 0.00,
      payPeriod: ['Annually', [ Validators.required ]],
      description: ''
    });
  }

  // addTestData() {
  //   this.jobForm.setValue({
  //     position: 'Project Manager',
  //     locationCity: 'Tulsa',
  //     locationState: 'Oklahoma',
  //     company: 'NBNC',
  //     type: 'Part Time',
  //     payRate: 100.00,
  //     payPeriod: 'Hourly',
  //     description: 'Candy canes cotton candy cupcake halvah dessert. Bonbon lollipop apple pie cake marshmallow jelly-o muffin. Candy jujubes marshmallow cheesecake brownie. Lollipop topping tart tootsie roll. Bonbon donut pie. Lemon drops candy canes carrot cake candy canes gummi bears. Cotton candy icing lollipop. Chocolate cake tootsie roll biscuit chocolate halvah soufflé marshmallow toffee. Sugar plum cookie caramels candy pudding cupcake brownie. Brownie bear claw liquorice chocolate cake tart topping. Liquorice gummi bears jelly beans. Jelly-o gummi bears cookie tiramisu sweet roll lollipop.',
  //     sessions: [ 
  //       { title: 'Angular Rox', description: 'wan that aprile for the sure the sorte' }
  //    ]
  //   });
  // }

  // updateTestData() {
  //   this.jobForm.patchValue({
  //     position: 'Designer',
  //     company: 'Citgo'
  //   });
  // }

  onSubmit() {
    if (!this.jobForm.valid) {
      this.flashMessagesService.show('Please fill in all fields', {
        cssClass:'alert-danger', timeout: 4000
      });
      this.router.navigate(['jobs/new'])
    } else {
      console.log(this.jobForm.value);
      this.dataService.createJob(this.jobForm.value)
      .then( () => {
        this.flashMessagesService.show('New job added.', {
          cssClass:'alert-success', timeout: 4000
        });
        this.router.navigate(['jobs']);
      });
    }
  }

}
