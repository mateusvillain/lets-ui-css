/* empty css               */const h={title:"Components/Switch",argTypes:{label:{control:"text"},checked:{control:"boolean"},disabled:{control:"boolean"},size:{control:{type:"select"},options:["lg","md"]}}},n=({label:t,checked:d,disabled:r,size:i})=>`
    <label class="switch ${i?`switch--${i}`:""}">
      <input type="checkbox" class="switch-input" ${d?"checked":""} ${r?"disabled":""}>
      <span>${t||""}</span>
    </label>
  `,e=n.bind({});e.args={label:"Switch label",checked:!1,disabled:!1,size:"lg"};const s=n.bind({});s.args={label:"Small Switch",checked:!1,disabled:!1,size:"md"};const a=n.bind({});a.args={label:"Checked Switch",checked:!0,disabled:!1,size:"lg"};const c=n.bind({});c.args={label:"Disabled Switch",checked:!1,disabled:!0,size:"lg"};const l=n.bind({});l.args={label:"Disabled Checked",checked:!0,disabled:!0,size:"lg"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  label,
  checked,
  disabled,
  size
}) => {
  const sizeClass = size ? \`switch--\${size}\` : '';
  return \`
    <label class="switch \${sizeClass}">
      <input type="checkbox" class="switch-input" \${checked ? 'checked' : ''} \${disabled ? 'disabled' : ''}>
      <span>\${label || ''}</span>
    </label>
  \`;
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`({
  label,
  checked,
  disabled,
  size
}) => {
  const sizeClass = size ? \`switch--\${size}\` : '';
  return \`
    <label class="switch \${sizeClass}">
      <input type="checkbox" class="switch-input" \${checked ? 'checked' : ''} \${disabled ? 'disabled' : ''}>
      <span>\${label || ''}</span>
    </label>
  \`;
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`({
  label,
  checked,
  disabled,
  size
}) => {
  const sizeClass = size ? \`switch--\${size}\` : '';
  return \`
    <label class="switch \${sizeClass}">
      <input type="checkbox" class="switch-input" \${checked ? 'checked' : ''} \${disabled ? 'disabled' : ''}>
      <span>\${label || ''}</span>
    </label>
  \`;
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`({
  label,
  checked,
  disabled,
  size
}) => {
  const sizeClass = size ? \`switch--\${size}\` : '';
  return \`
    <label class="switch \${sizeClass}">
      <input type="checkbox" class="switch-input" \${checked ? 'checked' : ''} \${disabled ? 'disabled' : ''}>
      <span>\${label || ''}</span>
    </label>
  \`;
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`({
  label,
  checked,
  disabled,
  size
}) => {
  const sizeClass = size ? \`switch--\${size}\` : '';
  return \`
    <label class="switch \${sizeClass}">
      <input type="checkbox" class="switch-input" \${checked ? 'checked' : ''} \${disabled ? 'disabled' : ''}>
      <span>\${label || ''}</span>
    </label>
  \`;
}`,...l.parameters?.docs?.source}}};const p=["Default","Small","Checked","Disabled","DisabledChecked"];export{a as Checked,e as Default,c as Disabled,l as DisabledChecked,s as Small,p as __namedExportsOrder,h as default};
