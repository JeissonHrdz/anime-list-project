import { Component, inject, signal } from '@angular/core';
import { ActivityService } from '../../../Core/Services/activity.service';
import { Activity } from '../../../Core/Model/activity.model';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html-pipe';

@Component({
  selector: 'app-activity',
  imports: [DatePipe, SafeHtmlPipe],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {

  private activityService = inject(ActivityService)
  private destroy$ = new Subject<void>()

  page: number = 1
  activity: Activity[]  = []
  
  ngOnInit(): void {
    this.activityService.getGlobalActivity(this.page).pipe(
      takeUntil(this.destroy$)
    ).subscribe((activity) => {
      this.activity = activity
      console.log(this.activity)
    })
  }

 loadMoreActivity() {
    this.page++
    this.activityService.getGlobalActivity(this.page).pipe(
      takeUntil(this.destroy$)
    ).subscribe((activity) => {
      this.activity = this.activity.concat(activity)
      console.log(this.activity)
    })
  }

  formatTextActivity(content: string): string {
  if (!content) return '';

  // 1. Convertir imágenes embebidas: img350(url) → <img>
   let formatted = content.replace(/(img[\d%]+[\w%]*)\(([^)]+)\)/g, (match, prefix, url) => {
    return `<img src="${url}" class="embedded-image" loading="lazy">`;
  });
  
  formatted = formatted.replace(/Img\((https?:\/\/[^)]+)\)/g, (match, url) => {
    return `<img src="${url}" class="embedded-image" loading="lazy">`;
  });

  formatted = formatted.replace(/img\((https?:\/\/[^)]+)\)/g, (match, url) => {
    return `<img src="${url}" class="embedded-image" loading="lazy">`;
  });

   formatted = formatted.replace(/([^\s]+)\((https?:\/\/[^)]+)\)/g, (match, text, url) => {
    // Si ya es una imagen, no lo conviertas en enlace
    if (text.startsWith('/img\d+') || text.startsWith('webm')) return match;
    return `<a class="text-amber-500 font-medium" href="${url}" target="_blank" rel="noopener">${text}</a>`;
  });

  // 2. Convertir saltos de línea en <br>
  formatted = formatted.replace(/\n/g, '<br>');

  formatted = formatted.replace(/^# ~~~/g, '').replace(/~~~/g, '').replace("#", '').trim()

  // 3. Opcional: Resaltar texto entre __ (negritas simuladas)
  formatted = formatted.replace(/__([^_]+)__/g, '<h1 class="font-bold text-[18px]">$1</h1>');
 



  // 4. Sanitizar para seguridad (Angular DOM sanitizer)
  return formatted;
}

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
