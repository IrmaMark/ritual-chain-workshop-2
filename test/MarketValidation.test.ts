import { expect } from "chai";

import {
  validateQuestion,
  validateDuration,
  validateThreshold,
  validateMarketInput,
  isValidMarketInput,
} from "../utils/market-validation";

describe("market validation", function () {
  it("accepts a normal question", function () {
    expect(
      validateQuestion(
        "Will ETH reach the target?",
      ),
    ).to.equal(undefined);
  });

  it("rejects an empty question", function () {
    expect(
      validateQuestion(""),
    ).to.equal(
      "question cannot be empty",
    );
  });

  it("rejects a short question", function () {
    expect(
      validateQuestion("ETH?"),
    ).to.equal(
      "question is too short",
    );
  });

  it("accepts a positive duration", function () {
    expect(
      validateDuration(100n),
    ).to.equal(undefined);
  });

  it("rejects zero duration", function () {
    expect(
      validateDuration(0n),
    ).to.equal(
      "duration must be positive",
    );
  });

  it("accepts zero threshold", function () {
    expect(
      validateThreshold(0n),
    ).to.equal(undefined);
  });

  it("rejects negative threshold", function () {
    expect(
      validateThreshold(-1n),
    ).to.equal(
      "threshold cannot be negative",
    );
  });

  it("returns multiple errors", function () {
    const result =
      validateMarketInput({
        question: "",
        duration: 0n,
        threshold: -1n,
      });

    expect(result.valid)
      .to.equal(false);

    expect(result.errors)
      .to.have.length(3);
  });

  it("accepts a complete input", function () {
    const result =
      validateMarketInput({
        question:
          "Will ETH reach the target?",
        duration: 3600n,
        threshold: 3000n,
      });

    expect(result.valid)
      .to.equal(true);
  });

  it("provides a boolean shortcut", function () {
    expect(
      isValidMarketInput({
        question:
          "Will ETH reach the target?",
        duration: 3600n,
        threshold: 3000n,
      }),
    ).to.equal(true);
  });
});
