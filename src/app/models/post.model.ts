import { GroupingType } from './grouping-type.model';

export interface Post {
  [GroupingType.Author]: string;
  [GroupingType.Location]: string;
  [GroupingType.Time]: string;
  id: number;
  text: string;
}
