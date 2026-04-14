/* eslint-disable */
/* global WebImporter */
/** Parser for cards-news. Base: cards. Source: https://www.honeywell.com/us/en */
export default function parse(element, { document }) {
  // Cards structure: 2 cols per row. Col 1 = thumbnail image, Col 2 = headline link
  // Source DOM: .filtered-list-component.mvp2 contains li items with image + headline
  const newsItems = element.querySelectorAll('.filtered-list-component__item, li[class*="filtered-list"]');

  const cells = [];
  newsItems.forEach((item) => {
    const img = item.querySelector('.filtered-list-component__item-link img, img');
    const headlineLink = item.querySelector('.filtered-list-component__item-headline a, h2 a, a[class*="item-link"]');
    const headline = item.querySelector('.filtered-list-component__item-headline, h2');

    const textCell = [];
    if (headlineLink) {
      textCell.push(headlineLink);
    } else if (headline) {
      textCell.push(headline);
    }

    if (img || textCell.length > 0) {
      cells.push([img || '', textCell.length > 0 ? textCell : '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-news', cells });
  element.replaceWith(block);
}
