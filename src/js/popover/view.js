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
    createPopOver(){
      this.parent.innerHTML = '';
      this.parent.appendChild(PopBox.createPopOverElement());
    }
  }

  const popBox = new PopBox();

  export default popBox;
