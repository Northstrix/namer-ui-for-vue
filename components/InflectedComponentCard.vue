<template>
  <a
    :href="url"
    class="inflected-card-link"
    @mouseenter="handleMouseEnter('card')"
    @mouseleave="handleMouseLeave('card')"
    @click.prevent="handleClickOutsideButton"
    tabindex="0"
    @keydown.enter.prevent="handleClickOutsideButton"
  >
    <div
      class="inflected-card"
      :style="{
        '--card-rounding': cardRounding + 'px',
        maxWidth: maxWidth,
        transform: mirrored ? 'scaleX(-1)' : undefined,
        '--tag-brightness': computedTagBrightness
      }"
      role="button"
      aria-label="Interactive card"
    >
      <div class="inflected-cardInner" :style="{ '--parent-bg': parentBackgroundColor }">
        <div class="inflected-box">
          <div
            class="inflected-imgBox"
            :style="{
              borderRadius: cardRounding + 'px',
              overflow: 'hidden',
              width: '100%',
              position: 'relative',
              aspectRatio: imageContainerAspectRatio,
              transform: mirrored ? 'scaleX(-1)' : undefined
            }"
            @mouseenter="handleMouseEnter('image')"
            @mouseleave="handleMouseLeave('image')"
            @click.stop="handleClick('image')"
            ref="imageContainer"
          >
            <!-- Show image if showImage is true -->
            <img
              v-if="showImage"
              :src="image"
              :alt="title"
              draggable="false"
              class="inflected-image"
              :style="{ transform: isImageHovered ? `scale(${imageHoverZoom})` : 'scale(1)' }"
            />
            
            <!-- Live demo slot magnified same as image -->
            <div
              v-else
              class="live-demo-container"
              :style="{ transform: isImageHovered ? `scale(${imageHoverZoom})` : 'scale(1)' }"
            >
              <slot name="live-demo" />
            </div>

            <div
              v-if="price"
              class="inflected-priceTag"
              :style="priceTagStyle"
              @mouseenter="handleMouseEnter('priceTag')"
              @mouseleave="handleMouseLeave('priceTag')"
              @click.stop="handleClick('priceTag')"
            >
              <template v-if="oldPriceOnTheRight">
                <span class="inflected-new-price">{{ price }}</span>
                <span
                  v-if="oldPrice"
                  class="inflected-old-price"
                  :style="{ color: oldPriceTextColor, marginLeft: oldNewPriceGap + 'px' }"
                >
                  {{ oldPrice }}
                </span>
              </template>
              <template v-else>
                <span
                  v-if="oldPrice"
                  class="inflected-old-price"
                  :style="{ color: oldPriceTextColor, marginRight: oldNewPriceGap + 'px' }"
                >
                  {{ oldPrice }}
                </span>
                <span class="inflected-new-price">{{ price }}</span>
              </template>
            </div>
          </div>

          <div
            class="inflected-icon"
            @mouseenter="handleMouseEnter('button')"
            @mouseleave="handleMouseLeave('button')"
          >
            <a
              :href="url"
              target="_blank"
              rel="noopener noreferrer"
              class="inflected-iconBox"
              :style="buttonBoxStyle"
              @click.stop.prevent="handleClick('button')"
            >
              <component
                :is="buttonIcon"
                :size="buttonIconSize"
                :color="isButtonHovered ? buttonIconHoverColor : buttonIconColor"
              />
            </a>
          </div>
        </div>
      </div>

      <div
        class="inflected-content"
        :style="{ transform: mirrored ? 'scaleX(-1)' : undefined }"
      >
        <h3
          :style="titleStyle"
          @mouseenter="handleMouseEnter('title')"
          @mouseleave="handleMouseLeave('title')"
          @click.stop="handleClick('title')"
        >
          {{ title }}
        </h3>
        <p
          :style="descriptionStyle"
          @mouseenter="handleMouseEnter('description')"
          @mouseleave="handleMouseLeave('description')"
          @click.stop="handleClick('description')"
        >
          {{ description }}
        </p>
        <ul
          class="tag-list"
          :style="{ margin: margins.tags, justifyContent: tagsAlignment, direction: mirrored ? 'rtl' : 'ltr' }"
        >
          <li
            v-for="(tag, index) in tags"
            :key="index"
            class="tag-item"
            :style="tagStyle(index, tag)"
            @mouseenter="onTagMouseEnter(index, tag)"
            @mouseleave="onTagMouseLeave(index, tag)"
            @click.stop="handleClick('tag', tag)"
          >
            {{ tag.name }}
          </li>
        </ul>
      </div>
    </div>
  </a>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  tags: { type: Array, required: true, default: () => [] },
  parentBackgroundColor: { type: String, required: true },
  url: { type: String, default: null },
  onClick: Function,
  onHover: Function,
  cardRounding: { type: Number, default: 20 },
  fontSizes: { type: Object, default: () => ({}) },
  margins: { type: Object, default: () => ({}) },
  buttonIcon: { type: Object, required: true },
  buttonIconSize: { type: Number, default: 24 },
  buttonIconColor: { type: String, default: '#fff' },
  buttonIconHoverColor: { type: String, default: '#fff' },
  buttonBackgroundColor: { type: String, default: '#282828' },
  buttonBackgroundHoverColor: { type: String, default: '#484848' },
  imageHoverZoom: { type: Number, default: 1.1 },
  titleColor: { type: String, default: '#f7f7ff' },
  descriptionColor: { type: String, default: '#c7c7cf' },
  mirrored: { type: Boolean, default: false },
  titleAlignment: { type: String, default: 'left' },
  descriptionAlignment: { type: String, default: 'left' },
  tagsAlignment: { type: String, default: 'left' },
  maxWidth: { type: String, default: '100%' },
  price: String,
  priceTagTextColor: { type: String, default: '#ffffff' },
  oldPrice: String,
  oldPriceOnTheRight: { type: Boolean, default: false },
  oldPriceTextColor: { type: String, default: '#c1c1c7' },
  priceTagRounding: { type: String, default: '5px' },
  priceTagBackgroundColor: { type: String, default: 'rgba(0,0,0,0.7)' },
  oldNewPriceGap: { type: Number, default: 8 },
  titleLineClamp: Number,
  descriptionLineClamp: Number,
  tagHoverBrightness: { type: Number, default: 0.8 },
  imageContainerAspectRatio: { type: String, default: '16 / 10' },
  showImage: { type: Boolean, default: true }
})

