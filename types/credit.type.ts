export interface Credit {
  userId: number;
  balance: number;
  total: number;
  dailyBonusChargedAmount: number;
  lastResetDate: string;
}
