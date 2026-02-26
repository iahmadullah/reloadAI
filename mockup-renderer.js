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
                        <img src="https://images.unsplash.com/photo-1541888031525-45a8e0ee4a29?w=400&h=300&fit=crop" alt="Modern Architecture">
                        Analyze the architectural style of this building. What era is it from?
                    </div>
                </div>
                <div class="aid-img-input-area" id="img-input-box">
                    <div class="aid-img-attachments" id="img-attachments">
                        <div class="aid-img-thumb-box">
                            <img src="https://images.unsplash.com/photo-1541888031525-45a8e0ee4a29?w=100&h=100&fit=crop" alt="Thumb">
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
