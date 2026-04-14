export default function decorate(block) {
  const firstRow = block.querySelector(':scope > div:first-child');
  const pic = firstRow?.querySelector('picture, img');

  if (pic) {
    firstRow.classList.add('hero-banner-bg');
  } else {
    block.classList.add('no-image');
  }

  // Style the H1: last line white, preceding lines in Honeywell red
  const h1 = block.querySelector('h1');
  if (h1) {
    const brs = h1.querySelectorAll('br');
    if (brs.length >= 2) {
      // Split at the last <br> — everything before is red, after is white
      const lastBr = brs[brs.length - 1];
      const redSpan = document.createElement('span');
      redSpan.classList.add('hero-banner-red');
      // Move all nodes before the last <br> into the red span
      while (h1.firstChild && h1.firstChild !== lastBr) {
        redSpan.appendChild(h1.firstChild);
      }
      // Remove the last <br> itself
      if (lastBr.parentNode === h1) lastBr.remove();
      h1.prepend(redSpan);
    }
  }
}
