import Block from "../../tools/Block";
import store, { Message, StoreEvents } from "../../tools/Store";
import { ComponentsName } from "../../tools/validationRules";
import { Button } from "../button";
import { InputMessage } from "../input-message";
import { MessageItem } from "../message-item";
import { MessageBlockEmpty } from "../messageBlockEmpty";
import { Modal } from "../modalUserAdd";
import { ModalUserDelete } from "../modalUserDelete";
import "./message-list.css";

import MessageListRaw from "./message-list.hbs";

interface Props {
  [key: string]: unknown;
}

export class MessageList extends Block {
  constructor(props: Props) {
    super({
      ...props,
    });
    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState());
    });
  }

  override render() {
    return this.compile(MessageListRaw, this.props);
  }

  init() {
    const closeModal = () => {
      this.children.modal.setProps({ isOpen: false });
      console.log("srabotalo");
    };
    const closeModalDeleteUser = () => {
      this.children.modalUserDelete.setProps({ isOpen: false });
      console.log("srabotalo");
    };
    this.children.messageItems = [new MessageBlockEmpty({})];
    this.children.modal = new Modal({ closeModal: closeModal });
    this.children.modalUserDelete = new ModalUserDelete({
      closeModal: closeModalDeleteUser,
    });
  }

  componentDidUpdate(
    oldProps: Props,
    newProps: { messages: Message[] }
  ): boolean {
    if (newProps.messages && newProps.messages.length >= 0) {
      const currentStore = store.getState();
      this.children.messageItems = newProps.messages.map(message => {
        const isMessageFromCurrentUser =
          currentStore.user.id == message.user_id;
        return new MessageItem({
          text: message.content,
          timestamp: message.time,
          isUserMessage: isMessageFromCurrentUser,
        });
      });

      const openModal = () => {
        this.children.modal.setProps({ isOpen: true });
      };
      const openModalDeleteUser = () => {
        this.children.modalUserDelete.setProps({ isOpen: true });
      };

      this.children.button_primary = new Button({
        text: "Add user",
        page: "chat-page",
        className: "button-for-chat",
        type: "button",
        onClick: openModal,
      });
      this.children.button_delete_user = new Button({
        text: "Delete user",
        page: "chat-page",
        className: "button-for-chat",
        type: "button",
        onClick: openModalDeleteUser,
      });

      this.children.inputmessage = new InputMessage({
        type: "submit",

        name: ComponentsName.MESSAGE,
      });
    }

    return true;
  }
}
