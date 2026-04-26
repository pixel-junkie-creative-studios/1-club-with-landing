import { create } from 'zustand';

export interface PitchedIdea {
  id: string;
  name: string;
  description: string;
  industry: string;
  status: 'Pending Review' | 'Accepted' | 'Rejected';
  date: string;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'transfer' | 'investment' | 'mining' | 'service';
  title: string;
  amount: number;
  date: string;
  positive?: boolean;
}

interface AppState {
  kUnits: number;
  members: number;
  monthlyFee: number;
  activeScreen: string;
  pitchedIdeas: PitchedIdea[];
  transactions: Transaction[];
  addKUnits: (amount: number, title?: string, type?: Transaction['type']) => void;
  burnKUnits: (amount: number, title?: string, type?: Transaction['type']) => void;
  setActiveScreen: (screen: string) => void;
  setMembers: (count: number) => void;
  submitIdea: (idea: Omit<PitchedIdea, 'id' | 'status' | 'date'>) => void;
}

export const useStore = create<AppState>((set) => ({
  kUnits: 1500,
  members: 50,
  monthlyFee: 499,
  activeScreen: 'loading',
  pitchedIdeas: [],
  transactions: [
    { id: 'TX-1', type: 'deposit', title: 'Initial Capital Allocation', amount: 1000, date: 'Oct 20, 2023', positive: true },
    { id: 'TX-2', type: 'service', title: 'Global Concierge Fee', amount: 50, date: 'Oct 21, 2023', positive: false },
  ],
  addKUnits: (amount, title = 'Credit', type = 'deposit') => set((state) => ({ 
    kUnits: state.kUnits + amount,
    transactions: [
      { id: `TX-${Math.floor(Math.random() * 100000)}`, type, title, amount, date: new Date().toLocaleDateString(), positive: true },
      ...state.transactions
    ]
  })),
  burnKUnits: (amount, title = 'Debit', type = 'transfer') => set((state) => ({ 
    kUnits: Math.max(0, state.kUnits - amount),
    transactions: [
      { id: `TX-${Math.floor(Math.random() * 100000)}`, type, title, amount, date: new Date().toLocaleDateString(), positive: false },
      ...state.transactions
    ]
  })),
  setActiveScreen: (screen) => set({ activeScreen: screen }),
  setMembers: (count) => set({ members: count }),
  submitIdea: (idea) => set((state) => ({
    pitchedIdeas: [
      ...state.pitchedIdeas,
      {
        ...idea,
        id: `IDEA-${Math.floor(Math.random() * 10000)}`,
        status: 'Pending Review',
        date: new Date().toLocaleDateString(),
      }
    ]
  })),
}));

