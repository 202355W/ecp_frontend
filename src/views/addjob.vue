<template>
<div id="app">
<div class="container" style="width:800px; margin:0 auto;">
  <!--UPLOAD-->
  <h1 class="header">Digitalize your job listing</h1>
  <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
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
    <p>
      <a href="javascript:void(0)" @click="reset()">Upload again</a>
    </p>
    <ul class="list-unstyled">
      <li v-for="item in uploadedFiles">
        <img :src="item.url" style="max-width:400px;" id="uploaded" class="img-responsive img-thumbnail" :alt="item.originalName">
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
      <input class="block" type="submit" value="Digitalize" @click="filesUpload()">
  </div>
  <!--FAILED-->
  <div v-if="isFailed">
    <h2 class="header">Uploaded failed.</h2>
    <p>
      <a href="javascript:void(0)" @click="reset()">Try again</a>
    </p>
    <pre>{{ uploadError }}</pre>
  </div>
</div>
</div>
</template>

<script>
import { IonItem, IonList, IonSelect, IonSelectOption, toastController, IonRow, IonCol, IonButton, IonGrid } from '@ionic/vue';
import { defineComponent } from 'vue';
import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { upload } from './file-upload.fake.service'; 
import { wait } from './utils';

const fileReader = new FileReader();
const configS3 = {
    version: 'latest',
    region: "us-east-1",
     credentials: {
         accessKeyId: "AKIAW3U4AFVOADK5Y7F4",
         secretAccessKey: "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"
     }
};
const s3Client = new S3Client( configS3 );
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

function loadXHR(url) {
return new Promise(function(resolve, reject) {
  try {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onerror = function() {
      reject("Network error.")
    };
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(xhr.response)
      } else {
        reject("Loading error:" + xhr.statusText)
      }
    };
    xhr.send();
  } catch (err) {
    reject(err.message)
  }
});
}

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
    async filesUpload(){
      const src = this.uploadedFiles[0]
      loadXHR(src.url).then(async function(blob) {
          const uploaded_image = fileReader.result;
          const uploadParams = {
            Bucket: "digitalize-textract-output-2",
            Key: src.originalName,
            Body: blob
          };
          const command = new PutObjectCommand(uploadParams)
      const result = await s3Client.send(command)
      console.log("Success.", result);
      window.location.href = '/reviewjob';
      });
  },

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
        });

      // save it
      this.save(formData);
    }
  },
  mounted() {
    this.reset();
  }
}

</script>

<style lang="scss">
.center{
  margin-left: auto;
  margin-right: auto;
}
.options{
  color:black;
  padding:14px 28px;
}
.header{
  color:white;
  position:absolute; 
  left: 20px;
  top: -5px;
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
  top:100px;
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