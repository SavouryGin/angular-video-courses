import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appCourseBorder]',
})
export class CourseBorderDirective implements OnChanges {
  @Input() date!: Date;
  @Input() freshBorderColor: string = 'green';
  @Input() upcomingBorderColor: string = 'blue';

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['date'] && this.date) {
      this.setBorder();
    }
  }

  private setBorder() {
    const currentDate = new Date();
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(currentDate.getDate() - 14);

    const isFreshCourse =
      this.date < currentDate && this.date >= fourteenDaysAgo;
    const isUpcomingCourse = this.date > currentDate;

    if (isFreshCourse) {
      this.el.nativeElement.style.border = `2px solid ${this.freshBorderColor}`;
    } else if (isUpcomingCourse) {
      this.el.nativeElement.style.border = `2px solid ${this.upcomingBorderColor}`;
    }
  }
}
