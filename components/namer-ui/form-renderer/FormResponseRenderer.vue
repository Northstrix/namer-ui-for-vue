<template>
  <div :style="containerStyle">
    <h2 :style="headerStyle">Decoded Submitted Form Data</h2>
    <div
      v-for="(section, sidx) in decodedSections"
      :key="'section-' + sidx"
      :style="getSectionStyle(sidx)"
      class="section-wrapper"
    >
      <div :style="sectionHeaderStyle">Section {{ sidx + 1 }}</div>

      <div v-if="section.elements.length === 0" :style="emptySectionTextStyle">
        (No elements in this section)
      </div>

      <template v-for="(el, eidx) in section.elements" :key="'el-' + sidx + '-' + eidx">
        <div v-if="el.type === 'text'" :style="textElementStyle">{{ el.text }}</div>

        <div v-else-if="el.type === 'input'" :style="valueContainerStyle">
          <div :style="labelStyle">{{ el.text }}:</div>
          <!-- Dynamic direction style for input values -->
          <pre :style="[inputValueStyle, { direction: getInputDirection(submittedValues[el.key]) }]">
            {{ submittedValues[el.key] ?? '(No input)' }}
          </pre>
        </div>

        <div v-else-if="el.type === 'textarea'" :style="valueContainerStyle">
          <div :style="labelStyle">{{ el.text }}:</div>
          <!-- Dynamic direction style for textarea values -->
          <pre :style="[textareaValueStyle, { direction: getInputDirection(submittedValues[el.key]) }]">
            {{ submittedValues[el.key] ?? '(No input)' }}
          </pre>
        </div>

        <div v-else-if="el.type === 'checkboxes'" :style="valueContainerStyle">
          <div :style="labelStyle">Checkboxes ({{ el.key }}):</div>
          <div :style="checkboxContainerStyle">
            <label
              v-for="option in el.options"
              :key="option.value"
              :style="getCheckboxLabelStyle(el.key, option.value)"
              class="custom-checkbox-label"
            >
              <input
                type="checkbox"
                :disabled="true"
                :checked="submittedValues[el.key]?.includes(option.value) || false"
                aria-hidden="true"
                tabindex="-1"
              />
              <span class="custom-checkbox-box"></span>
              {{ option.text }}
            </label>
          </div>
        </div>

        <div v-else-if="el.type === 'radio'" :style="valueContainerStyle">
          <div :style="labelStyle">Radio ({{ el.key }}):</div>
          <div :style="radioContainerStyle">
            <label
              v-for="option in el.options"
              :key="option.value"
              :style="getRadioLabelStyle(el.key, option.value)"
            >
              <input
                type="radio"
                :disabled="true"
                :checked="submittedValues[el.key] === option.value"
                :style="getRadioInputStyle(el.key, option.value)"
              />
              {{ option.text }}
            </label>
          </div>
        </div>

        <div v-else>
          <div :style="unknownElementStyle">(Unsupported element type: {{ el.type }})</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, reactive, watch } from 'vue';
import type { CSSProperties } from 'vue';
import type { FormSchema } from './FormRendererType';

function decodeB64(str: string): string {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return '';
  }
}

const props = defineProps<{
  schema: FormSchema;
  encodedResponse: string | null;
}>();

function parseEncodedResponse(encoded: string): Record<string, string | string[]> {
  const map: Record<string, string | string[]> = {};
  if (!encoded) return map;

  const sectionPairsRegex = /\[([^\][]+)\]/g;
  let match: RegExpExecArray | null;
  while ((match = sectionPairsRegex.exec(encoded))) {
    const pairStr = match[1];
    const [keyBase64, valBase64OrN] = pairStr.split(':');
    if (!keyBase64) continue;
    const key = decodeB64(keyBase64);
    if (valBase64OrN === 'n') {
      map[key] = '';
    } else if (valBase64OrN.includes(',')) {
      const vals = valBase64OrN.split(',');
      map[key] = vals.map((v) => decodeB64(v));
    } else {
      map[key] = decodeB64(valBase64OrN);
    }
  }
  return map;
}

const submittedValues = reactive(parseEncodedResponse(props.encodedResponse ?? ''));

watch(
  () => props.encodedResponse,
  (newVal) => {
    const parsed = parseEncodedResponse(newVal ?? '');
    Object.keys(submittedValues).forEach((k) => delete submittedValues[k]);
    Object.entries(parsed).forEach(([key, val]) => {
      submittedValues[key] = val;
    });
  },
  { immediate: true }
);

const decodedSections = computed(() => props.schema.sections);

// --- RTL detection function ---
const RTL_REGEX = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;

function isRTL(text?: string): boolean {
  return !!text && RTL_REGEX.test(text);
}

// Function to get direction style based on text content
function getInputDirection(val?: string | string[]): 'rtl' | 'ltr' {
  if (Array.isArray(val)) {
    // If array, join to string for detection
    return isRTL(val.join(' ')) ? 'rtl' : 'ltr';
  }
  return isRTL(val) ? 'rtl' : 'ltr';
}

// --- Styles with explicit CSSProperties typing ---

const containerStyle: CSSProperties = {
  background: '#0a0a0a',
  color: '#fff',
  padding: '1rem 1rem 2rem 1rem',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  borderRadius: '8px',
  maxWidth: '100%',
  boxSizing: 'border-box',
};

