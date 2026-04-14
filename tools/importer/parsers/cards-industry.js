/* eslint-disable */
/* global WebImporter */
/** Parser for cards-industry. Base: cards. Source: https://www.honeywell.com/us/en */
export default function parse(element, { document }) {
  // Cards structure: 2 cols per row. Col 1 = icon image, Col 2 = label text
  // Source DOM: .leftrailwithcontent contains .nav-tabs with industry links
  // and .tab-content with industry detail panels
  const tabLinks = element.querySelectorAll('.nav-tabs a, .left-rail-tabs a');
  const tabPanels = element.querySelectorAll('.tab-pane, .tab-content > div[role="tabpanel"]');

  const cells = [];
  tabPanels.forEach((panel) => {
    const img = panel.querySelector('img');
    const heading = panel.querySelector('h5, h4, h3, h2');
    const desc = panel.querySelector('p, .cmp-text p');
    const link = panel.querySelector('a[href], .cta a');

    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (link) textCell.push(link);

    if (img || textCell.length > 0) {
      cells.push([img || '', textCell.length > 0 ? textCell : '']);
    }
  });

  // Fallback: use tab links if no panels found
  if (cells.length === 0) {
    tabLinks.forEach((link) => {
      const textCell = [link];
      cells.push(['', textCell]);
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-industry', cells });
  element.replaceWith(block);
}
