/* ════════════════════════════════════════════════════════════
   AI DESIGN — Data & Rendering
   All pattern/component/system definitions + card rendering
   ════════════════════════════════════════════════════════════ */

const PATTERNS = [
    { id: 'raw-text-input', title: 'Raw Text Input', cat: 'authoring', desc: 'The most basic and straight forward input, raw text directly prompting the AI.', preview: 'authoring' },
    { id: 'image-input', title: 'Image Input', cat: 'authoring', desc: 'Adding an image accompanying a supporting text prompt for multimodal interaction.', preview: 'authoring' },
    { id: 'voice-input', title: 'Voice Input', cat: 'authoring', desc: 'Similar to raw text but more natural using voice input for hands-free prompting.', preview: 'authoring' },
    { id: 'inline-help', title: 'Inline Help', cat: 'authoring', desc: 'Subtle help information presented inline with other UI elements for contextual guidance.', preview: 'authoring' },
    { id: 'inline-suggestions', title: 'Inline Suggestions', cat: 'authoring', desc: 'AI powered suggestions to complete prompts while being authored, like autocomplete.', preview: 'authoring' },
    { id: 'prompt-quality-feedback', title: 'Prompt Quality Feedback', cat: 'authoring', desc: 'Providing indication of a prompt\'s quality or level of detail while it\'s being authored.', preview: 'authoring' },
    { id: 'structured-prompt', title: 'Structured Prompt', cat: 'authoring', desc: 'Providing the required structure & detail required for the prompt, scaffolding the users input.', preview: 'authoring' },
    { id: 'paginated-prompt', title: 'Paginated Prompt', cat: 'authoring', desc: 'Like the structured prompt except paginated to create a focused step-by-step workflow.', preview: 'authoring' },
    { id: 'reference-material', title: 'Reference Material', cat: 'authoring', desc: 'Adding specific files for the AI to reference to more tightly scope your results.', preview: 'authoring' },
    { id: 'prompt-templates', title: 'Prompt Templates', cat: 'authoring', desc: 'Allowing prompts to be saved & recalled, as well as a library of pre-written prompts.', preview: 'authoring' },
    { id: 'cloze-passage', title: 'Cloze Passage', cat: 'authoring', desc: 'Prompt variables presented in a conversational cloze passage style for natural input.', preview: 'authoring' },
    { id: 'configurable-controls', title: 'Configurable Controls', cat: 'authoring', desc: 'Highly abstracted prompt authoring using configured options & controls instead of text.', preview: 'authoring' },
    { id: 'streaming-response', title: 'Streaming Response', cat: 'generation', desc: 'Real-time token-by-token display of AI output giving users immediate visual feedback.', preview: 'generation' },
    { id: 'progressive-disclosure', title: 'Progressive Disclosure', cat: 'generation', desc: 'Gradually revealing AI results in layers so users can process information incrementally.', preview: 'generation' },
    { id: 'skeleton-loading', title: 'Skeleton Loading', cat: 'generation', desc: 'Placeholder shapes that mimic the final layout while AI content is being generated.', preview: 'generation' },
    { id: 'confidence-indicators', title: 'Confidence Indicators', cat: 'generation', desc: 'Visual cues showing the AI model\'s certainty level for different parts of its output.', preview: 'generation' },
    { id: 'multi-variant-output', title: 'Multi-Variant Output', cat: 'generation', desc: 'Generating multiple result variations simultaneously so users can compare and choose.', preview: 'generation' },
    { id: 'result-rendered-preview', title: 'Result Rendered Preview', cat: 'generation', desc: 'A live preview of generated content, image or code rendered in real-time.', preview: 'generation' },
    { id: 'iterative-editing', title: 'Iterative Editing', cat: 'refinement', desc: 'Allowing users to refine AI output through successive rounds of feedback and adjustment.', preview: 'refinement' },
    { id: 'selective-regeneration', title: 'Selective Regeneration', cat: 'refinement', desc: 'Focused regeneration of specific sections of an AI result for granular control.', preview: 'refinement' },
    { id: 'feedback-loop', title: 'Feedback Loop', cat: 'refinement', desc: 'Thumbs up/down and rating mechanisms that help the AI learn user preferences over time.', preview: 'refinement' },
    { id: 'version-history', title: 'Version History', cat: 'refinement', desc: 'Tracking and allowing navigation between different iterations of AI-generated content.', preview: 'refinement' },
    { id: 'result-actions', title: 'Result Actions', cat: 'refinement', desc: 'Providing contextually relevant action options per generated result like copy, edit, or share.', preview: 'refinement' },
    { id: 'full-regeneration', title: 'Full Regeneration', cat: 'refinement', desc: 'A complete regeneration of the AI result when the output doesn\'t meet expectations.', preview: 'refinement' },
    { id: 'show-citations', title: 'Show Citations', cat: 'trust', desc: 'Providing clear sources used to generate the results for transparency and trust.', preview: 'trust' },
    { id: 'explainability-cards', title: 'Explainability Cards', cat: 'trust', desc: 'Visual breakdowns explaining why the AI made specific decisions or recommendations.', preview: 'trust' },
    { id: 'bias-indicators', title: 'Bias Indicators', cat: 'trust', desc: 'Flagging potential biases in AI output so users can make informed decisions.', preview: 'trust' },
    { id: 'source-attribution', title: 'Source Attribution', cat: 'trust', desc: 'Clearly linking generated content back to its training data or reference material sources.', preview: 'trust' },
    { id: 'model-selection', title: 'Model Selection', cat: 'management', desc: 'Providing user control over the exact LLM model they\'re using for their generation.', preview: 'management' },
    { id: 'thread-options', title: 'Thread Options', cat: 'management', desc: 'Providing users control over threaded conversations or a fresh generation each time.', preview: 'management' },
    { id: 'thread-history', title: 'Thread History', cat: 'management', desc: 'Review & access a history of your various thread activities and conversations.', preview: 'management' },
    { id: 'generation-tokens', title: 'Generation Tokens', cat: 'management', desc: 'Providing an allocated amount of generation tokens to spend, managing usage limits.', preview: 'management' },
    { id: 'agent-initial-command', title: 'Agent Initial Command', cat: 'management', desc: 'Defining a clear initial command for an AI agent to execute autonomously.', preview: 'management' },
    { id: 'agent-action-review', title: 'Agent Action Review', cat: 'management', desc: 'Reviewing an agent\'s understanding & providing confirmation before execution.', preview: 'management' },
];

