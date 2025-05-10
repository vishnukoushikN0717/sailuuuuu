# Video Message Feature

The SAILUUU app includes a feature to record and schedule video messages to be sent via email at a specific date and time.

## How It Works

1. **Record a Video**: 
   - Click "Enable Camera" to access your device's camera and microphone
   - Click "Start Recording" to begin recording your message
   - Use "Pause" and "Resume" as needed
   - Click "Stop" when you're done
   - You can preview your recording and re-record if needed

2. **Schedule Delivery**:
   - Enter the recipient's email address
   - Select the date and time for delivery
   - Add a subject and optional message
   - Click "Schedule Message"

3. **Track Your Messages**:
   - View all your scheduled messages in the "Your Scheduled Messages" section
   - Messages will show as "Pending" until the scheduled time
   - Once delivered, they will be marked as "Delivered"
   - You can cancel pending messages if needed

## Setup Requirements

This feature requires both the frontend and backend to be running:

1. **Frontend**: The Next.js application (this project)
2. **Backend**: The Node.js server in the `/backend` directory

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd ../backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure email settings in `.env` file:
   - Copy `.env.example` to `.env`
   - Update with your email credentials (see backend README for details)

4. Start the backend server:
   ```
   npm start
   ```

### Email Configuration

For the email delivery to work, you need to configure a valid email account in the backend `.env` file. For Gmail:

1. Use a Gmail account
2. Enable 2-Step Verification in your Google Account
3. Generate an App Password (Google Account > Security > App Passwords)
4. Use this App Password in your `.env` file

## Troubleshooting

- **Camera not working**: Make sure your browser has permission to access your camera and microphone
- **Video not sending**: Check that the backend server is running and email credentials are correct
- **Scheduled messages not appearing**: Verify the connection between frontend and backend
