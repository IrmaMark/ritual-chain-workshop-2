export type MarketInput = {
  question: string;
  duration: bigint;
  threshold: bigint;
};

export type ValidationResult = {
  valid: boolean;
  errors: string[];
};

export function validateQuestion(
  question: string,
): string | undefined {
  const value = question.trim();

  if (value.length === 0) {
    return "question cannot be empty";
  }

  if (value.length < 10) {
    return "question is too short";
  }

  return undefined;
}

export function validateDuration(
  duration: bigint,
): string | undefined {
  if (duration <= 0n) {
    return "duration must be positive";
  }

  return undefined;
}

export function validateThreshold(
  threshold: bigint,
): string | undefined {
  if (threshold < 0n) {
    return "threshold cannot be negative";
  }

  return undefined;
}

export function validateMarketInput(
  input: MarketInput,
): ValidationResult {
  const errors: string[] = [];

  const questionError =
    validateQuestion(input.question);

  if (questionError) {
    errors.push(questionError);
  }

  const durationError =
    validateDuration(input.duration);

  if (durationError) {
    errors.push(durationError);
  }

  const thresholdError =
    validateThreshold(input.threshold);

  if (thresholdError) {
    errors.push(thresholdError);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function isValidMarketInput(
  input: MarketInput,
): boolean {
  return validateMarketInput(input).valid;
}
