const data=window.SITE_CONTENT;
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.querySelector('span').textContent='＋';}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.querySelector('span').textContent=open?'−':'＋';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
window.matchMedia('(min-width:761px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
if(data.keyVisual){const img=document.createElement('img');img.src=data.keyVisual;img.alt='TVアニメ『4i RADIO』6人集合キービジュアル';img.fetchPriority='high';img.width=1672;img.height=941;document.querySelector('#key-visual').replaceChildren(img);}
for(const item of data.news){const details=document.createElement('details');const summary=document.createElement('summary');const date=document.createElement('time');date.dateTime=item.date.replaceAll('.','-');date.textContent=item.date;const title=document.createElement('strong');title.textContent=item.title;const plus=document.createElement('span');plus.className='plus';plus.textContent='＋';plus.setAttribute('aria-hidden','true');summary.append(date,title,plus);const body=document.createElement('p');body.textContent=item.body;if(item.id){details.id=item.id;body.style.whiteSpace='pre-line';}details.append(summary,body);details.name='site-news';document.querySelector('#news-list').append(details);}
function openNewsHash(){const target=document.getElementById(location.hash.slice(1));if(target&&target.matches('#news-list details')){target.open=true;requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));}}
window.addEventListener('hashchange',openNewsHash);
document.addEventListener('click',e=>{if(e.target.closest('a[href="#news-20261127"]')&&location.hash==='#news-20261127')openNewsHash();});
openNewsHash();

for(const person of data.characters){const entry=document.createElement('div');entry.className='cast-entry';const name=document.createElement('dt');name.textContent=person.name;const cv=document.createElement('dd');cv.textContent='CV：'+person.cv;entry.append(name,cv);document.querySelector('#cast-list').append(entry);}
