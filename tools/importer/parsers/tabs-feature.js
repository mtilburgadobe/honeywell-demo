/* eslint-disable */
/* global WebImporter */
/** Parser for tabs-feature. Base: tabs. Source: https://www.honeywell.com/us/en */
export default function parse(element, { document }) {
  // Tabs structure: 2 cols per row. Col 1 = tab label, Col 2 = tab content
  // Source DOM: .advancedaccordion-block contains accordion items acting as tabs
  // Each item has .advancedaccordion-question (label) and .advancedaccordion-item (content)
  const accordionItems = element.querySelectorAll('.advancedaccordion-type, .advancedaccordion-content');

  const cells = [];
  accordionItems.forEach((item) => {
    const label = item.querySelector('.advancedaccordion-question, .advancedaccordion-title');
    const content = item.querySelector('.advancedaccordion-item, .advancedaccordion-content > div:last-child');

    if (label) {
      const labelText = label.textContent.trim();
      const contentCell = [];
      if (content) {
        const contentChildren = content.querySelectorAll('p, h5, h4, h3, a');
        contentChildren.forEach((child) => contentCell.push(child));
        if (contentCell.length === 0) {
          contentCell.push(content.textContent.trim());
        }
      }
      cells.push([labelText, contentCell.length > 0 ? contentCell : '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-feature', cells });
  element.replaceWith(block);
}
