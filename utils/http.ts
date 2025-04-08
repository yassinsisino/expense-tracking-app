import { useQuery, useMutation } from "@tanstack/react-query"
import Constants from "expo-constants"
import { TExpense } from "../types/expenses.types"

const storeExpense = async (expense: Partial<TExpense>) => {

  const FIREBASE_URL = Constants.expoConfig?.extra?.firebase_url

  const result = await fetch(`${FIREBASE_URL}expenses.json` as string, {
    method: "POST",
    body: JSON.stringify(expense),
    headers: {
      "Content-Type": "application/json",

    }
  })
  if (!result.ok) {
    throw new Error('Could not fetch data!')
  }
  return result.json()
}


export {
  storeExpense
}