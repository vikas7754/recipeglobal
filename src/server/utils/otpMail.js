const nodemailer = require("nodemailer");
function generateOTP() {
  let otp = "";
  const digits = "0123456789";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp.toString();
}

const sendOtpForSignup = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true,
    });
    const otp = generateOTP();
    const subject = "OTP for signup";
    const htmlMsg = `
    <p>Dear ${name},</p>
    <p>Thank you for signing up with our service! To complete your registration, please use the following one-time verification code:</p>
    <h2>${otp}</h2>
    <p>This code is valid for 10 minutes. Please enter it on the registration page to verify your email address.</p>
    <p>If you did not sign up for our service, please ignore this email.</p>
    <p>Thank you for choosing our service!</p>
    <p>Best regards,</p>
    <p><a href="https://freecodez.com">freecodez.com</a></p>
    <div><strong>Follow us</strong></div>
    <div>
        <a href="https://www.linkedin.com/in/vikas7754/" >
            <img src="https://res.cloudinary.com/freecodez/image/upload/v1689870470/other/ax0u7qxahfkdhs45q0cz.webp" alt="freecodez.com" width="50px">
        </a>
        <a href="https://www.instagram.com/freecodez_official/" >
            <img src="https://res.cloudinary.com/freecodez/image/upload/v1689870461/other/x3j6br8pbm8t867ohin7.webp" alt="freecodez.com" width="50px">
        </a>
        <a href="https://github.com/vikas7754" >
            <img src="https://res.cloudinary.com/freecodez/image/upload/v1689870448/other/cairmkunedlwanbttu3t.webp" alt="freecodez.com" width="50px">
        </a>
        <a href="https://www.youtube.com/@freecodez" >
            <img src="https://res.cloudinary.com/freecodez/image/upload/v1689870922/other/gecn00l51lscinvjnxcr.webp" alt="freecodez.com" width="50px">
        </a>
    </div>
    `;
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: htmlMsg,
      };
    };
    const info = await transporter.sendMail(options());
    if (info) return otp;
    return false;
  } catch (err) {
    throw err;
  }
};

export default sendOtpForSignup;
