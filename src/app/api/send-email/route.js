import { sendEmail } from "@/lib/sendEmail";


export async function POST(request) {
  const { to, subject, text, html } = await request.json();

  if (!to || !subject || !text || !html) {
    return new Response(
      JSON.stringify({ message: 'Missing required fields' }),
      { status: 400 }
    );
  }

  try {
    await sendEmail(to, subject,  text, html);
    return new Response(
      JSON.stringify({ message: 'Email sent successfully' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: 'Failed to send email' }),
      { status: 500 }
    );
  }
}
