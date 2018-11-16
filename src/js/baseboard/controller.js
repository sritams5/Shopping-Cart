import 'jquery';
import 'jquery-ui';

import baseBox from './view';
import popView from '../popover/view';
import {createPopUp,addDynaValue} from '../popover/controller';
import {loadOrders,loadPromosPerPromocode,deleteOrder,updateOrder} from '../service';
async function removeOrder(event) {
    const modal =document.getElementById('myModal');
    let eventid=event.target.id;
    var thenum = eventid.replace( /^\D+/g, '');
    await deleteOrder(thenum);
    window.location.reload();
}
async function showDetails(event) {
    const modal =document.getElementById('myModal');
    let eventid=event.target.id;
    var thenum = eventid.replace( /^\D+/g, '');
    let spanid='span'+thenum;
    console.log("spanid-"+spanid);
    let item=document.getElementById(spanid).innerHTML;
    await addDynaValue(item);
    modal.style.display = "block";
}
async function calculateTotal(){
  let elementArraySize=localStorage.getItem("size");
  let price=0;
  for(let i=1;i<=Number(elementArraySize);i++){
    let item=JSON.parse(document.getElementById(`span${i}`).innerHTML);
    price+=parseFloat(item.price*item.qty);
  }
    document.getElementById("totalid").innerHTML=`$${price}`;
    document.getElementById("promoid").innerHTML=`$0.00`;
    if(price<50){
      document.getElementById("shipcid").innerHTML=`$0.00`;
      document.getElementById("finalid").innerHTML=`$${price}`;
    }
    else {
      document.getElementById("shipcid").innerHTML=`$37.00`;
      document.getElementById("finalid").innerHTML=`$${price+37}`;
    }
}
async function createLanding(){
  const orderArray=await loadOrders();
  //console.log(orderArray);
  await baseBox.createBase(orderArray);
  await createPopUp();
  await calculateTotal();
  $('.transbutn').on('click',async function(e) {
    e.preventDefault();
    let ele=document.getElementById("promocodeid");
    let pvalue=ele.value;
    let promoamount=0;
    console.log(pvalue);

      if(pvalue==""||pvalue==undefined){
        ele.readOnly = false;
      }else{
        ele.readOnly = true;
        const promoC=await loadPromosPerPromocode(pvalue);
        if(promoC.length>0){
          promoamount=promoC[0].amount;
          console.log(promoamount);
          $("#promoid").html(`$${promoamount}`);
          let priceBeforePromo=parseFloat(($("#finalid").html()).split("$")[1]);
          $("#finalid").html(`$${priceBeforePromo-promoamount}`);
        }else{
          ele.value="";
          ele.readOnly = false;
          alert("Invalid Promo Code!!!");
        }
      }
    });
  $('.minus-btn').on('click',async function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());

    if (value > 1) {
      value = value - 1;
    } else {
      value = 0;
    }

    $input.val(value);
    let eventid=$this.attr("aria-label");
    var thenum = eventid.replace( /^\D+/g, '');
    console.log(thenum);
    let jsonData = {};
    jsonData["qty"]=value;

    let response=await updateOrder(thenum,jsonData);
    console.log("response"+response);
    window.location.reload();
  });

  $('.plus-btn').on('click',async function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());

    if (value < 100) {
      value = value + 1;
    } else {
      value =100;
    }

    $input.val(value);
    let eventid=$this.attr("aria-label");
    var thenum = eventid.replace( /^\D+/g, '');
    console.log(thenum);
    let jsonData = {};
    jsonData["qty"]=value;

    let response=await updateOrder(thenum,jsonData);
    console.log("response"+response);
    window.location.reload();
  });

  $('.shopping-cart').on('click', '.editBtn', showDetails);
  $('.shopping-cart').on('click', '.removeBtn', removeOrder);
}
createLanding();
