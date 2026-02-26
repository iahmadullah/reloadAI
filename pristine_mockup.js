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
