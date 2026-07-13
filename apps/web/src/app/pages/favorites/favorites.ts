import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-favorites',
  template: `<div class="p-10 text-sm text-text-3">Favorites — coming soon.</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Favorites {}
