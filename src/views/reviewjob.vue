<template>
    <h1>Review listing</h1>
      <div class="ion-padding content">
        <ion-item>
          <ion-label class="title">What we found</ion-label>
        </ion-item>
        <ion-grid>
          <ion-row>
            <ion-col size-md="7" size-sm="12" class="upload">
              <!-- <input type="file" id="file" class="upload-input"> -->
              <img src="../assets/test.png" width="500">
              <ion-item-group>
                <ion-icon class="upload-icon" name="add"></ion-icon>
              </ion-item-group>
            </ion-col>
  
            <ion-col size-md="5" size-sm="12" class="select">
              <ion-label><h1>Review and Update listing</h1></ion-label>
              <br>
              <ion-item>
                <ion-label>Job Title:</ion-label>
                <ion-input placeholder="Enter Job Title" value="Fun Housekeeping Location"></ion-input>
            </ion-item>
            <br>
            <ion-item>
                <ion-label>Company:</ion-label>
                <ion-input placeholder="Enter Company Name" value="DHM"></ion-input>
            </ion-item>
            <br>
            <ion-item>
                <ion-label>Commitment Months:</ion-label>
                <ion-input placeholder="Enter Commitment Months" value="3 months"></ion-input>
            </ion-item>
            <br>
            <ion-item>
                <ion-label>Location:</ion-label>
                <ion-input placeholder="Enter Location of job" value="Bukit Gombak, Bukit Batok, CCK, Bukit Panjang, Outram, Bishan, Hougang, Harbourfront MRT"></ion-input>
            </ion-item>
            <br>
            <ion-item>
                <ion-label>Rates:</ion-label>
                <ion-input placeholder="Enter Salary" value="$ 14 / hour - 4-5 Hour's a Day"></ion-input>
            </ion-item>
            <br>
            <ion-item>
                <ion-label>Type(PT/FT):</ion-label>
                <ion-input placeholder="Enter Type of job" value="Part Time"></ion-input>
            </ion-item>
            <br>
                <a href="/successjob">
                    <ion-button color="dark" expand="block">Confirm</ion-button>
                </a>    
                </ion-col>
          </ion-row>
        </ion-grid>
  
      </div>
  </template>
  
  <script lang="ts">
import { IonItem, IonList, IonSelect, IonSelectOption, toastController, IonRow, IonCol, IonButton, IonGrid } from '@ionic/vue';
import { defineComponent } from 'vue';


export default defineComponent({
    components: { IonItem, IonList, IonSelect, IonSelectOption, IonRow, IonCol, IonButton, IonGrid },
    methods:{
    }
})

</script>

  <style>
  </style>