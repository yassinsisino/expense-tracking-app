import React, { type ProviderExoticComponent, createContext, useReducer } from "react";

import { dummy_expenses } from "../data/dummy_expenses";
import { TExpense } from "../types/expenses.types";


interface IExpensesContext {
  expenses: TExpense[],
  addExpense: (expense: TExpense) => void,
  deleteExpense: (id: string) => void,
  updateExpense: (id: string, expense: TExpense) => void,
}

export const ExpensesContext = createContext<IExpensesContext>({
  expenses: [],
  addExpense: ({ description, amount, date }: TExpense) => { },
  deleteExpense: (id: string) => { },
  updateExpense: (id: string, { description, amount, date }: TExpense) => { }
})

const expensesReducer = (state: TExpense[], action: { type: string, payload: any }) => {
  const { payload } = action
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()
      return [{ ...payload, id: id }, ...state]
    case 'UPDATE':
      return state.map((expense) => {
        if (expense.id === payload.id)
          return { ...expense, ...payload.expense }
        else return expense
      })
    case 'DELETE':
      return state.filter(expense => expense.id !== payload.id)

    default:
      return state
  }
}

interface IExpensesContextProviderProps {
  children: React.ReactNode
}

const ExpensesContextProvider = ({ children }: IExpensesContextProviderProps) => {

  const [expensesState, dispatch] = useReducer(expensesReducer, dummy_expenses)

  const addExpense = (expense: TExpense) => {
    dispatch({ type: 'ADD', payload: expense })
  }
  const updateExpense = (id: string, expense: Partial<TExpense>) => {
    dispatch({ type: 'UPDATE', payload: { id: id, expense: { ...expense } } })
  }
  const deleteExpense = (id: string) => {
    dispatch({ type: 'DELETE', payload: { id } })
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense
  }

  return (
    <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
  )

}

export default ExpensesContextProvider