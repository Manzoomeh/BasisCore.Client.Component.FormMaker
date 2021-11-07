import HttpUtil from "../../HttpUtil";
import Question from "../question/Question";
import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import { IAnswerPart, IAnswerProperty, IQuestion } from "../form-maker/ISchema";
import layout from "./assets/layout.html";
import "./assets/style";

export default class QuestionContainer {
  private readonly questionSchema: IQuestion;
  protected readonly element: Element;
  //private readonly _answer: AnswerCollection;
  private readonly _questions: Array<Question> = new Array<Question>();
  public readonly options: IFormMakerOptions;
  public readonly answer: IAnswerProperty;

  constructor(
    questionSchema: IQuestion,
    options: IFormMakerOptions,
    container: Element,
    answer: IAnswerProperty
  ) {
    this.questionSchema = questionSchema;
    this.options = options;
    this.answer = answer;
    var copyTemplate = layout.replace("@title", this.questionSchema.title);
    const uiElement = HttpUtil.parse(copyTemplate).querySelector("[data-bc-question]");
    this.element = uiElement.querySelector("[data-bc-answer-collection]");
    const headerContainer = uiElement.querySelector("[data-bc-answer-title-container]");
    if (questionSchema.parts.length > 1) {
      const template = document.createElement("div");
      template.setAttribute("data-bc-answer-title", "");
      template.setAttribute("data-bc-part-related-cell", "");
      questionSchema.parts.forEach((part) => {
        const cpy = template.cloneNode();
        cpy.appendChild(document.createTextNode(part.caption));
        headerContainer.appendChild(cpy);
      });
    } else {
      headerContainer.remove();
    }

    container.appendChild(uiElement);
    if (answer) {
      this.answer.answers.forEach((answer) => this.addAnswer(answer));
    } else {
      this.addAnswer(null);
    }
  }

  addAnswer(data?: IAnswerPart): Question {
    const question = new Question(this.questionSchema, this.options, this, this.element, data);
    this._questions.forEach((x) => x.setRemovable());
    this._questions.push(question);
    return question;
  }
}
