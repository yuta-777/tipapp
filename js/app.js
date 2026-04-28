import { renderStaffScreen } from './screens/staffScreen.js';
import { renderCustomerScreen } from './screens/customerScreen.js';
import { renderThankYouScreen } from './screens/thankYouScreen.js';
import { state } from './store.js';

const SCREEN_KEY = 'miyoshi_app_screen';

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');

    // Simple router
    const navigate = (screenName) => {
        // Clear current screen
        appContainer.innerHTML = '';

        // 画面名を sessionStorage に保存（リロード復帰用）
        try {
            sessionStorage.setItem(SCREEN_KEY, screenName);
        } catch (e) { /* ignore */ }
        
        switch (screenName) {
            case 'staff':
                renderStaffScreen(appContainer, navigate);
                break;
            case 'customer':
                renderCustomerScreen(appContainer, navigate);
                break;
            case 'thankyou':
                renderThankYouScreen(appContainer, navigate);
                break;
            default:
                renderStaffScreen(appContainer, navigate);
        }
    };

    // リロード時に前の画面を復元する（ただしデータが空なら初期画面へ）
    let initialScreen = 'staff';
    try {
        const saved = sessionStorage.getItem(SCREEN_KEY);
        if (saved && state.baseAmount > 0) {
            initialScreen = saved;
        }
    } catch (e) { /* ignore */ }

    navigate(initialScreen);
});
