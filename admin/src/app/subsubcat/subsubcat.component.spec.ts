import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsubcatComponent } from './subsubcat.component';

describe('SubsubcatComponent', () => {
  let component: SubsubcatComponent;
  let fixture: ComponentFixture<SubsubcatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsubcatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsubcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
