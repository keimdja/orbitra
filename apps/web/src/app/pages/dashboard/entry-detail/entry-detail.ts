import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-entry-detail',
  template: `<div class="p-10 text-sm text-text-3">Entry detail — coming soon.</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryDetail {}
