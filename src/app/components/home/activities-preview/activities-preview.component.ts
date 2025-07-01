import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CarouselGalleryComponent, CarouselImage } from '../../shared/carousel-gallery/carousel-gallery.component';

@Component({
  selector: 'app-activities-preview',
  standalone: true,
  imports: [CommonModule, RouterLink, CarouselGalleryComponent],
  templateUrl: './activities-preview.component.html',
  styleUrls: ['./activities-preview.component.scss']
})
/**
 * Displays a preview list of available activities.
 */
export class ActivitiesPreviewComponent {
  
  carouselImages: CarouselImage[] = [
    {
      src: 'assets/images/2025_07_01_23_47_25_קורס_כוכב_שני.jpg',
      alt: 'קורס כוכב שני בקו טאו',
      title: 'צלילות בקו טאו',
      description: 'למדו לצלול בעולם התת-ימי המרהיב של קו טאו - ביתם של שוניות האלמוגים היפות בעולם'
    },
    {
      src: 'assets/images/ice.jpeg',
      alt: 'אמבטיית קרח בקו טאו',
      title: 'אמבטיית קרח מרעננת',
      description: 'חוויה ייחודית של אמבטיית קרח אחרי יום של הרפתקאות באי הטרופי הקסום'
    },
    {
      src: 'assets/images/party.jpeg',
      alt: 'מסיבה על החוף',
      title: 'מסיבות בלתי נשכחות',
      description: 'לילות מלאי אנרגיה עם מוזיקה, ריקודים וחברויות חדשות'
    },
    {
      src: 'assets/images/yoga.jpg',
      alt: 'יוגה ופילטס מול הטבע בקו טאו',
      title: 'יוגה ופילטס מול הטבע בקו טאו',
      description: 'התחברו לגוף ולנשמה עם שיעורי יוגה באווירה שלווה וקסומה'
    }
  ];

  activities = [
    {
      icon: 'waves',
      title: 'צלילות',
      description: 'גלו את עולם המים הקסום של קו טאו',
      colorClass: 'from-blue-500-to-blue-600',
      bgClass: 'bg-blue-50'
    },
    {
      icon: 'music_note',
      title: 'מסיבות ואירועים',
      description: 'לילות בלתי נשכחים תחת כוכבי השמיים',
      colorClass: 'from-purple-500-to-pink-500',
      bgClass: 'bg-purple-50'
    },
    {
      icon: 'favorite',
      title: 'יוגה ופילאטיס',
      description: 'כשהסטודיו הוא הטבע והנוף חלק מהתרגול',
      colorClass: 'from-green-500-to-emerald-500',
      bgClass: 'bg-green-50'
    },
    {
      icon: 'ac_unit',
      title: 'אמבטיות קרח סאונה יבשה',
      description: 'חוויה מרעננת לגוף ולנפש',
      colorClass: 'from-cyan-500-to-blue-500',
      bgClass: 'bg-cyan-50'
    },
    {
      icon: 'restaurant',
      title: 'ארוחות שבת',
      description: 'טעם של בית בגן עדן',
      colorClass: 'from-indigo-500-to-purple-500',
      bgClass: 'bg-indigo-50'
    },
    {
      icon: 'menu_book',
      title: 'סדנאות ופעילויות',
      description: 'זמן להרגיש, ללמוד, ולהתחבר',
      colorClass: 'from-amber-500-to-orange-500',
      bgClass: 'bg-amber-50'
    }
  ];

  // Carousel event handlers
  onSlideChange(event: {index: number, image: CarouselImage}) {
    console.log('Slide changed to:', event.index, event.image.title);
  }

  onImageClick(event: {index: number, image: CarouselImage}) {
    console.log('Image clicked:', event.image.title);
    // You can navigate to a detailed view or open a modal here
  }

  onAutoplayStart() {
    console.log('Autoplay started');
  }

  onAutoplayStop() {
    console.log('Autoplay stopped');
  }
} 
