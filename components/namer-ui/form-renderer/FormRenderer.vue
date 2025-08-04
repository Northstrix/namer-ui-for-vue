<template>
  <form @submit.prevent="handleSubmit" autocomplete="on" :style="formStyle" novalidate>
    <!-- Title / Description Card -->
    <div :style="cardStyle" class="form-header-card">
      <h1 :style="computedTitleStyle" class="font-bold">
        {{ schema.meta.title }}
      </h1>
      <!-- Description is plain text -->
      <p
        v-if="schema.meta.description"
        :style="computedDescStyle"
        class="form-description"
      >
        {{ schema.meta.description }}
      </p>
      <!-- Labels / Inscriptions -->
      <div
        v-if="schema.meta.labels && schema.meta.labels.length > 0"
        :style="labelInscriptionsContainerStyle"
        class="meta-label-inscriptions"
      >
        <div
          v-for="(li, idx) in schema.meta.labels"
          :key="`label-inscription-${idx}`"
          :dir="detectLabelDir(li.label)"
          class="label-inscription-pair"
          :style="labelInscriptionPairStyle"
        >
          <!-- Label, with colon and space -->
          <span
            class="label-text"
            :style="[{ fontWeight: 700, color: labelLabelForegroundColor }, labelTextStyle]"
          >
            {{ li.label }}:
          </span>
          <!-- Inscription -->
          <template v-if="li.type === 'hyperlink'">
            <a
              :href="li.link"
              :target="li.openIn === 'newTab' ? '_blank' : '_self'"
              rel="noopener"
              class="inscription-link-wrapper"
              @click.prevent.stop="onInscriptionLinkClick(li.link, li.openIn)"
              @keydown.enter.prevent.stop="onInscriptionLinkClick(li.link, li.openIn)"
              @keydown.space.prevent.stop="onInscriptionLinkClick(li.link, li.openIn)"
              :title="li.link"
              tabindex="0"
              :style="{ textDecoration: 'none', cursor: 'pointer', display: 'inline' }"
            >
              <span
                :style="{ color: inscriptionLinkForegroundColor, textDecoration: 'underline', userSelect: 'text', display: 'inline' }"
                role="link"
              >
                {{ li.inscription }}
              </span>
            </a>
          </template>
          <span
            v-else
            class="inscription-text"
            :style="{ color: inscriptionLabelForegroundColor }"
          >
            {{ li.inscription }}
          </span>
        </div>
      </div>
    </div>
    <!-- Sections -->
    <div
      v-for="(section, sidx) in schema.sections"
      :key="sidx"
      :style="cardStyle"
      class="form-section-card"
    >
      <template v-for="(el, eidx) in section.elements" :key="getElementKey(el, eidx)">
        <!-- Text element -->
        <div
          v-if="el.type === 'text'"
          class="form-text"
          :style="getTextElementStyle(el.text, eidx, section.elements)"
          :dir="isRTL(el.text) ? 'rtl' : 'ltr'"
        >
          {{ el.text }}
        </div>
        <!-- Input -->
        <div
          v-else-if="el.type === 'input'"
          :style="{ marginTop: eidx > 0 ? GAP_BETWEEN_ELEMENTS + 'px' : undefined }"
        >
          <FloatingLabelInput
            v-model="formData[el.key]"
            :label="el.text"
            :accentColor="themeColors.accentColor"
            :parentBackground="themeColors.cardBackground"
            :inputOutlineColor="themeColors.inputOutline"
            :inputFocusOutlineColor="inputFocusOutlineColorProp"
            :foregroundColor="themeColors.foreground"
            :mutedForegroundColor="labelFloatingInputForegroundColor"
            :rounding="rounding.generalRounding"
            :inputPadding="inputPadding"
            :inputFontSize="inputFontSize"
            :labelFontSize="labelFontSize"
            :labelActiveFontSize="labelActiveFontSize"
            :labelPadding="floatingLabelInputInactiveLabelPadding"
            :labelActivePadding="labelActivePadding"
            :inputHeight="inputHeight"
            :disabled="false"
            :textarea="false"
            :isRTL="isRTL(el.text)"
          />
        </div>
        <!-- Textarea -->
        <div
          v-else-if="el.type === 'textarea'"
          :style="{ marginTop: eidx > 0 ? GAP_BETWEEN_ELEMENTS + 'px' : undefined }"
        >
          <FloatingLabelInput
            v-model="formData[el.key]"
            :label="el.text"
            :accentColor="themeColors.accentColor"
            :parentBackground="themeColors.cardBackground"
            :inputOutlineColor="themeColors.inputOutline"
            :inputFocusOutlineColor="inputFocusOutlineColorProp"
            :foregroundColor="themeColors.foreground"
            :mutedForegroundColor="labelFloatingInputForegroundColor"
            :rounding="rounding.generalRounding"
            :inputPadding="inputPadding"
            :inputFontSize="inputFontSize"
            :labelFontSize="labelFontSize"
            :labelActiveFontSize="labelActiveFontSize"
            :labelPadding="floatingLabelInputInactiveLabelPadding"
            :labelActivePadding="labelActivePadding"
            :inputHeight="inputHeight"
            :textarea="true"
            :textareaHeight="el.height ? `${el.height}px` : defaultTextareaHeight"
            :disabled="false"
            :isRTL="isRTL(el.text)"
          />
        </div>
        <!-- Checkboxes -->
        <div
          v-else-if="el.type === 'checkboxes'"
          :style="{ marginTop: eidx > 0 ? GAP_BETWEEN_ELEMENTS + 'px' : undefined }"
        >
          <fieldset class="form-checkbox-group" role="group">
            <div class="checkbox-options">
              <label
                v-for="option in el.options"
                :key="option.value"
                :for="`checkbox-${el.key}-${option.value}`"
                class="clickable-label"
                :class="{ 'disabled-label': isCheckboxDisabled(el.key, option.value, el.maxSelected) }"
                :dir="isRTL(option.text) ? 'rtl' : 'ltr'"
                tabindex="0"
                @keydown.enter.prevent.stop="toggleCheckbox(el.key, option.value, el)"
                @keydown.space.prevent.stop="toggleCheckbox(el.key, option.value, el)"
                :aria-disabled="isCheckboxDisabled(el.key, option.value, el.maxSelected) ? 'true' : 'false'"
                :style="getCheckboxLabelStyle(option.text, el, option.value)"
              >
                <template v-if="isRTL(option.text)">
                  <span>{{ option.text }}</span>
                  <div class="control-wrapper">
                    <FormRendererCheckbox
                      :id="`checkbox-${el.key}-${option.value}`"
                      :checked="isCheckboxChecked(el.key, option.value)"
                      @update:checked="(checked) => onCheckboxChange(el.key, option.value, checked, el)"
                      :accentColor="themeColors.accentColor"
                      :highlightForeground="themeColors.highlightForeground"
                      :backgroundColor="checkRadioBackgroundColor"
                      :inputOutlineColor="checkRadioOutlineColor"
                      :disabled="isCheckboxDisabled(el.key, option.value, el.maxSelected)"
                      :borderColor="checkRadioOutlineColor"
                      :borderRadius="checkboxRounding"
                      :aria-disabled="isCheckboxDisabled(el.key, option.value, el.maxSelected)"
                    />
                  </div>
                </template>
                <template v-else>
                  <div class="control-wrapper">
                    <FormRendererCheckbox
                      :id="`checkbox-${el.key}-${option.value}`"
                      :checked="isCheckboxChecked(el.key, option.value)"
                      @update:checked="(checked) => onCheckboxChange(el.key, option.value, checked, el)"
                      :accentColor="themeColors.accentColor"
                      :highlightForeground="themeColors.highlightForeground"
                      :backgroundColor="checkRadioBackgroundColor"
                      :inputOutlineColor="checkRadioOutlineColor"
                      :disabled="isCheckboxDisabled(el.key, option.value, el.maxSelected)"
                      :borderColor="checkRadioOutlineColor"
                      :borderRadius="checkboxRounding"
                      :aria-disabled="isCheckboxDisabled(el.key, option.value, el.maxSelected)"
                    />
                  </div>
                  <span>{{ option.text }}</span>
                </template>
                <span
                  class="click-overlay"
                  :class="{ 'disabled-overlay': isCheckboxDisabled(el.key, option.value, el.maxSelected) }"
                  @click.stop.prevent="handleOverlayClick(el.key, option.value, el)"
                  :style="getOverlayStyle(el.key, el, option.value)"
                />
              </label>
            </div>
          </fieldset>
        </div>
        <!-- Radio Buttons -->
        <div
          v-else-if="el.type === 'radio'"
          :style="{ marginTop: eidx > 0 ? GAP_BETWEEN_ELEMENTS + 'px' : undefined }"
        >
          <fieldset class="form-radio-group" role="radiogroup">
            <div class="radio-options">
              <label
                v-for="option in el.options"
                :key="option.value"
                :for="`radio-${el.key}-${option.value}`"
                class="clickable-label"
                :class="{ 'disabled-label': false }"
                :dir="isRTL(option.text) ? 'rtl' : 'ltr'"
                tabindex="0"
                @keydown.enter.prevent.stop="toggleRadio(el.key, option.value, el)"
                @keydown.space.prevent.stop="toggleRadio(el.key, option.value, el)"
                :style="getRadioLabelStyle(option.text)"
              >
                <template v-if="isRTL(option.text)">
                  <span>{{ option.text }}</span>
                  <div class="control-wrapper">
                    <FormRendererRadio
                      :id="`radio-${el.key}-${option.value}`"
                      :checked="formData[el.key] === option.value"
                      @update:checked="(checked) => onRadioChange(el.key, option.value, checked, el.allowUnselect)"
                      :allowUnselect="el.allowUnselect ?? false"
                      :accentColor="themeColors.accentColor"
                      :highlightForeground="themeColors.highlightForeground"
                      :backgroundColor="checkRadioBackgroundColor"
                      :inputOutlineColor="checkRadioOutlineColor"
                      :borderColor="checkRadioOutlineColor"
                      :borderRadius="radioRounding"
                    />
                  </div>
                </template>
                <template v-else>
                  <div class="control-wrapper">
                    <FormRendererRadio
                      :id="`radio-${el.key}-${option.value}`"
                      :checked="formData[el.key] === option.value"
                      @update:checked="(checked) => onRadioChange(el.key, option.value, checked, el.allowUnselect)"
                      :allowUnselect="el.allowUnselect ?? false"
                      :accentColor="themeColors.accentColor"
                      :highlightForeground="themeColors.highlightForeground"
                      :backgroundColor="checkRadioBackgroundColor"
                      :inputOutlineColor="checkRadioOutlineColor"
                      :borderColor="checkRadioOutlineColor"
                      :borderRadius="radioRounding"
                    />
                  </div>
                  <span>{{ option.text }}</span>
                </template>
              </label>
            </div>
          </fieldset>
        </div>
      </template>
    </div>
    <!-- Submit Button -->
    <footer class="form-footer" :style="formFooterStyle">
      <ChronicleButton
        type="submit"
        :text="submitButtonText"
        :customBackground="chronicleButtonBackground"
        :customForeground="chronicleButtonForeground"
        :borderRadius="submitButtonRounding"
        :hoverBackground="themeColors.accentColor"
        :hoverColor="themeColors.highlightForeground"
        width="100%"
      />
    </footer>
  </form>
