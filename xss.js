let thewindow = window.parent
let thedocument = window.document
if (!thewindow.__chatCouponCleanerLoaded) {
    
    thewindow.__chatCouponCleanerLoaded = true;

    function removeCouponLis(container) {
        const lis = container.querySelectorAll('li');
        lis.forEach(li => {
            if (li.innerHTML.includes('chat-coupon-text')) {
                li.remove();
            }
        });
    }

    function observeChatList(container) {
        const observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.tagName === 'LI' && node.innerHTML.includes('chat-coupon-text')) {
                            node.remove();
                        }

                        const nestedLis = node.querySelectorAll?.('li') || [];
                        nestedLis.forEach(li => {
                            if (li.innerHTML.includes('chat-coupon-text')) {
                                li.remove();
                            }
                        });
                    }
                });

                if (mutation.type === 'characterData') {
                    const parent = mutation.target.parentElement;
                    if (parent?.tagName === 'LI' && parent.innerHTML.includes('chat-coupon-text')) {
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

    thedocument.querySelectorAll('div#lvs-chat-list').forEach(container => {
        removeCouponLis(container);
        observeChatList(container);
    });

    const topObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    if (node.id === 'lvs-chat-list') {
                        removeCouponLis(node);
                        observeChatList(node);
                    }

                    const nested = node.querySelectorAll?.('div#lvs-chat-list') || [];
                    nested.forEach(container => {
                        removeCouponLis(container);
                        observeChatList(container);
                    });
                }
            });
        });
    });

    topObserver.observe(thedocument.body, { childList: true, subtree: true });
}
