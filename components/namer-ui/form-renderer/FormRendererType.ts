export type LabelInscriptionPlaintext = {
  label: string;
  type?: 'plaintext';
  inscription: string;
};

export type LabelInscriptionHyperlink = {
  label: string;
  type: 'hyperlink';
  inscription: string;
  link: string;
  openIn?: 'newTab' | 'sameTab';
};

export type LabelInscription = LabelInscriptionPlaintext | LabelInscriptionHyperlink;

export type FormMeta = {
  title: string;
  description: string;
  accentColor?: string;
  highlightForeground?: string;
  labels?: LabelInscription[];
};

export type TextElement = { type: 'text'; text: string };
export type InputElement = { type: 'input'; text: string; key: string };
export type TextareaElement = { type: 'textarea'; text: string; key: string; height?: number };

export type CheckboxOption = { text: string; value: string };
export type CheckboxesElement = {
  type: 'checkboxes';
  key: string;
  options: CheckboxOption[];
  allowMultiple?: boolean;
  maxSelected?: number;
};

export type RadioOption = { text: string; value: string };
export type RadioElement = {
  type: 'radio';
  key: string;
  options: RadioOption[];
  allowUnselect?: boolean;
};

export type SectionElement =
  | TextElement
  | InputElement
  | TextareaElement
  | CheckboxesElement
  | RadioElement;

export type Section = {
  elements: SectionElement[];
};

export type FormSchema = {
  meta: FormMeta;
  sections: Section[];
};