</template>

<script lang="ts" setup>
import { reactive, computed, defineProps, defineEmits } from 'vue';
import FloatingLabelInput from '~/components/namer-ui/floating-label-input/FloatingLabelInput.vue';
import FormRendererCheckbox from '~/components/namer-ui/form-renderer-checkbox/FormRendererCheckbox.vue';
import FormRendererRadio from '~/components/namer-ui/form-renderer-radio/FormRendererRadio.vue';
import ChronicleButton from '~/components/namer-ui/chronicle-button/ChronicleButton.vue';
import type { FormSchema, SectionElement } from './FormRendererType';
import type { CSSProperties } from 'vue';

const GAP_BETWEEN_ELEMENTS = 22;
const RTL_REGEX = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;

function isRTL(text?: string): boolean {
  return !!text && RTL_REGEX.test(text);
}

function detectRTL(text: string): boolean {
  return RTL_REGEX.test(text);
}

function detectLabelDir(text: string): 'rtl' | 'ltr' {
  return detectRTL(text) ? 'rtl' : 'ltr';
}

const props = defineProps<{
  schema: FormSchema;
  accentColor?: string;
  highlightForeground?: string;
  cardBackground?: string;
  cardOutlineColor?: string;
  checkRadioOutlineColor?: string;
  labelFloatingInputForeground?: string;
  labelLabelForeground?: string;
  inscriptionLabelForeground?: string;
  inscriptionLinkForeground?: string;
  descriptionForeground?: string;
  foreground?: string;
  inputOutline?: string;
  inputFocusOutlineColor?: string;
  generalRounding?: string;
  inputPadding?: string;
  inputFontSize?: string;
  labelFontSize?: string;
  labelActiveFontSize?: string;
  floatingLabelInputInactiveLabelPadding?: string;
  labelActivePadding?: string;
  inputHeight?: string;
  defaultTextareaHeight?: string;
  cardGap?: string;
  cardPadding?: string;
  sectionTextSize?: string;
  elementTextSize?: string;
  checkboxRounding?: string;
  radioRounding?: string;
  checkRadioBackgroundColor?: string;
  checkRadioTextColor?: string;
  chronicleButtonBackground?: string;
  chronicleButtonForeground?: string;
  submitButtonRounding?: string;
  descriptionMarginBottom?: string;
  titleMarginTop?: string;
  titleMarginBottom?: string;
  labelTextStyle?: CSSProperties;
  inscriptionTextStyle?: CSSProperties;
  buttonMarginTop?: string;
  labelInscriptionGap?: string;
  submitButtonText?: string;
  titleFontWeight?: string | number;
}>();

