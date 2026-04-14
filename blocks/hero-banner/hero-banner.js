export default function decorate(block) {
  const firstRow = block.querySelector(':scope > div:first-child');
  const img = firstRow?.querySelector('picture, img');

  if (img) {
    // Mark the first row as the background image container
    firstRow.classList.add('hero-banner-bg');
  } else {
    block.classList.add('no-image');
  }
}
