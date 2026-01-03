import { serverConfig } from "../config";
import transporter from "../config/mailer.config";
import logger from "../config/logger.config";

export async function sendEmail(to: string, subject: string, body: string) {
    try {
        await transporter.sendMail({
            from: serverConfig.MAIL_USER,
            to,
            subject,
            html: body
        });
        logger.info(`Email sent to ${to} with subject ${subject}`);
    } catch (error: any) {
        throw new Error(`Fail to send email to ${to}: ${error?.message || error}`);
    }
}
