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

}
