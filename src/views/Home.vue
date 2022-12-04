<template>
  <h1>Home</h1>
    <div class="ion-padding container">
    </div>
</template>

<script lang="ts" setup>
import {
  IonButton,
  IonChip,
  IonIcon
} from '@ionic/vue'
import { useMainStore } from '../stores/main.store'

const mainStore = useMainStore()
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>