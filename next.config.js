/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
		APIURL: "http://18.185.113.237:4000",
	},
};

module.exports = nextConfig;
