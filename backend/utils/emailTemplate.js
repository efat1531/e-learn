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

export { welcomeVerificationEmailTemplate };