const COMPONENTS = [
    { id: 'prompt-composer', title: 'Prompt Composer', cat: 'input', desc: 'A rich text area with formatting, attachments, and AI-aware autocomplete built in.' },
    { id: 'voice-waveform', title: 'Voice Waveform', cat: 'input', desc: 'A real-time audio visualizer that provides feedback while the user speaks to the AI.' },
    { id: 'file-drop-zone', title: 'File Drop Zone', cat: 'input', desc: 'Drag-and-drop area for uploading reference documents, images, or data for AI context.' },
    { id: 'context-chip', title: 'Context Chip', cat: 'input', desc: 'Compact tags representing active context items like selected files, personas, or parameters.' },
    { id: 'token-counter', title: 'Token Counter', cat: 'input', desc: 'Live display of prompt token usage relative to the model\'s context window limit.' },
    { id: 'ai-response-bubble', title: 'AI Response Bubble', cat: 'display', desc: 'A styled container for AI-generated text with streaming animation and action buttons.' },
    { id: 'confidence-badge', title: 'Confidence Badge', cat: 'display', desc: 'A color-coded indicator showing high, medium, or low confidence on AI output segments.' },
    { id: 'citation-card', title: 'Citation Card', cat: 'display', desc: 'An expandable reference card linking AI claims to their original source material.' },
    { id: 'diff-viewer', title: 'Diff Viewer', cat: 'display', desc: 'Side-by-side or inline comparison showing changes between original and AI-edited content.' },
    { id: 'result-carousel', title: 'Result Carousel', cat: 'display', desc: 'A swipeable gallery of multiple AI output variations for easy comparison and selection.' },
    { id: 'suggestion-chip', title: 'Suggestion Chip', cat: 'feedback', desc: 'Tappable pill-shaped suggestions that help users quickly refine or extend their prompts.' },
    { id: 'feedback-thumbs', title: 'Feedback Thumbs', cat: 'feedback', desc: 'Simple thumbs up/down buttons to rate AI output quality and train future responses.' },
    { id: 'quality-meter', title: 'Quality Meter', cat: 'feedback', desc: 'A gradient progress bar showing real-time prompt quality as the user types.' },
    { id: 'toast-notification', title: 'Toast Notification', cat: 'feedback', desc: 'Non-intrusive alerts for AI status changes like generation complete, errors, or warnings.' },
    { id: 'model-selector', title: 'Model Selector', cat: 'control', desc: 'A dropdown or toggle for switching between different AI models with capability previews.' },
    { id: 'temperature-slider', title: 'Temperature Slider', cat: 'control', desc: 'A control for adjusting AI creativity/randomness with visual examples of each setting.' },
    { id: 'regenerate-button', title: 'Regenerate Button', cat: 'control', desc: 'A prominent action to re-run AI generation with the same or modified parameters.' },
    { id: 'context-window', title: 'Context Window', cat: 'control', desc: 'A panel showing the AI\'s active context including conversation history and loaded references.' },
];

