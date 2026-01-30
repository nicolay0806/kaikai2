import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      points: 100, // Give some starter points for testing
      inventory: [],
      completedLessons: [],
      
      addPoints: (amount) => set((state) => ({ points: state.points + amount })),
      deductPoints: (amount) => set((state) => ({ points: Math.max(0, state.points - amount) })),
      addToInventory: (prize) => set((state) => ({ inventory: [...state.inventory, prize] })),
      completeLesson: (lessonId) => set((state) => {
          if (state.completedLessons.includes(lessonId)) return state;
          return { completedLessons: [...state.completedLessons, lessonId] };
      }),
      reset: () => set({ points: 0, inventory: [], completedLessons: [] }),
    }),
    {
      name: 'math-adventure-storage',
    }
  )
);
