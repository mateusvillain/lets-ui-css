/* empty css               */const d={title:"Components/Alert",argTypes:{variant:{control:{type:"select"},options:["caution","danger","info","success"]},title:{control:"text"},content:{control:"text"},actions:{control:"boolean"}}},r=({variant:o,title:l,content:c,actions:i})=>`
    <div class="alert alert--${o}" role="alert">
      <div class="alert__content">
        <div class="alert__text">
          <p class="body--lg">${l}</p>
          <p class="body--lg">${c}</p>
        </div>
      </div>

      ${i?`
            <div class="alert__actions">
              <button class="btn btn--secondary btn--lg">Button</button>
              <button class="btn btn--primary btn--lg">Button</button>
            </div>
          `:""}
    </div>
  `,t=r.bind({});t.args={variant:"success",title:"Alert title",content:"Description",actions:!0};const n=r.bind({});n.args={variant:"success",title:"Alert title",content:"Description",actions:!0};const a=r.bind({});a.args={variant:"caution",title:"Alert title",content:"Description",actions:!0};const s=r.bind({});s.args={variant:"danger",title:"Alert title",content:"Description",actions:!0};const e=r.bind({});e.args={variant:"info",title:"Alert title",content:"Description",actions:!0};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  variant,
  title,
  content,
  actions
}) => {
  return \`
    <div class="alert alert--\${variant}" role="alert">
      <div class="alert__content">
        <div class="alert__text">
          <p class="body--lg">\${title}</p>
          <p class="body--lg">\${content}</p>
        </div>
      </div>

      \${actions ? \`
            <div class="alert__actions">
              <button class="btn btn--secondary btn--lg">Button</button>
              <button class="btn btn--primary btn--lg">Button</button>
            </div>
          \` : ''}
    </div>
  \`;
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`({
  variant,
  title,
  content,
  actions
}) => {
  return \`
    <div class="alert alert--\${variant}" role="alert">
      <div class="alert__content">
        <div class="alert__text">
          <p class="body--lg">\${title}</p>
          <p class="body--lg">\${content}</p>
        </div>
      </div>

      \${actions ? \`
            <div class="alert__actions">
              <button class="btn btn--secondary btn--lg">Button</button>
              <button class="btn btn--primary btn--lg">Button</button>
            </div>
          \` : ''}
    </div>
  \`;
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`({
  variant,
  title,
  content,
  actions
}) => {
  return \`
    <div class="alert alert--\${variant}" role="alert">
      <div class="alert__content">
        <div class="alert__text">
          <p class="body--lg">\${title}</p>
          <p class="body--lg">\${content}</p>
        </div>
      </div>

      \${actions ? \`
            <div class="alert__actions">
              <button class="btn btn--secondary btn--lg">Button</button>
              <button class="btn btn--primary btn--lg">Button</button>
            </div>
          \` : ''}
    </div>
  \`;
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`({
  variant,
  title,
  content,
  actions
}) => {
  return \`
    <div class="alert alert--\${variant}" role="alert">
      <div class="alert__content">
        <div class="alert__text">
          <p class="body--lg">\${title}</p>
          <p class="body--lg">\${content}</p>
        </div>
      </div>

      \${actions ? \`
            <div class="alert__actions">
              <button class="btn btn--secondary btn--lg">Button</button>
              <button class="btn btn--primary btn--lg">Button</button>
            </div>
          \` : ''}
    </div>
  \`;
}`,...s.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  variant,
  title,
  content,
  actions
}) => {
  return \`
    <div class="alert alert--\${variant}" role="alert">
      <div class="alert__content">
        <div class="alert__text">
          <p class="body--lg">\${title}</p>
          <p class="body--lg">\${content}</p>
        </div>
      </div>

      \${actions ? \`
            <div class="alert__actions">
              <button class="btn btn--secondary btn--lg">Button</button>
              <button class="btn btn--primary btn--lg">Button</button>
            </div>
          \` : ''}
    </div>
  \`;
}`,...e.parameters?.docs?.source}}};const b=["Alert","Success","Caution","Danger","Info"],p=Object.freeze(Object.defineProperty({__proto__:null,Alert:t,Caution:a,Danger:s,Info:e,Success:n,__namedExportsOrder:b,default:d},Symbol.toStringTag,{value:"Module"}));export{p as A,a as C,s as D,e as I,n as S,t as a};
