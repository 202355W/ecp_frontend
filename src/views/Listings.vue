<template>
    <h1>Listings</h1>
    <div class="ion-padding container">
    </div>
    <input type="text" v-model="input" placeholder="Job title, company, keyword.." />
    <!-- <div class="item job" v-for="job in filteredList()" :key="job">
        <p>{{ job }}</p>
    </div> -->
    <div class="item error" v-if="input && !filteredList().length">
        <p>No results found!</p>
    </div>
    
    <div class="filters">
        <h5>Filters</h5>
    </div>
    <button class="show-example-btn" aria-label="Set a job alert"
        onclick="setJobAlert()">
        Set a job alert
    </button>
    <!-- <button v-on:click="displaySimplePopup">Click Me</button> -->
    <div class="cards">
        <div>
            <img src="src/assets/empty.jpg" alt="empty" style="width:100%;">
            <h2>Sales Assistance</h2>
            <p>M Bookshop Ptd Ltd</p>
            <p>Pay: $15/hour </p>
        </div>
        <div>
            <img src="src/assets/empty.jpg" alt="empty" style="width:100%;">
            <h2>Cashier</h2>
            <p>M Bookshop Ptd Ltd</p>
            <p>Pay: $15/hour </p>
        </div>
        <div>
            <img src="src/assets/empty.jpg" alt="empty" style="width:100%;">
            <h2>Cleaner</h2>
            <p>M Bookshop Ptd Ltd</p>
            <p>Pay: $15/hour</p>
        </div>
    </div>
</template> 

<script lang="ts" setup>
import Swal from 'sweetalert2'
import { ref } from "vue";
let input = ref("");
const job = ["sales assistance", "cashier", "cleaner"];
function filteredList() {
    return job.filter((job) =>
        job.toLowerCase().includes(input.value.toLowerCase())
    );
}

// to confirm an alert is set
Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'An alert has been set!',
    showConfirmButton: false,
    timer: 1500
})

function setJobAlert() {
    
}


</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: "Montserrat", sans-serif;
}

body {
    padding: 20px;
    min-height: 100vh;
    background-color: rgb(234, 242, 255);
}

input {
    display: block;
    width: 350px;
    margin: 20px auto;
    padding: 10px 45px;
    background: black url("src/assets/search.jpg") no-repeat 15px center;
    background-size: 15px 15px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    /* box-shadow: white 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px; */
}

.item {
    width: 350px;
    padding: 10px 20px;
    margin-top: 10px;
    color: white;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
        rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
}

.job {
    background-color: rgb(97, 62, 252);
    cursor: pointer;
}

.error {
    background-color: tomato;
}

.cards {
    display: flex;
    align-items: center;
}

.cards > div {
    background-color: lightgrey;
        width: 300px;
        height: 350px;
        padding: 50px;
        margin: 20px;
        border-radius: 10px;
        color: black;
}

/* .cards.scroll {
    overflow: auto;
} */

.show-example-btn {
    padding: 0.9em 2.1875em;
    border: 0;
    border-radius: 0.1875em;
    background-color: #7066e0;
    box-shadow: none;
    color: #fff;
    font-size: 1.125em;
    font-weight: 500;
    white-space: nowrap;
}

.show-example-btn:hover {
    background-color: #6459dd;
}

.show-example-btn:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(115, 103, 240, 0.5);
}

.show-example-btn::-moz-focus-inner {
    border: 0;
}

.show-example-btn:active {
    background-color: #483cd7;
}
</style>