/* empty css               */const r={title:"Components/Text Field",argTypes:{label:{control:"text"},placeholder:{control:"text"}}},o=({label:l,placeholder:t})=>`
    <div class="form-group">
      <label>${l}</label>
      <input type="text" class="form-size-lg" placeholder="${t}">
    </div>
  `,e=o.bind({});e.args={label:"Name",placeholder:"Type here"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  label,
  placeholder
}) => {
  return \`
    <div class="form-group">
      <label>\${label}</label>
      <input type="text" class="form-size-lg" placeholder="\${placeholder}">
    </div>
  \`;
}`,...e.parameters?.docs?.source}}};const a=["TextField"],n=Object.freeze(Object.defineProperty({__proto__:null,TextField:e,__namedExportsOrder:a,default:r},Symbol.toStringTag,{value:"Module"}));export{n as T,e as a};
