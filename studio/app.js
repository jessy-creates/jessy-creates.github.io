import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {AGENTS} from './config.js';

const $ = id => document.getElementById(id);
const status = ['待命中','工作中','已完成'];
let current = -1, selected = -1, autoRotate = false;
const figures = [], clickable = [];
const scene = new THREE.Scene();
scene.background = new THREE.Color('#263852');
const camera = new THREE.PerspectiveCamera(37,1,.1,100);
camera.position.set(12,12,16);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
$('scene').innerHTML=''; $('scene').appendChild(renderer.domElement);
const controls = new OrbitControls(camera,renderer.domElement);
controls.target.set(0,.5,0);controls.enableDamping=true;controls.minDistance=8;controls.maxDistance=28;controls.maxPolarAngle=Math.PI/2.05;
scene.add(new THREE.HemisphereLight('#eaf8ff','#46526d',2.6));
const sun = new THREE.DirectionalLight('#fff2d7',3.2);sun.position.set(-6,13,9);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-13;sun.shadow.camera.right=13;sun.shadow.camera.top=13;sun.shadow.camera.bottom=-13;scene.add(sun);
function mat(color,roughness=.75){return new THREE.MeshStandardMaterial({color,roughness});}
function cube(w,h,d,color,x,y,z,parent=scene){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mat(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
function ball(r,color,x,y,z,parent=scene,sx=1,sy=1,sz=1){const m=new THREE.Mesh(new THREE.SphereGeometry(r,20,14),mat(color));m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;parent.add(m);return m;}
function cone(r,h,color,x,y,z,parent=scene,segments=8){const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,segments),mat(color));m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
function cylinder(rt,rb,h,color,x,y,z,parent=scene){const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,16),mat(color));m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
// 辦公室：地板、兩面牆、木板紋理
cube(11,.32,9,'#a7775a',0,-.22,0);
for(let i=-4;i<=4;i++)cube(11,.015,.025,'#82583f',0,-.045,i);
cube(11,3,.18,'#344660',0,1.35,-4.52);
cube(.18,3,9,'#43546c',-5.55,1.35,0);
cube(3.2,1.35,.08,'#1a273d',0,1.8,-4.38);
cube(2.85,1.04,.09,'#64817e',0,1.8,-4.32);
for(let i=0;i<3;i++)cube(.58,.09,.02,'#d6efcf',-1+i*.95,1.98,-4.25);
// 地毯和中央桌
cube(4,.035,2.7,'#677c70',0,.015,.25);
cube(2.6,.18,1.1,'#e3c9a2',0,.58,.3);
for(const x of [-1.1,1.1])for(const z of [-.1,.7])cube(.12,.54,.12,'#5a6672',x,.28,z);
// 小植物
function plant(x,z){cylinder(.35,.26,.45,'#d69b7c',x,.25,z);cylinder(.07,.07,.6,'#5c8967',x,.72,z);for(let j=0;j<5;j++){const a=j*Math.PI*2/5;ball(.33,'#74ae7a',x+Math.cos(a)*.28,1.04+Math.sin(j)*.1,z+Math.sin(a)*.28,scene,1,.65,.7);}}
plant(-4.7,-3.6);plant(4.8,3.5);
const spots=[[-3,-2.1],[3,-2.1],[-3,2.5],[3,2.5]];
function monster(type,parent){
 const bodyColors=['#9c6a46','#d8f0f4','#4b9d7d','#34334c'];
 const c=bodyColors[type];
 ball(.52,c,0,.77,0,parent,1,1.2,.78);
 ball(.47,type===1?'#f5fbff':type===3?'#e5d2db':c,0,1.52,.02,parent,1,1,.9);
 for(const x of [-.42,.42]){ball(.2,c,x,.84,.03,parent,1,1.45,1);ball(.22,c,x*.62,.22,.16,parent,1.1,.6,1.3);}
 for(const x of [-.18,.18]){ball(.075,'#202536',x,1.55,.405,parent);ball(.028,'#ffffff',x-.018,1.58,.465,parent);}
 if(type===0){ // 大腳怪：毛茸茸耳朵和大腳
   for(const x of [-.39,.39])ball(.2,c,x,1.72,0,parent);
   ball(.18,'#c9976a',0,1.32,.4,parent,1.2,.7,.45);
   for(const x of [-.25,.25])ball(.26,'#795037',x,.17,.33,parent,1.2,.55,1.4);
 }else if(type===1){ // 雪怪：藍色角與眉毛
   for(const x of [-.32,.32])cone(.14,.4,'#9dd9ea',x,1.98,-.03,parent);
   for(const x of [-.2,.2])cube(.17,.06,.07,'#8ebdcd',x,1.72,.43,parent);
   ball(.11,'#9ec9d7',0,1.37,.43,parent,1.5,.65,.4);
 }else if(type===2){ // 沼澤怪物：鰭和鰓
   for(const x of [-.48,.48]){cone(.19,.44,'#9ddab0',x,1.73,0,parent);ball(.11,'#b3e3a2',x,1.25,.35,parent);}
   for(let i=0;i<3;i++)cone(.16,.32,'#b1db8e',0,2.04-i*.03,-.23+i*.23,parent);
 }else{ // 吸血鬼：披風、尖牙、尖髮
   cube(.86,.85,.13,'#8e344d',0,.77,-.35,parent);
   for(const x of [-.25,.25])cone(.22,.35,'#171b2b',x,1.96,.02,parent);
   for(const x of [-.12,.12])cone(.043,.13,'#ffffff',x,1.28,.45,parent);
   ball(.12,'#c34d61',0,.48,.43,parent,1.2,.55,.4);
 }
}
spots.forEach(([x,z],i)=>{
 // 桌子、螢幕、椅子
 cube(2.8,.17,1.4,'#e5c9a4',x,.95,z);
 for(const dx of [-1.12,1.12])for(const dz of [-.52,.52])cube(.13,.9,.13,'#5a6572',x+dx,.46,z+dz);
 cube(.95,.62,.1,'#1c2b3d',x,1.41,z-.32);
 cube(.82,.47,.015,['#8ed1a6','#9fd8e8','#a7dbaf','#c9a8d8'][i],x,1.42,z-.256);
 cube(.12,.24,.13,'#5b6c7b',x,1.06,z-.32);
 cube(.75,.07,.4,'#cad1d4',x,1.05,z+.23);
 cube(.85,.13,.76,'#4b596d',x,.38,z+1.15);
 cube(.15,.85,.12,'#4b596d',x,.73,z+1.48);
 cube(.88,.82,.12,'#4b596d',x,1.03,z+1.52);
 const group=new THREE.Group();group.position.set(x,.03,z+1.05);group.rotation.y=0;scene.add(group);
 monster(i,group);figures.push(group);
 group.traverse(o=>{if(o.isMesh){o.userData.agent=i;clickable.push(o);}});
});
// 掛鐘、裝飾物
cylinder(.36,.36,.09,'#e8d5b8',4.7,2.25,-4.32).rotation.x=Math.PI/2;
const raycaster=new THREE.Raycaster(),mouse=new THREE.Vector2();
renderer.domElement.addEventListener('click',e=>{
 const r=renderer.domElement.getBoundingClientRect();mouse.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);
 raycaster.setFromCamera(mouse,camera);const hit=raycaster.intersectObjects(clickable,false)[0];
 if(hit){selected=hit.object.userData.agent;renderUI();$('scene-note').textContent=`已選擇：${AGENTS[selected].name} · ${AGENTS[selected].job}`;}
});
function renderUI(){
 $('agents').innerHTML=AGENTS.map((a,i)=>`<button class="agent-card ${selected===i?'selected':''}" data-agent="${i}"><div class="agent-top"><span class="agent-icon">${a.emoji}</span><span class="state ${current===i?'working':current>i?'done':''}">${current===i?'工作中':current>i?'已完成':'待命中'}</span></div><h3>${a.name}</h3><div class="role">${a.english} · ${a.model}</div><p>${a.description}</p><small>${a.job}</small></button>`).join('');
 document.querySelectorAll('[data-agent]').forEach(b=>b.addEventListener('click',()=>{selected=Number(b.dataset.agent);$('scene-note').textContent=`已選擇：${AGENTS[selected].name} · ${AGENTS[selected].job}`;renderUI();}));
 $('task-list').innerHTML=AGENTS.map((a,i)=>`<div class="task-row"><span class="task-dot ${current===i?'working':current>i?'done':''}"></span><div><strong>${a.emoji} ${a.name}｜${a.job}</strong><small>${current===i?'執行中（模擬）':current>i?'已完成（模擬）':'等待交接'}</small></div></div>`).join('');
 $('overall').textContent=current<0?'全部待命中':current===3?'最後階段執行中':'模擬任務進行中';
 $('phase').textContent=current<0?'等待任務':AGENTS[current].name+' · '+AGENTS[current].job;
 $('bar').style.width=`${Math.max(0,current+1)*25}%`;
 $('next').disabled=current<0||current>=3;
 $('next').textContent=current>=3?'模擬流程結束':'交接下一位怪物 →';
 $('log').textContent=current<0?'還沒有任務。今天的咖啡很香。☕':AGENTS[current].task+'。這是示範動畫，沒有連線真實 API。';
}
$('start').addEventListener('click',()=>{current=0;selected=0;renderUI();});
$('next').addEventListener('click',()=>{if(current>=0&&current<3){current++;selected=current;renderUI();}});
$('reset').addEventListener('click',()=>{current=-1;selected=-1;renderUI();$('scene-note').textContent='四隻怪物正在等待指令';});
$('rotate').addEventListener('click',()=>{autoRotate=!autoRotate;controls.autoRotate=autoRotate;controls.autoRotateSpeed=1.5;$('rotate').textContent='⟳ 自動旋轉：'+(autoRotate?'開':'關');});
$('home').addEventListener('click',()=>{camera.position.set(12,12,16);controls.target.set(0,.5,0);controls.update();});
renderUI();
function resize(){const w=$('scene').clientWidth,h=$('scene').clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix();}
new ResizeObserver(resize).observe($('scene'));resize();
const clock=new THREE.Clock();
function animate(){requestAnimationFrame(animate);const t=clock.getElapsedTime();figures.forEach((f,i)=>{f.position.y=(i===current?.10:.015)*Math.sin(t*(i===current?6:1.5)+i);f.rotation.y=i===current?Math.sin(t*2)*.17:0;});controls.update();renderer.render(scene,camera);}animate();
