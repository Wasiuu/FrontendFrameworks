/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        unoptimized: true, // Wyłączenie optymalizacji obrazów
    },
    async redirects() {
        return [
            {
                source: '/', // Ścieżka początkowa
                destination: '/Home', // Ścieżka docelowa
                permanent: true, // Stałe przekierowanie (kod 308)
            },
        ];
    },
};

export default nextConfig;
