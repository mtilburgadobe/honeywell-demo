/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroBannerParser from './parsers/hero-banner.js';
import cardsMegatrendParser from './parsers/cards-megatrend.js';
import cardsIndustryParser from './parsers/cards-industry.js';
import cardsNewsParser from './parsers/cards-news.js';
import tabsFeatureParser from './parsers/tabs-feature.js';
import columnsCtaParser from './parsers/columns-cta.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/honeywell-cleanup.js';
import sectionsTransformer from './transformers/honeywell-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-banner': heroBannerParser,
  'cards-megatrend': cardsMegatrendParser,
  'cards-industry': cardsIndustryParser,
  'cards-news': cardsNewsParser,
  'tabs-feature': tabsFeatureParser,
  'columns-cta': columnsCtaParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Honeywell US homepage with hero, featured content, product categories, and promotional sections',
  urls: [
    'https://www.honeywell.com/us/en',
  ],
  blocks: [
    {
      name: 'hero-banner',
      instances: ['#hero-banner'],
    },
    {
      name: 'cards-megatrend',
      instances: ['.responsivegrid.bg-transparent.p-15.mt-15'],
    },
    {
      name: 'cards-industry',
      instances: ['.leftrailwithcontent.left-rail-v2-styles'],
    },
    {
      name: 'cards-news',
      instances: ['.filtered-list-component.mvp2'],
    },
    {
      name: 'tabs-feature',
      instances: ['.advancedaccordion-block'],
    },
    {
      name: 'columns-cta',
      instances: ['.responsivegrid.bg-light-gray.p-15 > .aem-Grid > .responsivegrid.bg-light-gray.p-30'],
    },
  ],
  sections: [
    {
      id: 'section-hero',
      name: 'Hero Banner',
      selector: ['#hero-banner', '.section.responsivegrid:has(#hero-banner)'],
      style: 'dark',
      blocks: ['hero-banner'],
      defaultContent: [],
    },
    {
      id: 'section-megatrends',
      name: 'Delivering Mega Results on Mega Trends',
      selector: ['.section.responsivegrid.pt-0.pb-20', '.section.responsivegrid:has(.sectiontitle)'],
      style: 'light-grey',
      blocks: ['cards-megatrend'],
      defaultContent: ['h2.section-title', 'h6'],
    },
    {
      id: 'section-what-we-do',
      name: 'What We Do',
      selector: ['.leftrailwithcontent', '.section.responsivegrid:has(.leftrailwithcontent)'],
      style: null,
      blocks: ['cards-industry'],
      defaultContent: ['h2.section-title'],
    },
    {
      id: 'section-whats-new',
      name: 'Whats New',
      selector: ['.filtered-list', '.section.responsivegrid:has(.filtered-list)'],
      style: null,
      blocks: ['cards-news'],
      defaultContent: ['h2.section-title'],
    },
    {
      id: 'section-digitalization',
      name: 'Industrial Digitalization',
      selector: ['.advancedaccordion-block', '.section.responsivegrid:has(.advancedaccordion-block)'],
      style: null,
      blocks: ['tabs-feature'],
      defaultContent: ['h2.section-title', 'p .text-header5'],
    },
    {
      id: 'section-contact',
      name: 'Contact CTAs',
      selector: ['.cmp-call-to-action', '.responsivegrid.bg-light-gray.p-15:has(.cmp-call-to-action)'],
      style: 'light-grey',
      blocks: ['columns-cta'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null,
          });
        });
      } catch (e) {
        console.warn(`Selector failed for ${blockDef.name}: ${selector}`, e);
      }
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
