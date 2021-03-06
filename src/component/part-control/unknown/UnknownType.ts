import { IPartCollection, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";
import Question from "../../question/Question";
import EditableQuestionPart from "../../question-part/EditableQuestionPart";
import { IUserActionPart } from "../../form-maker/IUserActionResult";

export default class UnknownType extends EditableQuestionPart {
  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
  }

  public getAddedParts(): IUserActionPart {
    return null;
  }

  public getEditedParts(): IUserActionPart {
    return null;
  }

  public getDeletedParts(): IUserActionPart {
    return null;
  }
}
