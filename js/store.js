// sessionStorage から前回の状態を復元（リロード対策）
const STORAGE_KEY = 'miyoshi_app_state';

const defaultState = {
    customerName: '',
    baseAmount: 0,
    selectedTipPercent: null, // 0, 10, or 20
    tipAmount: 0,
    totalAmount: 0
};

const loadState = () => {
    try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved) {
            return { ...defaultState, ...JSON.parse(saved) };
        }
    } catch (e) {
        console.warn('Failed to load state from sessionStorage:', e);
    }
    return { ...defaultState };
};

export const state = loadState();

// Simple event target for state changes
export const eventBus = new EventTarget();

export const updateState = (updates) => {
    Object.assign(state, updates);
    // sessionStorage に保存してリロードに備える
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
        console.warn('Failed to save state to sessionStorage:', e);
    }
    eventBus.dispatchEvent(new Event('stateChanged'));
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount) + '-';
};
