const slugify = require('slugify');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const slug = (str) => {
  if (!str) {
    return;
  }

  return slugify(str, {
    lower: true,
    strict: true,
    remove: /["]/g,
  });
}

const mdIt = markdownIt({
  html: true,
}).use(markdownItAnchor, {
  permalink: markdownItAnchor.permalink.ariaHidden({
    class: 'md-anchor',
    space: false,
  }),
  level: [2, 3],
  slugify: slug,
});

const block = (content) => (content ? mdIt.render(content.trim()) : '');
const inline = (content) => (content ? mdIt.renderInline(content.trim()) : '');

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('slug', slug);
  eleventyConfig.addFilter('md', block);
  eleventyConfig.addFilter('mdI', inline);

  eleventyConfig.setLibrary('md', mdIt);
};
