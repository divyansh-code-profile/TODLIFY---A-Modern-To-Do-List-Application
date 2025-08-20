# TODLIFY - A Modern To-Do List Application

TODLIFY is a full-stack MERN (MongoDB, Express, React, Node.js) application designed to help you manage your tasks efficiently. It features a secure user authentication system, a clean and modern user interface, and an automated email reminder system for high-priority tasks.

---

##  Features

- **Secure User Authentication**: Sign up and log in with JWT (JSON Web Token) based authentication. Passwords are securely hashed using `bcrypt`.
- **Full CRUD Functionality**: Create, Read, Update, and Delete your to-do tasks.
- **Task Prioritization**: Assign priorities (Normal, Urgent, Critical) to your tasks.
- **Status Tracking**: Keep track of task status (New, In Progress, On Hold, Completed).
- **Automated Email Reminders**: Receive email notifications for 'Urgent' and 'Critical' tasks via a scalable `node-cron` scheduler.
- **Responsive Design**: A modern, dark-themed UI that works beautifully on both desktop and mobile devices.
- **Task Filtering**: The UI automatically categorizes tasks into "Today," "Tomorrow," and "Upcoming" for better organization.

---

##  Tech Stack

- **Frontend**: React, React Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JSON Web Tokens (JWT), bcrypt
- **Emailing**: Nodemailer
- **Scheduling**: node-cron

---

##  Getting Started on Windows

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your Windows PC:

1.  **Node.js and npm**: Required to run both the frontend and backend. Download it from [nodejs.org](https://nodejs.org/) (LTS version is recommended).
2.  **Git**: For cloning the repository. Download it from [git-scm.com](https://git-scm.com/).
3.  **MongoDB**: You have two options:
    - **(Recommended)** **MongoDB Atlas**: A free, cloud-based database. This is the easiest way to get started. [Sign up here](https://www.mongodb.com/cloud/atlas/register).
    - **(Advanced)** **MongoDB Community Server**: A local installation. [Download and install for Windows](https://www.mongodb.com/try/download/community).

### Installation & Setup Guide

#### 1. Clone the Repository

First, open a terminal (like Command Prompt, PowerShell, or Git Bash) and clone the project to your local machine.

git clone <your-repository-url>
cd <your-project-folder>

#### 2. Backend Setup (`api` directory)

The backend server connects to the database and provides the API for the frontend.

**A. Navigate to the API directory:**

cd api

**B. Create the Environment File (`.env`)**

This file will store all your secret keys and credentials. Create a new file named `.env` in the `api` folder.

> **Tip:** In Windows Explorer, you might need to go to `View` and check `File name extensions` to ensure you don't accidentally name it `.env.txt`.

Copy the content below into your new `.env` file and replace the placeholder values with your actual credentials.

# MongoDB Connection String (Instructions below)
MONGO_URI="mongodb+srv://<user>:<password>@cluster.mongodb.net/yourDatabaseName"

# JSON Web Token Secret (Use a long, random string)
JWT_SECRET="YOUR_SUPER_SECRET_JWT_KEY_GOES_HERE"

# Nodemailer Email Credentials (Instructions below)
MAIL_USER="your-email@gmail.com"
MAIL_PASS="your-google-app-password"

- **How to get your `MONGO_URI`**:
  - Log in to your MongoDB Atlas account.
  - Create a new project and a new cluster (the free M0 tier is sufficient).
  - Under "Database Access," create a new database user with a username and password.
  - Under "Network Access," add your current IP address to the access list (Atlas can do this automatically).
  - Go to your cluster's "Overview," click "Connect," select "Drivers," and copy the connection string provided. Replace `<username>`, `<password>`, and `yourDatabaseName` with your details.

- **How to get your `MAIL_PASS` (Google App Password)**:
  - Go to your Google Account settings -> Security.
  - Ensure 2-Step Verification is **ON**.
  - In the "Signing in to Google" section, click on "App passwords".
  - Select "Mail" for the app and "Windows Computer" for the device, then click "Generate".
  - Copy the 16-character password it gives you. This is your `MAIL_PASS`. Do **not** use your regular Gmail password.

**C. Install Dependencies**

Run the following command in the `api` directory to install all the necessary packages.

npm install

**D. Run the Backend Server**

Now, start the server. It will automatically connect to your database and start the reminder service.

npm run dev

You should see messages like " Successfully connected to the database." and "🚀 Server is running on port 3001" in your terminal.

**Leave this terminal window running!**

---

#### 3. Frontend Setup (`TodoUsingReact` directory)

The frontend is the user interface you'll interact with in your browser.

**A. Open a New Terminal**

This is important! Do not close your backend terminal. Open a **second, separate terminal window**.

**B. Navigate to the Frontend Directory**

From your project's root folder, navigate into the `TodoUsingReact` directory.

cd TodoUsingReact

**C. Install Dependencies**

Just like with the backend, install all the necessary packages for the React app.

npm install

**D. Run the Frontend App**

Start the React development server.

npm start

This will automatically open a new tab in your default web browser pointed to `http://localhost:3000`.

---

### You're All Set!

The application should now be running. The React frontend at `localhost:3000` will communicate with the Node.js backend API at `localhost:3001`. You can now sign up for an account and start managing your tasks.


### Available Scripts

#### Backend (`api` folder)

- `npm run dev`: Starts the server using `nodemon` for automatic restarts during development.
- `npm start`: Starts the server in production mode.

#### Frontend (`TodoUsingReact` folder)

- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm test`: Launches the test runner.
