export interface Transaction {
    tx_ref: string;
    amount: number;
    currency: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    status: 'pending' | 'success' | 'failed';
    createdAt: Date;
}

// In-memory store for transactions
// Key: tx_ref, Value: Transaction object
export const transactionStore = new Map<string, Transaction>();

export function saveTransaction(transaction: Transaction) {
    transactionStore.set(transaction.tx_ref, transaction);
    console.log(`[STORE] Transaction saved: ${transaction.tx_ref}`);
}

export function getTransaction(tx_ref: string): Transaction | undefined {
    return transactionStore.get(tx_ref);
}

export function updateTransactionStatus(tx_ref: string, status: 'success' | 'failed') {
    const transaction = transactionStore.get(tx_ref);
    if (transaction) {
        transaction.status = status;
        transactionStore.set(tx_ref, transaction);
        console.log(`[STORE] Transaction updated: ${tx_ref} -> ${status}`);
    } else {
        console.warn(`[STORE] Transaction not found for update: ${tx_ref}`);
    }
}
