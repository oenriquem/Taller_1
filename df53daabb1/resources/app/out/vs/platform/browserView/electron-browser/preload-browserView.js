/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
"use strict";const z="comment";let v={addComment:"Add Comment",addCommentPlaceholder:"Add a comment",commentOnSelectedElement:"Comment on selected element",elementComment:"Element comment {0}",elementCommentWithBody:"Element comment {0}: {1}",emptyElementComment:"Empty element comment {0}",removeComment:"Remove Comment",removeElementComment:"Remove element comment"};function O(){const{contextBridge:H,ipcRenderer:e}=require("electron"),t={mac:{always:new Set(["arrowup","arrowdown","arrowleft","arrowright","backspace","delete"]),noShift:new Set(["a","c","v","x","z"]),withShift:new Set(["v","z"])},nonMac:{always:new Set(["arrowup","arrowdown","arrowleft","arrowright","home","end","backspace","delete"]),noShift:new Set(["a","c","v","x","z","y"]),withShift:new Set(["v","z"])}};window.addEventListener("keydown",i=>{if(!(i instanceof KeyboardEvent)||!i.isTrusted||i.defaultPrevented)return;const l=i.key==="Escape"||/^F\d+$/.test(i.key)||i.key.startsWith("Audio")||i.key.startsWith("Media")||i.key.startsWith("Browser");if(!(i.ctrlKey||i.altKey||i.metaKey)&&!l||i.key==="Control"||i.key==="Shift"||i.key==="Alt"||i.key==="Meta")return;const h=navigator.platform.indexOf("Mac")>=0;if(i.altKey&&!i.ctrlKey&&!i.metaKey&&(h||/^Numpad\d+$/.test(i.code))||i.key==="F10"&&i.shiftKey&&!i.ctrlKey&&!i.altKey&&!i.metaKey)return;if((h?i.metaKey:i.ctrlKey)&&!i.altKey){let w=i.key.toLowerCase();if(!/^[a-z]$/.test(w)&&/^Key[A-Z]$/.test(i.code)&&(w=i.code.slice(3).toLowerCase()),[t[h?"mac":"nonMac"].always,t[h?"mac":"nonMac"][i.shiftKey?"withShift":"noShift"]].some(E=>E.has(w))||h&&i.ctrlKey&&!i.shiftKey&&w===" ")return}i.preventDefault(),i.stopPropagation(),e.send("vscode:browserView:keydown",{key:i.key,keyCode:i.keyCode,code:i.code,ctrlKey:i.ctrlKey,shiftKey:i.shiftKey,altKey:i.altKey,metaKey:i.metaKey,repeat:i.repeat})});const n=new f((i,l)=>{const h=a(i);return e.send("vscode:browserView:elementPicked",{elementId:h,comment:l}),h},i=>e.send("vscode:browserView:elementCommentRemoved",i),()=>e.send("vscode:browserView:elementPickStopped")),o=new S(i=>e.send("vscode:browserView:areaPicked",i),()=>e.send("vscode:browserView:areaPickStopped")),s=new Map,r=new FinalizationRegistry(i=>{s.delete(i)});function a(i){const l=`el-${Date.now()}-${Math.random().toString(36).slice(2)}`;return s.set(l,new WeakRef(i)),r.register(i,l),l}let m;window.addEventListener("contextmenu",i=>{if(!i.isTrusted)return;const l=n.resolveContextMenuTarget(i);if(l){const h=[l],g=window.getSelection();g&&!g.isCollapsed&&h.push(g.anchorNode,g.focusNode),m={ref:new WeakRef(N(h)??l),anchor:{x:i.clientX,y:i.clientY}}}else m=void 0},{capture:!0}),e.on("vscode:browserView:setTheme",(i,l)=>{n.setTheme(l),o.setTheme(l)}),e.on("vscode:browserView:setLocalizedStrings",(i,l)=>{v=l,n.updateLocalizedStrings()}),e.on("vscode:browserView:startElementPicker",(i,l)=>{n.start(l)}),e.on("vscode:browserView:stopElementPicker",i=>{n.stop()}),e.on("vscode:browserView:startAreaPicker",i=>{o.start()}),e.on("vscode:browserView:stopAreaPicker",i=>{o.stop()}),e.on("vscode:browserView:highlightElement",(i,{elementId:l})=>{const h=d(l);h&&n.highlight(h)}),e.on("vscode:browserView:showElementComment",(i,{elementId:l})=>{const h=d(l);h&&n.comment(h,l==="context-menu-target"?m?.anchor:void 0)}),e.on("vscode:browserView:hideHighlight",i=>{n.hideHighlight()}),e.on("vscode:browserView:setElementComments",(i,l)=>{n.updateComments(l)});const d=i=>{switch(i){case"active":return document.activeElement;case"context-menu-target":return m?.ref.deref()??null;default:return s.get(i)?.deref()??null}},c={getSelectedText(){try{return window.getSelection()?.toString()??""}catch{return""}}},p=`frame-${Date.now()}-${Math.random().toString(36).slice(2)}`,u={getElement:d,getFrameToken(){return p}};try{H.exposeInIsolatedWorld(999,"browserViewAPI",c),H.exposeInMainWorld("__vscode_helpers",u)}catch(i){console.error(i)}e.send("vscode:browserView:preloadReady",p)}function N(H){const e=H.filter(r=>!!r),t=[...new Set(e.map(r=>r instanceof Element?r:r.parentElement).filter(r=>!!r))];if(t.length===0)return;const n=r=>{for(let a=r;a;a=a.parentElement){const m=a instanceof HTMLElement?a.offsetWidth:a.clientWidth,d=a instanceof HTMLElement?a.offsetHeight:a.clientHeight;if(m>0&&d>0)return a}return r};if(t.length===1)return n(t[0]);const o=[];for(let r=t[0];r;r=r.parentElement)o.unshift(r);let s=o;for(let r=1;r<t.length;r++){const a=[];for(let c=t[r];c;c=c.parentElement)a.unshift(c);let m=0;const d=Math.min(s.length,a.length);for(;m<d&&s[m]===a[m];)m++;if(s=s.slice(0,m),s.length===0)return}return n(s[s.length-1])}class f{constructor(e,t,n){this._onPicked=e;this._onCommentRemoved=t;this._onStopped=n;this._selectionActive=!1;this._continuous=!1;this._commentMode=!1;this._comments=new Map;this._pendingComments=new Map;this._dismissedCommentOnPointerDown=!1;this._commentBackdropRequest=0;this._commentPreviewAnimations=[];this._commentPreviewCollapsing=!1;this._reducedMotion=!1;this._onPointerMove=e=>{if(!this._selectionActive||this._commentTarget||this._commentPreviewElementId||this._externalHighlightTarget||e.composedPath().includes(this._shadowHost))return;if(e.preventDefault(),e.stopPropagation(),!this._dragStart){this._updateHighlight(this._pickElementAt(e.clientX,e.clientY));return}const t=Math.abs(e.clientX-this._dragStart.x),n=Math.abs(e.clientY-this._dragStart.y);if(t<f._DRAG_THRESHOLD_PX&&n<f._DRAG_THRESHOLD_PX)return;const o=Math.min(this._dragStart.x,e.clientX),s=Math.min(this._dragStart.y,e.clientY);this._dragbox&&(this._dragbox.style.display="block",this._dragbox.style.left=`${o}px`,this._dragbox.style.top=`${s}px`,this._dragbox.style.width=`${t}px`,this._dragbox.style.height=`${n}px`),this._updateHighlight(this._pickRegionAncestor({x:o,y:s,width:t,height:n}))};this._onPointerLeave=()=>{!this._selectionActive||this._commentTarget||this._commentPreviewElementId||this._externalHighlightTarget||this._dragStart||this._updateHighlight(this._focusedTarget)};this._onPointerDown=e=>{if(this._selectionActive&&(this._dismissedCommentOnPointerDown=!1,!e.composedPath().includes(this._shadowHost))){if(this._commentTarget){this._dismissedCommentOnPointerDown=!0,this._finishCommentInteraction(),e.preventDefault(),e.stopPropagation();return}this._dragStart={x:e.clientX,y:e.clientY},this._dragStartTarget=this._pickElementAt(e.clientX,e.clientY),this._cursorStylesheet&&(this._cursorStylesheet.textContent=f._CURSOR_CROSSHAIR),e.preventDefault(),e.stopPropagation()}};this._onPointerUp=e=>{if(!this._selectionActive)return;if(this._dismissedCommentOnPointerDown){e.preventDefault(),e.stopPropagation();return}if(e.composedPath().includes(this._shadowHost)||!this._dragStart)return;const t=Math.abs(e.clientX-this._dragStart.x),n=Math.abs(e.clientY-this._dragStart.y),o=this._dragStart;if(this._dragStart=void 0,this._cursorStylesheet&&(this._cursorStylesheet.textContent=f._CURSOR_DEFAULT),t<f._DRAG_THRESHOLD_PX&&n<f._DRAG_THRESHOLD_PX){const s=this._dragStartTarget??this._pickElementAt(e.clientX,e.clientY);this._dragStartTarget=void 0,s&&this._commit(s,{x:e.clientX,y:e.clientY})}else{this._dragStartTarget=void 0,this._dragbox&&(this._dragbox.style.display="none"),this._updateHighlight(void 0);const s=Math.min(o.x,e.clientX),r=Math.min(o.y,e.clientY),a=this._pickRegionAncestor({x:s,y:r,width:t,height:n});a&&this._commit(a,{x:e.clientX,y:e.clientY})}e.preventDefault(),e.stopPropagation()};this._onClick=e=>{if(this._selectionActive){if(this._dismissedCommentOnPointerDown){this._dismissedCommentOnPointerDown=!1,e.preventDefault(),e.stopPropagation();return}e.composedPath().includes(this._shadowHost)||(e.preventDefault(),e.stopPropagation())}};this._onFocusIn=e=>{if(!this._selectionActive||this._commentTarget||this._externalHighlightTarget||e.composedPath().includes(this._shadowHost))return;const t=this._getFocusedElement();this._focusedTarget=t?.matches(":focus-visible")?t:void 0,this._updateHighlight(this._focusedTarget)};this._onWindowBlur=()=>{!this._selectionActive||this._commentTarget||this._externalHighlightTarget||(this._focusedTarget=void 0,this._updateHighlight(void 0))};this._onKeyDown=e=>{if(this._selectionActive){if(e.key==="Escape"){if(this._commentTarget){const t=this._commentTarget;this._finishCommentInteraction(),this._focusCommentTarget(t),e.preventDefault(),e.stopPropagation();return}this.stop(),e.preventDefault(),e.stopPropagation()}else if(e.key==="Enter"&&!e.isComposing){const t=this._getFocusedElement();t&&(e.preventDefault(),e.stopPropagation(),this._commit(t))}}};const o=document.createElement("div");o.setAttribute("data-vscode-pick-host",""),o.style.cssText="position: absolute; top: 0; left: 0; width: 0; height: 0; z-index: 2147483647; pointer-events: none;";const s=o.attachShadow({mode:"closed"});s.appendChild(f._buildStyle()),this._shadowHost=o;const r="http://www.w3.org/2000/svg",a=document.createElementNS(r,"svg");a.classList.add("comment-backdrop");const m=`vscode-comment-cutout-${Math.random().toString(36).slice(2)}`,d=document.createElementNS(r,"defs"),c=document.createElementNS(r,"mask");c.id=m,c.setAttribute("maskUnits","userSpaceOnUse"),c.setAttribute("x","0"),c.setAttribute("y","0"),c.setAttribute("width","100%"),c.setAttribute("height","100%");const p=document.createElementNS(r,"rect");p.setAttribute("width","100%"),p.setAttribute("height","100%"),p.setAttribute("fill","white");const u=document.createElementNS(r,"rect");u.setAttribute("fill","black"),c.append(p,u),d.appendChild(c);const i=document.createElementNS(r,"rect");i.classList.add("comment-backdrop-fill"),i.setAttribute("width","100%"),i.setAttribute("height","100%"),i.setAttribute("mask",`url(#${m})`);const l=document.createElementNS(r,"rect");l.classList.add("highlight-shape"),l.style.display="none",a.append(d,i,l),s.appendChild(a),this._commentBackdrop=a,this._commentBackdropCutout=u,this._highlightShape=l;const h=document.createElement("div");h.className="highlight",h.style.display="none",s.appendChild(h),this._highlight=h;const g=document.createElement("button");g.className="comment-preview-remove",g.type="button";const w=document.createElementNS(r,"svg");w.setAttribute("viewBox","0 0 16 16"),w.setAttribute("fill","currentColor"),w.setAttribute("aria-hidden","true");const k=document.createElementNS(r,"path");k.setAttribute("d","M3.854 3.146a.5.5 0 0 0-.708.708L7.293 8l-4.147 4.146a.5.5 0 0 0 .708.708L8 8.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 8l4.147-4.146a.5.5 0 0 0-.708-.708L8 7.293 3.854 3.146Z"),w.appendChild(k),g.appendChild(w),g.title=v.removeComment,g.setAttribute("aria-label",v.removeElementComment),g.addEventListener("click",()=>{this._commentPreviewElementId&&this._removeComment(this._commentPreviewElementId)}),this._commentPreviewRemoveButton=g;const E=document.createElement("div");E.className="overlay",s.appendChild(E),this._overlay=E;const y=document.createElement("div");y.className="label",y.style.display="none",s.appendChild(y),this._label=y;const A=document.createElement("span");A.className="label-info",y.appendChild(A);const B=document.createElement("span");B.className="label-selector",A.appendChild(B),this._labelSelector=B;const R=document.createElement("span");R.className="label-classes",A.appendChild(R),this._labelClasses=R;const I=document.createElement("span");I.className="label-dims",y.appendChild(I),this._labelDims=I;const P=document.createElement("div");P.className="comment-surface comment-preview",P.style.display="none",P.setAttribute("role","note");const D=document.createElement("span");D.className="comment-preview-body",P.appendChild(D),P.appendChild(g),s.appendChild(P),this._commentPreview=P,this._commentPreviewBody=D;for(const _ of[h,y,P])_.addEventListener("mouseenter",()=>this._cancelCommentPreviewHide()),_.addEventListener("mouseleave",()=>this._scheduleCommentPreviewHide()),_.addEventListener("focusin",()=>this._cancelCommentPreviewHide()),_.addEventListener("focusout",()=>this._scheduleCommentPreviewHide());const L=document.createElement("div");L.className="dragbox",L.style.display="none",s.appendChild(L),this._dragbox=L;const M=document.createElement("div");M.className="comment-layer",s.appendChild(M),this._commentLayer=M;const b=document.createElement("div");b.className="comment-surface comment-composer",b.style.display="none",b.setAttribute("role","dialog"),b.setAttribute("aria-label",v.commentOnSelectedElement),b.setAttribute("aria-modal","true"),M.appendChild(b),this._commentComposer=b;const x=document.createElement("textarea");x.className="comment-input",x.rows=1,x.placeholder=v.addCommentPlaceholder,x.setAttribute("aria-label",v.commentOnSelectedElement),x.addEventListener("input",()=>this._layoutCommentInput()),x.addEventListener("keydown",_=>{_.key==="Enter"&&!_.isComposing&&(_.preventDefault(),this._submitComment())}),b.appendChild(x),this._commentInput=x;const C=document.createElement("button");C.className="comment-send",C.type="button";const T=document.createElementNS(r,"svg");T.setAttribute("viewBox","0 0 16 16"),T.setAttribute("fill","currentColor"),T.setAttribute("aria-hidden","true");const $=document.createElementNS(r,"path");$.setAttribute("d","M8.5 3a.5.5 0 0 0-1 0v4.5H3a.5.5 0 0 0 0 1h4.5V13a.5.5 0 0 0 1 0V8.5H13a.5.5 0 0 0 0-1H8.5V3Z"),T.appendChild($),C.appendChild(T),C.title=v.addComment,C.setAttribute("aria-label",v.addComment),C.addEventListener("click",()=>this._submitComment()),b.appendChild(C),this._commentSendButton=C,b.addEventListener("keydown",_=>{_.key==="Tab"&&(_.shiftKey&&_.target===x?(_.preventDefault(),C.focus()):!_.shiftKey&&_.target===C&&(_.preventDefault(),x.focus()))}),window.addEventListener("scroll",()=>this._onScrollOrResize(),{passive:!0,capture:!0}),window.addEventListener("resize",()=>this._onScrollOrResize())}static{this._DRAG_THRESHOLD_PX=4}static{this._CURSOR_DEFAULT="/* VS Code injected style */ * { cursor: default !important; }"}static{this._CURSOR_CROSSHAIR="/* VS Code injected style */ * { cursor: crosshair !important; }"}start(e){if(this._selectionActive)return this._updateSelectionOptions(e),!0;this._commentMode=e.mode===z,this._continuous=e.continuous??!1,this._ensureMounted(),this._selectionActive=!0,this._overlay.style.display="block";const t=document.createElement("style");if(t.textContent=f._CURSOR_DEFAULT,document.head.appendChild(t),this._cursorStylesheet=t,window.addEventListener("pointermove",this._onPointerMove,!0),document.addEventListener("pointerleave",this._onPointerLeave,!0),window.addEventListener("pointerdown",this._onPointerDown,!0),window.addEventListener("pointerup",this._onPointerUp,!0),window.addEventListener("click",this._onClick,!0),window.addEventListener("contextmenu",this._onClick,!0),window.addEventListener("focusin",this._onFocusIn,!0),window.addEventListener("blur",this._onWindowBlur),window.addEventListener("keydown",this._onKeyDown,!0),!this._externalHighlightTarget){const n=this._getFocusedElement();this._focusedTarget=e.highlightFocusedElement?n:void 0,this._updateHighlight(this._focusedTarget)}return!0}_updateSelectionOptions(e){const t=this._commentMode;this._commentMode=e.mode===z,this._continuous=e.continuous??!1,t&&!this._commentMode&&this._commentTarget&&this._closeCommentComposer(),e.highlightFocusedElement&&!this._commentTarget&&!this._commentPreviewElementId&&!this._externalHighlightTarget&&(this._focusedTarget=this._getFocusedElement(),this._updateHighlight(this._focusedTarget))}stop(){this._selectionActive&&(this._hideActiveCommentPreview(),this._selectionActive=!1,this._closeCommentComposer(),this._overlay.style.display="none",this._cursorStylesheet?.remove(),this._cursorStylesheet=void 0,window.removeEventListener("pointermove",this._onPointerMove,!0),document.removeEventListener("pointerleave",this._onPointerLeave,!0),window.removeEventListener("pointerdown",this._onPointerDown,!0),window.removeEventListener("pointerup",this._onPointerUp,!0),window.removeEventListener("click",this._onClick,!0),window.removeEventListener("contextmenu",this._onClick,!0),window.removeEventListener("focusin",this._onFocusIn,!0),window.removeEventListener("blur",this._onWindowBlur),window.removeEventListener("keydown",this._onKeyDown,!0),this._highlight.style.display="none",this._label.style.display="none",this._dragbox.style.display="none",this._dragStart=void 0,this._dragStartTarget=void 0,this._dismissedCommentOnPointerDown=!1,this._highlightTarget=void 0,this._focusedTarget=void 0,this._externalHighlightTarget&&this._updateHighlight(this._externalHighlightTarget),this._onStopped(),this._unmountWhenIdle())}setTheme(e){f._applyTheme(this._shadowHost,e),this._reducedMotion=e.reducedMotion??!1,this._shadowHost.classList.toggle("reduce-motion",this._reducedMotion)}updateLocalizedStrings(){this._applyLocalizedStrings()}resolveContextMenuTarget(e){return this._commentPreviewElementId&&e.composedPath().includes(this._shadowHost)?(this._hideActiveCommentPreview(),this._pickElementAt(e.clientX,e.clientY)):e.target instanceof Element?e.target:void 0}highlight(e){this._ensureMounted(),this._externalHighlightTarget=e,this._hideActiveCommentPreview(),this._updateHighlight(e)}hideHighlight(){this._externalHighlightTarget=void 0,!this._commentTarget&&(this._updateHighlight(void 0),this._unmountWhenIdle())}comment(e,t){this._externalHighlightTarget=void 0,this._selectionActive&&this.stop(),this.start({mode:z});const n=e.getBoundingClientRect();this._showCommentComposer(e,t??{x:n.left+n.width/2,y:n.top+n.height/2})}updateComments(e){if(e.comments){const t=new Map(e.comments.map((n,o)=>[n.elementId,{body:n.body,ordinal:o+1}]));for(const[n,o]of this._comments){const s=t.get(n);if(!s)this._clearCommentPreview(o.target),o.pin.remove(),this._comments.delete(n);else{if(o.ordinal=s.ordinal,s.body===o.body)continue;o.body=s.body,this._commentPreviewElementId===n&&(this._setCommentPreviewBody(s.body),this._renderHighlight(o.target))}}for(const[n,o]of t){if(this._comments.has(n))continue;const s=this._pendingComments.get(n);s&&this._createCommentPin(n,s.target,s.anchor,o.body,o.ordinal)}}for(const t of e.pendingCommentIdsToDiscard??[])this._pendingComments.delete(t);this._updateCommentPinNumbers(),this._unmountWhenIdle()}_onScrollOrResize(){this._commentPreviewCollapsing&&this._hideActiveCommentPreview(),this._cancelCommentPreviewAnimations(),this._highlightTarget&&this._renderHighlight(this._highlightTarget),this._commentBackdropTarget&&this._layoutCommentBackdrop(this._commentBackdropTarget);for(const e of this._comments.values())this._layoutCommentPin(e)}_getFocusedElement(){if(!document.hasFocus())return;let e=document.activeElement;for(;e?.shadowRoot?.activeElement;)e=e.shadowRoot.activeElement;if(!(!e||e===document.body||e===document.documentElement||e===this._shadowHost||e instanceof HTMLIFrameElement))return e}_pickElementAt(e,t){const n=document.elementsFromPoint(e,t);for(const o of n)if(!(o===this._shadowHost||this._shadowHost.contains(o)))return o}_pickRegionAncestor(e){const{x:t,y:n,width:o,height:s}=e,r=t+o,a=n+s,m=t+o/2,d=n+s/2,c=[];for(const[p,u]of[[t,n],[r,n],[t,a],[r,a],[m,n],[m,a],[t,d],[r,d],[m,d]]){const i=this._pickElementAt(p,u);i&&c.push(i)}return N(c)}_renderHighlight(e){const t=this._highlight,n=this._label,o=e.getBoundingClientRect(),s=window.scrollX||0,r=window.scrollY||0,a=window.innerHeight,m=document.documentElement.clientWidth,d=this._getVisibleTargetBounds(o),c=22;t.style.display="block",t.style.left=`${o.left+s}px`,t.style.top=`${o.top+r}px`,t.style.width=`${o.width}px`,t.style.height=`${o.height}px`,this._highlightShape.style.display="block",this._highlightShape.setAttribute("x",`${d.x}`),this._highlightShape.setAttribute("y",`${d.y}`),this._highlightShape.setAttribute("width",`${d.width}`),this._highlightShape.setAttribute("height",`${d.height}`),this._highlightShape.setAttribute("rx","2");const p=String(e.tagName||"").toLowerCase(),u=e.id?`#${e.id}`:"",i=e.classList.length?"."+[...e.classList].join("."):"";this._labelSelector.textContent=p+u,this._labelClasses.textContent=i,this._labelDims.textContent=`${Math.round(o.width)} \xD7 ${Math.round(o.height)}`,n.style.display="inline-flex";const l=o.top-c,h=Math.max(0,Math.min(a-c,l));n.style.left="0";const g=n.offsetWidth,w=o.left,k=Math.max(0,Math.min(w,m-g));n.style.left=`${k}px`,n.style.top=`${h}px`;let E=!1;for(const y of[this._commentPreview,this._commentComposer])y.style.display!=="none"&&(E=this._layoutCommentSurface(y,d,m,a)==="above"||E);E&&(n.style.top=`${Math.max(0,Math.min(a-c,d.bottom+2))}px`)}_getVisibleTargetBounds(e){const t=Math.max(0,Math.min(e.left,window.innerWidth)),n=Math.max(t,Math.min(e.right,window.innerWidth)),o=Math.max(0,Math.min(e.top,window.innerHeight)),s=Math.max(o,Math.min(e.bottom,window.innerHeight));return new DOMRect(t,o,n-t,s-o)}_layoutCommentSurface(e,t,n,o){if(e===this._commentPreview){const i=Math.min(320,n-16),l=Math.min(Math.max(320,t.width),i);e.style.width="max-content",e.style.minWidth="0",e.style.maxWidth=`${l}px`}const s=e.offsetHeight,r=t.bottom,a=r+s<=o-8?"below":"above",m=r+s<=o-8?r:Math.max(0,t.top-s),d=e.offsetWidth,c=t.left+d<=n,p=c?"left":"right",u=c?Math.max(0,t.left):Math.max(0,t.right-d);return e.dataset.attachmentCorner=`${a==="below"?"top":"bottom"}-${p}`,e.style.left=`${u}px`,e.style.top=`${m}px`,a}_updateHighlight(e){if(this._highlightTarget=e,!e){this._highlight.style.display="none",this._highlightShape.style.display="none",this._label.style.display="none",this._commentPreview.style.display="none";return}this._renderHighlight(e)}_commit(e,t){if(this._selectionActive){if(this._commentMode){const n=e.getBoundingClientRect();this._showCommentComposer(e,t??{x:n.left+n.width/2,y:n.top+n.height/2});return}requestAnimationFrame(()=>{this._continuous?this._updateHighlight(void 0):this.stop(),this._onPicked(e)})}}_showCommentComposer(e,t){this._externalHighlightTarget=void 0,this._hideActiveCommentPreview(),this._commentTarget=e,this._commentAnchor={x:t.x+window.scrollX,y:t.y+window.scrollY},this._updateHighlight(e),this._showCommentBackdrop(e),this._commentLayer.classList.add("composing"),this._commentInput.value="",this._commentComposer.style.display="flex",this._layoutCommentComposer(),this._layoutCommentInput(),this._animateCommentHighlight(new DOMRect(t.x-3,t.y-3,6,6),e,[this._label,this._commentComposer]),this._commentInput.focus({preventScroll:!0}),requestAnimationFrame(()=>{this._commentTarget===e&&this._commentInput.focus({preventScroll:!0})})}_closeCommentComposer(){this._commentTarget=void 0,this._commentAnchor=void 0,this._hideCommentBackdrop(),this._commentLayer.classList.remove("composing"),this._commentComposer.style.display="none",this._commentInput.value="",this._cancelCommentPreviewAnimations(),this._updateHighlight(void 0)}_finishCommentInteraction(){this._continuous?this._closeCommentComposer():this.stop()}_submitComment(){const e=this._commentTarget,t=this._commentAnchor;if(!e||!t)return;const n=this._commentInput.value.replace(/\r?\n/g," "),o=this._onPicked(e,n);this._pendingComments.set(o,{target:e,anchor:t,body:n}),this._finishCommentInteraction(),this._focusCommentTarget(e)}_focusCommentTarget(e){if(!e.isConnected||!(e instanceof HTMLElement||e instanceof SVGElement))return;const t=e.hasAttribute("tabindex");t||(e.tabIndex=-1),e.focus({preventScroll:!0}),t||e.removeAttribute("tabindex")}_createCommentPin(e,t,n,o,s){this._ensureMounted();const r=this._comments.get(e);r&&this._clearCommentPreview(r.target),r?.pin.remove(),this._pendingComments.delete(e);const a=t.getBoundingClientRect(),m={x:n.x-(a.left+window.scrollX),y:n.y-(a.top+window.scrollY)},d=document.createElement("div");d.className="comment-pin",d.tabIndex=0,d.setAttribute("role","note");const c=document.createElement("span");c.className="comment-pin-bubble";const p=document.createElement("span");p.className="comment-pin-number",c.appendChild(p),d.appendChild(c);const u=()=>{this._commentTarget||this._externalHighlightTarget||this._showCommentPreview(e,t,o)};d.addEventListener("mouseenter",u),d.addEventListener("mouseleave",()=>this._scheduleCommentPreviewHide()),d.addEventListener("focusin",u),d.addEventListener("focusout",()=>this._scheduleCommentPreviewHide()),this._commentLayer.appendChild(d);const i={target:t,pin:d,numberElement:p,body:o,ordinal:s,offset:m};this._comments.set(e,i),this._updateCommentPinNumbers(),this._layoutCommentPin(i)}_updateCommentPinNumbers(){for(const e of this._comments.values()){const t=String(e.ordinal);e.numberElement.textContent=t,e.pin.title=e.body||this._formatLocalizedString(v.elementComment,t),e.pin.setAttribute("aria-label",e.body?this._formatLocalizedString(v.elementCommentWithBody,t,e.body):this._formatLocalizedString(v.emptyElementComment,t))}}_applyLocalizedStrings(){this._commentPreviewRemoveButton.title=v.removeComment,this._commentPreviewRemoveButton.setAttribute("aria-label",v.removeElementComment),this._commentComposer.setAttribute("aria-label",v.commentOnSelectedElement),this._commentInput.placeholder=v.addCommentPlaceholder,this._commentInput.setAttribute("aria-label",v.commentOnSelectedElement),this._commentSendButton.title=v.addComment,this._commentSendButton.setAttribute("aria-label",v.addComment),this._updateCommentPinNumbers()}_formatLocalizedString(e,...t){return e.replace(/\{(\d+)\}/g,(n,o)=>t[Number(o)]??"")}_layoutCommentPin(e){const t=e.target.getBoundingClientRect(),n=t.left+window.scrollX+e.offset.x,o=t.top+window.scrollY+e.offset.y,s=document.scrollingElement??document.documentElement,r=e.pin.offsetWidth/2,a=e.pin.offsetHeight/2,m=Math.max(r,Math.min(n,s.scrollWidth-r)),d=Math.max(a,Math.min(o,s.scrollHeight-a));e.pin.style.left=`${m}px`,e.pin.style.top=`${d}px`}_showCommentPreview(e,t,n){if(this._commentPreviewCollapsing)return;if(this._commentPreviewElementId===e){this._cancelCommentPreviewHide();return}this._hideActiveCommentPreview(),this._commentPreviewElementId=e;const o=this._comments.get(e),s=o?this._getCommentPinPointBounds(o.pin):void 0;o&&(o.pin.classList.add("previewing"),o.pin.after(this._commentPreview));const r=o?.body??n;this._setCommentPreviewBody(r),this._shadowHost.classList.add("comment-preview-active"),this._updateHighlight(t),this._showCommentBackdrop(t),s&&this._animateCommentHighlight(s,t,[this._label,this._commentPreview])}_setCommentPreviewBody(e){this._commentPreviewBody.textContent=e,this._commentPreview.title=e,this._commentPreview.classList.toggle("empty",!e),this._commentPreview.style.display="flex"}_getCommentPinPointBounds(e){const t=e.getBoundingClientRect();return new DOMRect(t.left+8,t.top+8,6,6)}_animateCommentHighlight(e,t,n,o=!1){if(this._reducedMotion)return;const s=this._getVisibleTargetBounds(t.getBoundingClientRect()),r=180,a="cubic-bezier(0.2, 0, 0, 1)",m={x:`${e.left}px`,y:`${e.top}px`,width:`${e.width}px`,height:`${e.height}px`,rx:`${e.width/2}px`},d={x:`${s.left}px`,y:`${s.top}px`,width:`${s.width}px`,height:`${s.height}px`,rx:"2px"},c=this._highlightShape.animate(o?[d,m]:[m,d],{duration:r,easing:a,fill:"forwards"});this._commentPreviewAnimations.push(c),this._commentPreviewAnimations.push(this._commentBackdropCutout.animate(o?[d,m]:[m,d],{duration:r,easing:a,fill:"forwards"}));for(const p of n){if(p.style.display==="none")continue;const u={opacity:0,transform:"translateY(-4px)"},i=o?[{opacity:1,transform:"translateY(0)"},{...u,offset:.55},u]:[u,{...u,offset:.45},{opacity:1,transform:"translateY(0)"}];this._commentPreviewAnimations.push(p.animate(i,{duration:r,easing:a,fill:"forwards"}))}return c}_scheduleCommentPreviewHide(){this._cancelCommentPreviewHide(),this._commentPreviewHideTimeout=window.setTimeout(()=>{this._commentPreviewHideTimeout=void 0,!((this._commentPreviewElementId?this._comments.get(this._commentPreviewElementId):void 0)?.pin.matches(":hover, :focus-within")||this._highlight.matches(":hover, :focus-within")||this._label.matches(":hover, :focus-within")||this._commentPreview.matches(":hover, :focus-within")||this._commentPreviewRemoveButton.matches(":hover, :focus-within"))&&this._collapseActiveCommentPreview()},80)}_cancelCommentPreviewHide(){this._commentPreviewHideTimeout!==void 0&&(window.clearTimeout(this._commentPreviewHideTimeout),this._commentPreviewHideTimeout=void 0)}_collapseActiveCommentPreview(){const e=this._commentPreviewElementId,t=e?this._comments.get(e):void 0;if(!e||!t||this._reducedMotion){this._hideActiveCommentPreview();return}this._commentPreviewCollapsing=!0,this._shadowHost.classList.add("comment-preview-collapsing"),this._fadeOutCommentBackdrop();let n=this._commentPreviewAnimations[0];if(n)for(const o of this._commentPreviewAnimations)o.reverse();else n=this._animateCommentHighlight(this._getCommentPinPointBounds(t.pin),t.target,[this._label,this._commentPreview],!0);if(!n){this._hideActiveCommentPreview();return}n.onfinish=()=>{this._commentPreviewCollapsing&&this._commentPreviewElementId===e&&(this._commentPreviewCollapsing=!1,this._hideActiveCommentPreview())}}_cancelCommentPreviewAnimations(){for(const e of this._commentPreviewAnimations)e.cancel();this._commentPreviewAnimations=[]}_hideActiveCommentPreview(){this._cancelCommentPreviewHide(),this._commentPreviewCollapsing=!1,this._shadowHost.classList.remove("comment-preview-collapsing"),this._cancelCommentPreviewAnimations(),this._commentPreviewElementId&&this._comments.get(this._commentPreviewElementId)?.pin.classList.remove("previewing"),this._commentPreviewElementId=void 0,this._shadowHost.classList.remove("comment-preview-active"),this._commentPreview.style.display="none",this._hideCommentBackdrop(),this._commentTarget||this._updateHighlight(this._externalHighlightTarget)}_removeComment(e){const t=this._comments.get(e);t&&(this._hideActiveCommentPreview(),t.pin.remove(),this._comments.delete(e),this._updateCommentPinNumbers(),this._unmountWhenIdle(),this._onCommentRemoved(e))}_layoutCommentInput(){this._commentInput.style.height="auto",this._commentInput.style.height=`${Math.min(this._commentInput.scrollHeight,96)}px`,this._layoutCommentComposer()}_layoutCommentBackdrop(e){const t=this._getVisibleTargetBounds(e.getBoundingClientRect());this._commentBackdropCutout.setAttribute("x",`${t.x}`),this._commentBackdropCutout.setAttribute("y",`${t.y}`),this._commentBackdropCutout.setAttribute("width",`${t.width}`),this._commentBackdropCutout.setAttribute("height",`${t.height}`),this._commentBackdropCutout.setAttribute("rx","2")}_showCommentBackdrop(e){const t=++this._commentBackdropRequest;this._commentBackdropTarget=e,this._layoutCommentBackdrop(e),this._commentBackdrop.classList.remove("visible"),requestAnimationFrame(()=>{this._commentBackdropRequest===t&&this._commentBackdrop.classList.add("visible")})}_hideCommentBackdrop(){this._commentBackdropRequest++,this._commentBackdropTarget=void 0,this._commentBackdrop.classList.remove("visible")}_fadeOutCommentBackdrop(){this._commentBackdropRequest++,this._commentBackdrop.classList.remove("visible")}_clearCommentPreview(e){this._commentTarget||this._commentBackdropTarget!==e||this._hideActiveCommentPreview()}_layoutCommentComposer(){this._commentTarget&&this._renderHighlight(this._commentTarget)}_ensureMounted(){this._shadowHost.parentNode||document.documentElement.appendChild(this._shadowHost)}_unmountWhenIdle(){!this._selectionActive&&!this._highlightTarget&&this._comments.size===0&&this._shadowHost.remove()}static _buildStyle(){const e=document.createElement("style");return e.textContent=`
			:host {
				all: initial;
				font-family: var(--pick-font, system-ui, -apple-system, sans-serif);
				pointer-events: none !important;
			}
			.highlight {
				position: absolute; box-sizing: border-box;
				z-index: 2;
			}
			.comment-backdrop {
				position: fixed;
				inset: 0;
				width: 100%;
				height: 100%;
				pointer-events: none;
				z-index: 2;
			}
			.comment-backdrop-fill {
				fill: var(--vscode-widget-shadow, transparent);
				opacity: 0;
				transition: opacity 120ms linear;
			}
			.comment-backdrop.visible .comment-backdrop-fill {
				opacity: 1;
			}
			.highlight-shape {
				fill: color-mix(in srgb, var(--vscode-focusBorder, #0078d4) 12%, transparent);
				stroke: var(--vscode-focusBorder, #0078d4);
				stroke-width: 2px;
			}
			.overlay {
				position: fixed; inset: 0;
				background: transparent; box-sizing: border-box;
				z-index: 1;
			}
			.comment-layer {
				position: absolute; inset: 0; pointer-events: none;
			}
			.comment-surface {
				position: fixed;
				box-sizing: border-box;
				width: min(320px, calc(100vw - 16px));
				border: var(--vscode-strokeThickness, 1px) solid var(--vscode-editorWidget-border, var(--vscode-contrastBorder, #454545));
				border-radius: var(--vscode-cornerRadius-large, 8px);
				background: var(--vscode-editorWidget-background, #252526);
				color: var(--vscode-editorWidget-foreground, #cccccc);
				box-shadow: 0 2px 6px var(--vscode-widget-shadow, transparent);
				font-size: 13px;
				font-weight: 400;
				z-index: 3;
			}
			.comment-surface[data-attachment-corner='top-left'] {
				border-top-left-radius: 0;
			}
			.comment-surface[data-attachment-corner='top-right'] {
				border-top-right-radius: 0;
			}
			.comment-surface[data-attachment-corner='bottom-left'] {
				border-bottom-left-radius: 0;
			}
			.comment-surface[data-attachment-corner='bottom-right'] {
				border-bottom-right-radius: 0;
			}
			.comment-preview {
				align-items: flex-start;
				gap: 8px;
				max-height: 96px;
				padding: 6px 8px;
				overflow: hidden;
				line-height: 20px;
				pointer-events: none;
			}
			.comment-preview.empty {
				gap: 0;
				padding: 4px;
			}
			.comment-preview.empty .comment-preview-body {
				display: none;
			}
			.comment-preview.empty .comment-preview-remove {
				margin-block: 0;
			}
			.comment-preview-body {
				flex: 1;
				min-width: 0;
				max-height: 82px;
				overflow-x: hidden;
				overflow-y: auto;
				overflow-wrap: anywhere;
				scrollbar-width: thin;
				white-space: pre-wrap;
			}
			:host(.comment-preview-active) .highlight,
			:host(.comment-preview-active) .label,
			:host(.comment-preview-active) .comment-preview {
				pointer-events: auto;
			}
			:host(.comment-preview-collapsing) .highlight,
			:host(.comment-preview-collapsing) .label,
			:host(.comment-preview-collapsing) .comment-preview {
				pointer-events: none;
			}
			.comment-preview-remove {
				flex: none;
				display: grid;
				place-items: center;
				box-sizing: border-box;
				width: 24px;
				height: 24px;
				margin-block: -2px;
				padding: 0;
				border: 0;
				border-radius: var(--vscode-cornerRadius-small, 4px);
				background: transparent;
				color: var(--vscode-editorWidget-foreground, inherit);
				cursor: pointer;
				font-family: inherit;
			}
			.comment-preview-remove svg {
				display: block;
				width: var(--vscode-codiconFontSize, 16px);
				height: var(--vscode-codiconFontSize, 16px);
			}
			.comment-preview-remove:hover {
				background: var(--vscode-toolbar-hoverBackground, transparent);
			}
			.comment-composer {
				align-items: flex-end; gap: 6px; padding: 6px;
				pointer-events: auto;
				z-index: 4;
			}
			.comment-input {
				flex: 1; min-width: 0; resize: none; overflow: auto;
				scrollbar-width: none;
				box-sizing: border-box; margin: 0; padding: 2px 6px;
				background: transparent; color: inherit;
				border: var(--vscode-strokeThickness, 1px) solid var(--vscode-editorWidget-border, var(--vscode-contrastBorder, #454545));
				border-radius: var(--vscode-cornerRadius-small, 4px);
				outline: 0;
				font: inherit;
				line-height: 20px;
				caret-color: var(--vscode-focusBorder, currentColor);
			}
			.comment-input::-webkit-scrollbar {
				display: none;
			}
			.comment-input::placeholder {
				color: var(--vscode-input-placeholderForeground, var(--vscode-descriptionForeground, #ccccccb3));
				opacity: 1;
			}
			.comment-send {
				box-sizing: border-box; border: 0; cursor: pointer; font-family: inherit;
			}
			.comment-send {
				flex: none; width: 24px; height: 24px; padding: 0;
				border-radius: var(--vscode-cornerRadius-small, 4px);
				background: transparent;
				color: var(--vscode-editorWidget-foreground, #cccccc);
				display: grid;
				place-items: center;
			}
			.comment-send svg {
				display: block;
				width: var(--vscode-codiconFontSize, 16px);
				height: var(--vscode-codiconFontSize, 16px);
			}
			.comment-send:hover {
				background: var(--vscode-toolbar-hoverBackground, transparent);
			}
			.comment-pin {
				position: absolute;
				display: grid;
				place-items: center;
				width: 22px;
				height: 22px;
				transform: translate(-11px, -11px);
				pointer-events: auto;
				z-index: 4;
			}
			.comment-layer.composing .comment-pin {
				pointer-events: none;
				z-index: auto;
			}
			.comment-pin:hover, .comment-pin:focus-within {
				z-index: 5;
			}
			.comment-pin.previewing:not(:focus-within) .comment-pin-bubble {
				visibility: hidden;
			}
			.comment-pin-bubble {
				box-sizing: border-box;
				display: grid;
				place-items: center;
				width: 22px;
				height: 22px;
				padding: 0;
				border: var(--vscode-strokeThickness, 1px) solid var(--vscode-editorWidget-background, #252526);
				border-radius: var(--vscode-cornerRadius-circle, 9999px);
				background: var(--vscode-button-background, #0078d4);
				color: var(--vscode-button-foreground, white);
				box-shadow: 0 2px 6px var(--vscode-widget-shadow, transparent);
			}
			.comment-pin-number {
				display: block;
				width: 100%;
				font-size: 11px;
				font-weight: 600;
				line-height: 12px;
				text-align: center;
			}
			.comment-send:focus-visible, .comment-preview-remove:focus-visible, .comment-pin:focus-visible, .comment-input:focus-visible {
				outline: 2px solid var(--vscode-focusBorder, #0078d4);
				outline-offset: 2px;
			}
			:host(.reduce-motion) .comment-backdrop-fill {
				transition: none;
			}
			.label {
				position: fixed; box-sizing: border-box;
				display: inline-flex; align-items: center; gap: 6px; height: 20px; padding: 0 6px;
				max-width: min(100%, 320px);
				background: var(--vscode-button-background, #0078d4);
				color: var(--vscode-button-foreground, white);
				font-family: inherit;
				font-size: 11px; line-height: 20px;
				white-space: nowrap;
				border-radius: 2px;
				box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
				z-index: 3;
			}
			.label-info {
				display: inline-block; overflow: hidden; text-overflow: ellipsis; min-width: 0;
			}
			.label-selector {
				font-weight: 600;
			}
			.label-dims {
				flex-shrink: 0; opacity: 0.8;
			}
			.dragbox {
				position: fixed; box-sizing: border-box;
				border: 1px dotted var(--vscode-focusBorder, #a0aabe);
				background: transparent;
				z-index: 2;
			}
		`,e}static _applyTheme(e,t){e.style.setProperty("--vscode-focusBorder",t?.focusBorder??null),e.style.setProperty("--vscode-button-background",t?.buttonBackground??null),e.style.setProperty("--vscode-button-foreground",t?.buttonForeground??null),e.style.setProperty("--vscode-editorWidget-background",t?.widgetBackground??null),e.style.setProperty("--vscode-editorWidget-foreground",t?.widgetForeground??null),e.style.setProperty("--vscode-editorWidget-border",t?.widgetBorder??null),e.style.setProperty("--vscode-widget-shadow",t?.widgetShadow??null),e.style.setProperty("--vscode-contrastBorder",t?.contrastBorder??null),e.style.setProperty("--vscode-descriptionForeground",t?.descriptionForeground??null),e.style.setProperty("--vscode-input-placeholderForeground",t?.inputPlaceholderForeground??null),e.style.setProperty("--vscode-toolbar-hoverBackground",t?.toolbarHoverBackground??null),e.style.setProperty("--pick-font",t?.font??null)}}class S{constructor(e,t){this._onPicked=e;this._onStopped=t;this._selectionActive=!1;this._onPointerDown=e=>{!this._selectionActive||e.button!==0||(this._dragStart={x:e.clientX,y:e.clientY},this._dragbox.style.display="block",this._dragbox.style.left=`${e.clientX}px`,this._dragbox.style.top=`${e.clientY}px`,this._dragbox.style.width="0px",this._dragbox.style.height="0px",e.preventDefault(),e.stopPropagation())};this._onPointerMove=e=>{if(!this._selectionActive||!this._dragStart)return;e.preventDefault(),e.stopPropagation();const t=Math.min(this._dragStart.x,e.clientX),n=Math.min(this._dragStart.y,e.clientY),o=Math.abs(e.clientX-this._dragStart.x),s=Math.abs(e.clientY-this._dragStart.y);this._dragbox.style.left=`${t}px`,this._dragbox.style.top=`${n}px`,this._dragbox.style.width=`${o}px`,this._dragbox.style.height=`${s}px`};this._onPointerUp=e=>{if(!this._selectionActive||!this._dragStart)return;const t=this._dragStart,n=Math.min(t.x,e.clientX),o=Math.min(t.y,e.clientY),s=Math.abs(e.clientX-t.x),r=Math.abs(e.clientY-t.y);if(this._teardown(),e.preventDefault(),e.stopPropagation(),s<S._MIN_AREA_PX||r<S._MIN_AREA_PX){this._onStopped();return}const a=window.visualViewport,m=a?.offsetLeft??0,d=a?.offsetTop??0,c={x:n-m,y:o-d,width:s,height:r};this._onPicked(c)};this._onClick=e=>{this._selectionActive&&(e.preventDefault(),e.stopPropagation())};this._onKeyDown=e=>{this._selectionActive&&e.key==="Escape"&&(this.stop(),e.preventDefault(),e.stopPropagation())};const n=document.createElement("div");n.setAttribute("data-vscode-area-pick-host",""),n.style.cssText="position: absolute; top: 0; left: 0; width: 0; height: 0; z-index: 2147483647; pointer-events: none;";const o=n.attachShadow({mode:"closed"});o.appendChild(S._buildStyle()),this._shadowHost=n;const s=document.createElement("div");s.className="overlay",o.appendChild(s);const r=document.createElement("div");r.className="dragbox",r.style.display="none",o.appendChild(r),this._dragbox=r}static{this._MIN_AREA_PX=4}static{this._CURSOR_CROSSHAIR="/* VS Code injected style */ * { cursor: crosshair !important; }"}start(){if(this._selectionActive)return;this._dragStart=void 0,document.documentElement.appendChild(this._shadowHost),this._selectionActive=!0;const e=document.createElement("style");e.setAttribute("data-vscode-area-pick-cursor",""),e.textContent=S._CURSOR_CROSSHAIR,document.head.appendChild(e),this._cursorStylesheet=e,window.addEventListener("pointermove",this._onPointerMove,!0),window.addEventListener("pointerdown",this._onPointerDown,!0),window.addEventListener("pointerup",this._onPointerUp,!0),window.addEventListener("click",this._onClick,!0),window.addEventListener("contextmenu",this._onClick,!0),window.addEventListener("keydown",this._onKeyDown,!0)}stop(){this._selectionActive&&(this._teardown(),this._onStopped())}_teardown(){this._selectionActive=!1,this._shadowHost.remove(),this._cursorStylesheet?.remove(),this._cursorStylesheet=void 0,window.removeEventListener("pointermove",this._onPointerMove,!0),window.removeEventListener("pointerdown",this._onPointerDown,!0),window.removeEventListener("pointerup",this._onPointerUp,!0),window.removeEventListener("click",this._onClick,!0),window.removeEventListener("contextmenu",this._onClick,!0),window.removeEventListener("keydown",this._onKeyDown,!0),this._dragbox.style.display="none",this._dragbox.style.left="0px",this._dragbox.style.top="0px",this._dragbox.style.width="0px",this._dragbox.style.height="0px",this._dragStart=void 0}setTheme(e){this._shadowHost.style.setProperty("--vscode-focusBorder",e?.focusBorder??null)}static _buildStyle(){const e=document.createElement("style");return e.textContent=`
			:host {
				all: initial;
				pointer-events: none !important;
			}
			.overlay {
				position: fixed; inset: 0;
				background: transparent;
				z-index: 1;
				/* Capture hit-testing so pointer events don't reach the underlying
				 * page during a pick \u2014 otherwise hover/:hover styles would
				 * fire on elements beneath the cursor while we're dragging. */
				pointer-events: auto;
			}
			.dragbox {
				position: fixed; box-sizing: border-box;
				border: 1px dashed var(--vscode-focusBorder, #0078d4);
				background: color-mix(in srgb, var(--vscode-focusBorder, #0078d4) 12%, transparent);
				z-index: 2;
				pointer-events: auto;
			}
		`,e}}O();
//# sourceMappingURL=preload-browserView.js.map
