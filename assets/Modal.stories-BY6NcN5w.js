/* empty css               */const i={title:"Components/Modal",argTypes:{title:{control:"text"},body:{control:"text"},size:{control:{type:"select"},options:["lg","md","sm"]}},parameters:{docs:{description:{component:"Modals are used to display content in a layer above the app."}}}},t=({title:l,body:d,size:e})=>`
      <div class="${["modal",e&&`modal--${e}`].filter(Boolean).join(" ")}" tabindex="-1" role="dialog">
        <div class="modal__header">
          ${l}
        </div>
        <div class="modal__body">
          <p>${d}</p>
        </div>
        <div class="modal__footer">
          <button class="btn btn--secondary btn--lg">Cancel</button>
          <button class="btn btn--primary btn--lg">Confirm</button>
        </div>
      </div>
  `,n=t.bind({});n.args={title:"Modal title",body:"This is the modal body text. It defines the main content of the modal.",size:"md"};const o=t.bind({});o.args={...n.args,size:"lg",title:"Large Modal"};const a=t.bind({});a.args={...n.args,size:"md",title:"Medium Modal"};const s=t.bind({});s.args={...n.args,size:"sm",title:"Small Modal"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`({
  title,
  body,
  size
}) => {
  const dialogClasses = ['modal', size && \`modal--\${size}\`].filter(Boolean).join(' ');
  return \`
      <div class="\${dialogClasses}" tabindex="-1" role="dialog">
        <div class="modal__header">
          \${title}
        </div>
        <div class="modal__body">
          <p>\${body}</p>
        </div>
        <div class="modal__footer">
          <button class="btn btn--secondary btn--lg">Cancel</button>
          <button class="btn btn--primary btn--lg">Confirm</button>
        </div>
      </div>
  \`;
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
  title,
  body,
  size
}) => {
  const dialogClasses = ['modal', size && \`modal--\${size}\`].filter(Boolean).join(' ');
  return \`
      <div class="\${dialogClasses}" tabindex="-1" role="dialog">
        <div class="modal__header">
          \${title}
        </div>
        <div class="modal__body">
          <p>\${body}</p>
        </div>
        <div class="modal__footer">
          <button class="btn btn--secondary btn--lg">Cancel</button>
          <button class="btn btn--primary btn--lg">Confirm</button>
        </div>
      </div>
  \`;
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`({
  title,
  body,
  size
}) => {
  const dialogClasses = ['modal', size && \`modal--\${size}\`].filter(Boolean).join(' ');
  return \`
      <div class="\${dialogClasses}" tabindex="-1" role="dialog">
        <div class="modal__header">
          \${title}
        </div>
        <div class="modal__body">
          <p>\${body}</p>
        </div>
        <div class="modal__footer">
          <button class="btn btn--secondary btn--lg">Cancel</button>
          <button class="btn btn--primary btn--lg">Confirm</button>
        </div>
      </div>
  \`;
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`({
  title,
  body,
  size
}) => {
  const dialogClasses = ['modal', size && \`modal--\${size}\`].filter(Boolean).join(' ');
  return \`
      <div class="\${dialogClasses}" tabindex="-1" role="dialog">
        <div class="modal__header">
          \${title}
        </div>
        <div class="modal__body">
          <p>\${body}</p>
        </div>
        <div class="modal__footer">
          <button class="btn btn--secondary btn--lg">Cancel</button>
          <button class="btn btn--primary btn--lg">Confirm</button>
        </div>
      </div>
  \`;
}`,...s.parameters?.docs?.source}}};const r=["Default","Large","Medium","Small"],m=Object.freeze(Object.defineProperty({__proto__:null,Default:n,Large:o,Medium:a,Small:s,__namedExportsOrder:r,default:i},Symbol.toStringTag,{value:"Module"}));export{n as D,o as L,m as M,s as S,a};
