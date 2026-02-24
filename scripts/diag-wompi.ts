import { generateWompiSignature } from '../lib/wompi';
import * as dotenv from 'dotenv';
dotenv.config();

async function test() {
    console.log("Environment Variables:");
    console.log("WOMPI_PUBLIC_KEY:", process.env.WOMPI_PUBLIC_KEY);
    console.log("WOMPI_INTEGRITY_SECRET:", process.env.WOMPI_INTEGRITY_SECRET ? "CONFIGURED (starts with " + process.env.WOMPI_INTEGRITY_SECRET.substring(0, 5) + ")" : "MISSING");

    const reference = "test-ref-" + Date.now();
    const amount = 29000;
    const currency = "COP";

    try {
        const sig = await generateWompiSignature(reference, amount, currency);
        console.log("\nSample calculation:");
        console.log("Ref:", reference);
        console.log("Amount:", amount);
        console.log("Signature:", sig);
    } catch (e: any) {
        console.error("Error:", e.message);
    }
}

test();
