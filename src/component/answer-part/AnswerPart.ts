import HttpUtil from "../../HttpUtil";
import layout from "./assets/layout.html";
import "./assets/style";

export default abstract class AnswerPart {
  protected container: Element;

  protected readonly element: Element;

  constructor(partLayout: string, container: Element) {
    this.container = container;
    this.element = HttpUtil.parse(layout).querySelector("[data-bc-part]");
    this.element.innerHTML = partLayout;
    this.container.appendChild(this.element);
  }
}
