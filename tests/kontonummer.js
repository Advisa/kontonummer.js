// external
const chai = require('chai');

// internal
const kontonummer = require('../kontonummer');

describe('Kontonummer suite', () => {
  describe('fillZeros()', () => {
    const mockBank = {
      name    : 'Swedbank',
      regex   : /^(8[0-9]{4})(0*[0-9]+)$/,
      range   : '8000-8999',
      modulo  : 10,
      lengths : {
        clearing : 5,
        account  : 10,
        control  : 10
      },
      zerofill: true
    };
    const fakeAccountNumbers = [
      '8123412345',
      '899991',
      '854321234567890'
    ];
    const expectations = [
      '812340000012345',
      '899990000000001',
      '854321234567890'
    ];

    it('should correctly prepend zeros to account number(s)', () => {
      fakeAccountNumbers.forEach((accountNumber, i) => {
        const result = kontonummer._fillZeros(accountNumber, mockBank);

        chai.assert.strictEqual(expectations[i], result);
      });
    });
  });

  describe('getCtrlNum()', () => {
    it('should correctly return 10 chars of an 11 long string counting from the end', () => {
      const mockControlLength = 10;
      const mockAccountNumber = '12345678901';
      const expected = '2345678901';
      const result = kontonummer._getCtrlNum(mockControlLength, mockAccountNumber);
      chai.assert.strictEqual(expected, result)
    });

    it('should return full string when trying to return more chars than the string length', () => {
      const mockControlLength = 12;
      const mockAccountNumber = '1234567890';
      const expected = '1234567890';
      const result = kontonummer._getCtrlNum(mockControlLength, mockAccountNumber);
      chai.assert.strictEqual(expected, result)
    });
  });

  describe('getClearingNumber()', () => {
    it('should correctly return clearing number', () => {
      const mockClearingLength = 4;
      const fakeAccountNumber = '91801234567890'
      const expected = '9180'
      const result = kontonummer._getClearingNumber(
        fakeAccountNumber,
        mockClearingLength
      );

      chai.assert.strictEqual(expected, result)
    });
  });

  describe('getAccountNumber()', () => {
    it('should correctly return account number if clearing length is 4', () => {
      const mockClearingLength = 4;
      const fakeAccountNumber = '91801234567890';
      const result = kontonummer._getAccountNumber(
        fakeAccountNumber,
        mockClearingLength
      );
      const expected = '1234567890';

      chai.assert.strictEqual(expected, result);
    });
  });

  describe('validateChecksum()', () => {
    const mockBank = {
      name    : 'Citibank',
      regex   : /^(904[0-9])([0-9]+)$/,
      modulo  : 11,
      lengths : {
        clearing : 4,
        account  : 7,
        control  : 11
      }
    };

    it('should return object with no errors', () => {
      const fakeAccountNumber = '9044123456789';
      const expected = {
        errors: [],
        bank_name: 'Citibank',
        clearing_number: '9044',
        account_number: '123456789',
      };
      const result = kontonummer._validateChecksum(mockBank, fakeAccountNumber);

      chai.assert.deepEqual(expected, result);
    });

    it('should return object with error bad_checksum', () => {
      const fakeAccountNumber = '904412345';
      const expected = {
        errors: ['bad_checksum'],
        bank_name: 'Citibank',
        clearing_number: '9044',
        account_number: '12345',
      };
      const result = kontonummer._validateChecksum(mockBank, fakeAccountNumber);

      chai.assert.deepEqual(expected, result);
    });
  });

  describe('validateLength()', () => {
    const mockBank = {
      name    : 'Avanza Bank',
      regex   : /^(95[5-6][0-9])([0-9]+)$/,
      modulo  : 11,
      lengths : {
        clearing : 4,
        account  : 7,
        control  : 11
      }
    };

    it('should return error: too_short', () => {
      const fakeAccountNumber = '95501234';
      const result = kontonummer._validateLength(mockBank, fakeAccountNumber);

      const expected = ['too_short'];
      chai.assert.deepEqual(expected, result);
    });

    it('should return error: too_long', () => {
      const fakeAccountNumber = '9550123456789';
      const result = kontonummer._validateLength(mockBank, fakeAccountNumber);

      const expected = ['too_long'];
      chai.assert.deepEqual(expected, result);
    });
  });

  describe('mod10()', () => {
    it('should only return TRUE on one control number', () => {
      const accountNumberWithoutControlNumber = '7000423456';
      let counter = 0;

      for (let i=0; i<=10; i++) {
        counter += kontonummer
          ._mod10(`${accountNumberWithoutControlNumber + i}`) ? 1 : 0;
      }

      chai.assert.strictEqual(1, counter);
    });
  });

  describe('mod11()', () => {
    it('should only return TRUE on one control number', () => {
      const accountNumberWithoutControlNumber = '7000423456';
      let counter = 0;

      for (let i=0; i<=10; i++) {
        counter += kontonummer
          ._mod11(`${accountNumberWithoutControlNumber + i}`) ? 1 : 0;
      }

      chai.assert.strictEqual(1, counter);
    });
  });

  describe('initialize kontonummer()', () => {
    it('should return invalid object, when no argument passed', () => {
      chai.assert.deepEqual(
        kontonummer(),
        {
          is_valid: false,
          errors: ['invalid_account_number'],
          matched_banks: []
        }
      );
    });

    it('should not throw on String argument passed', () => {
      const fakeAccountNumber = '91800123456782';
      const result = kontonummer(fakeAccountNumber);

      chai.assert.isTrue(
        result.is_valid,
        'Account number should be valid'
      );
    });

    it('should return invalid object on anything but String argument passed', () => {
      chai.assert.deepEqual(
        kontonummer(90917261730),
        {
          is_valid: false,
          errors: ['invalid_account_number'],
          matched_banks: []
        }
      );
      chai.assert.deepEqual(
        kontonummer({}),
        {
          is_valid: false,
          errors: ['invalid_account_number'],
          matched_banks: []
        }
      );
      chai.assert.deepEqual(
        kontonummer([]),
        {
          is_valid: false,
          errors: ['invalid_account_number'],
          matched_banks: []
        }
      );
      chai.assert.deepEqual(
        kontonummer(null),
        {
          is_valid: false,
          errors: ['invalid_account_number'],
          matched_banks: []
        }
      );
      chai.assert.deepEqual(
        kontonummer(''),
        {
          is_valid: false,
          errors: ['invalid_account_number'],
          matched_banks: []
        }
      );
    });
  });
});
