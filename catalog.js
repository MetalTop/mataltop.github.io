(() => {
 const product=document.querySelector('#product-type'),customer=document.querySelector('#customer-type');
 const shape=document.querySelector('#shape-options'),shapeSelect=document.querySelector('#countertop-shape'),material=document.querySelector('#material-options');
 const region=document.querySelector('#region'),district=document.querySelector('#district'),help=document.querySelector('#region-help');
 function update(){
  const countertop=product.value==='스테인레스 상판';
  shape.hidden=!countertop;shapeSelect.disabled=!countertop;
  const metal=countertop||product.value==='아일랜드 식탁';material.hidden=!metal;material.disabled=!metal;
  const matching=customer.value==='시공업자 지역별 매칭';region.required=matching;district.required=matching;
  help.classList.toggle('is-matching',matching);help.textContent=matching?'지역별 매칭 상담에는 시·도와 시·군·구를 입력해 주세요. 연결 가능 여부는 상담 후 확인합니다.':'시공 또는 납품할 지역을 알려주세요.';
 }
 product.addEventListener('change',update);customer.addEventListener('change',update);
 document.querySelectorAll('[data-customer],[data-product]').forEach(link=>link.addEventListener('click',()=>{
  if(link.dataset.customer)customer.value=link.dataset.customer;
  if(link.dataset.product)product.value=link.dataset.product;
  product.dispatchEvent(new Event('change'));customer.dispatchEvent(new Event('change'));
 }));
 product.form.addEventListener('reset',()=>setTimeout(update,0));update();
})();
