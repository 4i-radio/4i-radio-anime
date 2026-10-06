const data=window.SITE_CONTENT;
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.querySelector('span').textContent='＋';}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.querySelector('span').textContent=open?'−':'＋';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
window.matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
if(data.keyVisual){const img=document.createElement('img');img.src=data.keyVisual;img.alt='TVアニメ『4i RADIO』6人集合キービジュアル';img.fetchPriority='high';img.width=1672;img.height=941;document.querySelector('#key-visual').replaceChildren(img);}
for(const person of data.characters){const card=document.createElement('article');card.className='character-card';card.style.setProperty('--accent',person.color);card.style.setProperty('--secondary',person.secondary);card.style.setProperty('--art-height',person.artHeight+'%');card.style.setProperty('--art-bottom',person.artBottom+'%');const visual=document.createElement('div');visual.className='character-image';if(person.image){const img=document.createElement('img');img.src=person.image;img.alt=person.name;img.loading='lazy';visual.append(img);}else{const note=document.createElement('span');note.textContent='VISUAL COMING SOON';visual.append(note);}const title=document.createElement('h3');title.textContent=person.name;const copy=document.createElement('p');copy.textContent=person.description;const cv=document.createElement('p');cv.className='character-cv';cv.textContent='CV：'+person.cv;card.append(visual,title,cv,copy);document.querySelector('#character-grid').append(card);}
for(const item of data.news){const details=document.createElement('details');const summary=document.createElement('summary');const date=document.createElement('time');date.dateTime=item.date.replaceAll('.','-');date.textContent=item.date;const title=document.createElement('strong');title.textContent=item.title;const plus=document.createElement('span');plus.className='plus';plus.textContent='＋';plus.setAttribute('aria-hidden','true');summary.append(date,title,plus);const body=document.createElement('p');body.textContent=item.body;details.append(summary,body);details.open=true;document.querySelector('#news-list').append(details);}

// Mobile character selector; desktop retains the six-person overview.
const characterGrid=document.querySelector('#character-grid');
const cards=[...characterGrid.querySelectorAll('.character-card')];
const selector=document.createElement('div');
selector.className='character-selector';
selector.setAttribute('role','tablist');
selector.setAttribute('aria-label','登場人物を選択');
characterGrid.before(selector);
const mobileCharacters=window.matchMedia('(max-width:760px)');
let selectedCharacter=0;
const characterButtons=data.characters.map((person,index)=>{
 const button=document.createElement('button');
 button.type='button';button.id=`character-tab-${index}`;
 const face=document.createElement('span');face.className='character-face';const portrait=document.createElement('img');portrait.src=person.image;portrait.alt='';portrait.loading='lazy';face.append(portrait);const label=document.createElement('span');label.textContent=person.name;button.append(face,label);button.style.setProperty('--accent',person.color);button.style.setProperty('--face-width',person.faceWidth+'%');button.style.setProperty('--face-left',person.faceLeft+'%');button.style.setProperty('--face-top',person.faceTop+'%');
 button.setAttribute('role','tab');button.setAttribute('aria-controls',`character-panel-${index}`);
 button.addEventListener('click',()=>selectCharacter(index));
 button.addEventListener('keydown',event=>{
  let next=index;
  if(event.key==='ArrowRight')next=(index+1)%cards.length;
  else if(event.key==='ArrowLeft')next=(index+cards.length-1)%cards.length;
  else if(event.key==='ArrowDown')next=(index+3)%cards.length;
  else if(event.key==='ArrowUp')next=(index+cards.length-3)%cards.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=cards.length-1;
  else return;
  event.preventDefault();selectCharacter(next);characterButtons[next].focus();
 });
 selector.append(button);return button;
});
function selectCharacter(index){selectedCharacter=index;syncCharacters();}
function syncCharacters(){
 const mobile=mobileCharacters.matches;
 selector.hidden=!mobile;
 cards.forEach((card,index)=>{
  const selected=index===selectedCharacter;
  card.id=`character-panel-${index}`;
  card.hidden=mobile&&!selected;
  characterButtons[index].setAttribute('aria-selected',String(selected));
  characterButtons[index].tabIndex=selected?0:-1;
  if(mobile){card.setAttribute('role','tabpanel');card.setAttribute('aria-labelledby',`character-tab-${index}`);card.tabIndex=0;}
  else{card.removeAttribute('role');card.removeAttribute('aria-labelledby');card.removeAttribute('tabindex');}
 });
}
mobileCharacters.addEventListener('change',syncCharacters);
syncCharacters();

for(const person of data.characters){const entry=document.createElement('div');entry.className='cast-entry';const name=document.createElement('dt');name.textContent=person.name;const cv=document.createElement('dd');cv.textContent='CV：'+person.cv;entry.append(name,cv);document.querySelector('#cast-list').append(entry);}
