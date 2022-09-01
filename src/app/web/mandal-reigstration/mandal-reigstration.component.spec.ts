import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MandalReigstrationComponent } from './mandal-reigstration.component';

describe('MandalReigstrationComponent', () => {
  let component: MandalReigstrationComponent;
  let fixture: ComponentFixture<MandalReigstrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MandalReigstrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MandalReigstrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
