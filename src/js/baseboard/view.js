class BaseBox {
  constructor() {
    this.parent = document.getElementById("content");//document.getElementsByTagName("BODY")[0];
  }

  static createDOMElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;//.firstElementChild;
  }

  static createBaseElement() {
    return BaseBox.createDOMElement(`<div class="shopping-cart">
    <!-- Title -->
    <div class="title">
    YOUR SHOPPING BAG
    </div>
    <div class="thead">
    <div style="flex-grow: 1;">3ITEMS</div>
    <div style="flex-grow: 6;"></div>
    <div style="flex-grow: 1;">SIZE</div>
    <div style="flex-grow: 1;">QTY</div>
    <div style="flex-grow: 1;">PRICE</div>
    </div>
    <!-- Product #1 -->
    <div class="itemcontainer">
    <div class="item">
    <div class="image">
    <img id="item1" alt="" />
    </div>
    <div class="dynadiv">
    <div class="description">
    <span>Common Projects</span>
    <span>Bball High</span>
    <span>White</span>
    <span class="actionclass action1"><button class="bglessbutton editBtn">EDIT</button>|<button class="bglessbutton">X REMOVE</button>|<button class="bglessbutton">SAVE FOR LATER</button></span>
    </div>
    <div class="total-price"><p class="smalldevicep">Size:</p>S</div>

    <div class="quantity">
    <p class="smalldevicep">QTY:</p>
    <button class="plus-btn" type="button" name="button">
    <img src="plus.svg" alt="" />
    </button>
    <input type="text" name="name" value="1">
    <button class="minus-btn" type="button" name="button">
    <img src="minus.svg" alt="" />
    </button>
    </div>

    <div class="total-price">$549</div>
    </div>
    </div>
    <div class="action2">
    <span class="actionclass"><button class="bglessbutton editBtn">EDIT</button>|<button class="bglessbutton">X REMOVE</button>|<button class="bglessbutton">SAVE FOR LATER</button></span>
    </div>
    </div>
    <!-- Product #2 -->
    <div class="itemcontainer">
    <div class="item">
    <div class="image">
    <img id="item2" alt=""/>
    </div>
    <div class="dynadiv">
    <div class="description">
    <span>Maison Margiela</span>
    <span>Future Sneakers</span>
    <span>White</span>
    <span class="actionclass action1"><button class="bglessbutton editBtn">EDIT</button>|<button class="bglessbutton">X REMOVE</button>|<button class="bglessbutton">SAVE FOR LATER</button></span>
    </div>
    <div class="total-price"><p class="smalldevicep">Size:</p>S</div>

    <div class="quantity">
    <p class="smalldevicep">QTY:</p>
    <button class="plus-btn" type="button" name="button">
    <img src="plus.svg" alt="" />
    </button>
    <input type="text" name="name" value="1">
    <button class="minus-btn" type="button" name="button">
    <img src="minus.svg" alt="" />
    </button>
    </div>

    <div class="total-price">$870</div>
    </div>
    </div>
    <div class="action2">
    <span class="actionclass"><button class="bglessbutton editBtn">EDIT</button>|<button class="bglessbutton">X REMOVE</button>|<button class="bglessbutton">SAVE FOR LATER</button></span>
    </div>
    </div>

    <!-- Product #3 -->
    <div class="itemcontainer">
    <div class="item">
    <div class="image">
    <img id="item3" alt=""/>
    </div>
    <div class="dynadiv">
    <div class="description">
    <span>Our Legacy</span>
    <span>Brushed Scarf</span>
    <span>Brown</span>
    <span class="actionclass action1"><button class="bglessbutton editBtn">EDIT</button>|<button class="bglessbutton">X REMOVE</button>|<button class="bglessbutton">SAVE FOR LATER</button></span>
    </div>
    <div class="total-price"><p class="smalldevicep">Size:</p>S</div>

    <div class="quantity">
    <p class="smalldevicep">QTY:</p>
    <button class="plus-btn" type="button" name="button">
    <img src="plus.svg" alt="" />
    </button>
    <input type="text" name="name" value="1">
    <button class="minus-btn" type="button" name="button">
    <img src="minus.svg" alt="" />
    </button>
    </div>

    <div class="total-price">$349</div>
    </div>
    </div>
    <div class="action2">
    <span class="actionclass"><button class="bglessbutton editBtn">EDIT</button>|<button class="bglessbutton">X REMOVE</button>|<button class="bglessbutton">SAVE FOR LATER</button></span>
    </div>
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
    <div><p><h5>$37.00</h5></p></div>
    </div>
    <div id="pcodediv" class="totalc">
    <div><p><h5>PROMOTION CODE <strong>JF 10</strong> APPLIED</h5></p></div>
    <div><p><h5>-$7.00</h5></p></div>
    </div>
    <div id="shippingcostdiv" class="totalc">
    <div>
    <p><h5>ESTIMATED SHIPPING</h5>
    <span class="subtext">you qualify for free shipping because your order is abhove $50*</span></p>
    </div>
    <div><p><h5>$37.00</h5></p></div>
    </div>
    <div id="estimateddiv" class="totalc">
    <div>
    <p><h5><strong>ESTIMATED TOTAL</strong></h5>
    <span class="subtext">Tax will be applied during checkout</span></p>
    </div>
    <div><p><h5>$30.00</h5></p></div>
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
    </div>
    <!-- The Modal -->
    <div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
    <span class="close">&times;</span>
    <div class="modal-items">
    <div class="item1">
    <p class="subtext">PAISLEY JEAN</p>
    <h1>$21</h1>
    <div class="sizechart">
    <button class="buttoncolor" style="background:blue;"></button>
    <button class="buttoncolor" style="background:gray;"></button>
    </div>
    <div class="sizeqty">
    <div class="dropdown" id="sizediv">
    <button class="dropbutns" id="sizebtn">Dropdown</button>
    <div class="dropdown-content" id="sizecontent">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
    </div>
    </div>
    <div class="dropdown" id="qtydiv">
    <button class="dropbutns" id="qtybtn">Dropdown</button>
    <div class="dropdown-content" id="qtycontent">
    <a href="#">Link 1</a>
    <a href="#">Link 2</a>
    <a href="#">Link 3</a>
    </div>
    </div>
    </div>
    <button class="buttons-primary">EDIT</button>
    <p class="subtext"><u>see product details</u></p>
    </div>
    <div class="item2">
    <img alt="" />
    </div>
    </div>
    </div>

    </div>`);
  }
  createBase(){
    this.parent.innerHTML = '';
    this.parent.appendChild(BaseBox.createBaseElement());
  }
}

const baseBox = new BaseBox();

export default baseBox;
