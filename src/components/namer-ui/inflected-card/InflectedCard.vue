<template>
  <div
    class="inflected-card"
    :style="{
      '--card-rounding': cardRounding + 'px',
      maxWidth,
      ...(mirrored ? { transform: 'scaleX(-1)' } : {}),
    }"
    @click="handleCardClick"
  >
    <div
      class="card-inner"
      :style="{ '--parent-bg': parentBackgroundColor }"
    >
      <div class="box">
        <div
          class="img-box"
          :style="{
            '--image-hover-zoom': imageHoverZoom,
            ...(mirrored ? { transform: 'scaleX(-1)' } : {}),
          }"
        >
          <img
            :src="image"
            :alt="title"
            :class="{ hovered: isCardHovered }"
            @mouseenter="isCardHovered = true"
            @mouseleave="isCardHovered = false"
          />
          <div
            v-if="price"
            class="price-tag"
            :style="priceTagStyle"
            @click.stop="() => onClick && onClick('priceTag', id)"
          >
            <template v-if="oldPriceOnTheRight">
              <span class="new-price" style="font-weight: bold;">{{ price }}</span>
              <span
                v-if="oldPrice"
                class="old-price"
                :style="{ marginLeft: '8px', textDecoration: 'line-through', opacity: 0.7, fontWeight: 'bold', color: oldPriceTextColor }"
              >{{ oldPrice }}</span>
            </template>
            <template v-else>
              <span
                v-if="oldPrice"
                class="old-price"
                :style="{ marginRight: '8px', textDecoration: 'line-through', opacity: 0.7, fontWeight: 'bold', color: oldPriceTextColor }"
              >{{ oldPrice }}</span>
              <span class="new-price" style="font-weight: bold;">{{ price }}</span>
            </template>
          </div>
        </div>
        <div
          class="icon"
        >
          <button
            class="icon-box"
            :style="{
              '--button-bg': buttonBackgroundColor,
              '--button-hover-bg': buttonBackgroundHoverColor,
              '--icon-color': buttonIconColor,
              '--icon-hover-color': buttonIconHoverColor,
              '--icon-size': buttonIconSize + 'px',
            }"
            type="button"
            @click.stop="() => onClick && onClick('button', id)"
            @mouseenter="isButtonHovered = true"
            @mouseleave="isButtonHovered = false"
          >
            <component
              :is="buttonIcon"
              :size="buttonIconSize"
              :color="isButtonHovered ? buttonIconHoverColor : buttonIconColor"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="content">
      <h3
        :style="{
          fontSize: fontSizes.title,
          color: titleColor,
          margin: margins.title,
          fontWeight: 'bold',
          direction: isRTL(title) ? 'rtl' : 'ltr',
          textAlign: titleAlignment,
          ...(mirrored ? { transform: 'scaleX(-1)' } : {}),
        }"
      >{{ title }}</h3>
      <p
        :style="{
          fontSize: fontSizes.description,
          color: descriptionColor,
          margin: margins.description,
          direction: isRTL(description) ? 'rtl' : 'ltr',
          textAlign: descriptionAlignment,
          ...(mirrored ? { transform: 'scaleX(-1)' } : {}),
        }"
      >{{ description }}</p>
      <ul
        :style="{
          margin: margins.tags,
          display: 'flex',
          justifyContent: tagsAlignment,
          flexWrap: 'wrap',
          gap: '0.625rem',
          ...(mirrored ? { transform: 'scaleX(-1)' } : {}),
        }"
      >
        <li
          v-for="(tag, i) in tags"
          :key="i"
          :style="{
            '--tag-bg': tag.backgroundColor,
            '--tag-color': tag.textColor,
            '--tag-rounding': (tag.rounding ?? 5) + 'px',
            fontSize: fontSizes.tags,
            direction: isRTL(tag.name) ? 'rtl' : 'ltr',
            textAlign: tag.alignment || 'left',
            display: 'inline-block',
          }"
        >{{ tag.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'

interface Tag {
  name: string
  textColor: string
  backgroundColor: string
  rounding?: number
  alignment?: 'left' | 'center' | 'right'
}

const props = defineProps<{
  id: string
  image: string
  title: string
  description: string
  tags: Tag[]
  parentBackgroundColor: string
  onClick?: (hoverTarget: string, id: string) => void
  cardRounding?: number
  fontSizes?: {
    title?: string
    description?: string
    tags?: string
    price?: string
  }
  margins?: {
    title?: string
    description?: string
    tags?: string
  }
  buttonIcon: any // Vue component
  buttonIconSize?: number
  buttonIconColor?: string
  buttonIconHoverColor?: string
  buttonBackgroundColor?: string
  buttonBackgroundHoverColor?: string
  imageHoverZoom?: number
  titleColor?: string
  descriptionColor?: string
  mirrored?: boolean
  titleAlignment?: 'left' | 'center' | 'right'
  descriptionAlignment?: 'left' | 'center' | 'right'
  tagsAlignment?: 'left' | 'center' | 'right'
  maxWidth?: string
  price?: string
  priceTagTextColor?: string
  oldPrice?: string
  oldPriceOnTheRight?: boolean
  oldPriceTextColor?: string
  priceTagRounding?: string
  priceTagBackgroundColor?: string
}>()

const {
  id,
  image,
  title,
  description,
  tags,
  parentBackgroundColor,
  onClick,
  cardRounding = 20,
  fontSizes = {},
  margins = {},
  buttonIcon,
  buttonIconSize = 24,
  buttonIconColor = '#fff',
  buttonIconHoverColor = '#fff',
  buttonBackgroundColor = '#282828',
  buttonBackgroundHoverColor = '#484848',
  imageHoverZoom = 1.1,
  titleColor = '#f7f7ff',
  descriptionColor = '#c7c7cf',
  mirrored = false,
  titleAlignment = 'left',
  descriptionAlignment = 'left',
  tagsAlignment = 'left',
  maxWidth = '100%',
  price,
  priceTagTextColor = '#ffffff',
  oldPrice,
  oldPriceOnTheRight = false,
  oldPriceTextColor = '#c1c1c7',
  priceTagRounding = '5px',
  priceTagBackgroundColor = 'rgba(0,0,0,0.7)',
} = props

const isButtonHovered = ref(false)
const isCardHovered = ref(false)

function isRTL(text: string): boolean {
  return /[\u0590-\u05FF\u0600-\u06FF\u0700-\u074F]/.test(text)
}
const priceTagStyle = computed(() => ({
  position: 'absolute',
  top: '12px',
  [mirrored ? 'right' : 'left']: '12px',
  backgroundColor: priceTagBackgroundColor,
  color: priceTagTextColor,
  padding: '9px 15px',
  borderRadius: priceTagRounding,
  fontSize: fontSizes.price || '1rem',
}))

function handleCardClick() {
  onClick && onClick('card', id)
}
</script>

<style src="./InflectedCard.css"></style>
