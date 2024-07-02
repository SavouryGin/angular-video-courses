import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() id: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  handleInputChange(event: Event): void {
    const textAreaElement = event.target as HTMLTextAreaElement;
    this.valueChange.emit(textAreaElement.value);
  }
}
