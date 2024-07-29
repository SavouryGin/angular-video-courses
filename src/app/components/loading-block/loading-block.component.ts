import { Component } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-loading-block',
  templateUrl: './loading-block.component.html',
  styleUrls: ['./loading-block.component.scss'],
})
export class LoadingBlockComponent {
  constructor(public loadingService: LoadingService) {}
}
