import {
  IFixValue,
  IPartCollection,
  IQuestionPart,
} from "../../form-maker/ISchema";
import layout from "./assets/layout.html";
import itemLayout from "./assets/item-layout.html";
import HttpUtil from "../../../HttpUtil";
import ListBaseType from "../ListBaseType";
import Question from "../../question/Question";
import {
  IUserActionPart,
  IUserActionPartValue,
} from "../../form-maker/IUserActionResult";

export default class CheckListType extends ListBaseType {
  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner, answer);
  }

  private getChangeSet(): Array<Array<IUserActionPartValue>> {
    let addedItems: Array<IUserActionPartValue> = null;
    let deletedItems: Array<IUserActionPartValue> = null;

    const selectedItems = Array.from(this.element.querySelectorAll("input"))
      .map((x) => (x.checked ? parseInt(x.value) : null))
      .filter((x) => x);

    if (this.answer) {
      deletedItems = this.answer.values
        .filter((x) => selectedItems.indexOf(x.value) == -1)
        .map((x) => {
          return { id: x.id, value: x.value };
        });
      addedItems = selectedItems
        .filter((x) => !this.answer.values.find((y) => y.value == x))
        .map((x) => {
          return { value: x };
        });
    } else {
      addedItems = selectedItems.map((x) => {
        return { value: x };
      });
    }
    return [
      addedItems?.length > 0 ? addedItems : null,
      deletedItems?.length > 0 ? deletedItems : null,
    ];
  }
  protected fillUI(values: Array<IFixValue>) {
    values.forEach((item) => {
      const newTemplate = itemLayout
        .replace("@title", item.value)
        .replace("@value", item.id.toString())
        .replace(
          "@checked",
          this.answer?.values.find((x) => x.value == item.id) ? "checked" : ""
        );
      const template = HttpUtil.parse(newTemplate).querySelector("div");
      this.element.querySelector("div").appendChild(template);
    });
  }

  public getAddedParts(): IUserActionPart {
    let retVal = null;
    const [addedItems, _] = this.getChangeSet();
    if (addedItems) {
      retVal = {
        part: this.part.part,
        values: addedItems,
      };
    }
    return retVal;
  }

  public getEditedParts(): IUserActionPart {
    return null;
  }

  public getDeletedParts(): IUserActionPart {
    let retVal = null;
    const [_, deletedItems] = this.getChangeSet();
    if (deletedItems) {
      retVal = {
        part: this.part.part,
        values: deletedItems,
      };
    }
    return retVal;
  }
}
