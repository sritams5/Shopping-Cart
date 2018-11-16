class PopBox {
  constructor() {
    this.parent = document.getElementById("popbase");
  }

  static createDOMElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
  }

  static createPopOverElement() {
    return PopBox.createDOMElement(`<!-- The Modal -->
      <div id="myModal" class="modal">

      <!-- Modal content -->
      <div class="modal-content">
      <span class="close">&times;</span>
      <div class="modal-items">
      <div class="item1">
      <p class="subtext" id="pnameid"></p>
      <h1 id="priceid"></h1>
      <div class="colorchart" id="colorchartid">

      </div>
      <div class="sizeqty">
      <div class="dropdown" id="sizediv">
      <!--<button class="dropbutns" id="sizebtn">SIZE</button>
      <div class="dropdown-content" id="sizecontent">
      </div>-->
      <select class="dropbutns" id="sizecontent"></select>
      </div>
      <div class="dropdown" id="qtydiv">
      <!--<button class="dropbutns" id="qtybtn">QTY</button>
      <div class="dropdown-content" id="qtycontent">
      </div>-->
      <select class="dropbutns" id="qtycontent"></select>
      </div>
      </div>
      <button class="buttons-primary editcss">EDIT</button>
      <p class="subtext" id="showDetailsId"><u>see product details</u></p>
      <p id="pdetailsid" style="display:none;"></p>
      </div>
      <div class="item2">
      <img id="imageid" alt="" />
      </div>
      </div>
      </div>

      </div>`);
    }
    static getSiblings(elem) {
      var siblings = [];
      var sibling = elem.parentNode.firstChild;
      var skipMe = elem;
      for ( ; sibling; sibling = sibling.nextSibling )
      if ( sibling.nodeType == 1 && sibling != elem )
      siblings.push( sibling );
      return siblings;
    }
    async addDynaValue(jsonelement){
      let itemObj = JSON.parse(jsonelement);
      console.log(jsonelement+" "+itemObj);
      let sizes=itemObj.size;
      let qtys=itemObj.qtyavailable;
      let choosedsize=itemObj.sizechoosed;
      let qtyChoosed=itemObj.qty;
      let colors=itemObj.color;
      let colorChoosed=itemObj.colorchoosed;
      document.getElementsByClassName("editcss")[0].id=itemObj.id;
      document.getElementById('pnameid').innerHTML=itemObj.productname;
      document.getElementById('priceid').innerHTML=`$${qtyChoosed*itemObj.price}`;
      document.getElementById('imageid').src =itemObj.productimg;

      console.log('qtys'+qtys);
      let sizecontent = document.getElementById('sizecontent');
      sizecontent.innerHTML='';
      for(let i=0;i<sizes.length;i++){
        let aTag = document.createElement('option');
        //aTag.setAttribute('href',"#");
        aTag.value = sizes[i];
        aTag.innerHTML = sizes[i];
        if (aTag.value == choosedsize) {
          aTag.setAttribute('selected', true);
        }
        sizecontent.appendChild(aTag);
      }
      let qtycontent = document.getElementById('qtycontent');
      qtycontent.innerHTML='';
      for(let i=0;i<=qtys;i++){
        let aTag = document.createElement('option');
        //aTag.setAttribute('href',"#");
        aTag.value = i;
        aTag.innerHTML = i;
        if (aTag.value == qtyChoosed) {
          aTag.setAttribute('selected', true);
        }
        qtycontent.appendChild(aTag);
      }
      qtycontent.onchange = function(){
        document.getElementById('priceid').innerHTML=`$${this.value*itemObj.price}`;
      };
      document.getElementById('showDetailsId').addEventListener("click", function(){
        let description=document.getElementById('pdetailsid');
        if(this.innerHTML=='<u>see product details</u>'){
          description.style.display='block';
          description.innerHTML=itemObj.description;
          this.innerHTML='<u>hide product details</u>';
        }else{
          description.style.display='none';
          description.innerHTML='';
          this.innerHTML='<u>see product details</u>';
        }
      });
      let colorchart=document.getElementById('colorchartid');
      colorchart.innerHTML='';
      for(let i=0;i<colors.length;i++){
        let aTag = document.createElement('button');
        //aTag.style.backgroundColor = colors[i];
        if(colors[i]=="red"){
          aTag.className="red";
        }else if(colors[i]=="green"){
          aTag.className="green";
        }else{
          aTag.className="blue";
        }
        if (colors[i] == colorChoosed) {
          //aTag.style.border = "thick solid yellow";
          //aTag.style.opacity = 0.7;
          aTag.setAttribute("class", aTag.className+" colorverityselected");
          console.log("aTag.className="+aTag.className);
          aTag.name="selected";
        }else{
          aTag.setAttribute("class", aTag.className+" colorveritynotselected");
          console.log("aTag.className="+aTag.className);
          aTag.name="notselected";
        }
        aTag.addEventListener("click", function(){
          let siblings= PopBox.getSiblings(this);
          for(let i=0;i<siblings.length;i++){
            // siblings[i].style.border = "none";
            // siblings[i].style.opacity = 1;
            siblings[i].classList.add("colorveritynotselected");
            siblings[i].classList.remove("colorverityselected");
            siblings[i].name="notselected";
          }
          this.classList.add("colorverityselected");
          this.classList.remove("colorveritynotselected");
          this.name="selected";
        });
        colorchart.appendChild(aTag);
      }
    }
    async createPopOver(){
      this.parent.innerHTML = '';
      this.parent.appendChild(PopBox.createPopOverElement());
    }
  }

  const popBox = new PopBox();

  export default popBox;
