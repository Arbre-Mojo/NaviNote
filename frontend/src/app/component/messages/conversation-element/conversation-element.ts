import {Conversation} from "../../../../model/conversation";

export class ConversationElement {
  conversation: Conversation;
  class: string;

  constructor(conversation: Conversation) {
    this.conversation = conversation;
    this.class = "conversation-banner-body-div"
  }


  setClicked() {
    this.class = "conversation-banner-body-div-clicked";
  }

  setUnclicked() {
    this.class = "conversation-banner-body-div";
  }
}
