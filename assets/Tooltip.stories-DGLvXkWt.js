/* empty css               */const i={title:"Components/Tooltip",argTypes:{position:{control:{type:"select"},options:["top","bottom","left","right"]},text:{control:"text"}}},r=({position:e,text:s})=>`
    <div class="tooltip tooltip--${e}">
      ${s}
    </div>
  `,t=r.bind({});t.args={position:"top",text:"Tooltip"};const o=()=>`
  <div class="alert bc-caution>
    <div class="alert-content">
      <div class="alert-text">
        <p class="body-lg">Title</p>
        <p class="body-lg">Title</p>
      </div>
    </div>
  </div>
`;t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  position,
  text
}) => {
  return \`
    <div class="tooltip tooltip--\${position}">
      \${text}
    </div>
  \`;
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => \`
  <div class="alert bc-caution>
    <div class="alert-content">
      <div class="alert-text">
        <p class="body-lg">Title</p>
        <p class="body-lg">Title</p>
      </div>
    </div>
  </div>
\``,...o.parameters?.docs?.source}}};const a=["Tooltip","Primary"],n=Object.freeze(Object.defineProperty({__proto__:null,Primary:o,Tooltip:t,__namedExportsOrder:a,default:i},Symbol.toStringTag,{value:"Module"}));export{n as T,t as a};
