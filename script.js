/* LINEボタンのアイコンを描画する */
const LINE_PATH="M12 3C6.48 3 2 6.63 2 11.1c0 4 3.55 7.36 8.35 8 .32.07.77.21.88.5.1.26.07.66.03.92l-.14.85c-.04.26-.2 1 .88.55 1.08-.46 5.82-3.43 7.94-5.87C21.4 14.44 22 12.84 22 11.1 22 6.63 17.52 3 12 3z";
document.querySelectorAll('[data-line-ico]').forEach(svg=>{svg.setAttribute('viewBox','0 0 24 24');const path=document.createElementNS('http://www.w3.org/2000/svg','path');path.setAttribute('fill','currentColor');path.setAttribute('d',LINE_PATH);svg.appendChild(path);});

/* 固定ボトムバー：ヒーローを過ぎたら出す */
const bar=document.getElementById('cta-bar'),hero=document.querySelector('.hero');
if(bar&&hero){document.body.classList.add('has-bar');const show=v=>bar.classList.toggle('is-visible',v);if('IntersectionObserver'in window){new IntersectionObserver(([e])=>show(!e.isIntersecting),{threshold:0}).observe(hero);}else{show(true);}}
