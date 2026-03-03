/**
 * glass-widget-injector.js
 * Automatically injects the liquid glass layer stack into every
 * interactive mockup widget in dark mode, without having to edit
 * each individual widget template in mockup-renderer.js.
 *
 * IMPORTANT: This script ONLY activates in dark mode and cleanly
 * reverts everything when switching back to light mode, so light
 * mode widgets remain completely untouched.
 */

(function () {
    const WIDGET_CARD_SELECTORS = [
        '.aid-raw-interactive-area',
        '.aid-img-mockup',
        '.aid-voice-widget',
        '.aid-inline-help-widget',
        '.aid-pqf-widget',
        '.aid-stream-widget',
        '.aid-inline-widget',
        '.aid-struct-widget',
        '.aid-pag-widget',
        '.aid-ref-widget',
        '.aid-tmpl-widget',
        '.aid-clz-widget',
        '.aid-cfg-widget',
        '.aid-pd-widget',
        '.aid-ci-widget',
        '.aid-mv-widget',
        '.aid-rrp-widget',
        '.aid-ie-widget',
        '.aid-sr-widget',
        '.aid-fl-widget',
        '.aid-vh-widget',
        '.aid-tp-widget',
        '.aid-ec-widget',
        '.aid-ra-widget',
        '.aid-fregen-widget',
        '.aid-tone-widget',
        '.aid-sc-widget',
        '.aid-kb-widget',
        '.aid-pl-widget',
        '.aid-guard-widget',
        '.aid-tw-widget',
        '.aid-ms-widget',
        '.aid-cw-widget',
        '.aid-bi-widget',
        '.aid-sa-widget',
        '.aid-to-widget',
        '.aid-th-widget',
        '.aid-gt-widget',
        '.aid-aic-widget',
        '.aid-aar-widget',
        '.aid-pc-widget',
        '.aid-vw-widget',
        '.aid-fdz-widget',
        '.aid-cc-widget',
        '.aid-tc-widget',
        '.aid-arb-widget',
        '.aid-cb-widget',
        '.aid-ccard-widget',
        '.aid-dv-widget',
        '.aid-rc-widget',
        '.aid-sug-widget',
        '.aid-ft-widget',
        '.aid-qm-widget',
        '.aid-tn-widget',
        '.aid-generic-mockup',
    ];

    /* ── State tracking ── */
    let injectedCard = null;      // reference to the card we modified
    let savedBackground = '';     // original background before injection
    let savedOverflow = '';       // original overflow
    let savedPosition = '';       // original position
    let originalChildren = null;  // original DOM order (DocumentFragment)

    function isDarkMode() {
        return document.documentElement.getAttribute('data-theme') === 'dark';
    }

    function isAlreadyGlass(el) {
        return el.classList.contains('glass-container');
    }

    /* ── INJECT ── */
    function injectGlass(cardEl) {
        if (!cardEl || isAlreadyGlass(cardEl)) return;

        // Save original inline styles so we can restore them
        injectedCard = cardEl;
        savedBackground = cardEl.style.background || '';
        savedOverflow = cardEl.style.overflow || '';
        savedPosition = cardEl.style.position || '';

        // Mark as glass container
        cardEl.classList.add('glass-container');
        cardEl.style.position = 'relative';
        cardEl.style.overflow = 'hidden';
        cardEl.style.background = 'transparent';

        // Build glass backdrop layers
        const glassFilter = document.createElement('div');
        glassFilter.className = 'glass-filter';

        const glassOverlay = document.createElement('div');
        glassOverlay.className = 'glass-overlay';

        const glassSpecular = document.createElement('div');
        glassSpecular.className = 'glass-specular';

        // Wrap all existing children in a .glass-content wrapper
        const glassContent = document.createElement('div');
        glassContent.className = 'glass-content';
        while (cardEl.firstChild) {
            glassContent.appendChild(cardEl.firstChild);
        }

        // Reassemble
        cardEl.appendChild(glassFilter);
        cardEl.appendChild(glassOverlay);
        cardEl.appendChild(glassSpecular);
        cardEl.appendChild(glassContent);
    }

    /* ── REMOVE (revert to original) ── */
    function removeGlass() {
        if (!injectedCard) return;

        const cardEl = injectedCard;
        cardEl.classList.remove('glass-container');

        // Restore original inline styles
        cardEl.style.background = savedBackground;
        cardEl.style.overflow = savedOverflow;
        cardEl.style.position = savedPosition;

        // Pull children out of .glass-content back into the card directly
        const glassContent = cardEl.querySelector(':scope > .glass-content');
        if (glassContent) {
            while (glassContent.firstChild) {
                cardEl.appendChild(glassContent.firstChild);
            }
        }

        // Remove the four glass layer divs
        cardEl.querySelectorAll(':scope > .glass-filter, :scope > .glass-overlay, :scope > .glass-specular, :scope > .glass-content').forEach(el => el.remove());

        injectedCard = null;
    }

    /* ── Apply dark-mode text color fix to all widget internals ── */
    function applyDarkTextFix(preview) {
        if (!preview) return;
        // Inject a style block that forces white text on every element inside the preview
        let darkFixStyle = preview.querySelector('#glass-dark-text-fix');
        if (!darkFixStyle) {
            darkFixStyle = document.createElement('style');
            darkFixStyle.id = 'glass-dark-text-fix';
            darkFixStyle.textContent = `
                /* Force all text white inside dark-mode widget preview */
                #detail-preview *:not(svg):not(path):not(.aid-coming-soon-chip):not(.aid-replay-btn):not(.aid-replay-btn *) {
                    color: rgba(255, 255, 255, 0.88) !important;
                }
                #detail-preview input,
                #detail-preview textarea {
                    color: #fff !important;
                    background: rgba(255,255,255,0.06) !important;
                    border-color: rgba(255,255,255,0.15) !important;
                }
                #detail-preview input::placeholder,
                #detail-preview textarea::placeholder {
                    color: rgba(255,255,255,0.4) !important;
                }
                /* Buttons inside widgets */
                #detail-preview button:not(.aid-replay-btn) {
                    color: rgba(255,255,255,0.9) !important;
                }
                /* Inner sub-cards, panels, boxes */
                #detail-preview [class*="-card"],
                #detail-preview [class*="-panel"],
                #detail-preview [class*="-bubble"],
                #detail-preview [class*="-box"],
                #detail-preview [class*="-item"],
                #detail-preview [class*="-row"],
                #detail-preview [class*="-header"],
                #detail-preview [class*="-area"] {
                    background: rgba(255,255,255,0.04) !important;
                    border-color: rgba(255,255,255,0.08) !important;
                }
                /* Lines/bars inside widgets (skeleton, progress bars, etc.) */
                #detail-preview [class*="-line"],
                #detail-preview [class*="-bar"],
                #detail-preview [class*="-meter"] {
                    background: rgba(255,255,255,0.1) !important;
                }
                /* Tags / chips / badges */
                #detail-preview [class*="chip"],
                #detail-preview [class*="-tag"],
                #detail-preview [class*="badge"]:not(.aid-coming-soon-chip) {
                    background: rgba(255,255,255,0.08) !important;
                    border-color: rgba(255,255,255,0.15) !important;
                }
                /* SVG icons - make them white */
                #detail-preview svg:not(.aid-figma-icon) {
                    color: rgba(255,255,255,0.7) !important;
                }
                #detail-preview svg:not(.aid-figma-icon) path,
                #detail-preview svg:not(.aid-figma-icon) circle,
                #detail-preview svg:not(.aid-figma-icon) line,
                #detail-preview svg:not(.aid-figma-icon) polyline,
                #detail-preview svg:not(.aid-figma-icon) rect {
                    stroke: rgba(255,255,255,0.7) !important;
                }
            `;
            preview.appendChild(darkFixStyle);
        }
    }

    function removeDarkTextFix(preview) {
        if (!preview) return;
        const fix = preview.querySelector('#glass-dark-text-fix');
        if (fix) fix.remove();
    }

    /* ── Main logic ── */
    function applyGlassToPreview(preview) {
        if (!preview) return;

        if (!isDarkMode()) {
            // Light mode: remove everything we injected
            removeGlass();
            removeDarkTextFix(preview);
            return;
        }

        // Dark mode: inject glass + text fix
        applyDarkTextFix(preview);

        if (injectedCard) return; // already injected

        for (const sel of WIDGET_CARD_SELECTORS) {
            const card = preview.querySelector(sel);
            if (card) {
                injectGlass(card);
                return;
            }
        }

        // Fallback
        const fallback = preview.querySelector(
            ':scope > div:not(.aid-replay-btn):not([style*="display:none"]):not([style*="display: none"])'
        );
        if (fallback) {
            injectGlass(fallback);
        }
    }

    /* ── Bootstrap ── */
    document.addEventListener('DOMContentLoaded', () => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const preview = document.getElementById('detail-preview');
                applyGlassToPreview(preview);
            });
        });

        // React to live theme toggling
        const observer = new MutationObserver(() => {
            const preview = document.getElementById('detail-preview');
            applyGlassToPreview(preview);
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    });
})();
