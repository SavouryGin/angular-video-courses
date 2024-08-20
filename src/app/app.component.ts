import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-gmp-2024';

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'de', 'ru']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }
}
