import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

export interface SelectOption {
  value: string;
  label: string;
}

let nextId = 0;

@Component({
  selector: 'app-select',
  templateUrl: './select.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Select {
  readonly label = input<string>('');
  readonly options = input.required<SelectOption[]>();
  readonly disabled = input<boolean>(false);
  readonly value = model<string>('');

  protected readonly selectId = `select-${nextId++}`;

  protected onChange(event: Event): void {
    this.value.set((event.target as HTMLSelectElement).value);
  }
}
