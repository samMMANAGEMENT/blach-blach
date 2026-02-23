import { google } from "googleapis";
import { z } from "zod";
import { NextResponse } from "next/server";

const newsletterSchema = z.object({
    email: z.string().email("Email inválido"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email } = newsletterSchema.parse(body);

        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

        if (!spreadsheetId || !clientEmail || !privateKey) {
            console.error("Faltan variables de entorno de Google Sheets");
            return NextResponse.json(
                { error: "Error de configuración del servidor" },
                { status: 500 }
            );
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: "BOLETIN!A:B",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[
                    new Intl.DateTimeFormat('es-CO', {
                        timeZone: 'America/Bogota',
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    }).format(new Date()),
                    email
                ]],
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }

        console.error("Error guardando en Google Sheets:", error);
        return NextResponse.json(
            { error: "Error guardando en Google Sheets" },
            { status: 500 }
        );
    }
}
