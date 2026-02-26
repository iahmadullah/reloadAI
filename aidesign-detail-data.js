/* ════════════════════════════════════════════════════════════
   AI DESIGN DETAIL — Content Data & Renderer
   ════════════════════════════════════════════════════════════ */

const DETAIL_DATA = {
    /* ─── PATTERNS ─── */
    'raw-text-input': {
        cat: 'Authoring', color: '#7c3aed', complexity: 'Low', bestFor: 'Chat interfaces, developer tools, power users',
        overview: 'Raw Text Input is the most fundamental AI interaction pattern. The user types a free-form text prompt directly into an input field, which is then sent to the AI model without additional structuring or abstraction. This mirrors how most people first experience AI — through a simple text box.',
        when: ['Building a conversational AI interface', 'Target users are comfortable with natural language prompting', 'The AI model handles a wide range of unstructured input well', 'Speed of input is prioritized over precision'],
        expectations: ['A responsive, accessible text area that handles multi-line input', 'Clear send/submit action with keyboard shortcut support', 'Visual feedback that the prompt is being processed', 'Ability to edit or recall previous prompts'],
        considerations: 'Keep the input area prominent and distraction-free. Consider auto-expanding the text area as users type longer prompts. Provide clear placeholder text that hints at what the user can ask. Support paste-to-prompt for multiline content and ensure the submit action is discoverable via both button and keyboard shortcut.',
        related: ['Voice Input', 'Image Input', 'Inline Suggestions', 'Prompt Templates']
    },

    'image-input': {
        cat: 'Authoring', color: '#7c3aed', complexity: 'Medium', bestFor: 'Creative tools, multimodal apps, accessibility features',
        overview: 'Image Input allows users to include an image alongside or instead of a text prompt, enabling multimodal interaction with the AI. This pattern is essential for visual tasks like image editing, visual search, or describing/analyzing images.',
        when: ['The AI model supports vision or multimodal inputs', 'Users need to reference visual content in their prompts', 'Building creative or design-oriented tools', 'Visual context is more efficient than textual description'],
        expectations: ['Drag-and-drop, paste, or file picker for image upload', 'Preview of the uploaded image before submission', 'Ability to combine image with text prompt', 'Clear feedback on supported formats and size limits'],
        considerations: 'Support multiple upload methods — drag-and-drop, clipboard paste, and traditional file picker. Show a clear preview with the option to remove or replace the image. Consider image compression and format validation client-side to avoid server errors.',
        related: ['Raw Text Input', 'Reference Material', 'Voice Input', 'File Drop Zone']
    },

    'voice-input': {
        cat: 'Authoring', color: '#7c3aed', complexity: 'Medium', bestFor: 'Hands-free use, accessibility, mobile-first apps',
        overview: 'Voice Input lets users speak their prompt instead of typing, leveraging speech-to-text to provide natural, hands-free interaction with AI. This pattern is increasingly important for accessibility and mobile contexts.',
        when: ['Users need hands-free interaction', 'Building for mobile or wearable devices', 'Accessibility is a key requirement', 'Conversational, natural language UX is desired'],
        expectations: ['Clear microphone button with visual recording indicator', 'Real-time transcription feedback as they speak', 'Ability to review and edit the transcribed text before sending', 'Graceful handling of background noise and errors'],
        considerations: 'Provide a prominent, easily tappable microphone button. Show a waveform or pulsing animation during recording. Always show the transcribed text so users can verify accuracy before sending. Consider offering noise cancellation hints and handle permissions gracefully.',
        related: ['Raw Text Input', 'Voice Waveform', 'Inline Suggestions']
    },

    'inline-help': {
        cat: 'Authoring', color: '#7c3aed', complexity: 'Low', bestFor: 'New users, complex prompting, enterprise tools',
        overview: 'Inline Help provides contextual guidance directly within the prompt authoring interface. Rather than separate documentation, users see tips, examples, and suggestions as they interact with the input area.',
        when: ['Users are unfamiliar with prompting best practices', 'The AI tool serves a specialized domain', 'Onboarding new users without interrupting workflow', 'Complex prompt structures need to be communicated'],
        expectations: ['Non-intrusive help that appears contextually', 'Actionable tips with example prompts they can use', 'Ability to dismiss or minimize help content', 'Progressive reduction — less help as user gains experience'],
        considerations: 'Balance helpfulness with minimalism. Inline help should never obstruct the primary input area. Use subtle visual treatments like muted text, info icons, or collapsible sections. Track user proficiency to reduce help over time.',
        related: ['Prompt Quality Feedback', 'Structured Prompt', 'Prompt Templates']
    },

    'inline-suggestions': {
        cat: 'Authoring', color: '#7c3aed', complexity: 'Medium', bestFor: 'Productivity tools, code editors, content creation',
        overview: 'Inline Suggestions provides AI-powered autocomplete that appears as the user types their prompt. Similar to code completion in IDEs, this pattern reduces cognitive load and helps users formulate better prompts faster.',
        when: ['Users frequently write similar types of prompts', 'Prompt quality significantly impacts output quality', 'Speed of input is important for user workflow', 'The system has enough context to make meaningful suggestions'],
        expectations: ['Suggestions appear quickly without lag', 'Easy accept/dismiss with keyboard shortcuts', 'Suggestions feel relevant and contextual', 'Clear visual distinction between typed and suggested text'],
        considerations: 'Latency is critical — suggestions must appear almost instantly. Use a ghost/muted text style for suggestions and allow Tab or Right-Arrow to accept. Ensure suggestions do not block or interfere with manual typing. Consider offering multiple suggestion variants.',
        related: ['Raw Text Input', 'Prompt Quality Feedback', 'Suggestion Chip']
    },

    'prompt-quality-feedback': {
        cat: 'Authoring', color: '#7c3aed', complexity: 'Medium', bestFor: 'Enterprise apps, precision-critical workflows',
        overview: 'Prompt Quality Feedback provides real-time indication of how well-structured or detailed a user\'s prompt is before submission. This helps users improve their prompts proactively, leading to better AI outputs.',
        when: ['Output quality is highly sensitive to prompt quality', 'Users may not know what constitutes a "good" prompt', 'Reducing regeneration cycles is a priority', 'Serving users with varying levels of AI experience'],
        expectations: ['Real-time, non-intrusive quality indicator', 'Clear guidance on what to improve', 'The meter reflects actual changes to the prompt', 'Optional — not blocking the submit action'],
        considerations: 'Use a visual meter (progress bar, color scale, or score) that updates as the user types. Provide specific suggestions, not just a score. Never block submission based on quality — this should be advisory. Consider showing before/after examples.',
        related: ['Inline Help', 'Quality Meter', 'Structured Prompt']
    },

    'structured-prompt': {
        cat: 'Authoring', color: '#7c3aed', complexity: 'High', bestFor: 'Complex workflows, non-technical users, enterprise',
        overview: 'Structured Prompt provides a form-like interface that guides users through the required fields and parameters needed for an effective prompt. Instead of a blank text box, users fill in specific sections.',
        when: ['The AI task requires specific types of information', 'Users are not experienced with prompt engineering', 'Consistent prompt structure improves output reliability', 'The domain has well-defined input requirements'],
        expectations: ['Clear, labeled fields for each prompt section', 'Helpful defaults and example values', 'Ability to see the assembled prompt before submission', 'Flexibility to switch to free-form if desired'],
        considerations: 'Design the form to feel lightweight, not bureaucratic. Use smart defaults and optional sections. Consider showing a live preview of the assembled prompt. Allow power users to bypass the structure and edit raw text directly.',
        related: ['Paginated Prompt', 'Configurable Controls', 'Cloze Passage']
    },

    'paginated-prompt': {
        cat: 'Authoring', color: '#7c3aed', complexity: 'High', bestFor: 'Wizard-style flows, onboarding, complex tasks',
        overview: 'Paginated Prompt breaks a structured prompt into sequential steps, presenting one section at a time. This reduces cognitive overload and creates a guided, wizard-like experience for complex AI interactions.',
        when: ['The prompt requires many parameters or sections', 'Users may feel overwhelmed by a single form', 'Step-by-step guidance improves completion rates', 'Each step can provide contextual help and validation'],
        expectations: ['Clear progress indication across steps', 'Ability to navigate back to previous steps', 'Validation feedback at each step, not just at the end', 'Summary/review step before final submission'],
        considerations: 'Keep each step focused on a single concept. Show progress clearly (step counter, progress bar). Allow keyboard navigation between steps. Provide a summary view before final submission so users can review everything.',
        related: ['Structured Prompt', 'Configurable Controls', 'Progressive Disclosure']
    },

    'reference-material': {
        cat: 'Authoring', color: '#7c3aed', complexity: 'Medium', bestFor: 'RAG systems, research tools, enterprise knowledge',
        overview: 'Reference Material allows users to attach specific documents, files, or data for the AI to use as context when generating its response. This pattern is essential for RAG (Retrieval Augmented Generation) workflows.',
        when: ['Users need AI responses grounded in specific documents', 'Building enterprise knowledge or research tools', 'Accuracy and specificity are critical', 'The AI needs domain-specific context not in its training data'],
        expectations: ['Easy file upload with format validation', 'Clear indication of which files are in context', 'Ability to add or remove reference materials', 'Transparency about how references influence the output'],
        considerations: 'Support common file formats and show clear upload progress. Display active references as removable chips or cards. Consider file size limits and provide meaningful errors. Show users when and how references were used in the output.',
        related: ['File Drop Zone', 'Context Chip', 'Image Input', 'Show Citations']
    },

    'prompt-templates': {
        cat: 'Authoring', color: '#7c3aed', complexity: 'Low', bestFor: 'Repeat tasks, team workflows, onboarding',
        overview: 'Prompt Templates provides a library of pre-written or user-saved prompt structures that can be quickly loaded and customized. This dramatically speeds up repeat workflows and helps new users learn effective prompting.',
        when: ['Users perform similar AI tasks repeatedly', 'Onboarding users who need prompt inspiration', 'Standardizing prompt quality across a team', 'Reducing time-to-first-prompt for new sessions'],
        expectations: ['Browsable, searchable template library', 'One-click loading with customizable variables', 'Ability to save personal templates', 'Template categories that match user workflows'],
        considerations: 'Organize templates by use case and domain. Allow users to save and share their own templates. Support template variables (placeholders) so templates are reusable. Consider featuring community or team templates prominently.',
        related: ['Structured Prompt', 'Prompt Placeholder Values', 'Cloze Passage']
    },

    'cloze-passage': {
        cat: 'Authoring', color: '#7c3aed', complexity: 'Medium', bestFor: 'Natural language forms, accessible interfaces',
        overview: 'Cloze Passage presents prompt variables embedded within a conversational sentence or paragraph, creating a fill-in-the-blank experience. Users complete a natural language passage rather than filling in form fields.',
        when: ['A conversational input style feels more natural', 'Users benefit from seeing prompt context around their inputs', 'The prompt has a narrative structure', 'Reducing the formality of structured prompts'],
        expectations: ['Clear, highlighted blanks within flowing text', 'Easy tab-navigation between fill-in areas', 'Meaningful default or example values in blanks', 'The completed passage reads naturally'],
        considerations: 'Ensure the passage reads naturally with any combination of inputs. Highlight active blanks clearly and support keyboard tab-navigation. Show helpful placeholder text in each blank. Consider making the passage editable as a whole for power users.',
        related: ['Structured Prompt', 'Prompt Templates', 'Prompt Placeholder Values']
    },

    'configurable-controls': {
        cat: 'Authoring', color: '#7c3aed', complexity: 'High', bestFor: 'No-code tools, non-technical users, enterprise',
        overview: 'Configurable Controls replaces text-based prompting entirely with visual controls — sliders, toggles, dropdowns, and selectors. Users configure their AI request through a familiar form interface without writing any prompt text.',
        when: ['Users are non-technical or unfamiliar with prompting', 'The AI task has well-defined parameters', 'Consistency of input format is critical', 'Building no-code AI tools for broad audiences'],
        expectations: ['Intuitive, familiar form controls', 'Real-time preview of how settings affect output', 'Clear labels and tooltips for each control', 'Sensible defaults that work out of the box'],
        considerations: 'Map each control to a clear prompt parameter. Provide real-time previews or examples of how each setting affects the output. Use progressive disclosure to show advanced options only when needed. Always offer sensible defaults.',
        related: ['Temperature Slider', 'Model Selector', 'Structured Prompt']
    },

    'streaming-response': {
        cat: 'Generation', color: '#2563eb', complexity: 'Medium', bestFor: 'Chat interfaces, real-time applications',
        overview: 'Streaming Response displays AI output token-by-token in real-time as it is generated, rather than waiting for the complete response. This gives users immediate feedback and reduces perceived wait time.',
        when: ['Response generation takes more than a few seconds', 'Users benefit from reading output progressively', 'Building conversational or chat-style interfaces', 'Reducing perceived latency is important'],
        expectations: ['Smooth, readable token-by-token rendering', 'No flickering or layout shifts during streaming', 'Ability to stop generation mid-stream', 'Clear indication when generation is complete'],
        considerations: 'Ensure smooth rendering without layout jumps. Provide a stop/cancel button visible during generation. Handle markdown rendering gracefully as tokens arrive. Consider showing a subtle cursor or typing indicator at the generation point.',
        related: ['Skeleton Loading', 'Progressive Disclosure', 'AI Response Bubble']
    },

    'progressive-disclosure': {
        cat: 'Generation', color: '#2563eb', complexity: 'Medium', bestFor: 'Complex outputs, dashboards, enterprise tools',
        overview: 'Progressive Disclosure reveals AI results in layers — starting with a summary or key points and allowing users to drill down into details on demand. This prevents information overload.',
        when: ['AI output is long or complex', 'Users need to quickly assess relevance before diving deeper', 'Building dashboards or multi-section outputs', 'Different users need different levels of detail'],
        expectations: ['Clear summary or headline visible first', 'Intuitive expand/collapse interactions', 'Consistent hierarchy from overview to detail', 'Ability to expand all sections at once'],
        considerations: 'Start with the most actionable information. Use clear visual hierarchy to indicate expandable sections. Allow users to expand individual sections or all at once. Consider remembering user preferences for disclosure level.',
        related: ['Streaming Response', 'Paginated Prompt', 'Result Actions']
    },

    'skeleton-loading': {
        cat: 'Generation', color: '#2563eb', complexity: 'Low', bestFor: 'Any AI interface with generation delay',
        overview: 'Skeleton Loading shows placeholder shapes that mimic the expected output layout while AI content is being generated. This reduces perceived wait time and prevents jarring layout shifts.',
        when: ['AI generation takes a noticeable amount of time', 'The output layout structure is predictable', 'Reducing perceived loading time matters', 'Preventing cumulative layout shift in the UI'],
        expectations: ['Skeletons match the expected output layout', 'Smooth animation (pulse or shimmer)', 'Quick transition from skeleton to real content', 'No layout shift when content replaces skeleton'],
        considerations: 'Match skeleton shapes to actual content dimensions. Use a subtle shimmer animation, not aggressive flashing. Ensure zero layout shift when real content loads. For unpredictable formats, use a generic but representative skeleton.',
        related: ['Streaming Response', 'Progressive Disclosure', 'Confidence Indicators']
    },

    'confidence-indicators': {
        cat: 'Generation', color: '#2563eb', complexity: 'High', bestFor: 'Medical, legal, financial, and high-stakes AI',
        overview: 'Confidence Indicators display the AI model\'s certainty level for different parts of its output. This helps users make informed decisions about which parts of the AI response to trust.',
        when: ['Accuracy is critical for the use case', 'Users need to verify or fact-check AI output', 'The model provides confidence scores', 'Building for high-stakes domains (medical, legal, financial)'],
        expectations: ['Clear visual encoding (color, icon, or score) for confidence', 'Consistent placement across the interface', 'Explanation of what confidence levels mean', 'Ability to filter or sort by confidence'],
        considerations: 'Use a clear, colorblind-safe color scale (green→yellow→red). Avoid over-precision — three to five levels is usually sufficient. Explain what confidence means in context. Consider letting users set confidence thresholds for visibility.',
        related: ['Show Citations', 'Explainability Cards', 'Bias Indicators', 'Confidence Badge']
    },

    'multi-variant-output': {
        cat: 'Generation', color: '#2563eb', complexity: 'High', bestFor: 'Creative tools, A/B testing, design generation',
        overview: 'Multi-Variant Output generates multiple result options from a single prompt, allowing users to compare and choose the best option. This pattern acknowledges the non-deterministic nature of AI.',
        when: ['Creative or subjective outputs where preference matters', 'Users benefit from having options to choose from', 'The AI model supports temperature/seed variation', 'A/B comparison improves decision quality'],
        expectations: ['Side-by-side or carousel comparison of variants', 'Ability to select, combine, or iterate on favorites', 'Clear labeling of each variant', 'Consistent layout across all variants'],
        considerations: 'Limit the number of variants to avoid choice paralysis (3-4 is ideal). Allow users to favorite or bookmark specific variants. Support combining elements from different variants. Show variants in a consistent, comparable layout.',
        related: ['Result Carousel', 'Result Actions', 'Iterative Editing']
    },

    'result-rendered-preview': {
        cat: 'Generation', color: '#2563eb', complexity: 'Medium', bestFor: 'Code generation, design tools, content creation',
        overview: 'Result Rendered Preview shows a live, visual rendering of generated content alongside or instead of raw output. For code, this means a working preview; for design, a visual mockup; for content, formatted output.',
        when: ['The AI generates code, design, or formatted content', 'Users need to see the visual result, not just raw output', 'Quick visual validation saves time', 'Building creative or development tools'],
        expectations: ['Accurate, real-time rendering of generated content', 'Toggle between raw output and rendered preview', 'Responsive preview that works at different sizes', 'Ability to interact with the rendered preview'],
        considerations: 'Ensure the preview accurately represents the final output. Provide a toggle between raw and rendered views. Consider sandboxing code previews for security. Support responsive preview sizes for different device targets.',
        related: ['Streaming Response', 'Multi-Variant Output', 'Diff Viewer']
    },

    'iterative-editing': {
        cat: 'Refinement', color: '#f59e0b', complexity: 'Medium', bestFor: 'Content creation, document editing, creative work',
        overview: 'Iterative Editing allows users to make targeted modifications to AI output through successive rounds of feedback, naturally converging on the desired result.',
        when: ['Users need to fine-tune AI output', 'The first generation rarely matches exact expectations', 'Building content creation or editing tools', 'Users have clear ideas about specific improvements needed'],
        expectations: ['Easy inline editing of AI output', 'Clear "improve this" type actions per section', 'History of iterations for comparison', 'Undo/redo support across iterations'],
        considerations: 'Support both direct text editing and instruction-based refinement. Keep iteration history accessible but not cluttering. Allow "improve this section" style targeted refinement. Show a clear diff between iterations when helpful.',
        related: ['Selective Regeneration', 'Version History', 'Feedback Loop', 'Diff Viewer']
    },

    'selective-regeneration': {
        cat: 'Refinement', color: '#f59e0b', complexity: 'High', bestFor: 'Long-form content, complex outputs, precise control',
        overview: 'Selective Regeneration allows users to regenerate specific sections of an AI result while keeping the rest intact. This provides granular control over the output.',
        when: ['AI output is long or has multiple distinct sections', 'Most of the output is acceptable but specific parts need improvement', 'Full regeneration would waste good content', 'Users want precise, surgical control over output'],
        expectations: ['Clear section boundaries with regenerate controls', 'The rest of the output remains stable during regeneration', 'Ability to provide additional context for the regeneration', 'Undo option if the new section is worse'],
        considerations: 'Define clear, logical section boundaries. Show a targeted regenerate button on hover or selection. Allow users to provide additional instructions for the targeted section. Always offer undo to revert to the previous version.',
        related: ['Full Regeneration', 'Iterative Editing', 'Result Actions']
    },

    'feedback-loop': {
        cat: 'Refinement', color: '#f59e0b', complexity: 'Low', bestFor: 'Personalized AI, recommendation systems, learning models',
        overview: 'Feedback Loop provides mechanisms (thumbs up/down, ratings, corrections) that help the AI learn user preferences over time, creating a progressively more personalized experience.',
        when: ['The AI can learn from user feedback', 'Personalization improves the value proposition', 'Building recommendation or suggestion systems', 'Long-term user relationships where quality should improve'],
        expectations: ['Simple, low-friction feedback mechanisms', 'Visible impact of feedback on future results', 'Privacy transparency about how feedback is used', 'Option to reset or adjust learned preferences'],
        considerations: 'Keep feedback actions simple — one click maximum. Show users that their feedback has impact over time. Be transparent about data usage and privacy. Allow users to view and reset their preference profile.',
        related: ['Feedback Thumbs', 'Result Actions', 'Quality Meter']
    },

    'version-history': {
        cat: 'Refinement', color: '#f59e0b', complexity: 'Medium', bestFor: 'Content editing, collaborative tools, audit trails',
        overview: 'Version History tracks different iterations of AI-generated content, allowing users to navigate between versions, compare changes, and restore previous outputs.',
        when: ['Users iterate through multiple generations', 'Reverting to previous versions is a common need', 'Building collaborative or audited environments', 'Content passes through multiple revision rounds'],
        expectations: ['Chronological list of all versions', 'Quick preview without losing current position', 'One-click restore of any previous version', 'Visual diff between any two versions'],
        considerations: 'Show timestamps and brief descriptions for each version. Support quick preview without committing to a restore. Provide visual diffs between versions. Consider auto-saving versions at meaningful checkpoints, not every keystroke.',
        related: ['Iterative Editing', 'Selective Regeneration', 'Diff Viewer']
    },

    'result-actions': {
        cat: 'Refinement', color: '#f59e0b', complexity: 'Low', bestFor: 'Any AI interface with actionable output',
        overview: 'Result Actions provides contextually relevant action buttons on AI output — copy, edit, share, save, regenerate — enabling users to quickly act on generated results.',
        when: ['Users need to do something with the AI output', 'Common next-steps are predictable', 'Reducing friction between generation and action', 'Building productivity-oriented AI tools'],
        expectations: ['Relevant actions visible on hover or always present', 'One-click actions for common tasks (copy, share)', 'Confirmation for destructive actions', 'Keyboard shortcuts for power users'],
        considerations: 'Prioritize the 2-3 most common actions visually. Use icons with labels for clarity. Show secondary actions in an overflow menu. Provide visual feedback (toast, animation) when an action is performed.',
        related: ['Result Carousel', 'Feedback Loop', 'Full Regeneration']
    },

    'full-regeneration': {
        cat: 'Refinement', color: '#f59e0b', complexity: 'Low', bestFor: 'Quick iterations, exploration, creative brainstorming',
        overview: 'Full Regeneration provides a one-click action to completely regenerate the AI response when the output doesn\'t meet expectations. This is the simplest refinement pattern.',
        when: ['The output is fundamentally off-target', 'Users want to explore different AI responses', 'The prompt is already good but the output varied due to randomness', 'Quick iteration speed is valued over precision'],
        expectations: ['Prominent, easily accessible regenerate button', 'Previous result preserved or accessible in history', 'Option to adjust prompt before regenerating', 'Fast regeneration time'],
        considerations: 'Place the regenerate button prominently near the output. Consider preserving the previous result for comparison. Allow users to optionally adjust their prompt before regenerating. If possible, explain why results differ between generations.',
        related: ['Selective Regeneration', 'Result Actions', 'Regenerate Button']
    },

    'show-citations': {
        cat: 'Trust', color: '#17b26a', complexity: 'Medium', bestFor: 'Research, legal, medical, academic applications',
        overview: 'Show Citations provides clear links to the sources the AI used when generating its response, enabling users to verify claims and build trust in the output.',
        when: ['Accuracy and trustworthiness are critical', 'Users need to verify AI-generated information', 'Building for academic, legal, or medical contexts', 'The AI model supports source attribution'],
        expectations: ['Inline citation markers linked to sources', 'Expandable source previews without leaving the page', 'Source quality indicators when available', 'Ability to check the original source directly'],
        considerations: 'Use numbered inline citations that link to expandable references. Show source previews so users can assess relevance without navigating away. Indicate source freshness or reliability when possible. Group citations by type or relevance.',
        related: ['Source Attribution', 'Citation Card', 'Explainability Cards']
    },

    'explainability-cards': {
        cat: 'Trust', color: '#17b26a', complexity: 'High', bestFor: 'Enterprise AI, regulated industries, complex decisions',
        overview: 'Explainability Cards provide visual breakdowns explaining the reasoning behind AI decisions or recommendations, making the AI\'s "thought process" transparent to users.',
        when: ['Users need to understand why the AI made a specific recommendation', 'Building for regulated industries with explainability requirements', 'Trust is a key adoption barrier', 'Complex AI decisions affect important outcomes'],
        expectations: ['Clear, visual explanation of key factors', 'Digestible format (not raw model internals)', 'Ability to drill into specific factors', 'Non-technical language appropriate to the audience'],
        considerations: 'Translate model internals into human-readable explanations. Use visual aids like charts, weighted factors, or decision trees. Allow progressive depth — start simple, allow drill-down. Tailor the language to the user\'s technical level.',
        related: ['Show Citations', 'Bias Indicators', 'Confidence Indicators']
    },

    'bias-indicators': {
        cat: 'Trust', color: '#17b26a', complexity: 'High', bestFor: 'HR tools, content moderation, decision support',
        overview: 'Bias Indicators flag potential biases in AI output, helping users identify and account for systematic skews in generated content or recommendations.',
        when: ['AI output could reflect or amplify biases', 'Building tools that impact people (HR, lending, moderation)', 'Regulatory compliance requires bias monitoring', 'Ethical AI practices are a product priority'],
        expectations: ['Non-alarmist, informative bias flags', 'Explanation of what type of bias is detected', 'Suggestions for mitigating or accounting for bias', 'Ability to review flagged content in context'],
        considerations: 'Use neutral, informative language — avoid alarming users unnecessarily. Explain the type and direction of bias detected. Provide actionable next steps, not just warnings. Consider allowing users to configure bias sensitivity thresholds.',
        related: ['Explainability Cards', 'Show Citations', 'Confidence Indicators']
    },

    'source-attribution': {
        cat: 'Trust', color: '#17b26a', complexity: 'Medium', bestFor: 'Content curation, knowledge bases, research tools',
        overview: 'Source Attribution clearly links generated content back to its origin — whether training data, uploaded references, or external sources — providing a transparent chain of provenance.',
        when: ['Content originality or provenance matters', 'Users need to distinguish AI-original from sourced content', 'Building content creation tools with IP considerations', 'Transparency about data sources is a requirement'],
        expectations: ['Clear visual marking of attributed content', 'Linked references to original sources', 'Distinction between AI-generated and sourced content', 'Export or citation format options'],
        considerations: 'Visually distinguish attributed content from AI-original content. Provide direct links to source materials. Support standard citation formats for academic or professional use. Be transparent about attribution limitations.',
        related: ['Show Citations', 'Citation Card', 'Reference Material']
    },

    'model-selection': {
        cat: 'Management', color: '#ec4899', complexity: 'Medium', bestFor: 'Multi-model platforms, power users, enterprise tools',
        overview: 'Model Selection gives users control over which AI model they use for generation, allowing them to choose based on speed, quality, cost, or specialization.',
        when: ['Multiple AI models are available', 'Different models excel at different tasks', 'Users are cost-conscious about token usage', 'Power users want fine-grained control'],
        expectations: ['Clear model comparison (speed, quality, cost)', 'Easy switching between models', 'Persistent preference saving', 'Model-specific capability indicators'],
        considerations: 'Show meaningful model comparisons, not just names. Indicate which model is recommended for the current task. Save user preferences but make switching effortless. Consider showing estimated cost or token usage per model.',
        related: ['Thread Options', 'Generation Tokens', 'Model Selector']
    },

    'thread-options': {
        cat: 'Management', color: '#ec4899', complexity: 'Low', bestFor: 'Conversational AI, research workflows, exploration',
        overview: 'Thread Options gives users control over conversation threading — whether to continue an existing conversation thread, start fresh, or branch into a new direction.',
        when: ['Users have multi-turn conversations with AI', 'Context accumulation affects output quality', 'Users need to organize different topics or tasks', 'Building chat-style AI interfaces'],
        expectations: ['Clear indication of current thread context', 'Easy new thread creation', 'Thread naming and organization', 'Visual thread history'],
        considerations: 'Show the current context window size or thread length. Make starting a new thread easy but not accidental. Support thread naming for organization. Consider auto-summarizing long threads to save context window.',
        related: ['Thread History', 'Model Selection', 'Context Window']
    },

    'thread-history': {
        cat: 'Management', color: '#ec4899', complexity: 'Low', bestFor: 'Returning users, research, audit trails',
        overview: 'Thread History provides a chronological record of all AI conversations, allowing users to revisit, search, and continue previous interactions.',
        when: ['Users return to the tool frequently', 'Previous conversations contain valuable content', 'Search and retrieval of past AI interactions is needed', 'Building for audit or compliance requirements'],
        expectations: ['Searchable, filterable conversation list', 'Quick preview without full navigation', 'Continuation from where the conversation left off', 'Export or sharing capabilities'],
        considerations: 'Show meaningful previews — first message or summary, not just timestamps. Support full-text search across conversation history. Allow bulk actions (delete, archive, export). Consider auto-categorization of conversations.',
        related: ['Thread Options', 'Version History', 'Context Window']
    },

    'generation-tokens': {
        cat: 'Management', color: '#ec4899', complexity: 'Medium', bestFor: 'Paid AI products, enterprise resource management',
        overview: 'Generation Tokens shows users their allocated or remaining AI usage credits, enabling them to manage their consumption and understand the cost of AI interactions.',
        when: ['AI usage has a direct cost', 'Users have allocated budgets or quotas', 'Transparency about resource consumption is important', 'Building paid or tiered AI products'],
        expectations: ['Clear, real-time token/credit display', 'Usage breakdown by model, task, or time period', 'Warnings before reaching limits', 'Easy upgrade or top-up path'],
        considerations: 'Show usage prominently but not anxiously. Provide estimated cost before generation where possible. Send timely notifications before limits are reached. Consider per-generation cost estimates to help users make informed choices.',
        related: ['Model Selection', 'Token Counter', 'Thread History']
    },

    'agent-initial-command': {
        cat: 'Management', color: '#ec4899', complexity: 'High', bestFor: 'Automation tools, workflow builders, enterprise ops',
        overview: 'Agent Initial Command defines the starting instruction for an AI agent that will execute tasks autonomously. This pattern sets the scope, constraints, and goals for AI-driven automation.',
        when: ['Building AI agents that act autonomously', 'Complex tasks require clear scoping and constraints', 'Users need to define boundaries for AI behavior', 'Automation tools with multi-step workflows'],
        expectations: ['Clear command input with scope definition', 'Preview of the agent\'s understanding of the task', 'Boundary and constraint settings', 'Confirmation step before autonomous execution'],
        considerations: 'Make the command input structured enough to be clear but flexible enough for complex tasks. Always show the agent\'s interpretation before execution begins. Provide clear constraint settings (budget, time, permissions). Include an emergency stop mechanism.',
        related: ['Agent Action Review', 'Structured Prompt', 'Configurable Controls']
    },

    'agent-action-review': {
        cat: 'Management', color: '#ec4899', complexity: 'High', bestFor: 'High-stakes automation, enterprise, compliance-critical',
        overview: 'Agent Action Review provides a checkpoint where users can review an AI agent\'s planned actions and approve or modify them before execution. This is critical for AI safety and trust.',
        when: ['AI agents perform actions with real consequences', 'Regulatory requirements mandate human-in-the-loop', 'Building trust in AI autonomy gradually', 'Actions are irreversible or high-impact'],
        expectations: ['Clear summary of planned actions in plain language', 'Ability to approve, modify, or reject each action', 'Risk indicators for high-impact actions', 'Audit trail of approved and executed actions'],
        considerations: 'Present planned actions in clear, non-technical language. Highlight high-risk or irreversible actions prominently. Allow granular approval — individual actions, not just all-or-nothing. Maintain a complete audit log of decisions.',
        related: ['Agent Initial Command', 'Explainability Cards', 'Confidence Indicators']
    },

    /* ─── COMPONENTS ─── */
    'prompt-composer': {
        cat: 'Input', color: '#3b82f6', complexity: 'High', bestFor: 'Chat interfaces, content creation tools',
        overview: 'A rich text input component purpose-built for AI prompting. Combines text editing, file attachments, model selection, and formatting in a unified, polished interface.',
        when: ['Building the primary input for an AI interface', 'Users need rich editing capabilities', 'Multiple input types (text, file, voice) must coexist', 'The prompt input is a focal point of the UI'],
        expectations: ['Multi-line, auto-expanding text area', 'Attachment support (files, images)', 'Keyboard shortcuts for common actions', 'Clean, focused design that invites interaction'],
        considerations: 'Prioritize typing experience — fast, clean, no lag. Support markdown or rich text formatting. Provide clear affordances for attachments and voice input. Consider a "command palette" style shortcut system for power users.',
        related: ['Token Counter', 'Context Chip', 'Voice Waveform', 'File Drop Zone']
    },

    'voice-waveform': {
        cat: 'Input', color: '#3b82f6', complexity: 'Medium', bestFor: 'Voice-enabled apps, mobile interfaces',
        overview: 'A real-time audio visualization component that displays waveform, spectrum, or amplitude feedback while a user is providing voice input to the AI system.',
        when: ['Voice input is a primary interaction method', 'Users need visual confirmation that audio is being captured', 'Building accessible or mobile-first interfaces', 'Real-time audio level feedback improves quality'],
        expectations: ['Smooth, real-time audio visualization', 'Clear recording/listening state indicators', 'Works across device types and browsers', 'Minimal performance impact'],
        considerations: 'Choose a visualization style (waveform, circular, bars) that matches your design language. Ensure smooth 60fps animation. Handle browser audio permissions gracefully. Provide a fallback for devices without microphone access.',
        related: ['Voice Input', 'Prompt Composer']
    },

    'file-drop-zone': {
        cat: 'Input', color: '#3b82f6', complexity: 'Low', bestFor: 'Reference-based AI, document processing',
        overview: 'A drag-and-drop component for uploading files (documents, images, data) that the AI will use as context or input material.',
        when: ['Users need to provide reference files to the AI', 'Document or image processing is a core workflow', 'Multi-file uploads are common', 'Simple, intuitive upload UX is needed'],
        expectations: ['Clear drop target with visual feedback', 'Upload progress for each file', 'File type validation with helpful errors', 'Preview or details for uploaded files'],
        considerations: 'Support drag-and-drop, click-to-browse, and paste. Show file type icons and previews where possible. Provide clear progress indicators during upload. Handle edge cases like unsupported formats gracefully.',
        related: ['Reference Material', 'Context Chip', 'Image Input']
    },

    'context-chip': {
        cat: 'Input', color: '#3b82f6', complexity: 'Low', bestFor: 'Any AI interface with active context',
        overview: 'Compact, tag-like elements representing active context items — selected files, active personas, model parameters, or conversation references — that are part of the current AI session.',
        when: ['Multiple context items influence AI behavior', 'Users need visibility into what\'s active', 'Context can be added or removed dynamically', 'Compact representation is needed in limited space'],
        expectations: ['Clear, readable labels', 'Easy removal (X button or click)', 'Consistent styling across context types', 'Tooltip with additional details on hover'],
        considerations: 'Keep chips compact but readable. Use icons or colors to differentiate context types. Always provide easy removal. Consider a "context tray" that expands to show all active context when chips overflow.',
        related: ['Reference Material', 'Prompt Composer', 'Context Window']
    },

    'token-counter': {
        cat: 'Input', color: '#3b82f6', complexity: 'Low', bestFor: 'Developer tools, cost-conscious users, enterprise',
        overview: 'A live counter displaying current prompt token usage relative to the AI model\'s context window limit, helping users stay within bounds.',
        when: ['Token limits affect functionality or cost', 'Users write long or complex prompts', 'Transparency about resource usage matters', 'Building for cost-conscious enterprise users'],
        expectations: ['Real-time count that updates as user types', 'Clear maximum limit display', 'Visual warning as limit approaches', 'Tooltip explaining token concept if needed'],
        considerations: 'Use a progress-bar style display for intuitive understanding. Change color as the limit approaches (green→yellow→red). Consider showing estimated cost alongside token count. Provide a brief explainer for users unfamiliar with tokens.',
        related: ['Generation Tokens', 'Prompt Composer', 'Model Selector']
    },

    'ai-response-bubble': {
        cat: 'Display', color: '#06b6d4', complexity: 'Medium', bestFor: 'Conversational AI, chat interfaces',
        overview: 'A styled container for AI-generated responses, featuring streaming animation, rich content rendering, and contextual action buttons.',
        when: ['Building chat or conversational interfaces', 'AI responses need clear visual distinction from user input', 'Rich content (markdown, code, images) appears in responses', 'Action buttons need to be attached to responses'],
        expectations: ['Clear visual distinction from user messages', 'Smooth streaming text animation', 'Rich content rendering (markdown, code blocks)', 'Contextual action buttons (copy, regenerate, share)'],
        considerations: 'Use subtle visual cues (avatar, background color, alignment) to distinguish AI from user messages. Support rich markdown rendering including code syntax highlighting. Attach action buttons that appear on hover or focus. Handle very long responses with graceful scrolling.',
        related: ['Streaming Response', 'Result Actions', 'Feedback Thumbs']
    },

    'confidence-badge': {
        cat: 'Display', color: '#06b6d4', complexity: 'Low', bestFor: 'Data-driven apps, decision support',
        overview: 'A compact, color-coded badge indicating the confidence level of an AI output segment — typically using high/medium/low or a percentage score.',
        when: ['AI output includes confidence metadata', 'Users need to quickly assess reliability', 'Building decision-support or advisory tools', 'Comparing multiple AI results'],
        expectations: ['Intuitive color coding (green/yellow/red)', 'Consistent placement and sizing', 'Hover tooltip with details', 'Accessible to colorblind users (icons + colors)'],
        considerations: 'Use both color and icon/text for accessibility. Keep the badge small and non-intrusive. Provide hover details explaining the confidence level. Use consistent placement so users develop scanning patterns.',
        related: ['Confidence Indicators', 'Quality Meter', 'Explainability Cards']
    },

    'citation-card': {
        cat: 'Display', color: '#06b6d4', complexity: 'Medium', bestFor: 'Research tools, knowledge bases, legal AI',
        overview: 'An expandable card component that displays source information for AI-cited content, including title, snippet, URL, and relevance score.',
        when: ['AI output includes citations or references', 'Users need to verify source material', 'Building research or academic tools', 'Transparency about AI sources is required'],
        expectations: ['Compact default view with expand option', 'Source title, snippet, and link', 'Relevance or reliability indicator', 'Quick navigation to original source'],
        considerations: 'Show a compact preview by default with an expand action. Include clearly clickable source links. Consider grouping citations by relevance or type. Support citation export in standard formats.',
        related: ['Show Citations', 'Source Attribution', 'Reference Material']
    },

    'diff-viewer': {
        cat: 'Display', color: '#06b6d4', complexity: 'High', bestFor: 'Content editing, code review, version comparison',
        overview: 'A side-by-side or inline comparison component showing the differences between original content and AI-modified content with highlighted additions, deletions, and changes.',
        when: ['Users need to review AI-made changes to existing content', 'Building editing or revision tools', 'Transparency about modifications is important', 'Code review or document comparison workflows'],
        expectations: ['Clear highlighting of additions, deletions, and changes', 'Side-by-side or inline view options', 'Easy accept/reject per change', 'Performance with large documents'],
        considerations: 'Support both inline and side-by-side views. Use standard diff colors (green for additions, red for deletions). Allow per-change accept/reject for granular control. Optimize performance for large documents with virtual scrolling.',
        related: ['Version History', 'Iterative Editing', 'Selective Regeneration']
    },

    'result-carousel': {
        cat: 'Display', color: '#06b6d4', complexity: 'Medium', bestFor: 'Image generation, creative tools, variant comparison',
        overview: 'A swipeable or navigable gallery component for viewing multiple AI output variations, supporting easy comparison and selection.',
        when: ['AI generates multiple result options', 'Visual comparison between variants is important', 'Building image generation or creative tools', 'Users need to browse and select from options'],
        expectations: ['Smooth swipe/navigation between variants', 'Variant numbering or labeling', 'Select/favorite action per variant', 'Consistent card sizing across variants'],
        considerations: 'Support both swipe gestures and button navigation. Show variant count and current position. Allow favoriting or selecting specific variants. Consider a grid view alternative for seeing all variants at once.',
        related: ['Multi-Variant Output', 'Result Actions', 'Feedback Thumbs']
    },

    'suggestion-chip': {
        cat: 'Feedback', color: '#f59e0b', complexity: 'Low', bestFor: 'Conversational AI, onboarding, guided prompting',
        overview: 'Tappable, pill-shaped UI elements that suggest follow-up prompts, refinements, or related queries, helping users continue their AI interaction.',
        when: ['Users may not know what to ask next', 'Follow-up suggestions improve engagement', 'Building conversational or exploratory interfaces', 'Reducing the "blank page" problem after first response'],
        expectations: ['Relevant, contextual suggestions', 'Single-tap to use as next prompt', 'Subtle, non-intrusive placement', 'Suggestions update based on conversation context'],
        considerations: 'Generate suggestions based on conversation context, not generically. Place chips near but not overlapping the input area. Limit to 3-5 suggestions to avoid choice paralysis. Allow users to dismiss or regenerate suggestions.',
        related: ['Inline Suggestions', 'Prompt Templates', 'Feedback Thumbs']
    },

    'feedback-thumbs': {
        cat: 'Feedback', color: '#f59e0b', complexity: 'Low', bestFor: 'Any AI interface with quality improvement goals',
        overview: 'Simple thumbs up/down buttons attached to AI responses, enabling one-click quality feedback that can be used to improve AI performance over time.',
        when: ['Collecting user feedback on AI output quality', 'Building feedback loops for model improvement', 'Low-friction signal collection is needed', 'RLHF (Reinforcement Learning from Human Feedback) data collection'],
        expectations: ['Prominent but non-intrusive placement', 'One-click action without forms or explanations', 'Optional: expanded feedback form on thumbs-down', 'Visual confirmation that feedback was received'],
        considerations: 'Place feedback buttons consistently on every AI response. Make thumbs-down optionally expandable for detailed feedback. Show visual confirmation (animation, color change) when clicked. Don\'t require login or additional steps to provide feedback.',
        related: ['Feedback Loop', 'Result Actions', 'Quality Meter']
    },

    'quality-meter': {
        cat: 'Feedback', color: '#f59e0b', complexity: 'Medium', bestFor: 'Prompt authoring, enterprise accuracy tools',
        overview: 'A visual progress bar or meter that indicates the quality, completeness, or specificity of the user\'s current prompt as they type.',
        when: ['Prompt quality dramatically affects output quality', 'Users benefit from real-time quality guidance', 'Building enterprise tools where precision matters', 'Reducing low-quality prompts saves compute resources'],
        expectations: ['Real-time updates as the user types', 'Color-coded quality levels', 'Specific improvement suggestions', 'Non-blocking — advisory only'],
        considerations: 'Use a color gradient (red→yellow→green) for intuitive quality indication. Provide specific, actionable tips alongside the meter. Never block submission based on quality score. Consider gamification elements to encourage better prompts.',
        related: ['Prompt Quality Feedback', 'Inline Help', 'Token Counter']
    },

    'toast-notification': {
        cat: 'Feedback', color: '#f59e0b', complexity: 'Low', bestFor: 'Background AI processing, asynchronous tasks',
        overview: 'Non-intrusive notification alerts for AI status changes — generation complete, errors, warnings, or status updates — that don\'t interrupt the user\'s current task.',
        when: ['AI processes run in the background', 'Status updates are important but not urgent', 'Multiple AI tasks run simultaneously', 'Users need to be informed without interruption'],
        expectations: ['Non-blocking, dismissible notifications', 'Clear categorization (success, error, warning, info)', 'Auto-dismiss after appropriate duration', 'Action buttons for relevant follow-ups'],
        considerations: 'Position consistently (usually bottom-right or top-center). Auto-dismiss success notifications after 3-5 seconds. Keep error notifications visible until dismissed. Support stacking for multiple simultaneous notifications.',
        related: ['Streaming Response', 'Confidence Indicators']
    },

    'model-selector': {
        cat: 'Control', color: '#8b5cf6', complexity: 'Medium', bestFor: 'Multi-model platforms, developer tools',
        overview: 'A dropdown, toggle, or card-based selector for choosing between different AI models, with capability previews and performance comparisons.',
        when: ['Multiple AI models are available to users', 'Model choice significantly affects output', 'Users have different needs (speed vs quality)', 'Building platforms that aggregate multiple AI providers'],
        expectations: ['Clear model names with capability descriptions', 'Performance/cost/quality indicators', 'Quick switching without losing context', 'Recommended model suggestions'],
        considerations: 'Show meaningful comparisons, not just model names. Consider capability tags (best for code, best for creative, fastest). Save user preferences for model selection. Show estimated cost or speed for each model.',
        related: ['Model Selection', 'Temperature Slider', 'Generation Tokens']
    },

    'temperature-slider': {
        cat: 'Control', color: '#8b5cf6', complexity: 'Medium', bestFor: 'Creative tools, developer tools, advanced users',
        overview: 'A slider control for adjusting AI generation creativity/randomness (temperature), with visual examples showing the effect of different settings.',
        when: ['Users need control over output creativity', 'The application supports both precise and creative tasks', 'Power users want fine-grained generation control', 'Building developer or advanced tools'],
        expectations: ['Smooth, precise slider control', 'Visual labels for key positions (precise ↔ creative)', 'Preview examples at different temperature settings', 'Persistent preference saving'],
        considerations: 'Label the slider with intuitive terms (Precise/Balanced/Creative) rather than raw 0-2 numbers. Consider showing example outputs at different settings. Save user preferences. Provide a reset-to-default option.',
        related: ['Configurable Controls', 'Model Selector', 'Prompt Composer']
    },

    'regenerate-button': {
        cat: 'Control', color: '#8b5cf6', complexity: 'Low', bestFor: 'Any AI interface',
        overview: 'A prominent action button to re-run AI generation with the same or modified parameters, providing quick iteration on AI output.',
        when: ['Every AI interface — this is a fundamental control', 'Users need to iterate on AI output', 'The same prompt can produce different results', 'Quick regeneration improves workflow speed'],
        expectations: ['Prominent, easily discoverable placement', 'Click feedback and loading state', 'Option to regenerate with modifications', 'Previous result preserved or accessible'],
        considerations: 'Place the button near the AI output, not the input. Show clear loading state during regeneration. Consider a "regenerate with tweaks" option. Preserve the previous result for comparison.',
        related: ['Full Regeneration', 'Selective Regeneration', 'Result Actions']
    },

    'context-window': {
        cat: 'Control', color: '#8b5cf6', complexity: 'High', bestFor: 'Enterprise AI, complex workflows, transparency-focused',
        overview: 'A panel or overlay showing the AI\'s active context — conversation history, loaded references, system prompts — giving users transparency and control over what influences generation.',
        when: ['Users need to understand what context the AI is using', 'Context management affects output quality', 'Building transparent, enterprise-grade AI tools', 'Debugging or optimizing AI interactions'],
        expectations: ['Clear listing of all context items', 'Ability to add, remove, or reorder context', 'Visual indication of context window usage', 'Toggle between summary and detailed views'],
        considerations: 'Show context items with meaningful labels and descriptions. Allow drag-and-drop reordering for priority. Display context window utilization percentage. Provide a "clear all" action with confirmation.',
        related: ['Context Chip', 'Reference Material', 'Token Counter', 'Thread Options']
    },

    /* ─── SYSTEMS ─── */
    'conversational-assistant': {
        cat: 'Productivity', color: '#2563eb', complexity: 'High', bestFor: 'Customer support, internal tools, general-purpose AI',
        overview: 'A complete chat-based AI assistant system combining prompt composer, streaming response, thread management, and feedback loops into a cohesive conversational experience. This is the most common AI system pattern, powering tools from customer support bots to general-purpose AI assistants.',
        when: ['Building a general-purpose AI interaction tool', 'Conversational, multi-turn interactions are the primary use case', 'Users expect a chat-like experience', 'The AI needs to maintain conversation context'],
        expectations: ['Natural, responsive conversation flow', 'Persistent thread management', 'Quick actions and follow-up suggestions', 'Cross-device synchronization'],
        considerations: 'Focus on conversation quality and flow. Support rich media in both user input and AI responses. Implement smart thread summarization for long conversations. Consider offering preset "personas" or "modes" for different tasks.',
        related: ['Prompt Composer', 'AI Response Bubble', 'Thread History', 'Suggestion Chip']
    },

    'smart-document-editor': {
        cat: 'Productivity', color: '#2563eb', complexity: 'High', bestFor: 'Content marketing, technical writing, journalism',
        overview: 'An AI-powered writing environment that integrates inline suggestions, selective regeneration, and version history into a familiar document editing workflow. Writers can request AI assistance at any point — from generating outlines to refining specific paragraphs.',
        when: ['Building content creation or editing tools', 'AI assists rather than replaces the writer', 'Inline, contextual AI suggestions improve workflow', 'Version tracking and iteration are important'],
        expectations: ['Familiar editing experience with AI enhancements', 'Non-intrusive AI suggestions that respect writing flow', 'Easy accept/reject for AI changes', 'Full version history with comparison'],
        considerations: 'Keep the AI assistance subtle — it should enhance, not dominate the editing experience. Support both proactive suggestions and on-demand generation. Implement diff highlighting for AI-made changes. Allow users to control AI assistance level.',
        related: ['Inline Suggestions', 'Selective Regeneration', 'Diff Viewer', 'Version History']
    },

    'ai-email-composer': {
        cat: 'Productivity', color: '#2563eb', complexity: 'Medium', bestFor: 'Sales teams, customer success, professional communication',
        overview: 'An intelligent email drafting system that combines structured prompts, tone adjustment controls, and context-aware templates to help users write professional emails faster with AI assistance.',
        when: ['Users send high volumes of professional emails', 'Email quality and consistency matter', 'Tone and formality need to match different audiences', 'Template-based workflows with personalization'],
        expectations: ['Quick draft generation from minimal input', 'Tone and length adjustment controls', 'Context-aware personalization', 'One-click send or copy'],
        considerations: 'Pre-load context from CRM or email history where possible. Offer tone presets (formal, friendly, urgent). Support template variables for personalization. Consider brand voice guidelines for enterprise deployment.',
        related: ['Prompt Templates', 'Configurable Controls', 'Structured Prompt', 'Quality Meter']
    },

    'meeting-summarizer': {
        cat: 'Productivity', color: '#2563eb', complexity: 'High', bestFor: 'Remote teams, project management, executive briefings',
        overview: 'An automated meeting intelligence system that processes recordings or transcripts, generates structured summaries, extracts action items, and creates follow-up task lists — transforming meetings into actionable documentation.',
        when: ['Teams have frequent meetings that need documentation', 'Action item tracking is critical', 'Meeting participants need quick recaps', 'Building integrations with calendar and project tools'],
        expectations: ['Accurate, structured meeting summaries', 'Clearly extracted action items with assignees', 'Timeline of key discussion points', 'Easy sharing and export'],
        considerations: 'Offer summary templates (executive brief, detailed notes, action items only). Support speaker identification and attribution. Integrate with calendar and task management tools. Allow manual corrections to improve accuracy over time.',
        related: ['Voice Input', 'Progressive Disclosure', 'Structured Prompt', 'Show Citations']
    },

    'predictive-analytics-console': {
        cat: 'Analytics', color: '#17b26a', complexity: 'High', bestFor: 'Data teams, business intelligence, financial planning',
        overview: 'A comprehensive analytics dashboard that combines AI-generated predictions, confidence indicators, and interactive data visualizations to support data-driven decision making with forward-looking insights.',
        when: ['Building business intelligence or forecasting tools', 'Users need AI-generated insights alongside raw data', 'Prediction confidence and reliability matter', 'Data-driven decision making is the core use case'],
        expectations: ['Clear prediction visualizations with confidence bands', 'Interactive, drillable data views', 'Natural language insight summaries', 'Historical accuracy tracking'],
        considerations: 'Always display confidence intervals alongside predictions. Provide natural language summaries of key insights. Track and display historical prediction accuracy. Allow users to adjust parameters and see updated predictions.',
        related: ['Confidence Indicators', 'Progressive Disclosure', 'Explainability Cards', 'Quality Meter']
    },

    'anomaly-detection-dashboard': {
        cat: 'Analytics', color: '#17b26a', complexity: 'High', bestFor: 'DevOps, security, financial monitoring',
        overview: 'A real-time monitoring system that uses AI to identify unusual patterns in data streams, presenting anomalies with explainability cards, severity ratings, and configurable alert thresholds for proactive issue detection.',
        when: ['Real-time monitoring with AI-driven detection', 'Early warning systems for critical infrastructure', 'Reducing false positive alert fatigue', 'Building security or operations monitoring tools'],
        expectations: ['Real-time data stream visualization', 'Clear anomaly highlighting with severity', 'Configurable alert thresholds', 'Root cause analysis suggestions'],
        considerations: 'Minimize false positives through tunable sensitivity. Provide clear severity categorization. Show historical context for each anomaly. Allow users to mark false positives to improve detection over time.',
        related: ['Confidence Indicators', 'Configurable Controls', 'Explainability Cards', 'Toast Notification']
    },

    'customer-insights-engine': {
        cat: 'Analytics', color: '#17b26a', complexity: 'High', bestFor: 'Product teams, marketing, customer success',
        overview: 'An AI-powered system that analyzes behavioral data, survey responses, and interaction patterns to generate actionable user insights with trend forecasting and source attribution.',
        when: ['Building product analytics or customer intelligence tools', 'Behavioral data needs AI interpretation', 'Trend detection and forecasting are valuable', 'Insights need to be backed by data sources'],
        expectations: ['Automated insight generation from behavioral data', 'Trend visualization with forecasting', 'Source attribution for each insight', 'Actionable recommendations, not just data'],
        considerations: 'Present insights as actionable recommendations, not raw data. Always link insights back to underlying data sources. Prioritize insights by potential impact. Support different views for different stakeholder types.',
        related: ['Source Attribution', 'Progressive Disclosure', 'Show Citations', 'Confidence Indicators']
    },

    'ai-content-studio': {
        cat: 'Creative', color: '#ec4899', complexity: 'High', bestFor: 'Marketing teams, social media, design agencies',
        overview: 'A comprehensive creative workspace combining image generation, text creation, and iterative refinement tools for AI-assisted content production across multiple formats and channels.',
        when: ['Building multi-format content creation tools', 'Creative professionals need AI assistance', 'Brand consistency across content is important', 'Multi-channel content production at scale'],
        expectations: ['Multi-format output (text, image, video)', 'Brand-aware generation', 'Collaborative editing capabilities', 'Asset organization and management'],
        considerations: 'Support multiple content formats in a unified workspace. Implement brand guidelines as generation constraints. Provide template libraries organized by content type and channel. Allow real-time collaboration on AI-generated content.',
        related: ['Multi-Variant Output', 'Iterative Editing', 'Image Input', 'Result Carousel']
    },

    'brand-voice-generator': {
        cat: 'Creative', color: '#ec4899', complexity: 'Medium', bestFor: 'Content teams, brand managers, agencies',
        overview: 'A system that learns and applies brand voice guidelines to generate consistently on-brand copy, using configurable controls for tone, style, and audience targeting.',
        when: ['Brand consistency in AI-generated content is critical', 'Multiple team members create content', 'A brand style guide needs to be operationalized', 'Content must match specific audience segments'],
        expectations: ['Content that matches brand voice guidelines', 'Adjustable tone and style parameters', 'Before/after brand voice comparison', 'Multi-audience variant generation'],
        considerations: 'Allow brand guidelines to be uploaded and configured as generation constraints. Provide tone adjustment controls (formal↔casual, technical↔accessible). Show confidence scores for brand voice alignment. Support multiple brand profiles for agencies.',
        related: ['Configurable Controls', 'Quality Meter', 'Prompt Templates', 'Feedback Loop']
    },

    'design-system-generator': {
        cat: 'Creative', color: '#ec4899', complexity: 'High', bestFor: 'Design teams, startups, rapid prototyping',
        overview: 'An AI tool that generates complete UI design elements — color palettes, typography scales, component specifications, and layout systems — from natural language design briefs or brand guidelines.',
        when: ['Rapid design system creation or bootstrapping', 'Non-designers need to create cohesive visual systems', 'Brand identity needs to translate to UI specifications', 'Building design tooling or prototyping platforms'],
        expectations: ['Complete, cohesive design system output', 'Live preview of generated components', 'Export to design tool formats', 'Iterative refinement of individual elements'],
        considerations: 'Generate cohesive systems where colors, typography, and spacing work together. Provide live component previews with the generated tokens. Support export to popular formats (CSS variables, Figma tokens, design tokens). Allow refinement of individual elements without breaking system coherence.',
        related: ['Multi-Variant Output', 'Configurable Controls', 'Result Rendered Preview', 'Iterative Editing']
    },

    'intelligent-knowledge-base': {
        cat: 'Enterprise', color: '#7c3aed', complexity: 'High', bestFor: 'Customer support, internal documentation, legal research',
        overview: 'An enterprise-grade search and retrieval system that uses AI to understand natural language queries, retrieve relevant documents, and generate synthesized answers with full citation chains for accurate knowledge discovery.',
        when: ['Building enterprise knowledge management tools', 'Natural language search improves discovery', 'Citation and source verification are critical', 'Large document collections need AI-powered navigation'],
        expectations: ['Natural language query understanding', 'Synthesized answers from multiple sources', 'Full citation chains with source links', 'Relevance ranking with confidence scores'],
        considerations: 'Always provide full citation chains for transparency. Support both quick answers and deep document exploration. Implement feedback loops to improve retrieval quality. Consider access controls and permission-aware search results.',
        related: ['Show Citations', 'Citation Card', 'Confidence Indicators', 'Reference Material']
    },

    'automated-workflow-builder': {
        cat: 'Enterprise', color: '#7c3aed', complexity: 'High', bestFor: 'Operations teams, no-code automation, process optimization',
        overview: 'A visual AI workflow automation tool that allows users to define, test, and deploy multi-step AI-driven processes using a drag-and-drop interface with agent commands, action review checkpoints, and configurable conditions.',
        when: ['Building no-code AI automation platforms', 'Complex, multi-step processes need AI integration', 'Human-in-the-loop checkpoints are required', 'Process standardization across teams is important'],
        expectations: ['Visual, drag-and-drop workflow editor', 'AI-suggested workflow steps', 'Human review checkpoints at critical steps', 'Monitoring and analytics for running workflows'],
        considerations: 'Make the visual builder intuitive with clear step-by-step flows. Incorporate mandatory human review points for high-impact actions. Provide real-time monitoring of running workflows. Allow workflow templates for common use cases.',
        related: ['Agent Initial Command', 'Agent Action Review', 'Configurable Controls', 'Progressive Disclosure']
    },

    'ai-onboarding-wizard': {
        cat: 'Enterprise', color: '#7c3aed', complexity: 'Medium', bestFor: 'SaaS products, enterprise tools, complex configuration',
        overview: 'A guided setup experience that uses AI to understand user needs through a paginated questionnaire, then automatically configures the product, creates initial content, and personalizes the interface accordingly.',
        when: ['Product setup is complex and intimidating', 'AI can meaningfully personalize the experience', 'First-time user experience is critical for retention', 'Building enterprise SaaS with diverse user needs'],
        expectations: ['Progressive, step-by-step setup flow', 'AI-generated recommendations at each step', 'Ability to skip or customize AI suggestions', 'Clear summary of configuration before finalization'],
        considerations: 'Keep steps short and focused. Show AI recommendations as suggestions, not requirements. Allow skipping steps for experienced users. Provide a summary/review step before final configuration. Consider offering configuration templates.',
        related: ['Paginated Prompt', 'Progressive Disclosure', 'Inline Help', 'Configurable Controls']
    },

    'compliance-reviewer': {
        cat: 'Enterprise', color: '#7c3aed', complexity: 'High', bestFor: 'Legal, healthcare, financial services, regulated industries',
        overview: 'An AI-powered audit and compliance system that analyzes documents, processes, or communications against regulatory requirements, flagging potential issues with detailed explanations and remediation suggestions.',
        when: ['Building for regulated industries (financial, healthcare, legal)', 'Automated compliance checking saves significant manual effort', 'Document volume exceeds manual review capacity', 'Audit trails and explainability are legally required'],
        expectations: ['Automated document analysis against regulations', 'Clear issue flagging with severity levels', 'Detailed explanations of compliance concerns', 'Remediation suggestions with regulatory references'],
        considerations: 'Provide extremely clear explanations for every flag — compliance is high-stakes. Include specific regulatory references and citations. Support human override with documented rationale. Maintain complete audit trails for all reviews and decisions.',
        related: ['Bias Indicators', 'Explainability Cards', 'Show Citations', 'Confidence Indicators']
    },

    /* ─── MODULES ─── */
    'smart-scheduler': {
        cat: 'Scheduling', color: '#0ea5e9', complexity: 'High', bestFor: 'Enterprise teams, shift-based orgs, multi-timezone operations',
        overview: 'Smart Scheduler is an AI-powered workforce management module that intelligently builds schedules, resolves conflicts, and adapts to leave rules, overtime constraints, and departmental availability. It goes beyond basic calendar views by leveraging AI to suggest optimal staff allocation, predict scheduling bottlenecks, and automate routine shift management across the organisation.',
        when: ['Managing complex shift rotations across multiple departments', 'Organisations operating in multiple timezones', 'Teams need AI-assisted conflict resolution for overlapping schedules', 'Compliance with regional labour laws (overtime, rest-periods) is required', 'Scaling from small teams to enterprise-level workforce planning'],
        expectations: ['A visual weekly/monthly calendar with drag-and-drop shift blocks', 'AI-suggested schedules based on availability, roles, and preferences', 'Real-time conflict detection with automatic resolution suggestions', 'Department-level views with filtering and search', 'Integration with HRMS systems for live employee data sync'],
        considerations: 'Start with a guided onboarding that captures industry, departments, working hours, and leave rules so the AI can generate informed first-draft schedules. Support HRMS integrations (BambooHR, Gusto, Workday) and CSV imports, with a fallback manual roster builder. Provide clear visualisations of overtime, coverage gaps, and compliance metrics.',
        related: ['Automated Workflow Builder', 'Configurable Controls', 'AI Onboarding Wizard', 'Paginated Prompt']
    },
};

