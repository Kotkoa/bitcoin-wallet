/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    // Enable WebAssembly if it's not the server
    if (!isServer) {
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
        layers: true,
      };
    }

    // Find and modify the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.toString().includes('svg')
    );

    if (fileLoaderRule) {
      // Exclude SVGs from the default file-loader as we will handle them with svgr and url-loader
      fileLoaderRule.exclude = /\.svg$/i;

      // Reapply the existing rule but only for SVG imports ending in ?url
      config.module.rules.push({
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // Apply this rule to SVG imports with a 'url' query
      });

      // Convert all other *.svg imports to React components
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: { and: [/\.(js|ts|md)x?$/] }, // Ensure SVGs are processed only when imported from JS, TS, or MDX files
        resourceQuery: { not: [/url/] }, // Exclude SVGs that end with ?url
        use: ['@svgr/webpack'],
      });
    }

    return config;
  },
};

export default nextConfig;
