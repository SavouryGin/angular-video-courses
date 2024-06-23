import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
