import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  template: `<div class="p-10 text-sm text-text-3">Settings — coming soon.</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {}
