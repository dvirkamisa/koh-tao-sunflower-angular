import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-testimonials-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials-section.component.html',
  styleUrls: ['./testimonials-section.component.scss']
})
/**
 * Carousel component displaying testimonials.
 */
export class TestimonialsSectionComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  private interval: any;

  testimonials = [
    {
      name: 'יעל ✨',
      text: 'אחלה חוויה! הצלילה הייתה מדהימה והקבוצה פשוט מושלמת. תודה על הארגון המדהים!',
      activity: 'צלילה',
      rating: 5,
      avatar: '🤿'
    },
    {
      name: 'דני 🎵',
      text: 'המסיבה אתמול הייתה פצצה! המוזיקה, האנרגיה, האנשים - הכל היה מושלם. כבר מחכה לבאה!',
      activity: 'מסיבות',
      rating: 5,
      avatar: '🎧'
    },
    {
      name: 'מיכל 🧘‍♀️',
      text: 'השיעור יוגה מול הזריחה היה חוויה רוחנית אמיתית. תודה שיצרתם לנו את הרגע הזה!',
      activity: 'יוגה',
      rating: 5,
      avatar: '🌅'
    },
    {
      name: 'עומר 🏍️',
      text: 'הטיול באופנוע היה בדיוק מה שחיפשתי! נופים מטורפים וחברה מעולה. ממליץ בחום!',
      activity: 'טיולי אופנועים',
      rating: 5,
      avatar: '🏍️'
    },
    {
      name: 'שירה ❄️',
      text: 'אמבטיית הקרח הייתה אתגר מדהים! הרגשתי כל כך חזקה אחרי זה. חוויה שמשנה!',
      activity: 'אמבטיות קרח',
      rating: 5,
      avatar: '💪'
    }
  ];

  whatsappMessages = [
    { text: 'תודה רבה על הערב המדהים! 🙏', sender: 'רועי', time: '21:34' },
    { text: 'החוויה הייתה פצצה! מתי הבא? 😍', sender: 'נועה', time: '22:15' },
    { text: 'אתם פשוט מדהימים! תודה על הכל ❤️', sender: 'תומר', time: '23:42' }
  ];

  ngOnInit() {
    this.interval = setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  nextTestimonial() {
    this.currentIndex = this.currentIndex === this.testimonials.length - 1 ? 0 : this.currentIndex + 1;
  }

  prevTestimonial() {
    this.currentIndex = this.currentIndex === 0 ? this.testimonials.length - 1 : this.currentIndex - 1;
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
} 
