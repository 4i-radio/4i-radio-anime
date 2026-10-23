(() => {
 const root=document.querySelector('#character-showcase');
 const keys=['takasaki','ichijo','yamada','kanzaki','hanazaki','miyazaki'];
 const el=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls;if(text)e.textContent=text;return e;};
 const img=(src,alt)=>{const e=document.createElement('img');e.src=src;e.alt=alt;e.decoding='async';return e;};
 const tabs=el('div','cast-tabs');tabs.setAttribute('role','tablist');tabs.setAttribute('aria-label','登場人物を選択');
 const panels=el('div','cast-panels');root.append(tabs,panels);
 const buttons=[],cards=[];
 window.SITE_CONTENT.characters.forEach((person,i)=>{
  const base='assets/characters/'+keys[i];
  const button=el('button','cast-tab');button.type='button';button.id='cast-tab-'+i;button.style.setProperty('--accent',person.color);button.setAttribute('role','tab');button.setAttribute('aria-controls','cast-panel-'+i);
  const thumb=el('span','cast-thumb');thumb.append(img(base+([0,1,5].includes(i)?'-thumb.webp':'-face.webp'),''));button.append(thumb,el('span','cast-tab-name',person.name));tabs.append(button);buttons.push(button);
  const card=el('article','cast-panel');card.id='cast-panel-'+i;card.setAttribute('role','tabpanel');card.setAttribute('aria-labelledby',button.id);card.tabIndex=0;card.style.setProperty('--accent',person.color);card.style.setProperty('--secondary',person.secondary);
  const face=el('div','cast-portrait');face.append(img(base+'-face.webp',person.name+' 顔アップ'));
  const serial=el('span','cast-number',String(i+1).padStart(2,'0'));serial.setAttribute('aria-hidden','true');
  const body=el('div','cast-body');body.append(img(base+'-body.webp',person.name+' 全身立ち絵'));
  const info=el('div','cast-info');info.append(el('p','cast-kicker','4i RADIO / CHARACTER'),el('h3','cast-name',person.name),el('p','cast-voice','CV：'+person.cv),el('p','cast-description',person.description));
  card.append(serial,face,body,info);cards.push(card);panels.append(card);
  button.addEventListener('click',()=>select(i));
  button.addEventListener('keydown',e=>{let n=i;const columns=matchMedia('(max-width:760px)').matches?3:6;if(e.key==='ArrowRight')n=(i+1)%6;else if(e.key==='ArrowLeft')n=(i+5)%6;else if(e.key==='ArrowDown')n=(i+columns)%6;else if(e.key==='ArrowUp')n=(i+6-columns)%6;else if(e.key==='Home')n=0;else if(e.key==='End')n=5;else return;e.preventDefault();select(n);buttons[n].focus();});
 });
 function select(n){cards.forEach((c,i)=>{c.hidden=i!==n;buttons[i].setAttribute('aria-selected',String(i===n));buttons[i].tabIndex=i===n?0:-1;});}
 select(0);
})();
