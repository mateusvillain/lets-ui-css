/* empty css               */const p={title:"Components/Tag",tags:["autodocs"],argTypes:{label:{control:"text"},style:{control:{type:"select"},options:["surface","container"]},variant:{control:{type:"select"},options:["primary","caution","danger","success","neutral"]},size:{control:{type:"select"},options:["lg","md","sm"]}}},s=({label:d,style:o,variant:u,size:c})=>`
    <div class="${[o&&`tag--${o}-${u}`,c&&`tag--${c}`].filter(Boolean).join(" ")}">${d}</div>
  `,e=s.bind({});e.args={label:"Tag",style:"surface",variant:"primary",size:"md"};const a=s.bind({});a.args={label:"Tag",style:"surface",variant:"caution",size:"md"};const r=s.bind({});r.args={label:"Tag",style:"surface",variant:"danger",size:"md"};const n=s.bind({});n.args={label:"Tag",style:"surface",variant:"success",size:"md"};const t=s.bind({});t.args={label:"Tag",style:"surface",variant:"neutral",size:"md"};const l=s.bind({});l.args={label:"Tag",style:"surface",variant:"primary",size:"lg"};const i=s.bind({});i.args={label:"Tag",style:"surface",variant:"primary",size:"md"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  label,
  style,
  variant,
  size
}) => {
  const classes = [style && \`tag--\${style}-\${variant}\`, size && \`tag--\${size}\`].filter(Boolean).join(' ');
  return \`
    <div class="\${classes}">\${label}</div>
  \`;
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`({
  label,
  style,
  variant,
  size
}) => {
  const classes = [style && \`tag--\${style}-\${variant}\`, size && \`tag--\${size}\`].filter(Boolean).join(' ');
  return \`
    <div class="\${classes}">\${label}</div>
  \`;
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`({
  label,
  style,
  variant,
  size
}) => {
  const classes = [style && \`tag--\${style}-\${variant}\`, size && \`tag--\${size}\`].filter(Boolean).join(' ');
  return \`
    <div class="\${classes}">\${label}</div>
  \`;
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`({
  label,
  style,
  variant,
  size
}) => {
  const classes = [style && \`tag--\${style}-\${variant}\`, size && \`tag--\${size}\`].filter(Boolean).join(' ');
  return \`
    <div class="\${classes}">\${label}</div>
  \`;
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  label,
  style,
  variant,
  size
}) => {
  const classes = [style && \`tag--\${style}-\${variant}\`, size && \`tag--\${size}\`].filter(Boolean).join(' ');
  return \`
    <div class="\${classes}">\${label}</div>
  \`;
}`,...t.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`({
  label,
  style,
  variant,
  size
}) => {
  const classes = [style && \`tag--\${style}-\${variant}\`, size && \`tag--\${size}\`].filter(Boolean).join(' ');
  return \`
    <div class="\${classes}">\${label}</div>
  \`;
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`({
  label,
  style,
  variant,
  size
}) => {
  const classes = [style && \`tag--\${style}-\${variant}\`, size && \`tag--\${size}\`].filter(Boolean).join(' ');
  return \`
    <div class="\${classes}">\${label}</div>
  \`;
}`,...i.parameters?.docs?.source}}};const $=["Primary","Caution","Danger","Success","Neutral","SizeLg","SizeMd"];export{a as Caution,r as Danger,t as Neutral,e as Primary,l as SizeLg,i as SizeMd,n as Success,$ as __namedExportsOrder,p as default};
