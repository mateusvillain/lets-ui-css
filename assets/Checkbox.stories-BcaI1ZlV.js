/* empty css               */const b={title:"Components/Checkbox",argTypes:{label:{control:"text"},checked:{control:"boolean"},disabled:{control:"boolean"},size:{control:{type:"select"},options:["lg","md"]}}},c=({label:n,checked:o,disabled:r,size:l})=>`
    <label class="checkbox ${l?`checkbox--${l}`:""}">
      <input type="checkbox" ${o?"checked":""} ${r?"disabled":""}>
      <span>${n||""}</span>
    </label>
  `,e=c.bind({});e.args={label:"Checkbox label",checked:!1,disabled:!1,size:"lg"};const s=c.bind({});s.args={label:"Label",checked:!1,disabled:!1,size:"md"};const a=c.bind({});a.args={label:"Label",checked:!0,disabled:!0,size:"lg"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  label,
  checked,
  disabled,
  size
}) => {
  const sizeClass = size ? \`checkbox--\${size}\` : '';
  return \`
    <label class="checkbox \${sizeClass}">
      <input type="checkbox" \${checked ? 'checked' : ''} \${disabled ? 'disabled' : ''}>
      <span>\${label || ''}</span>
    </label>
  \`;
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`({
  label,
  checked,
  disabled,
  size
}) => {
  const sizeClass = size ? \`checkbox--\${size}\` : '';
  return \`
    <label class="checkbox \${sizeClass}">
      <input type="checkbox" \${checked ? 'checked' : ''} \${disabled ? 'disabled' : ''}>
      <span>\${label || ''}</span>
    </label>
  \`;
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`({
  label,
  checked,
  disabled,
  size
}) => {
  const sizeClass = size ? \`checkbox--\${size}\` : '';
  return \`
    <label class="checkbox \${sizeClass}">
      <input type="checkbox" \${checked ? 'checked' : ''} \${disabled ? 'disabled' : ''}>
      <span>\${label || ''}</span>
    </label>
  \`;
}`,...a.parameters?.docs?.source}}};const d=["Checkbox","Small","Disabled"],p=Object.freeze(Object.defineProperty({__proto__:null,Checkbox:e,Disabled:a,Small:s,__namedExportsOrder:d,default:b},Symbol.toStringTag,{value:"Module"}));export{p as C,a as D,s as S,e as a};
