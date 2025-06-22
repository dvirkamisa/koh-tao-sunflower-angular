import express from 'express';
/**
 * Routes for activity registration and retrieval.
 */
import ActivityRegistration from '../models/ActivityRegistration';
import nodemailer from 'nodemailer';

const router = express.Router();

// Email transporter configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Submit activity registration
router.post('/register', async (req, res) => {
  try {
    const { full_name, phone, interests, preferred_dates, additional_notes } = req.body;

    // Create new activity registration
    const registration = new ActivityRegistration({
      full_name,
      phone,
      interests,
      preferred_dates,
      additional_notes
    });

    await registration.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'הרשמה חדשה לפעילויות - Koh Tao Sunflower',
      html: `
        <div dir="rtl" style="font-family: 'Heebo', sans-serif;">
          <h2>הרשמה חדשה לפעילויות! 🎉</h2>
          <p><strong>שם:</strong> ${full_name}</p>
          <p><strong>טלפון:</strong> ${phone}</p>
          <p><strong>פעילויות מעניינות:</strong></p>
          <ul>
            ${interests.map(interest => `<li>${getActivityName(interest)}</li>`).join('')}
          </ul>
          ${preferred_dates ? `<p><strong>תאריכים מועדפים:</strong> ${preferred_dates}</p>` : ''}
          ${additional_notes ? `<p><strong>הערות נוספות:</strong> ${additional_notes}</p>` : ''}
          <br>
          <p>תאריך הגשה: ${new Date().toLocaleString('he-IL')}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: 'ההרשמה נשלחה בהצלחה!'
    });

  } catch (error) {
    console.error('Error submitting activity registration:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בשליחת ההרשמה'
    });
  }
});

// Get all activity registrations (admin only)
router.get('/registrations', async (req, res) => {
  try {
    const registrations = await ActivityRegistration.find().sort({ created_at: -1 });
    res.json({
      success: true,
      data: registrations
    });
  } catch (error) {
    console.error('Error fetching activity registrations:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בטעינת הנתונים'
    });
  }
});

// Helper function to get activity name in Hebrew
function getActivityName(activityId: string): string {
  const activities: { [key: string]: string } = {
    'diving': 'צלילות',
    'parties_shows': 'מסיבות והופעות',
    'yoga_pilates': 'יוגה ופילאטיס',
    'ice_baths': 'אמבטיות קרח',
    'dry_sauna': 'סאונה יבשה',
    'motorcycle_trips': 'טיולי אופנועים',
    'shabbat_dinners': 'ארוחות שבת',
    'other': 'אחר'
  };
  return activities[activityId] || activityId;
}

export default router; 