const SYSTEMS = [
    { id: 'conversational-assistant', title: 'Conversational Assistant', cat: 'productivity', desc: 'A full chat-based AI assistant combining prompt composer, streaming response, and thread history into a cohesive conversational experience.' },
    { id: 'smart-document-editor', title: 'Smart Document Editor', cat: 'productivity', desc: 'An AI-powered writing environment with inline suggestions, selective regeneration, and version history for collaborative content creation.' },
    { id: 'ai-email-composer', title: 'AI Email Composer', cat: 'productivity', desc: 'An intelligent email drafting system combining structured prompts, tone adjustment, and context-aware templates for professional communication.' },
    { id: 'meeting-summarizer', title: 'Meeting Summarizer', cat: 'productivity', desc: 'An automated system that processes meeting recordings through voice input, generates structured summaries, and extracts actionable items.' },
    { id: 'predictive-analytics-console', title: 'Predictive Analytics Console', cat: 'analytics', desc: 'A dashboard combining AI-generated insights, confidence indicators, and data visualizations for data-driven decision making.' },
    { id: 'anomaly-detection-dashboard', title: 'Anomaly Detection Dashboard', cat: 'analytics', desc: 'A real-time monitoring system using AI to identify unusual patterns with explainability cards and configurable alert thresholds.' },
    { id: 'customer-insights-engine', title: 'Customer Insights Engine', cat: 'analytics', desc: 'An AI system that analyzes behavioral data and generates actionable user insights with source attribution and trend forecasting.' },
    { id: 'ai-content-studio', title: 'AI Content Studio', cat: 'creative', desc: 'A creative workspace bringing together image input, multi-variant output, and iterative editing for AI-assisted content production.' },
    { id: 'brand-voice-generator', title: 'Brand Voice Generator', cat: 'creative', desc: 'A system that learns brand guidelines and generates on-brand copy using configurable controls and quality feedback loops.' },
    { id: 'design-system-generator', title: 'Design System Generator', cat: 'creative', desc: 'An AI tool that generates UI components, color palettes, and typography systems from natural language design briefs.' },
    { id: 'intelligent-knowledge-base', title: 'Intelligent Knowledge Base', cat: 'enterprise', desc: 'An enterprise search system combining AI retrieval, citation cards, and confidence scoring for accurate knowledge discovery.' },
    { id: 'automated-workflow-builder', title: 'Automated Workflow Builder', cat: 'enterprise', desc: 'A visual AI workflow tool using agent commands, action review, and configurable controls to automate complex business processes.' },
    { id: 'ai-onboarding-wizard', title: 'AI Onboarding Wizard', cat: 'enterprise', desc: 'A paginated prompt system that guides new users through product setup using progressive disclosure and inline help.' },
    { id: 'compliance-reviewer', title: 'Compliance Reviewer', cat: 'enterprise', desc: 'An AI audit system combining document analysis, bias indicators, and explainability for automated regulatory compliance checking.' },
];

