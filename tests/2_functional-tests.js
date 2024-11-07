const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server.js");

chai.use(chaiHttp);

let Translator = require("../components/translator.js");

suite("Functional Tests", () => {
  test("text and locale", done => {
    chai.request(server).post("/api/translate").send({text: "Mangoes are my favorite fruit.", locale: "american-to-british"}).end((err, res) => {
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.text, "Mangoes are my favorite fruit.");
      assert.strictEqual(res.body.translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.');
      done();
    });
  });

  test("invalid locale", done => {
    chai.request(server).post("/api/translate").send({text: "Mangoes are my favorite fruit.", locale: "to-british"}).end((err, res) => {
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.error, "Invalid value for locale field");
      done();
    });
  });

  test("missing text", done => {
    chai.request(server).post("/api/translate").send({locale: "american-to-british"}).end((err, res) => {
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.error, "Required field(s) missing");
      done();
    });
  });

  test("missing locale", done => {
    chai.request(server).post("/api/translate").send({text: "Mangoes are my favorite fruit."}).end((err, res) => {
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.error, "Required field(s) missing");
      done();
    });
  });

  test("empty text", done => {
    chai.request(server).post("/api/translate").send({text: "", locale: "american-to-british"}).end((err, res) => {
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.error, "No text to translate");
      done();
    });
  });

  test("no translation needed", done => {
    chai.request(server).post("/api/translate").send({text: "Mangoes are my favourite fruit.", locale: "american-to-british"}).end((err, res) => {
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.text, "Mangoes are my favourite fruit.");
      assert.strictEqual(res.body.translation, "Everything looks good to me!");
      done();
    });
  });
});
