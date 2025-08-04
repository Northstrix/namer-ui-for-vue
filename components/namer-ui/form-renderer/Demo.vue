<template>
  <div>
    <!-- Original form (dark theme) -->
    <FormRenderer
      :schema="formSchema"
      @submit="handleSubmit"
      :cardBackground="cardBackground"
      :cardOutlineColor="cardOutlineColor"
      :checkRadioOutlineColor="checkRadioOutlineColor"
      :inscriptionLinkForeground="inscriptionLinkForeground"
      :checkRadioBackgroundColor="checkRadioBackgroundColor"
    />
    <hr class="section-divider" />
    <h2 class="submitted-title">Submitted Form Data (Encoded):</h2>
    <pre class="submitted-data-pre">
{{ submittedDataString }}
    </pre>
    <FormResponseRenderer
      v-if="submittedData"
      :schema="formSchema"
      :encodedResponse="submittedData"
    />
    <hr class="section-divider" />

    <!-- New Hebrew form (light theme with purple accent) -->
    <div class="hebrew-form-container">
      <FormRenderer
        :schema="formSchemaHebrew"
        @submit="handleSubmitHebrew"
        titleFontWeight="600"
        cardBackground="#fff"
        cardOutlineColor="#a78bfa"
        checkRadioOutlineColor="#7c3aed"
        inscriptionLinkForeground="#7c3aed"
        checkRadioBackgroundColor="#f3e8ff"
        accentColor="#7c3aed"
        foreground="#000"
        inputOutline="#9ca3af"
        inputFocusOutlineColor="#4c1d95"
        highlightForeground="#fff"
        descriptionForeground="#4b5563"
        labelFloatingInputForeground="#6b7280"
        labelLabelForeground="#374151"
        inscriptionLabelForeground="#374151"
        chronicleButtonBackground="#111014"
        chronicleButtonForeground="#fff"
        submitButtonRounding="50px"
      />
      <h2 class="hebrew-submitted-title">
        נתוני טופס נשלחו (מקודדים):
      </h2>
      <pre class="submitted-data-pre hebrew-pre">
{{ submittedDataHebrewString }}
      </pre>
      <FormResponseRenderer
        v-if="submittedDataHebrew"
        :schema="formSchemaHebrew"
        :encodedResponse="submittedDataHebrew"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import FormRenderer from "./FormRenderer.vue";
import FormResponseRenderer from "./FormResponseRenderer.vue";
import type { FormSchema } from "./FormRendererType";

const cardBackground = "#16151a";
const cardOutlineColor = "#2e2d38";
const checkRadioOutlineColor = "#3a3846";
const inscriptionLinkForeground = "#00a0d8";
const checkRadioBackgroundColor = "#302e3a";

