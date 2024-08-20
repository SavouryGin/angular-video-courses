import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss'],
})
export class LanguageSelectComponent {
  languages = [
    { code: 'en', label: 'English' },
    { code: 'de', label: 'German' },
    { code: 'ru', label: 'Russian' },
  ];

  constructor(private translate: TranslateService) {}

  changeLanguage(event: Event) {
    this.translate.use((event.target as HTMLInputElement).value);
  }
}
