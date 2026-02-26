function renderInteractiveMockup(id, data, container) {
    const previewBg = data.color + '08';
    container.style.background = `linear-gradient(135deg, ${previewBg}, ${data.color}15)`;
    container.style.position = 'relative';

    // Base replay button style
    const replayBtnStyle = `
        <style>
            .aid-replay-btn {
                position: absolute;
                top: 16px;
                right: 16px;
                background: #ffffffbb;
                backdrop-filter: blur(4px);
                border: 1px solid #e5e7eb;
                border-radius: 50%;
                width: 34px;
                height: 34px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: ${data.color};
                transition: all 0.3s ease;
                z-index: 10;
            }
            .aid-replay-btn:hover {
                background: #ffffff;
                transform: rotate(-180deg);
                box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            }
        </style>
        <button id="raw-demo-replay" class="aid-replay-btn" title="Replay Animation">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
        </button>
    `;

    if (id === 'raw-text-input') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-raw-input-widget {
                    width: 100%;
                    max-width: 480px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .aid-raw-interactive-area {
                    background: #ffffff;
                    border: 1px solid #e5e7eb;
                    border-radius: 12px;
                    padding: 8px 12px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    transition: all 0.3s ease;
                }
                .aid-raw-interactive-area:focus-within {
                    border-color: ${data.color};
                    box-shadow: 0 4px 20px ${data.color}22;
                }
                .aid-raw-interactive-area.is-listening {
                    border-color: #ef4444;
                    box-shadow: 0 4px 20px rgba(239, 68, 68, 0.15);
                }
                .aid-raw-input-field {
                    flex: 1;
                    border: none;
                    outline: none;
                    background: transparent;
                    font-family: inherit;
                    font-size: 15px;
                    color: #1f2937;
                }
                .aid-raw-input-field::placeholder {
                    color: #9ca3af;
                }
                .aid-raw-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 36px;
                    height: 36px;
                    border-radius: 8px;
                    border: none;
                    background: transparent;
                    color: #9ca3af;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    position: relative;
                }
                .aid-raw-btn:hover {
                    background: #f3f4f6;
                    color: #4b5563;
                }
                .aid-raw-voice.listening {
                    color: #ef4444;
                    background: #fef2f2;
                }
                .aid-raw-voice.listening::before,
                .aid-raw-voice.listening::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(239, 68, 68, 0.4);
                    border-radius: 50%;
                    z-index: -1;
                    animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
                }
                .aid-raw-voice.listening::after {
                    animation-delay: 0.75s;
                }
                @keyframes pulse-ring {
                    0% { transform: scale(0.9); opacity: 1; }
                    100% { transform: scale(2); opacity: 0; }
                }
                .aid-raw-waveform {
                    display: none;
                    align-items: center;
                    gap: 4px;
                    height: 24px;
                    margin-left: 8px;
                }
                .aid-raw-interactive-area.is-listening .aid-raw-waveform { display: flex; }
                .aid-raw-interactive-area.is-listening .aid-raw-input-field { color: #ef4444; }
                .aid-raw-waveform i {
                    width: 4px;
                    background: #ef4444;
                    border-radius: 4px;
                    animation: waveform-bounce 1s ease-in-out infinite;
                }
                .aid-raw-waveform i:nth-child(1) { height: 12px; animation-delay: 0.1s; }
                .aid-raw-waveform i:nth-child(2) { height: 20px; animation-delay: 0.2s; }
                .aid-raw-waveform i:nth-child(3) { height: 14px; animation-delay: 0.3s; }
                .aid-raw-waveform i:nth-child(4) { height: 24px; animation-delay: 0.4s; }
                .aid-raw-waveform i:nth-child(5) { height: 16px; animation-delay: 0.5s; }
                .aid-raw-waveform i:nth-child(6) { height: 10px; animation-delay: 0.6s; }
                @keyframes waveform-bounce {
                    0%, 100% { transform: scaleY(0.4); }
                    50% { transform: scaleY(1); }
                }
                .aid-raw-send.active {
                    background: ${data.color};
                    color: white;
                }
                .aid-raw-send.active:hover {
                    background: ${data.color};
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px ${data.color}44;
                }
                .aid-raw-send.success {
                    background: #10b981 !important;
                    color: white !important;
                    transform: scale(1.05);
                }
            </style>
            <div class="aid-raw-input-widget">
                <div class="aid-raw-interactive-area" id="raw-interactive-area">
                    <input type="text" id="raw-demo-input" class="aid-raw-input-field" placeholder="Message AI..." autocomplete="off">
                    <div class="aid-raw-waveform">
                        <i></i><i></i><i></i><i></i><i></i><i></i>
                    </div>
                    <button id="raw-demo-voice" class="aid-raw-btn aid-raw-voice" title="Voice Input">
                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                    </button>
                    <button id="raw-demo-send" class="aid-raw-btn aid-raw-send" title="Send Request">
                        <svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </div>
            </div>
        `;

        const input = document.getElementById('raw-demo-input');
        const sendBtn = document.getElementById('raw-demo-send');
        const replayBtn = document.getElementById('raw-demo-replay');
        const voiceBtn = document.getElementById('raw-demo-voice');
        const interactiveArea = document.getElementById('raw-interactive-area');

        let isAnimating = false, activeTimer = null, activeTimeout = null;

        const startAutoplay = () => {
            if (isAnimating) return;
            isAnimating = true;
            input.value = ''; input.dispatchEvent(new Event('input'));
            clearInterval(activeTimer); clearTimeout(activeTimeout);
            sendBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
            sendBtn.classList.remove('success'); voiceBtn.classList.remove('listening'); interactiveArea.classList.remove('is-listening');

            const sampleText = "Write a sophisticated python script to analyze sales data";
            let i = 0;

            activeTimeout = setTimeout(() => {
                activeTimer = setInterval(() => {
                    input.value += sampleText.charAt(i);
                    input.dispatchEvent(new Event('input'));
                    i++;
                    if (i >= sampleText.length) {
                        clearInterval(activeTimer);
                        activeTimeout = setTimeout(() => {
                            sendBtn.click();
                            activeTimeout = setTimeout(() => { isAnimating = false; }, 1600);
                        }, 600);
                    }
                }, 30);
            }, 400);
        };

        sendBtn.addEventListener('click', () => {
            if (input.value.trim().length > 0) {
                sendBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                sendBtn.classList.add('success'); sendBtn.classList.remove('active');
                setTimeout(() => {
                    input.value = ''; input.dispatchEvent(new Event('input'));
                    sendBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
                    sendBtn.classList.remove('success');
                }, 1500);
            }
        });

        replayBtn.addEventListener('click', () => { clearInterval(activeTimer); clearTimeout(activeTimeout); isAnimating = false; startAutoplay(); });
        input.addEventListener('input', () => { sendBtn.classList.toggle('active', input.value.trim().length > 0); });
        input.addEventListener('focus', () => {
            if (isAnimating) { clearInterval(activeTimer); clearTimeout(activeTimeout); isAnimating = false; sendBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" width="18" height="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>'; sendBtn.classList.remove('success'); }
        });

        let recognition = ('webkitSpeechRecognition' in window) ? new webkitSpeechRecognition() : null;
        if (recognition) {
            recognition.continuous = false; recognition.interimResults = true;
            recognition.onstart = () => { voiceBtn.classList.add('listening'); interactiveArea.classList.add('is-listening'); input.placeholder = "Listening..."; clearInterval(activeTimer); clearTimeout(activeTimeout); isAnimating = false; };
            recognition.onresult = (e) => {
                let final = '', interim = '';
                for (let i = e.resultIndex; i < e.results.length; ++i) { e.results[i].isFinal ? final += e.results[i][0].transcript : interim += e.results[i][0].transcript; }
                input.value = final || interim; input.dispatchEvent(new Event('input'));
            };
            recognition.onend = () => { voiceBtn.classList.remove('listening'); interactiveArea.classList.remove('is-listening'); input.placeholder = "Message AI..."; };
            recognition.onerror = () => { voiceBtn.classList.remove('listening'); interactiveArea.classList.remove('is-listening'); input.placeholder = "Message AI..."; };
        }
        voiceBtn.addEventListener('click', () => { if (!recognition) return; voiceBtn.classList.contains('listening') ? recognition.stop() : recognition.start(); });
        startAutoplay();

    } else if (id === 'streaming-response' || id === 'skeleton-loading') {
        // High fidelity animation for streaming / loading paradigms
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-gen-mockup {
                    width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 12px;
                }
                .aid-gen-header { display: flex; align-items: center; gap: 8px; font-weight: 500; font-size: 13px; color: #4b5563; }
                .aid-gen-avatar { width: 24px; height: 24px; border-radius: 4px; background: linear-gradient(135deg, ${data.color}, ${data.color}88); display:flex; align-items:center; justify-content:center; color:white; }
                .aid-gen-content { font-size: 14px; line-height: 1.6; color: #1f2937; position: relative; }
                
                .skeleton-line { height: 12px; background: #f3f4f6; border-radius: 4px; margin-bottom: 8px; width: 100%; position: relative; overflow: hidden; }
                .skeleton-line::after {
                    content: ""; position: absolute; inset: 0; transform: translateX(-100%);
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
                    animation: shimmer 1.5s infinite;
                }
                .skeleton-short { width: 60%; }
                @keyframes shimmer { 100% { transform: translateX(100%); } }
                
                .streaming-cursor { display: inline-block; width: 8px; height: 16px; background: ${data.color}; animation: blink 1s step-end infinite; margin-left: 2px; vertical-align: text-bottom; }
                @keyframes blink { 50% { opacity: 0; } }
            </style>
            <div class="aid-gen-mockup">
                <div class="aid-gen-header"><div class="aid-gen-avatar"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg></div> AI Assistant</div>
                <div class="aid-gen-content" id="gen-content"></div>
            </div>
        `;

        const content = document.getElementById('gen-content');
        const replayBtn = document.getElementById('raw-demo-replay');
        let activeTimer, activeTimeout, isAnimating = false;

        const startDemo = () => {
            if (isAnimating) return;
            isAnimating = true;
            clearInterval(activeTimer); clearTimeout(activeTimeout);

            if (id === 'skeleton-loading') {
                content.innerHTML = '<div class="skeleton-line"></div><div class="skeleton-line"></div><div class="skeleton-line skeleton-short"></div>';
                activeTimeout = setTimeout(() => {
                    content.innerHTML = "Here is the summary you requested: The data shows a 24% increase in Q3... <span class='streaming-cursor'></span>";
                    setTimeout(() => { document.querySelector('.streaming-cursor')?.remove(); isAnimating = false; }, 2000);
                }, 3000);
            } else {
                content.innerHTML = '<span class="streaming-cursor"></span>';
                const text = "As an AI, I completely understand what you mean. The overarching implementation will require parallel task processing and an asynchronous flow design.";
                let i = 0;
                activeTimeout = setTimeout(() => {
                    activeTimer = setInterval(() => {
                        content.innerHTML = text.substring(0, i + 1) + '<span class="streaming-cursor"></span>';
                        i++;
                        if (i >= text.length) {
                            clearInterval(activeTimer);
                            setTimeout(() => { document.querySelector('.streaming-cursor')?.remove(); isAnimating = false; }, 1500);
                        }
                    }, 25);
                }, 500);
            }
        };

        replayBtn.addEventListener('click', () => { clearInterval(activeTimer); clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'inline-suggestions') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-inline-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
                .aid-ln { color: #9ca3af; user-select: none; margin-right: 12px; }
                .aid-typed { color: #1f2937; }
                .aid-ghost { color: #9ca3af; opacity: 0; transition: opacity 0.3s; }
                .aid-ghost.show { opacity: 0.6; }
                .aid-inline-mockup.accepted .aid-ghost { color: #1f2937; opacity: 1; }
                .aid-cursor { display: inline-block; width: 2px; height: 16px; background: #1f2937; animation: blink 1s step-end infinite; vertical-align: text-bottom; }
                .aid-badge { display: inline-flex; position:absolute; right:12px; top:12px; font-family:sans-serif; align-items: center; gap: 4px; font-size: 11px; background: ${data.color}22; color: ${data.color}; padding: 2px 6px; border-radius: 4px; opacity:0; transition: opacity 0.3s;}
                .aid-badge.show { opacity: 1;}
            </style>
            <div class="aid-inline-mockup" id="inline-mockup" style="position:relative;">
                <div class="aid-badge" id="inline-badge">Press Tab to accept</div>
                <span class="aid-ln">1</span><span class="aid-typed" id="typed-code"></span><span class="aid-cursor" id="inline-cursor"></span><span class="aid-ghost" id="ghost-code"></span>
            </div>
        `;
        const typed = document.getElementById('typed-code'), ghost = document.getElementById('ghost-code'), badge = document.getElementById('inline-badge'), mockup = document.getElementById('inline-mockup');
        const replayBtn = document.getElementById('raw-demo-replay');
        let activeTimer, activeTimeout, isAnimating = false;

        const startDemo = () => {
            if (isAnimating) return; isAnimating = true;
            clearInterval(activeTimer); clearTimeout(activeTimeout);
            typed.innerHTML = ''; ghost.innerHTML = ''; ghost.classList.remove('show'); badge.classList.remove('show'); mockup.classList.remove('accepted');
            document.getElementById('inline-cursor').style.display = 'inline-block';

            const textToType = 'const sumArray = (arr) => ';
            const suggestion = '{ return arr.reduce((a, b) => a + b, 0); }';
            let i = 0;
            activeTimeout = setTimeout(() => {
                activeTimer = setInterval(() => {
                    typed.innerHTML += textToType.charAt(i); i++;
                    if (i >= textToType.length) {
                        clearInterval(activeTimer);
                        activeTimeout = setTimeout(() => {
                            ghost.innerHTML = suggestion; ghost.classList.add('show'); badge.classList.add('show');
                            activeTimeout = setTimeout(() => {
                                mockup.classList.add('accepted'); badge.classList.remove('show');
                                setTimeout(() => { document.getElementById('inline-cursor').style.display = 'none'; isAnimating = false; }, 1000);
                            }, 1500);
                        }, 400);
                    }
                }, 40);
            }, 500);
        };
        replayBtn.addEventListener('click', () => { clearInterval(activeTimer); clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();
    } else if (id === 'image-input') {
        /* ────────────────────────────────────────────────
           IMAGE INPUT — Redesigned Widget
           Upload → shimmer lazy-load reveal → AI description → Natural/AI verdict
           ──────────────────────────────────────────────── */
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-img-widget { width: 100%; max-width: 480px; display: flex; flex-direction: column; gap: 0; position: relative; }

                /* ── Drop Zone ── */
                .aid-img-dropzone {
                    background: #ffffff; border: 2px dashed #d0d5dd; border-radius: 14px;
                    padding: 36px 24px; display: flex; flex-direction: column; align-items: center;
                    gap: 12px; cursor: pointer; transition: all 0.35s ease;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.04); position: relative; overflow: hidden;
                }
                .aid-img-dropzone:hover, .aid-img-dropzone.drag-over {
                    border-color: ${data.color}; background: ${data.color}06;
                    box-shadow: 0 4px 24px ${data.color}18;
                }
                .aid-img-dropzone.drag-over { transform: scale(1.015); }
                .aid-img-dropzone.has-image { padding: 0; border-style: solid; border-color: #e5e7eb; cursor: default; }
                .aid-img-dropzone.has-image .aid-img-dropzone__icon,
                .aid-img-dropzone.has-image .aid-img-dropzone__title,
                .aid-img-dropzone.has-image .aid-img-dropzone__hint,
                .aid-img-dropzone.has-image .aid-img-dropzone__formats { display: none; }

                .aid-img-dropzone__icon {
                    width: 52px; height: 52px; border-radius: 14px;
                    background: linear-gradient(135deg, ${data.color}18, ${data.color}30);
                    display: flex; align-items: center; justify-content: center;
                    transition: transform 0.35s ease;
                }
                .aid-img-dropzone:hover .aid-img-dropzone__icon { transform: translateY(-3px) scale(1.06); }
                .aid-img-dropzone__title { font-size: 15px; font-weight: 600; color: #1f2937; text-align: center; }
                .aid-img-dropzone__hint { font-size: 12px; color: #9ca3af; text-align: center; line-height: 1.45; }
                .aid-img-dropzone__formats { display: flex; gap: 6px; margin-top: 2px; }
                .aid-img-dropzone__format-tag {
                    font-size: 10px; font-weight: 600; letter-spacing: 0.5px;
                    padding: 3px 8px; border-radius: 4px; background: #f3f4f6; color: #6b7280;
                }
                .aid-img-file-input { display: none; }

                /* ── Image Preview ── */
                .aid-img-preview {
                    position: relative; width: 100%; aspect-ratio: 16/10;
                    border-radius: 12px; overflow: hidden; display: none;
                }
                .aid-img-preview img { width: 100%; height: 100%; object-fit: cover; display: block; }
                .aid-img-preview.visible { display: block; }

                /* ── Shimmer Reveal Overlay ── */
                .aid-img-shimmer {
                    position: absolute; inset: 0; pointer-events: none; z-index: 2;
                    background: linear-gradient(180deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%);
                    transition: none;
                }
                .aid-img-shimmer::after {
                    content: ''; position: absolute; inset: 0;
                    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%);
                    animation: shimmerSweep 1.4s ease-in-out infinite;
                }
                @keyframes shimmerSweep {
                    0%   { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .aid-img-shimmer.revealing {
                    transition: clip-path 3s cubic-bezier(0.4, 0, 0.2, 1);
                    clip-path: inset(100% 0 0 0);
                }
                .aid-img-shimmer.done { display: none; }

                /* ── Scanning Status Pill ── */
                .aid-img-status {
                    position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); z-index: 3;
                    background: rgba(0,0,0,0.72); backdrop-filter: blur(10px);
                    border-radius: 20px; padding: 8px 18px;
                    display: flex; align-items: center; gap: 8px;
                    opacity: 0; transition: opacity 0.35s ease; pointer-events: none;
                }
                .aid-img-status.active { opacity: 1; }
                .aid-img-status__dot {
                    width: 8px; height: 8px; border-radius: 50%;
                    background: ${data.color}; animation: statusPulse 1.2s ease-in-out infinite;
                }
                @keyframes statusPulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(0.7); }
                }
                .aid-img-status__text {
                    font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.9);
                    letter-spacing: 0.3px;
                }

                /* ── Remove Button ── */
                .aid-img-remove {
                    position: absolute; top: 10px; left: 10px; z-index: 5;
                    width: 28px; height: 28px; border-radius: 50%;
                    background: rgba(0,0,0,0.55); backdrop-filter: blur(4px);
                    border: none; cursor: pointer; display: flex;
                    align-items: center; justify-content: center;
                    color: #fff; opacity: 0; transition: opacity 0.25s ease;
                }
                .aid-img-preview:hover .aid-img-remove { opacity: 1; }
                .aid-img-remove:hover { background: rgba(239,68,68,0.85); }

                /* ── AI Description Card ── */
                .aid-img-desc {
                    background: #ffffff; border: 1px solid #e5e7eb; border-radius: 14px;
                    margin-top: 14px; padding: 0; box-shadow: 0 4px 20px rgba(0,0,0,0.04);
                    display: none; flex-direction: column; overflow: hidden;
                    animation: descSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .aid-img-desc.visible { display: flex; }
                @keyframes descSlideIn {
                    0%   { opacity: 0; transform: translateY(14px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                /* AI header row */
                .aid-img-desc__header {
                    display: flex; align-items: center; gap: 10px;
                    padding: 16px 18px 12px; border-bottom: 1px solid #f3f4f6;
                }
                .aid-img-desc__avatar {
                    width: 28px; height: 28px; border-radius: 8px;
                    background: linear-gradient(135deg, ${data.color}, ${data.color}aa);
                    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                }
                .aid-img-desc__name { font-size: 13px; font-weight: 600; color: #1f2937; }
                .aid-img-desc__badge-ai {
                    font-size: 9px; font-weight: 700; letter-spacing: 0.6px;
                    padding: 2px 6px; border-radius: 4px; color: ${data.color};
                    background: ${data.color}14; text-transform: uppercase; margin-left: auto;
                }

                /* Description body */
                .aid-img-desc__body { padding: 14px 18px; }
                .aid-img-desc__text {
                    font-size: 14px; line-height: 1.65; color: #374151; min-height: 20px;
                }
                .aid-img-desc__cursor {
                    display: inline-block; width: 2px; height: 16px;
                    background: ${data.color}; vertical-align: text-bottom; margin-left: 1px;
                    animation: cursorFlash 0.6s step-end infinite;
                }
                @keyframes cursorFlash { 50% { opacity: 0; } }

                /* Verdict strip */
                .aid-img-desc__verdict {
                    display: flex; align-items: center; gap: 10px;
                    padding: 12px 18px; background: #f9fafb;
                    border-top: 1px solid #f3f4f6;
                    opacity: 0; transform: translateY(4px);
                    transition: all 0.4s ease;
                }
                .aid-img-desc__verdict.visible { opacity: 1; transform: translateY(0); }
                .aid-img-desc__verdict-icon {
                    width: 24px; height: 24px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                }
                .aid-img-desc__verdict-icon.natural { background: #ecfdf5; color: #10b981; }
                .aid-img-desc__verdict-icon.ai-gen { background: #fef3c7; color: #f59e0b; }
                .aid-img-desc__verdict-label { font-size: 13px; font-weight: 600; color: #1f2937; }
                .aid-img-desc__verdict-conf {
                    font-size: 11px; font-weight: 500; color: #9ca3af; margin-left: auto;
                }
                .aid-img-desc__verdict-bar {
                    width: 60px; height: 5px; border-radius: 3px; background: #f3f4f6;
                    overflow: hidden; margin-left: 6px;
                }
                .aid-img-desc__verdict-fill {
                    height: 100%; border-radius: 3px; width: 0%;
                    transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .aid-img-desc__verdict-fill.natural { background: #10b981; }
                .aid-img-desc__verdict-fill.ai-gen { background: #f59e0b; }
            </style>

            <div class="aid-img-widget">
                <!-- Drop Zone -->
                <div class="aid-img-dropzone" id="img-dropzone">
                    <input type="file" accept="image/*" class="aid-img-file-input" id="img-file-input">
                    <div class="aid-img-dropzone__icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${data.color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                    </div>
                    <div class="aid-img-dropzone__title">Drop an image or click to browse</div>
                    <div class="aid-img-dropzone__hint">AI will scan & describe your image</div>
                    <div class="aid-img-dropzone__formats">
                        <span class="aid-img-dropzone__format-tag">PNG</span>
                        <span class="aid-img-dropzone__format-tag">JPG</span>
                        <span class="aid-img-dropzone__format-tag">WEBP</span>
                        <span class="aid-img-dropzone__format-tag">SVG</span>
                    </div>

                    <!-- Preview -->
                    <div class="aid-img-preview" id="img-preview">
                        <img id="img-preview-img" src="" alt="Preview">
                        <div class="aid-img-shimmer" id="img-shimmer"></div>
                        <div class="aid-img-status" id="img-status">
                            <span class="aid-img-status__dot"></span>
                            <span class="aid-img-status__text" id="img-status-text">Scanning image…</span>
                        </div>
                        <button class="aid-img-remove" id="img-remove" title="Remove">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                    </div>
                </div>

                <!-- AI Description -->
                <div class="aid-img-desc" id="img-desc">
                    <div class="aid-img-desc__header">
                        <div class="aid-img-desc__avatar">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                        </div>
                        <span class="aid-img-desc__name">AI Vision</span>
                        <span class="aid-img-desc__badge-ai">Analysis</span>
                    </div>
                    <div class="aid-img-desc__body">
                        <div class="aid-img-desc__text" id="img-desc-text"></div>
                    </div>
                    <div class="aid-img-desc__verdict" id="img-verdict">
                        <div class="aid-img-desc__verdict-icon" id="img-verdict-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <span class="aid-img-desc__verdict-label" id="img-verdict-label"></span>
                        <span class="aid-img-desc__verdict-conf" id="img-verdict-conf"></span>
                        <div class="aid-img-desc__verdict-bar"><div class="aid-img-desc__verdict-fill" id="img-verdict-fill"></div></div>
                    </div>
                </div>
            </div>
        `;

        /* ── DOM refs ── */
        const dropzone = document.getElementById('img-dropzone');
        const fileInput = document.getElementById('img-file-input');
        const previewWrap = document.getElementById('img-preview');
        const previewImg = document.getElementById('img-preview-img');
        const shimmer = document.getElementById('img-shimmer');
        const statusPill = document.getElementById('img-status');
        const statusText = document.getElementById('img-status-text');
        const removeBtn = document.getElementById('img-remove');
        const descCard = document.getElementById('img-desc');
        const descText = document.getElementById('img-desc-text');
        const verdict = document.getElementById('img-verdict');
        const verdictIcon = document.getElementById('img-verdict-icon');
        const verdictLabel = document.getElementById('img-verdict-label');
        const verdictConf = document.getElementById('img-verdict-conf');
        const verdictFill = document.getElementById('img-verdict-fill');
        const replayBtn = document.getElementById('raw-demo-replay');

        let isAnimating = false, typeTimer = null, timeouts = [];

        const addTimeout = (fn, ms) => { const t = setTimeout(fn, ms); timeouts.push(t); return t; };

        /* ── Cleanup ── */
        const cleanup = () => {
            clearInterval(typeTimer);
            timeouts.forEach(t => clearTimeout(t));
            timeouts = [];
            shimmer.classList.remove('revealing', 'done');
            shimmer.style.clipPath = '';
            statusPill.classList.remove('active');
            descCard.classList.remove('visible');
            verdict.classList.remove('visible');
            descText.innerHTML = '';
            verdictFill.style.width = '0%';
        };

        /* ── Type text word-by-word ── */
        const typeWords = (text, el, speed, cb) => {
            const words = text.split(' ');
            let i = 0;
            el.innerHTML = '<span class="aid-img-desc__cursor"></span>';
            typeTimer = setInterval(() => {
                if (i >= words.length) {
                    clearInterval(typeTimer);
                    // Remove cursor
                    const cur = el.querySelector('.aid-img-desc__cursor');
                    if (cur) cur.remove();
                    if (cb) cb();
                    return;
                }
                const cur = el.querySelector('.aid-img-desc__cursor');
                if (cur) cur.remove();
                el.innerHTML = words.slice(0, i + 1).join(' ') + ' <span class="aid-img-desc__cursor"></span>';
                i++;
            }, speed);
        };

        /* ── Run the full scan + describe flow ── */
        const runFlow = (description, isNatural, confidence) => {
            if (isAnimating) return;
            isAnimating = true;
            cleanup();
            dropzone.classList.add('has-image');
            previewWrap.classList.add('visible');

            // Phase 1: Shimmer reveal (lazy loading effect)
            statusPill.classList.add('active');
            statusText.textContent = 'Scanning image…';

            addTimeout(() => {
                shimmer.classList.add('revealing');
            }, 500);

            // Phase 2: After shimmer reveal completes, change status
            addTimeout(() => {
                statusText.textContent = 'Analyzing content…';
            }, 2200);

            // Phase 3: Hide status, show description card
            addTimeout(() => {
                statusPill.classList.remove('active');
                shimmer.classList.add('done');
                descCard.classList.add('visible');

                // Type description word-by-word
                typeWords(description, descText, 70, () => {
                    // Phase 4: Show verdict after description finishes
                    addTimeout(() => {
                        verdictIcon.className = 'aid-img-desc__verdict-icon ' + (isNatural ? 'natural' : 'ai-gen');
                        verdictLabel.textContent = isNatural ? 'Natural Image' : 'AI Generated';
                        verdictConf.textContent = confidence + '% confidence';
                        verdictFill.className = 'aid-img-desc__verdict-fill ' + (isNatural ? 'natural' : 'ai-gen');
                        verdict.classList.add('visible');
                        requestAnimationFrame(() => { verdictFill.style.width = confidence + '%'; });
                        addTimeout(() => { isAnimating = false; }, 1200);
                    }, 400);
                });
            }, 3800);
        };

        /* ── Reset ── */
        const resetWidget = () => {
            cleanup();
            isAnimating = false;
            dropzone.classList.remove('has-image');
            previewWrap.classList.remove('visible');
            previewImg.src = '';
            fileInput.value = '';
        };

        /* ── Draw demo farming landscape ── */
        const drawFarmScene = () => {
            const c = document.createElement('canvas');
            c.width = 720; c.height = 450;
            const ctx = c.getContext('2d');

            // Sky gradient (golden sunset)
            const skyGrad = ctx.createLinearGradient(0, 0, 0, 260);
            skyGrad.addColorStop(0, '#1a237e');
            skyGrad.addColorStop(0.3, '#ff6f00');
            skyGrad.addColorStop(0.6, '#ffab40');
            skyGrad.addColorStop(1, '#ffe082');
            ctx.fillStyle = skyGrad;
            ctx.fillRect(0, 0, 720, 260);

            // Sun
            ctx.beginPath(); ctx.arc(540, 150, 45, 0, Math.PI * 2);
            const sunGrad = ctx.createRadialGradient(540, 150, 10, 540, 150, 45);
            sunGrad.addColorStop(0, '#fff9c4');
            sunGrad.addColorStop(0.5, '#ffee58');
            sunGrad.addColorStop(1, '#ff8f00');
            ctx.fillStyle = sunGrad; ctx.fill();

            // Sun glow
            ctx.beginPath(); ctx.arc(540, 150, 70, 0, Math.PI * 2);
            const glowGrad = ctx.createRadialGradient(540, 150, 30, 540, 150, 70);
            glowGrad.addColorStop(0, 'rgba(255,183,77,0.3)');
            glowGrad.addColorStop(1, 'rgba(255,183,77,0)');
            ctx.fillStyle = glowGrad; ctx.fill();

            // Distant hills
            ctx.beginPath();
            ctx.moveTo(0, 230); ctx.quadraticCurveTo(180, 170, 360, 210);
            ctx.quadraticCurveTo(540, 250, 720, 200); ctx.lineTo(720, 280); ctx.lineTo(0, 280);
            ctx.fillStyle = '#4e7c3a'; ctx.fill();

            // Mid hills
            ctx.beginPath();
            ctx.moveTo(0, 260); ctx.quadraticCurveTo(120, 230, 250, 250);
            ctx.quadraticCurveTo(400, 270, 500, 245); ctx.quadraticCurveTo(630, 220, 720, 250);
            ctx.lineTo(720, 300); ctx.lineTo(0, 300);
            ctx.fillStyle = '#5d8c3e'; ctx.fill();

            // Ground / field
            const fieldGrad = ctx.createLinearGradient(0, 280, 0, 450);
            fieldGrad.addColorStop(0, '#c8a34a');
            fieldGrad.addColorStop(0.4, '#d4a843');
            fieldGrad.addColorStop(1, '#8d6e2f');
            ctx.fillStyle = fieldGrad;
            ctx.fillRect(0, 280, 720, 170);

            // Wheat field texture lines
            ctx.strokeStyle = 'rgba(139,107,47,0.3)';
            ctx.lineWidth = 1;
            for (let y = 290; y < 450; y += 8) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                for (let x = 0; x < 720; x += 20) {
                    ctx.lineTo(x + 10, y + (Math.sin(x * 0.05 + y) * 2));
                }
                ctx.stroke();
            }

            // ── Person 1 (bending down, harvesting) — left side ──
            ctx.fillStyle = '#3e2723';
            // Body bent
            ctx.beginPath();
            ctx.ellipse(220, 340, 10, 18, 0.4, 0, Math.PI * 2);
            ctx.fill();
            // Head
            ctx.beginPath(); ctx.arc(230, 318, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#5d4037'; ctx.fill();
            // Hat
            ctx.fillStyle = '#795548';
            ctx.beginPath(); ctx.ellipse(230, 314, 12, 4, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillRect(224, 308, 12, 6);
            // Arms reaching down
            ctx.strokeStyle = '#3e2723'; ctx.lineWidth = 3; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(215, 335); ctx.lineTo(200, 360); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(225, 340); ctx.lineTo(240, 362); ctx.stroke();
            // Legs
            ctx.beginPath(); ctx.moveTo(215, 355); ctx.lineTo(210, 385); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(225, 355); ctx.lineTo(230, 384); ctx.stroke();

            // ── Person 2 (standing, holding wheat bundle) — right side ──
            ctx.fillStyle = '#4e342e';
            // Body upright
            ctx.beginPath();
            ctx.ellipse(450, 330, 9, 22, 0, 0, Math.PI * 2);
            ctx.fill();
            // Head
            ctx.beginPath(); ctx.arc(450, 302, 8, 0, Math.PI * 2);
            ctx.fillStyle = '#6d4c41'; ctx.fill();
            // Hat
            ctx.fillStyle = '#8d6e63';
            ctx.beginPath(); ctx.ellipse(450, 298, 12, 4, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillRect(444, 292, 12, 6);
            // Arms — one holding wheat bundle up
            ctx.strokeStyle = '#4e342e'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(443, 320); ctx.lineTo(425, 345); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(457, 318); ctx.lineTo(470, 295); ctx.stroke();
            // Wheat bundle in raised hand
            ctx.strokeStyle = '#c8a34a'; ctx.lineWidth = 2;
            for (let i = -3; i <= 3; i++) {
                ctx.beginPath(); ctx.moveTo(470 + i * 2, 295); ctx.lineTo(468 + i * 3, 270); ctx.stroke();
            }
            // Wheat heads
            ctx.fillStyle = '#d4a843';
            for (let i = -3; i <= 3; i++) {
                ctx.beginPath(); ctx.ellipse(468 + i * 3, 268, 2, 5, 0.2 * i, 0, Math.PI * 2); ctx.fill();
            }
            // Legs
            ctx.strokeStyle = '#4e342e'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(445, 350); ctx.lineTo(440, 388); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(455, 350); ctx.lineTo(458, 388); ctx.stroke();

            // Clouds
            ctx.fillStyle = 'rgba(255,255,255,0.15)';
            [[120, 60, 40], [180, 50, 30], [80, 70, 25], [580, 80, 35], [630, 70, 25]].forEach(([x, y, r]) => {
                ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
            });

            // Birds
            ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 1.5;
            [[300, 90], [330, 80], [360, 95], [600, 50], [620, 60]].forEach(([x, y]) => {
                ctx.beginPath(); ctx.moveTo(x - 6, y + 3); ctx.quadraticCurveTo(x, y - 3, x + 6, y + 3); ctx.stroke();
            });

            return c.toDataURL();
        };

        /* ── Auto-play demo ── */
        const startAutoplay = () => {
            resetWidget();
            previewImg.src = drawFarmScene();
            addTimeout(() => {
                runFlow(
                    'A golden sunset landscape showing a wheat field with two farmers at work. One person is bending down harvesting crops while the other stands holding a bundle of wheat. Rolling green hills extend into the distance under a warm amber sky with scattered clouds and birds in flight.',
                    true,
                    97
                );
            }, 500);
        };

        /* ── User interactions ── */
        dropzone.addEventListener('click', (e) => {
            if (e.target.closest('.aid-img-remove') || e.target.closest('.aid-replay-btn')) return;
            if (!dropzone.classList.contains('has-image')) fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file || !file.type.startsWith('image/')) return;
            resetWidget();
            const reader = new FileReader();
            reader.onload = (ev) => {
                previewImg.src = ev.target.result;
                addTimeout(() => {
                    runFlow(
                        'Uploaded image detected. Analyzing visual elements, composition, lighting patterns and texture artifacts to determine content description and authenticity of the source.',
                        Math.random() > 0.5,
                        Math.floor(78 + Math.random() * 20)
                    );
                }, 300);
            };
            reader.readAsDataURL(file);
        });

        ['dragenter', 'dragover'].forEach(ev => dropzone.addEventListener(ev, (e) => { e.preventDefault(); dropzone.classList.add('drag-over'); }));
        ['dragleave', 'drop'].forEach(ev => dropzone.addEventListener(ev, () => { dropzone.classList.remove('drag-over'); }));
        dropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (!file || !file.type.startsWith('image/')) return;
            resetWidget();
            const reader = new FileReader();
            reader.onload = (ev) => {
                previewImg.src = ev.target.result;
                addTimeout(() => {
                    runFlow(
                        'Uploaded image detected. Analyzing visual elements, composition, lighting patterns and texture artifacts to determine content description and authenticity of the source.',
                        Math.random() > 0.5,
                        Math.floor(78 + Math.random() * 20)
                    );
                }, 300);
            };
            reader.readAsDataURL(file);
        });

        removeBtn.addEventListener('click', (e) => { e.stopPropagation(); resetWidget(); });
        replayBtn.addEventListener('click', () => { cleanup(); isAnimating = false; startAutoplay(); });
        startAutoplay();

    } else if (id === 'inline-help') {
        /* ────────────────────────────────────────────────
           INLINE HELP — Interactive Widget  v2
           Phase 1: Document — type, pause mid-word, ghost sentence, accept
           Phase 2: Code    — type, pause mid-word, ghost code, accept
           Both show "Tab ↵" tooltip + alternative options
           ──────────────────────────────────────────────── */
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-ih-widget { width: 100%; max-width: 520px; display: flex; flex-direction: column; gap: 0; position: relative; }

                /* ── Tab Switcher ── */
                .aid-ih-tabs {
                    display: flex; gap: 0; background: #f3f4f6; border-radius: 10px 10px 0 0;
                    padding: 4px; position: relative; z-index: 2;
                }
                .aid-ih-tab {
                    flex: 1; padding: 8px 0; border: none; background: transparent; cursor: pointer;
                    font-size: 12px; font-weight: 600; color: #9ca3af; border-radius: 8px;
                    transition: all 0.3s ease; display: flex; align-items: center; justify-content: center; gap: 6px;
                    font-family: 'Manrope', sans-serif;
                }
                .aid-ih-tab.active { background: #ffffff; color: #1f2937; box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
                .aid-ih-tab__dot { width: 6px; height: 6px; border-radius: 50%; opacity: 0.6; }
                .aid-ih-tab__dot--doc { background: ${data.color}; }
                .aid-ih-tab__dot--code { background: #22c55e; }

                /* ── Editor Shell ── */
                .aid-ih-editor {
                    background: #ffffff; border: 1px solid #e5e7eb; border-top: none;
                    border-radius: 0 0 14px 14px; overflow: hidden; position: relative;
                    min-height: 260px; box-shadow: 0 4px 20px rgba(0,0,0,0.04);
                }

                /* ── Document Phase ── */
                .aid-ih-doc {
                    padding: 24px 22px 20px; font-family: 'Georgia', 'Libre Baskerville', serif;
                    font-size: 14.5px; line-height: 1.85; color: #374151; position: relative;
                    display: block;
                }
                .aid-ih-doc.hidden { display: none; }
                .aid-ih-doc__title {
                    font-size: 17px; font-weight: 700; color: #1f2937; margin-bottom: 14px;
                    font-family: 'Manrope', sans-serif; letter-spacing: -0.2px;
                    display: flex; align-items: center; gap: 8px;
                }
                .aid-ih-doc__title-icon {
                    width: 24px; height: 24px; border-radius: 6px;
                    background: ${data.color}12; display: flex; align-items: center; justify-content: center;
                }
                .aid-ih-doc__body { position: relative; }
                .aid-ih-doc__typed { color: #374151; }
                .aid-ih-doc__cursor {
                    display: inline-block; width: 2px; height: 18px;
                    background: #374151; vertical-align: text-bottom; margin-left: 0;
                    animation: ihBlink 0.55s step-end infinite;
                }
                @keyframes ihBlink { 50% { opacity: 0; } }
                .aid-ih-doc__ghost {
                    color: ${data.color}50; font-style: normal;
                    transition: opacity 0.3s ease;
                }

                /* ── Inline Tooltip (floats near cursor) ── */
                .aid-ih-tip {
                    position: absolute; z-index: 10;
                    display: flex; flex-direction: column; gap: 6px;
                    opacity: 0; transform: translateY(6px);
                    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                    pointer-events: none;
                }
                .aid-ih-tip.visible { opacity: 1; transform: translateY(0); }

                .aid-ih-tip__badge {
                    display: inline-flex; align-items: center; gap: 5px;
                    background: #1f2937; color: #ffffff; border-radius: 7px;
                    padding: 5px 10px; font-size: 11px; font-weight: 600;
                    font-family: 'Manrope', sans-serif;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.18);
                    width: fit-content;
                }
                .aid-ih-tip__badge::before {
                    content: ''; position: absolute; top: -4px; left: 14px;
                    width: 8px; height: 8px; background: #1f2937;
                    transform: rotate(45deg); border-radius: 1px;
                }
                .aid-ih-tip__key {
                    display: inline-flex; align-items: center; justify-content: center;
                    padding: 1px 6px; border-radius: 4px;
                    background: rgba(255,255,255,0.18); font-size: 10px; font-weight: 700;
                    letter-spacing: 0.3px;
                }
                .aid-ih-tip__sparkle { font-size: 10px; }

                /* ── Options Row ── */
                .aid-ih-options {
                    display: flex; gap: 5px; flex-wrap: wrap;
                }
                .aid-ih-opt {
                    display: inline-flex; align-items: center; gap: 4px;
                    padding: 4px 10px; border-radius: 6px;
                    background: #ffffff; border: 1px solid #e5e7eb;
                    font-size: 11px; font-weight: 500; color: #6b7280;
                    font-family: 'Manrope', sans-serif;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
                    opacity: 0; transform: translateY(4px);
                    transition: all 0.25s ease;
                }
                .aid-ih-opt.visible { opacity: 1; transform: translateY(0); }
                .aid-ih-opt:first-child { transition-delay: 0.1s; }
                .aid-ih-opt:nth-child(2) { transition-delay: 0.18s; }
                .aid-ih-opt:nth-child(3) { transition-delay: 0.26s; }
                .aid-ih-opt .opt-dot {
                    width: 5px; height: 5px; border-radius: 50%; background: #d1d5db;
                }

                /* ── Accept flash ── */
                .aid-ih-doc__flash {
                    display: none; position: absolute; inset: 0; z-index: 1;
                    background: ${data.color}08; border-radius: 8px; pointer-events: none;
                }
                .aid-ih-doc__flash.active {
                    display: block;
                    animation: ihFlash 0.6s ease forwards;
                }
                @keyframes ihFlash {
                    0% { opacity: 1; } 100% { opacity: 0; }
                }

                /* ── Code Phase ── */
                .aid-ih-code {
                    display: none; position: relative; background: #1e1e2e;
                    font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
                    font-size: 13px; line-height: 1.75;
                }
                .aid-ih-code.visible { display: block; }
                .aid-ih-code__header {
                    display: flex; align-items: center; gap: 8px; padding: 10px 16px;
                    background: #181825; border-bottom: 1px solid #313244;
                }
                .aid-ih-code__dots { display: flex; gap: 5px; }
                .aid-ih-code__dot { width: 8px; height: 8px; border-radius: 50%; }
                .aid-ih-code__dot--r { background: #f38ba8; }
                .aid-ih-code__dot--y { background: #f9e2af; }
                .aid-ih-code__dot--g { background: #a6e3a1; }
                .aid-ih-code__filename {
                    font-size: 11px; color: #6c7086; margin-left: 8px;
                    font-family: 'SF Mono', 'Fira Code', monospace;
                }
                .aid-ih-code__body { padding: 14px 16px; position: relative; min-height: 190px; overflow: hidden; }
                .aid-ih-code__lines {
                    position: absolute; left: 0; top: 14px; width: 36px;
                    text-align: right; padding-right: 10px; color: #45475a;
                    font-size: 12px; line-height: 1.75; user-select: none;
                    white-space: pre;
                }
                .aid-ih-code__content { margin-left: 36px; color: #cdd6f4; white-space: pre; }

                /* Syntax (Catppuccin) */
                .ck { color: #89b4fa; }
                .cs { color: #a6e3a1; }
                .cf { color: #cba6f7; }
                .cn { color: #fab387; }
                .cc { color: #6c7086; font-style: italic; }
                .cv { color: #cdd6f4; }
                .ct { color: #89dceb; }

                .aid-ih-code__cursor-c {
                    display: inline-block; width: 2px; height: 17px;
                    background: #cdd6f4; vertical-align: text-bottom;
                    animation: ihBlink 0.55s step-end infinite;
                }
                .aid-ih-code__ghost-c {
                    color: #6c708666;
                }

                /* Code tooltip */
                .aid-ih-code-tip {
                    position: absolute; z-index: 10;
                    display: flex; flex-direction: column; gap: 5px;
                    opacity: 0; transform: translateY(6px);
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    pointer-events: none;
                }
                .aid-ih-code-tip.visible { opacity: 1; transform: translateY(0); }
                .aid-ih-code-tip__badge {
                    display: inline-flex; align-items: center; gap: 5px;
                    background: #45475a; color: #cdd6f4; border-radius: 6px;
                    padding: 4px 10px; font-size: 11px; font-weight: 600;
                    font-family: 'SF Mono', monospace;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
                    width: fit-content;
                }
                .aid-ih-code-tip__badge::before {
                    content: ''; position: absolute; top: -4px; left: 14px;
                    width: 8px; height: 8px; background: #45475a;
                    transform: rotate(45deg); border-radius: 1px;
                }
                .aid-ih-code-opts {
                    display: flex; gap: 4px; flex-wrap: wrap;
                }
                .aid-ih-code-opt {
                    display: inline-flex; align-items: center; gap: 4px;
                    padding: 3px 8px; border-radius: 5px;
                    background: #313244; border: 1px solid #45475a;
                    font-size: 11px; color: #a6adc8;
                    font-family: 'SF Mono', monospace;
                    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
                    opacity: 0; transform: translateY(3px);
                    transition: all 0.25s ease;
                }
                .aid-ih-code-opt.visible { opacity: 1; transform: translateY(0); }
                .aid-ih-code-opt:nth-child(1) { transition-delay: 0.08s; }
                .aid-ih-code-opt:nth-child(2) { transition-delay: 0.16s; }
                .aid-ih-code-opt:nth-child(3) { transition-delay: 0.24s; }
                .aid-ih-code-opt .co-icon {
                    width: 14px; height: 14px; border-radius: 3px;
                    display: inline-flex; align-items: center; justify-content: center;
                    font-size: 8px; font-weight: 700;
                }
                .co-icon--v { background: #89b4fa33; color: #89b4fa; }
                .co-icon--f { background: #cba6f733; color: #cba6f7; }
            </style>

            <div class="aid-ih-widget">
                <div class="aid-ih-tabs">
                    <button class="aid-ih-tab active" id="ih-tab-doc">
                        <span class="aid-ih-tab__dot aid-ih-tab__dot--doc"></span> Document
                    </button>
                    <button class="aid-ih-tab" id="ih-tab-code">
                        <span class="aid-ih-tab__dot aid-ih-tab__dot--code"></span> Code
                    </button>
                </div>
                <div class="aid-ih-editor">
                    <!-- Document Phase -->
                    <div class="aid-ih-doc" id="ih-doc">
                        <div class="aid-ih-doc__title">
                            <div class="aid-ih-doc__title-icon">
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${data.color}" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                            </div>
                            Project Brief
                        </div>
                        <div class="aid-ih-doc__body" id="ih-doc-body">
                            <span class="aid-ih-doc__typed" id="ih-doc-typed"></span><span class="aid-ih-doc__cursor" id="ih-doc-cursor"></span><span class="aid-ih-doc__ghost" id="ih-doc-ghost"></span>
                            <div class="aid-ih-doc__flash" id="ih-doc-flash"></div>
                        </div>
                        <div class="aid-ih-tip" id="ih-tip">
                            <div class="aid-ih-tip__badge">
                                <span class="aid-ih-tip__sparkle">✨</span>
                                AI Suggestion
                                <span class="aid-ih-tip__key">Tab ↵</span>
                            </div>
                            <div class="aid-ih-options" id="ih-options"></div>
                        </div>
                    </div>
                    <!-- Code Phase -->
                    <div class="aid-ih-code" id="ih-code">
                        <div class="aid-ih-code__header">
                            <div class="aid-ih-code__dots">
                                <span class="aid-ih-code__dot aid-ih-code__dot--r"></span>
                                <span class="aid-ih-code__dot aid-ih-code__dot--y"></span>
                                <span class="aid-ih-code__dot aid-ih-code__dot--g"></span>
                            </div>
                            <span class="aid-ih-code__filename">utils.js</span>
                        </div>
                        <div class="aid-ih-code__body">
                            <div class="aid-ih-code__lines" id="ih-code-lines"></div>
                            <div class="aid-ih-code__content" id="ih-code-content"></div>
                            <div class="aid-ih-code-tip" id="ih-code-tip">
                                <div class="aid-ih-code-tip__badge">
                                    ✨ <span class="aid-ih-tip__key">Tab ↵</span> to accept
                                </div>
                                <div class="aid-ih-code-opts" id="ih-code-opts"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        /* ── DOM refs ── */
        const tabDoc = document.getElementById('ih-tab-doc');
        const tabCode = document.getElementById('ih-tab-code');
        const docPanel = document.getElementById('ih-doc');
        const codePanel = document.getElementById('ih-code');
        const docTyped = document.getElementById('ih-doc-typed');
        const docGhost = document.getElementById('ih-doc-ghost');
        const docCursor = document.getElementById('ih-doc-cursor');
        const docFlash = document.getElementById('ih-doc-flash');
        const tip = document.getElementById('ih-tip');
        const optionsEl = document.getElementById('ih-options');
        const codeLineEl = document.getElementById('ih-code-lines');
        const codeCont = document.getElementById('ih-code-content');
        const codeTip = document.getElementById('ih-code-tip');
        const codeOpts = document.getElementById('ih-code-opts');
        const replayBtn = document.getElementById('raw-demo-replay');

        let timeouts = [], intervals = [];
        const ato = (fn, ms) => { const t = setTimeout(fn, ms); timeouts.push(t); return t; };
        const aint = (fn, ms) => { const t = setInterval(fn, ms); intervals.push(t); return t; };

        const cleanup = () => {
            timeouts.forEach(t => clearTimeout(t));
            intervals.forEach(t => clearInterval(t));
            timeouts = []; intervals = [];
            docTyped.textContent = '';
            docGhost.textContent = '';
            docCursor.style.display = 'inline-block';
            tip.classList.remove('visible');
            optionsEl.innerHTML = '';
            codeCont.innerHTML = '';
            codeLineEl.innerHTML = '';
            codeTip.classList.remove('visible');
            codeOpts.innerHTML = '';
            docFlash.classList.remove('active');
            tabDoc.classList.add('active');
            tabCode.classList.remove('active');
            docPanel.classList.remove('hidden');
            codePanel.classList.remove('visible');
        };

        /* ── Typewriter (char-by-char) ── */
        const typeChars = (text, el, speed, cb) => {
            let i = 0;
            const timer = aint(() => {
                if (i >= text.length) { clearInterval(timer); if (cb) cb(); return; }
                el.textContent += text[i]; i++;
            }, speed);
        };

        /* ═══════════════════════════════════
           PHASE 1 — Document
           Type → pause mid-word → ghost completion → tooltip + options → accept
           ═══════════════════════════════════ */
        const runDocPhase = (onDone) => {
            // Text before the pause (ends mid-word "integr")
            const beforePause = 'The new AI assistant will help users draft content faster by providing real-time suggestions. It should integr';
            // Ghost completion for the rest of the sentence
            const ghostCompletion = 'ate seamlessly with the existing editor workflow and support multiple output formats.';
            // Alternative options
            const altOptions = [
                { label: '…connect with third-party APIs' },
                { label: '…work offline for privacy' },
                { label: '…adapt to the user\'s tone' }
            ];

            typeChars(beforePause, docTyped, 32, () => {
                // Pause — cursor blinks on "integr" (mid-word)
                ato(() => {
                    // Show ghost text completion
                    docGhost.textContent = ghostCompletion;

                    // Position and show tooltip below the text
                    ato(() => {
                        const bodyRect = document.getElementById('ih-doc-body').getBoundingClientRect();
                        const cursorRect = docCursor.getBoundingClientRect();
                        tip.style.top = (cursorRect.bottom - bodyRect.top + 8) + 'px';
                        tip.style.left = Math.max(0, cursorRect.left - bodyRect.left - 10) + 'px';
                        tip.classList.add('visible');

                        // Show options staggered
                        ato(() => {
                            optionsEl.innerHTML = altOptions.map(o =>
                                `<div class="aid-ih-opt"><span class="opt-dot"></span>${o.label}</div>`
                            ).join('');
                            ato(() => {
                                optionsEl.querySelectorAll('.aid-ih-opt').forEach(el => el.classList.add('visible'));
                            }, 50);
                        }, 400);

                        // ACCEPT the suggestion (simulate Tab press)
                        ato(() => {
                            tip.classList.remove('visible');
                            docGhost.textContent = '';
                            docTyped.textContent = beforePause + ghostCompletion;
                            docFlash.classList.add('active');

                            ato(() => {
                                docFlash.classList.remove('active');
                                // Transition to code phase
                                ato(() => { if (onDone) onDone(); }, 1400);
                            }, 600);
                        }, 3500);
                    }, 300);
                }, 700);
            });
        };

        /* ═══════════════════════════════════
           PHASE 2 — Code
           Type lines → pause mid-word → ghost code → tooltip + options → accept
           ═══════════════════════════════════ */
        const runCodePhase = () => {
            tabDoc.classList.remove('active');
            tabCode.classList.add('active');
            docPanel.classList.add('hidden');
            codePanel.classList.add('visible');

            // Pre-existing code lines (appear instantly as context)
            const existingLines = [
                '<span class="ck">import</span> { fetchData } <span class="ck">from</span> <span class="cs">\'./api\'</span>;',
                '',
                '<span class="ck">async function</span> <span class="cf">loadUser</span>(<span class="cv">userId</span>) {',
                '  <span class="ck">const</span> <span class="cv">response</span> = <span class="ck">await</span> <span class="cf">fetchData</span>(<span class="cs">`/users/${</span><span class="cv">userId</span><span class="cs">}`</span>);',
                '  <span class="ck">const</span> <span class="cv">user</span> = response.<span class="cf">json</span>();',
                '',
                '  <span class="ck">if</span> (!user) {',
                '    <span class="ck">throw new</span> <span class="ct">Error</span>(<span class="cs">\'User not found\'</span>);',
                '  }',
                ''
            ];

            // The line being actively typed — pauses mid-word at "na"
            const typingLinePrefix = '  <span class="ck">return</span> user.na';
            // Ghost completion
            const ghostCode = 'me;';
            // Alt options
            const codeAlts = [
                { icon: 'V', cls: 'co-icon--v', label: '.email' },
                { icon: 'V', cls: 'co-icon--v', label: '.role' },
                { icon: 'F', cls: 'co-icon--f', label: '.toJSON()' }
            ];

            // Render existing lines instantly
            existingLines.forEach((html, i) => {
                const div = document.createElement('div');
                div.innerHTML = html || '&nbsp;';
                codeCont.appendChild(div);
            });
            codeLineEl.textContent = existingLines.map((_, i) => i + 1).join('\n');

            // Now type the active line character by character
            const activeLineCharacters = '  return user.na';
            const typedLine = document.createElement('div');
            typedLine.id = 'ih-active-line';
            codeCont.appendChild(typedLine);

            // Update line numbers for active line
            const totalLines = existingLines.length + 1;
            codeLineEl.textContent = Array.from({ length: totalLines }, (_, i) => i + 1).join('\n');

            let charIdx = 0;
            const typeCodeChar = () => {
                if (charIdx >= activeLineCharacters.length) {
                    // Pause mid-word — cursor sits after "na"
                    typedLine.innerHTML = typingLinePrefix + '<span class="aid-ih-code__cursor-c"></span>';

                    ato(() => {
                        // Show ghost code completion
                        typedLine.innerHTML = typingLinePrefix + '<span class="aid-ih-code__cursor-c"></span><span class="aid-ih-code__ghost-c">' + ghostCode + '</span>';

                        // Position and show code tooltip
                        ato(() => {
                            const bodyEl = document.querySelector('.aid-ih-code__body');
                            codeTip.style.top = (totalLines * 22.75 + 20) + 'px';
                            codeTip.style.left = '100px';
                            codeTip.classList.add('visible');

                            // Show alternative options
                            ato(() => {
                                codeOpts.innerHTML = codeAlts.map(a =>
                                    `<div class="aid-ih-code-opt"><span class="co-icon ${a.cls}">${a.icon}</span>${a.label}</div>`
                                ).join('');
                                ato(() => {
                                    codeOpts.querySelectorAll('.aid-ih-code-opt').forEach(el => el.classList.add('visible'));
                                }, 50);
                            }, 400);

                            // Accept the suggestion
                            ato(() => {
                                codeTip.classList.remove('visible');
                                typedLine.innerHTML = '  <span class="ck">return</span> user.<span class="cv">name</span>;';

                                // Add closing brace
                                ato(() => {
                                    const closeLine = document.createElement('div');
                                    closeLine.textContent = '}';
                                    codeCont.appendChild(closeLine);
                                    codeLineEl.textContent = Array.from({ length: totalLines + 1 }, (_, i) => i + 1).join('\n');
                                }, 500);
                            }, 3500);
                        }, 350);
                    }, 700);
                    return;
                }

                const raw = activeLineCharacters;
                const current = raw.substring(0, charIdx + 1);
                // Build syntax-highlighted version up to current position
                let highlighted = current;
                if (current.includes('return')) {
                    highlighted = current.replace('return', '<span class="ck">return</span>');
                }
                typedLine.innerHTML = highlighted + '<span class="aid-ih-code__cursor-c"></span>';
                charIdx++;
                ato(typeCodeChar, 65);
            };

            ato(typeCodeChar, 600);
        };

        /* ── Autoplay ── */
        const startAutoplay = () => {
            cleanup();
            ato(() => {
                runDocPhase(() => runCodePhase());
            }, 500);
        };

        replayBtn.addEventListener('click', () => { cleanup(); startAutoplay(); });
        startAutoplay();


    } else if (id === 'smart-scheduler') {
        /* ═══ Smart Scheduler — Interactive Calendar Widget + CTA ═══ */
        container.innerHTML = replayBtnStyle + `
            <style>
                .ss-wrap{width:100%;max-width:520px;font-family:'Manrope',sans-serif;display:flex;flex-direction:column;gap:14px}
                .ss-cal{background:#fff;border-radius:14px;border:1px solid #e5e7eb;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.05)}
                .ss-header{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid #f3f4f6}
                .ss-month{font-size:14px;font-weight:700;color:#111}
                .ss-nav{display:flex;gap:4px}
                .ss-nav span{width:26px;height:26px;border-radius:7px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:11px;color:#666;background:#f9fafb;border:1px solid #e5e7eb}
                .ss-days{display:grid;grid-template-columns:52px repeat(5,1fr);font-size:10px;color:#9ca3af;text-transform:uppercase;font-weight:600;letter-spacing:.4px;padding:8px 14px 4px;border-bottom:1px solid #f3f4f6;gap:2px}
                .ss-grid{display:grid;grid-template-columns:52px repeat(5,1fr);gap:2px;padding:10px 14px 14px}
                .ss-time{font-size:10px;color:#b0b6c4;display:flex;align-items:flex-start;padding-top:2px;font-weight:500}
                .ss-cell{min-height:36px;border-radius:7px;position:relative;transition:all .35s}
                .ss-shift{border-radius:7px;padding:4px 7px;font-size:9px;font-weight:600;line-height:1.4;cursor:pointer;position:relative;opacity:0;transform:translateY(6px);transition:all .35s}
                .ss-shift.show{opacity:1;transform:translateY(0)}
                .ss-shift.eng{background:#dbeafe;color:#1d4ed8;border-left:3px solid #3b82f6}
                .ss-shift.des{background:#ede9fe;color:#6d28d9;border-left:3px solid #8b5cf6}
                .ss-shift.mkt{background:#fef3c7;color:#92400e;border-left:3px solid #f59e0b}
                .ss-shift.ops{background:#dcfce7;color:#166534;border-left:3px solid #22c55e}
                .ss-shift.conflict{box-shadow:0 0 0 2px #ef4444}
                .ss-ai{position:absolute;top:-2px;right:-2px;width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#0ea5e9);display:flex;align-items:center;justify-content:center;font-size:7px;color:#fff}
                .ss-conflict-badge{background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:8px 14px;display:flex;align-items:center;gap:8px;font-size:11px;color:#dc2626;font-weight:600;opacity:0;transform:translateY(8px);transition:all .4s}
                .ss-conflict-badge.show{opacity:1;transform:translateY(0)}
                .ss-conflict-badge .dot{width:8px;height:8px;border-radius:50%;background:#ef4444;animation:ss-pulse 1s infinite}
                @keyframes ss-pulse{0%,100%{opacity:1}50%{opacity:.3}}
                .ss-ai-bar{background:linear-gradient(135deg,#eff6ff,#f0f0ff);border:1px solid #c7d2fe;border-radius:10px;padding:10px 14px;display:flex;align-items:center;gap:10px;font-size:11px;color:#4338ca;font-weight:500;opacity:0;transform:translateY(8px);transition:all .4s}
                .ss-ai-bar.show{opacity:1;transform:translateY(0)}
                .ss-ai-bar .sparkle{font-size:16px}
                .ss-legend{display:flex;gap:12px;flex-wrap:wrap;padding:0 4px}
                .ss-legend span{display:flex;align-items:center;gap:4px;font-size:10px;color:#666;font-weight:500}
                .ss-legend .dot{width:8px;height:8px;border-radius:2px}
                .ss-cta-wrap{text-align:center;padding:8px 0 0}
                .ss-cta{display:inline-flex;align-items:center;gap:8px;padding:12px 28px;border-radius:12px;font-size:14px;font-weight:700;font-family:'Manrope',sans-serif;color:#fff;background:linear-gradient(135deg,#0ea5e9,#6366f1);text-decoration:none;transition:all .25s;box-shadow:0 6px 24px rgba(99,102,241,.3);cursor:pointer;border:none}
                .ss-cta:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(99,102,241,.4)}
                .ss-cta svg{transition:transform .2s}
                .ss-cta:hover svg{transform:translateX(3px)}
            </style>
            <div class="ss-wrap">
                <div class="ss-cal">
                    <div class="ss-header">
                        <div class="ss-month">📅 Feb 24 – 28, 2026</div>
                        <div class="ss-nav"><span>‹</span><span>›</span></div>
                    </div>
                    <div class="ss-days">
                        <span></span><span>Mon 24</span><span>Tue 25</span><span>Wed 26</span><span>Thu 27</span><span>Fri 28</span>
                    </div>
                    <div class="ss-grid" id="ss-grid">
                        <div class="ss-time">9 AM</div>
                        <div class="ss-cell"><div class="ss-shift eng" id="sh1">Engineering<div class="ss-ai">✦</div></div></div>
                        <div class="ss-cell"><div class="ss-shift des" id="sh2">Design</div></div>
                        <div class="ss-cell"><div class="ss-shift eng" id="sh3">Engineering<div class="ss-ai">✦</div></div></div>
                        <div class="ss-cell"><div class="ss-shift mkt" id="sh4">Marketing</div></div>
                        <div class="ss-cell"><div class="ss-shift ops" id="sh5">Operations</div></div>

                        <div class="ss-time">12 PM</div>
                        <div class="ss-cell"><div class="ss-shift mkt" id="sh6">Marketing</div></div>
                        <div class="ss-cell"><div class="ss-shift eng" id="sh7">Engineering</div></div>
                        <div class="ss-cell"><div class="ss-shift ops" id="sh8">Operations<div class="ss-ai">✦</div></div></div>
                        <div class="ss-cell"><div class="ss-shift des conflict" id="sh9">Design ⚠</div></div>
                        <div class="ss-cell"><div class="ss-shift eng" id="sh10">Engineering</div></div>

                        <div class="ss-time">3 PM</div>
                        <div class="ss-cell"><div class="ss-shift ops" id="sh11">Operations</div></div>
                        <div class="ss-cell"><div class="ss-shift mkt" id="sh12">Marketing<div class="ss-ai">✦</div></div></div>
                        <div class="ss-cell"><div class="ss-shift des" id="sh13">Design</div></div>
                        <div class="ss-cell"><div class="ss-shift eng" id="sh14">Engineering</div></div>
                        <div class="ss-cell"><div class="ss-shift des" id="sh15">Design<div class="ss-ai">✦</div></div></div>
                    </div>
                </div>
                <div class="ss-conflict-badge" id="ss-conflict">
                    <span class="dot"></span>
                    1 conflict detected — Thu 12 PM: Design overlaps Engineering stand-up
                </div>
                <div class="ss-ai-bar" id="ss-aibar">
                    <span class="sparkle">✦</span>
                    AI resolved: moved Design to 1 PM — zero overlap, all constraints met.
                </div>
                <div class="ss-legend">
                    <span><span class="dot" style="background:#3b82f6"></span>Engineering</span>
                    <span><span class="dot" style="background:#8b5cf6"></span>Design</span>
                    <span><span class="dot" style="background:#f59e0b"></span>Marketing</span>
                    <span><span class="dot" style="background:#22c55e"></span>Operations</span>
                    <span style="margin-left:auto;color:#6366f1;font-weight:600">✦ = AI suggested</span>
                </div>
                <div class="ss-cta-wrap">
                    <a href="scheduler-onboarding.html" class="ss-cta">
                        ✦ Get Started
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </a>
                </div>
            </div>
        `;

        const replayBtn = document.getElementById('raw-demo-replay');
        const shifts = container.querySelectorAll('.ss-shift');
        const conflictBadge = document.getElementById('ss-conflict');
        const aiBar = document.getElementById('ss-aibar');

        const startAutoplay = () => {
            shifts.forEach(s => { s.classList.remove('show'); });
            conflictBadge.classList.remove('show');
            aiBar.classList.remove('show');
            const conflictEl = document.getElementById('sh9');
            if (conflictEl) { conflictEl.classList.add('conflict'); conflictEl.textContent = 'Design ⚠'; }

            shifts.forEach((s, i) => {
                setTimeout(() => s.classList.add('show'), 200 + i * 120);
            });
            setTimeout(() => conflictBadge.classList.add('show'), 200 + shifts.length * 120 + 400);
            setTimeout(() => {
                if (conflictEl) { conflictEl.classList.remove('conflict'); conflictEl.textContent = 'Design ✓'; }
                conflictBadge.classList.remove('show');
                setTimeout(() => aiBar.classList.add('show'), 300);
            }, 200 + shifts.length * 120 + 2400);
        };

        replayBtn.addEventListener('click', () => startAutoplay());
        startAutoplay();

    } else {
        // High fidelity generic animated layout for ANY un-handled pattern/component
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-generic-mockup {
                    width: 100%; max-width: 480px; display: flex; flex-direction: column; gap: 12px;
                    background: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                .aid-g-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;}
                .aid-g-avatar { width: 32px; height: 32px; border-radius: 8px; background: ${data.color}22; }
                .aid-g-btn { height: 28px; width: 72px; border-radius: 14px; background: ${data.color}; opacity:0.8;}
                .aid-g-line { height: 12px; border-radius: 6px; background: #f3f4f6; width: 100%; position:relative; overflow:hidden;}
                .aid-g-line.short { width: 40%; }
                .aid-g-line.med { width: 75%; }
                
                .aid-g-line::after {
                    content: ""; position: absolute; inset: 0; transform: translateX(-100%);
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
                    animation: shimmer 2s infinite;
                }
                
                .aid-g-chip-row { display: flex; gap: 8px; margin-top: 8px;}
                .aid-g-chip { height: 24px; width: 60px; border-radius: 12px; border: 1px solid ${data.color}33; background: ${data.color}08; }
                
                /* Pulse interaction */
                .aid-generic-mockup.active-pulse { outline: 2px solid ${data.color}66; box-shadow: 0 8px 30px ${data.color}33; transform: scale(1.02); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            </style>
            <div class="aid-generic-mockup" id="generic-mockup">
                <div class="aid-g-header">
                    <div class="aid-g-avatar"></div><div class="aid-g-btn"></div>
                </div>
                <div class="aid-g-line"></div>
                <div class="aid-g-line med"></div>
                <div class="aid-g-line short"></div>
                <div class="aid-g-chip-row">
                    <div class="aid-g-chip"></div><div class="aid-g-chip"></div>
                </div>
            </div>
        `;

        const mockup = document.getElementById('generic-mockup');
        const replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;

        const startDemo = () => {
            if (isAnimating) return; isAnimating = true;
            clearTimeout(activeTimeout); mockup.classList.remove('active-pulse');

            activeTimeout = setTimeout(() => {
                mockup.classList.add('active-pulse');
                activeTimeout = setTimeout(() => {
                    mockup.classList.remove('active-pulse');
                    isAnimating = false;
                }, 1500);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();
    }
}