const emit = defineEmits<{ (event: 'submit', data: string): void }>();

const defaultColors = {
  accentColor: '#00a0d8',
  highlightForeground: '#fff',
  background: '#0a0a0a',
  cardBackground: '#2e2e2e',
  cardOutline: '#363636',
  checkRadioOutline: '#909090',
  descriptionForeground: '#aaa',
  labelFloatingInputForeground: '#aaa',
  labelLabelForeground: '#aaa',
  inscriptionLabelForeground: '#aaa',
  inscriptionLinkForeground: '#fff',
  foreground: '#fff',
  inputOutline: '#909090',
  chronicleButtonBgDefault: '#ffffff',
  chronicleButtonFgDefault: '#0a0a0a',
};

const defaultRounding = {
  generalRounding: '8px',
  checkboxRounding: '6px',
  radioRounding: '50%',
};

const themeColors = {
  accentColor: props.accentColor ?? props.schema.meta.accentColor ?? defaultColors.accentColor,
  highlightForeground:
    props.highlightForeground ?? props.schema.meta.highlightForeground ?? defaultColors.highlightForeground,
  cardBackground: props.cardBackground ?? defaultColors.cardBackground,
  cardOutlineColor: props.cardOutlineColor ?? defaultColors.cardOutline,
  checkRadioOutlineColor: props.checkRadioOutlineColor ?? defaultColors.checkRadioOutline,
  descriptionForeground: props.descriptionForeground ?? defaultColors.descriptionForeground,
  foreground: props.foreground ?? defaultColors.foreground,
  inputOutline: props.inputOutline ?? defaultColors.inputOutline,
  labelFloatingInputForeground: props.labelFloatingInputForeground ?? defaultColors.labelFloatingInputForeground,
  labelLabelForeground: props.labelLabelForeground ?? defaultColors.labelLabelForeground,
  inscriptionLabelForeground: props.inscriptionLabelForeground ?? defaultColors.inscriptionLabelForeground,
  inscriptionLinkForeground: props.inscriptionLinkForeground ?? defaultColors.inscriptionLinkForeground,
};

