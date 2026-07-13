import { Injectable, inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { OrbitraDatabase } from '../schema/orbitra.db';
import { FieldSchema, FieldUpdateSchema, type Field } from '../../models/field/field.model';

@Injectable({ providedIn: 'root' })
export class FieldRepository {
  private readonly db = inject(OrbitraDatabase);

  async create(field: Omit<Field, 'id'>): Promise<Field> {
    const record: Field = FieldSchema.parse({ ...field, id: uuidv4() });
    await this.db.fields.add(record);
    return record;
  }

  getById(id: string): Promise<Field | undefined> {
    return this.db.fields.get(id);
  }

  listByDashboard(dashboardId: string): Promise<Field[]> {
    return this.db.fields.where('dashboardId').equals(dashboardId).sortBy('sortOrder');
  }

  async update(id: string, changes: Partial<Omit<Field, 'id'>>): Promise<void> {
    await this.db.fields.update(id, FieldUpdateSchema.parse(changes));
  }

  delete(id: string): Promise<void> {
    return this.db.fields.delete(id);
  }
}
