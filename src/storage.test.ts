import { describe, it, expect } from 'vitest';
import { findMatchingField } from './storage';
import { FieldPreset } from './presets/defaults';

describe('findMatchingField', () => {
  const mockFields: FieldPreset[] = [
    {
      label: 'Email',
      value: 'test@example.com',
      aliases: ['email', 'login']
    },
    {
      label: 'First Name',
      value: 'John',
      aliases: ['fname', 'first_name']
    }
  ];

  it('should match by label (case-insensitive)', () => {
    const match = findMatchingField('Email', mockFields);
    expect(match?.value).toBe('test@example.com');

    const matchLower = findMatchingField('email', mockFields);
    expect(matchLower?.value).toBe('test@example.com');
  });

  it('should match by alias', () => {
    const match = findMatchingField('fname', mockFields);
    expect(match?.value).toBe('John');

    const matchUnderscore = findMatchingField('first_name', mockFields);
    expect(matchUnderscore?.value).toBe('John');
  });

  it('should NOT match unknown identifier', () => {
    const match = findMatchingField('unknown', mockFields);
    expect(match).toBeUndefined();
  });

  it('should NOT match if value is empty', () => {
    const fieldsWithEmpty = [{ label: 'Empty', value: '', aliases: ['empty'] }];
    const match = findMatchingField('empty', fieldsWithEmpty);
    expect(match).toBeUndefined();
  });
});
