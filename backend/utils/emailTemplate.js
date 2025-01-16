const welcomeVerificationEmailTemplate = (name, otp, url) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <title>Verification Email</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        h3 {
            color: #FF6636;
            text-align:center;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            background-color: #FF6636;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 5px;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        .button:hover {
            background-color: #e55a2f;
            transform: scale(1.05);
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        
        <p>Welcome ${name}. <br>
        Thank you for signing up! Please use the following OTP to verify your account:</p>
        <div class="otp">${otp}</div>
        <p>If you didn't request this verification, please ignore this email.</p>
        <div class="button-container">
            <a href="${url}" class="button">Verify Email</a>
        </div>
        <p>If the button above doesn't work, you can also click on the following link:</p>
        <p><a href="${url}">${url}</a></p>
        <div class="footer">
            <p>&copy; 2024 E-learn. All rights reserved.</p>
            <p>123 Main St, City, State 12345</p>
        </div>
    </div>
</body>
</html>
  `;
};

const resetPasswordEmailTemplate = (name, url) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <title>Password Reset</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        h3 {
            color: #FF6636;
            text-align:center;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            background-color: #FF6636;
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 5px;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        .button:hover {
            background-color: #e55a2f;
            transform: scale(1.05);
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h3>Password Reset Request</h3>
        <p>Hello ${name},</p>
        <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
        <p>To reset your password, click the button below:</p>
        <div class="button-container">
            <a href="${url}" class="button">Reset Password</a>
        </div>
        <p>If the button above doesn't work, you can also click on the following link:</p>
        <p><a href="${url}">${url}</a></p>
        <p>This link will expire in 15 minutes for security reasons.</p>
        <div class="footer">
            <p>&copy; 2024 E-learn. All rights reserved.</p>
            <p>123 Main St, City, State 12345</p>
        </div>
    </div>
</body>
</html>`;
};

const otpResendEmailTemplate = (name, otp) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <title>OTP Resend</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        h3 {
            color: #FF6636;
            text-align:center;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <h3>New OTP Code</h3>
        <p>Hello ${name},</p>
        <p>As requested, here is your new OTP code for verification:</p>
        <div class="otp">${otp}</div>
        <p>This code will expire in 10 minutes. If you didn't request a new OTP, please ignore this email and contact our support team.</p>
        <div class="footer">
            <p>&copy; 2024 E-learn. All rights reserved.</p>
            <p>123 Main St, City, State 12345</p>
        </div>
    </div>
</body>
</html>`;
};

const instructorApprovalEmailTemplate = (name) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <title>Instructor Request Approved</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #33140B;
            margin: 0;
            padding: 0;
            background-color: #FFEEE8;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
            background-color: #FFFFFF;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #FF6636;
            text-align: center;
            margin-bottom: 30px;
        }
        .message {
            background-color: #FFDDD1;
            border-left: 4px solid #FF6636;
            padding: 15px;
            margin-bottom: 20px;
        }
        .cta-button {
            display: block;
            width: 200px;
            margin: 30px auto;
            padding: 12px 24px;
            background-color: #FF6636;
            color: #FFFFFF;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            border-radius: 4px;
            transition: background-color 0.3s ease;
        }
        .cta-button:hover {
            background-color: #CC522B;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #662916;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Congratulations, ${name}!</h1>
        <div class="message">
            <p>Your request to become an instructor has been accepted. We're excited to have you join our teaching community!</p>
        </div>
        <p>To get started, please complete your instructor profile. This will help students learn more about you and your expertise.</p>
        <a href="#" class="cta-button">Complete Your Profile</a>
        <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>
        <p>We look forward to seeing your courses and the value you'll bring to our learning platform!</p>
        <div class="footer">
            <p>&copy; 2024 E-learn. All rights reserved.</p>
            <p>123 Main St, City, State 12345</p>
        </div>
    </div>
</body>
</html>`;
};

const instructorRejectionEmailTemplate = (name) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
    <title>Instructor Application Update</title>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
            color: #33140B;
            margin: 0;
            padding: 0;
            background-color: #FFEEE8;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 40px 20px;
            background-color: #FFFFFF;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #FF6636;
            text-align: center;
            margin-bottom: 30px;
        }
        .message {
            background-color: #FFDDD1;
            border-left: 4px solid #FF6636;
            padding: 15px;
            margin-bottom: 20px;
        }
        .motivation {
            background-color: #FFA386;
            border-radius: 8px;
            padding: 20px;
            margin-top: 30px;
            color: #33140B;
        }
        .cta-button {
            display: block;
            width: 200px;
            margin: 30px auto;
            padding: 12px 24px;
            background-color: #FF6636;
            color: #FFFFFF;
            text-align: center;
            text-decoration: none;
            font-weight: bold;
            border-radius: 4px;
            transition: background-color 0.3s ease;
        }
        .cta-button:hover {
            background-color: #CC522B;
        }
        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 12px;
            color: #662916;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello ${name},</h1>
        <div class="message">
            <p>Thank you for your interest in becoming an instructor on our platform. We appreciate the time and effort you put into your application.</p>
            <p>At this moment, we are unable to move forward with your application. We understand this may be disappointing news, and we want to assure you that this decision was not made lightly.</p>
        </div>
        <p>While we couldn't proceed with your application at this time, we encourage you to continue developing your skills and expertise. The world of online education is constantly evolving, and new opportunities arise regularly.</p>
        <div class="motivation">
            <p><strong>Remember:</strong> Every setback is an opportunity for growth. Your passion for teaching and your subject matter expertise are valuable assets. Keep nurturing them, and don't let this outcome discourage you from pursuing your goals.</p>
        </div>
        <p>We appreciate your understanding and wish you the very best in your future endeavors. If you have any questions or would like feedback on your application, please don't hesitate to reach out to our support team.</p>
        <a href="#" class="cta-button">Contact Support</a>
        <div class="footer">
            <p>&copy; 2024 E-learn. All rights reserved.</p>
            <p>123 Main St, City, State 12345</p>
        </div>
    </div>
</body>
</html>`;
};

export {
  welcomeVerificationEmailTemplate,
  resetPasswordEmailTemplate,
  otpResendEmailTemplate,
  instructorApprovalEmailTemplate,
  instructorRejectionEmailTemplate,
};
