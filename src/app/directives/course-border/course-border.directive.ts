import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appCourseBorder]',
})
export class CourseBorderDirective implements OnInit {
  @Input() creationDate!: Date;
  @Input() freshBorderColor: string = 'green';
  @Input() upcomingBorderColor: string = 'blue';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const currentDate = new Date();
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(currentDate.getDate() - 14);

    const isFreshCourse =
      this.creationDate < currentDate && this.creationDate >= fourteenDaysAgo;
    const isUpcomingCourse = this.creationDate > currentDate;

    if (isFreshCourse) {
      this.el.nativeElement.style.border = `2px solid ${this.freshBorderColor}`;
    } else if (isUpcomingCourse) {
      this.el.nativeElement.style.border = `2px solid ${this.upcomingBorderColor}`;
    }
  }
}
