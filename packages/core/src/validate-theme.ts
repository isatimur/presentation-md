import _Ajv2020 from "ajv/dist/2020.js";
import type { ValidateFunction } from "ajv";
import themeSchema from "../theme.schema.json" with { type: "json" };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Ajv2020 = (_Ajv2020 as any).default ?? _Ajv2020;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

let validateFn: ValidateFunction | null = null;

function getValidator(): ValidateFunction {
  if (validateFn) return validateFn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ajv = new Ajv2020({ allErrors: true, strict: false }) as any;
  validateFn = ajv.compile(themeSchema) as ValidateFunction;
  return validateFn;
}

export function validateThemeJson(json: string): ValidationResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch (err) {
    return { valid: false, errors: [`Invalid JSON: ${(err as Error).message}`] };
  }
  const validate = getValidator();
  const valid = validate(parsed);
  const errors = (validate.errors ?? []).map(
    (e) => `${e.instancePath || "/"} ${e.message ?? "invalid"}`
  );
  return { valid, errors };
}
