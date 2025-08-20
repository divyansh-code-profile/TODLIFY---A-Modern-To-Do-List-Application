const cron = require("node-cron");
const Todo = require("./models/Todo");
const sendReminder = require("./reminder");

/**
 * Initializes the cron job to send reminders for high-priority tasks.
 * This single cron job runs every minute, checks for all relevant tasks,
 * and sends reminders, which is much more efficient than one job per user.
 */
const initializeReminderScheduler = () => {
  console.log("Cron job for reminders initialized. Will run every minute.");

  // Schedule a task to run every minute.
  cron.schedule("* * * * *", async () => {
    console.log("Running scheduled task check for reminders...");
    const now = new Date();

    try {
      // Find tasks that are 'Critical' or 'Urgent' and not completed.
      const highPriorityTasks = await Todo.find({
        priority: { $in: ["Critical", "Urgent"] },
        status: { $ne: "Completed" }, // $ne means "not equal"
        email: { $ne: null }, // Ensure there's an email to send to
      });

      if (highPriorityTasks.length === 0) {
        console.log("No high-priority tasks found needing reminders right now.");
        return;
      }

      console.log(`Found ${highPriorityTasks.length} high-priority tasks to remind.`);

      // Send a reminder for each task found.
      for (const task of highPriorityTasks) {
        // Simple logic: send reminder every time the cron job runs for these tasks.
        // More complex logic could be added here (e.g., check last reminder time).
        await sendReminder(task.priority, task.title, task.email);
      }
    } catch (error) {
      console.error("Error fetching or sending high-priority reminders:", error);
    }
  });
};

module.exports = initializeReminderScheduler;