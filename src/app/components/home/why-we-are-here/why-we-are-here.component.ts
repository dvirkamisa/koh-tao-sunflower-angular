import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-we-are-here',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-we-are-here.component.html',
  styleUrls: ['./why-we-are-here.component.scss']
})
/**
 * Section explaining the community activities.
 */
export class WhyWeAreHereComponent {
  activities = [
    { icon: 'music_note', text: 'מסיבות תחת כוכבים' },
    { icon: 'waves', text: 'יוגה מול הים' },
    { icon: 'landscape', text: 'צלילות באלמוגים' },
    { icon: 'coffee', text: 'הופעות חיות' },
    { icon: 'ac_unit', text: 'אמבטיות קרח' },
    { icon: 'directions_bike', text: 'טיולי אופנועים' }
  ];
} 
