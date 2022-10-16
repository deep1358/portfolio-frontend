module.exports = {
	env: {
		AUTH0_NAMESPACE: process.env.AUTH0_NAMESPACE,
		BASE_URL: process.env.BASE_URL,
	},
	eslint: {
		// Warning: This allows production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
};
