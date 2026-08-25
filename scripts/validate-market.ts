import {
  validateMarketInput,
} from "../utils/market-validation";

const examples = [
  {
    question:
      "Will ETH reach the target?",
    duration: 3600n,
    threshold: 3000n,
  },
  {
    question: "",
    duration: 3600n,
    threshold: 3000n,
  },
  {
    question:
      "Will BTC move higher?",
    duration: 0n,
    threshold: 100n,
  },
  {
    question:
      "Will ETH reach the target?",
    duration: 3600n,
    threshold: -10n,
  },
];

for (const input of examples) {
  const result =
    validateMarketInput(input);

  console.log(
    "Question:",
    input.question || "(empty)",
  );

  console.log(
    "Valid:",
    result.valid,
  );

  if (result.errors.length > 0) {
    console.log(
      "Errors:",
    );

    for (const error of result.errors) {
      console.log("-", error);
    }
  }

  console.log(
    "----------------------",
  );
}
