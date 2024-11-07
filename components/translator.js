const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

const flip = data => Object.fromEntries(Object.entries(data).map(([key, value]) => [value, key]));
const britishToAmericanSpelling = flip(americanToBritishSpelling);
const britishToAmericanTitles = flip(americanToBritishTitles);

let americanToBritishEmpty = {};
const americanToBritish = Object.assign(americanToBritishEmpty, americanOnly, americanToBritishSpelling);

let britishToAmericanEmpty = {};
const britishToAmerican = Object.assign(britishToAmericanEmpty, britishOnly, britishToAmericanSpelling);
console.log(americanToBritishTitles);
class Translator {
  toBritish(text) {
    let translation = text;

    for(let i = 0; i < Object.keys(americanToBritish).length; i++) {
      translation = translation.replace(
        new RegExp(`\\b${Object.keys(americanToBritish)[i]}\\b`, "gi"),
        `<span class="highlight">${americanToBritish[Object.keys(americanToBritish)[i]]}</span>`);
    }

    for(let i = 0; i < Object.keys(americanToBritishTitles).length; i++) {
      const title = Object.keys(americanToBritishTitles)[i];
      const newTitle = americanToBritishTitles[title];
      if(translation.toLowerCase().indexOf(title) >= 0) {
        translation = translation.replace(
          new RegExp(title.replace(".", "\\."), "gi"),
          `<span class="highlight">${newTitle.replace(/^./, newTitle[0].toUpperCase())}</span>`);
      }
    }

    translation = translation.replace(
      new RegExp("(\\d{1,2}):(\\d{2})", "g"),
      '<span class="highlight">$1.$2</span>');

    let noHighlight = translation.replace('<span class="highlight">', "");
    noHighlight = noHighlight.replace("</span>", "");

    return [translation, noHighlight];
  }

  toAmerican(text) {
    let translation = text;

    for(let i = 0; i < Object.keys(britishToAmerican).length; i++) {
      translation = translation.replace(
        new RegExp(`\\b${Object.keys(britishToAmerican)[i]}\\b`, "gi"),
        `<span class="highlight">${britishToAmerican[Object.keys(britishToAmerican)[i]]}</span>`);
    }

    for(let i = 0; i < Object.keys(britishToAmericanTitles).length; i++) {
      const title = Object.keys(britishToAmericanTitles)[i];
      const newTitle = britishToAmericanTitles[title]
      if(translation.toLowerCase().indexOf(title) >= 0) {
        translation = translation.replace(
          new RegExp(`\\b${title}\\b`, "gi"),
          `<span class="highlight">${newTitle.replace(/^./, newTitle[0].toUpperCase())}</span>`);
      }
    }

    translation = translation.replace(
      new RegExp(`(\\d{1,2})\\.(\\d{2})`, "g"),
      '<span class="highlight">$1:$2</span>');

    let noHighlight = translation.replace(new RegExp('<span class="highlight">', "g"), "");
    noHighlight = noHighlight.replace(new RegExp("</span>", "g"), "");

    return [translation, noHighlight];
  }
}

module.exports = Translator;
