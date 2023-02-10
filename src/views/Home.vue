<script lang="ts">
export default {
  data() {
  	return {
	    suc: true
  	}
	},
}
</script>
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
import { routerKey } from 'vue-router';
import { useMainStore } from '../stores/main.store'

const mainStore = useMainStore()
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .alert {
  padding: 20px;
  background-color: rgb(74,199,98);
  color: white;
  width:50%;
  margin: auto;
}

.closebtn {
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
}

.closebtn:hover {
  color: black;
}
</style>