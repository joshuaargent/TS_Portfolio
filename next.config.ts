import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.ytimg.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "yt3.ggpht.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				pathname: "/**",
			},
		],
	},

	// Enable experimental features
	experimental: {
		optimizePackageImports: ["lucide-react", "framer-motion", "date-fns"],
	},

	// Headers for security and caching
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
				],
			},
			{
				source: "/fonts/(.*)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
		];
	},
};

export default nextConfig;
