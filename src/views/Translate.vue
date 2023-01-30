<template>
  <h1>Translation</h1>
    <div class="ion-padding content">
      <ion-item>
        <ion-label class="title">Translate Your Job Listing</ion-label>
      </ion-item>
      <ion-grid>
        <ion-row>
          <ion-col size-md="7" size-sm="12" class="upload">
            <input type="file" id="file" class="upload-input">
            <ion-item-group>
              <ion-icon class="upload-icon" name="add"></ion-icon>
            </ion-item-group>
            <ion-label class="upload-text">Drop your photo here or click here to upload</ion-label>
          </ion-col>

          <ion-col size-md="5" size-sm="12" class="select">
            <ion-label>Input Language:</ion-label>
            <ion-select interface="popover" placeholder="please choose" size="small">
              <ion-select-option value="englisg">English</ion-select-option>
              <ion-select-option value="china">Chinese</ion-select-option>
            </ion-select>

            <ion-label class="select-checkbox-text">Output Language:</ion-label>
            <ion-select interface="popover" placeholder="please choose">
              <ion-select-option value="englisg">English</ion-select-option>
              <ion-select-option value="china">Chinese</ion-select-option>            </ion-select>
            <ion-button color="dark" expand="block">Translate</ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
      
    </div>
</template>

<script lang="ts" setup>

</script>

<style>
.content {
  max-width: 800px;
  margin: 0 auto;
}
.title {
  font-size: 30px !important;
  font-weight: bold;
  text-align: center;
}
.upload {
  border: 1px solid rgba(0, 0, 0, 0.13);
  padding: 60px 140px;
  text-align: center;
  position: relative;
}
.upload-icon {
  font-size: 60px;
}
.upload-text {
  font-size: 20px;
}
.select {
  padding: 40px 10px;
}
.select-checkbox-text {
  vertical-align: top;
  margin-left: 4px;
}
ion-select {
  border: 1px solid rgba(0, 0, 0, 0.13);
  margin: 8px 0;
  padding: 5px 6px;
  border-radius: 4px;
}
.upload-input {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  opacity: 0;
}
</style>