/**
 * glass-widget-injector.js
 * Injects the liquid glass layer stack into every interactive mockup
 * widget in dark mode. Cleanly reverts everything in light mode so
 * light-mode widgets remain completely untouched.
 */

(function () {

    /* ── Selectors for the outermost card of each known widget ── */
    const WIDGET_CARD_SELECTORS = [
        '.aid-raw-interactive-area',
        '.aid-img-mockup',
        '.aid-voice-mockup',
        '.aid-ih-mockup',
        '.aid-pqf-mockup',
        '.aid-stream-mockup',
        '.aid-inline-mockup',
        '.aid-sp-mockup',
        '.aid-pp-mockup',
        '.aid-rm-mockup',
        '.aid-pt-mockup',
        '.aid-cp-mockup',
        '.aid-cc-mockup',
        '.aid-pd-mockup',
        '.aid-ci-mockup',
        '.aid-mvo-mockup',
        '.aid-rrp-mockup',
        '.aid-ie-mockup',
        '.aid-sr-mockup',
        '.aid-fl-mockup',
        '.aid-vh-mockup',
        '.aid-tp-mockup',
        '.aid-ep-mockup',
        '.aid-ra-mockup',
        '.aid-fr-mockup',
        '.aid-tm-mockup',
        '.aid-sc-mockup',
        '.aid-kb-mockup',
        '.aid-pl-mockup',
        '.aid-gr-mockup',
        '.aid-tw-mockup',
        '.aid-ms-mockup',
        '.aid-cw-mockup',
        '.aid-bi-mockup',
        '.aid-sa-mockup',
        '.aid-to-mockup',
        '.aid-th-mockup',
        '.aid-gt-mockup',
        '.aid-aic-mockup',
        '.aid-aar-mockup',
        '.aid-pc-mockup',
        '.aid-vw-mockup',
        '.aid-fdz-mockup',
        '.aid-ctk-mockup',
        '.aid-arb-mockup',
        '.aid-dv-mockup',
        '.aid-generic-mockup',
        // fallback widget selector names (non-mockup suffixed)
        '.aid-img-widget', '.aid-voice-widget', '.aid-pqf-widget',
        '.aid-stream-widget', '.aid-inline-widget', '.aid-struct-widget',
        '.aid-pag-widget', '.aid-ref-widget', '.aid-tmpl-widget',
        '.aid-clz-widget', '.aid-cfg-widget', '.aid-pd-widget',
        '.aid-ci-widget', '.aid-mv-widget', '.aid-rrp-widget',
        '.aid-ie-widget', '.aid-sr-widget', '.aid-fl-widget',
        '.aid-vh-widget', '.aid-tp-widget', '.aid-ec-widget',
        '.aid-ra-widget', '.aid-fregen-widget', '.aid-tone-widget',
        '.aid-sc-widget', '.aid-kb-widget', '.aid-pl-widget',
        '.aid-guard-widget', '.aid-tw-widget', '.aid-ms-widget',
        '.aid-cw-widget', '.aid-bi-widget', '.aid-sa-widget',
        '.aid-to-widget', '.aid-th-widget', '.aid-gt-widget',
        '.aid-aic-widget', '.aid-aar-widget', '.aid-pc-widget',
        '.aid-vw-widget', '.aid-fdz-widget', '.aid-cc-widget',
        '.aid-tc-widget', '.aid-arb-widget', '.aid-cb-widget',
        '.aid-ccard-widget', '.aid-dv-widget', '.aid-rc-widget',
        '.aid-sug-widget', '.aid-ft-widget', '.aid-qm-widget',
        '.aid-tn-widget', '.aid-inline-help-widget',
    ];

    /* ── State ── */
    let injectedCard = null;
    let savedInlineBackground = '';
    let savedInlineOverflow = '';
    let savedInlinePosition = '';

    function isDarkMode() {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    }

    function isGlassed(el) {
        return el.classList.contains('glass-container');
    }

    /* ── INJECT glass layers ── */
    function injectGlass(cardEl) {
        if (!cardEl || isGlassed(cardEl)) return;

        injectedCard = cardEl;
        savedInlineBackground = cardEl.style.background || '';
        savedInlineOverflow = cardEl.style.overflow || '';
        savedInlinePosition = cardEl.style.position || '';

        cardEl.classList.add('glass-container');
        cardEl.style.cssText += ';position:relative !important;overflow:hidden !important;background:transparent !important;';

        const glassFilter = document.createElement('div');
        glassFilter.className = 'glass-filter';

        const glassOverlay = document.createElement('div');
        glassOverlay.className = 'glass-overlay';

        const glassSpecular = document.createElement('div');
        glassSpecular.className = 'glass-specular';

        const glassContent = document.createElement('div');
        glassContent.className = 'glass-content';
        glassContent.style.cssText = 'position:relative;z-index:1;width:100%;height:100%;';

        while (cardEl.firstChild) {
            glassContent.appendChild(cardEl.firstChild);
        }

        cardEl.appendChild(glassFilter);
        cardEl.appendChild(glassOverlay);
        cardEl.appendChild(glassSpecular);
        cardEl.appendChild(glassContent);
    }

    /* ── REMOVE glass layers ── */
    function removeGlass() {
        if (!injectedCard) return;
        const cardEl = injectedCard;

        cardEl.classList.remove('glass-container');
        // Restore original styles
        cardEl.style.background = savedInlineBackground;
        cardEl.style.overflow = savedInlineOverflow;
        cardEl.style.position = savedInlinePosition;

        const glassContent = cardEl.querySelector(':scope > .glass-content');
        if (glassContent) {
            while (glassContent.firstChild) {
                cardEl.insertBefore(glassContent.firstChild, glassContent);
            }
        }
        cardEl.querySelectorAll(
            ':scope > .glass-filter, :scope > .glass-overlay, :scope > .glass-specular, :scope > .glass-content'
        ).forEach(el => el.remove());

        injectedCard = null;
    }

    /* ── Inject a dark-mode text/colour fix style block ──
       Uses very high specificity (#detail-preview + child combinators) to
       beat the hardcoded inline <style> blocks inside each widget template. */
    function applyDarkTextFix(preview) {
        if (!preview) return;
        if (preview.querySelector('#glass-dark-text-fix')) return;

        const s = document.createElement('style');
        s.id = 'glass-dark-text-fix';
        s.textContent = `
/* ══════════════════════════════════════════════
   Glass Dark Mode Overrides — targets exact class
   names from mockup-renderer.js widget templates
   ══════════════════════════════════════════════ */

/* ── 1. Universal text colour (all non-image children) ── */
#detail-preview .glass-content *:not(img):not(video):not(canvas) {
    color: rgba(255,255,255,0.88) !important;
}

/* ── 2. Placeholder text ── */
#detail-preview .glass-content input::placeholder,
#detail-preview .glass-content textarea::placeholder {
    color: rgba(255,255,255,0.35) !important;
}

/* ── 3. Inputs & textareas ── */
#detail-preview .glass-content input,
#detail-preview .glass-content textarea,
#detail-preview .glass-content select {
    background: rgba(255,255,255,0.07) !important;
    border-color: rgba(255,255,255,0.15) !important;
    color: rgba(255,255,255,0.9) !important;
}

/* ── 4. SVG icon colours ── */
#detail-preview .glass-content svg {
    color: rgba(255,255,255,0.75) !important;
}
#detail-preview .glass-content svg path,
#detail-preview .glass-content svg circle,
#detail-preview .glass-content svg rect,
#detail-preview .glass-content svg polyline,
#detail-preview .glass-content svg polygon,
#detail-preview .glass-content svg line {
    stroke: rgba(255,255,255,0.75) !important;
    fill: none !important;
}
/* ── 4b. Filled SVG icons (explicit fill not 'none') ── */
#detail-preview .glass-content svg [fill]:not([fill="none"]) {
    fill: rgba(255,255,255,0.75) !important;
}

/* ── 5. Widget outer card (all known mockup class names) ── */
#detail-preview .glass-content .aid-img-mockup,
#detail-preview .glass-content .aid-voice-mockup,
#detail-preview .glass-content .aid-ih-mockup,
#detail-preview .glass-content .aid-pqf-mockup,
#detail-preview .glass-content .aid-stream-mockup,
#detail-preview .glass-content .aid-inline-mockup,
#detail-preview .glass-content .aid-sp-mockup,
#detail-preview .glass-content .aid-pp-mockup,
#detail-preview .glass-content .aid-rm-mockup,
#detail-preview .glass-content .aid-pt-mockup,
#detail-preview .glass-content .aid-cp-mockup,
#detail-preview .glass-content .aid-cc-mockup,
#detail-preview .glass-content .aid-pd-mockup,
#detail-preview .glass-content .aid-ci-mockup,
#detail-preview .glass-content .aid-mvo-mockup,
#detail-preview .glass-content .aid-rrp-mockup,
#detail-preview .glass-content .aid-ie-mockup,
#detail-preview .glass-content .aid-sr-mockup,
#detail-preview .glass-content .aid-fl-mockup,
#detail-preview .glass-content .aid-vh-mockup,
#detail-preview .glass-content .aid-tp-mockup,
#detail-preview .glass-content .aid-ep-mockup,
#detail-preview .glass-content .aid-ra-mockup,
#detail-preview .glass-content .aid-fr-mockup,
#detail-preview .glass-content .aid-tm-mockup,
#detail-preview .glass-content .aid-sc-mockup,
#detail-preview .glass-content .aid-kb-mockup,
#detail-preview .glass-content .aid-pl-mockup,
#detail-preview .glass-content .aid-gr-mockup,
#detail-preview .glass-content .aid-tw-mockup,
#detail-preview .glass-content .aid-ms-mockup,
#detail-preview .glass-content .aid-cw-mockup,
#detail-preview .glass-content .aid-bi-mockup,
#detail-preview .glass-content .aid-sa-mockup,
#detail-preview .glass-content .aid-to-mockup,
#detail-preview .glass-content .aid-th-mockup,
#detail-preview .glass-content .aid-gt-mockup,
#detail-preview .glass-content .aid-aic-mockup,
#detail-preview .glass-content .aid-aar-mockup,
#detail-preview .glass-content .aid-pc-mockup,
#detail-preview .glass-content .aid-vw-mockup,
#detail-preview .glass-content .aid-fdz-mockup,
#detail-preview .glass-content .aid-ctk-mockup,
#detail-preview .glass-content .aid-arb-mockup,
#detail-preview .glass-content .aid-dv-mockup,
#detail-preview .glass-content .aid-generic-mockup {
    background: rgba(255,255,255,0.06) !important;
    border-color: rgba(255,255,255,0.12) !important;
    box-shadow: none !important;
}

/* ── 6. Light-coloured inner elements ── */
/* Voice: display area, status pill, mic button */
#detail-preview .glass-content .aid-voice-display,
#detail-preview .glass-content .aid-voice-status,
#detail-preview .glass-content .aid-voice-btn {
    background: rgba(255,255,255,0.07) !important;
    border-color: rgba(255,255,255,0.12) !important;
}

/* Image input: inner card + input area */
#detail-preview .glass-content .aid-img-input-area,
#detail-preview .glass-content .aid-img-bubble {
    background: rgba(255,255,255,0.07) !important;
    border-color: rgba(255,255,255,0.12) !important;
}


/* Prompt Quality inner composer + footer */
#detail-preview .glass-content .aid-pqf-composer,
#detail-preview .glass-content .aid-pqf-feedback,
#detail-preview .glass-content .aid-pqf-bar-bg,
#detail-preview .glass-content .aid-pqf-footer {
    background: rgba(255,255,255,0.07) !important;
    border-color: rgba(255,255,255,0.12) !important;
}


/* Streaming / inline response cards */
#detail-preview .glass-content .aid-stream-card,
#detail-preview .glass-content .aid-rrp-card,
#detail-preview .glass-content .aid-ie-card {
    background: rgba(255,255,255,0.05) !important;
    border-color: rgba(255,255,255,0.1) !important;
}

/* Toolbar / action buttons */
#detail-preview .glass-content .aid-fl-btn,
#detail-preview .glass-content .aid-ra-btn,
#detail-preview .glass-content .aid-fr-btn,
#detail-preview .glass-content .aid-toolbar-btn,
#detail-preview .glass-content [class*="-action-btn"],
#detail-preview .glass-content [class*="-btn"]:not([class*="thumb"]) {
    background: rgba(255,255,255,0.08) !important;
    border-color: rgba(255,255,255,0.14) !important;
}

/* Dropdown menus */
#detail-preview .glass-content .aid-cp-menu,
#detail-preview .glass-content .aid-pt-dropdown,
#detail-preview .glass-content [class*="-dropdown"],
#detail-preview .glass-content [class*="-menu"] {
    background: rgba(20,20,30,0.88) !important;
    border-color: rgba(255,255,255,0.12) !important;
}

/* Skeleton / loader lines */
#detail-preview .glass-content .aid-sr-line,
#detail-preview .glass-content [class*="-line"],
#detail-preview .glass-content [class*="-skeleton"],
#detail-preview .glass-content [class*="-track"] {
    background: rgba(255,255,255,0.1) !important;
}

/* Progress fill bar (keep the brand colour) */
#detail-preview .glass-content [class*="-fill"][style*="width"] {
    opacity: 0.85;
}

/* Active tab inside widget */
#detail-preview .glass-content .aid-ih-tab.active,
#detail-preview .glass-content [class*="-tab"].active {
    background: rgba(255,255,255,0.14) !important;
    color: #fff !important;
    box-shadow: none !important;
}

/* Generic light-grey panels */
#detail-preview .glass-content [class*="-panel"],
#detail-preview .glass-content [class*="-box"],
#detail-preview .glass-content [class*="-section"] {
    background: rgba(255,255,255,0.05) !important;
    border-color: rgba(255,255,255,0.1) !important;
}

/* Outer container border */
#detail-preview .glass-container {
    border-color: rgba(255,255,255,0.12) !important;
}
        `;
        preview.appendChild(s);
    }

    function removeDarkTextFix(preview) {
        if (!preview) return;
        const s = preview.querySelector('#glass-dark-text-fix');
        if (s) s.remove();
    }

    /* ── Main entry ── */
    function applyGlassToPreview(preview) {
        if (!preview) return;

        if (!isDarkMode()) {
            removeGlass();
            removeDarkTextFix(preview);
            return;
        }

        // Dark mode path
        applyDarkTextFix(preview);

        if (injectedCard) return; // already injected, text fix is enough

        // Find the primary card
        for (const sel of WIDGET_CARD_SELECTORS) {
            const card = preview.querySelector(sel);
            if (card) {
                injectGlass(card);
                return;
            }
        }

        // Fallback: first real div child
        const fallback = preview.querySelector(
            ':scope > div:not(.aid-replay-btn):not([style*="display:none"])'
        );
        if (fallback) injectGlass(fallback);
    }

    /* ── Bootstrap ── */
    document.addEventListener('DOMContentLoaded', () => {
        // Double-rAF lets renderInteractiveMockup finish first
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const preview = document.getElementById('detail-preview');
                applyGlassToPreview(preview);
            });
        });

        // React live to theme switch
        const observer = new MutationObserver(() => {
            const preview = document.getElementById('detail-preview');
            applyGlassToPreview(preview);
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });
    });
})();
