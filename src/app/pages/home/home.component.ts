import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeroSectionComponent } from '../../components/home/hero-section/hero-section.component';
import { WhyWeAreHereComponent } from '../../components/home/why-we-are-here/why-we-are-here.component';
import { ActivitiesPreviewComponent } from '../../components/home/activities-preview/activities-preview.component';
import { TestimonialsSectionComponent } from '../../components/home/testimonials-section/testimonials-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    HeroSectionComponent,
    WhyWeAreHereComponent,
    ActivitiesPreviewComponent,
    TestimonialsSectionComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // Clean component without debug functionality
} 