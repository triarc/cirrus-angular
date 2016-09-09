import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[layoutWrap]'
})
export class LayoutWrapDirective {
  @HostBinding('style.flex-wrap') flexWrap = 'wrap';

}