const Hd=document.querySelector('header'),Hb=document.querySelector('h1+button'),
  Ho=document.querySelector('header>ol'),Sr=document.querySelector('form[role]'),
  Mn=document.querySelector('main'),Cn=document.querySelector('main+form');

function Ui(o){let i=0,I=``;
  while(i<21){i++; if(o['strIngredient'+i])
  I+=`<li>${o['strMeasure'+i]} ${o['strIngredient'+i]}</li>`; else return I;}}
function Ps(p,c=178){return p.slice(0,p.slice(0,c).lastIndexOf('.')+1||c);}//,
function Dt(e='search.php?s=',n){fetch(`https://themealdb.com/api/json/v1/1/${e}`)
  .then(r=>r.json()).then(j=>{let i=0,m=``;
  if(n==0){j=j.meals[0]; m=`
    <div><img src='${j.strMealThumb}'alt='${j.strMeal}'><h3>${j.strMeal}</h3></div>
    <div><h4>Instructions</h4><p>${j.strInstructions}</p>
    <h4>Area: ${j.strArea}</h4><h4>Category: ${j.strCategory}</h4>
    <h4>Ingredients:</h4><ul>${Ui(j)}</ul>
    ${j.strTags?`<h4>Tags:</h4>
      <ul><li>${j.strTags.split(',').join('</li><li>')}</li></ul>`:''}
    ${j.strSource?`<a href='${j.strSource}' target='_blank'>Source</a>`:''}
    <a href='${j.strYoutube}' target='_blank'>Youtube</a></div>`}
  else if(n==1){j=j.categories; while(i<j.length) m+=`<article>
    <img src='${j[i].strCategoryThumb}' alt='${j[i].strCategory}'>
    <div><h3>${j[i].strCategory}</h3><p>${Ps(j[i++].strCategoryDescription)}</p>
    </div></article>`;}
  else if(n==2) while(i<j.meals.length) m+=`<h3>${j.meals[i++].strArea}</h3>`;
  else if(n==3) while(i<20) m+=`<hgroup><h3>${j.meals[i].strIngredient}</h3>
    <p>${Ps(j.meals[i++].strDescription)}</p></hgroup>`;
  else {j=j.meals; while(i<(n<=j.length?n:j.length)) m+=`<article
    data-i='${j[i].idMeal}'><img src='${j[i].strMealThumb}' alt='${j[i].strMeal}'>
    <div><h3>${j[i++].strMeal}</h3></div></article>`;}
  Mn.innerHTML=m;
  if(n==1) for(let i=0;i<Mn.childElementCount;i++)
    Mn.children[i].addEventListener('click',()=>
      Dt(`filter.php?c=${Mn.children[i].firstElementChild.alt}`,20));
  else if(n==2) for(let i=0;i<Mn.childElementCount;i++)
    Mn.children[i].addEventListener('click',()=>
      Dt(`filter.php?a=${Mn.children[i].textContent}`,20));
  else if(n==3) for(let i=0;i<Mn.childElementCount;i++)
    Mn.children[i].addEventListener('click',()=>
      Dt(`filter.php?i=${Mn.children[i].firstElementChild.textContent}`));
  else if(n!=0) for(let i=0;i<Mn.childElementCount;i++)
    Mn.children[i].addEventListener('click',()=>
      {Dt(`lookup.php?i=${Mn.children[i].dataset.i}`,0);
      Sr.style.display='';});}).catch(e=>console.log(e));}
Dt();

Hb.addEventListener('click',()=>{Hd.classList.toggle('hd');
  Hb.classList.toggle('hb'); Ho.classList.toggle('ho');});
Ho.addEventListener('click',()=>{Hd.classList.add('hd');
  Hb.classList.remove('hb'); Ho.classList.add('ho');}); //main role?

Ho.children[0].addEventListener('click',()=>
  {Sr.style.display='flex'; Mn.innerHTML=''; Cn.style.display='';});
Ho.children[4].addEventListener('click',()=>
  {Cn.style.display='flex'; Sr.style.display=''; Mn.innerHTML='';});

// function
Ho.children[1].addEventListener('click',()=>
  {Dt('categories.php',1); Sr.style.display=''; Cn.style.display='';});
Ho.children[2].addEventListener('click',()=>
  {Dt('list.php?a=list',2); Sr.style.display=''; Cn.style.display='';});
Ho.children[3].addEventListener('click',()=>
  {Dt('list.php?i=list',3); Sr.style.display=''; Cn.style.display='';});

Sr.children[0].addEventListener('input',()=>Dt('search.php?s='+Sr.children[0].value));
Sr.children[1].addEventListener('input',()=>Dt('search.php?f='+Sr.children[1].value));

const d=document.querySelector('dialog');
let v=['^[a-zA-Z ]+$', '^(([^<>()[\\]\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\.,;:\\s@"]+)*)|.(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$', '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$', '^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$', '^(?=.*\\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$'];
for (let i = 0; i < 6; i++) {
  Cn.children[i].addEventListener('blur', () => {
    if (!RegExp(v[i] || Cn.children[4].value).test(Cn.children[i].value)) {
      d.textContent = 'Invalid ' + Cn.children[i].getAttribute('placeholder');
      d.show(); setTimeout(() => d.close(), 3000);
      Cn.lastElementChild.setAttribute('disabled', 'true');
    }
    else {
      let V = 1; for (let i = 0; i < 6; i++) { if (!RegExp(v[i] || Cn.children[4].value).test(Cn.children[i].value)) { V = 0; break; } }
      if (V) Cn.lastElementChild.removeAttribute('disabled');
    }
  }
  );
}
