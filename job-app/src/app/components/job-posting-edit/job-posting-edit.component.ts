import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/debounceTime'; 

import { DataService } from '../../services/data.service';
import { IJob } from '../../models/job.model';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';
import { AbstractControl } from '@angular/forms/src/model';

@Component({
  selector: 'app-job-posting-edit',
  templateUrl: './job-posting-edit.component.html',
  styleUrls: ['./job-posting-edit.component.css']
})
export class JobPostingEditComponent implements OnInit {

  jobForm: FormGroup;  
  id:string;
  job: IJob;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private router: Router,
    private dataService: DataService,
    private fb: FormBuilder,
    private route:ActivatedRoute 
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

    this.route.params.subscribe((params:Params) => {
      this.id = params.id;
      this.dataService.getJob(params.id).subscribe( job => {
        this.job = job;
        this.onJobRetrieved(this.job);
      });
      ;
    });
  }

  onJobRetrieved(job: IJob):void {
    if(this.jobForm) {
        this.jobForm.reset();
    }

    this.jobForm.patchValue({
      position:  this.job.position,
      locationCity: this.job.locationCity,
      locationState: this.job.locationState,
      company: this.job.company,
      type: this.job.type,
      payRate: this.job.payRate,
      payPeriod: this.job.payPeriod,
      description: this.job.description
    });
  
    
    //this.jobForm.setControl('sessions', this.fb.array(this.speaker.sessions || []));
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
      this.router.navigate(['jobs/' + this.id + '/edit'])
    } else {
      console.log(this.jobForm.value);
      this.dataService.updateJob(this.id, this.jobForm.value)
      .then( () => {
        this.flashMessagesService.show('Job successfully edited.', {
          cssClass:'alert-success', timeout: 4000
        });
        this.router.navigate(['jobs']);
      });
    }
  }

}
