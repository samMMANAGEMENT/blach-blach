import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('--- Generando Orden de Prueba ---');

    // Fetch a product to link
    const product = await prisma.product.findFirst();
    if (!product) {
        console.error('No se encontraron productos en la base de datos. Por favor corre el seed primero.');
        return;
    }

    const order = await prisma.order.create({
        data: {
            customerName: "Usuario de Prueba",
            email: "test@example.com",
            phone: "3001234567",
            city: "Bogotá",
            address: "Calle de prueba #123",
            total: product.price,
            status: "PENDING",
            items: {
                create: [
                    {
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        option: product.options[0] || "Default"
                    }
                ]
            }
        },
        include: {
            items: true
        }
    });

    console.log('✅ Orden creada con éxito:');
    console.log(`ID: ${order.id}`);
    console.log(`Cliente: ${order.customerName}`);
    console.log(`Total: ${order.total}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
