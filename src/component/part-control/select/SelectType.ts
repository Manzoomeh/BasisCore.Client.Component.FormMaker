import Question from "../../question/Question";
import {
  IFixValue,
  IPartCollection,
  IQuestionPart,
} from "../../form-maker/ISchema";
import ListBaseType from "../ListBaseType";
import layout from "./assets/layout.html";
import { IUserActionPart } from "../../form-maker/IUserActionResult";

export default class SelectType extends ListBaseType {
  private readonly _select: HTMLSelectElement;

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

  public getAddedParts(): IUserActionPart {
    let retVal = null;
    if (!this.answer) {
      retVal = {
        part: this.part.part,
        values: [
          {
            value: this._select.options[this._select.selectedIndex].value,
          },
        ],
      };
    }
    return retVal;
  }

  public getEditedParts(): IUserActionPart {
    let retVal = null;
    if (this.answer) {
      const newValue = this._select.options[this._select.selectedIndex].value;
      const changed = newValue != this.answer.values[0].value;
      if (changed && newValue != "0") {
        retVal = {
          part: this.part.part,
          values: [
            {
              id: this.answer.values[0].id,
              value: newValue,
            },
          ],
        };
      }
    }
    return retVal;
  }

  public getDeletedParts(): IUserActionPart {
    let retVal = null;
    if (this.answer) {
      const newValue = this._select.options[this._select.selectedIndex].value;
      const changed = newValue != this.answer.values[0].value;
      if (changed && newValue == "0") {
        retVal = {
          part: this.part.part,
          values: [
            {
              id: this.answer.values[0].id,
              value: newValue,
            },
          ],
        };
      }
    }
    return retVal;
  }
}
