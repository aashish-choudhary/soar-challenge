export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  dateOfBirth: string;
  presentAddress: string;
  permanentAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Card {
  id: string;
  type: "visa" | "mastercard";
  number: string;
  holder: string;
  validThru: string;
  balance: number;
  variant: "dark" | "light";
}

export interface Transaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: "credit" | "debit";
  icon: "card" | "paypal" | "transfer";
}

export interface ChartData {
  weeklyActivity: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
  balanceHistory: {
    labels: string[];
    data: number[];
  };
  expenseStatistics: {
    label: string;
    value: number;
  }[];
}
