/* empty css               */const b={title:"Components/Tabs",tags:["autodocs"],argTypes:{items:{control:"object",description:"Array of tab items"},expand:{control:"boolean",description:"Expand tabs to fill width"}}},a=({items:d,expand:c})=>{const l=d.map((n,i)=>`<button class="tabs__item ${n.selected?"tabs__item--selected":""}">${n.text}</button>`).join("");return`
    <div class="tabs ${c?"tabs--expand":""}">
      ${l}
    </div>
  `},e=a.bind({});e.args={items:[{text:"Tab 1",selected:!0},{text:"Tab 2",selected:!1},{text:"Tab 3",selected:!1}],expand:!1};const t=a.bind({});t.args={items:[{text:"Tab 1",selected:!0},{text:"Tab 2",selected:!1},{text:"Tab 3",selected:!1}],expand:!0};const s=a.bind({});s.args={items:[{text:"Overview",selected:!0},{text:"Details",selected:!1},{text:"Settings",selected:!1},{text:"Logs",selected:!1}],expand:!1};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  items,
  expand
}) => {
  const tabsList = items.map((item, index) => {
    const selectedClass = item.selected ? 'tabs__item--selected' : '';
    return \`<button class="tabs__item \${selectedClass}">\${item.text}</button>\`;
  }).join('');
  const expandClass = expand ? 'tabs--expand' : '';
  return \`
    <div class="tabs \${expandClass}">
      \${tabsList}
    </div>
  \`;
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  items,
  expand
}) => {
  const tabsList = items.map((item, index) => {
    const selectedClass = item.selected ? 'tabs__item--selected' : '';
    return \`<button class="tabs__item \${selectedClass}">\${item.text}</button>\`;
  }).join('');
  const expandClass = expand ? 'tabs--expand' : '';
  return \`
    <div class="tabs \${expandClass}">
      \${tabsList}
    </div>
  \`;
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`({
  items,
  expand
}) => {
  const tabsList = items.map((item, index) => {
    const selectedClass = item.selected ? 'tabs__item--selected' : '';
    return \`<button class="tabs__item \${selectedClass}">\${item.text}</button>\`;
  }).join('');
  const expandClass = expand ? 'tabs--expand' : '';
  return \`
    <div class="tabs \${expandClass}">
      \${tabsList}
    </div>
  \`;
}`,...s.parameters?.docs?.source}}};const m=["Default","Expanded","ManyTabs"];export{e as Default,t as Expanded,s as ManyTabs,m as __namedExportsOrder,b as default};
