import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss'],
})
export class NumericInputComponent {
  @Input() label: string = '';
  @Input() value: number | string = '';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() min: number | string = '';
  @Input() max: number | string = '';
  @Input() step: number | string = '1';
  @Output() valueChange: EventEmitter<number | string> = new EventEmitter<
    number | string
  >();

  handleInputChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.valueChange.emit(inputElement.value);
  }
}
