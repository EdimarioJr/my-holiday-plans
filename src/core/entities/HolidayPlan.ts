export interface IHolidayPlan {
  id: string;
  description: string;
  title: string;
  location: string;
  participant?: string;
  date: Date;
}

export class HolidayPlan implements IHolidayPlan {
  id: string;
  description: string;
  title: string;
  location: string;
  participant: string;
  date: Date;

  constructor(data: IHolidayPlan) {
    this.id = data.id;
    this.description = data.description;
    this.title = data.title;
    this.location = data.location;
    this.participant = data.participant ?? "";
    this.date = data.date ?? new Date();
  }

  toObject(): IHolidayPlan {
    return { ...this };
  }
}
