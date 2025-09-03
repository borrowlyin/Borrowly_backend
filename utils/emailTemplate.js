function otpEmailTemplate(otp) {
  return `
  <div style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <div style="background: linear-gradient(to right, #1E6592, #001F47); padding: 35px 20px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 36px; font-weight: 700; letter-spacing: 2px;">
        Borrowly
      </h1>
    </div>

    <!-- Body -->
    <div style="padding: 25px; color: #333; line-height: 1.6;">
      <p style="font-size: 16px; margin: 0;">Hi Admin👋,</p>
      <p style="font-size: 16px; margin: 10px 0;">
        We received a request to reset your password for <strong>Borrowly</strong>.
      </p>
      
      <!-- OTP Highlight Box -->
      <div style="background: #f4fdfd; border: 2px dashed #1E6592; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0;">
        <p style="margin: 0; font-size: 14px; color: #555;">Your One-Time Password (OTP):</p>
        <h1 style="margin: 10px 0; font-size: 38px; letter-spacing: 8px; color: #1E6592; font-weight: 800;">
          ${otp}
        </h1>
      </div>

      <p style="font-size: 15px; margin: 15px 0; color: #444;">
        This OTP will expire in <b>5 minutes</b>. Please do not share it with anyone.
      </p>

      <p style="font-size: 14px; color: #777; margin-top: 30px;">
        If you did not request this, you can safely ignore this email.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #fafafa; padding: 15px; text-align: center; font-size: 12px; color: #888;">
      <p style="margin: 0;">© ${new Date().getFullYear()} Borrowly. All rights reserved.</p>
    </div>
  </div>
  `;
}

module.exports = otpEmailTemplate;
