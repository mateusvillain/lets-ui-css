/* empty css               */const r={title:"Components/Breadcrumb",argTypes:{label:{control:"text"}}},s=({label:e})=>`
    <ul class="breadcrumb">
      <li><a class="link">Item 1</a></li>
      <li><a class="link">Item 2</a></li>
      <li><a class="link">Item 3</a></li>
      <li>${e}</li>
    </ul>
  `,a=s.bind({});a.args={label:"Page"};const l=()=>`
  <ul class="breadcrumb">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
    <li><a>Item 4</a></li>
  </ul>
`;a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`({
  label
}) => {
  return \`
    <ul class="breadcrumb">
      <li><a class="link">Item 1</a></li>
      <li><a class="link">Item 2</a></li>
      <li><a class="link">Item 3</a></li>
      <li>\${label}</li>
    </ul>
  \`;
}`,...a.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => \`
  <ul class="breadcrumb">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
    <li><a>Item 4</a></li>
  </ul>
\``,...l.parameters?.docs?.source}}};const i=["Breadcrumb","Primary"],n=Object.freeze(Object.defineProperty({__proto__:null,Breadcrumb:a,Primary:l,__namedExportsOrder:i,default:r},Symbol.toStringTag,{value:"Module"}));export{n as B,a};
