import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

interface KpiMetric {
  title: string;
  value: number;
  change: number;
  icon: string;
  color: string;
  description: string;
}

interface ActivitySubmission {
  id: string;
  formType: 'join-us' | 'register-activity';
  timestamp: Date;
  data: any;
  status: 'new' | 'processed' | 'archived';
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatChipsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  Math = Math;
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  loading = true;
  activeTab = 0;
  skeletonItems = [1, 2, 3, 4];

  kpiMetrics: KpiMetric[] = [];
  recentSubmissions: ActivitySubmission[] = [];
  displayedColumns: string[] = ['id', 'formType', 'timestamp', 'status', 'actions'];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    setTimeout(() => {
      this.kpiMetrics = this.getSampleKpiMetrics();
      this.recentSubmissions = this.getSampleRecentSubmissions();
      this.loading = false;
    }, 1500);
  }

  refreshData() {
    this.loadDashboardData();
    this.snackBar.open('הנתונים עודכנו בהצלחה', 'סגור', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  exportData() {
    this.snackBar.open('מייצא נתונים...', 'סגור', {
      duration: 2000
    });
  }

  getChangeIcon(change: number): string {
    return change > 0 ? 'trending_up' : change < 0 ? 'trending_down' : 'trending_flat';
  }

  getChangeColor(change: number): string {
    return change > 0 ? 'success' : change < 0 ? 'warn' : 'default';
  }

  onTabChange(event: any) {
    this.activeTab = event.index;
  }

  private getSampleKpiMetrics(): KpiMetric[] {
    return [
      {
        title: 'סה"כ חברים',
        value: 1247,
        change: 12.5,
        icon: 'group',
        color: 'primary',
        description: 'חברים רשומים בקהילה'
      },
      {
        title: 'הרשמות פעילות',
        value: 89,
        change: 8.2,
        icon: 'event',
        color: 'accent',
        description: 'הרשמות לפעילויות החודש'
      },
      {
        title: 'הגשות חדשות',
        value: 23,
        change: -3.1,
        icon: 'assignment',
        color: 'warn',
        description: 'הגשות חדשות השבוע'
      },
      {
        title: 'פעילויות פעילות',
        value: 15,
        change: 0,
        icon: 'beach_access',
        color: 'primary',
        description: 'פעילויות פעילות כרגע'
      }
    ];
  }
}

</rewritten_file>