import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAnimesComponent } from './upcoming-animes.component';

describe('UpcomingAnimesComponent', () => {
  let component: UpcomingAnimesComponent;
  let fixture: ComponentFixture<UpcomingAnimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingAnimesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingAnimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
