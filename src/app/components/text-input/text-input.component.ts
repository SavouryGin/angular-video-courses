import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() name: string = '';
  @Input() placeholder: string = '';
  @Input() id: string = '';
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  handleInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value);
  }
}
