import { EmailTemplate } from '@/components/ui/email';
import { Resend } from 'resend';

// Resend API key from the environment variables in .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

// API to send an email with the receipt to the user
export async function POST({ email, services, first_name }) {

    // Send the email using the Resend API client
    try {

        // Send the email using the Resend API client and the EmailTemplate component
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Your Receipt',
            react: EmailTemplate({
                firstName: first_name,
                email: email,
                services: services
            }),
        });

        // If there is an error, return the error
        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
