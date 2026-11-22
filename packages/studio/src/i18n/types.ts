/** CLDR plural forms. `other` is required; each locale must fill the categories its rules use. */
export interface PluralForms {
  zero?: string;
  one?: string;
  two?: string;
  few?: string;
  many?: string;
  other: string;
}

export type Message = string | PluralForms;

export type Messages = Record<string, Message>;
