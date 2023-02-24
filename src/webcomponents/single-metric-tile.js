const template = document.createElement("template");

template.innerHTML = `
<div>

  <dl>
    <a title="See All Results" class="link" href="#">See All</a>
    <dt class="sp-title"></dt>
    <dd class="sp-subtitle"></dd>
    
    <div class="sp-metric">
    <div>
    <span></span>
    <sub class="compare" data-value='arrow_downward'>
      <i class='material-icons arrow'></i>
      <d class='delta'></d>
    </sub>
    </div>
    <span class="sparkline sparkline--dotline-thin"></span>

    </div>
  </dl>
</div>
`;

class SingleTile extends HTMLElement {
  constructor() {
    super();

    const node = document.importNode(template.content, true);
    this.appendChild(node);

    this._classElement = this.parentElement.getElementsByTagName("single-tile");
    this._nameElement = this.querySelector(".sp-title");
    this._subTitleElement = this.querySelector(".sp-subtitle");
    this._metricElement = this.querySelector(".sp-metric span");
    this._arrowElement = this.querySelector(".arrow");
    this._deltaElement = this.querySelector(".delta");
    this._subClassElement = this.querySelector("sub.compare");
    this._sparkLineElement = this.querySelector(".sparkline");
 }
 get sparkline() {
  return this.getAttribute("sparkline");
 }
 set sparkline(val) {
  this.setAttribute("sparkline", val);
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

  get metric() {
    return this.getAttribute("metric");
  }
  set metric(val) {
    this.setAttribute("metric", val);
  }
  get arrow() {
    return this.getAttribute("arrow");
  }
  set arrow(val) {
    this.setAttribute("arrow", val);
    //this.setAttribute("data-value", val);
  }
  get delta() {
    return this.getAttribute("delta");
  }
  set delta(val) {
    this.setAttribute("delta", val);
  }
  get subClass() {
    return this.getAttribute("arrow");
  }
  set subClass(val) {
    this.parentNode.setAttribute("data-value", val);
  }
  attributeChangedCallback(attrName, oldValue, newValue) {
    switch (attrName) {
      case "name":
        this._nameElement.textContent = newValue;
        break;
      case "subtitle":
        this._subTitleElement.textContent = newValue;
        break;
      case "metric":
        this._metricElement.textContent = newValue;
        break;
      case "arrow":
        this._arrowElement.textContent = newValue;
        break;
      case "delta":
        this._deltaElement.textContent = newValue;
        break;
      case "class":
        this._classElement.classList = newValue;
        break;
      case "data-value":
        this._subClassElement.textContent = newValue;
        break;
        case "sparkline":
        this._sparkLineElement.innerHTML = newValue;
        break;
      default:
        break;
    }
  }
  static get observedAttributes() {
    return [
      "name",
      "subtitle",
      "metric",
      "arrow",
      "delta",
      "class",
      "data-value",
      "sparkline"
    ];
  }
}
customElements.define("single-tile", SingleTile);
