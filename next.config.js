const withImages = require('next-images');
module.exports = withImages({
    webpack(config, _) {
        return config;
    },
    domains: [],
    env: {}
});
