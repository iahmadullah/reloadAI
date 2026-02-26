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

    } else if (id === 'image-input') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-img-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px; overflow: hidden; position: relative;}
                .aid-img-chat { display: flex; flex-direction: column; gap: 12px; min-height: 140px; justify-content: flex-end; padding-bottom: 8px;}
                .aid-img-bubble { align-self: flex-end; background: #f3f4f6; padding: 12px 16px; border-radius: 16px 16px 4px 16px; font-size: 14px; color: #1f2937; max-width: 85%; transform: translateY(10px); opacity: 0; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .aid-img-bubble.show { transform: translateY(0); opacity: 1; }
                .aid-img-bubble img { width: 100%; height: 140px; border-radius: 8px; object-fit: cover; margin-bottom: 8px; display: block; border: 1px solid #e5e7eb;}
                
                .aid-img-input-area { background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 8px 12px; display: flex; flex-direction: column; gap: 12px; transition: border-color 0.3s; box-shadow: 0 2px 10px rgba(0,0,0,0.02);}
                .aid-img-input-area.focused { border-color: ${data.color}; box-shadow: 0 0 0 3px ${data.color}22;}
                
                .aid-img-attachments { display: flex; gap: 8px; overflow: hidden; height: 0; opacity: 0; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                .aid-img-attachments.show { height: 64px; opacity: 1; margin-top: 4px; padding-bottom: 4px;}
                .aid-img-thumb-box { width: 64px; height: 64px; border-radius: 8px; overflow: hidden; position: relative; border: 1px solid #e5e7eb; }
                .aid-img-thumb-box img { width: 100%; height: 100%; object-fit: cover; }
                .aid-img-thumb-loader { position: absolute; bottom: 0; left: 0; height: 4px; background: ${data.color}; width: 0%; transition: width 0.8s ease-out; }
                .aid-img-remove { position: absolute; top: 4px; right: 4px; width: 16px; height: 16px; background: rgba(0,0,0,0.5); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; cursor:pointer;}
                .aid-img-thumb-box:hover .aid-img-remove { opacity: 1; }
                .aid-img-remove svg { width: 10px; height: 10px; }
                
                .aid-img-row { display: flex; align-items: center; gap: 10px; }
                .aid-img-btn { width: 36px; height: 36px; border-radius: 50%; background: #f3f4f6; color: #4b5563; display: flex; align-items: center; justify-content: center; cursor: pointer; border: none; transition: all 0.2s; flex-shrink:0;}
                .aid-img-btn:hover { background: #e5e7eb; }
                .aid-img-btn.active { background: ${data.color}15; color: ${data.color}; }
                .aid-img-input { flex: 1; border: none; outline: none; background: transparent; font-size: 14px; font-family: inherit; color: #1f2937; margin: 0; padding: 8px 0;}
                .aid-img-send { width: 36px; height: 36px; border-radius: 18px; background: ${data.color}; color: white; display: flex; align-items: center; justify-content: center; transition: all 0.2s; opacity:0.5; transform: scale(0.9);}
                .aid-img-send.active { opacity: 1; transform: scale(1); box-shadow: 0 4px 12px ${data.color}44; }
                
                .aid-cursor { display: inline-block; width: 2px; height: 16px; background: ${data.color}; animation: blink 1s step-end infinite; vertical-align: text-bottom; margin-left:1px;}
            </style>
            <div class="aid-img-mockup">
                <div class="aid-img-chat">
                    <div class="aid-img-bubble" id="img-bubble">
                        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop" alt="Modern Architecture">
                        Analyze the architectural style of this building. What era is it from?
                    </div>
                </div>
                <div class="aid-img-input-area" id="img-input-box">
                    <div class="aid-img-attachments" id="img-attachments">
                        <div class="aid-img-thumb-box">
                            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop" alt="Thumb">
                            <div class="aid-img-thumb-loader" id="img-loader"></div>
                            <div class="aid-img-remove"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></div>
                        </div>
                    </div>
                    <div class="aid-img-row">
                        <button class="aid-img-btn" id="img-add-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        </button>
                        <div class="aid-img-input"><span id="img-typed"></span><span class="aid-cursor" id="img-cursor"></span></div>
                        <div class="aid-img-send" id="img-send-btn">
                            <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const addBtn = document.getElementById('img-add-btn'), attBox = document.getElementById('img-attachments'), loader = document.getElementById('img-loader'), inputBox = document.getElementById('img-input-box'), typed = document.getElementById('img-typed'), cursor = document.getElementById('img-cursor'), sendBtn = document.getElementById('img-send-btn'), bubble = document.getElementById('img-bubble');
        const replayBtn = document.getElementById('raw-demo-replay');
        let activeTimer, activeTimeout, isAnimating = false;

        const startDemo = () => {
            if (isAnimating) return; isAnimating = true;
            clearTimeout(activeTimeout); clearInterval(activeTimer);
            attBox.classList.remove('show'); loader.style.width = '0%'; inputBox.classList.remove('focused'); typed.innerHTML = ''; cursor.style.display = 'inline-block'; sendBtn.classList.remove('active'); bubble.classList.remove('show'); addBtn.classList.remove('active');

            activeTimeout = setTimeout(() => {
                inputBox.classList.add('focused');
                activeTimeout = setTimeout(() => {
                    addBtn.classList.add('active'); // mimic click
                    activeTimeout = setTimeout(() => {
                        addBtn.classList.remove('active');
                        attBox.classList.add('show');
                        activeTimeout = setTimeout(() => {
                            loader.style.width = '100%';
                            activeTimeout = setTimeout(() => {
                                loader.style.opacity = '0';

                                const text = "Analyze the architectural style of this building. What era is it from?";
                                let i = 0;
                                activeTimeout = setTimeout(() => {
                                    activeTimer = setInterval(() => {
                                        typed.innerHTML += text.charAt(i); i++;
                                        sendBtn.classList.add('active');
                                        if (i >= text.length) {
                                            clearInterval(activeTimer);
                                            activeTimeout = setTimeout(() => {
                                                sendBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                                                cursor.style.display = 'none';
                                                activeTimeout = setTimeout(() => {
                                                    attBox.classList.remove('show');
                                                    typed.innerHTML = ''; sendBtn.classList.remove('active'); inputBox.classList.remove('focused');
                                                    sendBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';

                                                    activeTimeout = setTimeout(() => {
                                                        bubble.classList.add('show');
                                                        setTimeout(() => { isAnimating = false; }, 1000);
                                                    }, 300);
                                                }, 500);
                                            }, 800);
                                        }
                                    }, 40);
                                }, 400);
                            }, 800);
                        }, 400);
                    }, 200);
                }, 600);
            }, 500);
        };
        replayBtn.addEventListener('click', () => { clearInterval(activeTimer); clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'voice-input') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-voice-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 32px 24px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; align-items: center; gap: 24px; min-height: 260px;}
                
                .aid-voice-display { width: 100%; min-height: 80px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; display:flex; flex-direction:column; justify-content:space-between;}
                .aid-voice-text { font-size: 16px; color: #1f2937; line-height: 1.5; font-weight: 500; margin:0;}
                .aid-voice-placeholder { color: #9ca3af; font-style: italic;}
                
                .aid-voice-visualizer { display: flex; align-items: center; justify-content: center; height: 32px; gap: 4px; opacity: 0; transition: opacity 0.3s;}
                .aid-voice-visualizer.active { opacity: 1; }
                .aid-voice-bar { width: 4px; height: 8px; background: ${data.color}; border-radius: 4px; transition: height 0.1s ease; }
                
                .aid-voice-btn-wrap { position: relative; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;}
                .aid-voice-pulse { position: absolute; inset: 0; border-radius: 50%; border: 2px solid ${data.color}; opacity: 0; transform: scale(0.8); }
                .aid-voice-btn-wrap.recording .aid-voice-pulse:nth-child(1) { animation: voice-ripple 2s linear infinite; }
                .aid-voice-btn-wrap.recording .aid-voice-pulse:nth-child(2) { animation: voice-ripple 2s linear infinite 0.6s; }
                .aid-voice-btn-wrap.recording .aid-voice-pulse:nth-child(3) { animation: voice-ripple 2s linear infinite 1.2s; }
                
                @keyframes voice-ripple { 0% { transform: scale(0.8); opacity: 0.8; border-width: 2px; } 100% { transform: scale(1.6); opacity: 0; border-width: 0px; } }
                
                .aid-voice-btn { position: relative; z-index: 10; width: 64px; height: 64px; border-radius: 50%; background: #f3f4f6; color: #4b5563; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 1px solid #e5e7eb; transition: all 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.05);}
                .aid-voice-btn svg { width: 28px; height: 28px; transition: all 0.3s; }
                
                .aid-voice-btn-wrap.recording .aid-voice-btn { background: ${data.color}; color: white; border-color: ${data.color}; box-shadow: 0 8px 24px ${data.color}55; transform: scale(1.05);}
                
                .aid-voice-status { font-size: 13px; color: #6b7280; font-weight: 500; font-family: monospace; background: #f3f4f6; padding: 4px 12px; border-radius: 12px; opacity:0; transition:opacity 0.3s;}
                .aid-voice-status.show { opacity: 1; }
            </style>
            <div class="aid-voice-mockup">
                <div class="aid-voice-display">
                    <p class="aid-voice-text" id="voice-text"><span class="aid-voice-placeholder">Tap to speak...</span></p>
                    <div class="aid-voice-visualizer" id="voice-viz">
                        <div class="aid-voice-bar"></div><div class="aid-voice-bar"></div><div class="aid-voice-bar"></div><div class="aid-voice-bar"></div><div class="aid-voice-bar"></div><div class="aid-voice-bar"></div><div class="aid-voice-bar"></div><div class="aid-voice-bar"></div>
                    </div>
                </div>
                
                <div class="aid-voice-btn-wrap" id="voice-wrap">
                    <div class="aid-voice-pulse"></div><div class="aid-voice-pulse"></div><div class="aid-voice-pulse"></div>
                    <div class="aid-voice-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                    </div>
                </div>
                <div class="aid-voice-status" id="voice-status">Listening - 0:00</div>
            </div>
        `;
        const textDisplay = document.getElementById('voice-text'), wrap = document.getElementById('voice-wrap'), viz = document.getElementById('voice-viz'), bars = viz.querySelectorAll('.aid-voice-bar'), status = document.getElementById('voice-status');
        const replayBtn = document.getElementById('raw-demo-replay');
        let activeTimer, activeTimeout, vizInterval, isAnimating = false;

        const animateViz = () => {
            bars.forEach(bar => {
                const height = 8 + Math.random() * 20;
                bar.style.height = height + 'px';
            });
        };

        const startDemo = () => {
            if (isAnimating) return; isAnimating = true;
            clearTimeout(activeTimeout); clearInterval(activeTimer); clearInterval(vizInterval);
            textDisplay.innerHTML = '<span class="aid-voice-placeholder">Tap to speak...</span>';
            wrap.classList.remove('recording'); viz.classList.remove('active'); status.classList.remove('show');

            bars.forEach(bar => bar.style.height = '8px');

            activeTimeout = setTimeout(() => {
                wrap.classList.add('recording');
                viz.classList.add('active');
                status.classList.add('show');
                textDisplay.innerHTML = '';

                let time = 0;
                activeTimer = setInterval(() => { time++; status.innerText = "Listening - 0:0" + time; }, 1000);
                vizInterval = setInterval(animateViz, 100);

                const script = "Generate a summary of our recent marketing campaign performance.";
                const words = script.split(' ');
                let currentText = [];
                let i = 0;

                const typeWord = () => {
                    if (i < words.length) {
                        currentText.push(words[i]);
                        textDisplay.innerText = currentText.join(' ');
                        i++;
                        activeTimeout = setTimeout(typeWord, 150 + Math.random() * 200);
                    } else {
                        // End recording
                        activeTimeout = setTimeout(() => {
                            clearInterval(activeTimer); clearInterval(vizInterval);
                            wrap.classList.remove('recording'); viz.classList.remove('active');
                            status.innerText = "Processing audio...";
                            status.style.background = data.color + "22"; status.style.color = data.color;

                            activeTimeout = setTimeout(() => {
                                status.classList.remove('show');
                                setTimeout(() => {
                                    status.innerText = "Listening - 0:00";
                                    status.style.background = ''; status.style.color = '';
                                    isAnimating = false;
                                }, 300);
                            }, 1500);
                        }, 800);
                    }
                };
                activeTimeout = setTimeout(typeWord, 600);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearInterval(activeTimer); clearInterval(vizInterval); clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'inline-help') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-ih-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 24px;}
                
                .aid-ih-group { display: flex; flex-direction: column; gap: 8px; position: relative;}
                .aid-ih-label { font-size: 14px; font-weight: 600; color: #374151; display:flex; align-items:center; gap: 8px;}
                
                .aid-ih-icon { width: 16px; height: 16px; border-radius: 50%; background: #f3f4f6; color: #9ca3af; display: flex; align-items: center; justify-content: center; cursor: help; font-size: 10px; font-weight: bold; font-family: sans-serif; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; z-index: 10;}
                .aid-ih-icon.active { background: ${data.color}; color: white; transform: scale(1.1); box-shadow: 0 0 0 3px ${data.color}33;}
                
                .aid-ih-input { width: 100%; border: 1px solid #d1d5db; border-radius: 8px; padding: 10px 14px; font-size: 14px; background: #f9fafb; pointer-events:none; font-family:monospace; color:#4b5563;}
                
                .aid-ih-tooltip { position: absolute; left: 110px; top: -10px; background: #1f2937; color: #fff; padding: 12px 16px; border-radius: 8px; font-size: 13px; line-height: 1.5; width: 260px; box-shadow: 0 10px 25px rgba(0,0,0,0.15); opacity: 0; transform: translateY(10px) scale(0.95); transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); pointer-events: none; z-index: 20;}
                .aid-ih-tooltip::before { content: ''; position: absolute; top: 18px; left: -6px; border-width: 6px 6px 6px 0; border-style: solid; border-color: transparent #1f2937 transparent transparent; }
                .aid-ih-tooltip.show { opacity: 1; transform: translateY(0) scale(1); }
                .aid-ih-tooltip strong { color: #60a5fa; }
                
                .aid-ih-cursor { position: absolute; width:20px; height:20px; background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg>') no-repeat;
                   background-size:contain; z-index:30; opacity:0; pointer-events:none; transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
                   transform: translate(250px, 150px); }
                .aid-ih-cursor.show { opacity: 1;}
            </style>
            <div class="aid-ih-mockup">
                <div class="aid-ih-group">
                    <div class="aid-ih-label">
                        Temperature
                        <div class="aid-ih-icon" id="ih-icon">?</div>
                        <div class="aid-ih-tooltip" id="ih-tooltip">
                            <strong>Temperature (0.0 - 2.0)</strong><br>
                            Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive.
                        </div>
                    </div>
                    <input type="text" class="aid-ih-input" value="0.7">
                </div>
                <div class="aid-ih-group" style="opacity:0.5;">
                    <div class="aid-ih-label">Max Tokens <div class="aid-ih-icon">?</div></div>
                    <input type="text" class="aid-ih-input" value="1024">
                </div>
                <div class="aid-ih-cursor" id="ih-cursor"></div>
            </div>
        `;
        const icon = document.getElementById('ih-icon'), tooltip = document.getElementById('ih-tooltip'), cursor = document.getElementById('ih-cursor');
        const replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;

        const startDemo = () => {
            if (isAnimating) return; isAnimating = true;
            clearTimeout(activeTimeout);
            icon.classList.remove('active'); tooltip.classList.remove('show'); cursor.classList.remove('show');
            cursor.style.transform = "translate(250px, 150px)";

            activeTimeout = setTimeout(() => {
                cursor.classList.add('show');
                activeTimeout = setTimeout(() => {
                    cursor.style.transform = "translate(100px, 10px)"; // target icon pos relative to container
                    activeTimeout = setTimeout(() => {
                        icon.classList.add('active');
                        tooltip.classList.add('show');
                        activeTimeout = setTimeout(() => {
                            cursor.style.transform = "translate(200px, 120px)"; // move away
                            activeTimeout = setTimeout(() => {
                                icon.classList.remove('active');
                                tooltip.classList.remove('show');
                                setTimeout(() => { cursor.classList.remove('show'); isAnimating = false; }, 800);
                            }, 300);
                        }, 3000);
                    }, 1000);
                }, 100);
            }, 600);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'prompt-quality-feedback') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-pqf-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-pqf-header { display:flex; justify-content:space-between; align-items:center;}
                .aid-pqf-title { font-size: 14px; font-weight: 600; color: #374151;}
                
                .aid-pqf-textarea { width: 100%; height: 100px; border: 1px solid #d1d5db; border-radius: 8px; padding: 12px; font-size: 14px; font-family: sans-serif; line-height: 1.5; color: #1f2937; resize: none; outline:none; transition: border-color 0.3s;}
                .aid-pqf-textarea:focus { border-color: ${data.color}; box-shadow: 0 0 0 3px ${data.color}22;}
                
                .aid-pqf-footer { display: flex; align-items: center; justify-content: space-between; background:#f9fafb; padding:10px 14px; border-radius:8px; border: 1px solid #e5e7eb;}
                
                .aid-pqf-meter-wrap { display: flex; align-items: center; gap: 12px; flex: 1; margin-right: 16px;}
                .aid-pqf-meter-bg { flex: 1; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden; position:relative;}
                .aid-pqf-meter-fill { height: 100%; width: 0%; background: #ef4444; border-radius: 3px; transition: width 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.5s; }
                
                .aid-pqf-status { font-size: 12px; font-weight: 600; color: #ef4444; min-width: 80px; transition: color 0.5s;}
                
                /* Quality levels */
                .pqf-lvl-1 .aid-pqf-meter-fill { width: 25%; background: #ef4444; }
                .pqf-lvl-1 .aid-pqf-status { color: #ef4444; }
                
                .pqf-lvl-2 .aid-pqf-meter-fill { width: 60%; background: #f59e0b; }
                .pqf-lvl-2 .aid-pqf-status { color: #f59e0b; }
                
                .pqf-lvl-3 .aid-pqf-meter-fill { width: 100%; background: #10b981; }
                .pqf-lvl-3 .aid-pqf-status { color: #10b981; }
                
                .aid-pqf-cursor { display: inline-block; width: 2px; height: 18px; background: ${data.color}; animation: blink 1s step-end infinite; vertical-align: text-bottom; margin-left:1px;}
            </style>
            <div class="aid-pqf-mockup">
                <div class="aid-pqf-header"><div class="aid-pqf-title">Prompt Composer</div></div>
                <div style="position:relative;">
                    <div class="aid-pqf-textarea" id="pqf-input" style="border-color:${data.color};"><span id="pqf-typed"></span><span class="aid-pqf-cursor" id="pqf-cursor"></span></div>
                </div>
                <div class="aid-pqf-footer" id="pqf-footer">
                    <div class="aid-pqf-meter-wrap">
                        <div class="aid-pqf-meter-bg"><div class="aid-pqf-meter-fill"></div></div>
                        <div class="aid-pqf-status" id="pqf-status">Needs Detail</div>
                    </div>
                </div>
            </div>
        `;
        const typed = document.getElementById('pqf-typed'), footer = document.getElementById('pqf-footer'), status = document.getElementById('pqf-status'), input = document.getElementById('pqf-input');
        const replayBtn = document.getElementById('raw-demo-replay');
        let activeTimer, activeTimeout, isAnimating = false;

        const setQuality = (lvl, text) => {
            footer.className = 'aid-pqf-footer pqf-lvl-' + lvl;
            status.innerText = text;
        };

        const startDemo = () => {
            if (isAnimating) return; isAnimating = true;
            clearTimeout(activeTimeout); clearInterval(activeTimer);
            typed.innerHTML = ''; footer.className = 'aid-pqf-footer'; status.innerText = 'Start typing...'; input.style.borderColor = data.color;

            const chunks = [
                { text: "Write an email to my team", lvl: 1, status: "Too Broad" },
                { text: " about the new Q3 project deadlines", lvl: 2, status: "Getting Better" },
                { text: " and ask them to provide their status updates by Friday at 5 PM. Keep it professional and brief.", lvl: 3, status: "Great Prompt!" }
            ];

            let chunkIdx = 0;

            const typeChunk = () => {
                if (chunkIdx >= chunks.length) {
                    activeTimeout = setTimeout(() => { input.style.borderColor = ''; isAnimating = false; }, 2000);
                    return;
                }
                const chunk = chunks[chunkIdx];
                let i = 0;
                activeTimer = setInterval(() => {
                    typed.innerHTML += chunk.text.charAt(i); i++;
                    if (i >= chunk.text.length) {
                        clearInterval(activeTimer);
                        setQuality(chunk.lvl, chunk.status);
                        chunkIdx++;
                        activeTimeout = setTimeout(typeChunk, 1000);
                    }
                }, 40);
            };

            activeTimeout = setTimeout(typeChunk, 600);
        };
        replayBtn.addEventListener('click', () => { clearInterval(activeTimer); clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

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

    } else if (id === 'structured-prompt') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-sp-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-sp-field { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; font-size: 14px; position: relative;}
                .aid-sp-label { position: absolute; top: -8px; left: 12px; background: #fff; padding: 0 4px; font-size: 10px; font-weight: 600; color: #6b7280; text-transform: uppercase;}
                .aid-sp-text { color: #1f2937; min-height: 20px;}
                .aid-sp-btn { background: ${data.color}; color: #fff; border-radius: 8px; padding: 10px; text-align: center; font-weight: 600; font-size: 13px; cursor: pointer; opacity: 0.5; transition: opacity 0.3s;}
                .aid-sp-btn.active { opacity: 1; }
                .aid-cursor { display: inline-block; width: 2px; height: 14px; background: ${data.color}; animation: blink 1s step-end infinite; vertical-align: middle; }
                .aid-sp-result { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; font-size: 13px; font-family: monospace; color: #4b5563; display: none; margin-top: 8px;}
                .aid-sp-result.show { display: block;}
            </style>
            <div class="aid-sp-mockup">
                <div class="aid-sp-field"><div class="aid-sp-label">Role</div><div class="aid-sp-text" id="sp-role"></div></div>
                <div class="aid-sp-field"><div class="aid-sp-label">Task</div><div class="aid-sp-text" id="sp-task"></div></div>
                <div class="aid-sp-field"><div class="aid-sp-label">Format</div><div class="aid-sp-text" id="sp-format"></div></div>
                <div class="aid-sp-btn" id="sp-btn">Combine &amp; Generate</div>
                <div class="aid-sp-result" id="sp-result"></div>
            </div>
        `;
        const role = document.getElementById('sp-role'), task = document.getElementById('sp-task'), format = document.getElementById('sp-format'), btn = document.getElementById('sp-btn'), result = document.getElementById('sp-result'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimer, activeTimeout, isAnimating = false;
        const typeStr = (el, str, cb) => {
            let i = 0; el.innerHTML = '<span class="aid-cursor"></span>';
            activeTimer = setInterval(() => {
                el.innerHTML = str.substring(0, i + 1) + '<span class="aid-cursor"></span>';
                i++; if (i >= str.length) { clearInterval(activeTimer); el.innerHTML = str; cb(); }
            }, 40);
        };
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearInterval(activeTimer); clearTimeout(activeTimeout);
            role.innerHTML = ''; task.innerHTML = ''; format.innerHTML = ''; btn.classList.remove('active'); result.classList.remove('show'); result.innerHTML = '';
            activeTimeout = setTimeout(() => typeStr(role, "Senior UX Researcher", () => {
                activeTimeout = setTimeout(() => typeStr(task, "Analyze the usability test notes", () => {
                    activeTimeout = setTimeout(() => typeStr(format, "Bullet points", () => {
                        activeTimeout = setTimeout(() => {
                            btn.innerHTML = 'Generating...'; btn.classList.add('active');
                            activeTimeout = setTimeout(() => {
                                btn.innerHTML = 'Combine &amp; Generate'; btn.classList.remove('active');
                                result.classList.add('show');
                                typeStr(result, "Act as a Senior UX Researcher. Analyze the usability test notes and output in Bullet points.", () => {
                                    activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                                });
                            }, 800);
                        }, 500);
                    }), 400);
                }), 400);
            }), 400);
        };
        replayBtn.addEventListener('click', () => { clearInterval(activeTimer); clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'paginated-prompt') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-pp-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-pp-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f3f4f6; padding-bottom: 12px;}
                .aid-pp-title { font-size: 14px; font-weight: 600; color: #1f2937;}
                .aid-pp-steps { display: flex; gap: 4px;}
                .aid-pp-step { width: 30px; height: 4px; background: #e5e7eb; border-radius: 2px; transition: background 0.3s;}
                .aid-pp-step.active { background: ${data.color};}
                .aid-pp-body { min-height: 80px; display: flex; flex-direction: column; gap: 8px; justify-content: center;}
                .aid-pp-q { font-size: 14px; color: #4b5563;}
                .aid-pp-a { font-size: 15px; color: #1f2937; font-weight: 500; min-height: 22px;}
                .aid-pp-footer { display: flex; justify-content: flex-end;}
                .aid-pp-btn { background: ${data.color}; color: #fff; border-radius: 6px; padding: 6px 16px; font-size: 12px; font-weight: 600; cursor: pointer; opacity: 1; transition: opacity 0.3s; display: none;}
                .aid-pp-btn.show { display: inline-block;}
                .aid-cursor { display: inline-block; width: 2px; height: 14px; background: ${data.color}; animation: blink 1s step-end infinite; vertical-align: middle; }
            </style>
            <div class="aid-pp-mockup">
                <div class="aid-pp-header">
                    <div class="aid-pp-title" id="pp-title">Step 1 of 3</div>
                    <div class="aid-pp-steps"><div class="aid-pp-step" id="st1"></div><div class="aid-pp-step" id="st2"></div><div class="aid-pp-step" id="st3"></div></div>
                </div>
                <div class="aid-pp-body">
                    <div class="aid-pp-q" id="pp-q"></div>
                    <div class="aid-pp-a" id="pp-a"></div>
                </div>
                <div class="aid-pp-footer"><div class="aid-pp-btn" id="pp-btn">Next</div></div>
            </div>
        `;
        const title = document.getElementById('pp-title'), st1 = document.getElementById('st1'), st2 = document.getElementById('st2'), st3 = document.getElementById('st3'), q = document.getElementById('pp-q'), a = document.getElementById('pp-a'), btn = document.getElementById('pp-btn'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimer, activeTimeout, isAnimating = false;
        const typeStr = (el, str, cb) => {
            let i = 0; el.innerHTML = '<span class="aid-cursor"></span>';
            activeTimer = setInterval(() => {
                el.innerHTML = str.substring(0, i + 1) + '<span class="aid-cursor"></span>';
                i++; if (i >= str.length) { clearInterval(activeTimer); el.innerHTML = str; cb(); }
            }, 40);
        };
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearInterval(activeTimer); clearTimeout(activeTimeout);
            st1.className = 'aid-pp-step'; st2.className = 'aid-pp-step'; st3.className = 'aid-pp-step'; btn.classList.remove('show'); btn.innerText = 'Next';
            title.innerText = 'Step 1: Goal'; st1.classList.add('active'); q.innerText = 'What is the main goal of this campaign?'; a.innerHTML = '';
            activeTimeout = setTimeout(() => {
                typeStr(a, "Increase user engagement", () => {
                    btn.classList.add('show');
                    activeTimeout = setTimeout(() => {
                        title.innerText = 'Step 2: Audience'; st2.classList.add('active'); q.innerText = 'Who is the target audience?'; a.innerHTML = ''; btn.classList.remove('show');
                        activeTimeout = setTimeout(() => {
                            typeStr(a, "Young professionals in tech", () => {
                                btn.classList.add('show');
                                activeTimeout = setTimeout(() => {
                                    title.innerText = 'Step 3: Tone'; st3.classList.add('active'); q.innerText = 'What should the tone be?'; a.innerHTML = ''; btn.classList.remove('show');
                                    activeTimeout = setTimeout(() => {
                                        typeStr(a, "Professional and exciting", () => {
                                            btn.innerText = 'Generate'; btn.classList.add('show');
                                            activeTimeout = setTimeout(() => {
                                                btn.innerText = 'Generating...';
                                                activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                                            }, 800);
                                        });
                                    }, 400);
                                }, 800);
                            });
                        }, 400);
                    }, 800);
                });
            }, 600);
        };
        replayBtn.addEventListener('click', () => { clearInterval(activeTimer); clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'reference-material') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-rm-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-rm-input-area { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 12px;}
                .aid-rm-top { display: flex; gap: 8px;}
                .aid-rm-clip { width: 32px; height: 32px; border-radius: 16px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background 0.3s, transform 0.2s;}
                .aid-rm-clip.active { background: ${data.color}22; color: ${data.color}; transform: scale(1.05);}
                .aid-rm-text { flex: 1; min-height: 32px; font-size: 14px; color: #1f2937; padding-top: 6px;}
                .aid-rm-file { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 12px; display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; color: #334155; opacity: 0; transform: translateY(10px); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: none;}
                .aid-rm-file.show { display: flex; opacity: 1; transform: translateY(0);}
                .aid-rm-progress { width: 100px; height: 4px; background: #e2e8f0; border-radius: 2px; overflow: hidden;}
                .aid-rm-fill { height: 100%; width: 0%; background: ${data.color}; transition: width 0.8s ease-out;}
                .aid-cursor { display: inline-block; width: 2px; height: 14px; background: ${data.color}; animation: blink 1s step-end infinite; vertical-align: middle; }
            </style>
            <div class="aid-rm-mockup">
                <div class="aid-rm-input-area">
                    <div class="aid-rm-file" id="rm-file">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                        financial-report.pdf
                        <div class="aid-rm-progress" id="rm-prog"><div class="aid-rm-fill" id="rm-fill"></div></div>
                    </div>
                    <div class="aid-rm-top">
                        <div class="aid-rm-clip" id="rm-clip"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg></div>
                        <div class="aid-rm-text" id="rm-text"></div>
                    </div>
                </div>
            </div>
        `;
        const clip = document.getElementById('rm-clip'), file = document.getElementById('rm-file'), prog = document.getElementById('rm-prog'), fill = document.getElementById('rm-fill'), text = document.getElementById('rm-text'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimer, activeTimeout, isAnimating = false;
        const typeStr = (el, str, cb) => {
            let i = 0; el.innerHTML = '<span class="aid-cursor"></span>';
            activeTimer = setInterval(() => {
                el.innerHTML = str.substring(0, i + 1) + '<span class="aid-cursor"></span>';
                i++; if (i >= str.length) { clearInterval(activeTimer); el.innerHTML = str; cb(); }
            }, 40);
        };
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearInterval(activeTimer); clearTimeout(activeTimeout);
            clip.classList.remove('active'); file.classList.remove('show'); fill.style.width = '0%'; prog.style.display = 'block'; text.innerHTML = '';
            activeTimeout = setTimeout(() => {
                clip.classList.add('active');
                activeTimeout = setTimeout(() => {
                    clip.classList.remove('active');
                    file.classList.add('show');
                    activeTimeout = setTimeout(() => {
                        fill.style.width = '100%';
                        activeTimeout = setTimeout(() => {
                            prog.style.display = 'none';
                            activeTimeout = setTimeout(() => {
                                typeStr(text, "Summarize the key Q4 findings using this report.", () => {
                                    activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                                });
                            }, 400);
                        }, 800);
                    }, 300);
                }, 400);
            }, 600);
        };
        replayBtn.addEventListener('click', () => { clearInterval(activeTimer); clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'prompt-templates') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-pt-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px; position:relative;}
                .aid-pt-dropdown { position: absolute; top: 10px; right: 20px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 200px; opacity: 0; pointer-events: none; transform: translateY(-10px); transition: all 0.3s; z-index:10;}
                .aid-pt-dropdown.show { opacity: 1; transform: translateY(0);}
                .aid-pt-drop-item { padding: 10px 12px; font-size: 13px; color: #374151; border-bottom: 1px solid #f3f4f6; cursor: pointer;}
                .aid-pt-drop-item:last-child { border-bottom: none;}
                .aid-pt-drop-item.hover { background: #f9fafb; color: ${data.color};}
                .aid-pt-top { display: flex; justify-content: space-between;}
                .aid-pt-btn { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 500; color: #4b5563; background: #f3f4f6; padding: 6px 12px; border-radius: 6px; cursor: pointer; transition: background 0.2s;}
                .aid-pt-btn.active { background: #e5e7eb;}
                .aid-pt-area { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; min-height: 120px; font-size: 14px; color: #1f2937; line-height: 1.5;}
            </style>
            <div class="aid-pt-mockup">
                <div class="aid-pt-dropdown" id="pt-drop">
                    <div class="aid-pt-drop-item">Blog Post Outline</div>
                    <div class="aid-pt-drop-item" id="pt-target">Code Review Assistant</div>
                    <div class="aid-pt-drop-item">Translate Text</div>
                </div>
                <div class="aid-pt-top">
                    <div style="font-size:14px; font-weight:600; color:#1f2937;">Prompt Composer</div>
                    <div class="aid-pt-btn" id="pt-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></svg> Templates</div>
                </div>
                <div class="aid-pt-area" id="pt-area"></div>
            </div>
        `;
        const drop = document.getElementById('pt-drop'), target = document.getElementById('pt-target'), btn = document.getElementById('pt-btn'), area = document.getElementById('pt-area'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            drop.classList.remove('show'); btn.classList.remove('active'); target.classList.remove('hover'); area.innerHTML = '';
            activeTimeout = setTimeout(() => {
                btn.classList.add('active'); drop.classList.add('show');
                activeTimeout = setTimeout(() => {
                    target.classList.add('hover');
                    activeTimeout = setTimeout(() => {
                        drop.classList.remove('show'); btn.classList.remove('active'); target.classList.remove('hover');
                        area.innerHTML = '<span style="color:#6b7280;">You are an expert software engineer. Review the following code snippet for:</span><br/><br/>- Security vulnerabilities<br/>- Performance optimization<br/>- Best practices<br/><br/><span style="color:#d1d5db;">[ Paste Code Here ]</span>';
                        activeTimeout = setTimeout(() => { isAnimating = false; }, 1500);
                    }, 400);
                }, 600);
            }, 600);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'cloze-passage') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-cp-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-cp-text { font-size: 16px; color: #374151; line-height: 2; font-family: 'Libre Baskerville', serif;}
                .aid-cp-drop, .aid-cp-input { display: inline-block; background: #f3f4f6; border-bottom: 2px dashed ${data.color}; padding: 2px 8px; color: ${data.color}; font-weight: 600; cursor: pointer; border-radius: 4px 4px 0 0; min-width: 80px; text-align: center; position: relative;}
                .aid-cp-menu { position: absolute; top: calc(100% + 4px); left: 0; background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); width: 120px; text-align: left; padding: 4px; opacity: 0; pointer-events: none; transform: translateY(-5px); transition: all 0.2s;}
                .aid-cp-menu.show { opacity: 1; transform: translateY(0);}
                .aid-cp-item { padding: 6px 8px; font-size: 13px; color: #374151; border-radius: 4px; font-family: 'Manrope', sans-serif; font-weight: 500;}
                .aid-cp-item.hover { background: #f9fafb; color: ${data.color};}
                .aid-cp-btn { background: ${data.color}; color: #fff; border-radius: 8px; padding: 10px; text-align: center; font-weight: 600; font-size: 13px; margin-top: 12px; cursor: pointer; transition: opacity 0.3s; opacity: 0.5;}
                .aid-cp-btn.active { opacity: 1;}
                .aid-cursor { display: inline-block; width: 2px; height: 16px; background: ${data.color}; animation: blink 1s step-end infinite; }
            </style>
            <div class="aid-cp-mockup">
                <div class="aid-cp-text">
                    Please write a <span class="aid-cp-drop" id="cp-drop"><span id="cp-val1">_____</span><div class="aid-cp-menu" id="cp-menu"><div class="aid-cp-item">Blog Post</div><div class="aid-cp-item" id="cp-target">Summary</div><div class="aid-cp-item">Email</div></div></span> 
                    focusing on <span class="aid-cp-input" id="cp-input">_____________</span> for our team.
                </div>
                <div class="aid-cp-btn" id="cp-btn">Generate</div>
            </div>
        `;
        const drop = document.getElementById('cp-drop'), val1 = document.getElementById('cp-val1'), menu = document.getElementById('cp-menu'), target = document.getElementById('cp-target'), input = document.getElementById('cp-input'), btn = document.getElementById('cp-btn'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimer, activeTimeout, isAnimating = false;
        const typeStr = (el, str, cb) => {
            let i = 0; el.innerHTML = '<span class="aid-cursor"></span>';
            activeTimer = setInterval(() => {
                el.innerHTML = str.substring(0, i + 1) + '<span class="aid-cursor"></span>';
                i++; if (i >= str.length) { clearInterval(activeTimer); el.innerHTML = str; cb(); }
            }, 50);
        };
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearInterval(activeTimer); clearTimeout(activeTimeout);
            val1.innerText = '_____'; input.innerText = '_____________'; menu.classList.remove('show'); target.classList.remove('hover'); btn.classList.remove('active'); btn.innerText = 'Generate';
            activeTimeout = setTimeout(() => {
                menu.classList.add('show');
                activeTimeout = setTimeout(() => {
                    target.classList.add('hover');
                    activeTimeout = setTimeout(() => {
                        menu.classList.remove('show'); val1.innerText = 'Summary';
                        activeTimeout = setTimeout(() => {
                            typeStr(input, "Q3 Sales Results", () => {
                                btn.classList.add('active');
                                activeTimeout = setTimeout(() => {
                                    btn.innerText = 'Generating...'; btn.style.opacity = '0.8';
                                    activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                                }, 600);
                            });
                        }, 500);
                    }, 500);
                }, 500);
            }, 600);
        };
        replayBtn.addEventListener('click', () => { clearInterval(activeTimer); clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'configurable-controls') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-cc-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 20px;}
                .aid-cc-row { display: flex; flex-direction: column; gap: 8px;}
                .aid-cc-label { display: flex; justify-content: space-between; font-size: 13px; font-weight: 600; color: #374151;}
                .aid-cc-val { color: ${data.color};}
                .aid-cc-track { width: 100%; height: 6px; background: #e5e7eb; border-radius: 3px; position: relative;}
                .aid-cc-fill { position: absolute; left: 0; top: 0; height: 100%; background: ${data.color}; border-radius: 3px; width: 50%; transition: width 0.5s ease;}
                .aid-cc-thumb { position: absolute; top: 50%; width: 16px; height: 16px; background: #fff; border: 2px solid ${data.color}; border-radius: 50%; transform: translate(-50%, -50%); transition: left 0.5s ease; box-shadow: 0 2px 4px rgba(0,0,0,0.1);}
                .aid-cc-preview { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; font-size: 13px; color: #4b5563; min-height: 44px; display: flex; align-items: center;}
            </style>
            <div class="aid-cc-mockup">
                <div class="aid-cc-row">
                    <div class="aid-cc-label">Creativity <span class="aid-cc-val" id="cc-val1">Balanced</span></div>
                    <div class="aid-cc-track"><div class="aid-cc-fill" id="cc-fill1" style="width:50%"></div><div class="aid-cc-thumb" id="cc-thumb1" style="left:50%"></div></div>
                </div>
                <div class="aid-cc-row">
                    <div class="aid-cc-label">Length <span class="aid-cc-val" id="cc-val2">Medium</span></div>
                    <div class="aid-cc-track"><div class="aid-cc-fill" id="cc-fill2" style="width:50%"></div><div class="aid-cc-thumb" id="cc-thumb2" style="left:50%"></div></div>
                </div>
                <div class="aid-cc-preview" id="cc-preview">"Write a balanced, medium length article."</div>
            </div>
        `;
        const fill1 = document.getElementById('cc-fill1'), thumb1 = document.getElementById('cc-thumb1'), val1 = document.getElementById('cc-val1');
        const fill2 = document.getElementById('cc-fill2'), thumb2 = document.getElementById('cc-thumb2'), val2 = document.getElementById('cc-val2');
        const preview = document.getElementById('cc-preview'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;

        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            fill1.style.width = '50%'; thumb1.style.left = '50%'; val1.innerText = 'Balanced';
            fill2.style.width = '50%'; thumb2.style.left = '50%'; val2.innerText = 'Medium';
            preview.innerText = '"Write a balanced, medium length article."';

            activeTimeout = setTimeout(() => {
                fill1.style.width = '80%'; thumb1.style.left = '80%'; val1.innerText = 'High';
                preview.innerText = '"Write a highly creative, medium length article."';
                activeTimeout = setTimeout(() => {
                    fill2.style.width = '20%'; thumb2.style.left = '20%'; val2.innerText = 'Short';
                    preview.innerText = '"Write a highly creative, short article."';
                    activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                }, 800);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'progressive-disclosure') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-pd-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 12px;}
                .aid-pd-line { height: 12px; background: #e5e7eb; border-radius: 6px; width: 100%;}
                .aid-pd-summary { font-size: 15px; font-weight: 600; color: #1f2937;}
                .aid-pd-toggle { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: ${data.color}; cursor: pointer;}
                .aid-pd-icon { transition: transform 0.3s;}
                .aid-pd-icon.open { transform: rotate(180deg);}
                .aid-pd-detail { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s ease-out; overflow: hidden; opacity: 0;}
                .aid-pd-detail.show { grid-template-rows: 1fr; opacity: 1;}
                .aid-pd-inner { min-height: 0; display: flex; flex-direction: column; gap: 8px; padding-top: 12px;}
            </style>
            <div class="aid-pd-mockup">
                <div class="aid-pd-summary">🚀 Sales increased by 15% in Q3.</div>
                <div class="aid-pd-toggle" id="pd-toggle">Read Analysis <svg class="aid-pd-icon" id="pd-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
                <div class="aid-pd-detail" id="pd-detail">
                    <div class="aid-pd-inner">
                        <div class="aid-pd-line"></div>
                        <div class="aid-pd-line" style="width: 90%;"></div>
                        <div class="aid-pd-line" style="width: 75%;"></div>
                    </div>
                </div>
            </div>
        `;
        const toggle = document.getElementById('pd-toggle'), icon = document.getElementById('pd-icon'), detail = document.getElementById('pd-detail'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            icon.classList.remove('open'); detail.classList.remove('show');
            activeTimeout = setTimeout(() => {
                icon.classList.add('open'); detail.classList.add('show');
                activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'confidence-indicators') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-ci-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px; font-size: 15px; color: #374151; line-height: 1.6;}
                .aid-ci-tag { display: inline-block; padding: 0 4px; border-radius: 4px; transition: background 0.5s;}
                .aid-ci-tag.high { background: #dcfce7; color: #166534;}
                .aid-ci-tag.med { background: #fef3c7; color: #92400e;}
                .aid-ci-tag.low { background: #fee2e2; color: #991b1b;}
                .aid-ci-legend { display: flex; gap: 12px; font-size: 11px; font-weight: 600; padding-top: 12px; border-top: 1px solid #f3f4f6;}
                .aid-ci-legend span { display: flex; align-items: center; gap: 4px;}
                .aid-ci-dot { width: 8px; height: 8px; border-radius: 50%; opacity: 0; transition: opacity 0.5s;}
            </style>
            <div class="aid-ci-mockup">
                <div>
                    The market is expected to grow by <span class="aid-ci-tag" id="ci-1">12% next year</span>, largely driven by <span class="aid-ci-tag" id="ci-2">new tech legislation</span>. However, <span class="aid-ci-tag" id="ci-3">inflation rates might peak at 4%</span>.
                </div>
                <div class="aid-ci-legend">
                    <span><div class="aid-ci-dot" style="background:#22c55e;" id="ci-l1"></div> High Confidence</span>
                    <span><div class="aid-ci-dot" style="background:#f59e0b;" id="ci-l2"></div> Medium Confidence</span>
                    <span><div class="aid-ci-dot" style="background:#ef4444;" id="ci-l3"></div> Low Confidence</span>
                </div>
            </div>
        `;
        const t1 = document.getElementById('ci-1'), t2 = document.getElementById('ci-2'), t3 = document.getElementById('ci-3');
        const l1 = document.getElementById('ci-l1'), l2 = document.getElementById('ci-l2'), l3 = document.getElementById('ci-l3');
        const replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            t1.className = 'aid-ci-tag'; t2.className = 'aid-ci-tag'; t3.className = 'aid-ci-tag';
            l1.style.opacity = '0'; l2.style.opacity = '0'; l3.style.opacity = '0';
            activeTimeout = setTimeout(() => {
                t1.classList.add('high'); l1.style.opacity = '1';
                activeTimeout = setTimeout(() => {
                    t2.classList.add('med'); l2.style.opacity = '1';
                    activeTimeout = setTimeout(() => {
                        t3.classList.add('low'); l3.style.opacity = '1';
                        activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                    }, 400);
                }, 400);
            }, 500);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'multi-variant-output') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-mvo-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-mvo-tabs { display: flex; gap: 8px;}
                .aid-mvo-tab { padding: 6px 12px; font-size: 13px; font-weight: 600; color: #6b7280; background: #f3f4f6; border-radius: 6px; cursor: pointer; transition: all 0.3s;}
                .aid-mvo-tab.active { background: ${data.color}; color: #fff;}
                .aid-mvo-content { display: flex; gap: 12px; overflow: hidden; position: relative; height: 100px;}
                .aid-mvo-card { position: absolute; top: 0; left: 0; width: 100%; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; background: #f9fafb; font-size: 14px; color: #374151; opacity: 0; transform: translateX(20px); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); pointer-events: none;}
                .aid-mvo-card.active { opacity: 1; transform: translateX(0); pointer-events: auto;}
            </style>
            <div class="aid-mvo-mockup">
                <div class="aid-mvo-tabs">
                    <div class="aid-mvo-tab" id="mvo-t1">Option A</div>
                    <div class="aid-mvo-tab" id="mvo-t2">Option B</div>
                    <div class="aid-mvo-tab" id="mvo-t3">Option C</div>
                </div>
                <div class="aid-mvo-content">
                    <div class="aid-mvo-card" id="mvo-c1">Professional: "We are pleased to introduce our latest updates that enhance overall performance."</div>
                    <div class="aid-mvo-card" id="mvo-c2">Casual: "Check out our newest features! They make things super fast."</div>
                    <div class="aid-mvo-card" id="mvo-c3">Technical: "Version 2.4 shipped with optimized rendering algorithms reducing latency by 12ms."</div>
                </div>
            </div>
        `;
        const t1 = document.getElementById('mvo-t1'), t2 = document.getElementById('mvo-t2'), t3 = document.getElementById('mvo-t3');
        const c1 = document.getElementById('mvo-c1'), c2 = document.getElementById('mvo-c2'), c3 = document.getElementById('mvo-c3');
        const replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const setTab = (num) => {
            [t1, t2, t3].forEach(t => t.classList.remove('active'));
            [c1, c2, c3].forEach(c => c.classList.remove('active'));
            if (num === 1) { t1.classList.add('active'); c1.classList.add('active'); }
            if (num === 2) { t2.classList.add('active'); c2.classList.add('active'); }
            if (num === 3) { t3.classList.add('active'); c3.classList.add('active'); }
        };
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            setTab(1);
            activeTimeout = setTimeout(() => {
                setTab(2);
                activeTimeout = setTimeout(() => {
                    setTab(3);
                    activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                }, 1000);
            }, 1000);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'result-rendered-preview') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-rrp-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; gap: 16px; height: 160px;}
                .aid-rrp-col { flex: 1; display: flex; flex-direction: column; gap: 8px;}
                .aid-rrp-label { font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;}
                .aid-rrp-code { flex: 1; background: #1f2937; border-radius: 8px; padding: 12px; color: #fff; font-family: monospace; font-size: 12px; overflow: hidden; position: relative;}
                .aid-rrp-render { flex: 1; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; display: flex; align-items: center; justify-content: center; overflow: hidden;}
                .aid-rrp-btn { padding: 8px 16px; border-radius: 6px; background: ${data.color}; color: white; font-weight: 600; font-size: 13px; transform: scale(0.9); opacity: 0; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);}
                .aid-rrp-btn.show { opacity: 1; transform: scale(1);}
                .aid-cursor { display: inline-block; width: 6px; height: 12px; background: #fff; animation: blink 1s step-end infinite; }
            </style>
            <div class="aid-rrp-mockup">
                <div class="aid-rrp-col">
                    <div class="aid-rrp-label">Code generated</div>
                    <div class="aid-rrp-code" id="rrp-code"></div>
                </div>
                <div class="aid-rrp-col">
                    <div class="aid-rrp-label">Live Preview</div>
                    <div class="aid-rrp-render"><div class="aid-rrp-btn" id="rrp-btn">Click Me</div></div>
                </div>
            </div>
        `;
        const code = document.getElementById('rrp-code'), btn = document.getElementById('rrp-btn'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimer, activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearInterval(activeTimer); clearTimeout(activeTimeout);
            code.innerHTML = ''; btn.classList.remove('show');
            const str = "<button class='btn'>\\n  Click Me\\n</button>";
            let i = 0;
            activeTimer = setInterval(() => {
                code.innerHTML = str.substring(0, i + 1).replace(/\\n/g, '<br/>').replace(/ /g, '&nbsp;') + '<span class="aid-cursor"></span>';
                i++; if (i >= str.length) {
                    clearInterval(activeTimer);
                    activeTimeout = setTimeout(() => {
                        btn.classList.add('show');
                        activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                    }, 400);
                }
            }, 30);
        };
        replayBtn.addEventListener('click', () => { clearInterval(activeTimer); clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'iterative-editing') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-ie-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 12px;}
                .aid-ie-bubble { background: #f3f4f6; border-radius: 12px; padding: 12px; font-size: 14px; color: #374151; transition: opacity 0.3s;}
                .aid-ie-bubble.fade { opacity: 0.5;}
                .aid-ie-input { display: flex; align-items: center; gap: 8px; border: 1px solid ${data.color}; border-radius: 20px; padding: 6px 12px; opacity: 0; transform: translateY(10px); transition: all 0.3s;}
                .aid-ie-input.show { opacity: 1; transform: translateY(0);}
                .aid-ie-val { flex: 1; font-size: 13px; color: ${data.color}; font-weight: 500;}
            </style>
            <div class="aid-ie-mockup">
                <div class="aid-ie-bubble" id="ie-bubble">The new product launch is scheduled for next Tuesday.</div>
                <div class="aid-ie-input" id="ie-input">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${data.color}" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div class="aid-ie-val" id="ie-val"></div>
                </div>
            </div>
        `;
        const bub = document.getElementById('ie-bubble'), input = document.getElementById('ie-input'), val = document.getElementById('ie-val'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimer, activeTimeout, isAnimating = false;
        const typeStr = (el, str, cb) => {
            let i = 0;
            activeTimer = setInterval(() => {
                el.innerText = str.substring(0, i + 1); i++;
                if (i >= str.length) { clearInterval(activeTimer); cb(); }
            }, 40);
        };
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearInterval(activeTimer); clearTimeout(activeTimeout);
            bub.innerText = "The new product launch is scheduled for next Tuesday."; bub.classList.remove('fade');
            input.classList.remove('show'); val.innerText = '';

            activeTimeout = setTimeout(() => {
                input.classList.add('show');
                activeTimeout = setTimeout(() => {
                    typeStr(val, "Make it sound more exciting", () => {
                        activeTimeout = setTimeout(() => {
                            bub.classList.add('fade');
                            activeTimeout = setTimeout(() => {
                                bub.innerText = "Get ready! 🚀 The highly anticipated new product launch goes live next Tuesday!";
                                bub.classList.remove('fade'); input.classList.remove('show');
                                activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                            }, 400);
                        }, 500);
                    });
                }, 400);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearInterval(activeTimer); clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'selective-regeneration') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-sr-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px; position: relative;}
                .aid-sr-text { font-size: 14px; color: #374151; line-height: 1.6;}
                .aid-sr-hl { background: transparent; transition: background 0.3s;}
                .aid-sr-hl.active { background: ${data.color}33; cursor: pointer; border-radius: 4px;}
                .aid-sr-btn { position: absolute; background: #1f2937; color: #fff; font-size: 11px; padding: 4px 8px; border-radius: 4px; left: 15px; top: 15px; opacity: 0; pointer-events: none; transition: opacity 0.3s; font-weight: 600; display:flex; align-items:center; gap:4px; transform:translateY(-10px);}
                .aid-sr-btn.show { opacity: 1; pointer-events: auto; transform:translateY(0);}
            </style>
            <div class="aid-sr-mockup">
                <div class="aid-sr-btn" id="sr-btn">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.8-11.83l-3.23 3.23"/></svg>
                    Regenerate Selection
                </div>
                <div class="aid-sr-text">
                    Our AI design system is built to scale smoothly across platforms. <span class="aid-sr-hl" id="sr-target">It has features that are good for developers to use easily.</span> We ensure backward compatibility on all updates.
                </div>
            </div>
        `;
        const hl = document.getElementById('sr-target'), btn = document.getElementById('sr-btn'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            hl.innerText = 'It has features that are good for developers to use easily.'; hl.classList.remove('active'); btn.classList.remove('show');
            activeTimeout = setTimeout(() => {
                hl.classList.add('active');
                activeTimeout = setTimeout(() => {
                    btn.classList.add('show');
                    activeTimeout = setTimeout(() => {
                        btn.classList.remove('show');
                        hl.style.opacity = '0.3';
                        activeTimeout = setTimeout(() => {
                            hl.innerText = 'It offers robust APIs that empower developers to integrate seamlessly.';
                            hl.style.opacity = '1';
                            activeTimeout = setTimeout(() => { hl.classList.remove('active'); isAnimating = false; }, 800);
                        }, 400);
                    }, 800);
                }, 400);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'feedback-loop') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-fl-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-fl-bubble { background: #f3f4f6; border-radius: 12px; padding: 16px; font-size: 14px; color: #374151; position: relative;}
                .aid-fl-actions { display: flex; gap: 8px; margin-top: 12px; border-top: 1px solid #e5e7eb; padding-top: 12px;}
                .aid-fl-btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px; font-size: 13px; font-weight: 600; color: #6b7280; background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; transition: all 0.3s;}
                .aid-fl-btn.up.active { background: #dcfce7; color: #166534; border-color: #bbf7d0;}
                .aid-fl-btn.down.active { background: #fee2e2; color: #991b1b; border-color: #fecaca;}
                .aid-fl-msg { font-size: 12px; color: #166534; text-align: center; opacity: 0; transition: opacity 0.3s; height: 16px;}
                .aid-fl-msg.show { opacity: 1;}
            </style>
            <div class="aid-fl-mockup">
                <div class="aid-fl-bubble">
                    Based on your prompt, I've drafted an email outlining the new quarterly goals for the marketing and sales teams.
                    <div class="aid-fl-actions">
                        <div class="aid-fl-btn up" id="fl-up"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg> Good</div>
                        <div class="aid-fl-btn down" id="fl-down"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg> Bad</div>
                    </div>
                </div>
                <div class="aid-fl-msg" id="fl-msg">Thanks for the feedback!</div>
            </div>
        `;
        const up = document.getElementById('fl-up'), down = document.getElementById('fl-down'), msg = document.getElementById('fl-msg'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            up.classList.remove('active'); down.classList.remove('active'); msg.classList.remove('show');
            msg.innerText = "Thanks for the feedback!"; msg.style.color = "#166534";

            activeTimeout = setTimeout(() => {
                up.classList.add('active');
                activeTimeout = setTimeout(() => {
                    msg.classList.add('show');
                    activeTimeout = setTimeout(() => {
                        up.classList.remove('active'); msg.classList.remove('show');
                        activeTimeout = setTimeout(() => {
                            down.classList.add('active');
                            msg.innerText = "Please tell us what went wrong."; msg.style.color = "#991b1b";
                            activeTimeout = setTimeout(() => {
                                msg.classList.add('show');
                                activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                            }, 400);
                        }, 800);
                    }, 1200);
                }, 400);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'version-history') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-vh-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; gap: 16px;}
                .aid-vh-timeline { width: 4px; background: #e5e7eb; border-radius: 2px; position: relative; display: flex; flex-direction: column; justify-content: space-between; align-items: center; margin: 8px 0;}
                .aid-vh-dot { width: 12px; height: 12px; background: #fff; border: 2px solid #e5e7eb; border-radius: 50%; z-index: 2; transition: all 0.3s; cursor: pointer;}
                .aid-vh-dot.active { border-color: ${data.color}; background: ${data.color}; box-shadow: 0 0 0 3px ${data.color}33;}
                .aid-vh-content { flex: 1; display: flex; flex-direction: column; gap: 16px;}
                .aid-vh-item { display: flex; flex-direction: column; gap: 4px; opacity: 0.5; transition: opacity 0.3s;}
                .aid-vh-item.active { opacity: 1;}
                .aid-vh-time { font-size: 11px; font-weight: 600; color: #9ca3af;}
                .aid-vh-text { font-size: 13px; color: #374151; background: #f9fafb; padding: 10px; border-radius: 8px; border: 1px solid #f3f4f6;}
            </style>
            <div class="aid-vh-mockup">
                <div class="aid-vh-timeline">
                    <div class="aid-vh-dot" id="vh-d1"></div>
                    <div class="aid-vh-dot" id="vh-d2"></div>
                    <div class="aid-vh-dot" id="vh-d3"></div>
                </div>
                <div class="aid-vh-content">
                    <div class="aid-vh-item" id="vh-i1">
                        <div class="aid-vh-time">10:45 AM • V3 (Current)</div>
                        <div class="aid-vh-text">"The quick brown fox jumps over the lazy dog."</div>
                    </div>
                    <div class="aid-vh-item" id="vh-i2">
                        <div class="aid-vh-time">10:42 AM • V2</div>
                        <div class="aid-vh-text">"A quick brown fox jumps over a lazy dog."</div>
                    </div>
                    <div class="aid-vh-item" id="vh-i3">
                        <div class="aid-vh-time">10:30 AM • V1</div>
                        <div class="aid-vh-text">"The fox jumped."</div>
                    </div>
                </div>
            </div>
        `;
        const d1 = document.getElementById('vh-d1'), d2 = document.getElementById('vh-d2'), d3 = document.getElementById('vh-d3');
        const i1 = document.getElementById('vh-i1'), i2 = document.getElementById('vh-i2'), i3 = document.getElementById('vh-i3');
        const replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const setVer = (num) => {
            [d1, d2, d3].forEach(d => d.classList.remove('active'));
            [i1, i2, i3].forEach(i => i.classList.remove('active'));
            if (num === 1) { d1.classList.add('active'); i1.classList.add('active'); }
            if (num === 2) { d2.classList.add('active'); i2.classList.add('active'); }
            if (num === 3) { d3.classList.add('active'); i3.classList.add('active'); }
        };
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            setVer(1);
            activeTimeout = setTimeout(() => {
                setVer(2);
                activeTimeout = setTimeout(() => {
                    setVer(3);
                    activeTimeout = setTimeout(() => {
                        setVer(1);
                        activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'transparency-panel') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-tp-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 12px;}
                .aid-tp-top { display: flex; justify-content: space-between; align-items: center;}
                .aid-tp-title { font-size: 14px; font-weight: 600; color: #1f2937; display: flex; align-items: center; gap: 6px;}
                .aid-tp-badge { font-size: 12px; font-weight: 600; color: #166534; background: #dcfce7; padding: 2px 8px; border-radius: 12px;}
                .aid-tp-data { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; font-family: monospace; font-size: 12px; color: #4b5563; position: relative; overflow: hidden; height: 100px;}
                .aid-tp-lines { display: flex; flex-direction: column; gap: 6px; position: absolute; top: 12px; left: 12px; right: 12px; transform: translateY(100px); transition: transform 1s ease-out;}
                .aid-tp-lines.show { transform: translateY(0);}
            </style>
            <div class="aid-tp-mockup">
                <div class="aid-tp-top">
                    <div class="aid-tp-title">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${data.color}" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                        Generation Details
                    </div>
                    <div class="aid-tp-badge">Verified</div>
                </div>
                <div class="aid-tp-data">
                    <div class="aid-tp-lines" id="tp-lines">
                        <div>Model: GPT-4-Tur</div>
                        <div>Tokens Used: 432</div>
                        <div>Time: 2.3s</div>
                        <div>Safety Score: 0.99</div>
                        <div>Data Source: Custom DB</div>
                    </div>
                </div>
            </div>
        `;
        const lines = document.getElementById('tp-lines'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            lines.classList.remove('show');
            activeTimeout = setTimeout(() => {
                lines.classList.add('show');
                activeTimeout = setTimeout(() => { isAnimating = false; }, 1200);
            }, 500);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'explainability-cards') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-ep-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-ep-text { font-size: 14px; color: #374151;}
                .aid-ep-text u { text-decoration-style: dashed; text-decoration-color: ${data.color}; cursor: pointer; color: ${data.color}; font-weight: 600;}
                .aid-ep-pop { background: #1f2937; color: #fff; border-radius: 8px; padding: 12px; font-size: 12px; line-height: 1.5; font-weight: 500; transform: translateY(10px); opacity: 0; pointer-events: none; transition: all 0.3s;}
                .aid-ep-pop.show { opacity: 1; transform: translateY(0); pointer-events: auto;}
                .aid-ep-pop-tit { color: #9ca3af; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; display: block;}
            </style>
            <div class="aid-ep-mockup">
                <div class="aid-ep-text">
                    This user segment shows a <u id="ep-link">high churn risk</u> based on recent activity reduction.
                </div>
                <div class="aid-ep-pop" id="ep-pop">
                    <span class="aid-ep-pop-tit">Why this was flagged</span>
                    Logins decreased by 40% over the last 30 days, matching the pattern of users who churned in Q2.
                </div>
            </div>
        `;
        const link = document.getElementById('ep-link'), pop = document.getElementById('ep-pop'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            pop.classList.remove('show'); link.style.backgroundColor = 'transparent';
            activeTimeout = setTimeout(() => {
                link.style.backgroundColor = data.color + '22';
                pop.classList.add('show');
                activeTimeout = setTimeout(() => {
                    link.style.backgroundColor = 'transparent';
                    pop.classList.remove('show');
                    activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                }, 2000);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'result-actions') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-ra-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-ra-content { font-size: 14px; color: #374151; padding: 12px; background: #f9fafb; border-radius: 8px; border: 1px solid #f3f4f6;}
                .aid-ra-bar { display: flex; gap: 8px; align-items: center;}
                .aid-ra-btn { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 6px 12px; font-size: 12px; font-weight: 600; color: #4b5563; background: #fff; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; transition: all 0.2s; position: relative; overflow: hidden;}
                .aid-ra-btn:hover { background: #f3f4f6;}
                .aid-ra-btn.active { background: ${data.color}; color: #fff; border-color: ${data.color};}
                .aid-ra-tooltip { position: absolute; top: -24px; left: 50%; transform: translateX(-50%); background: #1f2937; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px; opacity: 0; transition: opacity 0.3s; white-space: nowrap; pointer-events: none;}
                .aid-ra-tooltip.show { opacity: 1;}
            </style>
            <div class="aid-ra-mockup">
                <div class="aid-ra-content">"The meeting has been rescheduled to Thursday at 2 PM."</div>
                <div class="aid-ra-bar">
                    <div class="aid-ra-btn" id="ra-b1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        Copy <div class="aid-ra-tooltip" id="ra-t1">Copied!</div>
                    </div>
                    <div class="aid-ra-btn" id="ra-b2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Export <div class="aid-ra-tooltip" id="ra-t2">Exporting...</div>
                    </div>
                    <div class="aid-ra-btn" id="ra-b3">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                        Share <div class="aid-ra-tooltip" id="ra-t3">Link ready</div>
                    </div>
                </div>
            </div>
        `;
        const b1 = document.getElementById('ra-b1'), b2 = document.getElementById('ra-b2'), b3 = document.getElementById('ra-b3');
        const t1 = document.getElementById('ra-t1'), t2 = document.getElementById('ra-t2'), t3 = document.getElementById('ra-t3');
        const replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const resetBtns = () => {
            [b1, b2, b3].forEach(b => b.classList.remove('active'));
            [t1, t2, t3].forEach(t => t.classList.remove('show'));
        };
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            resetBtns();
            activeTimeout = setTimeout(() => {
                b1.classList.add('active'); t1.classList.add('show');
                activeTimeout = setTimeout(() => {
                    resetBtns();
                    activeTimeout = setTimeout(() => {
                        b2.classList.add('active'); t2.classList.add('show');
                        activeTimeout = setTimeout(() => {
                            resetBtns();
                            activeTimeout = setTimeout(() => {
                                b3.classList.add('active'); t3.classList.add('show');
                                activeTimeout = setTimeout(() => { resetBtns(); isAnimating = false; }, 800);
                            }, 800);
                        }, 800);
                    }, 800);
                }, 800);
            }, 500);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'full-regeneration') {
        container.innerHTML = replayBtnStyle + `
            <style>
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .aid-fr-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px; position:relative;}
                .aid-fr-content { font-size: 14px; color: #374151; opacity: 1; transition: opacity 0.3s;}
                .aid-fr-content.loading { opacity: 0.3;}
                .aid-fr-btn { align-self: flex-start; display: flex; align-items: center; gap: 6px; padding: 8px 16px; font-size: 13px; font-weight: 600; color: #1f2937; border: 1px solid #e5e7eb; border-radius: 6px; cursor: pointer; transition: all 0.3s; background: #fff;}
                .aid-fr-btn.active { font-size: 0; width: 34px; border-color: transparent; border-radius: 17px; background: #f3f4f6;}
                .aid-fr-spinner { width: 16px; height: 16px; border: 2px solid #cbd5e1; border-top-color: ${data.color}; border-radius: 50%; animation: spin 0.8s linear infinite; display: none;}
                .aid-fr-btn.active .aid-fr-spinner { display: block;}
                .aid-fr-btn.active svg { display: none;}
            </style>
            <div class="aid-fr-mockup">
                <div class="aid-fr-content" id="fr-text">Here is the first draft of the user onboarding documentation. It covers the basics.</div>
                <div class="aid-fr-btn" id="fr-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.8-11.83l-3.23 3.23"/></svg>
                    Regenerate Answer
                    <div class="aid-fr-spinner"></div>
                </div>
            </div>
        `;
        const text = document.getElementById('fr-text'), btn = document.getElementById('fr-btn'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            text.innerText = "Here is the first draft of the user onboarding documentation. It covers the basics.";
            text.classList.remove('loading'); btn.classList.remove('active');

            activeTimeout = setTimeout(() => {
                btn.classList.add('active'); text.classList.add('loading');
                activeTimeout = setTimeout(() => {
                    text.innerText = "Welcome to the platform! Let me guide you through the initial setup steps to get you running.";
                    text.classList.remove('loading'); btn.classList.remove('active');
                    activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                }, 1500);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'tone-moderation') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-tm-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-tm-input { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; font-size: 14px; color: #374151; min-height: 48px;}
                .aid-tm-input mark { background: #fef08a; padding: 0 2px; border-radius: 2px;}
                .aid-tm-warn { display: flex; align-items: flex-start; gap: 8px; background: #fefce8; border: 1px solid #fef08a; border-radius: 8px; padding: 12px; font-size: 12px; color: #854d0e; opacity: 0; transform: translateY(-10px); transition: all 0.3s; pointer-events: none;}
                .aid-tm-warn.show { opacity: 1; transform: translateY(0); pointer-events: auto;}
                .aid-tm-warn svg { color: #eab308; min-width: 16px;}
            </style>
            <div class="aid-tm-mockup">
                <div class="aid-tm-input" id="tm-input">The interface design is completely stupid and useless.</div>
                <div class="aid-tm-warn" id="tm-warn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    <div><strong>Hostile Tone Detected</strong><br/>Consider replacing "stupid and useless" with constructive feedback like "confusing".</div>
                </div>
            </div>
        `;
        const input = document.getElementById('tm-input'), warn = document.getElementById('tm-warn'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            input.innerHTML = 'The interface design is completely stupid and useless.'; warn.classList.remove('show');

            activeTimeout = setTimeout(() => {
                input.innerHTML = 'The interface design is completely <mark>stupid and useless</mark>.';
                warn.classList.add('show');
                activeTimeout = setTimeout(() => {
                    input.innerHTML = 'The interface design is quite <mark>confusing to navigate</mark>.';
                    activeTimeout = setTimeout(() => {
                        input.innerHTML = 'The interface design is quite confusing to navigate.';
                        warn.classList.remove('show');
                        activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                    }, 800);
                }, 1500);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'show-citations') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-sc-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px; position:relative;}
                .aid-sc-text { font-size: 14px; color: #374151; line-height: 1.6;}
                .aid-sc-cite { display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 8px; background: #f3f4f6; font-size: 10px; font-weight: 700; color: ${data.color}; cursor: pointer; vertical-align: super; margin-left: 2px; transition: background 0.2s;}
                .aid-sc-cite.hover { background: ${data.color}; color: #fff;}
                .aid-sc-pop { position: absolute; bottom: -50px; left: 10%; width: 80%; background: #1f2937; color: #fff; padding: 12px; border-radius: 8px; font-size: 12px; opacity: 0; transform: translateY(10px); transition: all 0.3s; pointer-events: none;}
                .aid-sc-pop.show { opacity: 1; transform: translateY(0); pointer-events: auto;}
                .aid-sc-pop-tit { font-weight: 600; color: #9ca3af; margin-bottom: 4px; display: block;}
            </style>
            <div class="aid-sc-mockup">
                <div class="aid-sc-text">
                    The Q3 revenue grew by 24% compared to the previous year<span class="aid-sc-cite" id="sc-c1">1</span>, mostly driven by enterprise sales<span class="aid-sc-cite" id="sc-c2">2</span>.
                </div>
                <div class="aid-sc-pop" id="sc-pop">
                    <span class="aid-sc-pop-tit" id="sc-pop-tit">Source 1</span>
                    <span id="sc-pop-desc">Q3_Financial_Quarterly_Report_Final.pdf (Page 12)</span>
                </div>
            </div>
        `;
        const c1 = document.getElementById('sc-c1'), c2 = document.getElementById('sc-c2');
        const pop = document.getElementById('sc-pop'), tit = document.getElementById('sc-pop-tit'), desc = document.getElementById('sc-pop-desc');
        const replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            c1.classList.remove('hover'); c2.classList.remove('hover'); pop.classList.remove('show');

            activeTimeout = setTimeout(() => {
                c1.classList.add('hover');
                tit.innerText = 'Source 1'; desc.innerText = 'Q3_Financial_Quarterly_Report_Final.pdf (Page 12)';
                pop.classList.add('show');
                activeTimeout = setTimeout(() => {
                    c1.classList.remove('hover'); pop.classList.remove('show');
                    activeTimeout = setTimeout(() => {
                        c2.classList.add('hover');
                        tit.innerText = 'Source 2'; desc.innerText = 'Sales_Data_Q3_Export.csv (Row 42)';
                        pop.classList.add('show');
                        activeTimeout = setTimeout(() => {
                            c2.classList.remove('hover'); pop.classList.remove('show');
                            activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                        }, 1500);
                    }, 400);
                }, 1500);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'knowledge-base') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-kb-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-kb-search { display: flex; align-items: center; gap: 8px; border: 1px solid #e5e7eb; padding: 10px 12px; border-radius: 8px; font-size: 14px; color: #6b7280; margin-bottom: 8px;}
                .aid-kb-list { display: flex; flex-direction: column; gap: 8px;}
                .aid-kb-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 8px; cursor: pointer; transition: all 0.3s;}
                .aid-kb-item:hover { background: #f3f4f6;}
                .aid-kb-icon { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; background: #e5e7eb; border-radius: 4px; color: #4b5563;}
                .aid-kb-text { flex: 1; display: flex; flex-direction: column; gap: 2px;}
                .aid-kb-title { font-size: 13px; font-weight: 600; color: #1f2937;}
                .aid-kb-meta { font-size: 11px; color: #9ca3af;}
                .aid-kb-check { opacity: 0; transform: scale(0.5); transition: all 0.3s; color: ${data.color};}
                .aid-kb-item.active .aid-kb-check { opacity: 1; transform: scale(1);}
                .aid-kb-item.active { border-color: ${data.color}; background: #fff;}
            </style>
            <div class="aid-kb-mockup">
                <div class="aid-kb-search">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    Search company guidelines...
                </div>
                <div class="aid-kb-list">
                    <div class="aid-kb-item" id="kb-i1">
                        <div class="aid-kb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg></div>
                        <div class="aid-kb-text">
                            <span class="aid-kb-title">Brand Voice Guidelines</span>
                            <span class="aid-kb-meta">Updated 2 days ago</span>
                        </div>
                        <div class="aid-kb-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                    </div>
                    <div class="aid-kb-item" id="kb-i2">
                        <div class="aid-kb-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.8-11.83l-3.23 3.23"/></svg></div>
                        <div class="aid-kb-text">
                            <span class="aid-kb-title">Q3 Financial Reports</span>
                            <span class="aid-kb-meta">Imported from Google Drive</span>
                        </div>
                        <div class="aid-kb-check"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
                    </div>
                </div>
            </div>
        `;
        const i1 = document.getElementById('kb-i1'), i2 = document.getElementById('kb-i2'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            i1.classList.remove('active'); i2.classList.remove('active');
            activeTimeout = setTimeout(() => {
                i1.classList.add('active');
                activeTimeout = setTimeout(() => {
                    i2.classList.add('active');
                    activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                }, 800);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'prompt-library') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-pl-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-pl-tabs { display: flex; gap: 16px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px;}
                .aid-pl-tab { font-size: 13px; font-weight: 600; color: #6b7280; cursor: pointer; transition: color 0.3s; position: relative;}
                .aid-pl-tab.active { color: #1f2937;}
                .aid-pl-tab.active::after { content: ''; position: absolute; bottom: -9px; left: 0; width: 100%; height: 2px; background: ${data.color};}
                .aid-pl-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px;}
                .aid-pl-card { background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 8px; padding: 12px; cursor: pointer; transition: all 0.3s;}
                .aid-pl-card:hover { border-color: ${data.color}; box-shadow: 0 4px 12px ${data.color}22;}
                .aid-pl-tit { font-size: 12px; font-weight: 600; color: #1f2937; margin-bottom: 4px; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;}
                .aid-pl-desc { font-size: 11px; color: #6b7280; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;}
                .aid-pl-card.active { border-color: ${data.color}; background: #fff;}
            </style>
            <div class="aid-pl-mockup">
                <div class="aid-pl-tabs">
                    <div class="aid-pl-tab active" id="pl-t1">Team Library</div>
                    <div class="aid-pl-tab" id="pl-t2">My Prompts</div>
                </div>
                <div class="aid-pl-grid" id="pl-grid">
                    <div class="aid-pl-card" id="pl-c1"><div class="aid-pl-tit">Weekly Report</div><div class="aid-pl-desc">Summarize recent PRs and issues closed.</div></div>
                    <div class="aid-pl-card" id="pl-c2"><div class="aid-pl-tit">Code Review</div><div class="aid-pl-desc">Check for security and performance.</div></div>
                </div>
            </div>
        `;
        const c1 = document.getElementById('pl-c1'), c2 = document.getElementById('pl-c2'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            c1.classList.remove('active'); c2.classList.remove('active');
            activeTimeout = setTimeout(() => {
                c1.classList.add('active');
                activeTimeout = setTimeout(() => {
                    c1.classList.remove('active'); c2.classList.add('active');
                    activeTimeout = setTimeout(() => { c2.classList.remove('active'); isAnimating = false; }, 800);
                }, 800);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'guardrails') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-gr-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-gr-input { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; font-size: 14px; color: #374151; display:flex; align-items:center; justify-content:space-between;}
                .aid-gr-toggle { width: 32px; height: 18px; background: #e5e7eb; border-radius: 9px; position: relative; cursor: pointer; transition: background 0.3s;}
                .aid-gr-toggle.active { background: ${data.color};}
                .aid-gr-toggle::after { content: ''; position: absolute; top: 2px; left: 2px; width: 14px; height: 14px; background: #fff; border-radius: 50%; transition: left 0.3s;}
                .aid-gr-toggle.active::after { left: 16px;}
                .aid-gr-alert { background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 12px; font-size: 13px; color: #991b1b; display: flex; gap: 8px; align-items: flex-start; opacity: 0; transform: translateY(-10px); transition: all 0.3s; pointer-events: none; margin-top: 8px;}
                .aid-gr-alert.show { opacity: 1; transform: translateY(0); pointer-events: auto;}
                .aid-gr-btn { background: #991b1b; color: #fff; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; align-self: flex-end; margin-top: 8px;}
            </style>
            <div class="aid-gr-mockup">
                <div style="font-size:14px; font-weight:600; color:#1f2937;">Admin Settings: Data Guardrails</div>
                <div class="aid-gr-input">
                    Block PII in prompts
                    <div class="aid-gr-toggle" id="gr-t1"></div>
                </div>
                <div class="aid-gr-alert" id="gr-msg">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-top:2px;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                    <div>
                        <strong>Action Blocked</strong><br/>
                        A user attempted to include SSN in a generation prompt.
                        <div class="aid-gr-btn">View Audit Log</div>
                    </div>
                </div>
            </div>
        `;
        const t1 = document.getElementById('gr-t1'), msg = document.getElementById('gr-msg'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            t1.classList.remove('active'); msg.classList.remove('show');
            activeTimeout = setTimeout(() => {
                t1.classList.add('active');
                activeTimeout = setTimeout(() => {
                    msg.classList.add('show');
                    activeTimeout = setTimeout(() => { isAnimating = false; }, 2000);
                }, 800);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'team-workspace') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-tw-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-tw-top { display: flex; justify-content: space-between; align-items: center;}
                .aid-tw-title { font-size: 14px; font-weight: 600; color: #1f2937;}
                .aid-tw-avatars { display: flex; align-items: center;}
                .aid-tw-avatar { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #fff; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: 700; color: #4b5563; margin-left: -8px;}
                .aid-tw-avatar:first-child { margin-left: 0;}
                .aid-tw-box { background: #f9fafb; border: 1px solid #f3f4f6; border-radius: 8px; padding: 12px; position: relative;}
                .aid-tw-cursor { position: absolute; pointer-events: none; display: flex; flex-direction: column; align-items: flex-start; z-index: 10; opacity: 0; transition: all 0.5s ease-out;}
                .aid-tw-cursor.show { opacity: 1;}
                .aid-tw-cursor svg { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));}
                .aid-tw-cursor-name { background: ${data.color}; color: #fff; font-size: 10px; font-weight: 600; padding: 2px 6px; border-radius: 4px; margin-top: 4px; white-space: nowrap;}
                .aid-tw-text { font-size: 13px; color: #374151;}
                .aid-tw-hl { background: ${data.color}33;}
            </style>
            <div class="aid-tw-mockup">
                <div class="aid-tw-top">
                    <div class="aid-tw-title">Project: Q4 Launch</div>
                    <div class="aid-tw-avatars">
                        <div class="aid-tw-avatar" style="background:#fecaca; color:#991b1b;">AJ</div>
                        <div class="aid-tw-avatar" style="background:#bbf7d0; color:#166534;">JS</div>
                        <div class="aid-tw-avatar" style="background:${data.color}44; border-color:#fff;">+2</div>
                    </div>
                </div>
                <div class="aid-tw-box">
                    <div class="aid-tw-cursor" id="tw-cur" style="top:20px; left:40px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="${data.color}" stroke="#fff" stroke-width="2"><path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path></svg>
                        <div class="aid-tw-cursor-name">JS is editing...</div>
                    </div>
                    <div class="aid-tw-text" id="tw-text">The initial target audience includes <span id="tw-hl">small business owners</span> and freelancers.</div>
                </div>
            </div>
        `;
        const cur = document.getElementById('tw-cur'), hl = document.getElementById('tw-hl'), text = document.getElementById('tw-text'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            cur.style.top = '20px'; cur.style.left = '40px'; cur.classList.remove('show');
            hl.className = ''; hl.innerText = 'small business owners';

            activeTimeout = setTimeout(() => {
                cur.classList.add('show');
                activeTimeout = setTimeout(() => {
                    cur.style.top = '15px'; cur.style.left = '140px';
                    hl.className = 'aid-tw-hl';
                    activeTimeout = setTimeout(() => {
                        cur.style.left = '180px';
                        hl.innerText = 'enterprise clients';
                        activeTimeout = setTimeout(() => {
                            cur.classList.remove('show'); hl.className = '';
                            activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                        }, 1000);
                    }, 500);
                }, 500);
            }, 500);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'model-selection') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-ms-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-ms-dropdown { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; font-size: 14px; font-weight: 600; color: #374151; display: flex; justify-content: space-between; align-items: center; cursor: pointer;}
                .aid-ms-menu { border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease-out; opacity: 0;}
                .aid-ms-menu.show { grid-template-rows: 1fr; opacity: 1; margin-top: -8px;}
                .aid-ms-inner { min-height: 0; display: flex; flex-direction: column;}
                .aid-ms-item { display: flex; flex-direction: column; padding: 10px 12px; border-bottom: 1px solid #f3f4f6; transition: background 0.3s; cursor: pointer;}
                .aid-ms-item:last-child { border-bottom: none;}
                .aid-ms-item.hover { background: #f9fafb;}
                .aid-ms-tit { font-size: 13px; font-weight: 600; color: #1f2937; display: flex; justify-content: space-between;}
                .aid-ms-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; background: #e5e7eb; color: #4b5563;}
                .aid-ms-badge.fast { background: #dcfce7; color: #166534;}
                .aid-ms-desc { font-size: 11px; color: #6b7280; margin-top: 4px;}
            </style>
            <div class="aid-ms-mockup">
                <div class="aid-ms-dropdown" id="ms-drop">
                    <span id="ms-val">GPT-4 Turbo</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
                <div class="aid-ms-menu" id="ms-menu">
                    <div class="aid-ms-inner">
                        <div class="aid-ms-item hover">
                            <div class="aid-ms-tit">GPT-4 Turbo <span class="aid-ms-badge fast">Fastest</span></div>
                            <div class="aid-ms-desc">Best for complex reasoning and coding.</div>
                        </div>
                        <div class="aid-ms-item" id="ms-target">
                            <div class="aid-ms-tit">Claude 3 Opus <span class="aid-ms-badge">Most Capable</span></div>
                            <div class="aid-ms-desc">Excels at writing and complex tasks.</div>
                        </div>
                        <div class="aid-ms-item">
                            <div class="aid-ms-tit">Llama 3 <span class="aid-ms-badge">Open Source</span></div>
                            <div class="aid-ms-desc">Great for general fast responses.</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const drop = document.getElementById('ms-drop'), val = document.getElementById('ms-val'), menu = document.getElementById('ms-menu'), target = document.getElementById('ms-target'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            val.innerText = 'GPT-4 Turbo'; menu.classList.remove('show'); target.classList.remove('hover');
            activeTimeout = setTimeout(() => {
                menu.classList.add('show');
                activeTimeout = setTimeout(() => {
                    target.classList.add('hover');
                    activeTimeout = setTimeout(() => {
                        val.innerText = 'Claude 3 Opus'; menu.classList.remove('show'); target.classList.remove('hover');
                        activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                    }, 500);
                }, 800);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'context-window') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-cw-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-cw-head { display: flex; justify-content: space-between; align-items: center;}
                .aid-cw-tit { font-size: 13px; font-weight: 600; color: #1f2937;}
                .aid-cw-count { font-size: 12px; font-weight: 700; color: #6b7280; font-family: monospace;}
                .aid-cw-track { height: 8px; background: #f3f4f6; border-radius: 4px; overflow: hidden; position: relative;}
                .aid-cw-fill { height: 100%; background: ${data.color}; width: 10%; transition: width 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);}
                .aid-cw-fill.warn { background: #eab308;}
                .aid-cw-fill.danger { background: #ef4444;}
                .aid-cw-msg { font-size: 11px; color: #6b7280; opacity: 0; transition: opacity 0.3s; transform: translateY(-4px);}
                .aid-cw-msg.show { opacity: 1; transform: translateY(0);}
            </style>
            <div class="aid-cw-mockup">
                <div class="aid-cw-head">
                    <div class="aid-cw-tit">Context Memory</div>
                    <div class="aid-cw-count" id="cw-count">12k / 128k</div>
                </div>
                <div class="aid-cw-track"><div class="aid-cw-fill" id="cw-fill"></div></div>
                <div class="aid-cw-msg" id="cw-msg">Nearing context limit. Consider summarizing previous messages.</div>
            </div>
        `;
        const fill = document.getElementById('cw-fill'), count = document.getElementById('cw-count'), msg = document.getElementById('cw-msg'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            fill.className = 'aid-cw-fill'; fill.style.width = '10%'; count.innerText = '12k / 128k'; msg.classList.remove('show');
            activeTimeout = setTimeout(() => {
                fill.style.width = '45%'; count.innerText = '58k / 128k';
                activeTimeout = setTimeout(() => {
                    fill.className = 'aid-cw-fill warn'; fill.style.width = '85%'; count.innerText = '108k / 128k';
                    activeTimeout = setTimeout(() => {
                        fill.className = 'aid-cw-fill danger'; fill.style.width = '98%'; count.innerText = '125k / 128k';
                        msg.classList.add('show');
                        activeTimeout = setTimeout(() => { isAnimating = false; }, 1500);
                    }, 800);
                }, 800);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'bias-indicators') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-bi-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-bi-text { font-size: 14px; color: #374151; line-height: 1.6;}
                .aid-bi-hl { background: transparent; transition: background 0.3s; border-radius: 2px;}
                .aid-bi-hl.active { background: #fef08a;}
                .aid-bi-warn { background: #fefce8; border: 1px solid #fef08a; border-radius: 8px; padding: 12px; font-size: 12px; color: #854d0e; display: flex; align-items: flex-start; gap: 8px; opacity: 0; transform: translateY(10px); transition: all 0.3s; pointer-events: none;}
                .aid-bi-warn.show { opacity: 1; transform: translateY(0); pointer-events: auto;}
                .aid-bi-warn svg { color: #eab308; min-width: 16px; margin-top: 2px;}
            </style>
            <div class="aid-bi-mockup">
                <div class="aid-bi-text">
                    The ideal candidate for the lead developer role is <span class="aid-bi-hl" id="bi-hl">typically a younger guy</span> who can handle long hours.
                </div>
                <div class="aid-bi-warn" id="bi-warn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    <div>
                        <strong>Potential Bias Detected</strong><br/>
                        Ageist and gendered language flagged. Consider focusing on experience and skills instead.
                    </div>
                </div>
            </div>
        `;
        const hl = document.getElementById('bi-hl'), warn = document.getElementById('bi-warn'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            hl.classList.remove('active'); warn.classList.remove('show');
            activeTimeout = setTimeout(() => {
                hl.classList.add('active');
                activeTimeout = setTimeout(() => {
                    warn.classList.add('show');
                    activeTimeout = setTimeout(() => { isAnimating = false; }, 1500);
                }, 500);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'source-attribution') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-sa-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-sa-result { font-size: 14px; color: #374151; padding: 16px; background: #f9fafb; border-radius: 8px;}
                .aid-sa-hl { transition: background 0.3s; cursor: pointer;}
                .aid-sa-hl.active { background: ${data.color}33;}
                .aid-sa-sources { display: flex; flex-direction: column; gap: 8px;}
                .aid-sa-tit { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.5px;}
                .aid-sa-src { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #4b5563; padding: 8px 12px; border: 1px solid #e5e7eb; border-radius: 6px; transition: all 0.3s;}
                .aid-sa-src.active { border-color: ${data.color}; box-shadow: 0 0 0 1px ${data.color}; background: #fff;}
            </style>
            <div class="aid-sa-mockup">
                <div class="aid-sa-result">
                    Based on internal docs, <span class="aid-sa-hl" id="sa-h1">our return window is 30 days</span>. After that, <span class="aid-sa-hl" id="sa-h2">only store credit is provided</span>.
                </div>
                <div>
                    <div class="aid-sa-tit">Sources</div>
                    <div class="aid-sa-sources">
                        <div class="aid-sa-src" id="sa-s1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${data.color}" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            Return Policy Handbook 2024
                        </div>
                        <div class="aid-sa-src" id="sa-s2">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${data.color}" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                            Customer Service FAQ
                        </div>
                    </div>
                </div>
            </div>
        `;
        const h1 = document.getElementById('sa-h1'), h2 = document.getElementById('sa-h2');
        const s1 = document.getElementById('sa-s1'), s2 = document.getElementById('sa-s2');
        const replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const reset = () => { [h1, h2, s1, s2].forEach(e => e.classList.remove('active')); };
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            reset();
            activeTimeout = setTimeout(() => {
                h1.classList.add('active'); s1.classList.add('active');
                activeTimeout = setTimeout(() => {
                    reset();
                    activeTimeout = setTimeout(() => {
                        h2.classList.add('active'); s2.classList.add('active');
                        activeTimeout = setTimeout(() => { reset(); isAnimating = false; }, 1500);
                    }, 500);
                }, 1500);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'thread-options') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-to-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px; align-items: flex-end;}
                .aid-to-msg { background: #f3f4f6; padding: 12px; border-radius: 12px 12px 0 12px; font-size: 13px; color: #374151; align-self: flex-end; max-width: 80%;}
                .aid-to-msg.ai { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px 12px 12px 0; align-self: flex-start;}
                .aid-to-menu-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 16px; border: 1px solid #e5e7eb; background: #fff; color: #6b7280; cursor: pointer; transition: all 0.3s;}
                .aid-to-menu-btn.active { background: #f3f4f6; color: #1f2937;}
                .aid-to-pop { position: absolute; right: 20px; bottom: 60px; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); width: 200px; opacity: 0; transform: translateY(10px); transition: all 0.3s; pointer-events: none; overflow: hidden;}
                .aid-to-pop.show { opacity: 1; transform: translateY(0); pointer-events: auto;}
                .aid-to-item { padding: 10px 12px; font-size: 13px; color: #374151; display: flex; align-items: center; gap: 8px; cursor: pointer; transition: background 0.2s;}
                .aid-to-item:hover { background: #f9fafb;}
            </style>
            <div class="aid-to-mockup" style="position:relative; height: 240px; justify-content:flex-end;">
                <div class="aid-to-msg ai">I have drafted the campaign. Would you like me to add social media copy as well?</div>
                <div class="aid-to-msg">No, just keep it to the email format.</div>
                <div class="aid-to-menu-btn" id="to-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></div>
                <div class="aid-to-pop" id="to-pop">
                    <div class="aid-to-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"></path></svg> Rename Thread</div>
                    <div class="aid-to-item"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><line x1="6" y1="9" x2="6" y2="21"></line></svg> Branch from here</div>
                    <div class="aid-to-item" style="color:#ef4444; border-top:1px solid #f3f4f6;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Delete Thread</div>
                </div>
            </div>
        `;
        const btn = document.getElementById('to-btn'), pop = document.getElementById('to-pop'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            btn.classList.remove('active'); pop.classList.remove('show');
            activeTimeout = setTimeout(() => {
                btn.classList.add('active'); pop.classList.add('show');
                activeTimeout = setTimeout(() => {
                    btn.classList.remove('active'); pop.classList.remove('show');
                    activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                }, 2000);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'thread-history') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-th-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 0; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; overflow: hidden;}
                .aid-th-head { padding: 16px 20px; border-bottom: 1px solid #e5e7eb; font-size: 14px; font-weight: 600; color: #1f2937;}
                .aid-th-group { margin: 12px 0 0 0;}
                .aid-th-time { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #9ca3af; padding: 0 20px; margin-bottom: 6px;}
                .aid-th-item { padding: 10px 20px; font-size: 13px; color: #374151; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: background 0.3s; position: relative;}
                .aid-th-item:hover { background: #f9fafb;}
                .aid-th-item.active { background: ${data.color}11; box-shadow: inset 3px 0 0 ${data.color}; font-weight: 500;}
                .aid-th-item svg { min-width: 14px; color: #9ca3af;}
                .aid-th-item.active svg { color: ${data.color};}
                .aid-th-text { white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
            </style>
            <div class="aid-th-mockup">
                <div class="aid-th-head">Chat History</div>
                <div class="aid-th-group">
                    <div class="aid-th-time">Today</div>
                    <div class="aid-th-item" id="th-i1"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"></path></svg> <div class="aid-th-text">Drafting Quarterly Update Email</div></div>
                    <div class="aid-th-item active" id="th-i2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"></path></svg> <div class="aid-th-text">Analyzing Q3 Sales Data</div></div>
                </div>
                <div class="aid-th-group" style="padding-bottom:12px;">
                    <div class="aid-th-time">Yesterday</div>
                    <div class="aid-th-item" id="th-i3"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"></path></svg> <div class="aid-th-text">Refactoring React Components</div></div>
                </div>
            </div>
        `;
        const i1 = document.getElementById('th-i1'), i2 = document.getElementById('th-i2'), i3 = document.getElementById('th-i3'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            i1.classList.remove('active'); i2.classList.add('active'); i3.classList.remove('active');
            activeTimeout = setTimeout(() => {
                i2.classList.remove('active'); i1.classList.add('active');
                activeTimeout = setTimeout(() => {
                    i1.classList.remove('active'); i3.classList.add('active');
                    activeTimeout = setTimeout(() => {
                        i3.classList.remove('active'); i2.classList.add('active');
                        activeTimeout = setTimeout(() => { isAnimating = false; }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'generation-tokens') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-gt-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-gt-head { display: flex; justify-content: space-between; align-items: center;}
                .aid-gt-tit { font-size: 14px; font-weight: 600; color: #1f2937; display: flex; align-items: center; gap: 6px;}
                .aid-gt-count { font-size: 24px; font-weight: 700; color: ${data.color}; font-family: monospace; display: flex; align-items: center; gap: 4px; transition: color 0.3s;}
                .aid-gt-count.low { color: #ef4444;}
                .aid-gt-desc { font-size: 13px; color: #6b7280; background: #f9fafb; padding: 12px; border-radius: 8px;}
            </style>
            <div class="aid-gt-mockup">
                <div class="aid-gt-head">
                    <div class="aid-gt-tit"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> Balance</div>
                    <div class="aid-gt-count" id="gt-count">500 <span style="font-size:12px; color:#9ca3af;">Tokens</span></div>
                </div>
                <div class="aid-gt-desc">Every generation costs 10-50 tokens depending on the selected model quality.</div>
            </div>
        `;
        const count = document.getElementById('gt-count'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            count.innerHTML = '500 <span style="font-size:12px; color:#9ca3af;">Tokens</span>'; count.classList.remove('low');
            activeTimeout = setTimeout(() => {
                count.innerHTML = '450 <span style="font-size:12px; color:#9ca3af;">Tokens</span>';
                activeTimeout = setTimeout(() => {
                    count.innerHTML = '200 <span style="font-size:12px; color:#9ca3af;">Tokens</span>';
                    activeTimeout = setTimeout(() => {
                        count.innerHTML = '20 <span style="font-size:12px; color:#9ca3af;">Tokens</span>'; count.classList.add('low');
                        activeTimeout = setTimeout(() => { isAnimating = false; }, 1500);
                    }, 800);
                }, 800);
            }, 800);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'agent-initial-command') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-aic-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-aic-input { border: 2px solid #e5e7eb; border-radius: 8px; padding: 12px; font-size: 14px; font-family: monospace; color: #1f2937; background: #f9fafb; position: relative;}
                .aid-aic-cursor { display: inline-block; width: 8px; height: 16px; background: ${data.color}; animation: blink 1s step-end infinite; vertical-align: middle; margin-left: 2px;}
                @keyframes blink { 50% { opacity: 0; } }
                .aid-aic-status { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #166534; opacity: 0; transform: translateY(-10px); transition: all 0.3s;}
                .aid-aic-status.show { opacity: 1; transform: translateY(0);}
                .aid-aic-btn { align-self: flex-end; background: ${data.color}; color: #fff; padding: 8px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; opacity: 0.5; transition: opacity 0.3s;}
                .aid-aic-btn.ready { opacity: 1; cursor: pointer;}
            </style>
            <div class="aid-aic-mockup">
                <div class="aid-aic-input" id="aic-input"><span class="aid-aic-cursor"></span></div>
                <div class="aid-aic-status" id="aic-status"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Agent deployed and running...</div>
                <div class="aid-aic-btn" id="aic-btn">Deploy Agent</div>
            </div>
        `;
        const input = document.getElementById('aic-input'), btn = document.getElementById('aic-btn'), status = document.getElementById('aic-status'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const textToType = "Summarize daily slack logs";
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            input.innerHTML = '<span class="aid-aic-cursor"></span>'; status.classList.remove('show'); btn.classList.remove('ready');
            let i = 0;
            const typeText = () => {
                if (i < textToType.length) {
                    input.innerHTML = textToType.substring(0, i + 1) + '<span class="aid-aic-cursor"></span>';
                    i++;
                    activeTimeout = setTimeout(typeText, 50);
                } else {
                    btn.classList.add('ready');
                    activeTimeout = setTimeout(() => {
                        input.innerHTML = textToType;
                        status.classList.add('show');
                        activeTimeout = setTimeout(() => { isAnimating = false; }, 1500);
                    }, 500);
                }
            };
            activeTimeout = setTimeout(typeText, 500);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
        startDemo();

    } else if (id === 'agent-action-review') {
        container.innerHTML = replayBtnStyle + `
            <style>
                .aid-aar-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-aar-alert { display: flex; gap: 12px; padding: 16px; background: #fefce8; border: 1px solid #fef08a; border-radius: 8px;}
                .aid-aar-icon { width: 32px; height: 32px; background: #eab308; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;}
                .aid-aar-content { flex: 1; display: flex; flex-direction: column; gap: 4px;}
                .aid-aar-title { font-size: 14px; font-weight: 700; color: #854d0e;}
                .aid-aar-desc { font-size: 13px; color: #713f12;}
                .aid-aar-code { font-family: monospace; font-size: 11px; background: #fef9c3; padding: 8px; border-radius: 4px; border: 1px solid #fde047; margin: 8px 0; color: #a16207;}
                .aid-aar-actions { display: flex; gap: 8px; margin-top: 8px;}
                .aid-aar-btn { flex: 1; padding: 8px; font-size: 13px; font-weight: 600; border-radius: 6px; cursor: pointer; text-align: center; border: 1px solid transparent; transition: all 0.2s;}
                .aid-aar-btn.rej { background: #fff; color: #991b1b; border-color: #fecaca;}
                .aid-aar-btn.apr { background: #166534; color: #fff;}
                .aid-aar-overlay { position: absolute; inset: 0; background: rgba(255,255,255,0.9); z-index: 10; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; border-radius: 12px; opacity: 0; pointer-events: none; transition: opacity 0.3s;}
                .aid-aar-overlay.show { opacity: 1; pointer-events: auto;}
                .aid-aar-mockup.approved .aid-aar-overlay { color: #166534;}
                .aid-aar-mockup.rejected .aid-aar-overlay { color: #991b1b;}
            </style>
            <div class="aid-aar-mockup" id="aar-wrap" style="position:relative;">
                <div class="aid-aar-alert">
                    <div class="aid-aar-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg></div>
                    <div class="aid-aar-content">
                        <div class="aid-aar-title">Agent Permission Request</div>
                        <div class="aid-aar-desc">The deployment agent is attempting to run a script that drops a database table.</div>
                        <div class="aid-aar-code">DROP TABLE users_backup_legacy;</div>
                        <div class="aid-aar-actions">
                            <div class="aid-aar-btn rej" id="aar-rej">Reject</div>
                            <div class="aid-aar-btn apr" id="aar-apr">Approve</div>
                        </div>
                    </div>
                </div>
                <div class="aid-aar-overlay" id="aar-over">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path id="aar-icon-path" d=""></path></svg>
                    <div style="font-size:16px; font-weight:700;" id="aar-over-txt"></div>
                </div>
            </div>
        `;
        const wrap = document.getElementById('aar-wrap'), over = document.getElementById('aar-over'), txt = document.getElementById('aar-over-txt'), path = document.getElementById('aar-icon-path'), replayBtn = document.getElementById('raw-demo-replay');
        let activeTimeout, isAnimating = false;
        const startDemo = () => {
            if (isAnimating) return; isAnimating = true; clearTimeout(activeTimeout);
            wrap.className = 'aid-aar-mockup'; over.classList.remove('show');
            activeTimeout = setTimeout(() => {
                wrap.classList.add('approved'); txt.innerText = 'Action Approved'; path.setAttribute('d', 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4 12 14.01 9 11.01');
                over.classList.add('show');
                activeTimeout = setTimeout(() => {
                    wrap.className = 'aid-aar-mockup'; over.classList.remove('show');
                    activeTimeout = setTimeout(() => {
                        wrap.classList.add('rejected'); txt.innerText = 'Action Rejected'; path.setAttribute('d', 'M18 6L6 18 M6 6l12 12');
                        over.classList.add('show');
                        activeTimeout = setTimeout(() => { isAnimating = false; }, 1500);
                    }, 800);
                }, 1500);
            }, 1000);
        };
        replayBtn.addEventListener('click', () => { clearTimeout(activeTimeout); isAnimating = false; startDemo(); });
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
