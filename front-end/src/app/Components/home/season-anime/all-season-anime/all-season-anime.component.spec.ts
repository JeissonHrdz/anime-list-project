import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSeasonAnimeComponent } from './all-season-anime.component';

describe('AllSeasonAnimeComponent', () => {
  let component: AllSeasonAnimeComponent;
  let fixture: ComponentFixture<AllSeasonAnimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSeasonAnimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllSeasonAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
