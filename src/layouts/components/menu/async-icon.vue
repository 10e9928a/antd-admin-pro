<script setup lang="ts">
import type { VNodeChild } from 'vue'
import * as icons from '@ant-design/icons-vue'
import { isFunction } from '@v-c/utils'

const props = defineProps<{
  icon: string | ((...args: any[]) => VNodeChild)
}>()
const Comp = computed(() => {
  if (isFunction(props.icon))
    return props.icon() || null
  return (icons as any)[props.icon]
})
</script>

<template>
  <component :is="Comp" v-if="icon" />
</template>
