# Guía de Despliegue a Producción - Blach Blach E-commerce

Esta guía detalla los pasos necesarios para desplegar la tienda y asegurar que la integración con **Wompi** y la base de datos funcionen correctamente.

---

## 1. Requisitos Previos
*   Cuenta en **Vercel** (Recomendado para Next.js) o plataforma similar.
*   Base de datos **PostgreSQL** (Ej: Neon.tech, AWS RDS).
*   Cuenta de comercio en **Wompi** aprobada para Producción.

## 2. Configuración de Variables de Entorno (.env)
En tu plataforma de despliegue, configura las siguientes variables con sus valores de producción:

### Base de Datos
*   `DATABASE_URL`: URL secreta de tu base de datos PostgreSQL.

### Autenticación
*   `AUTH_SECRET`: Genera una cadena aleatoria segura (mínimo 32 caracteres).

### Wompi (Producción)
*   `WOMPI_PUBLIC_KEY`: Comienza con `pub_prod_...`
*   `WOMPI_PRIVATE_KEY`: Comienza con `prv_prod_...`
*   `WOMPI_INTEGRITY_SECRET`: Se encuentra en "Secretos para integración técnica". Es VITAL para que los pagos funcionen.
*   `WOMPI_EVENTS_SECRET`: Para validar las notificaciones automáticas (Webhooks).

---

## 3. Automatización de Prisma
He configurado un script de `postinstall` en el `package.json`. Esto significa que cada vez que instales dependencias (`npm install` o `pnpm install`), Prisma generará el cliente automáticamente. Esto evita el error común: 
> *Type error: Module '"@prisma/client"' has no exported member 'PrismaClient'*

---

## 4. Configuración en el Dashboard de Wompi
Para que los pagos sean aceptados y procesados, debes configurar tu cuenta de Wompi así:

### A. Whitelist de Dominios
1.  Ve a **Desarrolladores > Configuración**.
2.  Agrega el dominio de tu tienda (ej: `https://blach-blach.com`) a la lista de dominios permitidos.
3.  **Nota**: Wompi en producción RECHAZA peticiones desde `localhost`.

### B. URL de Eventos (Webhooks)
Para que el sistema sepa que una orden fue pagada automáticamente:
1.  En la misma sección de configuración, busca **URL de Eventos**.
2.  Ingresa: `https://tu-dominio.com/api/payments/wompi`
3.  Asegúrate de que el método sea `POST`.

---

## 4. Pasos para el Despliegue

### Paso 1: Inicializar Base de Datos
Asegúrate de ejecutar las migraciones de Prisma hacia la base de datos de producción:
```bash
npx prisma migrate deploy
```

### Paso 2: Generar Prisma Client
```bash
npx prisma generate
```

### Paso 3: Build de la Aplicación
```bash
npm run build
```

---

## 5. Checklist de Verificación Post-Despliegue
Una vez el sitio esté al aire:
1.  **Test de Compra**: Realiza una compra pequeña con una tarjeta real.
2.  **Redirección de Regreso**: Confirma que después del pago, Wompi te regrese a la página de éxito (`/checkout/success`).
3.  **Actualización de Orden**: Entra a tu base de datos o panel de administración y verifica que el estado de la orden haya cambiado de `PENDING` a `PAID` (esto confirma que el Webhook funciona).
4.  **SSL**: Asegúrate de que tu sitio use `https://`. Wompi no procesará pagos en `http://`.

## 6. Resolución de Problemas Comunes
*   **Error 403 Forbidden**: Suele ser por el `Integrity Secret` incorrecto o por intentar usar el checkout desde una URL no registrada en el Dashboard de Wompi.
*   **La orden no cambia a PAID**: El Webhook está fallando. Verifica que la `URL de Eventos` en Wompi sea accesible públicamente.
