'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      if(req.body.text === undefined || req.body.text === null || req.body.locale === undefined || req.body.locale === null) {
        res.json({error: "Required field(s) missing"});
        return;
      }
      if(req.body.text === "") {
        res.json({error: "No text to translate"});
        return;
      }
      let translation = "";
      if(req.body.locale === "american-to-british") {
        translation = translator.toBritish(req.body.text)[0];
      } else if(req.body.locale === "british-to-american") {
        translation = translator.toAmerican(req.body.text)[0];
      } else {
        res.json({error: "Invalid value for locale field"});
        return;
      }

      console.log(req.body.locale, req.body.text, translation);

      if(req.body.text === translation) {
        res.json({text: req.body.text, translation: "Everything looks good to me!"});
      } else {
        res.json({text: req.body.text, translation: translation});
      }
    });
};
