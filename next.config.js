const withImages = require('next-images');
module.exports = withImages({
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
                react: 'preact/compat',
                'react-dom/test-utils': 'preact/test-utils',
                'react-dom': 'preact/compat'
            });
        }
        return config;
    },
    images: {
        imageSizes: [16, 32, 48, 64],
        deviceSizes: [96, 128, 256, 384, 512, 640, 750, 828, 1080, 1200, 1300, 1920, 2048, 3840],
        domains: ['media.graphcms.com', 'ik.imagekit.io']
    },
    env: {}
});
