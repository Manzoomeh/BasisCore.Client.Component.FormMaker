import Question from "../../question/Question";
import { IPartCollection, IQuestionPart } from "../../form-maker/ISchema";
import EditableQuestionPart from "../../question-part/EditableQuestionPart";
import { IUserActionPart } from "../../form-maker/IUserActionResult";

export interface ITestElement {
  value: string;
}

export default abstract class TextBaseType<
  TTextElementType extends ITestElement
> extends EditableQuestionPart {
  protected readonly input: TTextElementType;
  constructor(
    part: IQuestionPart,
    partLayout: string,
    owner: Question,
    answer: IPartCollection
  ) {
    super(part, partLayout, owner, answer);
    this.input = this.element.querySelector<any>("[data-bc-text-input]");
    if (answer) {
      this.input.value = answer.values[0].value;
    }
  }

  public getAddedParts(): IUserActionPart {
    let retVal = null;
    if (!this.answer) {
      retVal = {
        part: this.part.part,
        values: [
          {
            value: this.input.value,
          },
        ],
      };
    }
    return retVal;
  }

  public getEditedParts(): IUserActionPart {
    let retVal = null;
    if (this.answer) {
      const changed = this.input.value != this.answer.values[0].value;
      if (changed && this.input.value.length > 0) {
        retVal = {
          part: this.part.part,
          values: [
            {
              id: this.answer.values[0].id,
              value: this.input.value,
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
      const changed = this.input.value != this.answer.values[0].value;
      if (changed && this.input.value.length == 0) {
        retVal = {
          part: this.part.part,
          values: [
            {
              id: this.answer.values[0].id,
              value: this.input.value,
            },
          ],
        };
      }
    }
    return retVal;
  }
}
