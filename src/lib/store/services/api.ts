import { mockDelay } from "@/lib/utils";
import { Card, ChartData, Contact, Transaction, User } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Mock API base URL
const BASE_URL = "/api";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getUser: builder.query<User, void>({
      queryFn: async () => {
        await mockDelay();
        return {
          data: {
            id: "1",
            name: "Charlene Reed",
            email: "charlenereed@gmail.com",
            avatar:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            dateOfBirth: "25 January 1990",
            presentAddress: "San Jose, California, USA",
            permanentAddress: "San Jose, California, USA",
            city: "San Jose",
            postalCode: "45962",
            country: "USA",
          },
        };
      },
    }),
    getCards: builder.query<Card[], void>({
      queryFn: async () => {
        await mockDelay();
        return {
          data: [
            {
              id: "1",
              type: "visa",
              number: "3778 **** **** 1234",
              holder: "Eddy Cusuma",
              validThru: "12/22",
              balance: 5756,
              variant: "dark",
            },
            {
              id: "2",
              type: "mastercard",
              number: "3778 **** **** 5678",
              holder: "Eddy Cusuma",
              validThru: "12/22",
              balance: 5756,
              variant: "light",
            },
            {
              id: "3",
              type: "mastercard",
              number: "3778 **** **** 5678",
              holder: "Eddy Cusuma",
              validThru: "12/22",
              balance: 5756,
              variant: "light",
            },
            {
              id: "4",
              type: "mastercard",
              number: "3778 **** **** 5678",
              holder: "Eddy Cusuma",
              validThru: "12/22",
              balance: 5756,
              variant: "light",
            },
          ],
        };
      },
    }),
    getTransactions: builder.query<Transaction[], void>({
      queryFn: async () => {
        await mockDelay();
        return {
          data: [
            {
              id: "1",
              title: "Deposit from my Card",
              date: "28 January 2021",
              amount: 850,
              type: "debit",
              icon: "card",
            },
            {
              id: "2",
              title: "Deposit Paypal",
              date: "25 January 2021",
              amount: 2500,
              type: "credit",
              icon: "paypal",
            },
            {
              id: "3",
              title: "Jemi Wilson",
              date: "21 January 2021",
              amount: 5400,
              type: "credit",
              icon: "transfer",
            },
            {
              id: "4",
              title: "Jemi Wilson",
              date: "21 January 2021",
              amount: 5400,
              type: "credit",
              icon: "transfer",
            },
            {
              id: "5",
              title: "Jemi Wilson",
              date: "21 January 2021",
              amount: 5400,
              type: "credit",
              icon: "transfer",
            },
            {
              id: "6",
              title: "Jemi Wilson",
              date: "21 January 2021",
              amount: 5400,
              type: "credit",
              icon: "transfer",
            },
          ],
        };
      },
    }),
    getChartData: builder.query<ChartData, void>({
      queryFn: async () => {
        await mockDelay();
        return {
          data: {
            weeklyActivity: {
              labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
              datasets: [
                {
                  label: "Withdraw",
                  data: [450, 340, 320, 380, 150, 350, 380],
                },
                {
                  label: "Deposit",
                  data: [220, 120, 250, 350, 230, 230, 330],
                },
              ],
            },
            balanceHistory: {
              labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
              data: [300, 250, 450, 500, 750, 250, 600],
            },
            expenseStatistics: [
              { label: "Entertainment", value: 30 },
              { label: "Bill Expense", value: 15 },
              { label: "Investment", value: 20 },
              { label: "Others", value: 35 },
            ],
          },
        };
      },
    }),
    getContacts: builder.query<Contact[], void>({
      queryFn: async () => {
        await mockDelay();
        return {
          data: [
            {
              id: "1",
              name: "Livia Bator",
              role: "CEO",
              avatar:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            },
            {
              id: "2",
              name: "Randy Press",
              role: "Director",
              avatar:
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
            },
            {
              id: "3",
              name: "Workman",
              role: "Designer",
              avatar:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
            },
            {
              id: "4",
              name: "Livia Bator",
              role: "CEO",
              avatar:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            },
            {
              id: "5",
              name: "Randy Press",
              role: "Director",
              avatar:
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
            },
            {
              id: "6",
              name: "Workman",
              role: "Designer",
              avatar:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
            },
            {
              id: "7",
              name: "Livia Bator",
              role: "CEO",
              avatar:
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
            },
            {
              id: "8",
              name: "Randy Press",
              role: "Director",
              avatar:
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
            },
            {
              id: "9",
              name: "Workman",
              role: "Designer",
              avatar:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
            },
          ],
        };
      },
    }),
  }),
});
export const {
  useGetUserQuery,
  useGetCardsQuery,
  useGetTransactionsQuery,
  useGetChartDataQuery,
  useGetContactsQuery,
} = api;
