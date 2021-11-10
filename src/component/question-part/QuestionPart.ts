import { IPartCollection, IQuestionPart } from "../form-maker/ISchema";
import HttpUtil from "../../HttpUtil";
import Question from "../question/Question";
import { IUserActionPart } from "../form-maker/IUserActionResult";
import layout from "./assets/layout.html";
import "./assets/style";

export default abstract class QuestionPart {
  public readonly part: IQuestionPart;
  protected readonly element: Element;
  protected readonly owner: Question;
  protected readonly answer: IPartCollection;

  constructor(
    part: IQuestionPart,
    partLayout: string,
    owner: Question,
    answer: IPartCollection
  ) {
    this.owner = owner;
    this.answer = answer;
    this.part = part;
    this.element = HttpUtil.parse(layout).querySelector("[data-bc-part]");
    this.element.innerHTML = partLayout;
    this.owner.element.appendChild(this.element);
    this.element.setAttribute("data-bc-part-related-cell", "");
  }

  protected formatString(): string {
    const data = {
      rKey: this.owner.options.rKey,
      prpId: this.owner.question.prpId,
      part: this.part.part,
    };
    const url = HttpUtil.formatString(this.part.link, data);
    return url;
  }

  public abstract getAddedParts(): IUserActionPart;
  public abstract getEditedParts(): IUserActionPart;
  public abstract getDeletedParts(): IUserActionPart;
}