// Use the new prop if provided else default to #fff
const inputFocusOutlineColorProp = props.inputFocusOutlineColor ?? '#fff';

const chronicleButtonBackground = props.chronicleButtonBackground ?? defaultColors.chronicleButtonBgDefault;
const chronicleButtonForeground = props.chronicleButtonForeground ?? defaultColors.chronicleButtonFgDefault;

const rounding = {
  generalRounding: props.generalRounding ?? defaultRounding.generalRounding,
};
const checkboxRounding = props.checkboxRounding ?? defaultRounding.checkboxRounding;
const radioRounding = props.radioRounding ?? defaultRounding.radioRounding;

const checkRadioBackgroundColor = props.checkRadioBackgroundColor ?? themeColors.cardBackground;
const checkRadioOutlineColor = themeColors.checkRadioOutlineColor;
const cardOutlineColor = themeColors.cardOutlineColor;

const labelFloatingInputForegroundColor = themeColors.labelFloatingInputForeground;
const labelLabelForegroundColor = themeColors.labelLabelForeground;
const inscriptionLabelForegroundColor = themeColors.inscriptionLabelForeground;
const inscriptionLinkForegroundColor = themeColors.inscriptionLinkForeground;

const checkRadioTextColorComputed = computed(() => props.checkRadioTextColor ?? themeColors.foreground);

