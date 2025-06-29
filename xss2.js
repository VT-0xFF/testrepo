let thewindow = window.parent;
let thedocument = thewindow.document;
let theconsole = thewindow.console;

theconsole.log("hi");

if (!thewindow.__chatCouponCleanerLoaded) {
    thewindow.__chatCouponCleanerLoaded = true;

    function isCouponLi(li) {
        return li.tagName === 'LI' && li.innerHTML.includes('chat-coupon-text');
    }

    function removeCouponLis(container) {
        const lis = container.querySelectorAll('li');
        lis.forEach(li => {
            if (isCouponLi(li)) {
                li.remove();
            }
        });
    }

    function observeChatList(container) {
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (isCouponLi(node)) {
                            node.remove();
                            return;
                        }

                        const nestedLis = node.querySelectorAll?.('li') || [];
                        nestedLis.forEach(li => {
                            if (isCouponLi(li)) {
                                li.remove();
                            }
                        });
                    }
                });

                if (mutation.type === 'characterData') {
                    const parent = mutation.target.parentElement;
                    if (parent && isCouponLi(parent)) {
                        parent.remove();
                    }
                }
            }
        });

        observer.observe(container, {
            childList: true,
            subtree: true,
            characterData: true
        });
    }

    // Safe query for chat list containers
    thedocument.querySelectorAll('div#lvs-chat-list').forEach(container => {
        removeCouponLis(container);
        observeChatList(container);
    });

    const topObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType !== Node.ELEMENT_NODE) return;

                // Ensure node is not body or html to avoid full doc interference
                if (node.tagName === 'BODY' || node.tagName === 'HTML') return;

                if (node.id === 'lvs-chat-list') {
                    removeCouponLis(node);
                    observeChatList(node);
                }

                const nested = node.querySelectorAll?.('div#lvs-chat-list') || [];
                nested.forEach(container => {
                    removeCouponLis(container);
                    observeChatList(container);
                });
            });
        });
    });

    // Safe observe of body, without touching it
    if (thedocument.body) {
        topObserver.observe(thedocument.body, { childList: true, subtree: true });
    }
}
