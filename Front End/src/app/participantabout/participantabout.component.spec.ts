import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantaboutComponent } from './participantabout.component';

describe('ParticipantaboutComponent', () => {
  let component: ParticipantaboutComponent;
  let fixture: ComponentFixture<ParticipantaboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantaboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantaboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
