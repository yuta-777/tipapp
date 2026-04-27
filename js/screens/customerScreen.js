import { state, updateState, formatCurrency } from '../store.js';

export const renderCustomerScreen = (container, navigate) => {
    // Calculate tips
    const baseAmount = state.baseAmount;
    
    // Calculate precise amounts
    const tips = [
        { percent: 0, label: 'No Tip', amount: 0 },
        { percent: 10, label: '10%', amount: Math.floor(baseAmount * 0.10) },
        { percent: 20, label: '20%', amount: Math.floor(baseAmount * 0.20) }
    ];

    container.innerHTML = `
        <div class="screen-container fade-in en-text">
            <h2 class="brand-title">Miyoshi</h2>
            
            <h1>Dear ${state.customerName}-sama,<br>Thank you for dining with us.</h1>
            
            <div class="tip-options" id="tipOptions">
                ${tips.map(t => {
                    const total = baseAmount + t.amount;
                    return `
                        <div class="tip-card" data-percent="${t.percent}" data-tip="${t.amount}" data-total="${total}">
                            <div class="tip-percent">${t.label}</div>
                            <div class="tip-amounts">
                                <span class="total-value">Total: ${formatCurrency(total)}</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>

            <div class="actions">
                <button id="btnConfirm" class="btn" disabled>Confirm Payment</button>
            </div>
            
            <div style="margin-top: 32px; text-align: left;">
                <button id="btnBack" class="jp-text" style="background: none; border: none; color: var(--color-text-muted); cursor: pointer; font-family: inherit; font-size: 0.85rem; opacity: 0.5;">前画面へ戻る</button>
            </div>
        </div>
    `;

    const tipCards = container.querySelectorAll('.tip-card');
    const btnConfirm = container.querySelector('#btnConfirm');
    const btnBack = container.querySelector('#btnBack');

    let selectedPercent = null;
    let selectedTipAmount = null;
    let selectedTotal = null;

    tipCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selection from all
            tipCards.forEach(c => c.classList.remove('selected'));
            // Add to current
            card.classList.add('selected');
            
            selectedPercent = parseInt(card.getAttribute('data-percent'), 10);
            selectedTipAmount = parseInt(card.getAttribute('data-tip'), 10);
            selectedTotal = parseInt(card.getAttribute('data-total'), 10);

            // Enable confirm button
            btnConfirm.disabled = false;
        });
    });

    // 初期状態でNo Tipを選択
    if (tipCards.length > 0) {
        tipCards[0].click();
    }

    btnConfirm.addEventListener('click', () => {
        updateState({
            selectedTipPercent: selectedPercent,
            tipAmount: selectedTipAmount,
            totalAmount: selectedTotal
        });
        navigate('thankyou');
    });

    btnBack.addEventListener('click', () => {
        navigate('staff');
    });
};
