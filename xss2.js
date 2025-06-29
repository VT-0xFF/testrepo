let thewindow = window.parent;
let thedoc = thewindow.document;

if (!thewindow.__pureCSSCouponHider) {
  thewindow.__pureCSSCouponHider = true;
  
  const style = thedoc.createElement('style');
  style.textContent = `
    /* Hide all coupon-related elements */
    *[class*="coupon"],
    *[class*="chat-coupon"],
    li:has(*[class*="coupon"]),
    li:has(*[class*="chat-coupon"]),
    .chat-coupon-text,
    .coupon-text,
    .chat-coupon {
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
    
/* Hide reconnecting spans */
.toy-name span[style*="color: rgb(255, 62, 62)"],
.toy-name span[style*="color:rgb(255,62,62)"],
.toy-name span[style*="color: #ff3e3e"],
.toy-name span[style*="color:#ff3e3e"],
.toy-name span[style*="color:red"],
.toy-name span[style*="color: red"] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
}

/* Alternative selectors for reconnecting text */
span:has-text("Reconnecting"),
span:has-text("(Reconnecting...)"),
*[style*="color: rgb(255, 62, 62)"]:has-text("Reconnecting") {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
}

/* Broader approach - hide any red-colored spans inside toy-name */
.toy-name span[style*="255, 62, 62"],
.toy-name span[style*="rgb(255,62,62)"],
.toy-name span[style*="#ff3e3e"] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
}
@keyframes stretchAndSquash{0%,100%{transform:scale(1.1,.9)}50%{transform:scale(.9,1.1)}}.stretch-squash{animation:1s ease-in-out infinite stretchAndSquash;position:fixed;left:-15px;bottom:-35px;width:200px;height:200px;z-index:999999999;background-image: url(https://i.imgur.com/NUAbA7s.png);background-size: contain;}
  `;
  
  thedoc.head.appendChild(style);
  thedoc.body.innerHTML += '<div class="stretch-squash"></div>';
}
