<template>
  <ion-header>
    <ion-toolbar>
      <ion-title slot="start"><a href="/"><img src="../assets/ezlogo.jpg" width="200"/></a></ion-title>
      <ion-buttons slot="secondary"><ion-button><a href="/addjob">Create</a></ion-button></ion-buttons>
    </ion-toolbar>
  </ion-header>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/vue'

</script>