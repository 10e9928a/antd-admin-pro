<script setup lang="ts">
import { useLayoutState } from '../../basic-layout/context'
import SubMenu from './sub-menu.vue'

const { collapsed, menuData, selectedKeys, openKeys, handleOpenKeys, handleSelectedKeys } = useLayoutState()

// a-menu 事件回调的 key 类型为 string | number，这里统一转为 string
const onOpenKeys = (keys: (string | number)[]) => handleOpenKeys(keys.map(String))
const onSelectedKeys = (keys: (string | number)[]) => handleSelectedKeys(keys.map(String))
</script>

<template>
  <a-menu
    theme="dark"
    mode="inline"
    :open-keys="openKeys"
    :collapsed="collapsed"
    :selected-keys="selectedKeys"
    class="ant-pro-sider-menu"
    @update:open-keys="onOpenKeys"
    @update:selected-keys="onSelectedKeys"
  >
    <template v-for="item in menuData" :key="item.path">
      <template v-if="!item.hideInMenu">
        <SubMenu :item="item" />
      </template>
    </template>
  </a-menu>
</template>
