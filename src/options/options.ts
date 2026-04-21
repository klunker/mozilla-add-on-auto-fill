import { getStorageData, saveStorageData, StorageData } from '../storage';
import { REGISTRATION_PRESETS, JOB_PRESETS, FieldPreset } from '../presets/defaults';

let currentData: StorageData = { fields: [] };

const fieldsList = document.getElementById('fields-list') as HTMLDivElement;
const addFieldBtn = document.getElementById('add-field-btn') as HTMLButtonElement;
const loadRegBtn = document.getElementById('load-registration-btn') as HTMLButtonElement;
const loadJobBtn = document.getElementById('load-job-btn') as HTMLButtonElement;
const saveBtn = document.getElementById('save-btn') as HTMLButtonElement;
const statusMsg = document.getElementById('status-msg') as HTMLSpanElement;

async function init() {
  currentData = await getStorageData();
  renderFields();
}

function renderFields() {
  fieldsList.innerHTML = '';
  currentData.fields.forEach((field, index) => {
    const item = document.createElement('div');
    item.className = 'field-item';
    item.innerHTML = `
      <div class="field-input-group">
        <label>Label</label>
        <input type="text" value="${field.label}" data-index="${index}" data-prop="label">
      </div>
      <div class="field-input-group">
        <label>Value</label>
        <input type="text" value="${field.value}" data-index="${index}" data-prop="value" placeholder="Value to fill">
      </div>
      <div class="field-input-group">
        <label>Aliases (comma separated)</label>
        <input type="text" value="${field.aliases.join(', ')}" data-index="${index}" data-prop="aliases" placeholder="e.g. fname, first_name">
      </div>
      <button class="btn btn-danger remove-btn" data-index="${index}">Delete</button>
    `;
    fieldsList.appendChild(item);
  });
}

function showStatus(msg: string) {
  statusMsg.textContent = msg;
  statusMsg.classList.add('show');
  setTimeout(() => statusMsg.classList.remove('show'), 2000);
}

// Event Listeners
addFieldBtn.addEventListener('click', () => {
  currentData.fields.push({ label: 'New Field', value: '', aliases: [] });
  renderFields();
});

fieldsList.addEventListener('input', (e) => {
  const target = e.target as HTMLInputElement;
  const index = parseInt(target.dataset.index || '0');
  const prop = target.dataset.prop as keyof FieldPreset;

  if (prop === 'aliases') {
    currentData.fields[index].aliases = target.value.split(',').map(s => s.trim()).filter(Boolean);
  } else if (prop === 'label' || prop === 'value') {
    currentData.fields[index][prop] = target.value;
  }
});

fieldsList.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('remove-btn')) {
    const index = parseInt(target.dataset.index || '0');
    currentData.fields.splice(index, 1);
    renderFields();
  }
});

loadRegBtn.addEventListener('click', () => {
  // Deep copy to avoid mutating the original constants
  currentData.fields = JSON.parse(JSON.stringify(REGISTRATION_PRESETS));
  renderFields();
  showStatus('Registration presets loaded.');
});

loadJobBtn.addEventListener('click', () => {
  // Deep copy to avoid mutating the original constants
  currentData.fields = JSON.parse(JSON.stringify(JOB_PRESETS));
  renderFields();
  showStatus('Job presets loaded.');
});

saveBtn.addEventListener('click', async () => {
  await saveStorageData(currentData);
  showStatus('Settings saved successfully!');
});

init();
