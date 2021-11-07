import { Priority } from "./basiscore/enum";
import IComponentManager from "./basiscore/IComponentManager";
import ISource from "./basiscore/ISource";
import IUserDefineComponent from "./basiscore/IUserDefineComponent";
import { SourceId } from "./basiscore/type-alias";
import FormMaker from "./component/form-maker/FormMaker";
import IFormMakerOptions from "./component/form-maker/IFormMakerOptions";

export default class BasisCoreFormMakerComponent implements IComponentManager {
  readonly owner: IUserDefineComponent;
  private formMaker: FormMaker;
  private container: HTMLDivElement;
  private sourceId: SourceId = null;

  constructor(owner: IUserDefineComponent) {
    this.owner = owner;
    this.owner.priority = Priority.none;
  }

  public async initializeAsync(): Promise<void> {
    const sourceId = await this.owner.getAttributeValueAsync("DataMemberName");
    this.container = document.createElement("div");
    this.owner.setContent(this.container);

    const optionName = await this.owner.getAttributeValueAsync("options");
    const option: IFormMakerOptions = optionName ? eval(optionName) : null;

    this.formMaker = new FormMaker(this.container, option);
    await this.formMaker.loadUIFromQuestionAsync();
  }

  public runAsync(source?: ISource): boolean {
    return true;
  }
}
