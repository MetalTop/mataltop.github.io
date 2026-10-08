(() => {
  const product=document.querySelector('#product-type');
  const options=document.querySelector('#upstand-options');
  const presence=document.querySelector('#upstand-presence');
  const paint=document.querySelector('#upstand-paint');
  const type=document.querySelector('#upstand-paint-type');
  const color=document.querySelector('#upstand-paint-color');
  const help=document.querySelector('#upstand-help');
  const samples=document.querySelector('#paint-samples');
  const swatches=[...document.querySelectorAll('[data-paint-color]')];
  if(!product||!options||!presence||!paint||!type||!color||!help)return;
  function update(){
    const countertop=product.value==='스테인레스 상판';
    options.hidden=!countertop;
    options.disabled=!countertop;
    const absent=presence.value==='없음';
    if(absent)paint.value='도장 없음';
    paint.disabled=absent;
    const painted=!absent&&paint.value==='도장 있음';
    type.disabled=!painted;
    color.disabled=!painted;
    if(!painted)color.value='상담 필요';
    if(samples)samples.hidden=!painted;
    swatches.forEach(button=>{button.disabled=!painted;button.setAttribute('aria-pressed',String(painted&&button.dataset.paintColor===color.value));});
    help.textContent=absent?'물받이 턱이 없는 경우 도장 옵션은 적용되지 않습니다.':painted?'도장 종류와 색상을 선택해 주세요. 색상이 미정이면 ‘상담 필요’를 선택하세요.':paint.value==='도장 없음'?'도장 없이 스테인리스 소재의 표면 마감으로 상담합니다.':'‘도장 있음’을 선택하면 도장 종류와 색상을 선택할 수 있습니다.';
  }
  presence.addEventListener('change',update);
  paint.addEventListener('change',update);
  product.addEventListener('change',update);
  color.addEventListener('change',update);
  swatches.forEach(button=>button.addEventListener('click',()=>{color.value=button.dataset.paintColor;update();}));
  presence.form.addEventListener('reset',()=>setTimeout(update,0));
  update();
})();
