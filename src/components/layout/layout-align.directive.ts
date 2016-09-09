import {Directive, Input, HostBinding} from '@angular/core';

@Directive({
  selector: '[layoutAlign]'
})
export class LayoutAlignDirective {
  @Input() layoutAlign: string;

  @HostBinding('style.justify-content')
  get justify() {
    return this.getValues()[0];
  }

  @HostBinding('style.align-items')
  get align() {
    return this.getValues()[1];
  }

  private getValues() {
    let justify = 'start';
    let align = 'stretch';

    let split = this.layoutAlign.split(' ');
    if (split.length === 2) {
      justify = split[0];
      align = split[1];
    } else if (split.length === 1) {
      // stats with space so the single value is align
      if (this.layoutAlign.indexOf(' ') === 0) {
        align = split[0];
      } else {
        justify = split[0];
      }
    }

    if (justify === 'start' || justify === 'end') {
      justify = `flex-${justify}`;
    }
    if (align === 'start' || align === 'end') {
      align = `flex-${align}`;
    }

    return [justify, align];
  }
}