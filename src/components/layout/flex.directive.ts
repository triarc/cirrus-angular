import {Directive, Input, HostBinding} from '@angular/core';

@Directive({
  selector: '[flex]'
})
export class FlexDirective {
  @Input() flex: string;

  @HostBinding('style.flex')
  get style() {
    let grow = '1';
    let shrink = '1';
    let flex = 'auto';

    if (!isNaN(parseInt(this.flex))) {
      flex = this.flex + '%';
    } else if (this.flex === '') {
      flex = '';
    } else if (this.flex === 'none') {
      grow = '0';
      shrink = '0';
    } else if (this.flex === 'initial') {
      grow = '0';
    } else if (this.flex === 'auto') {
      // default values
    } else if (this.flex === 'grow') {
      flex = '100%';
    } else if (this.flex === 'noshrink') {
      shrink = '0';
    } else {
      console.log('unsupported flex value: ', this.flex);
      return '';
    }

    return `${grow} ${shrink} ${flex}`;
  }
}