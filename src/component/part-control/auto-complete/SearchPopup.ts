import HttpUtil from "../../../HttpUtil";
import { IFixValue } from "../../form-maker/ISchema";
import layout from "./assets/popup-layout.html";

export default class SearchPopup {
  private readonly _element: Element;
  private readonly _valueSelectCallback: OnValueSelectCallback;
  private readonly _url: string;
  constructor(url: string, valueSelectCallback: OnValueSelectCallback) {
    this._url = url;
    this._valueSelectCallback = valueSelectCallback;
    this._element = HttpUtil.parse(layout).querySelector("[data-bc-autocomplete-popup]");
    const btn = this._element.querySelector("[data-bc-btn-close");
    btn.addEventListener("click", this.onCloseClick.bind(this));
    const input = this._element.querySelector("[data-bc-search]");
    input.addEventListener("keyup", this.onKeyUpAsync.bind(this));
    document.body.appendChild(this._element);
  }

  private onCloseClick(e: MouseEvent) {
    e.preventDefault();
    this._element.remove();
  }

  private async onKeyUpAsync(e: KeyboardEvent) {
    e.preventDefault();
    const term = (e.target as HTMLFormElement).value;
    const url = HttpUtil.formatString(this._url, { term });
    const result = await HttpUtil.getDataAsync<Array<IFixValue>>(url);
    const ul = this._element.querySelector<HTMLUListElement>("[data-bc-result]");
    ul.innerHTML = "";

    result.forEach((item) => {
      const li = document.createElement("li");
      //li.setAttribute("data-bc-id", item.id.toString());
      li.setAttribute("data-bc-value", item.value);
      li.innerHTML = item.value;
      li.addEventListener("dblclick", (e) => {
        e.preventDefault();
        this._valueSelectCallback(item);
        li.remove();
      });
      ul.appendChild(li);
    });
  }
}

export type OnValueSelectCallback = (value: IFixValue) => void;
