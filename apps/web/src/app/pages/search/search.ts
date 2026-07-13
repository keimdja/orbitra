import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search',
  template: `<div class="p-10 text-sm text-text-3">Search — coming soon.</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Search {}
