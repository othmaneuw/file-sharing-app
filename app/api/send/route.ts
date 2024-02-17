import { EmailTemplate } from '../../_components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const responce = await req.json();
  try {
    const data = await resend.emails.send({
      from: 'othmane@resend.dev',
      to: ['elkhemmarothmane@gmail.com'],
      subject: responce?.fullName + " Shared a file with you",
      react: EmailTemplate({ responce }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
