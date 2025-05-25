import { Component, ElementRef, inject, Renderer2, signal, ViewChild } from '@angular/core';
import { ActivityService } from '../../../Core/Services/activity.service';
import { Activity } from '../../../Core/Model/activity.model';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html-pipe';
import { format } from 'path';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';



@Component({
  selector: 'app-activity',
  imports: [DatePipe, MarkdownModule, SafeHtmlPipe],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {
  @ViewChild('loadMore') loadMore!: ElementRef
  @ViewChild('loadMoreText') loadMoreText!: ElementRef

  private activityService = inject(ActivityService)
  private router = inject(Router)
  private destroy$ = new Subject<void>()
  private apiUrl = environment.frontUrl;




  page: number = 1
  pageText: number = 1
  activity: Activity[] = []
  activityText: Activity[] = []

  ngOnInit(): void {    
    this.loadInitialActivity()

    setTimeout(() => {
      this.stupIntersectionObserver()
      this.stupIntersectionObserverTextActivity()
    },1000);
    
  }

  stupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadMoreActivity('media')
        }
      })
    })

    observer.observe(this.loadMore.nativeElement)
  }

  stupIntersectionObserverTextActivity() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.loadMoreActivity('text')
        }
      })
    })

    observer.observe(this.loadMoreText.nativeElement)
  }

  loadInitialActivity() {

      this.activityService.getGlobalActivity(this.page).pipe(
      takeUntil(this.destroy$)
    ).subscribe((activity) => {
      this.activity = activity    
    })

    this.activityService.getGlobalActivityText(this.page).pipe(
      takeUntil(this.destroy$)
    ).subscribe((activity) => {
      this.activityText = this.activityText.concat(activity)   
    })  
  
    
  }

  loadMoreActivity(type?: string) {
    if (type == 'text') {      
      this.pageText++
      this.activityService.getGlobalActivityText(this.pageText).pipe(
        takeUntil(this.destroy$)
      ).subscribe((activity) => {
        this.activityText = this.activityText.concat(activity)       
      })
    } else {
      this.page++
      this.activityService.getGlobalActivity(this.page).pipe(
        takeUntil(this.destroy$)
      ).subscribe((activity) => {
        this.activity = this.activity.concat(activity)       
      })
    }
  }

  goToAnime(animeId: number) {
    this.router.navigate(['/anime', animeId]);
  }


  setViewActivity( item: string) {
    if(item == 'post') {
     $('.post-bttn').addClass('bttnActive')
     $('.media-bttn').removeClass('bttnActive')
      $('.post').addClass('grid')
      $('.post').removeClass('hidden')
      $('.media').addClass('hidden');
      $('.media').removeClass('grid');
    } else {
      $('.post-bttn').removeClass('bttnActive')
     $('.media-bttn').addClass('bttnActive')
       $('.post').removeClass('grid')
     $('.post').addClass('hidden')
       $('.media').removeClass('hidden')
      $('.media').addClass('grid');
    }
    
  }





  formatTextActivity(content: string): string {
    if (!content) return '';

    let formatted = content;

    formatted = formatted.replace(
      /<center>\s*((?:(?:img\s*\d+%?|img\d+)%?\((?:https?:\/\/[^\s)]+)\)\s*)+)(<\/center>)?/gi,
      (_, imgBlock, closingTag) => {
        const content = imgBlock.trim();
        return `<div style="display:flex; justify-content:center; flex-wrap:wrap; gap:4px;">${content}</div>`;
      }
    );

    formatted = formatted.replace(/^_{5,}$/gm, '<hr>');

    formatted = formatted.replace(/____([\s\S]+?)____/g, '<strong>$1</strong>');

    formatted = formatted.replace(/^-{3,}$/gm, '<hr>');

    formatted = formatted.replace(
      /!\[.*?\]\((https:\/\/64\.media\.tumblr\.com\/[^\s)]+?)\.gifv\)/gi,
      '<img src="$1.gif" alt="tumblr gif">'
    );

    formatted = formatted.replace(/@([a-zA-Z0-9_]+)/g, '<a class="font-bold contents text-purple-500 hover:text-purple-700 href="https://miweb.com/user/$1" class="user-link">@$1</a>');

    formatted = formatted.replace(/img(\d+)%\((https?:\/\/[^\s)]+)\)/gi, '<img src="$2" class="h-fit" style="width:$1%;" />');

    formatted = formatted.replace(/img\s*(\d+)%\s*\(\s*(https?:\/\/[^\s)]+)\s*\)/gi, '<img src="$2" class="h-fit" style="width:$1%;" />');

    formatted = formatted.replace(/img(\d+)\((https?:\/\/[^\s)]+)\)/gi, '<img src="$2" class="h-fit" style="width:$1px;" />');

    formatted = formatted.replace(/\[\!\[([^\]]+)]\s*\((https?:\/\/[^\s)]+)\)\s*\]/g, '<img src="$2" alt="$1">');

    // 1. Convertir imágenes embebidas: img350(url) → <img>
    /* formatted = content.replace(/(img[\d%]+[\w%]*)\(([^)]+)\)/g, (match, prefix, url) => {
        return `<img src="${url}" class="embedded-image" loading="lazy">`;
    });*/



    formatted = formatted.replace(/img\((https?:\/\/[^)]+)\)/g, (match, url) => {
      return `<img src="${url}" class="embedded-image" loading="lazy">`;
    });

    formatted = formatted.replace(/Img(\d+)\((https?:\/\/[^\s)]+)\)/gi, '<img src="$2" class="h-fit" width="$1">');

    formatted = formatted.replace(/Img\((https?:\/\/[^\s)]+)\)/gi, '<img src="$1">');

    formatted = formatted.replace(/img\s*(\d+)\s*\((https?:\/\/[^\s)]+)\)/gi,
      '<img src="$2" class="h-fit" width="$1" alt="image">'
    );

    formatted = formatted.replace(/^\*{3,}$/gm, '<hr>');

    // links anilist

    //  formatted = formatted.replace(
    //     /https:\/\/anilist\.co\/anime\/(\d+)\/[^\s]*/g,
    //     (_match, id) => {     
    //       return `<a><a class="text-amber-500 font-medium" href="${this.apiUrl}/anime/${id}" target="_blank">EL NOMBRE DEL ANIME</a>` + this.apiUrl + `/anime/${id}`;
    //     }
    //   );
    formatted = formatted.replace(
      /\[([^\]]+)\]\(https:\/\/anilist\.co\/studio\/(\d+)\/[^\)]+\)/g,
      '<a href="https://miweb.com/studio/$2" class="text-purple-500 font-medium" target="_blank">$1</a>'
    );
    formatted = formatted.replace(
      /\[([^\]]+)\]\(https:\/\/anilist\.co\/anime\/(\d+)\/[^\)]+\)/g,
      '<a href="https://miweb.com/anime/$2" class="text-purple-500 font-medium" target="_blank">$1</a>'
    );
    formatted = formatted.replace(
      /\[([^\]]+)\]\(https:\/\/anilist\.co\/manga\/(\d+)\/[^\)]+\)/g,
      '<a href="https://miweb.com/manga/$2" class="text-purple-500 font-medium" target="_blank">$1</a>'
    );
    formatted = formatted.replace(
      /\[([^\]]+)\]\(https:\/\/anilist\.co\/staff\/(\d+)\/[^\)]+\)/g,
      '<a href="https://miweb.com/staff/$2" class="text-purple-500 font-medium" target="_blank">$1</a>'
    );
    formatted = formatted.replace(
      /\[\s*`([^`]+)`\s*\]\(https:\/\/anilist\.co\/character\/(\d+)\/[^\)]+\)/g,
      `<strong><a href="${this.apiUrl}/character/$2" class="text-purple-500 font-medium" target="_blank">$1</a></strong>`);


    formatted = formatted.replace(/webm\((https?:\/\/[^\s)]+)\)/gi, (_, url) => {
      return `
