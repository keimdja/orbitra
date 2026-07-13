import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';

let nextId = 0;

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Textarea {
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly rows = input<number>(3);
  readonly disabled = input<boolean>(false);
  readonly value = model<string>('');

  protected readonly textareaId = `textarea-${nextId++}`;

  protected onInput(event: Event): void {
    this.value.set((event.target as HTMLTextAreaElement).value);
  }
}
