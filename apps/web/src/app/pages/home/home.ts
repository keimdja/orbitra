import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `<div class="p-10 text-sm text-text-3">Home — coming soon.</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {}
