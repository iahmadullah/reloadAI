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
/* ── Glass widget dark-mode overrides ── */

/* All text white */
#detail-preview .glass-content *:not(img):not(svg):not(path):not(circle):not(rect):not(line):not(polyline):not(polygon) {
    color: rgba(255,255,255,0.88) !important;
}

/* Placeholder text */
#detail-preview .glass-content input::placeholder,
#detail-preview .glass-content textarea::placeholder {
    color: rgba(255,255,255,0.38) !important;
}

/* All white solid backgrounds → semi-transparent dark glass */
#detail-preview .glass-content [style*="background: #fff"],
#detail-preview .glass-content [style*="background:#fff"],
#detail-preview .glass-content [style*="background: #ffffff"],
#detail-preview .glass-content [style*="background: white"] {
    background: rgba(255,255,255,0.07) !important;
}

/* Light grey backgrounds (#f3f4f6, #f9fafb, etc.) → slightly lighter glass */
#detail-preview .glass-content [style*="background: #f3f4f6"],
#detail-preview .glass-content [style*="background: #f9fafb"],
#detail-preview .glass-content [style*="background: #f1f5f9"],
#detail-preview .glass-content [style*="background: #f8fafc"],
#detail-preview .glass-content [style*="background:#f3f4f6"],
#detail-preview .glass-content [style*="background:#f9fafb"] {
    background: rgba(255,255,255,0.04) !important;
}

/* Borders */
#detail-preview .glass-content [style*="border: 1px solid #e5e7eb"],
#detail-preview .glass-content [style*="border-color: #e5e7eb"],
#detail-preview .glass-content [style*="border:1px solid #e5e7eb"] {
    border-color: rgba(255,255,255,0.12) !important;
}

/* Inputs / textareas */
#detail-preview .glass-content input,
#detail-preview .glass-content textarea {
    background: rgba(255,255,255,0.06) !important;
    border-color: rgba(255,255,255,0.15) !important;
    color: #fff !important;
}

/* Buttons inside widgets */
#detail-preview .glass-content button,
#detail-preview .glass-content [role="button"] {
    border-color: rgba(255,255,255,0.15) !important;
    background: rgba(255,255,255,0.07) !important;
}

/* SVG icons — force stroke white so they render on dark bg */
#detail-preview .glass-content svg:not([class*="aid-figma"]) *[stroke]:not([stroke="none"]):not([stroke="currentColor"]) {
    stroke: rgba(255,255,255,0.75) !important;
}
#detail-preview .glass-content svg:not([class*="aid-figma"]) *[fill]:not([fill="none"]):not([fill="currentColor"]):not([fill^="#"] ) {
    fill: rgba(255,255,255,0.75) !important;
}
/* currentColor inheriting SVGs will follow the color:white rule above */
#detail-preview .glass-content svg {
    color: rgba(255,255,255,0.75) !important;
}

/* Skeleton / progress bars */
#detail-preview .glass-content [class*="-line"],
#detail-preview .glass-content [class*="-bar"]:not([class*="tab"]),
#detail-preview .glass-content [class*="-track"],
#detail-preview .glass-content [class*="skeleton"] {
    background: rgba(255,255,255,0.1) !important;
}

/* Selected / active tab pills inside widgets */
#detail-preview .glass-content [class*="-tab"].active,
#detail-preview .glass-content [class*="-tab"][class*="active"] {
    background: rgba(255,255,255,0.14) !important;
    color: #fff !important;
}

/* Feedback/quality meter bars */
#detail-preview .glass-content [class*="-meter"],
#detail-preview .glass-content [class*="-fill"],
#detail-preview .glass-content [class*="-progress"] {
    opacity: 0.8;
}

/* Overall container border */
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
