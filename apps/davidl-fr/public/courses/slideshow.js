const path = location.pathname;
const slug = path.split('/').pop().split('.').shift();

const slideshow = remark.create({
  sourceUrl: `${slug}.md`,
  ratio: '16:9',
  highlightStyle: 'solarized-light',

  navigation: {
    // Enable or disable navigating using scroll
    scroll: false,
  },
});
