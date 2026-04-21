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

    // Label Group
    const labelGroup = document.createElement('div');
    labelGroup.className = 'field-input-group';
    const labelTag = document.createElement('label');
    labelTag.textContent = 'Label';
    const labelInput = document.createElement('input');
    labelInput.type = 'text';
    labelInput.value = field.label;
    labelInput.dataset.index = index.toString();
    labelInput.dataset.prop = 'label';
    labelGroup.append(labelTag, labelInput);

    // Value Group
    const valueGroup = document.createElement('div');
    valueGroup.className = 'field-input-group';
    const valueTag = document.createElement('label');
    valueTag.textContent = 'Value';
    const valueInput = document.createElement('input');
    valueInput.type = 'text';
    valueInput.value = field.value;
    valueInput.placeholder = 'Value to fill';
    valueInput.dataset.index = index.toString();
    valueInput.dataset.prop = 'value';
    valueGroup.append(valueTag, valueInput);

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger remove-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.index = index.toString();

    // Aliases Group (Full Width)
    const aliasesGroup = document.createElement('div');
    aliasesGroup.className = 'field-input-group full-width';
    const aliasesTag = document.createElement('label');
    aliasesTag.textContent = 'Aliases (comma separated)';
    const aliasesInput = document.createElement('input');
    aliasesInput.type = 'text';
    aliasesInput.value = field.aliases.join(', ');
    aliasesInput.placeholder = 'e.g. fname, first_name';
    aliasesInput.dataset.index = index.toString();
    aliasesInput.dataset.prop = 'aliases';
    aliasesGroup.append(aliasesTag, aliasesInput);

    item.append(labelGroup, valueGroup, deleteBtn, aliasesGroup);
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
