import 'jquery';
import 'jquery-ui';
import '../../../node_modules/jquery-ui/ui/widgets/autocomplete';
import baseBox from './view';
import popView from '../popover/view';
import {createPopUp,addDynaValue} from '../popover/controller';
import {loadOrders,loadPromosPerPromocode,loadPromos,deleteOrder,updateOrder} from '../service';
async function removeOrder(event) {
  const modal =document.getElementById('myModal');
  let eventid=event.target.id;
  var thenum = eventid.replace( /^\D+/g, '');
  await deleteOrder(thenum);
  await createLanding();
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
  let orderArray=JSON.parse(localStorage.getItem("orderArray"));
  //console.log(orderArray);
  let price=0;
  for(let i=0;i<orderArray.length;i++){
    let itemObj=orderArray[i];
    let span='span'+itemObj.id;
    let item=JSON.parse(document.getElementById(span).innerHTML);
    price+=parseFloat(item.price*item.qty);
  }
  document.getElementById("totalid").innerHTML=`$${price}`;
  document.getElementById("promoid").innerHTML=`$0.00`;
  if(price>50){
    document.getElementById("shipcid").innerHTML=`$0.00`;
    document.getElementById("qshipp").style.display='block';
    document.getElementById("finalid").innerHTML=`$${price}`;
  }
  else {
    document.getElementById("shipcid").innerHTML=`$37.00`;
    document.getElementById("finalid").innerHTML=`$${price+37}`;
  }
}
export async function createLanding(){
  const orderArray=await loadOrders();
  localStorage.setItem("orderArray",JSON.stringify(orderArray));
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
    await createLanding();
  });

  $('.plus-btn').on('click',async function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());
    let eventid=$this.attr("aria-label");
    var thenum = eventid.replace( /^\D+/g, '');
    console.log(thenum);
    let spanid='span'+thenum;
    console.log("spanid-"+spanid);
    let item=document.getElementById(spanid).innerHTML;
    let itemObj = JSON.parse(item);
    if (value < itemObj.qtyavailable) {
      value = value + 1;
    } else {
      value =itemObj.qtyavailable;
      alert(`A total of ${itemObj.qtyavailable} items available for this product!!!`);
    }

    $input.val(value);
    let jsonData = {};
    jsonData["qty"]=value;

    let response=await updateOrder(thenum,jsonData);
    console.log("response"+response);
    await createLanding();
  });
  let promoObj = await loadPromos();
  var availableTags = [];
  for(let i=0;i<promoObj.length;i++){
    availableTags.push(promoObj[i].promocode);
  }
  $( "#promocodeid" ).autocomplete({
    source: availableTags
  });
  $('.shopping-cart').on('click', '.editBtn', showDetails);
  $('.shopping-cart').on('click', '.removeBtn', removeOrder);
}
createLanding();