// English form schema with hardcoded keys
const formSchema: FormSchema = {
  meta: {
    title: "Complex Form",
    description:
      "This is a complex, multi-section form containing various sections, from simple, single-element sections to complex heterogeneous sections.",
    labels: [
      {
        label: "Made by",
        type: "hyperlink",
        inscription: "Maxim Bortnikov",
        link: "https://maxim-bortnikov.netlify.app/",
        openIn: "newTab",
      },
      {
        label: "Ported from",
        type: "hyperlink",
        inscription: "Blueberry Loom",
        link: "https://blueberry-loom.netlify.app/",
        openIn: "newTab",
      },
    ],
  },
  sections: [
    {
      elements: [
        { type: "text", text: "Simple section" },
        { type: "input", text: "Email", key: "hQ7" },
        { type: "input", text: "Phone Number", key: "kY4" },
      ],
    },
    {
      elements: [
        { type: "text", text: "Checkbox Example" },
        { type: "text", text: "Select up to 3 items:" },
        {
          type: "checkboxes",
          key: "bX2",
          allowMultiple: true,
          maxSelected: 3,
          options: [
            { text: "Nuxt", value: "A1b" },
            { text: "Vue.js", value: "C7d" },
            { text: "Namer UI", value: "E9f" },
            { text: "Perplexity", value: "G3h" },
          ],
        },
      ],
    },
    {
      elements: [
        { type: "text", text: "Heterogeneous section" },
        {
          type: "checkboxes",
          key: "nF8",
          allowMultiple: true,
          options: [
            { text: "First Checkbox", value: "J5k" },
            { text: "Second Checkbox", value: "L8m" },
            { text: "Third Checkbox", value: "N2p" },
            { text: "Fourth Checkbox", value: "Q4r" },
          ],
        },
        {
          type: "radio",
          key: "zD3",
          options: [
            { text: "First Radio", value: "S7t" },
            { text: "Second Radio", value: "U1v" },
            { text: "Third Radio", value: "W3x" },
          ],
        },
        { type: "text", text: "Some text here" },
        { type: "text", text: "Another text" },
        { type: "text", text: "And one more!" },
        { type: "textarea", text: "Whatever", key: "gT9" },
      ],
    },
    {
      elements: [
        { type: "text", text: "This section has only one element, and the one below it is empty" },
      ],
    },
    { elements: [] },
    {
      elements: [
        { type: "text", text: "Another heterogeneous section" },
        { type: "text", text: "Default radio behavior" },
        {
          type: "radio",
          key: "rK5",
          options: [
            { text: "Rishon", value: "Y9z" },
            { text: "Sheni", value: "B4c" },
            { text: "Shlishi", value: "D6e" },
          ],
        },
        {
          type: "text",
          text: "allowUnselect: true (You can unselect the active radio by clicking on it)",
        },
        {
          type: "radio",
          key: "uV7",
          allowUnselect: true,
          options: [
            { text: "Rishon", value: "H5j" },
            { text: "Sheni", value: "K7m" },
            { text: "Shlishi", value: "M8n" },
          ],
        },
        { type: "textarea", text: "400px-high", key: "sN0", height: 400 },
        { type: "text", text: "Checkbox group can have allowMultiple: false" },
        {
          type: "checkboxes",
          key: "wC1",
          allowMultiple: false,
          options: [
            { text: "One", value: "R1s" },
            { text: "Two", value: "T9u" },
            { text: "Three", value: "V2w" },
          ],
        },
        { type: "text", text: "The text can even be placed at the end of the section." },
      ],
    },
  ],
};

const submittedData = ref<string | null>(null);
const submittedDataString = computed(() => submittedData.value ?? "(No data submitted yet)");

function handleSubmit(encodedString: string) {
  submittedData.value = encodedString;
  console.log("Form submitted:", encodedString);
}

