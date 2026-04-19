import "server-only";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

export const resend = apiKey ? new Resend(apiKey) : null;

export const CONTACT_FROM = "Portfolio Contact <onboarding@resend.dev>";
export const CONTACT_TO = "samitesfaye726@gmail.com";
