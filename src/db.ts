import Dexie, { Table } from 'dexie';
export interface IntroSection {
  id: number;
  inputName: string;
  description: string;
}

export interface QuoteSection {
  id: number;
  quote: string;
  writer: string;
}

export interface PublicPageSection {
  id: string;
  uid: number;
  title: string;
  description: string;
  img: string;
  url: string
}

export class AppDB extends Dexie {
  introSectionData!: Table<IntroSection, number>;
  quoteSectionData!: Table<QuoteSection, number>;
  publicSectionData!: Table<PublicPageSection, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      introSectionData: '++id, inputName, description',
      quoteSectionData: '++id, quote, writer',
      publicSectionData: '++uid, title, description, img, url'
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

  async fetchQuote(id: number): Promise<QuoteSection | any> {
    try {
      return await db.quoteSectionData.get(id)
    } catch (error) {
      throw error
    }
  }

  async addQuote(data: QuoteSection): Promise<any> {
    try {
      const updatedData = await db.quoteSectionData.add({
        id: data?.id || 1,
        quote: data?.quote,
        writer: data?.writer
      }, 1)
      return updatedData
    } catch (error) {
      throw error
    }
  }

  async updateQuote(data: QuoteSection): Promise<any> {
    try {
      const updatedData = await db.quoteSectionData.update(1, {
        quote: data?.quote,
        writer: data?.writer
      })
      return updatedData
    } catch (error) {
      throw error
    }
  }

  async fetchPublicPageData() {
    try {
      return await db.publicSectionData?.toArray();
    } catch (error) {
      throw error
    }
  }

  async addPublicData(data: PublicPageSection): Promise<any> {
    try {
      const updatedData = await db.publicSectionData.add({
        id: data?.id,
        uid: data?.uid,
        title: data?.title,
        description: data?.description,
        img: data?.img,
        url: data?.url
      })
      return updatedData
    } catch (error) {
      throw error
    }
  }

  async updatePublicData(data: PublicPageSection): Promise<any> {
    try {
      const updatedData = await db.publicSectionData.update(data?.uid, {
        title: data?.title,
        description: data?.description,
        img: data?.img,
        url: data?.url
      })
      return updatedData
    } catch (error) {
      throw error
    }
  }
}

export const db = new AppDB();
