import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantheaderComponent } from './participantheader.component';

describe('ParticipantheaderComponent', () => {
  let component: ParticipantheaderComponent;
  let fixture: ComponentFixture<ParticipantheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
