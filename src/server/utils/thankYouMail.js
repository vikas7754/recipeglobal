import nodemailer from "nodemailer";
const sendThankYouMail = async (email, name) => {
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
    const subject = "Thank You for Signing Up";
    const htmlMsg = `
    <p>Dear ${name},</p>
    <p>We would like to take a moment to thank you for registering with our service. We are excited to have you onboard and look forward to providing you with the best experience possible.</p>
    <p>Your account has been created successfully, and you can now log in using your registered email and password. Please keep your login credentials safe and secure.</p>
    <p>If you have any questions or issues with our service, please do not hesitate to contact us at <a href="https://freecodez.com/contact">contact us</a>. Our team will be happy to assist you.</p>
    <p>Thank you again for choosing our service. We hope you enjoy using it!</p>
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
    <p><a href="https://freecodez.com"><img src="https://res.cloudinary.com/freecodez/image/upload/v1689878695/other/oi96ofrd2nglit5vqlom.webp" style="width: 100%;" alt="Freecodez"/></a></p>
    `;
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: htmlMsg,
      };
    };
    await transporter.sendMail(options());
  } catch (err) {
    throw err;
  }
};

export default sendThankYouMail;
