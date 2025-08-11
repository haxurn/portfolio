import nodemailer from "nodemailer"

// Email configuration
export const emailConfig = {
  recipient: "samitesfaye726@gmail.com",
}

// Create a transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com", // Will be replaced with environment variable
    pass: process.env.EMAIL_PASS || "your-app-password", // Will be replaced with environment variable
  },
})

// Email sending function
export async function sendEmail({
  name,
  email,
  message,
}: {
  name: string
  email: string
  message: string
}) {
  try {
    // Email content
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER || "your-email@gmail.com"}>`,
      to: emailConfig.recipient,
      subject: `Portfolio Contact from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #10b981; border-bottom: 1px solid #10b981; padding-bottom: 10px;">New Contact Form Submission</h2>
  
  <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
  </div>
  
  <div style="margin-top: 20px;">
    <h3 style="color: #10b981;">Message:</h3>
    <p style="white-space: pre-line; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">${message}</p>
  </div>
  
  <div style="margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 10px;">
    <p>This email was sent from your portfolio website contact form.</p>
  </div>
</div>
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: (error as Error).message }
  }
}
