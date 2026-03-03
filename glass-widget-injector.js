/**
 * glass-widget-injector.js
 * Automatically injects the liquid glass layer stack into every
 * interactive mockup widget in dark mode, without having to edit
 * each individual widget template in mockup-renderer.js.
 *
 * Strategy: Wait for DOMContentLoaded, then scan the preview container
 * for the first child element that looks like a card (has a background,
 * border, border-radius). Wrap its content in glass layers.
 */

(function () {
    /* CSS class selectors that identify the primary card of each widget.
       These are the known top-level card classes from mockup-renderer.js */
    const WIDGET_CARD_SELECTORS = [
        '.aid-raw-interactive-area',   // raw-text-input  (already done, skip re-inject)
        '.aid-img-mockup',             // image-input
        '.aid-voice-widget',           // voice-input
        '.aid-inline-help-widget',     // inline-help
        '.aid-pqf-widget',             // prompt-quality-feedback
        '.aid-stream-widget',          // streaming-response / skeleton-loading
        '.aid-inline-widget',          // inline-suggestions
        '.aid-struct-widget',          // structured-prompt
        '.aid-pag-widget',             // paginated-prompt
        '.aid-ref-widget',             // reference-material
        '.aid-tmpl-widget',            // prompt-templates
        '.aid-clz-widget',             // cloze-passage
        '.aid-cfg-widget',             // configurable-controls
        '.aid-pd-widget',              // progressive-disclosure
        '.aid-ci-widget',              // confidence-indicators
        '.aid-mv-widget',              // multi-variant-output
        '.aid-rrp-widget',             // result-rendered-preview
        '.aid-ie-widget',              // iterative-editing
        '.aid-sr-widget',              // selective-regeneration
        '.aid-fl-widget',              // feedback-loop
        '.aid-vh-widget',              // version-history
        '.aid-tp-widget',              // transparency-panel
        '.aid-ec-widget',              // explainability-cards
        '.aid-ra-widget',              // result-actions
        '.aid-fregen-widget',          // full-regeneration
        '.aid-tone-widget',            // tone-moderation
        '.aid-sc-widget',              // show-citations
        '.aid-kb-widget',              // knowledge-base
        '.aid-pl-widget',              // prompt-library
        '.aid-guard-widget',           // guardrails
        '.aid-tw-widget',              // team-workspace
        '.aid-ms-widget',              // model-selection
        '.aid-cw-widget',              // context-window
        '.aid-bi-widget',              // bias-indicators
        '.aid-sa-widget',              // source-attribution
        '.aid-to-widget',              // thread-options
        '.aid-th-widget',              // thread-history
        '.aid-gt-widget',              // generation-tokens
        '.aid-aic-widget',             // agent-initial-command
        '.aid-aar-widget',             // agent-action-review
        '.aid-pc-widget',              // prompt-composer
        '.aid-vw-widget',              // voice-waveform
        '.aid-fdz-widget',             // file-drop-zone
        '.aid-cc-widget',              // context-chip
        '.aid-tc-widget',              // token-counter
        '.aid-arb-widget',             // ai-response-bubble
        '.aid-cb-widget',              // confidence-badge
        '.aid-ccard-widget',           // citation-card
        '.aid-dv-widget',              // diff-viewer
        '.aid-rc-widget',              // result-carousel
        '.aid-sug-widget',             // suggestion-chip
        '.aid-ft-widget',              // feedback-thumbs
        '.aid-qm-widget',              // quality-meter
        '.aid-tn-widget',              // toast-notification
        '.aid-generic-mockup',         // fallback generic widget
    ];

    function isAlreadyGlass(el) {
        return el.classList.contains('glass-container') ||
            el.querySelector('.glass-filter') !== null;
    }

    function injectGlass(cardEl) {
        if (!cardEl || isAlreadyGlass(cardEl)) return;

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
        // Move all existing children into the content wrapper
        while (cardEl.firstChild) {
            glassContent.appendChild(cardEl.firstChild);
        }

        // Reassemble: three backdrop layers + content on top
        cardEl.appendChild(glassFilter);
        cardEl.appendChild(glassOverlay);
        cardEl.appendChild(glassSpecular);
        cardEl.appendChild(glassContent);
    }

    function applyGlassToPreview(preview) {
        if (!preview) return;
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (!isDark) return;

        // Try each known selector
        for (const sel of WIDGET_CARD_SELECTORS) {
            const card = preview.querySelector(sel);
            if (card) {
                injectGlass(card);
                return; // only wrap the first primary card found
            }
        }

        // Fallback: grab the first block-level child that is not the replay button or a style tag
        const fallback = preview.querySelector(
            ':scope > div:not(.aid-replay-btn):not([style*="display:none"]):not([style*="display: none"])'
        );
        if (fallback) {
            injectGlass(fallback);
        }
    }

    // Hook: listen for the custom event fired when a widget finishes rendering,
    // OR run after the DOMContentLoaded which fires renderInteractiveMockup.
    document.addEventListener('DOMContentLoaded', () => {
        // Give renderInteractiveMockup time to complete
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                const preview = document.getElementById('detail-preview');
                applyGlassToPreview(preview);
            });
        });

        // Also listen for theme toggling so switching to dark mode works live
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
