import Dexie, { Table } from 'dexie';
export interface IntroSection {
  id: number;
  inputName: string;
  description: string;
}

export class AppDB extends Dexie {
  introSectionData!: Table<IntroSection, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      introSectionData: '++id, inputName, description',
    });
  }

  async fetchIntroData(id: number): Promise<IntroSection | any> {
    try {
      return await db.introSectionData.get(id)
    } catch (error) {
      throw error
    }
  }

  async addData(data: IntroSection): Promise<any> {
    try {
      const updatedData = await db.introSectionData.add({
        id: data?.id || 1,
        inputName: data?.inputName,
        description: data?.description
      }, 1)
      return updatedData
    } catch (error) {
      throw error
    }
  }

  async updateData(data: IntroSection): Promise<any> {
    try {
      const updatedData = await db.introSectionData.update(1, {
        id: data?.id || 1,
        inputName: data?.inputName,
        description: data?.description
      })
      return updatedData
    } catch (error) {
      throw error
    }
  }
}

export const db = new AppDB();
