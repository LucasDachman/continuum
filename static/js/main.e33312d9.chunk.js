(window["webpackJsonpcontinuum-client"]=window["webpackJsonpcontinuum-client"]||[]).push([[0],{111:function(e,t){},114:function(e,t,n){"use strict";n.r(t);var r=n(15),a=n.n(r),c=n(25),i=n(0),o=n.n(i),s=n(23),l=n.n(s),u=n(4),h=n(2),p=n(3),f=n(5),m=n(16),b=n(1),y=n.n(b);var v=function(e){var t=y.a.Frequency(e,"midi"),n=t.toNote();return{name:n,frequency:t.toFrequency(),color:n.includes("#")?"black":"white",midi:e}},g=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],d=n(39),O=n(9),j=n.n(O),w=[].concat(Object(m.a)(Object(d.a)("B3 minor").notes),Object(m.a)(Object(d.a)("B4 minor").notes)).map(function(e){var t=y.a.Frequency(e,"note");return{name:e,frequency:t.toFrequency(),color:e.includes("#")?"black":"white",midi:t.toMidi()}}),k=function(){return{initialState:Object(O.range)(14).map(function(e){return Object(O.range)(16).map(function(){return{active:!1,note:w[e],keyIndex:e}})}),reducers:{setCompositionCell:function(e,t){var n=t.payload,r=n.row,a=n.col,c=n.active;e.composition[r][a].active=c},toggleCompositionCell:function(e,t){var n=t.payload,r=n.row,a=n.col;e.composition[r][a].active=!e.composition[r][a].active},transpose:function(e,t){var n=t.payload.semitones;e.composition=e.composition.map(function(e){return e.map(function(e){return v(e.midi+n)})})}}}};function E(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var S=k(),C=Object(f.b)({slice:"bass",initialState:{length:.07,shape:0,filter:{decay:.5,range:.3769,q:.1},composition:S.initialState},reducers:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?E(n,!0).forEach(function(t){Object(p.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):E(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},S.reducers,{setLength:function(e,t){e.length=t.payload},setShape:function(e,t){e.shape=t.payload},setFilterDecay:function(e,t){e.filter.decay=t.payload},setFilterRange:function(e,t){e.filter.range=t.payload},setFilterQ:function(e,t){e.filter.q=t.payload}})}),F=C.actions,P=F.setCompositionCell,D=F.toggleCompositionCell,q=F.setLength,x=F.setShape,R=F.setFilterDecay,A=F.setFilterRange,N=F.setFilterQ,L=C.reducer,T=n(8),_=function(e){var t=e.strokeWidth,n=e.stroke,r=Object(T.useCircularInputContext)(),a=r.getPointFromValue,c=r.center,s=a(),l=s.x,u=s.y,h=Object(i.useRef)(null);return Object(T.useCircularDrag)(h),o.a.createElement("g",null,o.a.createElement("line",{x1:c.x,y1:c.y,x2:l,y2:u,stroke:n,strokeWidth:t}),o.a.createElement("circle",{ref:h,cx:l,cy:u,r:20,stroke:"white",opacity:0}))},M=Object(i.memo)(function(e){var t=e.value,n=e.onChange,r=e.children,a=e.disabled,c=Object(i.useCallback)(Object(O.throttle)(function(e){n(e)},100),[n]),s=a?"lightgray":"black";return o.a.createElement("div",{className:"knob"},o.a.createElement("div",null,o.a.createElement(T.CircularInput,{radius:21,value:t,onChange:a?function(){}:c},o.a.createElement(T.CircularTrack,{stroke:"lightgray",strokeWidth:1,strokeLinecap:"square"}),o.a.createElement(T.CircularProgress,{stroke:s,strokeWidth:2,strokeLinecap:"square"}),o.a.createElement(_,{strokeWidth:2,stroke:s}))),o.a.createElement("div",{style:{color:s,zIndex:-1}},r))}),I={setCompositionCell:P,setLength:q,setShape:x,setFilterDecay:R,setFilterRange:A,setFilterQ:N},Q=Object(h.b)(function(e){return{length:e.bass.length,shape:e.bass.shape,filterDecay:e.bass.filter.decay,filterRange:e.bass.filter.range,filterQ:e.bass.filter.q,currentCharacter:e.character.character}},I)(function(e){var t=e.setLength,n=e.setShape,r=e.setFilterDecay,a=e.setFilterRange,c=e.setFilterQ,i=e.length,s=e.shape,l=e.filterDecay,u=e.filterRange,h=e.filterQ,p="bass"!==e.currentCharacter;return o.a.createElement("div",{className:"bass-synth synth ".concat(p?"":"current"," ")},o.a.createElement("h2",null,"Bass"),o.a.createElement("div",{className:"knob-row"},o.a.createElement(M,{disabled:p,value:i,onChange:t},"Length"),o.a.createElement(M,{disabled:p,value:s,onChange:n},"Shape"),o.a.createElement(M,{disabled:p,value:l,onChange:r},"Decay"),o.a.createElement(M,{disabled:p,value:u,onChange:a},"Brightness"),o.a.createElement(M,{disabled:p,value:h,onChange:c},"Harshness")))});function B(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var V=k(),W=Object(f.b)({slice:"synth1",initialState:{amp:{attack:0,decay:.5,sustain:1,release:.2},filter:{attack:0,decay:.5,sustain:1,release:.2,base:0,range:.5,q:0},composition:V.initialState},reducers:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?B(n,!0).forEach(function(t){Object(p.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):B(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({setAmp:function(e,t){for(var n=0,r=Object.entries(t.payload);n<r.length;n++){var a=r[n],c=Object(u.a)(a,2),i=c[0],o=c[1];e.amp[i]=o}},setFilter:function(e,t){for(var n=0,r=Object.entries(t.payload);n<r.length;n++){var a=r[n],c=Object(u.a)(a,2),i=c[0],o=c[1];e.filter[i]=o}}},V.reducers)}),H=W.actions,z=(H.setAmp,H.setFilter,H.setCompositionCell,H.toggleCompositionCell),G=W.reducer;function J(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var Y=k(),K=Object(f.b)({slice:"lenny",initialState:{reverb:0,length:.25,phaser:!1,vibratoDepth:.1,composition:Y.initialState},reducers:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?J(n,!0).forEach(function(t){Object(p.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):J(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},Y.reducers,{setReverb:function(e,t){e.reverb=t.payload},setLength:function(e,t){e.length=t.payload},setPhaser:function(e,t){e.phaser=t.payload},setVibratoDepth:function(e,t){e.vibratoDepth=t.payload}})}),U=K.actions,X=(U.setCompositionCell,U.toggleCompositionCell),Z=U.setReverb,$=U.setLength,ee=U.setPhaser,te=U.setVibratoDepth,ne=K.reducer,re=(n(47),{synth1:z,bass:D,lenny:X}),ae=Object(i.memo)(function(e){var t=e.row,n=e.col,r=e.playing,a=Object(h.c)(),c=Object(h.d)(function(e){return e.character.character}),s=Object(i.useCallback)(function(e){e.stopPropagation(),Boolean(re[c])&&a(re[c]({row:t,col:n}))},[t,n,c,a]),l={synth1:Object(h.d)(function(e){return e.synth1.composition[t][n]}),bass:Object(h.d)(function(e){return e.bass.composition[t][n]}),lenny:Object(h.d)(function(e){return e.lenny.composition[t][n]})},u=c in l?"piano-cell clickable":"piano-cell";return o.a.createElement("span",{className:u,onClick:s},j.a.map(l,function(e,t){if(e.active){var n="cell-trigger "+"cell-trigger-".concat(t," ")+"".concat(r?"playing":""," ")+"".concat(c===t?"current":""," ");return o.a.createElement("span",{key:t,onClick:s,className:n})}}))}),ce=(n(48),function(e){var t=e.currentStep,n=Object(h.d)(function(e){return e.character.character});return o.a.createElement("div",{className:"piano-roll ".concat(n)},o.a.createElement("section",{className:"piano-roll-editor"},w.map(function(e,n){return o.a.createElement("section",{key:e.name,className:"step-row"},Object(O.range)(16).map(function(e){return o.a.createElement(ae,{key:e,row:n,col:e,playing:t===e})}))})))}),ie=(n(88),n(63)),oe=n.n(ie),se=n(64),le=n.n(se),ue=n(65),he=n.n(ue),pe=n(66),fe=n.n(pe),me=n(67),be=n.n(me),ye=n(68),ve=n.n(ye),ge=n(69),de=n.n(ge);function Oe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var je=[oe.a,le.a,he.a,fe.a,be.a,ve.a,de.a].map(function(e,t){return{path:e,name:e.match(/\w*_\d\d(?=\.)/)[0]||"default",index:String(t)}}),we=k(),ke=Object(f.b)({slice:"drummer",initialState:{files:je,filterFreq:1,composition:we.initialState},reducers:function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Oe(n,!0).forEach(function(t){Object(p.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Oe(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},we.reducers,{setFilterFreq:function(e,t){e.filterFreq=t.payload}})}),Ee=ke.actions,Se=(Ee.setCompositionCell,Ee.toggleCompositionCell),Ce=Ee.setFilterFreq,Fe=ke.reducer,Pe=Object(i.memo)(function(e){var t=e.row,n=e.col,r=e.playing,a=Object(h.c)(),c=Object(h.d)(function(e){return e.character.character}),s=Object(i.useCallback)(function(e){e.stopPropagation(),"drummer"===c&&a(Se({row:t,col:n}))},[t,n,a,c]),l=Object(h.d)(function(e){return e.drummer.composition[t][n]}),u="drummer"===c,p=u?"piano-cell clickable":"piano-cell";return o.a.createElement("span",{className:p,onClick:s},l.active&&o.a.createElement("span",{onClick:s,className:"cell-trigger cell-trigger-drummer "+"".concat(r?"playing":""," ")+"".concat(u?"current":"")}))}),De=function(e){var t=e.currentStep,n=Object(h.d)(function(e){return e.drummer.files}),r=Object(h.d)(function(e){return e.character.character});return o.a.createElement("div",{className:"piano-roll drum-sequencer ".concat("drummer"===r?"drummer":"")},o.a.createElement("section",{className:"piano-roll-editor"},n.map(function(e,n){return o.a.createElement("section",{key:e.name,className:"step-row"},Object(O.range)(16).map(function(e){return o.a.createElement(Pe,{key:e,row:n,col:e,playing:t===e})}))})))},qe={setReverb:Z,setLength:$,setPhaser:ee,setVibratoDepth:te},xe=Object(h.b)(function(e){return{reverb:e.lenny.reverb,length:e.lenny.length,phaser:e.lenny.phaser,vibratoDepth:e.lenny.vibratoDepth,currentCharacter:e.character.character}},qe)(function(e){var t=e.reverb,n=e.setReverb,r=e.length,a=e.setLength,c=e.phaser,s=e.setPhaser,l=e.vibratoDepth,u=e.setVibratoDepth,h="lenny"!==e.currentCharacter;return o.a.createElement("div",{className:"lenny-synth synth ".concat(h?"":"current"," ")},o.a.createElement("h2",null,"Synth"),o.a.createElement("div",{className:"knob-row knob-row-vertical"},o.a.createElement(M,{disabled:h,value:r,onChange:a},"Length"),o.a.createElement(M,{disabled:h,value:t,onChange:n},"Reverb"),o.a.createElement("input",{type:"checkbox",checked:c,onChange:Object(i.useCallback)(function(e){return s(e.target.checked)},[s])}),o.a.createElement(M,{disabled:h,value:l,onChange:u},"Vibrato")))}),Re={setFilterFreq:Ce},Ae=Object(h.b)(function(e){return{filterFreq:e.drummer.filterFreq,currentCharacter:e.character.character}},Re)(function(e){var t=e.filterFreq,n=e.setFilterFreq,r="drummer"!==e.currentCharacter;return o.a.createElement("div",{className:"drummer-synth synth ".concat(r?"":"current"," ")},o.a.createElement("h2",null,"Drums"),o.a.createElement("div",{className:"knob-row knob-row-horizontal"},o.a.createElement(M,{value:t,onChange:n,disabled:r},"Filter Freq")))}),Ne=Object(h.b)(function(e){return{character:e.character.character}},null)(function(e){var t=e.character,n=Object(i.useState)(!1),r=Object(u.a)(n,2),a=r[0],c=r[1],s=Object(i.useState)(0),l=Object(u.a)(s,2),h=l[0],p=l[1],f=Object(i.useState)(g[0]),m=Object(u.a)(f,2),b=m[0],v=m[1],d=Object(i.useState)("major"),O=Object(u.a)(d,2),j=O[0],w=O[1],k=Object(i.useCallback)(function(e){v(e.target.value)},[v]),E=Object(i.useCallback)(function(e){w(e.target.value)},[w]);return Object(i.useEffect)(function(){dt.onTick=function(e){p(e)}},[]),o.a.createElement("main",null,o.a.createElement("section",{id:"control-panel"},o.a.createElement("p",null,"You are: ",t),o.a.createElement("button",{id:"play-button",onClick:function(){y.a.context.resume(),c(!a)}},a?"Stop":"Play"),o.a.createElement("select",{value:b,onChange:k},g.map(function(e){return o.a.createElement("option",{key:e,value:e},e)})),o.a.createElement("select",{value:j,onChange:E},o.a.createElement("option",{value:"Major"},"Major"),o.a.createElement("option",{value:"Minor"},"Minor"))),o.a.createElement(Q,null),o.a.createElement(xe,null),o.a.createElement(Ae,null),o.a.createElement("section",{id:"sequencer"},o.a.createElement(ce,{currentStep:h}),o.a.createElement(De,{currentStep:h})))}),Le=n(70),Te=n.n(Le),_e=n(6),Me=function e(t){var n=this;if(Object(_e.a)(this,e),this.name=null,this.triggerAttack=function(e){n.synth.triggerAttack(e)},this.triggerRelease=function(e){n.synth.triggerRelease(e)},this.triggerAttackRelease=function(e,t,r){n.synth.triggerAttackRelease(e,t,r)},this.setAmpAttack=function(e){n.synth.set({envelope:{attack:e+.01}})},this.setAmpDecay=function(e){n.synth.set({envelope:{decay:e+.01}})},this.setAmpSustain=function(e){n.synth.set({envelope:{sustain:e}})},this.setAmpRelease=function(e){n.synth.set({envelope:{release:10*e+.01}})},this.setFilterAttack=function(e){n.synth.set({filterEnvelope:{attack:e/5+.01}})},this.setFilterDecay=function(e){n.synth.set({filterEnvelope:{decay:e+.01}})},this.setFilterSustain=function(e){n.synth.set({filterEnvelope:{sustain:e}})},this.setFilterRelease=function(e){n.synth.set({filterEnvelope:{release:100*e+.01}})},this.setFilterBase=function(e){n.synth.set({filterEnvelope:{baseFrequency:500*e+1}})},this.setFilterRange=function(e){n.synth.set({filterEnvelope:{octaves:20*e}})},this.setFilterQ=function(e){n.synth.set({filter:{Q:10*e}})},!t)throw new Error("CSynth constructor requires a name");this.name=t,this.synth=new y.a.PolySynth(6,y.a.MonoSynth).chain(new y.a.Limiter,y.a.Master),this.synth.set({volume:-12,oscillator:{type:"sawtooth"}})},Ie=function e(t){var n=this;if(Object(_e.a)(this,e),this.name=null,this.triggerAttack=function(e){n.synth.triggerAttack(e)},this.triggerRelease=function(e){n.synth.triggerRelease(e)},this.triggerAttackRelease=function(e,t,r){n.synth.triggerAttackRelease(e,t,r)},this.setLength=function(e){n.synth.set({envelope:{release:10*e+.01},filterEnvelope:{release:100*e+.01}})},this.setShape=function(e){n.synth.set({filterEnvelope:{attack:e/5+.01}})},this.setFilterDecay=function(e){n.synth.set({filterEnvelope:{decay:e+.01}})},this.setFilterRange=function(e){n.synth.set({filterEnvelope:{octaves:20*e}})},this.setFilterQ=function(e){n.synth.set({filter:{Q:10*e}})},!t)throw new Error("CSynth constructor requires a name");this.name=t,this.synth=new y.a.PolySynth(1,y.a.MonoSynth).chain(new y.a.Limiter,y.a.Master),this.synth.set({volume:-12,detune:-3200,oscillator:{type:"sawtooth"},envelope:{attack:.01,sustain:1,decay:.05},filter:{baseFrequency:6},filterEnvelope:{sustain:.47415415352178325}})},Qe=n(71),Be=n(72),Ve=n.n(Be),We=n(36);function He(){var e=Object(Qe.a)(["",".composition.",".",".active"]);return He=function(){return e},e}var ze=function(e,t,n){e.subscribe(Ve()(e.getState,t)(n)),n(Object(We.get)(e.getState(),t))};function Ge(e,t){var n=t.name;ze(e,"".concat(n,".amp.attack"),t.setAmpAttack),ze(e,"".concat(n,".amp.decay"),t.setAmpDecay),ze(e,"".concat(n,".amp.sustain"),t.setAmpSustain),ze(e,"".concat(n,".amp.release"),t.setAmpRelease),ze(e,"".concat(n,".filter.attack"),t.setFilterAttack),ze(e,"".concat(n,".filter.decay"),t.setFilterDecay),ze(e,"".concat(n,".filter.sustain"),t.setFilterSustain),ze(e,"".concat(n,".filter.release"),t.setFilterRelease),ze(e,"".concat(n,".filter.base"),t.setFilterBase),ze(e,"".concat(n,".filter.range"),t.setFilterRange),ze(e,"".concat(n,".filter.q"),t.setFilterQ)}function Je(e,t){var n=t.name;ze(e,"".concat(n,".length"),t.setLength),ze(e,"".concat(n,".shape"),t.setShape),ze(e,"".concat(n,".filter.decay"),t.setFilterDecay),ze(e,"".concat(n,".filter.range"),t.setFilterRange),ze(e,"".concat(n,".filter.q"),t.setFilterQ)}function Ye(e,t){var n=t.name;ze(e,"".concat(n,".reverb"),t.setReverb),ze(e,"".concat(n,".length"),t.setLength),ze(e,"".concat(n,".phaser"),t.setPhaser),ze(e,"".concat(n,".vibratoDepth"),t.setVibratoDepth)}function Ke(e,t){var n=t.name;ze(e,"".concat(n,".filterFreq"),t.setFilterFreq)}function Ue(e,t){for(var n=function(){var t=a[r],n=(c=Object(u.a)(t,2))[0],i=c[1],o=e.getState()[n].composition,s=!0,l=!1,h=void 0;try{for(var p,f=o.entries()[Symbol.iterator]();!(s=(p=f.next()).done);s=!0){var m=p.value,b=Object(u.a)(m,2),y=b[0],v=b[1],g=!0,d=!1,O=void 0;try{for(var j,w=function(){var t=j.value,r=(E=Object(u.a)(t,2))[0],a=E[1],c=String.raw(He(),n,y,r);ze(e,c,function(e){var t="drummer"===n?String(a.keyIndex):a.note.frequency;e?i.addNote({index:r,freq:t}):i.removeNote({index:r,freq:t})})},k=v.entries()[Symbol.iterator]();!(g=(j=k.next()).done);g=!0){var E;w()}}catch(S){d=!0,O=S}finally{try{g||null==k.return||k.return()}finally{if(d)throw O}}}}catch(S){l=!0,h=S}finally{try{s||null==f.return||f.return()}finally{if(l)throw h}}},r=0,a=Object.entries(t.sequences);r<a.length;r++){var c;n()}}var Xe=Object(f.b)({initialState:{message:"Hello, World",startTime:null,nextInterval:0},reducers:{setMessage:function(e,t){console.log("change to ",t.payload),e.message=t.payload},setStartTime:function(e,t){e.startTime=t.payload},setNextInterval:function(e,t){e.nextInterval=t.payload}}}),Ze=Xe.actions,$e=(Ze.setMessage,Ze.setStartTime,Ze.setNextInterval),et=Xe.reducer,tt=n(73),nt=n(74),rt=n.n(nt),at=Object(f.b)({initialState:{character:null},reducers:{setCharacter:function(e,t){e.character=t.payload.character}}}),ct=at.actions.setCharacter,it=at.reducer;function ot(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function st(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ot(n,!0).forEach(function(t){Object(p.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ot(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var lt=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return Object(f.a)(st({reducer:{synth1:G,bass:L,lenny:ne,drummer:Fe,util:et,character:it},middleware:[].concat(Object(m.a)(Object(f.c)()),Object(m.a)(e))},t&&{preloadedState:t}))};function ut(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}var ht=["setCharacter","setNextInterval"],pt=function(e){return function(t){return function(t){return function(n){var r=t(n);return ht.includes(n.type)||n.origin||e.emit("action",function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ut(n,!0).forEach(function(t){Object(p.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ut(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},n,{origin:e.id})),r}}}},ft=function(){var e=Object(c.a)(a.a.mark(function e(){var t,n,r,c,i;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=rt()("https://continuum-7.appspot.com",{transports:["websocket"]}),e.next=3,new Promise(function(e){t.on("init",function(t){console.log(t),console.log("You are player ",t.character),n=t.character,e(t.state)})});case 3:return r=e.sent,c=pt(t),(i=lt([c],r)).dispatch(ct({character:n})),t.on("action",function(e){i.dispatch(e)}),t.on("GET_STATE",function(e,t){var n=i.getState();n.character;t(Object(tt.a)(n,["character"]))}),t.on("CHARACTER_CHANGE",function(e){var n=e.charactersById[t.id];i.dispatch(ct({character:n}))}),e.abrupt("return",i);case 11:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}(),mt=n(29),bt=function(){function e(t,n){var r=this;Object(_e.a)(this,e),this.chords=[],this.synth=null,this.frequencyOffset=0,this.addNote=function(e){var t=e.index,n=e.freq,a=r.chords[t];a.includes(n)||a.push(n)},this.removeNote=function(e){var t=e.index,n=e.freq;r.chords[t]=r.chords[t].filter(function(e){return e!==n})},this.synth=t,this.chords=new Array(n).fill(null).map(function(e){return[]})}return Object(mt.a)(e,[{key:"getNotes",value:function(e){return this.chords[e]||[]}}]),e}(),yt=function(){function e(t){var n=this,r=t.bpm,a=t.numSteps;Object(_e.a)(this,e),this.step=0,this.numSteps=0,this.onTick=null,this.loop=null,this.sequences={},this._loopCallback=function(e){n._onTick(e,n.step);for(var t=0,r=Object.values(n.sequences);t<r.length;t++){var a=r[t],c=a.getNotes(n.step);c.length>0&&a.synth.triggerAttackRelease(c,"16n",e)}n.step++,n.step>=n.numSteps&&(n.step=0)},this.createSequence=function(e){n.sequences[e.name]=new bt(e,n.numSteps)},this.start=function(){y.a.context.resume(),n.loop.start()},this.stop=function(){n.loop.stop(),n.step=0},this.numSteps=a,y.a.Transport.bpm.value=r,y.a.Transport.start("+0.1"),this.loop=new y.a.Loop(this._loopCallback,"16n"),this.loop.humanize=!0}return Object(mt.a)(e,[{key:"_onTick",value:function(e,t){var n=this;0===t&&this.onLoop&&y.a.Draw.schedule(function(){n.onLoop(Date.now())},e),this.onTick&&y.a.Draw.schedule(function(){n.onTick(t)},e)}}]),e}(),vt=function e(t){var n=this;if(Object(_e.a)(this,e),this.name=null,this.triggerAttackRelease=function(e,t,r){n.synth.triggerAttackRelease(e,t,r)},this.setReverb=function(e){var t,r;n.reverb.roomSize.value=(e-(t=0))*(1-(r=.2))/(1-t)+r},this.setLength=function(e){n.synth.set({envelope:{release:8*e+.01},filterEnvelope:{release:80*e+.01}})},this.setPhaser=function(e){n.phaser.wet.value=e?1:0},this.setVibratoDepth=function(e){n.vibrato.depth.value=e},!t)throw new Error("CSynth constructor requires a name");this.name=t,this.reverb=new y.a.Freeverb,this.vibrato=new y.a.Vibrato,this.phaser=new y.a.Phaser({frequency:.4,octaves:2,baseFrequency:200,Q:18,stages:20}),this.phaser.wet.value=1,this.synth=new y.a.PolySynth(6,y.a.MonoSynth).chain(this.vibrato,this.reverb,this.phaser,new y.a.Limiter,y.a.Master),this.synth.set({volume:-12,detune:-1200,oscillator:{type:"triangle"},filterEnvelope:{attack:.01,decay:1,sustain:1},filter:{Q:0}})},gt=function e(t,n){var r=this;Object(_e.a)(this,e),this.triggerAttackRelease=function(e,t,n){e.forEach(function(e){r.urls[e]&&(r.synth.get(e).restart(n),r.synth.get(e).start(n))})},this.setFilterFreq=function(e){var t;r.filter.frequency.value=(Math.pow(e,2)-0)*(1e4-(t=0))/1+t},this.name=t,this.urls=n.reduce(function(e,t){return e[t.index]=t.path,e},{}),this.filter=new y.a.Filter,this.synth=new y.a.Players(this.urls).chain(this.filter,new y.a.Volume(-8),new y.a.Limiter,y.a.Master)};n.d(t,"sequencer",function(){return dt});var dt=new yt({bpm:85,numSteps:16});Object(c.a)(a.a.mark(function e(){var t,n,r,c,i,s;return a.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,ft();case 2:return t=e.sent,dt.onLoop=function(e){t.dispatch($e(e+6e4/85*16))},n=new Me("synth1"),r=new Ie("bass"),c=new vt("lenny"),i=new gt("drummer",t.getState().drummer.files),dt.createSequence(n),dt.createSequence(r),dt.createSequence(c),dt.createSequence(i),Ge(t,n),Je(t,r),Ye(t,c),Ke(t,i),Ue(t,dt),document.getElementById("start-message").innerHTML="Please Click To Continue",e.next=20,Te()(y.a.context);case 20:s=t.getState().util.nextInterval,console.log(s),0===s?dt.start():setTimeout(function(){dt.start()},t.getState().util.nextInterval-Date.now()),l.a.render(o.a.createElement(h.a,{store:t},o.a.createElement(Ne,null)),document.getElementById("root"));case 24:case"end":return e.stop()}},e)}))()},47:function(e,t,n){},48:function(e,t,n){},63:function(e,t,n){e.exports=n.p+"static/media/kick_02.f5e08c6e.wav"},64:function(e,t,n){e.exports=n.p+"static/media/snare_01.16f25651.wav"},65:function(e,t,n){e.exports=n.p+"static/media/rim_01.2369df53.wav"},66:function(e,t,n){e.exports=n.p+"static/media/shaker_snap_01.689d3025.wav"},67:function(e,t,n){e.exports=n.p+"static/media/clap_01.f1089572.wav"},68:function(e,t,n){e.exports=n.p+"static/media/short_cymbal_01.b55be721.wav"},69:function(e,t,n){e.exports=n.p+"static/media/long_cymbal_01.7a357bf3.wav"},76:function(e,t,n){e.exports=n(114)},88:function(e,t,n){}},[[76,1,2]]]);
//# sourceMappingURL=main.e33312d9.chunk.js.map