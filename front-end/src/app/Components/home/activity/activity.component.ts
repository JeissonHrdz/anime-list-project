import { Component, inject, signal } from '@angular/core';
import { ActivityService } from '../../../Core/Services/activity.service';
import { Activity, ActivityResponse, ListActivity } from '../../../Core/Model/activity.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-activity',
  imports: [],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {

  private activityService = inject(ActivityService)
  private destroy$ = new Subject<void>()
  activity: Activity[]  = []
  
  ngOnInit(): void {

    this.activityService.getGlobalActivity().pipe(
      takeUntil(this.destroy$)
    ).subscribe((activity) => {
      this.activity = activity
      console.log(this.activity)
    })
  }

}
