import { Injectable, inject } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { OrbitraDatabase } from '../schema/orbitra.db';
import {
  DashboardSchema,
  DashboardUpdateSchema,
  type Dashboard,
} from '../../models/dashboard/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardRepository {
  private readonly db = inject(OrbitraDatabase);

  async create(dashboard: Omit<Dashboard, 'id'>): Promise<Dashboard> {
    const record: Dashboard = DashboardSchema.parse({ ...dashboard, id: uuidv4() });
    await this.db.dashboards.add(record);
    return record;
  }

  getById(id: string): Promise<Dashboard | undefined> {
    return this.db.dashboards.get(id);
  }

  listByUser(userId: string): Promise<Dashboard[]> {
    return this.db.dashboards.where('userId').equals(userId).sortBy('sortOrder');
  }

  async update(id: string, changes: Partial<Omit<Dashboard, 'id'>>): Promise<void> {
    await this.db.dashboards.update(id, DashboardUpdateSchema.parse(changes));
  }

  /** Deletes the dashboard along with all of its fields and entries. */
  async delete(id: string): Promise<void> {
    await this.db.transaction(
      'rw',
      this.db.dashboards,
      this.db.fields,
      this.db.entries,
      async () => {
        await this.db.fields.where('dashboardId').equals(id).delete();
        await this.db.entries.where('dashboardId').equals(id).delete();
        await this.db.dashboards.delete(id);
      },
    );
  }
}