const formData = reactive<Record<string, any>>({});

function isKeyedElement(el: SectionElement): el is Extract<SectionElement, { key: string }> {
  return 'key' in el && typeof el.key === 'string';
}

// Initialize formData
for (const section of props.schema.sections) {
  for (const el of section.elements) {
    if (isKeyedElement(el)) {
      if (el.type === 'checkboxes') formData[el.key] = [];
      else if (el.type === 'radio') formData[el.key] = '';
      else if (el.type === 'input' || el.type === 'textarea') formData[el.key] = '';
    }
  }
}

function getElementKey(el: SectionElement, fallback: number) {
  return isKeyedElement(el) ? el.key : `el-${fallback}`;
}

function isCheckboxChecked(key: string, value: string): boolean {
  return (formData[key] as string[] | undefined)?.includes(value) ?? false;
}

function isCheckboxDisabled(key: string, value: string, maxSelected?: number): boolean {
  if (!maxSelected) return false;
  const selected = formData[key] as string[] | undefined;
  return selected ? selected.length >= maxSelected && !selected.includes(value) : false;
}

function onCheckboxChange(key: string, value: string, checked: boolean, element: any) {
  const selected = formData[key] as string[] | undefined;
  if (!selected) return;
  if (element.allowMultiple === false) {
    if (checked) {
      if (selected.includes(value)) {
        formData[key] = [];
      } else {
        formData[key] = [value];
      }
    } else {
      const idx = selected.indexOf(value);
      if (idx >= 0) selected.splice(idx, 1);
    }
  } else {
    if (checked) {
      if (element.maxSelected && selected.length >= element.maxSelected && !selected.includes(value)) return;
      if (!selected.includes(value)) selected.push(value);
    } else {
      const idx = selected.indexOf(value);
      if (idx >= 0) selected.splice(idx, 1);
    }
  }
}

function toggleCheckbox(key: string, value: string, element: any, checked?: boolean) {
  if (!formData[key]) formData[key] = [];
  const vals = [...formData[key]];
  const hasValue = vals.includes(value);
  const allowMultiple = element.allowMultiple ?? false;
  const maxSelected = element.maxSelected || 0;
  const atMax = allowMultiple && maxSelected > 0 && vals.length >= maxSelected;
  if (allowMultiple === false) {
    if (checked !== undefined) {
      if (checked) {
        if (!hasValue) {
          formData[key] = [value];
        } else {
          formData[key] = [];
        }
      } else {
        const idx = vals.indexOf(value);
        if (idx !== -1) vals.splice(idx, 1);
        formData[key] = vals;
      }
    } else {
      if (hasValue) {
        formData[key] = [];
      } else {
        formData[key] = [value];
      }
    }
  } else {
    if (checked !== undefined) {
      if (checked && !hasValue && (!atMax || vals.length < maxSelected)) {
        vals.push(value);
      } else if (!checked && hasValue) {
        const idx = vals.indexOf(value);
        if (idx !== -1) vals.splice(idx, 1);
      }
      formData[key] = vals;
    } else {
      if (hasValue) {
        const idx = vals.indexOf(value);
        if (idx !== -1) vals.splice(idx, 1);
      } else if (!atMax || vals.length < maxSelected) {
        vals.push(value);
      }
      formData[key] = vals;
    }
  }
}

function isInactive(key: string, element: any, value: string): boolean {
  const vals = formData[key] || [];
  if (!element.allowMultiple || element.maxSelected <= 0) return false;
  if (vals.includes(value)) return false;
  return vals.length >= element.maxSelected;
}

function handleOverlayClick(key: string, value: string, element: any): void {
  if (isInactive(key, element, value)) return;
  toggleCheckbox(key, value, element);
}

