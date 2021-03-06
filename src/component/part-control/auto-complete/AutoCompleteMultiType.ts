import Question from "../../question/Question";
import {
  IAnswerPart,
  IFixValue,
  IPartCollection,
  IQuestionPart,
} from "../../form-maker/ISchema";
import layout from "./assets/auto-complete-multi-type.html";
import "./assets/style";
import AutoCompleteType from "./AutoCompleteType";
import SearchPopup from "./SearchPopup";

export default class AutoCompleteMultiType extends AutoCompleteType {
  constructor(
    part: IQuestionPart,
    owner: Question,
    answer: IPartCollection,
    localAnswer: IPartCollection
  ) {
    super(part, layout, owner, answer);
    owner.replaceAddClick(this.onShowPopUpBtnClick.bind(this));
    const value = (answer ?? localAnswer)?.values[0];
    if (value) {
      this.getValueAsync(value.value).then((fixValue) =>
        this.setValue(fixValue)
      );
    }
  }

  private onShowPopUpBtnClick() {
    const popup = new SearchPopup(
      this.part.link,
      this.setValue.bind(this),
      true
    );
  }

  protected setValue(value: IFixValue): boolean {
    if (!this.selectedId) {
      super.setValue(value);
    } else {
      var p: IAnswerPart = {
        parts: [
          {
            part: this.part.part,
            values: [
              {
                value: value.id,
              },
            ],
          },
        ],
      };
      this.owner.owner.addQuestion(p);
    }
    return true;
  }
}
