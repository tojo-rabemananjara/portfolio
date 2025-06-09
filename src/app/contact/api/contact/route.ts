import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import twilio from "twilio";

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Send email
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // set in .env.local
      pass: process.env.EMAIL_PASS, // set in .env.local
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "tojorab@gmail.com",
    subject: `Portfolio Contact: ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${
      phone || "N/A"
    }\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }

  // Send SMS if phone is provided
  if (phone) {
    const twilioClient = twilio(
      process.env.TWILIO_SID,
      process.env.TWILIO_AUTH_TOKEN
    );
    try {
      await twilioClient.messages.create({
        body: `Portfolio Contact from ${name} (${email}): ${message}`,
        from: process.env.TWILIO_PHONE, // your Twilio number
        to: "+12406606468", // your number
      });
    } catch {
      return NextResponse.json(
        { error: "Failed to send SMS" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true });
}
