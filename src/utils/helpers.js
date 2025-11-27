import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Formats a number as a currency string.
 * @param {number} amount - The amount to format.
 * @param {string} currency - The currency code ('USD' or 'LKR').
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (amount, currency = 'USD') => {
    return currency === 'LKR'
        ? `Rs. ${(amount * 320).toLocaleString()}`
        : `$${amount.toLocaleString()}`;
};

/**
 * Translates a key based on the provided language.
 * @param {string} key - The key to translate.
 * @param {string} language - The language code ('en' or 'si').
 * @returns {string} The translated string or the original key.
 */
export const t = (key, language = 'en') => {
    const dict = {
        'si': {
            'Dashboard': 'පුවරුව',
            'Invoices': 'ඉන්වොයිසි',
            'Clients': 'සේවාදායකයින්',
            'Expenses': 'වියදම්',
            'Studio AI': 'ස්ටුඩියෝ AI',
            'Settings': 'සැකසුම්'
        }
    };
    return (language === 'si' && dict['si'][key]) ? dict['si'][key] : key;
};

/**
 * Calculates the total amount for an invoice.
 * @param {Array} items - The list of invoice items.
 * @returns {number} The total amount.
 */
export const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
};

// Firestore Helpers

export const getInvoices = async (uid) => {
    const q = query(collection(db, "invoices"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addInvoice = async (uid, invoice) => {
    await addDoc(collection(db, "invoices"), { ...invoice, uid });
};

export const getClients = async (uid) => {
    const q = query(collection(db, "clients"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addClient = async (uid, client) => {
    await addDoc(collection(db, "clients"), { ...client, uid });
};

export const getExpenses = async (uid) => {
    const q = query(collection(db, "expenses"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addExpense = async (uid, expense) => {
    await addDoc(collection(db, "expenses"), { ...expense, uid });
};
