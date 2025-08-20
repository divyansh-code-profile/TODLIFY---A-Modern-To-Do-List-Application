const nodemailer = require("nodemailer");

// Create a reusable transporter object using environment variables
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER, // Your email from .env file
    pass: process.env.MAIL_PASS, // Your Google App Password from .env file
  },
});

/**
 * Sends a reminder email for a specific to-do item.
 * @param {string} priority - The priority of the task (e.g., 'Critical', 'Urgent').
 * @param {string} title - The title of the task.
 * @param {string} recipientEmail - The email address of the user to notify.
 */
const sendReminder = async (priority, title, recipientEmail) => {
  const mailOptions = {
    from: `"TODLIFY Reminder" <${process.env.MAIL_USER}>`,
    to: recipientEmail,
    subject: `🔔${priority} Priority Task Reminder: ${title}`,
    text: `This is a friendly reminder for your ${priority.toLowerCase()} priority task: "${title}".`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Task Reminder</h2>
        <p>This is a friendly reminder for the following task:</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p>Please review your task list for more details.</p>
        <hr>
        <p><small>This is an automated notification from TODLIFY.</small></p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully to ${recipientEmail}! Message ID: ${info.messageId}`);
  } catch (error) {
    console.error(`Error sending email to ${recipientEmail}:`, error);
  }
};

module.exports = sendReminder;