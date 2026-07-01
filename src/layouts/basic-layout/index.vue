<script setup lang="ts">
import Header from '../components/header/index.vue'
import SiderMenu from '../components/sider-menu/index.vue'
import { useLayoutProvider } from './context'
import { proLayoutProps } from './typing'

const props = defineProps(proLayoutProps)
const emit = defineEmits(['update:collapsed'])

function handleCollapsed(collapsed: boolean) {
  emit('update:collapsed', collapsed)
  props?.onCollapsed?.(collapsed)
}

useLayoutProvider(props, {
  handleCollapsed,
})
</script>

<template>
  <div class="ant-pro-basicLayout">
    <a-layout>
      <SiderMenu />
      <a-layout>
        <Header>
          <template v-if="$slots.headerActions" #headerActions>
            <slot name="headerActions" />
          </template>
        </Header>
        <slot name="contentPrefix" />
        <a-layout-content class="ant-pro-basicLayout-content" flex flex-col>
          <div h-full flex flex-col flex-1 w-full>
            <slot />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<style lang="less">
@import './index.less';
</style>
