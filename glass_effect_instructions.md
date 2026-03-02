# Liquid Glass Effect Instructions

This document outlines the standard procedure for applying the custom "Liquid Glass" refraction effect to any UI component within this project. Whenever the user requests a "glass effect", follow this technical implementation.

## 1. SVG Filter Definition
To achieve the refractive liquid distortion, the following SVG filter must be present in the DOM (usually at the very bottom of the `<body>` tag, set to `display: none`):

```html
<svg style="display: none">
    <filter id="lg-dist" x="0%" y="0%" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.008 0.008" numOctaves="2" seed="92" result="noise" />
    <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
    <feDisplacementMap in="SourceGraphic" in2="blurred" scale="40" xChannelSelector="R" yChannelSelector="G" />
    </filter>
</svg>
```

## 2. Global CSS Architecture
The glass effect relies on three absolutely positioned background layers layered beneath the actual content. Add these base classes to your stylesheet:

```css
/* Hide glass layers by default (e.g., for Light Mode) or show them always depending on requirements */
.glass-filter, .glass-overlay, .glass-specular {
    display: none;
}

/* Activate glass layers (e.g., in Dark Mode) */
[data-theme="dark"] .glass-filter {
    position: absolute;
    inset: 0;
    z-index: 0;
    backdrop-filter: blur(0px); /* Adjust blur if needed */
    filter: url(#lg-dist); /* References the SVG filter */
    isolation: isolate;
    display: block;
}

[data-theme="dark"] .glass-overlay {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: rgba(255, 255, 255, 0.04); /* Frosted tint */
    display: block;
}

[data-theme="dark"] .glass-specular {
    position: absolute;
    inset: 0;
    z-index: 2;
    border-radius: inherit;
    overflow: hidden;
    /* Specular highlights on edges */
    box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.15), inset 0 0 5px rgba(255, 255, 255, 0.05);
    display: block;
}

[data-theme="dark"] .glass-content {
    position: relative;
    z-index: 3;
}
```

## 3. HTML Structure Implementation
To turn a component (e.g., a button or a card) into liquid glass, you must wrap its contents with the precise layer structure. 

**Requirements:**
1. The parent container must have `position: relative`, `overflow: hidden`, and be completely transparent (so the background can be seen through it).
2. The exact four inner divs must be injected behind the content.

```html
<button class="your-component-class" style="position: relative; overflow: hidden; background: transparent;">
    <!-- The 3 Glass Backdrop Layers -->
    <div class="glass-filter"></div>
    <div class="glass-overlay"></div>
    <div class="glass-specular"></div>
    
    <!-- The actual content wrapper -->
    <div class="glass-content">
        Your actual component elements go here...
    </div>
</button>
```

**Note:** Ensure the component's internal elements (inside `.glass-content`) use semi-transparent `rgba()` colors instead of solid hex codes where possible, so the glass refraction can shine completely through the component.
