var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    const bgImg = element.querySelector(".s7dm-dynamic-media img, .cq-dd-image img, img");
    const heading = element.querySelector('h1, h2, [class*="title"]');
    const description = element.querySelector(".cmp-text p, p");
    const ctaLink = element.querySelector(".cta a, a.cmp-call-to-action, a[href]");
    const cells = [];
    if (bgImg) cells.push([bgImg]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description && description !== heading) contentCell.push(description);
    if (ctaLink) contentCell.push(ctaLink);
    if (contentCell.length > 0) cells.push(contentCell);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-megatrend.js
  function parse2(element, { document }) {
    const cards = element.querySelectorAll(":scope .responsivegrid.bg-transparent.p-15.mt-15");
    const items = cards.length > 0 ? cards : [element];
    const cells = [];
    items.forEach((card) => {
      const img = card.querySelector(".image_desktop img, .s7dm-dynamic-media img, img");
      const labelLink = card.querySelector(".cmp-text a, p a");
      const desc = card.querySelector("h6, .cmp-text h6");
      const textCell = [];
      if (labelLink) textCell.push(labelLink);
      if (desc) textCell.push(desc);
      if (img || textCell.length > 0) {
        cells.push([img || "", textCell.length > 0 ? textCell : ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-megatrend", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-industry.js
  function parse3(element, { document }) {
    const tabLinks = element.querySelectorAll(".nav-tabs a, .left-rail-tabs a");
    const tabPanels = element.querySelectorAll('.tab-pane, .tab-content > div[role="tabpanel"]');
    const cells = [];
    tabPanels.forEach((panel) => {
      const img = panel.querySelector("img");
      const heading = panel.querySelector("h5, h4, h3, h2");
      const desc = panel.querySelector("p, .cmp-text p");
      const link = panel.querySelector("a[href], .cta a");
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      if (link) textCell.push(link);
      if (img || textCell.length > 0) {
        cells.push([img || "", textCell.length > 0 ? textCell : ""]);
      }
    });
    if (cells.length === 0) {
      tabLinks.forEach((link) => {
        const textCell = [link];
        cells.push(["", textCell]);
      });
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-industry", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-news.js
  function parse4(element, { document }) {
    const newsItems = element.querySelectorAll('.filtered-list-component__item, li[class*="filtered-list"]');
    const cells = [];
    newsItems.forEach((item) => {
      const img = item.querySelector(".filtered-list-component__item-link img, img");
      const headlineLink = item.querySelector('.filtered-list-component__item-headline a, h2 a, a[class*="item-link"]');
      const headline = item.querySelector(".filtered-list-component__item-headline, h2");
      const textCell = [];
      if (headlineLink) {
        textCell.push(headlineLink);
      } else if (headline) {
        textCell.push(headline);
      }
      if (img || textCell.length > 0) {
        cells.push([img || "", textCell.length > 0 ? textCell : ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-news", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-feature.js
  function parse5(element, { document }) {
    const accordionItems = element.querySelectorAll(".advancedaccordion-type, .advancedaccordion-content");
    const cells = [];
    accordionItems.forEach((item) => {
      const label = item.querySelector(".advancedaccordion-question, .advancedaccordion-title");
      const content = item.querySelector(".advancedaccordion-item, .advancedaccordion-content > div:last-child");
      if (label) {
        const labelText = label.textContent.trim();
        const contentCell = [];
        if (content) {
          const contentChildren = content.querySelectorAll("p, h5, h4, h3, a");
          contentChildren.forEach((child) => contentCell.push(child));
          if (contentCell.length === 0) {
            contentCell.push(content.textContent.trim());
          }
        }
        cells.push([labelText, contentCell.length > 0 ? contentCell : ""]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-cta.js
  function parse6(element, { document }) {
    const panels = element.querySelectorAll(".responsivegrid.bg-light-gray.p-30");
    const row = [];
    panels.forEach((panel) => {
      const texts = panel.querySelectorAll(".cmp-text p, p");
      const ctaLink = panel.querySelector(".cmp-call-to-action a, .cta a, a[href]");
      const cellContent = [];
      texts.forEach((text) => cellContent.push(text));
      if (ctaLink) cellContent.push(ctaLink);
      row.push(cellContent.length > 0 ? cellContent : "");
    });
    if (row.length === 0) {
      const allTexts = element.querySelectorAll(".cmp-text");
      const allCtas = element.querySelectorAll(".cmp-call-to-action a");
      if (allTexts.length >= 2) {
        row.push([allTexts[0], allCtas[0] || ""]);
        row.push([allTexts[1], allCtas[1] || ""]);
      }
    }
    const cells = row.length > 0 ? [row] : [];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/honeywell-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        '[class*="cookie"]',
        "#CybotCookiebotDialog",
        ".cmp-cls-v2",
        ".cmp-cls-v2-flyOut"
      ]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        ".cmp-experiencefragment--header",
        ".cmp-experiencefragment--footer",
        ".global-header-toplinks",
        ".navigationV2",
        "header",
        "footer",
        "iframe",
        "link",
        "noscript"
      ]);
      WebImporter.DOMUtils.remove(element, [
        'img[src*="bat.bing"]',
        'img[src*="analytics.twitter"]',
        'img[src*="t.co/i/adsct"]',
        'img[src*="rlcdn"]',
        'input[type="hidden"]'
      ]);
      element.querySelectorAll("*").forEach((el) => {
        el.removeAttribute("onclick");
        el.removeAttribute("data-track");
        el.removeAttribute("data-analytics");
      });
    }
  }

  // tools/importer/transformers/honeywell-sections.js
  var H2 = { before: "beforeTransform", after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const { template } = payload || {};
      if (!template || !template.sections || template.sections.length < 2) return;
      const document = element.ownerDocument || element.getRootNode();
      const sections = template.sections;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        let sectionEl = null;
        for (const sel of selectors) {
          try {
            sectionEl = element.querySelector(sel);
            if (sectionEl) break;
          } catch (e) {
          }
        }
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-banner": parse,
    "cards-megatrend": parse2,
    "cards-industry": parse3,
    "cards-news": parse4,
    "tabs-feature": parse5,
    "columns-cta": parse6
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Honeywell US homepage with hero, featured content, product categories, and promotional sections",
    urls: [
      "https://www.honeywell.com/us/en"
    ],
    blocks: [
      {
        name: "hero-banner",
        instances: ["#hero-banner"]
      },
      {
        name: "cards-megatrend",
        instances: [".responsivegrid.bg-transparent.p-15.mt-15"]
      },
      {
        name: "cards-industry",
        instances: [".leftrailwithcontent.left-rail-v2-styles"]
      },
      {
        name: "cards-news",
        instances: [".filtered-list-component.mvp2"]
      },
      {
        name: "tabs-feature",
        instances: [".advancedaccordion-block"]
      },
      {
        name: "columns-cta",
        instances: [".responsivegrid.bg-light-gray.p-15 > .aem-Grid > .responsivegrid.bg-light-gray.p-30"]
      }
    ],
    sections: [
      {
        id: "section-hero",
        name: "Hero Banner",
        selector: ["#hero-banner", ".section.responsivegrid:has(#hero-banner)"],
        style: "dark",
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-megatrends",
        name: "Delivering Mega Results on Mega Trends",
        selector: [".section.responsivegrid.pt-0.pb-20", ".section.responsivegrid:has(.sectiontitle)"],
        style: "light-grey",
        blocks: ["cards-megatrend"],
        defaultContent: ["h2.section-title", "h6"]
      },
      {
        id: "section-what-we-do",
        name: "What We Do",
        selector: [".leftrailwithcontent", ".section.responsivegrid:has(.leftrailwithcontent)"],
        style: null,
        blocks: ["cards-industry"],
        defaultContent: ["h2.section-title"]
      },
      {
        id: "section-whats-new",
        name: "Whats New",
        selector: [".filtered-list", ".section.responsivegrid:has(.filtered-list)"],
        style: null,
        blocks: ["cards-news"],
        defaultContent: ["h2.section-title"]
      },
      {
        id: "section-digitalization",
        name: "Industrial Digitalization",
        selector: [".advancedaccordion-block", ".section.responsivegrid:has(.advancedaccordion-block)"],
        style: null,
        blocks: ["tabs-feature"],
        defaultContent: ["h2.section-title", "p .text-header5"]
      },
      {
        id: "section-contact",
        name: "Contact CTAs",
        selector: [".cmp-call-to-action", ".responsivegrid.bg-light-gray.p-15:has(.cmp-call-to-action)"],
        style: "light-grey",
        blocks: ["columns-cta"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
              section: blockDef.section || null
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
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
