import { Component, inject, signal } from '@angular/core';
import { ActivityService } from '../../../Core/Services/activity.service';
import { Activity } from '../../../Core/Model/activity.model';
import { Subject, takeUntil } from 'rxjs';
import { DatePipe } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html-pipe';
import { format } from 'path';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-activity',
  imports: [DatePipe, MarkdownModule, SafeHtmlPipe],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {

  private activityService = inject(ActivityService)
  private destroy$ = new Subject<void>()
  private apiUrl = environment.frontUrl;



  page: number = 1
  activity: Activity[] = []

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


  formatAnilistMarkdown(text: string): string {
    if (!text) return '';

    let formatted = text;

    // Escapar caracteres HTML
    formatted = formatted.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Spoilers
    formatted = formatted.replace(/~!\s*(.*?)\s*!~/gs, '<span class="spoiler">$1</span>');

    // YouTube videos
    formatted = formatted.replace(/youtube\((?:https:\/\/www\.youtube\.com\/watch\?v=)?([A-Za-z0-9_-]+)\)/g,
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');

    // Webm/video
    formatted = formatted.replace(/webm\((.*?)\)/g,
      '<video src="$1" autoplay loop muted></video>');

    // Headers (# to <h1>-<h5>)
    formatted = formatted.replace(/^##### (.*)$/gm, '<h5>$1</h5>');
    formatted = formatted.replace(/^#### (.*)$/gm, '<h4>$1</h4>');
    formatted = formatted.replace(/^### (.*)$/gm, '<h3>$1</h3>');
    formatted = formatted.replace(/^## (.*)$/gm, '<h2>$1</h2>');
    formatted = formatted.replace(/^# (.*)$/gm, '<h1>$1</h1>');
    formatted = formatted.replace(/^(.+)\n==+/gm, '<h1>$1</h1>');
    formatted = formatted.replace(/^(.+)\n--+/gm, '<h2>$1</h2>');

    // Bold, italic, strikethrough
    formatted = formatted.replace(/__([^_]+?)__/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/_(?!_)([^_]+?)_/g, '<em>$1</em>');
    formatted = formatted.replace(/\*(?!\*)([^*]+?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/~~(.*?)~~/g, '<del>$1</del>');

    // Inline code
    formatted = formatted.replace(/`([^`]+?)`/g, '<code>$1</code>');

    // Code block with triple backticks
    formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre>$1</pre>');

    // Blockquotes
    formatted = formatted.replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>');

    //Imagen con markdown ![alt](url)
    formatted = formatted.replace(/!\[.*?]\((https?:\/\/[^\s)]+)\)/g, '<img src="$1" alt="Image">');

    // Imagen con tamaño img###(url)
    formatted = formatted.replace(/img(\d+)\((https?:\/\/[^\s)]+)\)/g, '<img src="$2" width="$1">');

    // Links con texto [text](url)
    //formatted = formatted.replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Enlaces simples (pero que NO estén precedidos por '!' para evitar imágenes)
    //formatted = formatted.replace(/(?<!\!)<?(https?:\/\/[^\s>]+)>?/g, '<a href="$1" target="_blank">$1</a>');

    // Lists
    formatted = formatted.replace(/^\s*[-+*] (.*)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');
    formatted = formatted.replace(/^\d+\. (.*)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*<\/li>)/gms, '<ol>$1</ol>');

    // Horizontal rules
    formatted = formatted.replace(/^[-*]{3,}$/gm, '<hr>');

    // New lines to <br>
    formatted = formatted.replace(/\n/g, '<br>');

    // Centrado con ~~~
    formatted = formatted.replace(/˜˜˜(.*?)˜˜˜/gs, '<div style="text-align:center;">$1</div>');

    return formatted;
  }



  formatTextActivity(content: string): string {
    if (!content) return '';

    // 1. Convertir imágenes embebidas: img350(url) → <img>
    let formatted = content.replace(/(img[\d%]+[\w%]*)\(([^)]+)\)/g, (match, prefix, url) => {
      return `<img src="${url}" class="embedded-image" loading="lazy">`;
    });

  formatted = formatted.replace(/Img(\d+)\((https?:\/\/[^\s)]+)\)/gi, '<img src="$2" width="$1">');
  formatted = formatted.replace(/Img\((https?:\/\/[^\s)]+)\)/gi, '<img src="$1">');

  formatted = formatted.replace(
    /\[([^\]]+)\]\(https:\/\/anilist\.co\/studio\/(\d+)\/[^\)]+\)/g,
    '<a href="https://miweb.com/studio/$2" target="_blank">$1</a>'
  );
  formatted = formatted.replace(
    /\[([^\]]+)\]\(https:\/\/anilist\.co\/anime\/(\d+)\/[^\)]+\)/g,
    '<a href="https://miweb.com/anime/$2" target="_blank">$1</a>'
  );
  formatted = formatted.replace(
    /\[([^\]]+)\]\(https:\/\/anilist\.co\/manga\/(\d+)\/[^\)]+\)/g,
    '<a href="https://miweb.com/manga/$2" target="_blank">$1</a>'
  );
  formatted = formatted.replace(
    /\[([^\]]+)\]\(https:\/\/anilist\.co\/characters\/(\d+)\/[^\)]+\)/g,
    '<a href="https://miweb.com/characters/$2" target="_blank">$1</a>'
  );
  formatted = formatted.replace(
    /\[([^\]]+)\]\(https:\/\/anilist\.co\/staff\/(\d+)\/[^\)]+\)/g,
    '<a href="https://miweb.com/staff/$2" target="_blank">$1</a>'
  );
 


  formatted = formatted.replace(
    /\[\s*`([^`]+)`\s*\]\(https:\/\/anilist\.co\/character\/(\d+)\/[^\)]+\)/g,
    `<strong><a href="${this.apiUrl}/character/$2" target="_blank">$1</a></strong>`
  );


  formatted = formatted.replace(/\[([^\]]+)\]/g, '$1');

    formatted = formatted.replace(/img\((https?:\/\/[^)]+)\)/g, (match, url) => {
      return `<img src="${url}" class="embedded-image" loading="lazy">`;
    });

    

    formatted = formatted.replace(/\[\s*img\((https?:\/\/[^\s)]+)\)\s*]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank"><img src="$1" alt="Image"></a>');

    formatted = formatted.replace(/\[\s*img(\d+)\((https?:\/\/[^\s)]+)\)\s*]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$3" target="_blank"><img src="$2" width="$1"></a>');

    formatted = formatted.replace(/youtube\((https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)(\?[^)]*)?)\)/gi,
    (_match, _url, videoId) => {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" ` +
             `title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; ` +
             `encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    });

    formatted = formatted.replace(/([^\s]+)\((https?:\/\/[^)]+)\)/g, (match, text, url) => {
      // Si ya es una imagen, no lo conviertas en enlace
      if (text.startsWith('/img\d+') || text.startsWith('webm')) return match;
      return `<a class="text-amber-500 font-medium" href="${url}" target="_blank" rel="noopener">${text}</a>`;
    });
  

    // 2. Convertir encabezados
    formatted = formatted.replace(/^##### (.*)$/gm, '<h5>$1</h5>');
    formatted = formatted.replace(/^#### (.*)$/gm, '<h4>$1</h4>');
    formatted = formatted.replace(/^### (.*)$/gm, '<h3>$1</h3>');
    formatted = formatted.replace(/^## (.*)$/gm, '<h2>$1</h2>');
    formatted = formatted.replace(/^# (.*)$/gm, '<h1>$1</h1>');
    formatted = formatted.replace(/^(.+)\n==+/gm, '<h1>$1</h1>');
    formatted = formatted.replace(/^(.+)\n--+/gm, '<h2>$1</h2>');

    // 3. Convertir listas
    formatted = formatted.replace(/^\s*[-+*] (.*)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');
    formatted = formatted.replace(/^\d+\. (.*)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*<\/li>)/gms, '<ol>$1</ol>')

  //  formatted = formatted.replace(
  //   /https:\/\/anilist\.co\/anime\/(\d+)\/[^\s]*/g,
  //   (_match, id) => {
  //     // Aquí haces lo que quieras con el id, por ejemplo:
  //     return `<a><a class="text-amber-500 font-medium" href="${this.apiUrl}/anime/${id}" target="_blank">EL NOMBRE DEL ANIME</a>` + this.apiUrl + `/anime/${id}`;
  //   }
  // );


    //formatted = formatted.replace(/˜˜˜(.*?)˜˜˜/gs, '<div style="text-align:center;">$1</div>');
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Centrando con ~~~
    formatted = formatted.replace(/~~~(.*?)~~~\s*/gs, '<div style="text-align:center">$1</div>');

    // Opcional: eliminar <a> sin href
    formatted = formatted.replace(/<a>(.*?)<\/a>/g, '$1');

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