// Hebrew form schema with fixed keys
const formSchemaHebrew: FormSchema = {
  meta: {
    title: "טופס מורכב (עברית)",
    description: "טופס רב-חלקי הכולל מגוון שדות, כולל תמיכה בכתיבה מימין לשמאל.",
    labels: [
      {
        label: "נוצר על ידי",
        type: "hyperlink",
        inscription: "מקסים בורטניקוב",
        link: "https://maxim-bortnikov.netlify.app/",
        openIn: "newTab",
      },
      {
        label: "פורטי מהמקור",
        type: "hyperlink",
        inscription: "Blueberry Loom",
        link: "https://blueberry-loom.netlify.app/",
        openIn: "newTab",
      },
    ],
  },
  sections: [
    {
      elements: [
        { type: "text", text: "סעיף פשוט" },
        { type: "input", text: "אימייל", key: "hR7" },
        { type: "input", text: "מספר טלפון", key: "kZ4" },
      ],
    },
    {
      elements: [
        { type: "text", text: "דוגמת תיבות סימון" },
        { type: "text", text: "בחר עד 3 פריטים:" },
        {
          type: "checkboxes",
          key: "bY2",
          allowMultiple: true,
          maxSelected: 3,
          options: [
            { text: "נוקסט", value: "A9b" },
            { text: "ויו.js", value: "E8f" },
            { text: "נמר UI", value: "C5d" },
            { text: "פרפלקסיטי", value: "G2h" },
          ],
        },
      ],
    },
    {
      elements: [
        { type: "text", text: "סעיף הטרוגני" },
        {
          type: "checkboxes",
          key: "nF7",
          allowMultiple: true,
          options: [
            { text: "תיבת סימון ראשונה", value: "J3k" },
            { text: "תיבת סימון שנייה", value: "L1m" },
            { text: "תיבת סימון שלישית", value: "N5p" },
            { text: "תיבת סימון רביעית", value: "Q8r" },
          ],
        },
        {
          type: "radio",
          key: "zV3",
          options: [
            { text: "אפשרות ראשונה", value: "S2t" },
            { text: "אפשרות שנייה", value: "U9v" },
            { text: "אפשרות שלישית", value: "W0x" },
          ],
        },
        { type: "text", text: "כמה טקסט כאן" },
        { type: "text", text: "עוד טקסט" },
        { type: "text", text: "ועוד אחד!" },
        { type: "textarea", text: "כל מה שתרצה", key: "gM9" },
      ],
    },
    {
      elements: [
        { type: "text", text: "סעיף עם אלמנט יחיד, והתחתון ריק" },
      ],
    },
    { elements: [] },
    {
      elements: [
        { type: "text", text: "סעיף הטרוגני נוסף" },
        { type: "text", text: "התנהגות ברירת מחדל של רדיו" },
        {
          type: "radio",
          key: "rW6",
          options: [
            { text: "ראשון", value: "Y8z" },
            { text: "שני", value: "B7c" },
            { text: "שלישי", value: "D4e" },
          ],
        },
        {
          type: "text",
          text: "allowUnselect: true (אפשר לבטל את הבחירה ברדיו על ידי לחיצה)",
        },
        {
          type: "radio",
          key: "uV2",
          allowUnselect: true,
          options: [
            { text: "ראשון", value: "H1j" },
            { text: "שני", value: "K5m" },
            { text: "שלישי", value: "M3n" },
          ],
        },
        { type: "textarea", text: "גובה 400 פיקסלים", key: "sF0", height: 400 },
        { type: "text", text: "קבוצת תיבות סימון עם allowMultiple: false" },
        {
          type: "checkboxes",
          key: "wA3",
          allowMultiple: false,
          options: [
            { text: "אחד", value: "R2s" },
            { text: "שניים", value: "T0u" },
            { text: "שלושה", value: "V1w" },
          ],
        },
        { type: "text", text: "הטקסט יכול להיות גם בסוף הסעיף." },
      ],
    },
  ],
};

const submittedDataHebrew = ref<string | null>(null);
const submittedDataHebrewString = computed(() => submittedDataHebrew.value ?? "(אין נתונים שנשלחו עדיין)");

function handleSubmitHebrew(encodedString: string) {
  submittedDataHebrew.value = encodedString;
  console.log("Hebrew form submitted:", encodedString);
}
</script>

<style scoped>
.section-divider {
  margin: 3rem 0;
  border-color: #555;
}

.submitted-title {
  color: #eee;
  margin: 0 0 1rem 0;
  font-weight: 600;
  font-size: 1.25rem;
}

.submitted-data-pre {
  background: #222;
  color: #eee;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-break: break-all;
  font-size: 0.875rem;
  white-space: pre-wrap;
  user-select: text;
  margin: 0 0 2rem 0;
  font-family: monospace, monospace;
  line-height: 1.3;
}

.hebrew-form-container {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  border: 1.5px solid #ccc;
  max-width: 800px;
  margin: 0 auto 3rem auto;
}

.hebrew-submitted-title {
  color: #111;
  margin: 2rem 0 1rem 0;
  font-weight: 600;
  direction: rtl;
  text-align: right;
  font-size: 1.3rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.submitted-data-pre.hebrew-pre {
  background: #f9fafb;
  color: #111;
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-break: break-all;
  font-size: 0.875rem;
  white-space: pre-wrap;
  user-select: text;
  margin: 0 0 2rem 0;
  font-family: monospace, monospace;
  line-height: 1.3;
}
</style>
