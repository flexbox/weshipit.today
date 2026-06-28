const path = location.pathname;
const slug = path.split('/').pop().split('.').shift();

const slideshow = remark.create({
  sourceUrl: `${slug}.md`,
  highlightStyle: 'solarized-light',

  navigation: {
    // Enable or disable navigating using scroll
    scroll: false,
  },
});
