const chai = require("chai");
const assert = chai.assert;

const Translator = require("../components/translator.js");
const translator = new Translator();

suite('Unit Tests', () => {
  suite("American to British", () => {
    test("favorite to favourite", () => {
      assert.strictEqual(translator.toBritish("Mangoes are my favorite fruit.")[1], "Mangoes are my favourite fruit.");
    });

    test("yogurt to yoghurt", () => {
      assert.strictEqual(translator.toBritish("I ate yogurt for breakfast.")[1], "I ate yoghurt for breakfast.");
    });

    test("condo to flat", () => {
      assert.strictEqual(translator.toBritish("We had a party at my friend's condo.")[1], "We had a party at my friend's flat.");
    });

    test("trashcan to bin", () => {
      assert.strictEqual(translator.toBritish("Can you toss this in the trashcan for me?")[1], "Can you toss this in the bin for me?");
    });

    test("parking lot to car park", () => {
      assert.strictEqual(translator.toBritish("The parking lot was full.")[1], "The car park was full.");
    });

    test("rube goldberg machine to heath robinson device", () => {
      assert.strictEqual(translator.toBritish("Like a high tech Rube Goldberg machine.")[1], "Like a high tech Heath Robinson device.");
    });

    test("play hooky to bunk off", () => {
      assert.strictEqual(translator.toBritish("To play hooky means to skip class or work")[1], "To bunk off means to skip class or work");
    });

    test("Mr. to Mr", () => {
      assert.strictEqual(translator.toBritish("No Mr. Bond, I expect you to die.")[1], "No Mr Bond, I expect you to die.");
    });

    test("Dr. to Dr", () => {
      assert.strictEqual(translator.toBritish("Dr. Grosh will see you now.")[1], "Dr Grosh will see you now.");
    });

    test("12:15 to 12.15", () => {
      assert.strictEqual(translator.toBritish("Lunch is at 12:15 today.")[1], "Lunch is at 12.15 today.");
    });
  });

  suite("British to American", () => {
    test("footie to soccer", () => {
      assert.strictEqual(translator.toAmerican("We watched the footie match for a while.")[1], "We watched the soccer match for a while.");
    });

    test("Paracetamol to Tylenol", () => {
      assert.strictEqual(translator.toAmerican("Paracetamol takes up to an hour to work.")[1], "Tylenol takes up to an hour to work.");
    });

    test("caramelise to caramelize", () => {
      assert.strictEqual(translator.toAmerican("First, caramelise the onions.")[1], "First, caramelize the onions.");
    });

    test("bank holiday to public holiday and funfair to carnival", () => {
      assert.strictEqual(translator.toAmerican("I spent the bank holiday at the funfair.")[1], "I spent the public holiday at the carnival.");
    });

    test("bicky to cookie and chippy to fish-and-chip shop", () => {
      assert.strictEqual(translator.toAmerican("I had a bicky then went to the chippy.")[1], "I had a cookie then went to the fish-and-chip shop.");
    });

    test("bits and bobs to odds and ends and bum bag to fanny pack", () => {
      assert.strictEqual(translator.toAmerican("I've just got bits and bobs in my bum bag.")[1], "I've just got odds and ends in my fanny pack.");
    });

    test("car boot sale to swap meet", () => {
      assert.strictEqual(translator.toAmerican("The car boot sale at Boxted Airfield was called off.")[1], "The swap meet at Boxted Airfield was called off.");
    });

    test("Mrs to Mrs.", () => {
      assert.strictEqual(translator.toAmerican("Have you met Mrs Kalyani?")[1], "Have you met Mrs. Kalyani?");
    });

    test("Prof to Prof.", () => {
      assert.strictEqual(translator.toAmerican("Prof Joyner of King's College, London.")[1], "Prof. Joyner of King's College, London.");
    });

    test("4.30 to 4:30", () => {
      assert.strictEqual(translator.toAmerican("Tea time is usually around 4 or 4.30.")[1], "Tea time is usually around 4 or 4:30.");
    });
  });

  suite("highlight", () => {
    test("favorite to favourite", () => {
      assert.strictEqual(translator.toBritish("Mangoes are my favorite fruit.")[0], 'Mangoes are my <span class="highlight">favourite</span> fruit.');
    });

    test("yogurt to yoghurt", () => {
      assert.strictEqual(translator.toBritish("I ate yogurt for breakfast.")[0], 'I ate <span class="highlight">yoghurt</span> for breakfast.');
    });

    test("footie to soccer", () => {
      assert.strictEqual(translator.toAmerican("We watched the footie match for a while.")[0], 'We watched the <span class="highlight">soccer</span> match for a while.');
    });

    test("Paracetamol to Tylenol", () => {
      assert.strictEqual(translator.toAmerican("Paracetamol takes up to an hour to work.")[0], '<span class="highlight">Tylenol</span> takes up to an hour to work.');
    });
  });
});
