import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, mobile } = body;

    if (!mobile || typeof mobile !== "string") {
      return NextResponse.json(
        { success: false, error: "Mobile number is required." },
        { status: 400 }
      );
    }

    let cleanPhone = mobile.replace(/[\s\-\+\(\)]/g, "");
    if (cleanPhone.startsWith("91") && cleanPhone.length > 10) {
      cleanPhone = cleanPhone.slice(2);
    }

    if (!/^\d{10}$/.test(cleanPhone)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }

    const userName = name && name.trim() ? name.trim() : "Not provided";
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const emailContent = `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <div style="background: linear-gradient(135deg, #16a34a 0%, #0d9488 100%); padding: 24px; border-radius: 10px 10px 0 0; text-align: center; color: white;">
          <h2 style="margin: 0; font-size: 22px; font-weight: 800;">💬 New WhatsApp Support Lead!</h2>
          <p style="margin: 6px 0 0 0; opacity: 0.9; font-size: 14px;">Floating WhatsApp Widget Lead Submission</p>
        </div>
        <div style="padding: 20px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 10px 10px;">
          <table border="0" cellpadding="10" style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; width: 35%;">User Name</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: 600; color: #0f172a;">${userName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Mobile Number</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: 700; color: #16a34a; font-size: 16px;">
                <a href="tel:+91${cleanPhone}" style="color: #16a34a; text-decoration: none;">+91 ${cleanPhone}</a>
              </td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">WhatsApp Link</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">
                <a href="https://wa.me/91${cleanPhone}" target="_blank" style="color: #25d366; font-weight: bold; text-decoration: underline;">Open Chat on WhatsApp</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">Submitted At</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 13px; color: #64748b;">${timestamp} IST</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center;">
            Sent automatically to <strong>tiwarishubham5332@gmail.com</strong> via EduTrio Platform Floating Support Widget.
          </div>
        </div>
      </div>
    `;

    const hasSmtpConfig = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

    if (!hasSmtpConfig) {
      console.warn("=================================================");
      console.warn("LOGGED WHATSAPP QUICK CONTACT LEAD for tiwarishubham5332@gmail.com:");
      console.log("Name: ", userName);
      console.log("Mobile: ", cleanPhone);
      console.log("Timestamp: ", timestamp);
      console.warn("=================================================");

      return NextResponse.json({
        success: true,
        message: "Lead recorded and notification logged."
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"EduTrio WhatsApp Lead" <${process.env.SMTP_USER}>`,
      to: "tiwarishubham5332@gmail.com",
      subject: `🚨 New WhatsApp Support Lead: ${cleanPhone} (${userName})`,
      html: emailContent,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending quick contact notification:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to record contact lead";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
