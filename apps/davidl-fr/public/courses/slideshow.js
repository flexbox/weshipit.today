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

// SVG scenes marked data-play-on-show start their animation when their slide is
// shown, and rewind when it is left, instead of running from page load.
const syncScene = (object) => {
  const svg = object.contentDocument?.documentElement;
  if (!svg?.setCurrentTime) return;
  svg.pauseAnimations();
  svg.setCurrentTime(0);
  if (object.closest('.remark-visible')) svg.unpauseAnimations();
};
// The shown slide gets a fresh copy of its <object>: a newly loaded SVG starts at
// t=0 in every browser, whether or not the old document had loaded, started its
// timeline or fired `load` yet (it can miss on the first visit to a slide).
const restartScene = (object) => object.replaceWith(object.cloneNode(true));
const syncScenes = () => {
  document
    .querySelectorAll('.remark-visible object[data-play-on-show]')
    .forEach(restartScene);
  document.querySelectorAll('object[data-play-on-show]').forEach(syncScene);
};

slideshow.on('afterShowSlide', syncScenes);
// <object> documents load after the slides render; `load` doesn't bubble, so capture it
document.addEventListener(
  'load',
  (event) => {
    if (event.target.matches?.('object[data-play-on-show]'))
      syncScene(event.target);
  },
  true,
);
