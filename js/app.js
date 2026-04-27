import { renderStaffScreen } from './screens/staffScreen.js';
import { renderCustomerScreen } from './screens/customerScreen.js';
import { renderThankYouScreen } from './screens/thankYouScreen.js';

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');

    // Simple router
    const navigate = (screenName) => {
        // Clear current screen
        appContainer.innerHTML = '';
        
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

    // Initialize app with Staff Screen
    navigate('staff');
});
