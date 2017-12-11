import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPostingNewComponent } from './job-posting-new.component';

describe('JobPostingNewComponent', () => {
  let component: JobPostingNewComponent;
  let fixture: ComponentFixture<JobPostingNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPostingNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPostingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
