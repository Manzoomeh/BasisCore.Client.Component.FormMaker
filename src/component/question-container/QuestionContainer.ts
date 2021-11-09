import HttpUtil from "../../HttpUtil";
import Question from "../question/Question";
import IFormMakerOptions from "../form-maker/IFormMakerOptions";
import { IAnswerPart, IAnswerProperty, IQuestion } from "../form-maker/ISchema";
import layout from "./assets/layout.html";
import "./assets/style";
import { IUserActionAnswer, IUserActionProperty } from "../form-maker/IUserActionResult";

export default class QuestionContainer {
  private readonly questionSchema: IQuestion;
  protected readonly element: Element;
  private readonly _questions: Array<Question> = new Array<Question>();
  public readonly options: IFormMakerOptions;
  public readonly answer: IAnswerProperty;
  private _removedQuestions: Array<number>;

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
      this.answer.answers.forEach((answer) => this.addQuestion(answer));
    } else {
      this.addQuestion(null);
    }
  }

  public addQuestion(answer?: IAnswerPart): Question {
    const question = new Question(this.questionSchema, this.options, this, this.element, answer);
    this._questions.forEach((x) => x.setRemovable());
    this._questions.push(question);
    return question;
  }

  public onQuestionRemove(question: Question) {
    const index = this._questions.indexOf(question);
    this._questions.splice(index, 1);
    if (question.answer) {
      if (!this._removedQuestions) {
        this._removedQuestions = [];
      }
      this._removedQuestions.push(question.answer.id);
    }
  }

  public getUserAction(): IUserActionProperty {
    let userAction: IUserActionProperty = null;
    let added: Array<IUserActionAnswer> = null;
    let edited: Array<IUserActionAnswer> = null;
    let deleted: Array<IUserActionAnswer> = null;
    if (this._removedQuestions) {
      deleted = this._removedQuestions.map((x) => {
        return {
          id: x,
        };
      });
    }
    const addedQuestion = this._questions.filter((x) => !x.answer?.id);
    if (addedQuestion.length > 0) {
      added = addedQuestion.map((x) => x.getAsUserAction()).filter((x) => x);
    }

    const editedQuestion = this._questions.filter((x) => x.answer?.id);
    if (editedQuestion.length > 0) {
      edited = editedQuestion.map((x) => x.getUserEditAction()).filter((x) => x);
    }

    if (added?.length > 0 || edited?.length > 0 || deleted?.length > 0) {
      console.log(added, edited, deleted, this.element);
      userAction = {
        propId: this.questionSchema.prpId,
        ...(added ? added : added),
        ...(edited ? edited : edited),
        ...(deleted ? deleted : deleted),
      };
    }
    return userAction;
  }
}
