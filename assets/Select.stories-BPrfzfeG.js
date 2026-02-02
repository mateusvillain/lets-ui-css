/* empty css               */const m={title:"Components/Select",argTypes:{label:{control:"text"},options:{control:"text"},selected:{control:"number"},disabled:{control:"boolean"},size:{control:{type:"select"},options:["lg","md"]}}},n=({label:l,options:i="Option 1,Option 2",selected:a=0,disabled:p,size:r="lg"})=>{const c=i.split(",").map(t=>t.trim()).filter(Boolean).map((t,d)=>`<option ${d===Number(a)?"selected":""}>${t}</option>`).join("");return`
    <div class="form__group ${`form__${r}`}">
      <label>${l||""}</label>
      <select ${p?"disabled":""}>
        ${c}
      </select>
    </div>
  `},e=n.bind({});e.args={label:"Choose an option",options:"Option 1,Option 2,Option 3",selected:0,disabled:!1,size:"lg"};const o=n.bind({});o.args={label:"Label",options:"Option 1,Option 2,Option 3",selected:0,disabled:!1,size:"md"};const s=n.bind({});s.args={label:"Label",options:"Option 1,Option 2,Option 3",selected:0,disabled:!0,size:"md"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  label,
  options = 'Option 1,Option 2',
  selected = 0,
  disabled,
  size = 'lg'
}) => {
  const opts = options.split(',').map(o => o.trim()).filter(Boolean);
  const optionsHtml = opts.map((opt, i) => \`<option \${i === Number(selected) ? 'selected' : ''}>\${opt}</option>\`).join('');
  const sizeClass = \`form__\${size}\`;
  return \`
    <div class="form__group \${sizeClass}">
      <label>\${label || ''}</label>
      <select \${disabled ? 'disabled' : ''}>
        \${optionsHtml}
      </select>
    </div>
  \`;
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
  label,
  options = 'Option 1,Option 2',
  selected = 0,
  disabled,
  size = 'lg'
}) => {
  const opts = options.split(',').map(o => o.trim()).filter(Boolean);
  const optionsHtml = opts.map((opt, i) => \`<option \${i === Number(selected) ? 'selected' : ''}>\${opt}</option>\`).join('');
  const sizeClass = \`form__\${size}\`;
  return \`
    <div class="form__group \${sizeClass}">
      <label>\${label || ''}</label>
      <select \${disabled ? 'disabled' : ''}>
        \${optionsHtml}
      </select>
    </div>
  \`;
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`({
  label,
  options = 'Option 1,Option 2',
  selected = 0,
  disabled,
  size = 'lg'
}) => {
  const opts = options.split(',').map(o => o.trim()).filter(Boolean);
  const optionsHtml = opts.map((opt, i) => \`<option \${i === Number(selected) ? 'selected' : ''}>\${opt}</option>\`).join('');
  const sizeClass = \`form__\${size}\`;
  return \`
    <div class="form__group \${sizeClass}">
      <label>\${label || ''}</label>
      <select \${disabled ? 'disabled' : ''}>
        \${optionsHtml}
      </select>
    </div>
  \`;
}`,...s.parameters?.docs?.source}}};const b=["Select","Small","Disabled"],O=Object.freeze(Object.defineProperty({__proto__:null,Disabled:s,Select:e,Small:o,__namedExportsOrder:b,default:m},Symbol.toStringTag,{value:"Module"}));export{s as D,O as S,e as a,o as b};
