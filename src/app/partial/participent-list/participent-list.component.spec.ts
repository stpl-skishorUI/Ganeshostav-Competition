import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipentListComponent } from './participent-list.component';

describe('ParticipentListComponent', () => {
  let component: ParticipentListComponent;
  let fixture: ComponentFixture<ParticipentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
