import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorVoiceDetailsComponent } from './actor-voice-details.component';

describe('ActorVoiceDetailsComponent', () => {
  let component: ActorVoiceDetailsComponent;
  let fixture: ComponentFixture<ActorVoiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorVoiceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActorVoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
