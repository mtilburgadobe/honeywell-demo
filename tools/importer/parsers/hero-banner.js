/* eslint-disable */
/* global WebImporter */
/** Parser for hero-banner. Base: hero. Source: https://www.honeywell.com/us/en */
export default function parse(element, { document }) {
  const bgImg = element.querySelector('.s7dm-dynamic-media img, .cq-dd-image img, img');
  const heading = element.querySelector('h1, h2, [class*="title"]');
  const description = element.querySelector('.cmp-text p, p');
  const ctaLink = element.querySelector('.cta a, a.cmp-call-to-action, a[href]');

  const cells = [];
  if (bgImg) cells.push([bgImg]);

  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description && description !== heading) contentCell.push(description);
  if (ctaLink) contentCell.push(ctaLink);
  if (contentCell.length > 0) cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
