export interface UserData {
  userName: string;
  sites: Site[];
  money: number;
}

export interface Site {
  id: string;
  siteName: string;
  userName: string;
  password: string;
}
