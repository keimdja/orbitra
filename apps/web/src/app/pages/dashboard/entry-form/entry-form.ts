import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-entry-form',
  template: `<div class="p-10 text-sm text-text-3">Entry form — coming soon.</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryForm {}
