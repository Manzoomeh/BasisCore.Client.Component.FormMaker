import { IPartCollection, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/layout.html";
import Question from "../../question/Question";
import QuestionPart from "../../question-part/QuestionPart";
import { IUserActionPart } from "../../form-maker/IUserActionResult";

export default class UnknownType extends QuestionPart {
  public get changed(): boolean {
    return false;
  }

  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
  }

  public getUserActionPart(): IUserActionPart {
    throw new Error("Method not implemented.");
    return null;
  }
}
