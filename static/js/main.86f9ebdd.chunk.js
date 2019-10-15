(window["webpackJsonpcontinuum-client"]=window["webpackJsonpcontinuum-client"]||[]).push([[0],{111:function(e,t){},114:function(e,t,n){"use strict";n.r(t);var r=n(15),a=n.n(r),c=n(25),i=n(0),o=n.n(i),s=n(23),l=n.n(s),u=n(4),h=n(3),p=n(2),f=n(5),m=n(16),b=n(1),y=n.n(b);var v=function(e){var t=y.a.Frequency(e,"midi"),n=t.toNote();return{name:n,frequency:t.toFrequency(),color:n.includes("#")?"black":"white",midi:e}},g=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],d=n(39),O=n(9),j=n.n(O),E=[].concat(Object(m.a)(Object(d.a)("B3 minor").notes),Object(m.a)(Object(d.a)("B4 minor").notes)).map(function(e){var t=y.a.Frequency(e,"note");return{name:e,frequency:t.toFrequency(),color:e.includes("#")?"black":"white",midi:t.toMidi()}}),w=function(){return{initialState:Object(O.range)(14).map(function(e){return Object(O.range)(16).map(function(){return{active:!1,note:E[e],keyIndex:e}})}),reducers:{setCompositionCell:function(e,t){var n=t.payload,r=n.row,a=n.col,c=n.active;e.composition[r][a].active=c},toggleCompositionCell:function(e,t){var n=t.payload,r=n.row,a=n.col;e.composition[r][a].active=!e.composition[r][a].active},transpose:function(e,t){var n=t.payload.semitones;e.composition=e.composition.map(function(e){return e.map(function(e){return v(e.midi+n)})})}}}};function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var C=w(),S=Object(f.b)({slice:"synth1",initialState:{amp:{attack:0,decay:.5,sustain:1,release:.2},filter:{attack:0,decay:.5,sustain:1,release:.2,base:0,range:.5,q:0},composition:C.initialState},reducers:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(n,!0).forEach(function(t){Object(h.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({setAmp:function(e,t){for(var n=0,r=Object.entries(t.payload);n<r.length;n++){var a=r[n],c=Object(u.a)(a,2),i=c[0],o=c[1];e.amp[i]=o}},setFilter:function(e,t){for(var n=0,r=Object.entries(t.payload);n<r.length;n++){var a=r[n],c=Object(u.a)(a,2),i=c[0],o=c[1];e.filter[i]=o}}},C.reducers)}),F=S.actions,P=F.setAmp,D=F.setFilter,q=(F.setCompositionCell,F.toggleCompositionCell),R=S.reducer,A=n(8),x=function(e){var t=e.strokeWidth,n=Object(A.useCircularInputContext)(),r=n.getPointFromValue,a=n.center,c=r(),s=c.x,l=c.y,u=Object(i.useRef)(null);return Object(A.useCircularDrag)(u),o.a.createElement("g",null,o.a.createElement("line",{x1:a.x,y1:a.y,x2:s,y2:l,stroke:"black",strokeWidth:t}),o.a.createElement("circle",{ref:u,cx:s,cy:l,r:20,stroke:"white",opacity:0}))},N=Object(i.memo)(function(e){var t=e.value,n=e.onChange,r=e.children,a=e.disabled,c=Object(i.useCallback)(Object(O.throttle)(function(e){n(e)},100),[n]);return o.a.createElement("div",{className:"knob"},o.a.createElement("div",null,o.a.createElement(A.CircularInput,{radius:21,value:t,onChange:a?function(){}:c},o.a.createElement(A.CircularTrack,{stroke:"lightgray",strokeWidth:1,strokeLinecap:"square"}),o.a.createElement(A.CircularProgress,{stroke:"black",strokeWidth:2,strokeLinecap:"square"}),o.a.createElement(x,{strokeWidth:2}))),o.a.createElement("div",{style:{zIndex:-1}},r))}),L={setAmp:P,setFilter:D},T=function(e,t){return Object(i.useCallback)(function(n){return e(Object(h.a)({},t,n))},[e,t])};Object(p.b)(function(e){return{amp:e.synth1.amp,filter:e.synth1.filter}},L)(function(e){var t=e.setAmp,n=e.setFilter,r=e.amp,a=e.filter;return o.a.createElement(o.a.Fragment,null,o.a.createElement("h2",null,"Synth 1"),o.a.createElement("div",{className:"synth-1 synth"},o.a.createElement("section",{id:"amp-env"},o.a.createElement("div",{className:"knob-row knob-row-vertical"},o.a.createElement("h4",null,"Amp"),o.a.createElement(N,{value:r.attack,onChange:T(t,"attack")},"Attack"),o.a.createElement(N,{value:r.decay,onChange:T(t,"decay")},"Decay"),o.a.createElement(N,{value:r.sustain,onChange:T(t,"sustain")},"Sustain"),o.a.createElement(N,{value:r.release,onChange:T(t,"release")},"Release"))),o.a.createElement("section",{id:"filter-env"},o.a.createElement("div",{className:"knob-row knob-row-vertical"},o.a.createElement("h4",null,"Filter"),o.a.createElement(N,{value:a.attack,onChange:T(n,"attack")},"Attack"),o.a.createElement(N,{value:a.decay,onChange:T(n,"decay")},"Decay"),o.a.createElement(N,{value:a.sustain,onChange:T(n,"sustain")},"Sustain"),o.a.createElement(N,{value:a.release,onChange:T(n,"release")},"Release")),o.a.createElement("div",{className:"knob-row knob-row-vertical"},o.a.createElement(N,{value:a.base,onChange:T(n,"base")},"Base"),o.a.createElement(N,{value:a.range,onChange:T(n,"range")},"Range"),o.a.createElement(N,{value:a.q,onChange:T(n,"q")},"Q")))))});function _(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var M=w(),Q=Object(f.b)({slice:"bass",initialState:{length:.07,shape:0,filter:{decay:.5,range:.3769,q:.1},composition:M.initialState},reducers:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_(n,!0).forEach(function(t){Object(h.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},M.reducers,{setLength:function(e,t){e.length=t.payload},setShape:function(e,t){e.shape=t.payload},setFilterDecay:function(e,t){e.filter.decay=t.payload},setFilterRange:function(e,t){e.filter.range=t.payload},setFilterQ:function(e,t){e.filter.q=t.payload}})}),B=Q.actions,V=B.setCompositionCell,I=B.toggleCompositionCell,W=B.setLength,z=B.setShape,G=B.setFilterDecay,H=B.setFilterRange,J=B.setFilterQ,Y=Q.reducer,K={setCompositionCell:V,setLength:W,setShape:z,setFilterDecay:G,setFilterRange:H,setFilterQ:J},U=Object(p.b)(function(e){return{length:e.bass.length,shape:e.bass.shape,filterDecay:e.bass.filter.decay,filterRange:e.bass.filter.range,filterQ:e.bass.filter.q,currentCharacter:e.character.character}},K)(function(e){var t=e.setLength,n=e.setShape,r=e.setFilterDecay,a=e.setFilterRange,c=e.setFilterQ,i=e.length,s=e.shape,l=e.filterDecay,u=e.filterRange,h=e.filterQ,p="bass"!==e.currentCharacter;return o.a.createElement("div",{className:"bass-synth synth ".concat(p?"":"current"," ")},o.a.createElement("h2",null,"Bass"),o.a.createElement("div",{className:"knob-row"},o.a.createElement(N,{disabled:p,value:i,onChange:t},"Length"),o.a.createElement(N,{disabled:p,value:s,onChange:n},"Shape"),o.a.createElement(N,{disabled:p,value:l,onChange:r},"Decay"),o.a.createElement(N,{disabled:p,value:u,onChange:a},"Brightness"),o.a.createElement(N,{disabled:p,value:h,onChange:c},"Harshness")))});function X(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var Z=w(),$=Object(f.b)({slice:"lenny",initialState:{reverb:0,length:.25,phaser:!1,vibratoDepth:.1,composition:Z.initialState},reducers:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?X(n,!0).forEach(function(t){Object(h.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):X(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},Z.reducers,{setReverb:function(e,t){e.reverb=t.payload},setLength:function(e,t){e.length=t.payload},setPhaser:function(e,t){e.phaser=t.payload},setVibratoDepth:function(e,t){e.vibratoDepth=t.payload}})}),ee=$.actions,te=(ee.setCompositionCell,ee.toggleCompositionCell),ne=ee.setReverb,re=ee.setLength,ae=ee.setPhaser,ce=ee.setVibratoDepth,ie=$.reducer,oe=(n(47),{synth1:q,bass:I,lenny:te}),se=Object(i.memo)(function(e){var t=e.row,n=e.col,r=e.playing,a=Object(p.c)(),c=Object(p.d)(function(e){return e.character.character}),s=Object(i.useCallback)(function(e){e.stopPropagation(),Boolean(oe[c])&&a(oe[c]({row:t,col:n}))},[t,n,c,a]),l={synth1:Object(p.d)(function(e){return e.synth1.composition[t][n]}),bass:Object(p.d)(function(e){return e.bass.composition[t][n]}),lenny:Object(p.d)(function(e){return e.lenny.composition[t][n]})},u=c in l?"piano-cell clickable":"piano-cell";return o.a.createElement("span",{className:u,onClick:s},j.a.map(l,function(e,t){if(e.active){var n="cell-trigger "+"cell-trigger-".concat(t," ")+"".concat(r?"playing":""," ")+"".concat(c===t?"current":""," ");return o.a.createElement("span",{key:t,onClick:s,className:n})}}))}),le=(n(48),function(e){var t=e.currentStep,n=Object(p.d)(function(e){return e.character.character});return o.a.createElement("div",{className:"piano-roll ".concat(n)},o.a.createElement("section",{className:"piano-roll-editor"},E.map(function(e,n){return o.a.createElement("section",{key:e.name,className:"step-row"},Object(O.range)(16).map(function(e){return o.a.createElement(se,{key:e,row:n,col:e,playing:t===e})}))})))}),ue=n(63),he=n.n(ue),pe=(n(88),n(64)),fe=n.n(pe),me=n(65),be=n.n(me),ye=n(66),ve=n.n(ye),ge=n(67),de=n.n(ge),Oe=n(68),je=n.n(Oe),Ee=n(69),we=n.n(Ee),ke=n(70),Ce=n.n(ke);function Se(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var Fe=[fe.a,be.a,ve.a,de.a,je.a,we.a,Ce.a].map(function(e,t){return{path:e,name:e.match(/\w*_\d\d(?=\.)/)[0]||"default",index:String(t)}}),Pe=w(),De=Object(f.b)({slice:"drummer",initialState:{files:Fe,filterFreq:1,composition:Pe.initialState},reducers:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Se(n,!0).forEach(function(t){Object(h.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Se(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},Pe.reducers,{setFilterFreq:function(e,t){e.filterFreq=t.payload}})}),qe=De.actions,Re=(qe.setCompositionCell,qe.toggleCompositionCell),Ae=qe.setFilterFreq,xe=De.reducer,Ne=Object(i.memo)(function(e){var t=e.row,n=e.col,r=e.playing,a=Object(p.c)(),c=Object(p.d)(function(e){return e.character.character}),s=Object(i.useCallback)(function(e){e.stopPropagation(),"drummer"===c&&a(Re({row:t,col:n}))},[t,n,a,c]),l=Object(p.d)(function(e){return e.drummer.composition[t][n]}),u="drummer"===c,h=u?"piano-cell clickable":"piano-cell";return o.a.createElement("span",{className:h,onClick:s},l.active&&o.a.createElement("span",{onClick:s,className:"cell-trigger cell-trigger-drummer "+"".concat(r?"playing":""," ")+"".concat(u?"current":"")}))}),Le=function(e){var t=e.currentStep,n=Object(p.d)(function(e){return e.drummer.files}),r=Object(p.d)(function(e){return e.character.character});return o.a.createElement("div",{className:"piano-roll drum-sequencer ".concat("drummer"===r?"drummer":"")},o.a.createElement("div",{className:"piano-roll-keys"},n.map(function(e,t){return o.a.createElement("div",{className:"piano-key",key:e.name},o.a.createElement("p",null,n[t].name))})),o.a.createElement("section",{className:"piano-roll-editor"},n.map(function(e,n){return o.a.createElement("section",{key:e.name,className:"step-row"},Object(O.range)(16).map(function(e){return o.a.createElement(Ne,{key:e,row:n,col:e,playing:t===e})}))})))},Te={setReverb:ne,setLength:re,setPhaser:ae,setVibratoDepth:ce},_e=Object(p.b)(function(e){return{reverb:e.lenny.reverb,length:e.lenny.length,phaser:e.lenny.phaser,vibratoDepth:e.lenny.vibratoDepth,currentCharacter:e.character.character}},Te)(function(e){var t=e.reverb,n=e.setReverb,r=e.length,a=e.setLength,c=e.phaser,s=e.setPhaser,l=e.vibratoDepth,u=e.setVibratoDepth,h="lenny"!==e.currentCharacter;return o.a.createElement("div",{className:"lenny-synth synth ".concat(h?"":"current"," ")},o.a.createElement("h2",null,"Synth"),o.a.createElement("div",{className:"knob-row knob-row-vertical"},o.a.createElement(N,{disabled:h,value:r,onChange:a},"Length"),o.a.createElement(N,{disabled:h,value:t,onChange:n},"Reverb"),o.a.createElement("input",{type:"checkbox",checked:c,onChange:Object(i.useCallback)(function(e){return s(e.target.checked)},[s])}),o.a.createElement(N,{disabled:h,value:l,onChange:u},"Vibrato")))}),Me={setFilterFreq:Ae},Qe=Object(p.b)(function(e){return{filterFreq:e.drummer.filterFreq,currentCharacter:e.character.character}},Me)(function(e){var t=e.filterFreq,n=e.setFilterFreq,r="drummer"!==e.currentCharacter;return o.a.createElement("div",{className:"drummer-synth synth ".concat(r?"":"current"," ")},o.a.createElement("h2",null,"Drums"),o.a.createElement("div",{className:"knob-row knob-row-horizontal"},o.a.createElement(N,{value:t,onChange:n,disabled:r},"Filter Freq")))}),Be=function(){return o.a.createElement("h1",null,"Please Click to Continue")},Ve=Object(p.b)(function(e){return{character:e.character.character}},null)(function(e){var t=e.character,n=Object(i.useState)(!1),r=Object(u.a)(n,2),a=r[0],c=r[1],s=Object(i.useState)(!1),l=Object(u.a)(s,2),h=l[0],p=l[1],f=Object(i.useState)(0),m=Object(u.a)(f,2),b=m[0],v=m[1],d=Object(i.useState)(g[0]),O=Object(u.a)(d,2),j=O[0],E=O[1],w=Object(i.useState)("major"),k=Object(u.a)(w,2),C=k[0],S=k[1],F=Object(i.useCallback)(function(e){E(e.target.value)},[E]),P=Object(i.useCallback)(function(e){S(e.target.value)},[S]);return Object(i.useEffect)(function(){he()(y.a.context).then(function(){p(!0)}),kt.onTick=function(e){v(e)}},[]),Object(i.useEffect)(function(){a?kt.start():kt.stop()},[a]),h?o.a.createElement("main",null,o.a.createElement("section",{id:"control-panel"},o.a.createElement("p",null,"You are: ",t),o.a.createElement("button",{id:"play-button",onClick:function(){y.a.context.resume(),c(!a)}},a?"Stop":"Play"),o.a.createElement("select",{value:j,onChange:F},g.map(function(e){return o.a.createElement("option",{key:e,value:e},e)})),o.a.createElement("select",{value:C,onChange:P},o.a.createElement("option",{value:"Major"},"Major"),o.a.createElement("option",{value:"Minor"},"Minor"))),o.a.createElement(U,null),o.a.createElement(_e,null),o.a.createElement(Qe,null),o.a.createElement("section",{id:"sequencer"},o.a.createElement(le,{currentStep:b}),o.a.createElement(Le,{currentStep:b}))):o.a.createElement(Be,null)}),Ie=n(6),We=function e(t){var n=this;if(Object(Ie.a)(this,e),this.name=null,this.triggerAttack=function(e){n.synth.triggerAttack(e)},this.triggerRelease=function(e){n.synth.triggerRelease(e)},this.triggerAttackRelease=function(e,t,r){n.synth.triggerAttackRelease(e,t,r)},this.setAmpAttack=function(e){n.synth.set({envelope:{attack:e+.01}})},this.setAmpDecay=function(e){n.synth.set({envelope:{decay:e+.01}})},this.setAmpSustain=function(e){n.synth.set({envelope:{sustain:e}})},this.setAmpRelease=function(e){n.synth.set({envelope:{release:10*e+.01}})},this.setFilterAttack=function(e){n.synth.set({filterEnvelope:{attack:e/5+.01}})},this.setFilterDecay=function(e){n.synth.set({filterEnvelope:{decay:e+.01}})},this.setFilterSustain=function(e){n.synth.set({filterEnvelope:{sustain:e}})},this.setFilterRelease=function(e){n.synth.set({filterEnvelope:{release:100*e+.01}})},this.setFilterBase=function(e){n.synth.set({filterEnvelope:{baseFrequency:500*e+1}})},this.setFilterRange=function(e){n.synth.set({filterEnvelope:{octaves:20*e}})},this.setFilterQ=function(e){n.synth.set({filter:{Q:10*e}})},!t)throw new Error("CSynth constructor requires a name");this.name=t,this.synth=new y.a.PolySynth(6,y.a.MonoSynth).chain(new y.a.Limiter,y.a.Master),this.synth.set({volume:-12,oscillator:{type:"sawtooth"}})},ze=function e(t){var n=this;if(Object(Ie.a)(this,e),this.name=null,this.triggerAttack=function(e){n.synth.triggerAttack(e)},this.triggerRelease=function(e){n.synth.triggerRelease(e)},this.triggerAttackRelease=function(e,t,r){n.synth.triggerAttackRelease(e,t,r)},this.setLength=function(e){n.synth.set({envelope:{release:10*e+.01},filterEnvelope:{release:100*e+.01}})},this.setShape=function(e){n.synth.set({filterEnvelope:{attack:e/5+.01}})},this.setFilterDecay=function(e){n.synth.set({filterEnvelope:{decay:e+.01}})},this.setFilterRange=function(e){n.synth.set({filterEnvelope:{octaves:20*e}})},this.setFilterQ=function(e){n.synth.set({filter:{Q:10*e}})},!t)throw new Error("CSynth constructor requires a name");this.name=t,this.synth=new y.a.PolySynth(1,y.a.MonoSynth).chain(new y.a.Limiter,y.a.Master),this.synth.set({volume:-12,detune:-3200,oscillator:{type:"sawtooth"},envelope:{attack:.01,sustain:1,decay:.05},filter:{baseFrequency:6},filterEnvelope:{sustain:.47415415352178325}})},Ge=n(71),He=n(72),Je=n.n(He),Ye=n(36);function Ke(){var e=Object(Ge.a)(["",".composition.",".",".active"]);return Ke=function(){return e},e}var Ue=function(e,t,n){e.subscribe(Je()(e.getState,t)(n)),n(Object(Ye.get)(e.getState(),t))};function Xe(e,t){var n=t.name;Ue(e,"".concat(n,".amp.attack"),t.setAmpAttack),Ue(e,"".concat(n,".amp.decay"),t.setAmpDecay),Ue(e,"".concat(n,".amp.sustain"),t.setAmpSustain),Ue(e,"".concat(n,".amp.release"),t.setAmpRelease),Ue(e,"".concat(n,".filter.attack"),t.setFilterAttack),Ue(e,"".concat(n,".filter.decay"),t.setFilterDecay),Ue(e,"".concat(n,".filter.sustain"),t.setFilterSustain),Ue(e,"".concat(n,".filter.release"),t.setFilterRelease),Ue(e,"".concat(n,".filter.base"),t.setFilterBase),Ue(e,"".concat(n,".filter.range"),t.setFilterRange),Ue(e,"".concat(n,".filter.q"),t.setFilterQ)}function Ze(e,t){var n=t.name;Ue(e,"".concat(n,".length"),t.setLength),Ue(e,"".concat(n,".shape"),t.setShape),Ue(e,"".concat(n,".filter.decay"),t.setFilterDecay),Ue(e,"".concat(n,".filter.range"),t.setFilterRange),Ue(e,"".concat(n,".filter.q"),t.setFilterQ)}function $e(e,t){var n=t.name;Ue(e,"".concat(n,".reverb"),t.setReverb),Ue(e,"".concat(n,".length"),t.setLength),Ue(e,"".concat(n,".phaser"),t.setPhaser),Ue(e,"".concat(n,".vibratoDepth"),t.setVibratoDepth)}function et(e,t){var n=t.name;Ue(e,"".concat(n,".filterFreq"),t.setFilterFreq)}function tt(e,t){for(var n=function(){var t=a[r],n=(c=Object(u.a)(t,2))[0],i=c[1],o=e.getState()[n].composition,s=!0,l=!1,h=void 0;try{for(var p,f=o.entries()[Symbol.iterator]();!(s=(p=f.next()).done);s=!0){var m=p.value,b=Object(u.a)(m,2),y=b[0],v=b[1],g=!0,d=!1,O=void 0;try{for(var j,E=function(){var t=j.value,r=(k=Object(u.a)(t,2))[0],a=k[1],c=String.raw(Ke(),n,y,r);Ue(e,c,function(e){var t="drummer"===n?String(a.keyIndex):a.note.frequency;e?i.addNote({index:r,freq:t}):i.removeNote({index:r,freq:t})})},w=v.entries()[Symbol.iterator]();!(g=(j=w.next()).done);g=!0){var k;E()}}catch(C){d=!0,O=C}finally{try{g||null==w.return||w.return()}finally{if(d)throw O}}}}catch(C){l=!0,h=C}finally{try{s||null==f.return||f.return()}finally{if(l)throw h}}},r=0,a=Object.entries(t.sequences);r<a.length;r++){var c;n()}}var nt=n(73),rt=n(74),at=n.n(rt),ct=Object(f.b)({initialState:{message:"Hello, World",startTime:null},reducers:{setMessage:function(e,t){console.log("change to ",t.payload),e.message=t.payload},setStartTime:function(e,t){e.startTime=t.payload}}}),it=ct.actions,ot=(it.setMessage,it.setStartTime),st=ct.reducer,lt=Object(f.b)({initialState:{character:null},reducers:{setCharacter:function(e,t){e.character=t.payload.character}}}),ut=lt.actions.setCharacter,ht=lt.reducer;function pt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function ft(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?pt(n,!0).forEach(function(t){Object(h.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):pt(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var mt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return Object(f.a)(ft({reducer:{synth1:R,bass:Y,lenny:ie,drummer:xe,util:st,character:ht},middleware:[].concat(Object(m.a)(Object(f.c)()),Object(m.a)(e))},t&&{preloadedState:t}))};function bt(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var yt=["setCharacter"],vt=function(e){return function(t){return function(t){return function(n){var r=t(n);return yt.includes(n.type)||n.origin||e.emit("action",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?bt(n,!0).forEach(function(t){Object(h.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):bt(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},n,{origin:e.id})),r}}}},gt=function(){var e=Object(c.a)(a.a.mark(function e(){var t,n,r,c,i,o;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=at()("https://continuum-7.appspot.com",{transports:["websocket"]}),e.next=3,new Promise(function(e){t.on("init",function(t){console.log(t),console.log("You are player ",t.character),n=t.character,r=t.startTime,e(t.state)})});case 3:return c=e.sent,i=vt(t),(o=mt([i],c)).dispatch(ut({character:n})),o.dispatch(ot(r)),t.on("action",function(e){o.dispatch(e)}),t.on("GET_STATE",function(e,t){var n=o.getState();n.character;t(Object(nt.a)(n,["character"]))}),t.on("CHARACTER_CHANGE",function(e){var n=e.charactersById[t.id];o.dispatch(ut({character:n}))}),e.abrupt("return",o);case 12:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),dt=n(29),Ot=function(){function e(t,n){var r=this;Object(Ie.a)(this,e),this.chords=[],this.synth=null,this.frequencyOffset=0,this.addNote=function(e){var t=e.index,n=e.freq,a=r.chords[t];a.includes(n)||a.push(n)},this.removeNote=function(e){var t=e.index,n=e.freq;r.chords[t]=r.chords[t].filter(function(e){return e!==n})},this.synth=t,this.chords=new Array(n).fill(null).map(function(e){return[]})}return Object(dt.a)(e,[{key:"getNotes",value:function(e){return this.chords[e]||[]}}]),e}(),jt=function(){function e(t){var n=this,r=t.bpm,a=t.numSteps;Object(Ie.a)(this,e),this.step=0,this.numSteps=0,this.onTick=null,this.loop=null,this.sequences={},this._loopCallback=function(e){n._onTick(e,n.step);for(var t=0,r=Object.values(n.sequences);t<r.length;t++){var a=r[t],c=a.getNotes(n.step);c.length>0&&a.synth.triggerAttackRelease(c,"16n",e)}n.step++,n.step>=n.numSteps&&(n.step=0)},this.createSequence=function(e){n.sequences[e.name]=new Ot(e,n.numSteps)},this.start=function(){y.a.context.resume(),n.loop.start()},this.stop=function(){n.loop.stop(),n.step=0},this.numSteps=a,y.a.Transport.bpm.value=r,y.a.Transport.start("+0.1"),this.loop=new y.a.Loop(this._loopCallback,"16n"),this.loop.humanize=!0}return Object(dt.a)(e,[{key:"_onTick",value:function(e,t){var n=this;this.onTick&&y.a.Draw.schedule(function(){n.onTick(t)},e)}}]),e}(),Et=function e(t){var n=this;if(Object(Ie.a)(this,e),this.name=null,this.triggerAttackRelease=function(e,t,r){n.synth.triggerAttackRelease(e,t,r)},this.setReverb=function(e){var t,r;n.reverb.roomSize.value=(e-(t=0))*(1-(r=.2))/(1-t)+r},this.setLength=function(e){n.synth.set({envelope:{release:8*e+.01},filterEnvelope:{release:80*e+.01}})},this.setPhaser=function(e){n.phaser.wet.value=e?1:0},this.setVibratoDepth=function(e){n.vibrato.depth.value=e},!t)throw new Error("CSynth constructor requires a name");this.name=t,this.reverb=new y.a.Freeverb,this.vibrato=new y.a.Vibrato,this.phaser=new y.a.Phaser({frequency:.4,octaves:2,baseFrequency:200,Q:18,stages:20}),this.phaser.wet.value=1,this.synth=new y.a.PolySynth(6,y.a.MonoSynth).chain(this.vibrato,this.reverb,this.phaser,new y.a.Limiter,y.a.Master),this.synth.set({volume:-12,detune:-1200,oscillator:{type:"triangle"},filterEnvelope:{attack:.01,decay:1,sustain:1},filter:{Q:0}})},wt=function e(t,n){var r=this;Object(Ie.a)(this,e),this.triggerAttackRelease=function(e,t,n){e.forEach(function(e){r.urls[e]&&(r.synth.get(e).restart(n),r.synth.get(e).start(n))})},this.setFilterFreq=function(e){var t;r.filter.frequency.value=(Math.pow(e,2)-0)*(1e4-(t=0))/1+t},this.name=t,this.urls=n.reduce(function(e,t){return e[t.index]=t.path,e},{}),this.filter=new y.a.Filter,this.synth=new y.a.Players(this.urls).chain(this.filter,new y.a.Volume(-8),new y.a.Limiter,y.a.Master)};n.d(t,"sequencer",function(){return kt});var kt=new jt({bpm:85,numSteps:16});Object(c.a)(a.a.mark(function e(){var t,n,r,c,i;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,gt();case 2:t=e.sent,n=new We("synth1"),r=new ze("bass"),c=new Et("lenny"),i=new wt("drummer",t.getState().drummer.files),kt.createSequence(n),kt.createSequence(r),kt.createSequence(c),kt.createSequence(i),Xe(t,n),Ze(t,r),$e(t,c),et(t,i),tt(t,kt),l.a.render(o.a.createElement(p.a,{store:t},o.a.createElement(Ve,null)),document.getElementById("root"));case 17:case"end":return e.stop()}},e)}))()},47:function(e,t,n){},48:function(e,t,n){},64:function(e,t,n){e.exports=n.p+"static/media/kick_02.f5e08c6e.wav"},65:function(e,t,n){e.exports=n.p+"static/media/snare_01.16f25651.wav"},66:function(e,t,n){e.exports=n.p+"static/media/rim_01.2369df53.wav"},67:function(e,t,n){e.exports=n.p+"static/media/shaker_snap_01.689d3025.wav"},68:function(e,t,n){e.exports=n.p+"static/media/clap_01.f1089572.wav"},69:function(e,t,n){e.exports=n.p+"static/media/short_cymbal_01.b55be721.wav"},70:function(e,t,n){e.exports=n.p+"static/media/long_cymbal_01.7a357bf3.wav"},76:function(e,t,n){e.exports=n(114)},88:function(e,t,n){}},[[76,1,2]]]);
//# sourceMappingURL=main.86f9ebdd.chunk.js.map