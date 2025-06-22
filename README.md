# Koh Tao Sunflower - Angular Frontend

קהילה ישראלית בקו טאו - פרויקט Angular מקצועי עם מבנה מודולרי

## 🏗️ מבנה הפרויקט

הפרויקט מאורגן בצורה מקצועית עם הפרדה בין קבצי HTML, SCSS ו-TypeScript:

```
src/
├── app/
│   ├── components/          # רכיבים משותפים
│   │   ├── home/           # רכיבי דף הבית
│   │   │   ├── hero-section/
│   │   │   │   ├── hero-section.component.html
│   │   │   │   ├── hero-section.component.scss
│   │   │   │   └── hero-section.component.ts
│   │   │   ├── why-we-are-here/
│   │   │   ├── activities-preview/
│   │   │   └── testimonials-section/
│   │   └── shared/         # רכיבים משותפים
│   │       ├── header/
│   │       │   ├── header.component.html
│   │       │   ├── header.component.scss
│   │       │   └── header.component.ts
│   │       └── footer/
│   │           ├── footer.component.html
│   │           ├── footer.component.scss
│   │           └── footer.component.ts
│   ├── pages/              # דפים ראשיים
│   │   ├── home/
│   │   │   ├── home.component.html
│   │   │   ├── home.component.scss
│   │   │   └── home.component.ts
│   │   ├── join-us/
│   │   └── register/
│   ├── services/           # שירותים
│   ├── models/             # מודלים
│   ├── guards/             # שומרי נתיבים
│   ├── app.component.html
│   ├── app.component.scss
│   └── app.component.ts
├── assets/
├── environments/
└── styles.scss            # סגנונות גלובליים
```

## 🎨 עיצוב מקצועי

### CSS Variables
הפרויקט משתמש במשתני CSS לניהול עקביות בעיצוב:

```scss
:root {
  /* Color Palette */
  --tropical-blue: #00b4d8;
  --jungle-green: #0077b6;
  --deep-blue: #023e8a;
  --sun-yellow: #ffd93d;
  --sunset-orange: #ff6b6b;
  
  /* Typography */
  --font-family-primary: 'Heebo', sans-serif;
  --font-size-base: 1rem;
  
  /* Spacing */
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  
  /* Shadows */
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-normal: 0.3s ease;
}
```

### Utility Classes
מערכת utility classes לשימוש מהיר:

```html
<div class="d-flex justify-center align-center gap-2">
  <button class="btn btn-primary">כפתור ראשי</button>
- **עיצוב טרופי חם ומזמין** - צבעים וסגנון שמשקפים את האווירה של קו טאו
- **תמיכה מלאה בעברית** - כולל כיוון RTL ופונטים עבריים
- **טפסי הרשמה מתקדמים** - הצטרפות לקהילה והרשמה לפעילויות
- **אינטגרציה עם WhatsApp** - קשר מהיר עם הקהילה
- **מסד נתונים MongoDB** - שמירת נתונים מאובטחת
- **שליחת מיילים אוטומטית** - התראות על הרשמות חדשות
- **עיצוב רספונסיבי** - מותאם לכל המכשירים

## 🚀 התקנה והפעלה

### דרישות מקדימות
- Node.js 18+ 
- MongoDB (מקומי או Atlas)
- Gmail account (לשליחת מיילים)

### התקנה

1. **שכפול הפרויקט**
```bash
git clone <repository-url>
cd koh-tao-sunflower-angular
```

2. **התקנת תלויות**
```bash
npm install
```

3. **הגדרת משתני סביבה**
```bash
cp env.example .env
```
עדכנו את הקובץ `.env` עם הפרטים שלכם:
```env
MONGODB_URI=mongodb://localhost:27017/koh-tao-sunflower
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@koh-taosunflower.com
PORT=3000
NODE_ENV=development
WHATSAPP_NUMBER=+66123456789
```

4. **הפעלת השרת**
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## 📁 מבנה הפרויקט

```
koh-tao-sunflower-angular/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── home/           # קומפוננטות עמוד הבית
│   │   │   └── shared/         # קומפוננטות משותפות
│   │   ├── pages/              # עמודי האתר
│   │   ├── services/           # שירותים
│   │   └── models/             # מודלים
│   ├── assets/                 # קבצי מדיה
│   └── styles.scss             # סגנונות גלובליים
├── server/
│   ├── models/                 # מודלי MongoDB
│   ├── routes/                 # נתיבי API
│   └── server.ts               # קובץ השרת הראשי
└── package.json
```

## 🎨 עיצוב וסגנון

### צבעים
- **כחול טרופי**: `#00B4D8`
- **ירוק ג'ונגל**: `#0077B6`
- **זהב חול**: `#F4A261`
- **כתום שקיעה**: `#E76F51`
- **צהוב שמש**: `#FFD60A`