const MODULES = [
    { id: 'smart-scheduler', title: 'Smart Scheduler', cat: 'scheduling', desc: 'An interactive AI-powered calendar module that auto-suggests meeting times, resolves conflicts, and optimizes your daily routine.', preview: 'scheduling' },
    { id: 'intelligent-reporting', title: 'Intelligent Reporting', cat: 'reporting', desc: 'A dynamic report generator module that processes complex datasets, highlights anomalies, and auto-writes executive summaries.', preview: 'reporting' },
    { id: 'augmented-crm', title: 'Augmented CRM', cat: 'crm', desc: 'An automated CRM module that enriches lead data, drafts personalized outreach sequences, and scores pipeline health.', preview: 'crm' },
    { id: 'workflow-automation', title: 'Workflow Automation', cat: 'automation', desc: 'A drag-and-drop workflow module powered by AI to intuitively connect disparate tools and execute multi-step macros.', preview: 'automation' }
];

/* ─── Preview color map ─── */
const COLOR_MAP = {
    authoring: '#7c3aed', generation: '#2563eb', refinement: '#f59e0b',
    trust: '#17b26a', management: '#ec4899', input: '#3b82f6',
    display: '#06b6d4', feedback: '#f59e0b', control: '#8b5cf6',
    productivity: '#2563eb', analytics: '#17b26a', creative: '#ec4899', enterprise: '#7c3aed',
    scheduling: '#0ea5e9', reporting: '#f59e0b', crm: '#ef4444', automation: '#8b5cf6'
};

/* ─── Build a single card (no badge, unique thumbnail) ─── */
function buildCard(item, type) {
    const cat = item.cat;
    const previewClass = item.preview || cat;
    const accent = COLOR_MAP[cat] || '#7c3aed';
    const linkLabel = type === 'patterns' ? 'View Pattern' : type === 'components' ? 'View Component' : type === 'systems' ? 'View System' : 'View Module';
    const detailHref = `aidesign-detail.html?type=${type}&id=${item.id}`;
    const thumb = getThumb(item.id, accent);

    return `
    <div class="aid-card" data-category="${cat}">
      <div class="aid-card__preview aid-card__preview--${previewClass}">
        ${thumb}
      </div>
      <div class="aid-card__body">
        <h3 class="aid-card__title">${item.title}</h3>
        <p class="aid-card__desc">${item.desc}</p>
        <a href="${detailHref}" class="aid-card__link">
          ${linkLabel}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>`;
}

/* ─── Render grid ─── */
function renderGrid(gridId, items, type) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.innerHTML = items.map(i => buildCard(i, type)).join('');
}

/* ─── Filter logic ─── */
function setupFilters(containerId, gridId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.aid-filter');
        if (!btn) return;
        container.querySelectorAll('.aid-filter').forEach(b => b.classList.remove('aid-filter--active'));
        btn.classList.add('aid-filter--active');
        const filter = btn.dataset.filter;
        const grid = document.getElementById(gridId);
        grid.querySelectorAll('.aid-card').forEach(card => {
            card.style.display = (filter === 'all' || card.dataset.category === filter) ? '' : 'none';
        });
    });
}

/* ─── Tab switching ─── */
function setupTabs() {
    const tabBar = document.getElementById('aid-tabs');
    if (!tabBar) return;
    tabBar.addEventListener('click', (e) => {
        const tab = e.target.closest('.aid-tab');
        if (!tab) return;
        tabBar.querySelectorAll('.aid-tab').forEach(t => t.classList.remove('aid-tab--active'));
        tab.classList.add('aid-tab--active');
        const target = tab.dataset.tab;
        document.querySelectorAll('.aid-panel').forEach(p => p.classList.remove('aid-panel--active'));
        const panel = document.getElementById('panel-' + target);
        if (panel) panel.classList.add('aid-panel--active');
    });
}

/* ─── Init ─── */
document.addEventListener('DOMContentLoaded', () => {
    renderGrid('patterns-grid', PATTERNS, 'patterns');
    renderGrid('components-grid', COMPONENTS, 'components');
    renderGrid('systems-grid', SYSTEMS, 'systems');
    renderGrid('modules-grid', MODULES, 'modules');
    setupFilters('pattern-filters', 'patterns-grid');
    setupFilters('component-filters', 'components-grid');
    setupFilters('system-filters', 'systems-grid');
    setupFilters('module-filters', 'modules-grid');
    setupTabs();
});
