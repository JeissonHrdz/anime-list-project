import { DomSanitizer } from "@angular/platform-browser";

export class FomatterAnilistText {


formatAniListText(content: string, sanitizer: DomSanitizer): string {
    
  if (!content) return '';

  // 1. Convertir saltos de línea en <br>
  let formatted = content.replace(/\n/g, '<br>');

  // 2. Formato básico (negritas, cursivas, tachado)
  formatted = formatted
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')       // **bold**
    .replace(/__(.*?)__/g, '<strong>$1</strong>')           // __bold__
    .replace(/\*(.*?)\*/g, '<em>$1</em>')                   // *italic*
    .replace(/_(.*?)_/g, '<em>$1</em>')                     // _italic_
    .replace(/~~(.*?)~~/g, '<del>$1</del>');                // ~~strikethrough~~

  // 3. Encabezados (#, ==, --)
  formatted = formatted
    .replace(/^# (.*?)(<br>|$)/gm, '<h1>$1</h1>')           // # Header
    .replace(/^## (.*?)(<br>|$)/gm, '<h2>$1</h2>')          // ## Header
    .replace(/^### (.*?)(<br>|$)/gm, '<h3>$1</h3>')         // ### Header
    .replace(/^#### (.*?)(<br>|$)/gm, '<h4>$1</h4>')       // #### Header
    .replace(/^##### (.*?)(<br>|$)/gm, '<h5>$1</h5>')       // ##### Header
    .replace(/^(.*?)==+(<br>|$)/gm, '<h1>$1</h1>')          // Header ==
    .replace(/^(.*?)--+(<br>|$)/gm, '<h2>$1</h2>');         // Header --

  // 4. Bloques de código (``` y 4 espacios)
  formatted = formatted
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>') // ```code```
    .replace(/    (.*?)(<br>|$)/gm, '<pre><code>$1</code></pre>'); // 4 espacios

  // 5. Imágenes (AniList-specific: img###(url) y ![]())
  formatted = formatted
    .replace(/img(\d+)\((.*?)\)/g, '<img src="$2" width="$1" class="anilist-img">') // img420(url)
    .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="anilist-img">'); // ![alt](url)

  // 6. Enlaces
  formatted = formatted
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>') // [text](url)
    .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>'); // URLs automáticas

  // 7. Citas (>) y listas (-, 1.)
  formatted = formatted
    .replace(/^> (.*?)(<br>|$)/gm, '<blockquote>$1</blockquote>') // > Quote
    .replace(/^- (.*?)(<br>|$)/gm, '<li>$1</li>')                 // - List item
    .replace(/^(\d+)\. (.*?)(<br>|$)/gm, '<li value="$1">$2</li>'); // 1. Item

  // 8. Caracteres especiales escapados (\*, \_)
  formatted = formatted
    .replace(/\\\*/g, '*').replace(/\\_/g, '_');

  // 9. Sanitizar HTML y retornar
  return sanitizer.bypassSecurityTrustHtml(formatted) as string;
}

 
    
}