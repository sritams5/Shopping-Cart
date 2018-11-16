class BaseBox {
  constructor() {
    this.parent = document.getElementById("content");//document.getElementsByTagName("BODY")[0];
  }

  static createDOMElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;//.firstElementChild;
  }

  static createBaseElement(orderArraySize,htmlString) {
    return BaseBox.createDOMElement(`<div class="shopping-cart">
    <!-- Title -->
    <div class="title">
    YOUR SHOPPING BAG
    </div>
    <div class="thead">
    <div style="flex-grow: 1;">${orderArraySize}ITEMS</div>
    <div style="flex-grow: 6;"></div>
    <div style="flex-grow: 1;">SIZE</div>
    <div style="flex-grow: 1;">QTY</div>
    <div style="flex-grow: 1;">PRICE</div>
    </div>
    <!-- Product #1 -->
    <div class="itemcontainer">`+htmlString+`

    </div>


    <div class="total">
    <div class="helpsec">
    <p><b>Need help</b><br/>
    <b>or have questions?</b></p><br/>
    <p>Call Customer Service at<br/>
    1-800-555-5555</p><br/>
    <p><u>Chat with one of<br/>
    our Stylist</u></p><br/>
    <p><u>See return<br/>
    & exchange policy</u></p>
    </div>
    <div>
    <div id="promodiv" class="totalc">
    <div class="promosec">
    <p>ENTER PROMOTION CODE OR GIFT CARD</p>
    </div>
    <div>
    <input type="text"></input><button class="transbutn">APPLY</button>
    </div>
    </div>
    <div id="costdiv">
    <div id="stotaldiv" class="totalc">
    <div><p><h5>SUBTOTAL</h5></p></div>
    <div><p><h5 id="totalid">$37.00</h5></p></div>
    </div>
    <div id="pcodediv" class="totalc">
    <div><p><h5>PROMOTION CODE <strong>JF 10</strong> APPLIED</h5></p></div>
    <div><p><h5 id="promoid">-$7.00</h5></p></div>
    </div>
    <div id="shippingcostdiv" class="totalc">
    <div>
    <p><h5>ESTIMATED SHIPPING</h5>
    <span class="subtext">you qualify for free shipping because your order is abhove $50*</span></p>
    </div>
    <div><p><h5 id="shipcid">$37.00</h5></p></div>
    </div>
    <div id="estimateddiv" class="totalc">
    <div>
    <p><h5><strong>ESTIMATED TOTAL</strong></h5>
    <span class="subtext">Tax will be applied during checkout</span></p>
    </div>
    <div><p><h5 id="finalid">$30.00</h5></p></div>
    </div>
    </div>
    <div id="finalsubmit">
    <div id="submitdiv">
    <p><u>CONTINUE SHOPPING</u></p>
    <button class="buttons-primary">CHECKOUT</button>
    </div id="notediv">
    <div>
    <p class="subtext">Secure checkout: Shopping is always safe & secure</p>
    </div>
    </div>
    </div>
    </div>
    </div>`);
  }
  static async createHtmlString(orderArray){
    let htmlString='';
    for(var i=0;i<orderArray.length;i++){
      let item=orderArray[i];
      htmlString+=`<div class="item">
        <div class="image" id="image${item.id}">
        <img id="item${item.id}" src ="${item.productimg}"alt="" />
        </div>
        <div class="dynadiv" id="dynadiv${item.id}">
        <div class="description" id="description${item.id}">
        <span>${item.productname}</span>
        <span>${item.style}</span>
        <span>${item.color}</span>
        <span class="actionclass action1"><button id="editBtn${item.id}" class="bglessbutton editBtn">EDIT</button>|<button id="removeBtn${item.id}" class="bglessbutton">X REMOVE</button>|<button id="saveLaterBtn${item.id}" class="bglessbutton">SAVE FOR LATER</button></span>
        </div>
        <div class="total-price"><p class="smalldevicep">Size:</p>${item.sizechoosed}</div>

        <div class="quantity">
        <p class="smalldevicep">QTY:</p>
        <button class="plus-btn" type="button" name="button">
        <img src="plus.svg" alt="" />
        </button>
        <input type="text" name="name" id="qty${item.id}" value="${item.qty}">
        <button class="minus-btn" type="button" name="button">
        <img src="minus.svg" alt="" />
        </button>
        </div>

        <div class="total-price">$${item.price}</div>
        </div>
        </div>
        <div class="action2">
        <span class="actionclass"><button id="editBtn${item.id}" class="bglessbutton editBtn">EDIT</button>|<button id="removeBtn${item.id}" class="bglessbutton">X REMOVE</button>|<button id="saveLaterBtn${item.id}" class="bglessbutton">SAVE FOR LATER</button></span>
        </div>
        <span id="span${item.id}" style="visibility:hidden">${JSON.stringify(item)}</span>`;
    }
    return htmlString;
  }
async  createBase(orderArray){
    let orderArraySize=orderArray.length;
    localStorage.setItem("size",orderArraySize);
    console.log(orderArraySize);
    let htmlString=await BaseBox.createHtmlString(orderArray);
    this.parent.innerHTML = '';
    this.parent.appendChild(BaseBox.createBaseElement(orderArraySize,htmlString));
  }
}

const baseBox = new BaseBox();

export default baseBox;
