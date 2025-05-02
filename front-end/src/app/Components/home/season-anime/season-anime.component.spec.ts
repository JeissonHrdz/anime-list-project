import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonAnimeComponent } from './season-anime.component';

describe('SeasonAnimeComponent', () => {
  let component: SeasonAnimeComponent;
  let fixture: ComponentFixture<SeasonAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonAnimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
