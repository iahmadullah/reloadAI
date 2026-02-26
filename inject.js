const fs = require('fs');
const filePath = '/Users/ahmad.ullah/Documents/GitHub/reloadux/reloadAI/mockup-renderer.js';

const lines = fs.readFileSync(filePath, 'utf8').split('\n');

const injection = `    } else if (id === 'voice-input') {
        container.innerHTML = replayBtnStyle + \\\`
            <style>
                .aid-voice-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; padding: 32px 24px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; align-items: center; gap: 24px; min-height: 260px;}
                
                .aid-voice-display { width: 100%; min-height: 80px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; display:flex; flex-direction:column; justify-content:space-between;}
                .aid-voice-text { font-size: 16px; color: #1f2937; line-height: 1.5; font-weight: 500; margin:0;}
                .aid-voice-placeholder { color: #9ca3af; font-style: italic;}
                
                .aid-voice-visualizer { display: flex; align-items: center; justify-content: center; height: 32px; gap: 4px; opacity: 0; transition: opacity 0.3s;}
                .aid-voice-visualizer.active { opacity: 1; }
                .aid-voice-bar { width: 4px; height: 8px; background: \${data.color}; border-radius: 4px; transition: height 0.1s ease; }
                
                .aid-voice-btn-wrap { position: relative; width: 80px; height: 80px; display: flex; align-items: center; justify-content: center;}
                .aid-voice-pulse { position: absolute; inset: 0; border-radius: 50%; border: 2px solid \${data.color}; opacity: 0; transform: scale(0.8); }
                .aid-voice-btn-wrap.recording .aid-voice-pulse:nth-child(1) { animation: voice-ripple 2s linear infinite; }
                .aid-voice-btn-wrap.recording .aid-voice-pulse:nth-child(2) { animation: voice-ripple 2s linear infinite 0.6s; }
                .aid-voice-btn-wrap.recording .aid-voice-pulse:nth-child(3) { animation: voice-ripple 2s linear infinite 1.2s; }
                
                @keyframes voice-ripple { 0% { transform: scale(0.8); opacity: 0.8; border-width: 2px; } 100% { transform: scale(1.6); opacity: 0; border-width: 0px; } }
                
                .aid-voice-btn { position: relative; z-index: 10; width: 64px; height: 64px; border-radius: 50%; background: #f3f4f6; color: #4b5563; display: flex; align-items: center; justify-content: center; cursor: pointer; border: 1px solid #e5e7eb; transition: all 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.05);}
                .aid-voice-btn svg { width: 28px; height: 28px; transition: all 0.3s; }
                
                .aid-voice-btn-wrap.recording .aid-voice-btn { background: \${data.color}; color: white; border-color: \${data.color}; box-shadow: 0 8px 24px \${data.color}55; transform: scale(1.05);}
                
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
        \\\`;
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
        container.innerHTML = replayBtnStyle + \\\`
            <style>
                .aid-ih-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 32px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 24px;}
                
                .aid-ih-group { display: flex; flex-direction: column; gap: 8px; position: relative;}
                .aid-ih-label { font-size: 14px; font-weight: 600; color: #374151; display:flex; align-items:center; gap: 8px;}
                
                .aid-ih-icon { width: 16px; height: 16px; border-radius: 50%; background: #f3f4f6; color: #9ca3af; display: flex; align-items: center; justify-content: center; cursor: help; font-size: 10px; font-weight: bold; font-family: sans-serif; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; z-index: 10;}
                .aid-ih-icon.active { background: \${data.color}; color: white; transform: scale(1.1); box-shadow: 0 0 0 3px \${data.color}33;}
                
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
        \\\`;
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
                    cursor.style.transform = "translate(100px, 10px)"; 
                    activeTimeout = setTimeout(() => {
                        icon.classList.add('active');
                        tooltip.classList.add('show');
                        activeTimeout = setTimeout(() => {
                            cursor.style.transform = "translate(200px, 120px)"; 
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
        container.innerHTML = replayBtnStyle + \\\`
            <style>
                .aid-pqf-mockup { width: 100%; max-width: 480px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 20px; box-shadow: 0 8px 30px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 16px;}
                .aid-pqf-header { display:flex; justify-content:space-between; align-items:center;}
                .aid-pqf-title { font-size: 14px; font-weight: 600; color: #374151;}
                
                .aid-pqf-textarea { width: 100%; height: 100px; border: 1px solid #d1d5db; border-radius: 8px; padding: 12px; font-size: 14px; font-family: sans-serif; line-height: 1.5; color: #1f2937; resize: none; outline:none; transition: border-color 0.3s;}
                .aid-pqf-textarea:focus { border-color: \${data.color}; box-shadow: 0 0 0 3px \${data.color}22;}
                
                .aid-pqf-footer { display: flex; align-items: center; justify-content: space-between; background:#f9fafb; padding:10px 14px; border-radius:8px; border: 1px solid #e5e7eb;}
                
                .aid-pqf-meter-wrap { display: flex; align-items: center; gap: 12px; flex: 1; margin-right: 16px;}
                .aid-pqf-meter-bg { flex: 1; height: 6px; background: #e5e7eb; border-radius: 3px; overflow: hidden; position:relative;}
                .aid-pqf-meter-fill { height: 100%; width: 0%; background: #ef4444; border-radius: 3px; transition: width 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.5s; }
                
                .aid-pqf-status { font-size: 12px; font-weight: 600; color: #ef4444; min-width: 80px; transition: color 0.5s;}
                
                .pqf-lvl-1 .aid-pqf-meter-fill { width: 25%; background: #ef4444; }
                .pqf-lvl-1 .aid-pqf-status { color: #ef4444; }
                
                .pqf-lvl-2 .aid-pqf-meter-fill { width: 60%; background: #f59e0b; }
                .pqf-lvl-2 .aid-pqf-status { color: #f59e0b; }
                
                .pqf-lvl-3 .aid-pqf-meter-fill { width: 100%; background: #10b981; }
                .pqf-lvl-3 .aid-pqf-status { color: #10b981; }
                
                .aid-pqf-cursor { display: inline-block; width: 2px; height: 18px; background: \${data.color}; animation: blink 1s step-end infinite; vertical-align: text-bottom; margin-left:1px;}
            </style>
            <div class="aid-pqf-mockup">
                <div class="aid-pqf-header"><div class="aid-pqf-title">Prompt Composer</div></div>
                <div style="position:relative;">
                    <div class="aid-pqf-textarea" id="pqf-input" style="border-color:\${data.color};"><span id="pqf-typed"></span><span class="aid-pqf-cursor" id="pqf-cursor"></span></div>
                </div>
                <div class="aid-pqf-footer" id="pqf-footer">
                    <div class="aid-pqf-meter-wrap">
                        <div class="aid-pqf-meter-bg"><div class="aid-pqf-meter-fill"></div></div>
                        <div class="aid-pqf-status" id="pqf-status">Needs Detail</div>
                    </div>
                </div>
            </div>
        \\\`;
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
        startDemo();`;

// Splice lines 354 to 871 out and replace with the injection
const newLines = [...lines.slice(0, 354), injection, ...lines.slice(871)];
fs.writeFileSync(filePath, newLines.join('\\n'), 'utf8');
console.log('Successfully injected code.');
