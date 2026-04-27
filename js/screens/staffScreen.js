import { state, updateState } from '../store.js';

export const renderStaffScreen = (container, navigate) => {
    container.innerHTML = `
        <div class="screen-container fade-in jp-text">
            <h2 class="brand-title">Miyoshi</h2>
            <h1 class="jp-text">会計入力</h1>
            
            <div class="form-group">
                <label for="customerName">お客様名</label>
                <input type="text" id="customerName" class="form-control en-text" placeholder="e.g. Smith" autocomplete="off">
            </div>

            <div class="form-group">
                <label for="baseAmount">ご飲食代金 (円)</label>
                <input type="text" inputmode="numeric" id="baseAmount" class="form-control en-text" placeholder="0" autocomplete="off">
            </div>

            <div class="actions">
                <button id="btnNext" class="btn jp-text" disabled>お客様入力画面へ</button>
            </div>
        </div>
    `;

    const inputName = container.querySelector('#customerName');
    const inputAmount = container.querySelector('#baseAmount');
    const btnNext = container.querySelector('#btnNext');

    const getRawAmount = () => {
        return parseInt(inputAmount.value.replace(/,/g, ''), 10);
    };

    const validate = () => {
        const rawAmount = getRawAmount();
        if (inputName.value.trim() !== '' && !isNaN(rawAmount) && rawAmount > 0) {
            btnNext.disabled = false;
        } else {
            btnNext.disabled = true;
        }
    };

    inputName.addEventListener('input', validate);

    inputAmount.addEventListener('input', (e) => {
        // 数字以外の入力を除去
        let val = e.target.value.replace(/[^0-9]/g, '');
        if (val) {
            e.target.value = new Intl.NumberFormat('ja-JP').format(parseInt(val, 10));
        } else {
            e.target.value = '';
        }
        validate();
    });

    btnNext.addEventListener('click', () => {
        const rawAmount = getRawAmount();
        updateState({
            customerName: inputName.value.trim(),
            baseAmount: rawAmount,
            selectedTipPercent: null,
            tipAmount: 0,
            totalAmount: rawAmount
        });
        navigate('customer');
    });
};
