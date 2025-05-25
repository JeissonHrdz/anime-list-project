import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTippyLoader, provideTippyConfig, tooltipVariation, popperVariation } from '@ngneat/helipopper/config';
import { provideMarkdown } from 'ngx-markdown';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideTippyLoader(() => import('tippy.js')),
    provideTippyConfig({
      defaultVariation: 'tooltip',               
      variations: {
        tooltip:{
          ...tooltipVariation,          
          delay: [0, 0],
          hideOnClick: false
        },
        popper: popperVariation,
      },
    }),
    provideMarkdown(),
  
    
  ]
};
