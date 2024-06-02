import {Component, Input, OnInit} from '@angular/core';
import {ConversationElement} from "./conversation-element";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-conversation-element',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './conversation-element.component.html',
  styleUrl: './conversation-element.component.scss'
})
export class ConversationElementComponent {
  @Input() conversationElement!: ConversationElement | undefined;
}
