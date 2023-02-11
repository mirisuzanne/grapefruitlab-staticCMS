// External Plugins
const { EleventyRenderPlugin } = require('@11ty/eleventy');
const yaml = require('js-yaml');
const fs = require('fs');

const data = {};

['images', 'dates'].forEach(name => {
  const file = fs.readFileSync(`./content/_data/${name}.yaml`, 'utf8');
  data[name] = yaml.load(file);
});

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(require('./config/build'));
  eleventyConfig.addPlugin(require('./config/icons'));
  eleventyConfig.addPlugin(require('./config/markdown'));
  eleventyConfig.addPlugin(require('./config/open-graph'));

  // assets
  eleventyConfig.addPlugin(require('./config/time'), data.dates);
  eleventyConfig.addPlugin(require('./config/images'), data.images);
  eleventyConfig.addPlugin(require('./config/sass'), { sassIn: '_sass' });

  // passthrough
  eleventyConfig.addPassthroughCopy('content/admin/config.yml');
  eleventyConfig.addPassthroughCopy({
    'content/_assets/fonts': 'fonts',
    'content/_assets/favicons/*': '/',
  });

  // config
  eleventyConfig.setLiquidOptions({jsTruthy: true});
  eleventyConfig.setQuietMode(true);

  eleventyConfig.addDataExtension('yml, yaml', (contents) =>
    yaml.load(contents),
  );

  return {
    dir: {
      input: 'content',
      layouts: '_layouts',
    },
  };
};