/* ─── Color map for badge styling ─── */
const CAT_COLORS = {
    Authoring: '#7c3aed', Generation: '#2563eb', Refinement: '#f59e0b',
    Trust: '#17b26a', Management: '#ec4899',
    Input: '#3b82f6', Display: '#06b6d4', Feedback: '#f59e0b', Control: '#8b5cf6',
    Productivity: '#2563eb', Analytics: '#17b26a', Creative: '#ec4899', Enterprise: '#7c3aed',
    Scheduling: '#0ea5e9', Reporting: '#f59e0b', CRM: '#ef4444', Automation: '#8b5cf6'
};

/* ─── Populate detail page ─── */
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const type = params.get('type') || 'patterns';
    const data = DETAIL_DATA[id];

    if (!data) {
        document.getElementById('detail-title').textContent = 'Not Found';
        document.getElementById('detail-subtitle').textContent = 'This item could not be found.';
        return;
    }

    // Update page title
    document.title = `${data.cat}: ${id.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')} — Reloadux AI Design`;

    // Badge
    const badge = document.getElementById('detail-badge');
    badge.textContent = data.cat;
    badge.style.background = data.color + '18';
    badge.style.color = data.color;

    // Title & subtitle
    const titleText = id.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
    document.getElementById('detail-title').textContent = titleText;
    document.getElementById('detail-subtitle').textContent = data.overview.split('.')[0] + '.';

    // Overview
    document.getElementById('detail-overview').innerHTML = `<p>${data.overview}</p>`;

    // When to use
    const whenList = document.getElementById('detail-when');
    whenList.innerHTML = data.when.map(w => `<li>${w}</li>`).join('');

    // Expectations
    const expList = document.getElementById('detail-expectations');
    expList.innerHTML = data.expectations.map(e => `<li>${e}</li>`).join('');

    // Considerations
    document.getElementById('detail-considerations').innerHTML = `<p>${data.considerations}</p>`;

    // Sidebar
    document.getElementById('sidebar-category').textContent = data.cat;
    document.getElementById('sidebar-complexity').textContent = data.complexity;
    document.getElementById('sidebar-bestfor').textContent = data.bestFor;

    // Related
    const relatedEl = document.getElementById('sidebar-related');
    relatedEl.innerHTML = data.related.map(r => {
        const rid = r.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
        return `<a href="aidesign-detail.html?type=${type}&id=${rid}" class="aid-detail-sidebar__tag">${r}</a>`;
    }).join('');

    // Back link
    document.getElementById('back-link').href = `aidesign.html#panel-${type}`;

    // Preview accent color
    const preview = document.getElementById('detail-preview');
    renderInteractiveMockup(id, data, preview);
});
