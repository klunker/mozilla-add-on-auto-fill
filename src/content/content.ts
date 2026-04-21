import browser from 'webextension-polyfill';
import { getStorageData, findMatchingField } from '../storage';

function showToast(message: string, isError = false) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 12px 20px;
    background: ${isError ? '#ef4444' : '#1e293b'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    z-index: 999999;
    font-family: sans-serif;
    font-size: 14px;
    transition: all 0.3s ease;
    transform: translateY(100px);
    opacity: 0;
    border: 1px solid ${isError ? '#f87171' : '#334155'};
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

async function fillForm() {
  console.log('[AutoFill Pro] Starting form fill...');
  try {
    const { fields } = await getStorageData();
    const inputs = document.querySelectorAll('input, textarea, select');
    let filledCount = 0;

    console.log(`[AutoFill Pro] Found ${inputs.length} inputs. Active fields from storage:`, fields.length);

    inputs.forEach((element) => {
      const input = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

      // Skip hidden or non-fillable
      if (input.type === 'hidden' || input.type === 'submit' || input.type === 'button') return;

      // Skip if already has value (disable this for testing if needed)
      if (input.value && input.value.trim() !== '') {
        console.log(`[AutoFill Pro] Skipping input (${input.name || input.id}) - already has value: "${input.value}"`);
        return;
      }

      const identifiers = [
        input.name,
        input.id,
        input.getAttribute('autocomplete'),
        input.getAttribute('aria-label'),
        input.getAttribute('data-testid')
      ].filter(Boolean) as string[];

      if ('placeholder' in input && input.placeholder) {
        identifiers.push(input.placeholder);
      }

      for (const iden of identifiers) {
        const match = findMatchingField(iden, fields);
        if (match) {
          if (match.value) {
            console.log(`[AutoFill Pro] Matching field found for "${iden}":`, match.label);
            input.value = match.value;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            filledCount++;
            break;
          } else {
            console.log(`[AutoFill Pro] Match found for "${iden}" (${match.label}), but value is EMPTY. Fill it in Settings.`);
          }
        }
      }
    });

    if (filledCount > 0) {
      showToast(`Filled ${filledCount} fields!`);
    } else {
      showToast('No matching empty fields found.');
    }
    console.log(`[AutoFill Pro] Finished. Total fields filled: ${filledCount}`);
  } catch (error) {
    console.error('[AutoFill Pro] Error during form fill:', error);
    showToast('Error filling form. Check console.', true);
  }
}

// Listen for messages from background script
browser.runtime.onMessage.addListener((message: { action: string }) => {
  console.log('[AutoFill Pro] Message received:', message);
  if (message.action === 'fill_form') {
    fillForm();
  }
});
