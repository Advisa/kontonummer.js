# kontonummer.js
Kontonummer.js är ett bibliotek för att kontrollera och validera kontonummer för svenska banker. Biblioteket kan användas för att ta reda på vilken bank ett kontonummer tillhör, samt om kontonumret valideras som giltigt.

Bibliotekets parserings- och valideringsregler bygger på dessa dokument:
* [Bankernas kontonummer](http://www.autogiro.se/globalassets/dokument/anvandarmanualer/bankernaskontonummeruppbyggnad_anvandarmanual_sv.pdf) (Bankgirot)
* [Förteckning av clering- och bankkontonummer](https://www.nordea.se/Images/39-112644/F%C3%B6rteckning%20clearing-%20och%20bankkontonummer.pdf) (Nordea)

Målsättningen är att stödja samtliga banker vilka är verksamma i Sverige. För närvarande stöds följande banker:
* Avanza Bank
* BlueStep Finans
* BNP
* Citibank
* Danske Bank
* DnB Bank
* Ekobanken
* Erik Penser Bankaktiebolag
* Forex Bank
* Handelsbanken
* ICA Banken
* IKANO Banken
* JAK Medlemsbank
* Klarna Bank
* Landshypotek
* Lån och Spar Bank Sverige
* Länsförsäkringar Bank
* Marginalen Bank
* MedMera Bank
* Nordax Bank
* Nordea
* Nordnet Bank
* Resurs Bank
* Riksgälden
* Santander Consumer Bank
* SBAB
* SEB
* Skandiabanken
* Sparbanken Syd
* Svea Bank
* Swedbank
* Ålandsbanken

# Installation
```javascript
<script src="kontonummer.min.js"></script>
```

# Användning
```javascript
var result = kontonummer('9420, 417 23 85');
console.log(result);

/* Skriver ut följande objekt till konsolen:

{
  is_valid: true,
  errors: [],
  matched_banks: [
    {
      bank_name: "Forex Bank",
      clearing_number: "9420",
      account_number: "4172385",
      errors: [],
    }
  ]
}
*/
```
```javascript
var result = kontonummer('123456789');
console.log(result);

/* Skriver ut följande objekt till konsolen:

{
  is_valid: false,
  errors: ["unknown_clearing_number"],
  matched_banks: []
}
*/
```
```javascript
var result = kontonummer('9420, 000 00 00');
console.log(result);

/* Skriver ut följande objekt till konsolen:

{
  is_valid: false,
  errors: [],
  matched_banks: [
    {
      errors: [
        "bad_checksum"
      ],
      bank_name: "Forex Bank",
      clearing_number: "9420",
      account_number: "0000000"
    }
  ]
}
*/
```

# Uppdateringar
* 2018-07-26: Gör om till Node.js-modul, returnera mer detaljerade felkoder, hantera nollutfyllnad för Swedbank & lägg till tester
* 2017-12-08: Justerade kontroll av vissa clearingnummer för Nordea (tack till Staffan Garhammar som hittade detta!)
* 2016-06-18: Adderade Riksgälden

# Licens
Kontonummer.js omfattas av licensformen [MIT](https://opensource.org/licenses/MIT "The MIT License"). Varsågod!
