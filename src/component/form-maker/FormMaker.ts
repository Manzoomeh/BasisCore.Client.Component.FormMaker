import HttpUtil from "../../HttpUtil";
import IFormMakerOptions from "./IFormMakerOptions";
import ISchema from "./ISchema";
import layout from "./assets/layout.html";
import "./assets/style";
import Question from "../question/Question";

export default class FormMaker {
  private readonly _options: IFormMakerOptions;
  private readonly _container: HTMLElement;
  private _question: Array<Question>;

  private static get defaultOptions(): Partial<IFormMakerOptions> {
    return {
      mode: "new",
    };
  }

  constructor(container: HTMLElement, options: IFormMakerOptions) {
    this._options = {
      ...FormMaker.defaultOptions,
      ...(options ?? ({} as any)),
    };
    this._container = container;
    this._container.innerHTML = layout;
  }

  public async loadUIFromQuestion(): Promise<void> {
    const schema = await HttpUtil.getDataAsync<ISchema>(this._options.questionUrl);
    var container = this._container.querySelector("[data-bc-property-container]");
    this._question = schema.questions.map(
      (question) => new Question(question, this._options, container)
    );
  }
}