function onRadioChange(key: string, value: string, checked: boolean, allowUnselect?: boolean) {
  if (checked) formData[key] = value;
  else if (allowUnselect && formData[key] === value) formData[key] = '';
}

function toggleRadio(key: string, value: string, element: any, checked?: boolean) {
  if (checked !== undefined) {
    if (checked) formData[key] = value;
    else formData[key] = undefined;
  } else {
    if (formData[key] === value && (element.allowUnselect ?? true)) formData[key] = undefined;
    else formData[key] = value;
  }
}

function handleSubmit() {
  const encode = (str: string) => btoa(unescape(encodeURIComponent(str)));
  const result = props.schema.sections
    .map((section) => {
      return (
        '[' +
        section.elements
          .map((el) => {
            if (el.type === 'text') return '';
            if (isKeyedElement(el)) {
              if (el.type === 'input' || el.type === 'textarea') {
                // FIXED: Use el.key for encoding not el.text
                const val = formData[el.key];
                return '[' + encode(el.key) + ':' + (val && val !== '' ? encode(val) : 'n') + ']';
              }
              if (el.type === 'checkboxes') {
                const vals: string[] = formData[el.key] || [];
                return '[' + encode(el.key) + ':' + (vals.length ? vals.map((v) => encode(v)).join(',') : 'n') + ']';
              }
              if (el.type === 'radio') {
                const val: string | undefined = formData[el.key];
                return '[' + encode(el.key) + ':' + (val ? encode(val) : 'n') + ']';
              }
            }
            return '';
          })
          .join('') +
        ']'
      );
    })
    .join('');
  emit('submit', result);
}

// Open link programmatically for inscription hyperlink span
function onInscriptionLinkClick(link: string, openIn: 'newTab' | 'sameTab' = 'newTab') {
  if (!link) return;
  if (openIn === 'newTab') {
    window.open(link, '_blank', 'noopener');
  } else {
    window.open(link, '_self');
  }
}

// Styles and helpers same as before (omitted here for brevity)...

function getTextElementStyle(text: string, index: number, elements: any[]): CSSProperties {
  const isSingleTextSection = elements.length === 1 && elements[0].type === 'text';
  const textRTL = isRTL(text);
  const isFirst = index === 0;
  const next = elements[index + 1];
  const prev = elements[index - 1];
  const isNextNonText = next !== undefined && next.type !== 'text';
  const isPrevText = prev?.type === 'text';
  const isPrevNonText = prev !== undefined && prev.type !== 'text';

  const style: CSSProperties = {
    color: themeColors.foreground,
    fontSize: props.sectionTextSize ?? '16px',
    textAlign: textRTL ? 'right' : 'left',
    direction: textRTL ? 'rtl' : 'ltr',
    margin: 0,
  };
  if (isSingleTextSection) {
    style.fontWeight = '600';
    return style;
  }
  if (isFirst) {
    style.fontWeight = '600';
    style.marginTop = '0';
    style.marginBottom = isNextNonText ? '9px' : `${GAP_BETWEEN_ELEMENTS}px`;
    return style;
  }
  if (isPrevText || isPrevNonText) {
    style.fontWeight = '400';
    style.marginTop = `${GAP_BETWEEN_ELEMENTS}px`;
    return style;
  }
  style.fontWeight = '400';
  return style;
}

function getCheckboxLabelStyle(text: string, el: any, value: string): CSSProperties {
  const textRTL = isRTL(text);
  const inactive = isCheckboxDisabled(el.key, value, el.maxSelected);
  return {
    fontSize: props.elementTextSize ?? '15px',
    userSelect: 'none',
    opacity: inactive ? 0.6 : 1,
    cursor: inactive ? 'not-allowed' : 'pointer',
    color: checkRadioTextColorComputed.value,
    display: 'flex',
    flexDirection: textRTL ? 'row-reverse' : 'row',
    textAlign: textRTL ? 'right' : 'left',
    width: '100%',
    justifyContent: textRTL ? 'flex-end' : 'flex-start',
    gap: '8px',
    alignItems: 'center',
    position: 'relative',
  };
}

