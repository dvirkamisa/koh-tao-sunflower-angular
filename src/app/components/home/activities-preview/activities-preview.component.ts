import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activities-preview',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './activities-preview.component.html',
  styleUrls: ['./activities-preview.component.scss']
})
export class ActivitiesPreviewComponent {
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
      title: 'מסיבות והופעות',
      description: 'לילות בלתי נשכחים תחת כוכבי השמיים',
      colorClass: 'from-purple-500-to-pink-500',
      bgClass: 'bg-purple-50'
    },
    {
      icon: 'favorite',
      title: 'יוגה ופילאטיס',
      description: 'התחברו לגוף ולנשמה מול הים',
      colorClass: 'from-green-500-to-emerald-500',
      bgClass: 'bg-green-50'
    },
    {
      icon: 'ac_unit',
      title: 'אמבטיות קרח',
      description: 'חוויה מרעננת לגוף ולנפש',
      colorClass: 'from-cyan-500-to-blue-500',
      bgClass: 'bg-cyan-50'
    },
    {
      icon: 'local_fire_department',
      title: 'סאונה יבשה',
      description: 'רגיעה ופינוק בלב הג\'ונגל',
      colorClass: 'from-orange-500-to-red-500',
      bgClass: 'bg-orange-50'
    },
    {
      icon: 'directions_bike',
      title: 'טיולי אופנועים',
      description: 'חקרו את האי על שני גלגלים',
      colorClass: 'from-yellow-500-to-orange-500',
      bgClass: 'bg-yellow-50'
    },
    {
      icon: 'restaurant',
      title: 'ארוחות שבת',
      description: 'טעם של בית בגן עדן',
      colorClass: 'from-indigo-500-to-purple-500',
      bgClass: 'bg-indigo-50'
    }
  ];
} 