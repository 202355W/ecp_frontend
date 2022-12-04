<template>
  <ion-app>
    <ion-page>
      <NavBar />
      <ion-content>
        <ion-router-outlet class="ion-padding"/>
      </ion-content>
    </ion-page> 
  </ion-app>
</template>

<script lang="ts" setup>
import { IonApp, IonRouterOutlet, IonContent, IonPage } from '@ionic/vue'
import NavBar from './components/NavBar.vue'
</script>