const headerStyle: CSSProperties = {
  fontWeight: '700',
  fontSize: '1.6rem',
  marginBottom: '1rem',
  color: '#00a0d8',
};

const sectionBaseStyle: CSSProperties = {
  borderRadius: '8px',
  padding: '1rem',
  marginBottom: '1rem',
  border: '1.5px solid #2e2e2e',
  boxSizing: 'border-box',
};

const firstSectionBg: CSSProperties = {
  backgroundColor: '#000000',
};

const secondSectionBg: CSSProperties = {
  backgroundColor: '#0B0B0F',
};

function getSectionStyle(sidx: number): CSSProperties {
  return {
    ...sectionBaseStyle,
    ...(sidx % 2 === 0 ? firstSectionBg : secondSectionBg),
  };
}

const sectionHeaderStyle: CSSProperties = {
  fontWeight: '700',
  fontSize: '1.2rem',
  marginBottom: '0.75rem',
  borderBottom: '1px solid #363636',
  paddingBottom: '0.3rem',
};

const emptySectionTextStyle: CSSProperties = {
  fontStyle: 'italic',
  color: '#707070',
};

const textElementStyle: CSSProperties = {
  fontWeight: '600',
  fontSize: '1rem',
  margin: '0.4rem 0',
  color: '#c1c1c1',
};

const valueContainerStyle: CSSProperties = {
  marginBottom: '0.75rem',
  whiteSpace: 'normal',
};

const labelStyle: CSSProperties = {
  fontWeight: '700',
  fontSize: '1rem',
  marginBottom: '0.25rem',
  color: '#00a0d8',
};

const inputValueStyle: CSSProperties = {
  backgroundColor: '#161616',
  padding: '0.4rem 0.6rem',
  borderRadius: '7px',
  fontFamily: "'Courier New', Courier, monospace",
  fontSize: '0.9rem',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  color: '#eee',
  border: '1.5px solid #2e2e2e',
  minHeight: '40px',
  height: 'auto',
  overflowY: 'visible',
};

const textareaValueStyle: CSSProperties = {
  backgroundColor: '#161616',
  padding: '0.4rem 0.6rem',
  borderRadius: '7px',
  fontFamily: "'Courier New', Courier, monospace",
  fontSize: '0.9rem',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  color: '#eee',
  border: '1.5px solid #2e2e2e',
  minHeight: '80px',
  maxHeight: '400px',
  overflowY: 'auto',
};

const checkboxContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
};

const checkboxLabelStyleBase: CSSProperties = {
  cursor: 'default',
  userSelect: 'none',
  color: '#c1c1c1',
  fontSize: '0.95rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.35rem',
};

function getCheckboxLabelStyle(key: string, value: string): CSSProperties {
  const isSelected = Array.isArray(submittedValues[key]) && (submittedValues[key] as string[]).includes(value);
  return {
    ...checkboxLabelStyleBase,
    ...(isSelected ? { color: '#00bb3f', fontWeight: '700', textDecoration: 'underline' } : {}),
  };
}

const radioContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
};

const radioLabelStyleBase: CSSProperties = {
  cursor: 'default',
  userSelect: 'none',
  color: '#c1c1c1',
  fontSize: '0.95rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.35rem',
};

function getRadioLabelStyle(key: string, value: string): CSSProperties {
  const isSelected = submittedValues[key] === value;
  return {
    ...radioLabelStyleBase,
    ...(isSelected ? { color: '#00bb3f', fontWeight: '700', textDecoration: 'underline' } : {}),
  };
}

const radioInputBaseStyle: CSSProperties = {
  appearance: 'none',
  width: '16px',
  height: '16px',
  marginRight: '6px',
  borderRadius: '50%',
  border: '1.5px solid #2e2e2e',
  backgroundColor: 'transparent',
  pointerEvents: 'none',
  position: 'relative',
};

const radioInputSelectedStyle: CSSProperties = {
  backgroundColor: '#00bb3f',
  borderColor: '#00bb3f',
  boxShadow: 'inset 0 0 0 5px #0a0a0a',
};

function getRadioInputStyle(key: string, value: string): CSSProperties {
  const isSelected = submittedValues[key] === value;
  return {
    ...radioInputBaseStyle,
    ...(isSelected ? radioInputSelectedStyle : {}),
  };
}

const unknownElementStyle: CSSProperties = {
  color: '#ff2800',
  fontWeight: '600',
  fontStyle: 'italic',
  margin: '0.5rem 0',
};
</script>

<style scoped>
.section-wrapper {
  transition: border-color 0.3s, background-color 0.3s;
}

/* Custom checkbox styling */
.custom-checkbox-label {
  cursor: default;
  user-select: none;
  color: #c1c1c1;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  position: relative;
  /* underline & color handled by inline style */
}

.custom-checkbox-label input {
  /* Visually hide the native checkbox but keep it accessible for screen readers */
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;
}

.custom-checkbox-box {
  width: 16px;
  height: 16px;
  border: 1.5px solid #2e2e2e;
  border-radius: 5px; /* slightly rounded rectangle */
  background-color: transparent;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
}

/* Checked state: fill green and show checkmark */
.custom-checkbox-label input:checked + .custom-checkbox-box {
  background-color: #00bb3f;
  border-color: #00bb3f;
}

/* Checkmark using ::after */
.custom-checkbox-label input:checked + .custom-checkbox-box::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 0px;
  width: 5px;
  height: 9px;
  border: solid #0a0a0a;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