function getRadioLabelStyle(text: string): CSSProperties {
  const textRTL = isRTL(text);
  return {
    fontSize: props.elementTextSize ?? '15px',
    userSelect: 'none',
    color: checkRadioTextColorComputed.value,
    display: 'flex',
    flexDirection: textRTL ? 'row-reverse' : 'row',
    textAlign: textRTL ? 'right' : 'left',
    width: '100%',
    justifyContent: textRTL ? 'flex-end' : 'flex-start',
    gap: '8px',
    cursor: 'pointer',
    alignItems: 'center',
  };
}

function getOverlayStyle(key: string, element: any, value: string): CSSProperties {
  if (isCheckboxDisabled(key, value, element.maxSelected)) {
    return {
      pointerEvents: 'auto',
      cursor: 'not-allowed',
    };
  }
  return {
    pointerEvents: 'auto',
    cursor: 'pointer',
  };
}

const formStyle: CSSProperties = {
  width: '100%',
  maxHeight: 'unset',
  background: 'none',
  border: 'none',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: props.cardGap ?? '2rem',
  alignItems: 'center',
  boxSizing: 'border-box',
};

const cardStyle: CSSProperties = {
  width: '100%',
  background: props.cardBackground,
  borderRadius: props.generalRounding ?? '8px',
  border: `1.5px solid ${cardOutlineColor}`,
  padding: props.cardPadding ?? '2rem 1.75rem',
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s, background 0.3s, color 0.3s',
};

const labelInscriptionsContainerStyle: CSSProperties = {
  marginTop: props.labelInscriptionGap ?? '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: props.labelInscriptionGap ?? '0.5rem',
};

const labelInscriptionPairStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
};

const formFooterStyle = computed<CSSProperties>(() => ({
  marginTop: props.buttonMarginTop ?? '1rem',
  textAlign: 'center',
  width: '100%',
}));

const computedTitleStyle = computed<CSSProperties>(() => ({
  fontSize: '1.8rem',
  fontWeight: props.titleFontWeight ?? 900, // <-- Use optional prop here with default of 900
  color: props.accentColor,
  textAlign: isRTL(props.schema?.meta?.title) ? 'right' : 'left',
  direction: isRTL(props.schema?.meta?.title) ? 'rtl' : 'ltr',
  marginTop: props.titleMarginTop ?? '0',
  marginBottom: props.titleMarginBottom ?? '0.3rem',
}));

const computedDescStyle = computed<CSSProperties>(() => ({
  fontSize: '1rem',
  fontWeight: 400,
  color: themeColors.descriptionForeground,
  lineHeight: 1.4,
  whiteSpace: 'normal',
  overflowWrap: 'break-word',
  textAlign: isRTL(props.schema?.meta?.description) ? 'right' : 'left',
  direction: isRTL(props.schema?.meta?.description) ? 'rtl' : 'ltr',
  marginBottom: props.descriptionMarginBottom ?? '1rem',
}));

// Default submit button text fallback
const submitButtonText = props.submitButtonText ?? 'Submit';
</script>

<style scoped>
.form-header-card {
  width: 100%;
  margin-bottom: 1.5rem;
}

.form-section-card {
  margin-bottom: 0;
}

.form-text {
  font-weight: 700;
  font-size: 1.15rem;
  margin: 0 0 0.6rem;
}

.form-checkbox-group,
.form-radio-group {
  border: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-options,
.radio-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.clickable-label {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
  position: relative;
  outline-offset: 2px;
}

.control-wrapper {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.click-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
  z-index: 10;
  border-radius: inherit;
}

.disabled-overlay {
  cursor: not-allowed !important;
  pointer-events: auto !important;
}

.form-footer {
  text-align: center;
  width: 100%;
}

.form-footer > * {
  width: 100%;
}

.disabled-label {
  opacity: 0.6;
  cursor: not-allowed;
}

.meta-label-inscriptions {
  width: 100%;
}

.label-inscription-pair {
  display: flex;
  gap: 0.25rem;
  align-items: center;
}

.label-text {
  font-weight: 700;
  white-space: nowrap;
}

.inscription-text {
  color: inherit;
}

.inscription-link-wrapper {
  outline-offset: 2px;
}

.inscription-link-wrapper:focus {
  outline: 2px solid rgba(0, 0, 0, 0.8);
}
</style>
