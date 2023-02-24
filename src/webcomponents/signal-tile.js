const template = document.createElement("template");

template.innerHTML = `
<div>

  <dl>
    <a title="See All Results" class="link" href="#">See All</a>
    <dt class="sp-title"></dt>
    <dd class="sp-subtitle"></dd>
    
    <div class="sp-bars">
      <div class="one">
      <div class="bar-h"><span>/someview/view/../view</span></div>
      <sub class="compare" data-value='arrow_downward'>
        <i class='material-icons arrow'>arrow_downward</i>
        <d class='delta'>14</d>
      </sub>
      </div>
      <div class="two">
      <div class="bar-h"><span>/someview/view/../view</span></div>
      <sub class="compare" data-value='arrow_upward'>
        <i class='material-icons arrow'>arrow_upward</i>
        <d class='delta'>36</d>
      </sub>
      </div>
      <div class="three">
      <div class="bar-h"><span>/someview/view/../view</span></div>
        <sub class="compare" data-value='arrow_downward'>
          <i class='material-icons arrow'>arrow_downward</i>
        <d class='delta'>18</d>
        </sub>
      </div>
    
    </div>
  </dl>
</div>
`;

class SignalTile extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    this.appendChild(node);

    this._classElement = this.parentElement.getElementsByTagName("signal-tile");
    this._nameElement = this.querySelector(".sp-title");
    this._subTitleElement = this.querySelector(".sp-subtitle");
  }

  get class() {
    return this.getAttribute("class");
  }
  set class(val) {
    this.setAttribute("class", val);
  }
  get name() {
    return this.getAttribute("name");
  }
  set name(val) {
    this.setAttribute("name", val);
  }
  get subtitle() {
    return this.getAttribute("subtitle");
  }
  set subtitle(val) {
    this.setAttribute("subtitle", val);
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    switch (attrName) {
      case "name":
        this._nameElement.textContent = newValue;
        break;
      case "subtitle":
        this._subTitleElement.textContent = newValue;
        break;
      case "class":
        this._classElement.classList = newValue;
        break;
      default:
        break;
    }
  }
  static get observedAttributes() {
    return ["name", "subtitle", "class"];
  }
}
customElements.define("signal-tile", SignalTile);
