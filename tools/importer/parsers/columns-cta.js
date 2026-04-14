/* eslint-disable */
/* global WebImporter */
/** Parser for columns-cta. Base: columns. Source: https://www.honeywell.com/us/en */
export default function parse(element, { document }) {
  // Columns structure: 2+ cols per row, each col = one content panel
  // Source DOM: Two .responsivegrid.bg-light-gray.p-30 side by side
  // Each has: bold label (HELP & SUPPORT / SALES), description p, and CTA link
  const panels = element.querySelectorAll('.responsivegrid.bg-light-gray.p-30');

  const row = [];
  panels.forEach((panel) => {
    const texts = panel.querySelectorAll('.cmp-text p, p');
    const ctaLink = panel.querySelector('.cmp-call-to-action a, .cta a, a[href]');

    const cellContent = [];
    texts.forEach((text) => cellContent.push(text));
    if (ctaLink) cellContent.push(ctaLink);

    row.push(cellContent.length > 0 ? cellContent : '');
  });

  // Fallback: if no panels found, extract from element directly
  if (row.length === 0) {
    const allTexts = element.querySelectorAll('.cmp-text');
    const allCtas = element.querySelectorAll('.cmp-call-to-action a');
    if (allTexts.length >= 2) {
      row.push([allTexts[0], allCtas[0] || '']);
      row.push([allTexts[1], allCtas[1] || '']);
    }
  }

  const cells = row.length > 0 ? [row] : [];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-cta', cells });
  element.replaceWith(block);
}
