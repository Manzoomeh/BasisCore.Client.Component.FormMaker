import {
  IFixValue,
  IPartCollection,
  IQuestionPart,
} from "../../form-maker/ISchema";
import "./assets/style";
import Question from "../../question/Question";
import HttpUtil from "../../../HttpUtil";
import EditableQuestionPart from "../../question-part/EditableQuestionPart";
import { IUserActionPart } from "../../form-maker/IUserActionResult";

export default abstract class AutoCompleteType extends EditableQuestionPart {
  protected selectedId?: number;
  protected readonly label: HTMLLabelElement;
  public get changed(): boolean {
    return this.selectedId != (this.answer?.values[0].value ?? null);
  }

  constructor(
    part: IQuestionPart,
    partLayout: string,
    owner: Question,
    answer: IPartCollection
  ) {
    super(part, partLayout, owner, answer);
    this.label = this.element.querySelector("[data-bc-add-item]");
    this.selectedId = null;
  }

  protected async getValueAsync(id: number): Promise<IFixValue> {
    const rooUrl = this.part.link.split("?")[0];
    const url = `${rooUrl}?fixid=${id}`;
    return await HttpUtil.getDataAsync<IFixValue>(url);
  }

  protected setValue(value: IFixValue): boolean {
    const mustChange = this.selectedId !== value.id;
    if (mustChange) {
      this.element.querySelector("label").innerHTML = value.value;
      this.selectedId = value.id;
    }
    return mustChange;
  }

  public getAddedParts(): IUserActionPart {
    let retVal = null;
    if (!this.answer) {
      retVal = {
        part: this.part.part,
        values: [
          {
            value: this.selectedId,
          },
        ],
      };
    }
    return retVal;
  }

  public getEditedParts(): IUserActionPart {
    let retVal = null;
    if (
      this.answer &&
      this.selectedId &&
      this.answer.values[0].value != this.selectedId
    ) {
      retVal = {
        part: this.part.part,
        values: [
          {
            id: this.answer.values[0].id,
            value: this.selectedId,
          },
        ],
      };
    }
    return retVal;
  }

  public getDeletedParts(): IUserActionPart {
    let retVal = null;
    if (this.answer && !this.selectedId) {
      retVal = this.answer;
    }
    return retVal;
  }
}
