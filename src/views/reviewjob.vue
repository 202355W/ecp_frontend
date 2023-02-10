<template>
    <h1>Review listing</h1>
      <div class="ion-padding content">
        <div id="error"></div>
        <ion-item>
          <ion-label class="title">What we found</ion-label>
        </ion-item>
        <ion-grid>
          <ion-row>
            <ion-col size-md="7" size-sm="12" class="upload">
              <img src="../assets/test.png" width="450">
            </ion-col>
  
            <ion-col size-md="5" size-sm="12" class="select">
              <ion-label color="medium"><h1>Review and Update listing</h1></ion-label>
              <br>
              <ion-item>
                <ion-label color="medium">Job Title:</ion-label>
                <ion-input placeholder="Enter Job Title" id="job" @click="onloadfunc()"></ion-input>
            </ion-item>
            <br>
            <ion-item>
                <ion-label color="medium">Company:</ion-label>
                <ion-input placeholder="Enter Company Name" value="" id="company"></ion-input>
            </ion-item>
            <br>
            <ion-item>
                <ion-label color="medium">Commitment Months:</ion-label>
                <ion-input placeholder="Enter Commitment Months" value="" id="commit"></ion-input>
            </ion-item>
            <br>
            <ion-item>
                <ion-label color="medium">Location:</ion-label>
                <ion-input placeholder="Enter Location of job" value="" id="location"></ion-input>
            </ion-item>
            <br>
            <ion-item>
                <ion-label color="medium">Rates:</ion-label>
                <ion-input placeholder="Enter Salary" value="" id="rates"></ion-input>
            </ion-item>
            <br>
            <ion-item>
                <ion-label color="medium">Type(PT/FT):</ion-label>
                <ion-input placeholder="Enter Type of job" value="" id="type"></ion-input>
            </ion-item>
            <br>
                    <ion-button color="dark" expand="block" id="btn" @click="updateDDB()">Confirm</ion-button>
                </ion-col>
          </ion-row>
        </ion-grid>
      </div>
  </template>
  
  <script lang="ts">
import { IonItem, IonList, IonSelect, IonSelectOption, toastController, IonRow, IonCol, IonButton, IonGrid } from '@ionic/vue';
import { defineComponent } from 'vue';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { ExecuteStatementCommand } from "@aws-sdk/client-dynamodb";
import * as AWS from "aws-sdk";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAW3U4AFVOADK5Y7F4",
  secretAccessKey: "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"
})
const configDynamoDB = {
    version: 'latest',
    region: "us-east-1",
     credentials: {
         accessKeyId: "AKIAW3U4AFVOADK5Y7F4",
         secretAccessKey: "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"
     }
};
const ddbClient = new DynamoDBClient( configDynamoDB );
const docClient = new AWS.DynamoDB.DocumentClient();

  export default {
  name: 'app',
  computed: {
  },
  methods: {
    async onloadfunc(){
      const params = {
        TableName: "listing"
      }
      const command = new ScanCommand(params);
      const data = await ddbClient.send(command);
      const lengthh = data["Items"].length;
      const Job = data["Items"][lengthh - 1]["Job"];
      const companyy = data["Items"][lengthh - 1]["Company"];
      const commitment = data["Items"][lengthh - 1]["CommitmentMonths"];
      const location = data["Items"][lengthh - 1]["Locations"];
      const rate = data["Items"][lengthh - 1]["Rates"];
      const types = data["Items"][lengthh - 1]["Types"];

      var jobb = document.getElementById("job");
      var company = document.getElementById("company");
      var commit = document.getElementById("commit");
      var locations = document.getElementById("location");
      var rates = document.getElementById("rates");
      var type = document.getElementById("type");

      jobb?.setAttribute("value", JSON.stringify(Job).split('"')[3]);
      company?.setAttribute("value",JSON.stringify(companyy).split('"')[3]);
      commit?.setAttribute("value",JSON.stringify(commitment).split('"')[3]);
      locations?.setAttribute("value",JSON.stringify(location).split('"')[3]);
      rates?.setAttribute("value",JSON.stringify(rate).split('"')[3]);
      type?.setAttribute("value",JSON.stringify(types).split('"')[3]);
  },
  async updateDDB(){
    if ((<HTMLInputElement>document.getElementById("job")).value != ""){
    var jobb = (<HTMLInputElement>document.getElementById("job")).value;
    var company = (<HTMLInputElement>document.getElementById("company")).value;
    var commit = (<HTMLInputElement>document.getElementById("commit")).value;
    var locations = (<HTMLInputElement>document.getElementById("location")).value;
    var rates = (<HTMLInputElement>document.getElementById("rates")).value;
    var type = (<HTMLInputElement>document.getElementById("type")).value;
    const params = {
      TableName: "listing",
      Key:{
        Job: jobb,
        Rates: rates
      },
        UpdateExpression: "set Company = :newCompany, CommitmentMonths = :newMonths, Locations = :newLoc, Types = :newType",
        ExpressionAttributeValues:{
          ":newCompany": company,
          ":newMonths": commit,
          ":newLoc": locations,
          ":newType": type
        }
    };
    try {
      const result = docClient.update(params).promise()
      console.log("Success.", result);
    } catch (err) {
      console.error(err);
      }
      window.location.href = '/successjob';
  } else {(<HTMLInputElement>document.getElementById("error")).innerHTML = "Empty field detected"}
}
}
}
</script>

  <style>
    #error{
      color:red;
      font-size:x-large;
      text-align: center;
    }
  </style>