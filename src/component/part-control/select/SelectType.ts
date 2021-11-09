import Question from "../../question/Question";
import { IFixValue, IPartCollection, IPartValue, IQuestionPart } from "../../form-maker/ISchema";
import ListBaseType from "../ListBaseType";
import layout from "./assets/layout.html";
import { IUserActionPart } from "../../form-maker/IUserActionResult";

export default class SelectType extends ListBaseType {
  private readonly _select: HTMLSelectElement;
  public get changed(): boolean {
    return (
      this._select.options[this._select.selectedIndex].value != (this.answer?.values[0].value ?? 0)
    );
  }

  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
    this._select = this.element.querySelector("select");
  }

  protected fillUI(values: Array<IFixValue>) {
    const select = this.element.querySelector("select");
    const value = this.answer?.values[0];
    values.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id.toString();
      option.text = item.value;
      option.selected = value?.value == item.id;
      select.options.add(option);
    });
  }

  public getUserActionPart(): IUserActionPart {
    return {
      part: this.part.part,
      values: [
        {
          ...(this.answer && { id: this.answer?.values[0].id }),
          value: this._select.options[this._select.selectedIndex].value,
        },
      ],
    };
  }
}
