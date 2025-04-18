import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({ 
  selector: '[appScrollEnd]'
})
export class ScrollEndDirective {
  @Output() scrollEnd = new EventEmitter<void>();

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const threshold = 100; // Pixeles antes del final para cargar
    const position = window.scrollY + window.innerHeight;
    const height = document.body.scrollHeight;
    
    if (position > height - threshold) {
      this.scrollEnd.emit();
    }
  }
}