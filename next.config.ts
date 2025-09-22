import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const SBI_EPAY_URL = process.env.NEXT_PUBLIC_SBI_EPAY_URL;

    if (!API_BASE_URL || !SBI_EPAY_URL) {
      console.error(
        "Environment variables are not defined. Check your .env files."
      );
      throw new Error("Missing environment variables");
    }

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self';
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              img-src 'self' data: https:;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' ${API_BASE_URL};
              frame-ancestors 'none';
              base-uri 'self';
              form-action 'self' ${SBI_EPAY_URL};
            `.replace(/\s{2,}/g, " "),
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
