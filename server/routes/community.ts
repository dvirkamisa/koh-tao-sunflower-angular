import express from 'express';
/**
 * Routes for community membership and management.
 */
import CommunityMember from '../models/CommunityMember';
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

// Submit community member application
router.post('/join', async (req, res) => {
  try {
    const { full_name, phone, email, specialty, specialty_other, experience, availability } = req.body;

    // Create new community member
    const member = new CommunityMember({
      full_name,
      phone,
      email,
      specialty,
      specialty_other,
      experience,
      availability
    });

    await member.save();

    // Send email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: 'הצטרפות חדשה לקהילה - Koh Tao Sunflower',
      html: `
        <div dir="rtl" style="font-family: 'Heebo', sans-serif;">
          <h2>הצטרפות חדשה לקהילה! 🎉</h2>
          <p><strong>שם:</strong> ${full_name}</p>
          <p><strong>טלפון:</strong> ${phone}</p>
          <p><strong>אימייל:</strong> ${email || 'לא צוין'}</p>
          <p><strong>התמחות:</strong> ${specialty}</p>
          ${specialty_other ? `<p><strong>פירוט נוסף:</strong> ${specialty_other}</p>` : ''}
          ${experience ? `<p><strong>ניסיון:</strong> ${experience}</p>` : ''}
          ${availability ? `<p><strong>זמינות:</strong> ${availability}</p>` : ''}
          <br>
          <p>תאריך הגשה: ${new Date().toLocaleString('he-IL')}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({
      success: true,
      message: 'הבקשה נשלחה בהצלחה!'
    });

  } catch (error) {
    console.error('Error submitting community member application:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בשליחת הבקשה'
    });
  }
});

// Get all community members (admin only)
router.get('/members', async (req, res) => {
  try {
    const members = await CommunityMember.find().sort({ created_at: -1 });
    res.json({
      success: true,
      data: members
    });
  } catch (error) {
    console.error('Error fetching community members:', error);
    res.status(500).json({
      success: false,
      message: 'שגיאה בטעינת הנתונים'
    });
  }
});

export default router; 