const hoveredElement = ref(null)
const isButtonHovered = ref(false)
const isImageHovered = ref(false)
const hoveredTag = ref(null)
const mouseleaveTimeout = ref(null)
const imageContainer = ref(null)

function isSameHover(partA, extraA, partB, extraB) {
  if (partA !== partB) return false
  if (extraA === extraB) return true
  if (!extraA || !extraB) return false
  return extraA === extraB
}

function handleMouseEnter(part, extra = null) {
  if (hoveredElement.value && isSameHover(hoveredElement.value.part, hoveredElement.value.extra, part, extra))
    return
  if (mouseleaveTimeout.value) {
    clearTimeout(mouseleaveTimeout.value)
    mouseleaveTimeout.value = null
  }
  if (hoveredElement.value && props.onHover) props.onHover({ ...hoveredElement.value, isHovered: false }, props.id)
  hoveredElement.value = { part, extra }
  if (props.onHover) props.onHover({ part, extra, isHovered: true }, props.id)
  isButtonHovered.value = part === 'button'
  isImageHovered.value = part === 'image'
  hoveredTag.value = part === 'tag' ? extra : null
}

function handleMouseLeave(part, extra = null) {
  if (hoveredElement.value && isSameHover(hoveredElement.value.part, hoveredElement.value.extra, part, extra)) {
    if (part === 'priceTag') {
      mouseleaveTimeout.value = setTimeout(() => {
        if (imageContainer.value) {
          const isHoveredNow = imageContainer.value.matches(':hover')
          if (isHoveredNow) {
            handleMouseEnter('image')
            mouseleaveTimeout.value = null
            return
          }
        }
        if (props.onHover) props.onHover({ part, extra, isHovered: false }, props.id)
        hoveredElement.value = null
        isButtonHovered.value = false
        isImageHovered.value = false
        hoveredTag.value = null
        mouseleaveTimeout.value = null
      }, 16)
    } else {
      if (props.onHover) props.onHover({ part, extra, isHovered: false }, props.id)
      hoveredElement.value = null
      isButtonHovered.value = false
      isImageHovered.value = false
      hoveredTag.value = null
    }
  }
}

function handleClick(part, extra = null) {
  if (props.onClick) props.onClick({ part, extra }, props.id)
}

function handleClickOutsideButton(event) {
  if (props.onClick) props.onClick({ part: 'card', extra: null }, props.id)
}

function onTagMouseEnter(index, tag) {
  handleMouseEnter('tag', tag)
}

function onTagMouseLeave(index, tag) {
  handleMouseLeave('tag', tag)
}

function isRTLCheck(text) {
  return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text)
}

const computedTagBrightness = computed(() => {
  let val = props.tagHoverBrightness
  if (val < 0.1) val = 0.1
  else if (val > 1.9) val = 1.9
  return `brightness(${val.toFixed(2)})`
})

const priceTagStyle = computed(() => ({
  position: 'absolute',
  top: '12px',
  [props.mirrored ? 'right' : 'left']: '12px',
  backgroundColor: props.priceTagBackgroundColor,
  color: props.priceTagTextColor,
  padding: '9px 15px',
  borderRadius: props.priceTagRounding,
  fontSize: props.fontSizes.price || '1rem',
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none'
}))

