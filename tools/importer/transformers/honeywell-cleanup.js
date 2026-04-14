/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Honeywell cleanup.
 * Selectors from captured DOM at https://www.honeywell.com/us/en
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie consent and tracking overlays (from captured DOM)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '[class*="cookie"]',
      '#CybotCookiebotDialog',
      '.cmp-cls-v2',
      '.cmp-cls-v2-flyOut',
    ]);
  }
  if (hookName === H.after) {
    // Remove non-authorable content: header, footer, nav, breadcrumbs
    WebImporter.DOMUtils.remove(element, [
      '.cmp-experiencefragment--header',
      '.cmp-experiencefragment--footer',
      '.global-header-toplinks',
      '.navigationV2',
      'header',
      'footer',
      'iframe',
      'link',
      'noscript',
    ]);
    // Remove tracking pixels and hidden inputs
    WebImporter.DOMUtils.remove(element, [
      'img[src*="bat.bing"]',
      'img[src*="analytics.twitter"]',
      'img[src*="t.co/i/adsct"]',
      'img[src*="rlcdn"]',
      'input[type="hidden"]',
    ]);
    // Clean data attributes and onclick handlers
    element.querySelectorAll('*').forEach((el) => {
      el.removeAttribute('onclick');
      el.removeAttribute('data-track');
      el.removeAttribute('data-analytics');
    });
  }
}
