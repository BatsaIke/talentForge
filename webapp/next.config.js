/** @type {import('next').NextConfig} */
const nextConfig = {}
// next.config.js
// next.config.js
module.exports = {
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/', // Output path within the public folder
            publicPath: '/_next/static/fonts/', // Public path used in URLs
          },
        },
      });
  
      return config;
    },
  };
  