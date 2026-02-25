export function formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

export function getGoogleDriveDirectLink(url: string): string {
    if (!url || !url.includes('drive.google.com')) return url;

    // More robust ID extraction for various Drive link formats
    const idMatch = url.match(/\/d\/([a-zA-Z0-9_-]{25,})/) ||
        url.match(/[?&]id=([a-zA-Z0-9_-]{25,})/) ||
        url.match(/id=([a-zA-Z0-9_-]{25,})/);

    if (idMatch && idMatch[1]) {
        // This format is much more stable for embedding than uc?export=view
        return `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
    }

    return url;
}

export function isGoogleDriveLink(url: string): boolean {
    return !!url && url.includes('drive.google.com');
}
