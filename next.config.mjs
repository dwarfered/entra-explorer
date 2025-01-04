/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // static site or Single-Page Application (SPA),
    images: { unoptimized: true },
    reactStrictMode: false, // https://github.com/microsoft/fluentui/issues/31930
};

export default nextConfig;
