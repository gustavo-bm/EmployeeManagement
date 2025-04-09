/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '', // Garante que os caminhos dos arquivos estão corretos
  assetPrefix: './', // Corrige o carregamento de arquivos estáticos no Electron
};

module.exports = nextConfig;
