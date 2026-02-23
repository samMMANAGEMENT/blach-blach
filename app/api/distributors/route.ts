import { google } from "googleapis";
import { z } from "zod";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const distributorSchema = z.object({
    name: z.string().min(2, "Nombre requerido"),
    lastName: z.string().min(2, "Apellido requerido"),
    email: z.string().email("Email inválido"),
    phone: z.string().min(7, "Teléfono inválido"),
    city: z.string().min(2, "Ciudad requerida"),
    message: z.string().min(5, "Mensaje demasiado corto"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = distributorSchema.parse(body);

        // 1. Guardar en Base de Datos (Prisma)
        const request = await prisma.distributorRequest.create({
            data: {
                name: validatedData.name,
                lastName: validatedData.lastName,
                email: validatedData.email,
                phone: validatedData.phone,
                city: validatedData.city,
                message: validatedData.message,
            },
        });

        // 2. Guardar en Google Sheets
        const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

        if (spreadsheetId && clientEmail && privateKey) {
            try {
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
                    range: "DISTRIBUIDOR!A:G",
                    valueInputOption: "USER_ENTERED",
                    requestBody: {
                        values: [
                            [
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
                                validatedData.name,
                                validatedData.lastName,
                                validatedData.email,
                                validatedData.phone,
                                validatedData.city,
                                validatedData.message,
                            ],
                        ],
                    },
                });

                // Marcar como sincronizado si tuvo éxito
                await prisma.distributorRequest.update({
                    where: { id: request.id },
                    data: { syncedToSheets: true },
                });
            } catch (sheetError) {
                console.error("Error sincronizando con Google Sheets:", sheetError);
                // No bloqueamos la respuesta al usuario si Sheets falla pero la DB guardó
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            );
        }

        console.error("Error procesando solicitud de distribuidor:", error);
        return NextResponse.json(
            { error: "Error procesando solicitud" },
            { status: 500 }
        );
    }
}
