import 'jquery';
import 'jquery-ui';

import baseBox from './view';
import popView from '../popover/view';
import {createPopUp,addDynaValue} from '../popover/controller';
import {loadOrders} from '../service';
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
    price+=parseFloat(JSON.parse(document.getElementById(`span${i}`).innerHTML).price);
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
  console.log(orderArray);
  await baseBox.createBase(orderArray);
  await createPopUp();
  await calculateTotal();

  $('.minus-btn').on('click', function(e) {
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

  });

  $('.plus-btn').on('click', function(e) {
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
  });

  $('.shopping-cart').on('click', '.editBtn', showDetails);
}
createLanding();
