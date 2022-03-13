(()=>{"use strict";const t="http://localhost:3000/api/products/",e="Kanap";function a(t,e){let i,r=e;return"string"==typeof t[0]&&(t=[t]),t.forEach((t=>{if("string"==typeof t[0]&&(i=document.createElement(t[0]),r?r.appendChild(i):r=i),"object"==typeof t[1])for(let e in t[1])switch(e){case"class":let a=t[1].class;Array.isArray(t[1].class)&&(a=t[1].class.join(",")),i.classList.add(a);break;case"content":i.textContent=t[1].content;break;default:i.setAttribute(e,t[1][e])}Array.isArray(t[2])&&(1==t[2].length&&(t[2]=[t[2]]),a(t[2],i))})),r}function i(t,e=(()=>{})){let i=a(["div",{class:"modal",style:"position: fixed; \n               width: 100%; \n               height: 100%;\n               display: inline-flex;\n               background: transparent;\n               align-items: center;\n               justify-content: center;\n               top: 0;"},["div",{style:"background: white;\n              color: black;\n              padding: 1em;\n              box-shadow: 1px 1px 8px 2px rgba(0,0,0,0.3);\n              text-align: center;\n              max-width: 80%;\n              "},[["p",{content:t,style:"\n      padding-bottom: 1em;\n      "}],["button",{content:"Ok",style:"\n      background: #3498db;\n      color: white;\n      padding: 0.5em 2em;\n      border: NONE;\n      BORDER-RADIUS: 3PX;\n      text-align: center;\n      "}]]]]);document.getElementsByTagName("body")[0].appendChild(i),i.addEventListener("click",(t=>{t.preventDefault(),t.target.closest(".modal").remove(),e()}))}class r{constructor(t="Kanap"){this.localCartName=t,this.cartList=JSON.parse(localStorage.getItem(this.localCartName))||[]}search(t,e){return this.cartList.findIndex((a=>a.id==t&&a.color==e))}add(t,e,a){const r=this.search(t,a);return-1===r?(this.cartList.push({id:t,quantity:e,color:a}),localStorage.setItem(this.localCartName,JSON.stringify(this.cartList))):(this.cartList[r].quantity+=parseInt(e),localStorage.setItem(this.localCartName,JSON.stringify(this.cartList))),i("Produit ajouté au panier!"),this.cartList}remove(t,e){let a=this.search(t,e);if(-1!=a)return this.cartList.splice(a,1),localStorage.setItem(this.localCartName,JSON.stringify(this.cartList)),this.cartList;i("Le produit n'a été pas trouvé")}modify(t,e,a){let r=this.search(t,e);-1!=r?(this.cartList[r].quantity=a,localStorage.setItem(this.localCartName,JSON.stringify(this.cartList))):i("Erreur: L'objet à modifier n'existe plus")}reset(){localStorage.removeItem(this.localCartName),this.cartList=[]}getProdIdToOrder(){let t=[];return this.cartList.forEach((e=>{t.push(e.id)})),t}}class s extends class{constructor(t){this._id=t._id,this.image=t.image,this.altTxt=t.altTxt,this.price=t.price,this.description=t.description,this.name=t.name}}{constructor(t){super(t),this.color=t.color,this.quantity=t.quantity,this.template=["article",{class:"cart__item","data-id":this._id,"data-color":this.color},[["div",{class:"cart__item__img"},["img",{src:this.image,alt:this.altTxt}]],["div",{class:"cart__item__content"},[["div",{class:"cart__item__content__titlePrice"},[["h2",{content:this.name}],["p",{content:this.price+" €"}]]],["div",{class:"cart__item__content__settings"},[["div",{class:"cart__item__content__settings__quantity"},[["p",{content:"Qté:"}],["input",{type:"number",class:"itemQuantity",name:"itemQuantity",min:"1",max:"100",value:this.quantity}]]],["div",{class:"cart__item__content__settings__delete"},["p",{class:"deleteItem",content:"Supprimer"}]]]]]]]]}render(t){a(this.template,t)}}class n{#t=new Array(0);#e=0;#a=0;container;constructor(t,e="Kanap"){this.container=t,this.localCart=new r(e)}sumTotalPriceAndQuantity=function(){return this.#t===[]?this.#e=this.#a=0:(this.#e=this.#t.reduce(((t,e)=>t+(parseInt(e.quantity)||0)),0),this.#a=this.#t.reduce(((t,e)=>t+(parseInt(e.quantity)*parseInt(e.price)||0)),0)),{quantity:this.#e,price:this.#a}};async render(){let e=this.localCart.getProdIdToOrder();try{return(await(async e=>{let a=[];for(let i in e)a.push(fetch(t+e[i]).then((t=>{if(t.ok)return t.json();throw new Error(t.status+": "+t.statusText)})));return Promise.all(a).then((t=>{let e=[];return t.forEach((t=>{e.push({_id:t._id,image:t.imageUrl,altTxt:t.altTxt,price:t.price,description:t.description,name:t.name,colors:t.colors})})),e})).catch((t=>{throw new Error(t)}))})(e)).forEach((t=>{let e=this.localCart.cartList.find((e=>e.id===t._id)),a=new s({_id:t._id,quantity:e.quantity,color:e.color,image:t.image,name:t.name,description:t.description,altTxt:t.altTxt,price:t.price});this.#t.push(a),a.render(this.container)})),this.sumTotalPriceAndQuantity()}catch(t){throw new Error(t)}}modifyQuantity(t,e,a){this.localCart.modify(t,e,a);let i=this.#t.findIndex((e=>e.id=t));return i>=0&&(this.#t[i].quantity=a),this.sumTotalPriceAndQuantity()}deleteCartItem(t,e){this.localCart.remove(t,e);let a=this.#t.findIndex((a=>a._id==t&&a.color==e));return a>=0&&this.#t.splice(a,1),this.sumTotalPriceAndQuantity()}}class o{firstName;lastName;address;city;email;validate(t,e){let a,i;switch(t){case"firstName":case"lastName":a=/^[A-zÀ-ú' -]*$/,i='Seulement sont permis les lettres de l\'alphabet et "." et "-".';break;case"address":a=/(^[0-9]{1,} )?[^\s-][A-zÀ-ú,' \-.]{2,}/,i="L'adresse doit être une adresse dans le format français valide.";break;case"city":a=/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,i="Seulement sont permis les lettres de l'alphabet et \".-'\" sont aussi valides.";break;case"email":a=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,i="Email invalide. Exemple d'email valide: joeDoe@mail.com"}return new RegExp(a).test(e)?(this[t]=e,{champ:t,result:!0}):(this[t]=!1,{champ:t,result:i})}getContact(){return!!(this.firstName&&this.lastName&&this.address&&this.city&&this.email)&&{firstName:this.firstName,lastName:this.lastName,address:this.address,city:this.city,email:this.email}}}class c{static localCartName=e;static itemCartContainer=document.getElementById("cart__items");static totalQuantity=document.getElementById("totalQuantity");static totalPrice=document.getElementById("totalPrice");static contactForm=document.getElementsByClassName("cart__order__form")[0];static cart=new n(this.itemCartContainer);static localCartStorage=new r(this.localCartName);static contact=new o;static init(){const t=function(t){const e=new URL(window.location.href),a=new URLSearchParams(e.search);return!!a.has(t)&&(a.get(t)||"")}("command");if(t)document.getElementById("orderId").textContent=t;else if(""===t)window.location.href="./index.html";else try{this.load(),this.itemCartContainer.addEventListener("change",(t=>{this.modifyCartItem(t)})),this.itemCartContainer.addEventListener("click",(t=>{this.removeCartItem(t)})),this.contactForm.addEventListener("input",(t=>{t.preventDefault();const e=this.contact.validate(t.target.id,t.target.value);!0===e.result?document.getElementById(e.champ+"ErrorMsg").textContent="":document.getElementById(e.champ+"ErrorMsg").textContent=e.result})),this.contactForm.addEventListener("submit",(async t=>{t.preventDefault(),t.stopPropagation(),this.submitCart()}))}catch(t){i("Desolé, un erreur est survenu. Veuillez réessayer ultérieurement."),console.log(t)}}static async load(){0===this.localCartStorage.cartList.length&&(this.itemCartContainer.appendChild(a(["p",{content:"Votre panier est vide.",style:"text-align: center; font-size: 2em; padding: 2em;"}])),this.totalQuantity.textContent=0,this.totalPrice.textContent=0);try{let t=await this.cart.render();this.totalQuantity.textContent=t.quantity,this.totalPrice.textContent=t.price}catch(t){i("Desolé, un erreur est survenu. Veuillez réessayer ultérieurement."),console.log(t)}}static modifyCartItem(t){const e=t.target.closest("article").getAttribute("data-id"),a=t.target.closest("article").getAttribute("data-color"),r=parseInt(t.target.value);if(r<1)return void i("La quantité à commander ne peut pas être inferieur a 1");if(r>100)return void i("La quantité à commander ne peut pas être superieur a 100");let s=this.cart.modifyQuantity(e,a,r);this.totalQuantity.textContent=s.quantity,this.totalPrice.textContent=s.price}static removeCartItem(t){if(t.target.classList.contains("deleteItem")){const e=t.target.closest("article"),i=e.getAttribute("data-id"),r=e.getAttribute("data-color"),s=this.cart.deleteCartItem(i,r);e.remove(),this.totalQuantity.textContent=s.quantity,this.totalPrice.textContent=s.price,this.itemCartContainer.hastChildNodes||this.itemCartContainer.appendChild(a(["p",{content:"Votre panier est vide",style:"text-align: center; font-size: 2em; padding: 2em;"}]))}}static async submitCart(){const e=this.localCartStorage.getProdIdToOrder();if(0==e.length)i("Vous n'avez pas de produits à commander",(()=>{window.location.href="./index.html"}));else{const a={contact:this.contact.getContact(),products:e};try{let e=await(async e=>await fetch(t+"order",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then((t=>{if(t.ok)return t.json().then((t=>t.orderId));throw new Error(t.status+": "+t.statusText)})))(a);if(!e)throw new Error("Order Fail");this.localCartStorage.reset(),window.location.href="./confirmation.html?command="+e}catch(t){i("Desolé, un erreur est survenu. Veuillez réessayer ultérieurement."),console.log(t)}}}}window.onload=c.init()})();
//# sourceMappingURL=cart.js.map