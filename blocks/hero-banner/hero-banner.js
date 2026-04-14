export default function decorate(block) {
  const firstRow = block.querySelector(':scope > div:first-child');
  const pic = firstRow?.querySelector('picture, img');

  if (pic) {
    firstRow.classList.add('hero-banner-bg');
  } else {
    block.classList.add('no-image');
  }
}
