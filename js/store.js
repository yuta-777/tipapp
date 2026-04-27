export const state = {
    customerName: '',
    baseAmount: 0,
    selectedTipPercent: null, // 0, 10, or 20
    tipAmount: 0,
    totalAmount: 0
};

// Simple event target for state changes
export const eventBus = new EventTarget();

export const updateState = (updates) => {
    Object.assign(state, updates);
    eventBus.dispatchEvent(new Event('stateChanged'));
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount) + '-';
};
