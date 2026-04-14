/* eslint-disable */
/* global WebImporter */
/** Parser for cards-megatrend. Base: cards. Source: https://www.honeywell.com/us/en */
export default function parse(element, { document }) {
  // Cards structure: 2 cols per row. Col 1 = image, Col 2 = text content
  // Source DOM: .responsivegrid.bg-transparent.p-15.mt-15 contains image + text per card
  // Each megatrend card has: square image, category label link, h6 description
  const cards = element.querySelectorAll(':scope .responsivegrid.bg-transparent.p-15.mt-15');
  const items = cards.length > 0 ? cards : [element];

  const cells = [];
  items.forEach((card) => {
    const img = card.querySelector('.image_desktop img, .s7dm-dynamic-media img, img');
    const labelLink = card.querySelector('.cmp-text a, p a');
    const desc = card.querySelector('h6, .cmp-text h6');

    const textCell = [];
    if (labelLink) textCell.push(labelLink);
    if (desc) textCell.push(desc);

    if (img || textCell.length > 0) {
      cells.push([img || '', textCell.length > 0 ? textCell : '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-megatrend', cells });
  element.replaceWith(block);
}
