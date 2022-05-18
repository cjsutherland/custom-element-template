const template = document.createElement("template");
template.innerHTML = `
    <link rel="stylesheet" href="muppet-creature/muppet-creature.css"/>
    <div class="muppet">
      <div class="avatar">
        <img />
      </div>
      <div class="details">
        <h2></h2>
        <div class="info">
          <p>Color: <slot name="color" /></p>
          <p>Species: <slot name="species" /></p>
        </div>
        <div class="actions">
            <button id="greet">Say Hi!</button>
            <button id="toggle">View Details</button>
        </div>
      </div>
     
    </div>
`;
class MuppetCreature extends HTMLElement {
  constructor() {
    super();
    this.showInfo = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  toggleInfo = () => {
    this.showInfo = !this.showInfo;
    this.shadowRoot.querySelector(".info").style.display = this.showInfo
      ? "block"
      : "none";
    this.shadowRoot.querySelector("#toggle").innerHTML = this.showInfo
      ? "Hide Details"
      : "View Details";
  };

  static get observedAttributes() {
    return ["name", "avatar"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot.querySelector(".details h2").innerText =
      this.getAttribute("name");
    this.shadowRoot.querySelector(".avatar img").src =
      this.getAttribute("avatar");
    this.shadowRoot.querySelector(".avatar img").alt =
      this.getAttribute("name");
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#toggle")
      .addEventListener("click", this.toggleInfo);
    this.shadowRoot
      .querySelector("#greet")
      .addEventListener("click", () =>
        window.alert(`Hey there! I'm ${this.getAttribute("name")}`)
      );
  }

  disconnectedCallback() {
    this.shadowRoot
      .querySelector("#toggle")
      .removeEventListener("click", this.toggleInfo);
    this.shadowRoot
      .querySelector("#greet")
      .removeEventListener("click", () =>
        window.alert(`Hey there! I'm ${this.getAttribute("name")}`)
      );
  }
}

export default MuppetCreature;
