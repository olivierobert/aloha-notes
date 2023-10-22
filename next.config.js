/** @type {import('next').NextConfig} */

const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'stylesheets')],
  },
}

module.exports = nextConfig