const buttonBoxStyle = computed(() => ({
  '--button-bg': props.buttonBackgroundColor,
  '--button-hover-bg': props.buttonBackgroundHoverColor,
  '--icon-color': isButtonHovered.value ? props.buttonIconHoverColor : props.buttonIconColor,
  '--icon-hover-color': props.buttonIconHoverColor,
  '--icon-size': props.buttonIconSize + 'px',
  backgroundColor: isButtonHovered.value ? props.buttonBackgroundHoverColor : props.buttonBackgroundColor,
  borderRadius: '50%',
  position: 'absolute',
  inset: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'all 0.3s ease',
  cursor: 'pointer'
}))

const titleStyle = computed(() => {
  const base = {
    fontSize: props.fontSizes.title,
    color: props.titleColor,
    margin: props.margins.title,
    fontWeight: 'bold',
    direction: isRTLCheck(props.title) ? 'rtl' : 'ltr',
    textAlign: props.titleAlignment
  }
  if (typeof props.titleLineClamp === 'number' && props.titleLineClamp > 0) {
    return {
      ...base,
      display: '-webkit-box',
      WebkitLineClamp: props.titleLineClamp,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }
  return base
})

const descriptionStyle = computed(() => {
  const base = {
    fontSize: props.fontSizes.description,
    color: props.descriptionColor,
    margin: props.margins.description,
    direction: isRTLCheck(props.description) ? 'rtl' : 'ltr',
    textAlign: props.descriptionAlignment
  }
  if (typeof props.descriptionLineClamp === 'number' && props.descriptionLineClamp > 0) {
    return {
      ...base,
      display: '-webkit-box',
      WebkitLineClamp: props.descriptionLineClamp,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }
  return base
})

function tagStyle(index, tag) {
  return {
    backgroundColor: tag.backgroundColor,
    color: tag.textColor,
    borderRadius: tag.rounding ? tag.rounding + 'px' : '0',
    fontSize: props.fontSizes.tags,
    textAlign: tag.alignment || 'left',
    direction: isRTLCheck(tag.name) ? 'rtl' : 'ltr',
    cursor: 'default' // no filter here since CSS handles hover brightness with variable
  }
}
</script>

<style scoped>
.inflected-card-link {
  display: block;
  text-decoration: none;
  cursor: pointer;
  color: inherit;
  position: relative;
  outline: none;
}
.inflected-card-link:focus-visible {
  outline: 2px solid #ffd145;
  outline-offset: 2px;
}
.inflected-card {
  position: relative;
  border-radius: var(--card-rounding);
  overflow: hidden;
  transition: all 0.3s ease;
  /* cursor handled outside via link */
}
.inflected-cardInner {
  position: relative;
  width: 100%;
  background: var(--parent-bg);
  border-radius: var(--card-rounding);
  border-bottom-right-radius: 0;
  overflow: hidden;
}
.inflected-box {
  width: 100%;
  height: 100%;
  overflow: visible;
  position: relative;
}
.inflected-imgBox {
  width: 100%;
  overflow: hidden;
  border-radius: var(--card-rounding);
  position: relative;
  cursor: pointer;
  /* aspect-ratio set inline from prop */
}
.inflected-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
  will-change: transform;
  user-select: none;
}
.live-demo-container {
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.3s ease;
  will-change: transform;
  user-select: none;
  pointer-events: auto;
}
.inflected-icon {
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 96px;
  height: 96px;
  background: var(--parent-bg);
  border-top-left-radius: 50%;
  transition: all 0.3s ease;
}
.inflected-icon::before,
.inflected-icon::after {
  position: absolute;
  content: '';
  background: transparent;
  width: 20px;
  height: 20px;
  border-bottom-right-radius: 20px;
  box-shadow: 5px 5px 0 5px var(--parent-bg);
}
.inflected-icon::before {
  bottom: 6px;
  left: -20px;
}
.inflected-icon::after {
  top: -20px;
  right: 6px;
}
.inflected-iconBox {
  position: absolute;
  inset: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
  background-color: var(--button-bg);
}
.inflected-iconBox:hover {
  background: var(--button-hover-bg);
  transform: scale(1.1);
}
.inflected-priceTag {
  user-select: none;
}
.inflected-new-price {
  font-weight: bold;
}
.inflected-old-price {
  text-decoration: line-through;
  opacity: 0.7;
  font-weight: bold;
}
.inflected-content {
  padding: 15px 10px;
}
.inflected-content h3,
.inflected-content p {
  transition: color 0.3s ease;
}
.tag-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.tag-item {
  font-weight: 700;
  padding: 6px 10px;
  cursor: default;
  transition: filter 0.3s ease;
  filter: brightness(1);
}
.tag-item:hover {
  filter: var(--tag-brightness, brightness(0.8));
}
</style>
