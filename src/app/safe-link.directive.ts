import { Directive, ElementRef, inject, input } from "@angular/core";

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  }
})
export class SafeLinkDirective {
  queryParam = input('myapp', {alias: 'appSafeLink'})
  private hostElmentRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor(){
    console.log('Safelink directive is active!')
  }

  onConfirmLeavePage(event: MouseEvent){
    const wantsToLeave = window.confirm("Do you want to leave the app?");
    
    if(wantsToLeave){
      const address = this.hostElmentRef.nativeElement.href;
      this.hostElmentRef.nativeElement.href = address + '?from=' + this.queryParam();
      return;
    }

    event.preventDefault();
  }
}