import crypto from 'node:crypto';

/**
 * Generates the integrity signature for Wompi transactions
 * Formula: SHA256(reference + amountInCents + currency + integritySecret)
 */
export async function generateWompiSignature(reference: string, amount: number, currency: string = "COP") {
    // Ensure amount is integer cents (35000 -> 3500000)
    // Math.round to avoid floating point issues (e.g. 15.99 * 100 can be 1598.999...)
    const amountInCents = Math.round(amount * 100);
    const secret = process.env.WOMPI_INTEGRITY_SECRET?.trim();

    if (!secret) {
        throw new Error("WOMPI_INTEGRITY_SECRET is not configured");
    }

    const chain = `${reference}${amountInCents}${currency}${secret}`;
    const hash = crypto.createHash('sha256').update(chain).digest('hex');

    console.log("--- WOMPI SIGNATURE GENERATION ---");
    console.log("Reference:", reference);
    console.log("Amount (original):", amount);
    console.log("Amount In Cents:", amountInCents);
    console.log("Currency:", currency);
    console.log("Secret present:", !!secret);
    console.log("Secret length:", secret?.length);
    console.log("Chain:", chain);
    console.log("Generated Hash:", hash);
    console.log("---------------------------------");

    return hash;
}
