import { Recurrence, Transaction } from '@/types';

export function createId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

export function ensureTransaction(transaction: Transaction): Transaction {
  return transaction.id ? transaction : { ...transaction, id: createId() };
}

export function ensureRecurrence(recurrence: Recurrence): Recurrence {
  return recurrence.id ? recurrence : { ...recurrence, id: createId() };
}