### פונטים
- **Heebo** - פונט עברי מודרני וידידותי

### אנימציות
- Float effects
- Fade-ins
- Hover transitions
- Bounce animations

## 📱 עמודים עיקריים

### 1. עמוד הבית
- Hero section עם רקע דינמי
- סקשן "למה אנחנו כאן?"
- תצוגת פעילויות
- המלצות לקוחות
- Call-to-action

### 2. הצטרפות לקהילה
- טופס הרשמה למתנדבים ועובדים
- בחירת התמחות/כישרון
- פרטי ניסיון וזמינות
- שליחה למייל ומסד נתונים

### 3. הרשמה לפעילויות
- טופס הרשמה ללקוחות
- בחירת פעילויות מרובות
- תאריכים מועדפים
- הערות נוספות

## 🔧 API Endpoints

### Community Members
- `POST /api/community/join` - הצטרפות לקהילה
- `GET /api/community/members` - קבלת רשימת חברים (admin)

### Activity Registrations
- `POST /api/activities/register` - הרשמה לפעילויות
- `GET /api/activities/registrations` - קבלת רשימת הרשמות (admin)

## 📧 שליחת מיילים

המערכת שולחת מיילים אוטומטיים בעברית כאשר:
- מתקבלת הצטרפות חדשה לקהילה
- מתקבלת הרשמה חדשה לפעילויות

### הגדרת Gmail
1. הפעילו Two-Factor Authentication
2. צרו App Password
3. השתמשו ב-App Password בקובץ `.env`

## 🗄️ מסד נתונים

### Collections

#### CommunityMember
```javascript
{
  full_name: String,
  phone: String,
  email: String,
  specialty: String,
  specialty_other: String,
  experience: String,
  availability: String,
  created_at: Date,
  updated_at: Date
}
```

#### ActivityRegistration
```javascript
{
  full_name: String,
  phone: String,
  interests: [String],
  preferred_dates: String,
  additional_notes: String,
  created_at: Date,
  updated_at: Date
}
```

## 🚀 Deployment

### Vercel (מומלץ)
```bash
npm run build
vercel --prod
```

### Heroku
```bash
heroku create
git push heroku main
```

### Docker
```bash
docker build -t koh-tao-sunflower .
docker run -p 3000:3000 koh-tao-sunflower
```

## 🔒 אבטחה

- CORS מוגדר כראוי
- Validation של נתונים
- Sanitization של קלט
- Environment variables מוגנים

## 📞 תמיכה

- **WhatsApp**: +66 123-456-789
- **Email**: admin@koh-taosunflower.com
- **Location**: קו טאו, תאילנד

## 🤝 תרומה לפרויקט

1. Fork את הפרויקט
2. צרו branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit את השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתחו Pull Request

## 📄 רישיון

פרויקט זה מוגן תחת רישיון MIT.

---

**נבנה באהבה לקהילה הישראלית בקו טאו** 🇮🇱❤️🇹🇭 

## API Configuration

This application uses environment-based API configuration instead of proxy settings. The API service is configured to communicate directly with the backend API.

### Environment Setup

The application uses different environment files for development and production:

- **Development**: `src/environments/environment.ts`
- **Production**: `src/environments/environment.prod.ts`

### API Services

The application includes several services for API communication:

1. **ApiService** (`src/app/services/api.service.ts`): Generic HTTP service for all API calls
2. **ActivitiesService** (`src/app/services/activities.service.ts`): Service for activity-related operations
3. **CommunityService** (`src/app/services/community.service.ts`): Service for community-related operations

### Usage Example

```typescript
import { Component } from '@angular/core';
import { ActivitiesService, Activity } from './services/activities.service';

@Component({
  selector: 'app-activities',
  template: '<div>Activities loaded: {{ activities.length }}</div>'
})
export class ActivitiesComponent {
  activities: Activity[] = [];

  constructor(private activitiesService: ActivitiesService) {}

  ngOnInit() {
    this.activitiesService.getActivities().subscribe(
      activities => this.activities = activities,
      error => console.error('Error loading activities:', error)
    );
  }
}
```

### Configuration

To change the API URL for different environments, update the `apiUrl` in the respective environment files:

- **Development**: Update `src/environments/environment.ts`
- **Production**: Update `src/environments/environment.prod.ts`

Make sure your backend API is running and accessible at the configured URL. 