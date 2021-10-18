import HttpUtil from "../../HttpUtil";
import IFormMakerOptions from "./IFormMakerOptions";
import ISchema from "./ISchema";
import layout from "./assets/layout.html";
import "./assets/style";
import Question from "../question/Question";

export default class FormMaker {
  readonly options: IFormMakerOptions;
  private readonly _container: HTMLElement;
  private _question: Map<number, Question>;

  private static get defaultOptions(): Partial<IFormMakerOptions> {
    return {
      mode: "new",
    };
  }

  constructor(container: HTMLElement, options: IFormMakerOptions) {
    this.options = {
      ...FormMaker.defaultOptions,
      ...(options ?? ({} as any)),
    };
    this._container = container;
    this._container.innerHTML = layout;
  }

  public async loadUIFromQuestion(): Promise<void> {
    const schema = await HttpUtil.getDataAsync<ISchema>(
      this.options.questionUrl
    );
    var container = this._container.querySelector(
      "[data-bc-property-container]"
    );
    this._question = new Map<number, Question>();
    schema.questions.forEach((question) =>
      this._question.set(
        question.prpId,
        new Question(question, this.options, container)
      )
    );
  }
}
