import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanthomeComponent } from './participanthome.component';

describe('ParticipanthomeComponent', () => {
  let component: ParticipanthomeComponent;
  let fixture: ComponentFixture<ParticipanthomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipanthomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipanthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
