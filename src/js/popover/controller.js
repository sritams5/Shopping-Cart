import 'jquery';
import 'jquery-ui';

import popBox from './view';
import {updateOrder} from '../service';

export async function createPopUp() {
  await popBox.createPopOver();
  await addFunctionalityToPopUp();
}
export async function addDynaValue(item){
  await popBox.addDynaValue(item);
}
async function addFunctionalityToPopUp(){
  //$('.shopping-cart').on('click', '.editBtn', showDetails);
  // Get the modal
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  //var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  let editbutton = document.getElementsByClassName("editcss")[0];
  editbutton.onclick =async function(event) {
    let id=event.target.id;
    console.log('id- '+id);
    let size=$( "#sizecontent option:selected" ).text();
    let qty=$( "#qtycontent option:selected" ).text();
    //let price=(document.getElementById('priceid').innerHTML).split('$')[1];
    let selectedcolor=document.getElementsByName("selected")[0];
    let color = '';
    if(selectedcolor.classList.contains("red")){
      color="red";
    }else if(selectedcolor.classList.contains("green")){
      color="green";
    }else{
      color="blue";
    }
    let jsonData = {};
    jsonData["colorchoosed"]=color;
    jsonData["sizechoosed"]=size;
    jsonData["qty"]=qty;
    //jsonData["price"]=price;
    console.log(size+" "+qty+" "+color+" "+jsonData);
    let response=await updateOrder(id,jsonData);
    console.log("response"+response);
    modal.style.display = "none";
    window.location.reload();
  }
  // When the user clicks the button, open the modal
  //btn.onclick = function() {
  //    modal.style.display = "block";
  //}
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    let shbtn=document.getElementById('showDetailsId');
    let description=document.getElementById('pdetailsid');
    let spanid='span'+editbutton.id;
    console.log("spanid-"+spanid);
    let item=document.getElementById(spanid).innerHTML;
    let itemObj = JSON.parse(item);

    description.style.display='none';
    description.innerHTML='';
    shbtn.innerHTML='<u>see product details</u>';
    shbtn.addEventListener("click", function(){
      if(shbtn.innerHTML=='<u>see product details</u>'){
        description.style.display='block';
        description.innerHTML=itemObj.description;
        shbtn.innerHTML='<u>hide product details</u>';
      }else{
        description.style.display='none';
        description.innerHTML='';
        shbtn.innerHTML='<u>see product details</u>';
      }
    });
    modal.style.display = "none";
  }
  // $( ".close" ).click(function() {
  //   modal.style.display = "none";
  // });
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}
