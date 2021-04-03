module.exports = function (config) {
    config.module.rules
        .filter(rule => (
            rule.test
                .toString()
                .match(/css|less|s\(\[ac\]\)ss/)
        ))
        .forEach(rule => {
            const cssLoader = rule.use.find(use => use.loader === 'css-loader');
            cssLoader.options.modules = true;
        });
    return config
}