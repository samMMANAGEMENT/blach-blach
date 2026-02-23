import "dotenv/config";
import prisma from "../lib/prisma";
import util from "util";

async function main() {
    try {
        console.log("Testing database connection...");
        const count = await prisma.product.count();
        console.log(`Connection successful. Product count: ${count}`);
    } catch (error) {
        console.error("Database connection failed:");
        console.error(util.inspect(error, { depth: null, colors: true }));
    } finally {
        await (prisma as any).$disconnect?.();
    }
}

main();
