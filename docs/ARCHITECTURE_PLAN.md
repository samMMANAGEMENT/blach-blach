# Plan de Arquitectura y Escalabilidad: Blach Blach E-commerce

Este documento detalla la implementación técnica utilizando la **Opción A (Next.js Fullstack)**, integrando automatización con Google Sheets y la pasarela de pagos Wompi.

## 1. Stack Tecnológico (Propuesta A+)

*   **Framework**: Next.js 15+ (App Router).
*   **Base de Datos**: PostgreSQL (vía Supabase o Neon) para el core del negocio.
*   **ORM**: Prisma (para tipado fuerte de productos y pedidos).
*   **Gestión de Formularios**: `react-hook-form` + `zod` (para validaciones rigurosas).
*   **Backend Automations**: Google Sheets API (vía librerías oficiales de Google).
*   **Pagos**: Wompi Widget/API (Checkout dinámico).

---

## 2. Flujo de Datos: Solicitud Distribuidor & Newsletter

Para asegurar que no se pierda ninguna oportunidad de negocio, implementaremos un flujo híbrido: **Base de Datos (Backup) + Google Sheets (Operativo User-friendly)**.

### Proceso Técnico:
1.  **Frontend**: El usuario envía el formulario.
2.  **API Route (`/api/distributors`)**:
    *   Valida los datos con Zod.
    *   **Paso 1**: Guarda en PostgreSQL para histórico y CRM interno.
    *   **Paso 2**: Envía una fila a Google Sheets mediante un Service Account.
    *   **Paso 3**: Dispara un email de notificación (vía Resend o SendGrid).
3.  **Google Sheets**: El equipo comercial de Blach Blach recibe la información en tiempo real sin entrar al sistema técnico.

---

## 3. Integración Wompi (Pasarela de Pagos)

Wompi es ideal para el mercado colombiano por su facilidad de integración y soporte de PSE, Tarjetas y Nequi.

### Estrategia de Implementación:
*   **Checkout Sync**: Al hacer clic en "Pagar", el backend de Next.js genera una **Integridad de Firma** (Signature) para evitar fraudes.
*   **Wompi Widget**: Invocamos el modal de pago directamente en el frontend para una experiencia fluida.
*   **Webhooks**: Creamos un endpoint (`/api/webhooks/wompi`) que escucha el resultado del pago:
    *   **Aprobado**: Actualiza el stock del producto y marca el pedido como "Listo para despacho".
    *   **Rechazado**: Notifica al usuario y permite re-intentar.

---

## 4. Estructura de Base de Datos (Clave para Escalabilidad)

```prisma
// Esquema conceptual para Prisma

model Product {
  id              String   @id @default(cuid())
  name            String
  price           Float
  stock           Int
  options         Option[] // 120ml, 250ml, etc.
  specs           Json     // Detalles técnicos dinámicos
  images          Image[]
  orders          OrderItem[]
}

model Order {
  id              String   @id @default(cuid())
  customerName    String
  email           String
  total           Float
  status          String   // PENDING, APPROVED, SHIPPED
  wompiId         String?  @unique
  items           OrderItem[]
  createdAt       DateTime @default(now())
}

model DistributorRequest {
  id              String   @id @default(cuid())
  name            String
  email           String
  phone           String
  city            String
  message         String
  syncedToSheets  Boolean  @default(false)
}
```

---

## 5. Hoja de Ruta (Roadmap)

### Fase 1: Infraestructura Base
*   Configuración de **Prisma** y conexión a base de datos en la nube.
*   Creación de las rutas de API estandarizadas con manejo de errores premium.

### Fase 2: Automatización
*   Integración de **Google Sheets SDK**.
*   Configuración de credenciales de Google Cloud Console.

### Fase 3: E-commerce Core
*   Sustituir el archivo `content.ts` por llamadas a la API de productos.
*   Implementación de lógica de stock y variantes.

### Fase 4: Checkout y Wompi
*   Generación de transacciones en backend.
*   Integración del Widget de pagos.
*   Lógica de Post-venta (Emails y confirmaciones).

---

## 6. Por qué esta opción es la mejor
1.  **Indexación Máxima**: Los productos se cargan desde el servidor, lo que significa que aparecerán en los primeros resultados de Google.
2.  **Costo Eficiente**: Puedes empezar con el tier gratuito de Supabase, Neon y Vercel.
3.  **Seguridad**: Toda la lógica de precios y firmas de pago ocurre en el servidor, no en el navegador del cliente.
