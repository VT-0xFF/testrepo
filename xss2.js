let thewindow = window.parent;
let thedoc = thewindow.document;

if (!thewindow.__pureCSSCouponHider) {
  thewindow.__pureCSSCouponHider = true;
  
  const style = thedoc.createElement('style');
  style.textContent = `

    li:has(*[class*="chat-coupon"]) {
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
  
  thedoc.head.appendChild(style);
}
