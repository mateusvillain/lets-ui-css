/* empty css               */const l={title:"Components/Button",argTypes:{label:{control:"text"},variant:{control:{type:"select"},options:["primary","secondary","danger","success"]},size:{control:{type:"select"},options:["lg","md"]},disabled:{control:"boolean"}}},u=({label:c,variant:r,size:a,disabled:b})=>`
    <button class="${["btn",r&&`btn--${r}`,a&&`btn--${a}`].filter(Boolean).join(" ")}" ${b?"disabled":""}>
      ${c}
    </button>
  `,t=u.bind({});t.args={label:"Botão",variant:"primary",size:"lg",disabled:!1};const n=()=>`
  <button class="btn btn--primary btn--lg">Secondary Button</button>
`,s=()=>`
  <button class="btn btn--secondary btn--lg">Secondary Button</button>
`,e=()=>`
  <button class="btn btn--danger btn--lg">Danger Button</button>
`,o=()=>`
  <button class="btn btn--success btn--lg">Success Button</button>
`;t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  label,
  variant,
  size,
  disabled
}) => {
  const classes = ['btn', variant && \`btn--\${variant}\`, size && \`btn--\${size}\`].filter(Boolean).join(' ');
  return \`
    <button class="\${classes}" \${disabled ? 'disabled' : ''}>
      \${label}
    </button>
  \`;
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:'() => `\n  <button class="btn btn--primary btn--lg">Secondary Button</button>\n`',...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:'() => `\n  <button class="btn btn--secondary btn--lg">Secondary Button</button>\n`',...s.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:'() => `\n  <button class="btn btn--danger btn--lg">Danger Button</button>\n`',...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:'() => `\n  <button class="btn btn--success btn--lg">Success Button</button>\n`',...o.parameters?.docs?.source}}};const d=["Button","Primary","Secondary","Danger","Success"],m=Object.freeze(Object.defineProperty({__proto__:null,Button:t,Danger:e,Primary:n,Secondary:s,Success:o,__namedExportsOrder:d,default:l},Symbol.toStringTag,{value:"Module"}));export{m as B,n as P,s as S,t as a};
