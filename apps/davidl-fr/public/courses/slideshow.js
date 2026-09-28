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
const syncScenes = () =>
  document.querySelectorAll('object[data-play-on-show]').forEach(syncScene);

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
