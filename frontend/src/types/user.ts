import { Icon } from "./icon";

export interface User {
  userId: string;
  username: string;
  icon: Icon;
  description: string;
  joinDate: string;
  verified: boolean;
}
