import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

export const dynamic = "force-dynamic"; // defaults to auto

export async function POST(request: Request) {
  try {
    const account = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_Password,
      },
    });
    await account.verify();

    const { data, senderEmail } = await request.json();
    const sendToSender = await account.sendMail({
      from: process.env.EMAIL,
      to: senderEmail,
      html: `<h1>This is testing 2</h1>`,
    });
    const sendToSelf = await account.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      html: `<h1>This is testing 2</h1>`,
    });
    return NextResponse.json({
      message: "Check your email inbox!",
      ServerMessage: {
        sendToSender: sendToSender.response,
        sendToSelf: sendToSelf.response,
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: e.message,
      },
      {
        status: 500,
      }
    );
  }
}