<video  loop controls  playsinline>
  <source src="${url}" type="video/mp4">
  Your browser does not support the video tag.
</video>`.trim();
    });


    formatted = formatted.replace(/youtube\((https?:\/\/[^\s]+)\)/g, (match, url) => {
      const videoId = this.extractYouTubeId(url); // Fun ción que debes tener
      return `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    });

    formatted = formatted.replace(/\[([^\]]+?)\]\s*\(\s*(https?:\/\/[^\s)]+)\s*\)/g, '<a class="text-purple-500 font-medium" href="$2" target="_blank">$1</a>');

    formatted = formatted.replace(/([^\s]+)\((https?:\/\/[^)]+)\)/g, (match, text, url) => {
      // Si ya es una imagen, no lo conviertas en enlace
      if (text.startsWith('/img\d+') || text.startsWith('webm')) return match;
      return `<a class="text-purple-500 font-medium" href="${url}" target="_blank" rel="noopener">${text}</a>`;
    });


    formatted = formatted.replace(/\[([^\]]+)\]/g, '$1');

    formatted = formatted.replace(/\[\s*img\((https?:\/\/[^\s)]+)\)\s*]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank"><img src="$1" alt="Image"></a>');

    formatted = formatted.replace(/\[\s*img(\d+)\((https?:\/\/[^\s)]+)\)\s*]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$3" target="_blank"><img src="$2" width="$1"></a>');

    // 2. Convertir encabezados
    formatted = formatted.replace(/^##### (.*)$/gm, '<h5>$1</h5>');
    formatted = formatted.replace(/^#####`([^`]+)`/gm, '<p class="font-monoespaced" >$1</p>');
    formatted = formatted.replace(/^#### (.*)$/gm, '<h4>$1</h4>');
    formatted = formatted.replace(/^### (.*)$/gm, '<h3>$1</h3>');
    formatted = formatted.replace(/^###(.*)$/gm, '<h3>$1</h3>');
    formatted = formatted.replace(/^## (.*)$/gm, '<h2>$1</h2>');
    formatted = formatted.replace(/^##(.*)$/gm, '<h2>$1</h2>');
    formatted = formatted.replace(/^# (.*)$/gm, '<h1 class="block flex-col items-center ">$1</h1>');
    formatted = formatted.replace(/^#(.*)$/gm, '<h1 class="block flex-col items-center">$1</h1>');
    formatted = formatted.replace(/^(.+)\n==+/gm, '<h1 class="block flex-col items-center">$1</h1>');
    formatted = formatted.replace(/^(.+)\n--+/gm, '<h2>$1</h2>');

    // 3. Convertir listas
    formatted = formatted.replace(/^\s*[-+*] (.*)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');
    formatted = formatted.replace(/^\d+\. (.*)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*<\/li>)/gms, '<ol>$1</ol>')


    formatted = formatted.replace(/~!\s*([\s\S]*?)\s*!~/g,
      '<details class="group cursor-pointer"><summary class="p-2 cursor-pointer w-fit bg-purple-500/20 text-purple-500 rounded-lg"> Spoiler, lick to reveal ' +
      '    </summary>   <div class="p-4 mt-2 flex flex-col  justify-center text-neutral-800 rounded-lg"> $1   </div> </details>');


    formatted = formatted.replace(/_{3,}\s*(.*?)\s*_{3,}/g, '<div style="text-align:center;"><hr style="margin: 8px 0;">$1<hr style="margin: 8px 0;"></div>');

    //formatted = formatted.replace(/˜˜˜(.*?)˜˜˜/gs, '<div style="text-align:center;">$1</div>');
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="inline-flex flex-col items-center">$1</strong>');

    // Centrando con ~~~
    formatted = formatted.replace(/~~~\s*([\s\S]*?)\s*~~~+/g, (_m, content) => {
      return `<div class="flex w-full flex-col items-center"><center style="width: inherit"><div >${content.trim()}</div></center> </div>`;
    });

    formatted = formatted.replace(/~~~\s*([\s\S]*?)\s*~~~+/g, '<center><div >$1</div></center>');
    formatted = formatted.replace(/~~~(.*?)~~~\s*/gs, '<center><div>$1</div></center>');

    formatted = formatted.replace(
      /((?:\[[^\]]+]\((https?:\/\/[^\s)]+)\)\s*\|\s*)+\[[^\]]+]\((https?:\/\/[^\s)]+)\))/g,
      match => {
        const links = match.split('|').map(l => l.trim()).map(l =>
          l.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" class="inline-link">$1</a>')
        );
        return `<div style="display:inline-flex; gap:10px; flex-wrap:wrap; justify-content:center;">${links.join('')}</div>`;
      }
    );

    // Opcional: eliminar <a> sin href
    formatted = formatted.replace(/<a>(.*?)<\/a>/g, '$1');

    // 2. Convertir saltos de línea en <br>
    formatted = formatted.replace(/\n/g, '<br>');

    formatted = formatted.replace(/^# ~~~/g, '').replace(/~~~/g, '').replace("#", '').trim()

    formatted = formatted.replace(/~~([\s\S]*?)~~/g, '<u>$1</u>');

    // 3. Opcional: Resaltar texto entre __ (negritas simuladas)
    //formatted = formatted.replace(/__([^_]+)__/g, '<h1 class="font-bold flex flex-col items-center ">$1</h1>');

    formatted = formatted.replace(/__([\s\S]+?)__/g, ' <strong>$1</strong>');



    formatted = formatted.replace(/(^|[^a-zA-Z0-9])\*([^*\n]+?)\*(?!\w)/g, '$1<em>$2</em>');

    formatted = formatted.replace(/(^|[^a-zA-Z0-9])_([^_\n]+?)_(?!\w)/g, '$1<em>$2</em>');

    formatted = formatted.replace(/(<br>\s*)?((?:<img[^>]*>\s*)+)(?=(<br>|$))/g, (_match, br = '', imgs) => {
      return `${br}<center> <p style="display:ruby;">${imgs.trim()}</p></center>`;
    });


    return formatted;
  }

  extractYouTubeId(url: string): string | null {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  }




  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
