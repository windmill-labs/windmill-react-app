/*! For license information please see 5774.8be622c3.chunk.js.LICENSE.txt */
"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[5774],{5774:(e,t,n)=>{n.r(t),n.d(t,{CompletionAdapter:()=>He,DefinitionAdapter:()=>tt,DiagnosticsAdapter:()=>Ke,DocumentColorAdapter:()=>gt,DocumentFormattingEditProvider:()=>ct,DocumentHighlightAdapter:()=>Ze,DocumentLinkAdapter:()=>ut,DocumentRangeFormattingEditProvider:()=>dt,DocumentSymbolAdapter:()=>ot,FoldingRangeAdapter:()=>ft,HoverAdapter:()=>Ge,ReferenceAdapter:()=>rt,RenameAdapter:()=>it,SelectionRangeAdapter:()=>ht,WorkerManager:()=>Ue,fromPosition:()=>Xe,fromRange:()=>ze,setupMode:()=>pt,toRange:()=>$e,toTextEdit:()=>qe});var r,i,o,a=n(2533),s=Object.defineProperty,u=Object.getOwnPropertyDescriptor,c=Object.getOwnPropertyNames,d=Object.prototype.hasOwnProperty,l=(e,t,n,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let i of c(t))!d.call(e,i)&&i!==n&&s(e,i,{get:()=>t[i],enumerable:!(r=u(t,i))||r.enumerable});return e},g={};r=g,i=a.a,l(r,i,"default"),o&&l(o,i,"default");var f,h,p,m,v,b,_,k,y,w,x,I,E,A,C,S,R,L,T,M,D,P,F,j,N,U,V,O,K,W,H,X,z,$,B,q,Q,G,J,Y,Z,ee,te,ne,re,ie,oe,ae,se,ue,ce,de,le,ge,fe,he,pe,me,ve,be,_e,ke,ye,we,xe,Ie,Ee,Ae,Ce,Se,Re,Le,Te,Me,De,Pe,Fe,je,Ne,Ue=class{constructor(e){this._defaults=e,this._worker=null,this._client=null,this._idleCheckInterval=window.setInterval((()=>this._checkIfIdle()),3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange((()=>this._stopWorker()))}_stopWorker(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}dispose(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()}_checkIfIdle(){this._worker&&Date.now()-this._lastUsedTime>12e4&&this._stopWorker()}_getClient(){return this._lastUsedTime=Date.now(),this._client||(this._worker=g.editor.createWebWorker({moduleId:"vs/language/css/cssWorker",label:this._defaults.languageId,createData:{options:this._defaults.options,languageId:this._defaults.languageId}}),this._client=this._worker.getProxy()),this._client}getLanguageServiceWorker(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];let r;return this._getClient().then((e=>{r=e})).then((e=>{if(this._worker)return this._worker.withSyncedResources(t)})).then((e=>r))}};!function(e){e.is=function(e){return"string"==typeof e}}(f||(f={})),function(e){e.is=function(e){return"string"==typeof e}}(h||(h={})),function(e){e.MIN_VALUE=-2147483648,e.MAX_VALUE=2147483647,e.is=function(t){return"number"==typeof t&&e.MIN_VALUE<=t&&t<=e.MAX_VALUE}}(p||(p={})),function(e){e.MIN_VALUE=0,e.MAX_VALUE=2147483647,e.is=function(t){return"number"==typeof t&&e.MIN_VALUE<=t&&t<=e.MAX_VALUE}}(m||(m={})),function(e){e.create=function(e,t){return e===Number.MAX_VALUE&&(e=m.MAX_VALUE),t===Number.MAX_VALUE&&(t=m.MAX_VALUE),{line:e,character:t}},e.is=function(e){let t=e;return Ve.objectLiteral(t)&&Ve.uinteger(t.line)&&Ve.uinteger(t.character)}}(v||(v={})),function(e){e.create=function(e,t,n,r){if(Ve.uinteger(e)&&Ve.uinteger(t)&&Ve.uinteger(n)&&Ve.uinteger(r))return{start:v.create(e,t),end:v.create(n,r)};if(v.is(e)&&v.is(t))return{start:e,end:t};throw new Error(`Range#create called with invalid arguments[${e}, ${t}, ${n}, ${r}]`)},e.is=function(e){let t=e;return Ve.objectLiteral(t)&&v.is(t.start)&&v.is(t.end)}}(b||(b={})),function(e){e.create=function(e,t){return{uri:e,range:t}},e.is=function(e){let t=e;return Ve.objectLiteral(t)&&b.is(t.range)&&(Ve.string(t.uri)||Ve.undefined(t.uri))}}(_||(_={})),function(e){e.create=function(e,t,n,r){return{targetUri:e,targetRange:t,targetSelectionRange:n,originSelectionRange:r}},e.is=function(e){let t=e;return Ve.objectLiteral(t)&&b.is(t.targetRange)&&Ve.string(t.targetUri)&&b.is(t.targetSelectionRange)&&(b.is(t.originSelectionRange)||Ve.undefined(t.originSelectionRange))}}(k||(k={})),function(e){e.create=function(e,t,n,r){return{red:e,green:t,blue:n,alpha:r}},e.is=function(e){const t=e;return Ve.objectLiteral(t)&&Ve.numberRange(t.red,0,1)&&Ve.numberRange(t.green,0,1)&&Ve.numberRange(t.blue,0,1)&&Ve.numberRange(t.alpha,0,1)}}(y||(y={})),function(e){e.create=function(e,t){return{range:e,color:t}},e.is=function(e){const t=e;return Ve.objectLiteral(t)&&b.is(t.range)&&y.is(t.color)}}(w||(w={})),function(e){e.create=function(e,t,n){return{label:e,textEdit:t,additionalTextEdits:n}},e.is=function(e){const t=e;return Ve.objectLiteral(t)&&Ve.string(t.label)&&(Ve.undefined(t.textEdit)||M.is(t))&&(Ve.undefined(t.additionalTextEdits)||Ve.typedArray(t.additionalTextEdits,M.is))}}(x||(x={})),function(e){e.Comment="comment",e.Imports="imports",e.Region="region"}(I||(I={})),function(e){e.create=function(e,t,n,r,i,o){const a={startLine:e,endLine:t};return Ve.defined(n)&&(a.startCharacter=n),Ve.defined(r)&&(a.endCharacter=r),Ve.defined(i)&&(a.kind=i),Ve.defined(o)&&(a.collapsedText=o),a},e.is=function(e){const t=e;return Ve.objectLiteral(t)&&Ve.uinteger(t.startLine)&&Ve.uinteger(t.startLine)&&(Ve.undefined(t.startCharacter)||Ve.uinteger(t.startCharacter))&&(Ve.undefined(t.endCharacter)||Ve.uinteger(t.endCharacter))&&(Ve.undefined(t.kind)||Ve.string(t.kind))}}(E||(E={})),function(e){e.create=function(e,t){return{location:e,message:t}},e.is=function(e){let t=e;return Ve.defined(t)&&_.is(t.location)&&Ve.string(t.message)}}(A||(A={})),function(e){e.Error=1,e.Warning=2,e.Information=3,e.Hint=4}(C||(C={})),function(e){e.Unnecessary=1,e.Deprecated=2}(S||(S={})),function(e){e.is=function(e){const t=e;return Ve.objectLiteral(t)&&Ve.string(t.href)}}(R||(R={})),function(e){e.create=function(e,t,n,r,i,o){let a={range:e,message:t};return Ve.defined(n)&&(a.severity=n),Ve.defined(r)&&(a.code=r),Ve.defined(i)&&(a.source=i),Ve.defined(o)&&(a.relatedInformation=o),a},e.is=function(e){var t;let n=e;return Ve.defined(n)&&b.is(n.range)&&Ve.string(n.message)&&(Ve.number(n.severity)||Ve.undefined(n.severity))&&(Ve.integer(n.code)||Ve.string(n.code)||Ve.undefined(n.code))&&(Ve.undefined(n.codeDescription)||Ve.string(null===(t=n.codeDescription)||void 0===t?void 0:t.href))&&(Ve.string(n.source)||Ve.undefined(n.source))&&(Ve.undefined(n.relatedInformation)||Ve.typedArray(n.relatedInformation,A.is))}}(L||(L={})),function(e){e.create=function(e,t){let n={title:e,command:t};for(var r=arguments.length,i=new Array(r>2?r-2:0),o=2;o<r;o++)i[o-2]=arguments[o];return Ve.defined(i)&&i.length>0&&(n.arguments=i),n},e.is=function(e){let t=e;return Ve.defined(t)&&Ve.string(t.title)&&Ve.string(t.command)}}(T||(T={})),function(e){e.replace=function(e,t){return{range:e,newText:t}},e.insert=function(e,t){return{range:{start:e,end:e},newText:t}},e.del=function(e){return{range:e,newText:""}},e.is=function(e){const t=e;return Ve.objectLiteral(t)&&Ve.string(t.newText)&&b.is(t.range)}}(M||(M={})),function(e){e.create=function(e,t,n){const r={label:e};return void 0!==t&&(r.needsConfirmation=t),void 0!==n&&(r.description=n),r},e.is=function(e){const t=e;return Ve.objectLiteral(t)&&Ve.string(t.label)&&(Ve.boolean(t.needsConfirmation)||void 0===t.needsConfirmation)&&(Ve.string(t.description)||void 0===t.description)}}(D||(D={})),function(e){e.is=function(e){const t=e;return Ve.string(t)}}(P||(P={})),function(e){e.replace=function(e,t,n){return{range:e,newText:t,annotationId:n}},e.insert=function(e,t,n){return{range:{start:e,end:e},newText:t,annotationId:n}},e.del=function(e,t){return{range:e,newText:"",annotationId:t}},e.is=function(e){const t=e;return M.is(t)&&(D.is(t.annotationId)||P.is(t.annotationId))}}(F||(F={})),function(e){e.create=function(e,t){return{textDocument:e,edits:t}},e.is=function(e){let t=e;return Ve.defined(t)&&H.is(t.textDocument)&&Array.isArray(t.edits)}}(j||(j={})),function(e){e.create=function(e,t,n){let r={kind:"create",uri:e};return void 0!==t&&(void 0!==t.overwrite||void 0!==t.ignoreIfExists)&&(r.options=t),void 0!==n&&(r.annotationId=n),r},e.is=function(e){let t=e;return t&&"create"===t.kind&&Ve.string(t.uri)&&(void 0===t.options||(void 0===t.options.overwrite||Ve.boolean(t.options.overwrite))&&(void 0===t.options.ignoreIfExists||Ve.boolean(t.options.ignoreIfExists)))&&(void 0===t.annotationId||P.is(t.annotationId))}}(N||(N={})),function(e){e.create=function(e,t,n,r){let i={kind:"rename",oldUri:e,newUri:t};return void 0!==n&&(void 0!==n.overwrite||void 0!==n.ignoreIfExists)&&(i.options=n),void 0!==r&&(i.annotationId=r),i},e.is=function(e){let t=e;return t&&"rename"===t.kind&&Ve.string(t.oldUri)&&Ve.string(t.newUri)&&(void 0===t.options||(void 0===t.options.overwrite||Ve.boolean(t.options.overwrite))&&(void 0===t.options.ignoreIfExists||Ve.boolean(t.options.ignoreIfExists)))&&(void 0===t.annotationId||P.is(t.annotationId))}}(U||(U={})),function(e){e.create=function(e,t,n){let r={kind:"delete",uri:e};return void 0!==t&&(void 0!==t.recursive||void 0!==t.ignoreIfNotExists)&&(r.options=t),void 0!==n&&(r.annotationId=n),r},e.is=function(e){let t=e;return t&&"delete"===t.kind&&Ve.string(t.uri)&&(void 0===t.options||(void 0===t.options.recursive||Ve.boolean(t.options.recursive))&&(void 0===t.options.ignoreIfNotExists||Ve.boolean(t.options.ignoreIfNotExists)))&&(void 0===t.annotationId||P.is(t.annotationId))}}(V||(V={})),function(e){e.is=function(e){let t=e;return t&&(void 0!==t.changes||void 0!==t.documentChanges)&&(void 0===t.documentChanges||t.documentChanges.every((e=>Ve.string(e.kind)?N.is(e)||U.is(e)||V.is(e):j.is(e))))}}(O||(O={})),function(e){e.create=function(e){return{uri:e}},e.is=function(e){let t=e;return Ve.defined(t)&&Ve.string(t.uri)}}(K||(K={})),function(e){e.create=function(e,t){return{uri:e,version:t}},e.is=function(e){let t=e;return Ve.defined(t)&&Ve.string(t.uri)&&Ve.integer(t.version)}}(W||(W={})),function(e){e.create=function(e,t){return{uri:e,version:t}},e.is=function(e){let t=e;return Ve.defined(t)&&Ve.string(t.uri)&&(null===t.version||Ve.integer(t.version))}}(H||(H={})),function(e){e.create=function(e,t,n,r){return{uri:e,languageId:t,version:n,text:r}},e.is=function(e){let t=e;return Ve.defined(t)&&Ve.string(t.uri)&&Ve.string(t.languageId)&&Ve.integer(t.version)&&Ve.string(t.text)}}(X||(X={})),function(e){e.PlainText="plaintext",e.Markdown="markdown",e.is=function(t){const n=t;return n===e.PlainText||n===e.Markdown}}(z||(z={})),function(e){e.is=function(e){const t=e;return Ve.objectLiteral(e)&&z.is(t.kind)&&Ve.string(t.value)}}($||($={})),function(e){e.Text=1,e.Method=2,e.Function=3,e.Constructor=4,e.Field=5,e.Variable=6,e.Class=7,e.Interface=8,e.Module=9,e.Property=10,e.Unit=11,e.Value=12,e.Enum=13,e.Keyword=14,e.Snippet=15,e.Color=16,e.File=17,e.Reference=18,e.Folder=19,e.EnumMember=20,e.Constant=21,e.Struct=22,e.Event=23,e.Operator=24,e.TypeParameter=25}(B||(B={})),function(e){e.PlainText=1,e.Snippet=2}(q||(q={})),function(e){e.Deprecated=1}(Q||(Q={})),function(e){e.create=function(e,t,n){return{newText:e,insert:t,replace:n}},e.is=function(e){const t=e;return t&&Ve.string(t.newText)&&b.is(t.insert)&&b.is(t.replace)}}(G||(G={})),function(e){e.asIs=1,e.adjustIndentation=2}(J||(J={})),function(e){e.is=function(e){const t=e;return t&&(Ve.string(t.detail)||void 0===t.detail)&&(Ve.string(t.description)||void 0===t.description)}}(Y||(Y={})),function(e){e.create=function(e){return{label:e}}}(Z||(Z={})),function(e){e.create=function(e,t){return{items:e||[],isIncomplete:!!t}}}(ee||(ee={})),function(e){e.fromPlainText=function(e){return e.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")},e.is=function(e){const t=e;return Ve.string(t)||Ve.objectLiteral(t)&&Ve.string(t.language)&&Ve.string(t.value)}}(te||(te={})),function(e){e.is=function(e){let t=e;return!!t&&Ve.objectLiteral(t)&&($.is(t.contents)||te.is(t.contents)||Ve.typedArray(t.contents,te.is))&&(void 0===e.range||b.is(e.range))}}(ne||(ne={})),function(e){e.create=function(e,t){return t?{label:e,documentation:t}:{label:e}}}(re||(re={})),function(e){e.create=function(e,t){let n={label:e};for(var r=arguments.length,i=new Array(r>2?r-2:0),o=2;o<r;o++)i[o-2]=arguments[o];return Ve.defined(t)&&(n.documentation=t),Ve.defined(i)?n.parameters=i:n.parameters=[],n}}(ie||(ie={})),function(e){e.Text=1,e.Read=2,e.Write=3}(oe||(oe={})),function(e){e.create=function(e,t){let n={range:e};return Ve.number(t)&&(n.kind=t),n}}(ae||(ae={})),function(e){e.File=1,e.Module=2,e.Namespace=3,e.Package=4,e.Class=5,e.Method=6,e.Property=7,e.Field=8,e.Constructor=9,e.Enum=10,e.Interface=11,e.Function=12,e.Variable=13,e.Constant=14,e.String=15,e.Number=16,e.Boolean=17,e.Array=18,e.Object=19,e.Key=20,e.Null=21,e.EnumMember=22,e.Struct=23,e.Event=24,e.Operator=25,e.TypeParameter=26}(se||(se={})),function(e){e.Deprecated=1}(ue||(ue={})),function(e){e.create=function(e,t,n,r,i){let o={name:e,kind:t,location:{uri:r,range:n}};return i&&(o.containerName=i),o}}(ce||(ce={})),function(e){e.create=function(e,t,n,r){return void 0!==r?{name:e,kind:t,location:{uri:n,range:r}}:{name:e,kind:t,location:{uri:n}}}}(de||(de={})),function(e){e.create=function(e,t,n,r,i,o){let a={name:e,detail:t,kind:n,range:r,selectionRange:i};return void 0!==o&&(a.children=o),a},e.is=function(e){let t=e;return t&&Ve.string(t.name)&&Ve.number(t.kind)&&b.is(t.range)&&b.is(t.selectionRange)&&(void 0===t.detail||Ve.string(t.detail))&&(void 0===t.deprecated||Ve.boolean(t.deprecated))&&(void 0===t.children||Array.isArray(t.children))&&(void 0===t.tags||Array.isArray(t.tags))}}(le||(le={})),function(e){e.Empty="",e.QuickFix="quickfix",e.Refactor="refactor",e.RefactorExtract="refactor.extract",e.RefactorInline="refactor.inline",e.RefactorRewrite="refactor.rewrite",e.Source="source",e.SourceOrganizeImports="source.organizeImports",e.SourceFixAll="source.fixAll"}(ge||(ge={})),function(e){e.Invoked=1,e.Automatic=2}(fe||(fe={})),function(e){e.create=function(e,t,n){let r={diagnostics:e};return null!=t&&(r.only=t),null!=n&&(r.triggerKind=n),r},e.is=function(e){let t=e;return Ve.defined(t)&&Ve.typedArray(t.diagnostics,L.is)&&(void 0===t.only||Ve.typedArray(t.only,Ve.string))&&(void 0===t.triggerKind||t.triggerKind===fe.Invoked||t.triggerKind===fe.Automatic)}}(he||(he={})),function(e){e.create=function(e,t,n){let r={title:e},i=!0;return"string"==typeof t?(i=!1,r.kind=t):T.is(t)?r.command=t:r.edit=t,i&&void 0!==n&&(r.kind=n),r},e.is=function(e){let t=e;return t&&Ve.string(t.title)&&(void 0===t.diagnostics||Ve.typedArray(t.diagnostics,L.is))&&(void 0===t.kind||Ve.string(t.kind))&&(void 0!==t.edit||void 0!==t.command)&&(void 0===t.command||T.is(t.command))&&(void 0===t.isPreferred||Ve.boolean(t.isPreferred))&&(void 0===t.edit||O.is(t.edit))}}(pe||(pe={})),function(e){e.create=function(e,t){let n={range:e};return Ve.defined(t)&&(n.data=t),n},e.is=function(e){let t=e;return Ve.defined(t)&&b.is(t.range)&&(Ve.undefined(t.command)||T.is(t.command))}}(me||(me={})),function(e){e.create=function(e,t){return{tabSize:e,insertSpaces:t}},e.is=function(e){let t=e;return Ve.defined(t)&&Ve.uinteger(t.tabSize)&&Ve.boolean(t.insertSpaces)}}(ve||(ve={})),function(e){e.create=function(e,t,n){return{range:e,target:t,data:n}},e.is=function(e){let t=e;return Ve.defined(t)&&b.is(t.range)&&(Ve.undefined(t.target)||Ve.string(t.target))}}(be||(be={})),function(e){e.create=function(e,t){return{range:e,parent:t}},e.is=function(t){let n=t;return Ve.objectLiteral(n)&&b.is(n.range)&&(void 0===n.parent||e.is(n.parent))}}(_e||(_e={})),function(e){e.namespace="namespace",e.type="type",e.class="class",e.enum="enum",e.interface="interface",e.struct="struct",e.typeParameter="typeParameter",e.parameter="parameter",e.variable="variable",e.property="property",e.enumMember="enumMember",e.event="event",e.function="function",e.method="method",e.macro="macro",e.keyword="keyword",e.modifier="modifier",e.comment="comment",e.string="string",e.number="number",e.regexp="regexp",e.operator="operator",e.decorator="decorator"}(ke||(ke={})),function(e){e.declaration="declaration",e.definition="definition",e.readonly="readonly",e.static="static",e.deprecated="deprecated",e.abstract="abstract",e.async="async",e.modification="modification",e.documentation="documentation",e.defaultLibrary="defaultLibrary"}(ye||(ye={})),function(e){e.is=function(e){const t=e;return Ve.objectLiteral(t)&&(void 0===t.resultId||"string"==typeof t.resultId)&&Array.isArray(t.data)&&(0===t.data.length||"number"==typeof t.data[0])}}(we||(we={})),function(e){e.create=function(e,t){return{range:e,text:t}},e.is=function(e){const t=e;return null!=t&&b.is(t.range)&&Ve.string(t.text)}}(xe||(xe={})),function(e){e.create=function(e,t,n){return{range:e,variableName:t,caseSensitiveLookup:n}},e.is=function(e){const t=e;return null!=t&&b.is(t.range)&&Ve.boolean(t.caseSensitiveLookup)&&(Ve.string(t.variableName)||void 0===t.variableName)}}(Ie||(Ie={})),function(e){e.create=function(e,t){return{range:e,expression:t}},e.is=function(e){const t=e;return null!=t&&b.is(t.range)&&(Ve.string(t.expression)||void 0===t.expression)}}(Ee||(Ee={})),function(e){e.create=function(e,t){return{frameId:e,stoppedLocation:t}},e.is=function(e){const t=e;return Ve.defined(t)&&b.is(e.stoppedLocation)}}(Ae||(Ae={})),function(e){e.Type=1,e.Parameter=2,e.is=function(e){return 1===e||2===e}}(Ce||(Ce={})),function(e){e.create=function(e){return{value:e}},e.is=function(e){const t=e;return Ve.objectLiteral(t)&&(void 0===t.tooltip||Ve.string(t.tooltip)||$.is(t.tooltip))&&(void 0===t.location||_.is(t.location))&&(void 0===t.command||T.is(t.command))}}(Se||(Se={})),function(e){e.create=function(e,t,n){const r={position:e,label:t};return void 0!==n&&(r.kind=n),r},e.is=function(e){const t=e;return Ve.objectLiteral(t)&&v.is(t.position)&&(Ve.string(t.label)||Ve.typedArray(t.label,Se.is))&&(void 0===t.kind||Ce.is(t.kind))&&void 0===t.textEdits||Ve.typedArray(t.textEdits,M.is)&&(void 0===t.tooltip||Ve.string(t.tooltip)||$.is(t.tooltip))&&(void 0===t.paddingLeft||Ve.boolean(t.paddingLeft))&&(void 0===t.paddingRight||Ve.boolean(t.paddingRight))}}(Re||(Re={})),function(e){e.createSnippet=function(e){return{kind:"snippet",value:e}}}(Le||(Le={})),function(e){e.create=function(e,t,n,r){return{insertText:e,filterText:t,range:n,command:r}}}(Te||(Te={})),function(e){e.create=function(e){return{items:e}}}(Me||(Me={})),function(e){e.Invoked=0,e.Automatic=1}(De||(De={})),function(e){e.create=function(e,t){return{range:e,text:t}}}(Pe||(Pe={})),function(e){e.create=function(e,t){return{triggerKind:e,selectedCompletionInfo:t}}}(Fe||(Fe={})),function(e){e.is=function(e){const t=e;return Ve.objectLiteral(t)&&h.is(t.uri)&&Ve.string(t.name)}}(je||(je={})),function(e){function t(e,n){if(e.length<=1)return e;const r=e.length/2|0,i=e.slice(0,r),o=e.slice(r);t(i,n),t(o,n);let a=0,s=0,u=0;for(;a<i.length&&s<o.length;)n(i[a],o[s])<=0?e[u++]=i[a++]:e[u++]=o[s++];for(;a<i.length;)e[u++]=i[a++];for(;s<o.length;)e[u++]=o[s++];return e}e.create=function(e,t,n,r){return new Oe(e,t,n,r)},e.is=function(e){let t=e;return!!(Ve.defined(t)&&Ve.string(t.uri)&&(Ve.undefined(t.languageId)||Ve.string(t.languageId))&&Ve.uinteger(t.lineCount)&&Ve.func(t.getText)&&Ve.func(t.positionAt)&&Ve.func(t.offsetAt))},e.applyEdits=function(e,n){let r=e.getText(),i=t(n,((e,t)=>{let n=e.range.start.line-t.range.start.line;return 0===n?e.range.start.character-t.range.start.character:n})),o=r.length;for(let t=i.length-1;t>=0;t--){let n=i[t],a=e.offsetAt(n.range.start),s=e.offsetAt(n.range.end);if(!(s<=o))throw new Error("Overlapping edit");r=r.substring(0,a)+n.newText+r.substring(s,r.length),o=a}return r}}(Ne||(Ne={}));var Ve,Oe=class{constructor(e,t,n,r){this._uri=e,this._languageId=t,this._version=n,this._content=r,this._lineOffsets=void 0}get uri(){return this._uri}get languageId(){return this._languageId}get version(){return this._version}getText(e){if(e){let t=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(t,n)}return this._content}update(e,t){this._content=e.text,this._version=t,this._lineOffsets=void 0}getLineOffsets(){if(void 0===this._lineOffsets){let e=[],t=this._content,n=!0;for(let r=0;r<t.length;r++){n&&(e.push(r),n=!1);let i=t.charAt(r);n="\r"===i||"\n"===i,"\r"===i&&r+1<t.length&&"\n"===t.charAt(r+1)&&r++}n&&t.length>0&&e.push(t.length),this._lineOffsets=e}return this._lineOffsets}positionAt(e){e=Math.max(Math.min(e,this._content.length),0);let t=this.getLineOffsets(),n=0,r=t.length;if(0===r)return v.create(0,e);for(;n<r;){let i=Math.floor((n+r)/2);t[i]>e?r=i:n=i+1}let i=n-1;return v.create(i,e-t[i])}offsetAt(e){let t=this.getLineOffsets();if(e.line>=t.length)return this._content.length;if(e.line<0)return 0;let n=t[e.line],r=e.line+1<t.length?t[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,r),n)}get lineCount(){return this.getLineOffsets().length}};!function(e){const t=Object.prototype.toString;e.defined=function(e){return typeof e<"u"},e.undefined=function(e){return typeof e>"u"},e.boolean=function(e){return!0===e||!1===e},e.string=function(e){return"[object String]"===t.call(e)},e.number=function(e){return"[object Number]"===t.call(e)},e.numberRange=function(e,n,r){return"[object Number]"===t.call(e)&&n<=e&&e<=r},e.integer=function(e){return"[object Number]"===t.call(e)&&-2147483648<=e&&e<=2147483647},e.uinteger=function(e){return"[object Number]"===t.call(e)&&0<=e&&e<=2147483647},e.func=function(e){return"[object Function]"===t.call(e)},e.objectLiteral=function(e){return null!==e&&"object"==typeof e},e.typedArray=function(e,t){return Array.isArray(e)&&e.every(t)}}(Ve||(Ve={}));var Ke=class{constructor(e,t,n){this._languageId=e,this._worker=t,this._disposables=[],this._listener=Object.create(null);const r=e=>{let t,n=e.getLanguageId();n===this._languageId&&(this._listener[e.uri.toString()]=e.onDidChangeContent((()=>{window.clearTimeout(t),t=window.setTimeout((()=>this._doValidate(e.uri,n)),500)})),this._doValidate(e.uri,n))},i=e=>{g.editor.setModelMarkers(e,this._languageId,[]);let t=e.uri.toString(),n=this._listener[t];n&&(n.dispose(),delete this._listener[t])};this._disposables.push(g.editor.onDidCreateModel(r)),this._disposables.push(g.editor.onWillDisposeModel(i)),this._disposables.push(g.editor.onDidChangeModelLanguage((e=>{i(e.model),r(e.model)}))),this._disposables.push(n((e=>{g.editor.getModels().forEach((e=>{e.getLanguageId()===this._languageId&&(i(e),r(e))}))}))),this._disposables.push({dispose:()=>{g.editor.getModels().forEach(i);for(let e in this._listener)this._listener[e].dispose()}}),g.editor.getModels().forEach(r)}dispose(){this._disposables.forEach((e=>e&&e.dispose())),this._disposables.length=0}_doValidate(e,t){this._worker(e).then((t=>t.doValidation(e.toString()))).then((n=>{const r=n.map((e=>function(e,t){let n="number"==typeof t.code?String(t.code):t.code;return{severity:We(t.severity),startLineNumber:t.range.start.line+1,startColumn:t.range.start.character+1,endLineNumber:t.range.end.line+1,endColumn:t.range.end.character+1,message:t.message,code:n,source:t.source}}(0,e)));let i=g.editor.getModel(e);i&&i.getLanguageId()===t&&g.editor.setModelMarkers(i,t,r)})).then(void 0,(e=>{console.error(e)}))}};function We(e){switch(e){case C.Error:return g.MarkerSeverity.Error;case C.Warning:return g.MarkerSeverity.Warning;case C.Information:return g.MarkerSeverity.Info;case C.Hint:return g.MarkerSeverity.Hint;default:return g.MarkerSeverity.Info}}var He=class{constructor(e,t){this._worker=e,this._triggerCharacters=t}get triggerCharacters(){return this._triggerCharacters}provideCompletionItems(e,t,n,r){const i=e.uri;return this._worker(i).then((e=>e.doComplete(i.toString(),Xe(t)))).then((n=>{if(!n)return;const r=e.getWordUntilPosition(t),i=new g.Range(t.lineNumber,r.startColumn,t.lineNumber,r.endColumn),o=n.items.map((e=>{const t={label:e.label,insertText:e.insertText||e.label,sortText:e.sortText,filterText:e.filterText,documentation:e.documentation,detail:e.detail,command:Qe(e.command),range:i,kind:Be(e.kind)};return e.textEdit&&(function(e){return typeof e.insert<"u"&&typeof e.replace<"u"}(e.textEdit)?t.range={insert:$e(e.textEdit.insert),replace:$e(e.textEdit.replace)}:t.range=$e(e.textEdit.range),t.insertText=e.textEdit.newText),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(qe)),e.insertTextFormat===q.Snippet&&(t.insertTextRules=g.languages.CompletionItemInsertTextRule.InsertAsSnippet),t}));return{isIncomplete:n.isIncomplete,suggestions:o}}))}};function Xe(e){if(e)return{character:e.column-1,line:e.lineNumber-1}}function ze(e){if(e)return{start:{line:e.startLineNumber-1,character:e.startColumn-1},end:{line:e.endLineNumber-1,character:e.endColumn-1}}}function $e(e){if(e)return new g.Range(e.start.line+1,e.start.character+1,e.end.line+1,e.end.character+1)}function Be(e){const t=g.languages.CompletionItemKind;switch(e){case B.Text:return t.Text;case B.Method:return t.Method;case B.Function:return t.Function;case B.Constructor:return t.Constructor;case B.Field:return t.Field;case B.Variable:return t.Variable;case B.Class:return t.Class;case B.Interface:return t.Interface;case B.Module:return t.Module;case B.Property:return t.Property;case B.Unit:return t.Unit;case B.Value:return t.Value;case B.Enum:return t.Enum;case B.Keyword:return t.Keyword;case B.Snippet:return t.Snippet;case B.Color:return t.Color;case B.File:return t.File;case B.Reference:return t.Reference}return t.Property}function qe(e){if(e)return{range:$e(e.range),text:e.newText}}function Qe(e){return e&&"editor.action.triggerSuggest"===e.command?{id:e.command,title:e.title,arguments:e.arguments}:void 0}var Ge=class{constructor(e){this._worker=e}provideHover(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.doHover(r.toString(),Xe(t)))).then((e=>{if(e)return{range:$e(e.range),contents:Ye(e.contents)}}))}};function Je(e){return"string"==typeof e?{value:e}:function(e){return e&&"object"==typeof e&&"string"==typeof e.kind}(e)?"plaintext"===e.kind?{value:e.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:e.value}:{value:"```"+e.language+"\n"+e.value+"\n```\n"}}function Ye(e){if(e)return Array.isArray(e)?e.map(Je):[Je(e)]}var Ze=class{constructor(e){this._worker=e}provideDocumentHighlights(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.findDocumentHighlights(r.toString(),Xe(t)))).then((e=>{if(e)return e.map((e=>({range:$e(e.range),kind:et(e.kind)})))}))}};function et(e){switch(e){case oe.Read:return g.languages.DocumentHighlightKind.Read;case oe.Write:return g.languages.DocumentHighlightKind.Write;case oe.Text:return g.languages.DocumentHighlightKind.Text}return g.languages.DocumentHighlightKind.Text}var tt=class{constructor(e){this._worker=e}provideDefinition(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.findDefinition(r.toString(),Xe(t)))).then((e=>{if(e)return[nt(e)]}))}};function nt(e){return{uri:g.Uri.parse(e.uri),range:$e(e.range)}}var rt=class{constructor(e){this._worker=e}provideReferences(e,t,n,r){const i=e.uri;return this._worker(i).then((e=>e.findReferences(i.toString(),Xe(t)))).then((e=>{if(e)return e.map(nt)}))}},it=class{constructor(e){this._worker=e}provideRenameEdits(e,t,n,r){const i=e.uri;return this._worker(i).then((e=>e.doRename(i.toString(),Xe(t),n))).then((e=>function(e){if(!e||!e.changes)return;let t=[];for(let n in e.changes){const r=g.Uri.parse(n);for(let i of e.changes[n])t.push({resource:r,versionId:void 0,textEdit:{range:$e(i.range),text:i.newText}})}return{edits:t}}(e)))}};var ot=class{constructor(e){this._worker=e}provideDocumentSymbols(e,t){const n=e.uri;return this._worker(n).then((e=>e.findDocumentSymbols(n.toString()))).then((e=>{if(e)return e.map((e=>function(e){return"children"in e}(e)?at(e):{name:e.name,detail:"",containerName:e.containerName,kind:st(e.kind),range:$e(e.location.range),selectionRange:$e(e.location.range),tags:[]}))}))}};function at(e){return{name:e.name,detail:e.detail??"",kind:st(e.kind),range:$e(e.range),selectionRange:$e(e.selectionRange),tags:e.tags??[],children:(e.children??[]).map((e=>at(e)))}}function st(e){let t=g.languages.SymbolKind;switch(e){case se.File:return t.File;case se.Module:return t.Module;case se.Namespace:return t.Namespace;case se.Package:return t.Package;case se.Class:return t.Class;case se.Method:return t.Method;case se.Property:return t.Property;case se.Field:return t.Field;case se.Constructor:return t.Constructor;case se.Enum:return t.Enum;case se.Interface:return t.Interface;case se.Function:return t.Function;case se.Variable:return t.Variable;case se.Constant:return t.Constant;case se.String:return t.String;case se.Number:return t.Number;case se.Boolean:return t.Boolean;case se.Array:return t.Array}return t.Function}var ut=class{constructor(e){this._worker=e}provideLinks(e,t){const n=e.uri;return this._worker(n).then((e=>e.findDocumentLinks(n.toString()))).then((e=>{if(e)return{links:e.map((e=>({range:$e(e.range),url:e.target})))}}))}},ct=class{constructor(e){this._worker=e}provideDocumentFormattingEdits(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.format(r.toString(),null,lt(t)).then((e=>{if(e&&0!==e.length)return e.map(qe)}))))}},dt=class{constructor(e){this._worker=e,this.canFormatMultipleRanges=!1}provideDocumentRangeFormattingEdits(e,t,n,r){const i=e.uri;return this._worker(i).then((e=>e.format(i.toString(),ze(t),lt(n)).then((e=>{if(e&&0!==e.length)return e.map(qe)}))))}};function lt(e){return{tabSize:e.tabSize,insertSpaces:e.insertSpaces}}var gt=class{constructor(e){this._worker=e}provideDocumentColors(e,t){const n=e.uri;return this._worker(n).then((e=>e.findDocumentColors(n.toString()))).then((e=>{if(e)return e.map((e=>({color:e.color,range:$e(e.range)})))}))}provideColorPresentations(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.getColorPresentations(r.toString(),t.color,ze(t.range)))).then((e=>{if(e)return e.map((e=>{let t={label:e.label};return e.textEdit&&(t.textEdit=qe(e.textEdit)),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(qe)),t}))}))}},ft=class{constructor(e){this._worker=e}provideFoldingRanges(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.getFoldingRanges(r.toString(),t))).then((e=>{if(e)return e.map((e=>{const t={start:e.startLine+1,end:e.endLine+1};return typeof e.kind<"u"&&(t.kind=function(e){switch(e){case I.Comment:return g.languages.FoldingRangeKind.Comment;case I.Imports:return g.languages.FoldingRangeKind.Imports;case I.Region:return g.languages.FoldingRangeKind.Region}}(e.kind)),t}))}))}};var ht=class{constructor(e){this._worker=e}provideSelectionRanges(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.getSelectionRanges(r.toString(),t.map(Xe)))).then((e=>{if(e)return e.map((e=>{const t=[];for(;e;)t.push({range:$e(e.range)}),e=e.parent;return t}))}))}};function pt(e){const t=[],n=[],r=new Ue(e);t.push(r);const i=function(){return r.getLanguageServiceWorker(...arguments)};return function(){const{languageId:t,modeConfiguration:r}=e;vt(n),r.completionItems&&n.push(g.languages.registerCompletionItemProvider(t,new He(i,["/","-",":"]))),r.hovers&&n.push(g.languages.registerHoverProvider(t,new Ge(i))),r.documentHighlights&&n.push(g.languages.registerDocumentHighlightProvider(t,new Ze(i))),r.definitions&&n.push(g.languages.registerDefinitionProvider(t,new tt(i))),r.references&&n.push(g.languages.registerReferenceProvider(t,new rt(i))),r.documentSymbols&&n.push(g.languages.registerDocumentSymbolProvider(t,new ot(i))),r.rename&&n.push(g.languages.registerRenameProvider(t,new it(i))),r.colors&&n.push(g.languages.registerColorProvider(t,new gt(i))),r.foldingRanges&&n.push(g.languages.registerFoldingRangeProvider(t,new ft(i))),r.diagnostics&&n.push(new Ke(t,i,e.onDidChange)),r.selectionRanges&&n.push(g.languages.registerSelectionRangeProvider(t,new ht(i))),r.documentFormattingEdits&&n.push(g.languages.registerDocumentFormattingEditProvider(t,new ct(i))),r.documentRangeFormattingEdits&&n.push(g.languages.registerDocumentRangeFormattingEditProvider(t,new dt(i)))}(),t.push(mt(n)),mt(t)}function mt(e){return{dispose:()=>vt(e)}}function vt(e){for(;e.length;)e.pop().dispose()}}}]);