import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

export type TextInputType = 'text' | 'email' | 'number' | 'date';

let nextId = 0;

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInput {
  readonly label = input<string>('');
  readonly type = input<TextInputType>('text');
  readonly placeholder = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly value = model<string>('');

  protected readonly inputId = `text-input-${nextId++}`;

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLInputElement).value);
  }
}
