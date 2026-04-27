import { state, updateState, formatCurrency } from '../store.js';
import { recordTransaction } from '../services/sheetApi.js';

export const renderThankYouScreen = (container, navigate) => {
    container.innerHTML = `
        <div class="screen-container fade-in en-text">
            <h2 class="brand-title">Miyoshi</h2>
            
            <h1 style="color: var(--color-accent-gold); margin-bottom: var(--space-md);">Thank You</h1>
            <p style="color: var(--color-text-muted); font-size: 1.1rem; margin-bottom: var(--space-xl);">We look forward to welcoming you again.</p>
            
            <div style="margin-top: var(--space-lg); padding: var(--space-md) 0; border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);">
                <p style="font-size: 1rem; color: var(--color-text-muted); margin-bottom: 4px;">Total Amount to Pay</p>
                <div style="font-size: 2.5rem; color: var(--color-accent-gold); letter-spacing: 0.05em;">${formatCurrency(state.totalAmount)}</div>
            </div>

            <div id="loadingStatus" style="display: none;"></div>

            <div class="actions" style="margin-top: var(--space-xl);">
                <button id="btnFinish" class="jp-text" style="display: none; background: none; border: none; color: var(--color-text-muted); cursor: pointer; font-size: 0.85rem; opacity: 0.5;">入力画面へ戻る</button>
            </div>
        </div>
    `;

    const statusEl = container.querySelector('#loadingStatus');
    const btnFinish = container.querySelector('#btnFinish');

    // Attempt to submit to Google Sheets
    const submitData = async () => {
        try {
            await recordTransaction({
                customerName: state.customerName,
                baseAmount: state.baseAmount,
                tipPercent: state.selectedTipPercent,
                tipAmount: state.tipAmount,
                totalAmount: state.totalAmount,
                timestamp: new Date().toISOString()
            });
            statusEl.style.display = 'none';
        } catch (err) {
            console.error(err);
            statusEl.style.display = 'block';
            statusEl.textContent = 'Note: Offline mode. Could not record to cloud.';
            statusEl.style.fontSize = '0.8rem';
            statusEl.style.color = 'var(--color-text-muted)';
        } finally {
            btnFinish.style.display = 'inline-block';
        }
    };

    btnFinish.addEventListener('click', () => {
        // Reset state for next customer
        updateState({
            customerName: '',
            baseAmount: 0,
            selectedTipPercent: null,
            tipAmount: 0,
            totalAmount: 0
        });
        navigate('staff');
    });

    // Run submit
    submitData();
};
