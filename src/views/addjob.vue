<template>
    <NavBar />
<div id="app">
  <div class="container" style="width:800px; margin:0 auto;">
    <!--UPLOAD-->
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <h1 class="header">Digitalize your job listing</h1>
      <div class="dropbox">
        <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length;"
          accept="image/*" class="input-file">
          <p v-if="isInitial">
            Drag your file(s) here to begin<br> or click to browse
          </p>
          <p v-if="isSaving">
            Uploading {{ fileCount }} files...
          </p>
      </div>
    </form>
    <!--SUCCESS-->
    <div v-if="isSuccess">
      <h2 class="header">Digitalize your job listing</h2> 
      <p>
        <a href="javascript:void(0)" @click="reset()">Upload again</a>
      </p>
      <ul class="list-unstyled">
        <li v-for="item in uploadedFiles">
          <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
        </li>
      </ul>
      {{ res }}
      <div class="options" style="text-align:center">
        <table class="center">
          <tr>
            <th>
              <label for="inputLanuguages" style="color:white;">Input Language:</label>
            </th>
            <th>
              <select name="inputLanuguages" id="inputLanguages">
                <option value="english">English</option>
                <option value="mandarin">Mandarin</option>
              </select>
            </th>
          </tr>
          <tr>
            <th>
              <input type="checkbox" id="translateLanguageCB" style="margin: 10px 0px 0px 0px"><label id="translateLanguageCB" style="color:white;">Translate to:</label>
            </th>
            <th>
              <select name="translateLanguageCB" id="translateLanguageCB">
                <option value="english">English</option>
                <option value="mandarin">Mandarin</option>
              </select>
            </th>
          </tr>
      </table>
      </div>
      <input class="block" type="submit" value="Digitalize" @click="filesUpload($event.target.name, $event.target.files);">
    </div>
    <!--FAILED-->
    <div v-if="isFailed">
      <h2 class="header">Uploaded failed.</h2>
      <p>
        <a href="javascript:void(0)" @click="reset()">Try again</a>
      </p>
      <pre>{{ uploadError }}</pre>
    </div>
    <!--SUCESSs-->

  </div>
</div>
</template>

<script>
  import { IonApp, IonRouterOutlet, IonContent, IonPage } from '@ionic/vue'
  import * as axios from 'axios';
  import * as AWS from "@aws-sdk/client-textract";
  import * as AWScomp from "@aws-sdk/client-comprehend";
  import { upload } from './file-upload.fake.service'; 
  import { wait } from './utils';

  const textract = new AWS.Textract({ region: "us-east-1" });
  const client = new AWScomp.Comprehend({ region: "us-east-1" });
  const fileReader = new FileReader();
  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    name: 'app',
    data() {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos'
      }
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      },
    },
    methods: {

      reset() {
        // reset form to initial state
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      save(formData) {
        // upload data to the server
        this.currentStatus = STATUS_SAVING;

        upload(formData)
          .then(wait(1500)) // DEV ONLY: wait for 1.5s 
          .then(x => {
            this.uploadedFiles = [].concat(x);
            this.currentStatus = STATUS_SUCCESS;
          })
          .catch(err => {
            this.uploadError = err.response;
            this.currentStatus = STATUS_FAILED;
          });
      },
      filesChange(fieldName, fileList) {
        // handle file changes
        const formData = new FormData();

        if (!fileList.length) return;

        // append the files to FormData
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            formData.append(fieldName, fileList[x], fileList[x].name);
            let buff = fileReader.readAsDataURL(fileList[x]);
            let res = textract.detectDocumentText({Document:{Bytes: buff}});
            console.log(res);
          });

        // save it
        this.save(formData);
      }
    },
    mounted() {
      this.reset();
    },
    filesUpload(){

    }
  }

</script>

<style lang="scss">
  .center{
    margin-left: auto;
    margin-right: auto;
  }
  .options{
    padding:14px 28px;
  }
  .header{
    color:white;
  }
  .block {
  display: block;
  width: 100%;
  border: none;
  background-color: #04AA6D;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  }
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 50px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }
  
  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position:absolute;
    cursor: pointer;
  }
  
  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }
  
  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>