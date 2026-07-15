import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardRepository } from '../../../database/repositories/dashboard.repository';
import { FieldRepository } from '../../../database/repositories/field.repository';
import type { Field, FieldType } from '../../../models/field/field.model';
import { Button } from '../../../shared/components/button/button';
import { Icon } from '../../../shared/components/icon/icon';
import { IconButton } from '../../../shared/components/icon-button/icon-button';
import { Select, type SelectOption } from '../../../shared/components/select/select';

const FIELD_TYPE_OPTIONS: SelectOption[] = [
  { value: 'text', label: 'Text' },
  { value: 'longtext', label: 'Long text' },
  { value: 'number', label: 'Number' },
  { value: 'date', label: 'Date' },
  { value: 'checkbox', label: 'Checkbox' },
];

const ADD_FIELD_TYPES: { type: FieldType; label: string; icon: string }[] = [
  { type: 'text', label: 'Text', icon: 'short_text' },
  { type: 'longtext', label: 'Long text', icon: 'notes' },
  { type: 'number', label: 'Number', icon: 'tag' },
  { type: 'date', label: 'Date', icon: 'calendar_today' },
  { type: 'checkbox', label: 'Checkbox', icon: 'check_box' },
];

const TYPE_ICONS: Record<FieldType, string> = {
  text: 'short_text',
  longtext: 'notes',
  number: 'tag',
  date: 'calendar_today',
  checkbox: 'check_box',
};

const DEFAULT_LABELS: Record<FieldType, string> = {
  text: 'Text field',
  longtext: 'Notes',
  number: 'Number',
  date: 'Date',
  checkbox: 'Done',
};

// Number-field widgets surface as stat cards on the (future) Dashboard Detail
// screen — capped at 3 so that layout stays generic across every dashboard.
const WIDGET_CAP = 3;

@Component({
  selector: 'app-field-builder',
  imports: [Icon, IconButton, Select, Button],
  templateUrl: './field-builder.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldBuilder {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dashboardRepository = inject(DashboardRepository);
  private readonly fieldRepository = inject(FieldRepository);

  private readonly dashboardId = this.route.snapshot.paramMap.get('dashboardId') ?? '';

  protected readonly dashboardName = signal('');
  protected readonly fields = signal<Field[]>([]);
  protected readonly addFieldTypes = ADD_FIELD_TYPES;
  protected readonly fieldTypeOptions = FIELD_TYPE_OPTIONS;

  protected readonly widgetCount = computed(
    () => this.fields().filter((field) => field.type === 'number' && field.showAsWidget).length,
  );

  constructor() {
    this.dashboardRepository
      .getById(this.dashboardId)
      .then((dashboard) => this.dashboardName.set(dashboard?.name ?? ''));
    this.fieldRepository
      .listByDashboard(this.dashboardId)
      .then((fields) => this.fields.set(fields));
  }

  protected typeIcon(type: FieldType): string {
    return TYPE_ICONS[type];
  }

  protected async addField(type: FieldType): Promise<void> {
    const showAsWidget = type === 'number' && this.widgetCount() < WIDGET_CAP;
    const field = await this.fieldRepository.create({
      dashboardId: this.dashboardId,
      label: DEFAULT_LABELS[type],
      type,
      sortOrder: this.fields().length,
      showAsWidget,
    });
    this.fields.update((current) => [...current, field]);
  }

  protected async removeField(id: string): Promise<void> {
    await this.fieldRepository.delete(id);
    this.fields.update((current) => current.filter((field) => field.id !== id));
  }

  protected onLabelInput(id: string, event: Event): void {
    void this.updateLabel(id, (event.target as HTMLInputElement).value);
  }

  protected onTypeChange(id: string, type: string): void {
    void this.updateType(id, type as FieldType);
  }

  protected async toggleWidget(id: string): Promise<void> {
    const field = this.fields().find((current) => current.id === id);
    if (!field || field.type !== 'number') {
      return;
    }
    if (!field.showAsWidget && this.widgetCount() >= WIDGET_CAP) {
      return;
    }
    const showAsWidget = !field.showAsWidget;
    this.fields.update((current) =>
      current.map((existing) => (existing.id === id ? { ...existing, showAsWidget } : existing)),
    );
    await this.fieldRepository.update(id, { showAsWidget });
  }

  protected moveFieldUp(id: string): void {
    void this.swapFields(id, -1);
  }

  protected moveFieldDown(id: string): void {
    void this.swapFields(id, 1);
  }

  protected done(): void {
    this.router.navigate(['/dashboards', this.dashboardId]);
  }

  private async updateLabel(id: string, label: string): Promise<void> {
    this.fields.update((current) =>
      current.map((field) => (field.id === id ? { ...field, label } : field)),
    );
    await this.fieldRepository.update(id, { label });
  }

  private async updateType(id: string, type: FieldType): Promise<void> {
    const showAsWidget =
      type === 'number' && (this.fields().find((field) => field.id === id)?.showAsWidget ?? false);
    this.fields.update((current) =>
      current.map((field) => (field.id === id ? { ...field, type, showAsWidget } : field)),
    );
    await this.fieldRepository.update(id, { type, showAsWidget });
  }

  private async swapFields(id: string, direction: -1 | 1): Promise<void> {
    const current = this.fields();
    const index = current.findIndex((field) => field.id === id);
    const targetIndex = index + direction;
    if (index < 0 || targetIndex < 0 || targetIndex >= current.length) {
      return;
    }
    const field = current[index];
    const target = current[targetIndex];
    const reordered = [...current];
    reordered[index] = { ...target, sortOrder: field.sortOrder };
    reordered[targetIndex] = { ...field, sortOrder: target.sortOrder };
    this.fields.set(reordered);
    await Promise.all([
      this.fieldRepository.update(field.id, { sortOrder: target.sortOrder }),
      this.fieldRepository.update(target.id, { sortOrder: field.sortOrder }),
    ]);
  }
}
