import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselImage {
  src: string;
  alt?: string;
  title?: string;
  description?: string;
}

export interface CarouselConfig {
  autoplay?: boolean;
  delay?: number;
  height?: string;
  width?: string;
  transitionDuration?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  pauseOnHover?: boolean;
  loop?: boolean;
}

@Component({
  selector: 'app-carousel-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-gallery.component.html',
  styleUrls: ['./carousel-gallery.component.scss']
})
export class CarouselGalleryComponent implements OnInit, OnDestroy {
  @Input() images: CarouselImage[] = [];
  @Input() config: CarouselConfig = {};
  
  // Individual config options (for backward compatibility)
  @Input() autoplay: boolean = false;
  @Input() delay: number = 3000;
  @Input() height: string = '340px';
  @Input() width: string = '100%';
  @Input() transitionDuration: number = 500;
  @Input() showIndicators: boolean = true;
  @Input() showArrows: boolean = true;
  @Input() pauseOnHover: boolean = true;
  @Input() loop: boolean = true;
  
  @Output() slideChange = new EventEmitter<{index: number, image: CarouselImage}>();
  @Output() imageClick = new EventEmitter<{index: number, image: CarouselImage}>();
  @Output() autoplayStart = new EventEmitter<void>();
  @Output() autoplayStop = new EventEmitter<void>();

  current = 0;
  touchStartX = 0;
  touchEndX = 0;
  private autoplayTimer?: number;
  isAutoplayPaused = false;

  ngOnInit() {
    this.mergeConfig();
    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  private mergeConfig() {
    // Merge config object with individual inputs
    const finalConfig = {
      autoplay: this.config.autoplay ?? this.autoplay,
      delay: this.config.delay ?? this.delay,
      height: this.config.height ?? this.height,
      width: this.config.width ?? this.width,
      transitionDuration: this.config.transitionDuration ?? this.transitionDuration,
      showIndicators: this.config.showIndicators ?? this.showIndicators,
      showArrows: this.config.showArrows ?? this.showArrows,
      pauseOnHover: this.config.pauseOnHover ?? this.pauseOnHover,
      loop: this.config.loop ?? this.loop
    };
    
    Object.assign(this, finalConfig);
  }

  next() {
    if (this.current === this.images.length - 1 && !this.loop) return;
    
    const nextIndex = (this.current + 1) % this.images.length;
    this.goTo(nextIndex);
  }

  prev() {
    if (this.current === 0 && !this.loop) return;
    
    const prevIndex = this.current === 0 ? this.images.length - 1 : this.current - 1;
    this.goTo(prevIndex);
  }

  goTo(index: number) {
    if (index < 0 || index >= this.images.length || index === this.current) return;
    
    this.current = index;
    this.slideChange.emit({
      index: this.current,
      image: this.images[this.current]
    });
  }

  onImageClick() {
    this.imageClick.emit({
      index: this.current,
      image: this.images[this.current]
    });
  }

  // Autoplay methods
  startAutoplay() {
    if (!this.autoplay || this.images.length <= 1) return;
    
    this.stopAutoplay();
    this.autoplayTimer = window.setInterval(() => {
      if (!this.isAutoplayPaused) {
        this.next();
      }
    }, this.delay);
    
    this.autoplayStart.emit();
  }

  stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = undefined;
      this.autoplayStop.emit();
    }
  }

  pauseAutoplay() {
    if (this.pauseOnHover) {
      this.isAutoplayPaused = true;
    }
  }

  resumeAutoplay() {
    if (this.pauseOnHover) {
      this.isAutoplayPaused = false;
    }
  }

  // Touch events for swipe
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
    this.pauseAutoplay();
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
    this.resumeAutoplay();
  }

  handleSwipe() {
    const dx = this.touchEndX - this.touchStartX;
    const minSwipeDistance = 50;
    
    if (Math.abs(dx) > minSwipeDistance) {
      if (dx < 0) this.next();
      else this.prev();
    }
  }

  // Keyboard navigation
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.next(); // RTL: left arrow = next
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.prev(); // RTL: right arrow = prev
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.onImageClick();
        break;
      case 'Escape':
        this.stopAutoplay();
        break;
    }
  }

  // Dynamic styles
  get carouselStyles() {
    return {
      width: this.width,
      height: this.height,
      '--transition-duration': `${this.transitionDuration}ms`
    };
  }
} 