import Question from "../../question/Question";
import { IAnswerPart, IFixValue, IPartCollection, IQuestionPart } from "../../form-maker/ISchema";
import layout from "./assets/auto-complete-multi-type.html";
import "./assets/style";
import AutoCompleteType from "./AutoCompleteType";
import SearchPopup from "./SearchPopup";

export default class AutoCompleteMultiType extends AutoCompleteType {
  constructor(part: IQuestionPart, owner: Question, answer: IPartCollection) {
    super(part, layout, owner);
    owner.replaceAddClick(this.onShowPopUpBtnClick.bind(this));
    const value = answer?.values[0];
    if (value) {
      this.setValue({ id: value.value, value: value.title });
    }
  }

  private onShowPopUpBtnClick() {
    const popup = new SearchPopup(this.part.link, this.setValue.bind(this), true);
  }

  protected setValue(value: IFixValue): boolean {
    if (!this._value) {
      super.setValue(value);
    } else {
      var p: IAnswerPart = {
        id: null,
        parts: [
          {
            part: this.part.part,
            values: [
              {
                id: null,
                title: value.value,
                value: value.id,
              },
            ],
          },
        ],
      };
      this.owner.owner.addAnswer(p);
    }
    return true;
  }
}
