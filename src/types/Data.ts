import { IGame } from "./Game";

export interface IData {
  count: number;
  next: string;
  previous: string;
  results: IGame[];
}
