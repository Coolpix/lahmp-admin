import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsDetailComponent } from './seasons-detail.component';

describe('SeasonsDetailComponent', () => {
  let component: SeasonsDetailComponent;
  let fixture: ComponentFixture<SeasonsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
