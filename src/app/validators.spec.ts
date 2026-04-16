import {
  checkboxNotEmptyValidator,
  createMinLengthValidator,
  createRegexValidator,
  isNotEmptyValidator,
  isTwoCharsOrMoreValidator
} from './validators';

describe('validators', () => {
  it('does not throw when string validators receive checkbox array values', () => {
    expect(isTwoCharsOrMoreValidator.checkFn([] as unknown as string)).toBeTrue();
    expect(createMinLengthValidator(3).checkFn([] as unknown as string)).toBeTrue();
    expect(createRegexValidator(/^[A-Z]+$/, 'uppercase').checkFn([] as unknown as string)).toBeTrue();
  });

  it('keeps required validation for checkbox values', () => {
    expect(isNotEmptyValidator.checkFn([])).toBeFalse();
    expect(isNotEmptyValidator.checkFn(['Reading'])).toBeTrue();
  });

  it('validates checkbox groups as non-empty correctly', () => {
    expect(checkboxNotEmptyValidator.checkFn([])).toBeFalse();
    expect(checkboxNotEmptyValidator.checkFn(['Gaming'])).toBeTrue();
  });
});


