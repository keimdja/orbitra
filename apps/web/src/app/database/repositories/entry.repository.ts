import { Injectable, inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { OrbitraDatabase } from '../schema/orbitra.db';
import { EntrySchema, EntryUpdateSchema, type Entry } from '../../models/entry/entry.model';

@Injectable({ providedIn: 'root' })
export class EntryRepository {
  private readonly db = inject(OrbitraDatabase);

  async create(entry: Omit<Entry, 'id'>): Promise<Entry> {
    const record: Entry = EntrySchema.parse({ ...entry, id: uuidv4() });
    await this.db.entries.add(record);
    return record;
  }

  getById(id: string): Promise<Entry | undefined> {
    return this.db.entries.get(id);
  }

  /**
   * Returns entries in no particular order — Entry has no guaranteed date.
   * Callers that need chronological order must sort client-side using
   * whichever date-type Field the dashboard's schema defines, if any.
   */
  listByDashboard(dashboardId: string): Promise<Entry[]> {
    return this.db.entries.where('dashboardId').equals(dashboardId).toArray();
  }

  async update(id: string, changes: Partial<Omit<Entry, 'id'>>): Promise<void> {
    await this.db.entries.update(id, EntryUpdateSchema.parse(changes));
  }

  delete(id: string): Promise<void> {
    return this.db.entries.delete(id);
  }
}
