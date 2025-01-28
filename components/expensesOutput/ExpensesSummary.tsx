import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { TExpense } from '../../types/expenses.types';
import { GlobalStyles } from '../../constants/styles';
interface IProps {
  expenses: TExpense[],
  periodName: string
}

const ExpensesSummary: React.FC<IProps> = ({ expenses, periodName }) => {
  const expenseSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount
  }, 0)

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>{expenseSum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginBottom: 16,
    backgroundColor: GlobalStyles.Colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.Colors.primary400
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.Colors.primary500
  }
});