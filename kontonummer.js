/**
 * Kontonummer.js är ett bibliotek för att kontroller och validera svenska
 * bankkontonummer. Biblioteket kan användas för att ta reda på vilken bank ett
 * kontonummer tillhör, samt om kontonumret valideras som giltigt enligt
 * bankerns standard.
 *
 * https://github.com/jop-io/kontonummer.js
 *
 * Målsättningen är att stödja samtliga banker som är verksamma i Sverige.
 *
 * Licens: MIT
 * Författare: @jop-io
 */
;(function () {
    "use strict";

    var ACCOUNT_NUMBER_TYPE = {
        1: {
            COMMENT: {
                1: {
                    clearing: 4,
                    account: 7,
                    control: 10
                },
                2: {
                    clearing: 4,
                    account: 7,
                    control: 11
                }
            }
        },
        2: {
            COMMENT: {
                1: {
                    clearing: 4,
                    account: 10,
                    control: 10
                },
                2: {
                    clearing: 4,
                    account: 9,
                    control: 9
                },
                3: {
                    clearing: 5,
                    account: 10,
                    control: 10
                }
            }
        }
    };

    var banks = [{
        name    : 'Avanza Bank',
        regex   : /^(95[5-6][0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Svea Bank',
        regex   : /^(966[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'BlueStep Finans',
        regex   : /^(968[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'BNP Paribas',
        regex   : /^(947[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Citibank',
        regex   : /^(904[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Danske Bank',
        regex   : /^(1[2-3][0-9][0-9]|24[0-9][0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'Danske Bank',
        regex   : /^(918[0-9])/,
        modulo  : 10,
        lengths : ACCOUNT_NUMBER_TYPE[2].COMMENT[1]
    },{
        name    : 'DNB Bank',
        regex   : /^(919[0-9]|926[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Ekobanken',
        regex   : /^(970[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Erik Penser',
        regex   : /^(959[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Forex Bank',
        regex   : /^(94[0-4][0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'Handelsbanken',
        regex   : /^(6[0-9][0-9][0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[2].COMMENT[2]
    },{
        name    : 'ICA Banken',
        regex   : /^(927[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'IKANO Banken',
        regex   : /^(917[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'JAK Medlemsbank',
        regex   : /^(967[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Klarna Bank',
        regex   : /^(978[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Landshypotek',
        regex   : /^(939[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Lån & Spar Bank Sverige',
        regex   : /^(963[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'Länsförsäkringar Bank',
        regex   : /^(340[0-9]|906[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'Länsförsäkringar Bank',
        regex   : /^(902[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Marginalen Bank',
        regex   : /^(923[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'MedMera Bank',
        regex   : /^(965[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Nordax Bank',
        regex   : /^(964[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Nordea',
        regex   : /^(11[0-9][0-9]|1[4-9][0-9][0-9]|20[0-9][0-9]|3[0-2][0-9][0-9]|330[1-9]|33[1-9][0-9]|34[1-9][0-9]|3[5-9][0-9][0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'Nordea',
        regex   : /^(4[0-9][0-9][0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Nordea',
        regex   : /^(3300|3782)/,
        modulo  : 10,
        lengths : ACCOUNT_NUMBER_TYPE[2].COMMENT[1]
    },{
        name    : 'Nordnet Bank',
        regex   : /^(910[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Resurs Bank',
        regex   : /^(928[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'Riksgälden',
        regex   : /^(989[0-9])/,
        modulo  : 10,
        lengths : ACCOUNT_NUMBER_TYPE[2].COMMENT[1]
    },{
        name    : 'Riksgälden',
        regex   : /^(988[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Santander Consumer Bank',
        regex   : /^(946[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'SBAB',
        regex   : /^(925[0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'SEB',
        regex   : /^(5[0-9][0-9][0-9]|912[0-4]|91[3-4][0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'Skandiabanken',
        regex   : /^(91[5-6][0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    },{
        name    : 'Sparbanken Syd',
        regex   : /^(957[0-9])/,
        modulo  : 10,
        lengths : ACCOUNT_NUMBER_TYPE[2].COMMENT[1]
    },{
        name    : 'Swedbank',
        regex   : /^(7[0-9][0-9][0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[1]
    },{
        name    : 'Swedbank',
        regex   : /^(93[0-4][0-9])/,
        modulo  : 10,
        lengths : ACCOUNT_NUMBER_TYPE[2].COMMENT[1],
        zerofill: true
    },{
        name    : 'Swedbank',
        regex   : /^(8[0-9]{4})/,
        modulo  : 10,
        lengths : ACCOUNT_NUMBER_TYPE[2].COMMENT[3],
        zerofill: true,
        warnOnBadChecksum: true // Special swedbank accounts can cause checksum errors which we conditionally want to suppress
    },{
        name    : 'Ålandsbanken',
        regex   : /^(23[0-9][0-9])/,
        modulo  : 11,
        lengths : ACCOUNT_NUMBER_TYPE[1].COMMENT[2]
    }];

    /**
     * Kontrollerar och validerar ett bankkontonummer.
     *
     * @param {String} number Bankkontonummer
     * @returns {Object|Boolean}
     */
    var kontonummer = function(number) {
        var is_valid = false;

        if (!number || number.constructor !== String) {
          return {
            is_valid: is_valid,
            errors: [ 'invalid_account_number' ],
            matched_banks: [],
            has_warnings: false
          };
        }

        var n = number.replace(/\D/g, ''), i, bank, errors = [];
        var matched_banks = [];
        var warnings = [];

        for (i in banks) {
            bank = banks[i];
            var bankNumber = (bank.zerofill) ? fillZeros(n, bank) : n;

            var numberChecksumValidation = validateChecksum(bank, bankNumber);
            numberChecksumValidation.errors = numberChecksumValidation.errors.concat(validateLength(bank, bankNumber));
            warnings = warnings.concat(numberChecksumValidation.warnings);
            if (numberChecksumValidation.bank_name) {
                matched_banks.push(numberChecksumValidation);

                if (!numberChecksumValidation.errors.length) {
                    is_valid = true;
                }
            }
        }


        if (!matched_banks.length) {
            errors.push('unknown_clearing_number');
        }

        if (!is_valid) {
            return {
                is_valid: false,
                errors: errors,
                matched_banks: matched_banks,
                has_warnings: Boolean(warnings.length)
            };
        }

        return {
            is_valid: is_valid,
            errors: [],
            matched_banks: matched_banks,
            has_warnings: Boolean(warnings.length)
        };
    };

    var validateLength = function(bank, bankNumber) {
        var errors = [];

        if (bank.regex.test(bankNumber)) {
            if (bankNumber.length < bank.lengths.clearing + bank.lengths.account) {
                errors.push('too_short');
            } else if (bankNumber.length > bank.lengths.clearing + bank.lengths.account) {
                errors.push('too_long');
            }
        }

        return errors;
    };

    var validateChecksum = function(bank, bankNumber) {
        var bank_name = null;
        var errors = [];
        var warnings = [];
        var ctrlNum = getCtrlNum(bank.lengths.control, bankNumber);

        if (bank.regex.test(bankNumber)) {
            bank_name = bank.name;
            if (!(bank.modulo === 11 && mod11(ctrlNum)) && !(bank.modulo === 10 && mod10(ctrlNum))) {
                if (bank.warnOnBadChecksum) {
                    warnings.push('bad_checksum');
                } else {
                    errors.push('bad_checksum');
                }
            }
        }

        return {
            errors: errors,
            bank_name: bank_name,
            clearing_number: getClearingNumber(bankNumber, bank.lengths.clearing),
            account_number: getAccountNumber(bankNumber, bank.lengths.clearing),
            warnings: warnings
        };
    };

    /**
     * @param {string} bankNumber
     * @param {object} bank
     *
     * @return {string}
     */
    var getCtrlNum = function(controlLength, bankNumber) {
      return bankNumber.substr(-controlLength, controlLength);
    };

    /**
     * Stödfunktion för att kontrollera mod10.
     *
     * @param {String} number Bankkontonummer
     * @returns {Boolean}
     */
    var mod10 = function (number) {
        var len = number.length, bit = 1, sum = 0, val, arr = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
        while (len) {
            val = parseInt(number.charAt(--len), 10);
            sum += (bit ^= 1) ? arr[val] : val;
        }
        return sum && sum % 10 === 0;
    };

    /**
     * Stödfunktion för att kontrollera mod11.
     *
     * @param {String} number Bankkontonummer
     * @returns {Boolean}
     */
    var mod11 = function (number) {
        var len = number.length,
            sum = 0,
            val,
            weights = [1, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
        var arr = weights.splice(weights.length-len, weights.length-(weights.length-len));
        while (len) {
            val = parseInt(number.charAt(--len), 10);
            sum += arr[len] * val;
        }

        return sum && sum % 11 === 0;
    };

    var getClearingNumber = function(bankNumber, clearingLength) {
        return bankNumber.substr(0, clearingLength);
    };

    var getAccountNumber = function(bankNumber, clearingLength) {
        return bankNumber.substr(clearingLength);
    };

    /**
     * Fyll ut Swedbanks bankkontonummer med nollor
     *
     * @param {String} number Bankkontonummer
     * @param {Object} bank Bank object
     * @returns {String} Bankkontonummer med nollor
     */
    var fillZeros = function (accountNumber, bank) {
        var clearingNumber = getClearingNumber(accountNumber, bank.lengths.clearing);
        var numberWithoutClearing = getAccountNumber(accountNumber, bank.lengths.clearing);
        var zeroFillLength = bank.lengths.account - numberWithoutClearing.length;

        if (zeroFillLength <= 0) {
            return accountNumber;
        }
        var zeroFill = Array(zeroFillLength + 1).join('0');

        return clearingNumber.concat(zeroFill, numberWithoutClearing);
    };


    function protectTheFuncAndAppendProp (prop, fn) {
      Object.defineProperty(kontonummer, '_' + prop, {
        configurable: false,
        writable: false,
        value: fn
      });
    }

    protectTheFuncAndAppendProp('mod10', mod10);
    protectTheFuncAndAppendProp('mod11', mod11);
    protectTheFuncAndAppendProp('getClearingNumber', getClearingNumber);
    protectTheFuncAndAppendProp('getAccountNumber', getAccountNumber);
    protectTheFuncAndAppendProp('fillZeros', fillZeros);
    protectTheFuncAndAppendProp('getCtrlNum', getCtrlNum);
    protectTheFuncAndAppendProp('validateChecksum', validateChecksum);
    protectTheFuncAndAppendProp('validateLength', validateLength);

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = kontonummer;
    } else if (typeof window !== 'undefined') {
        window.kontonummer = kontonummer;
    }

}());
