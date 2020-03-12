import DateTimeFormat = Intl.DateTimeFormat;

export interface Image {
  url: string;
  userId: string;
  downloadsCount: number;
  creationTime: string;
}
