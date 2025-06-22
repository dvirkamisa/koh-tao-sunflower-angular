import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss']
})
/**
 * Displays the landing hero section on the home page.
 */
export class HeroSectionComponent {}
