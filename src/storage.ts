import browser from 'webextension-polyfill';
import { ALL_PRESETS, FieldPreset } from './presets/defaults';

export interface StorageData {
  fields: FieldPreset[];
}

const STORAGE_KEY = 'autofill_data';

export async function getStorageData(): Promise<StorageData> {
  const result = await browser.storage.local.get(STORAGE_KEY);
  if (!result || !result[STORAGE_KEY]) {
    // Deep copy defaults to avoid mutation
    return { fields: JSON.parse(JSON.stringify(ALL_PRESETS)) };
  }
  return result[STORAGE_KEY] as StorageData;
}

export async function saveStorageData(data: StorageData): Promise<void> {
  await browser.storage.local.set({ [STORAGE_KEY]: data });
}

export function findMatchingField(
  identifier: string,
  fields: FieldPreset[]
): FieldPreset | undefined {
  const lowerId = identifier.toLowerCase();
  return fields.find(field => {
    if (!field.value) return false;
    const matchLabel = field.label.toLowerCase() === lowerId;
    const matchAlias = field.aliases.some(alias => alias.toLowerCase() === lowerId);
    return matchLabel || matchAlias;
  });
}
