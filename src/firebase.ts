import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
 apiKey: "AIzaSyDVy_vvKO7u9zMTFXKtmYEI-Ox72cf4AhY",
 authDomain: "smart-energy-meter-d3b8e.firebaseapp.com",
 databaseURL:"https://smart-energy-meter-d3b8e-default-rtdb.firebaseio.com",
 projectId:"smart-energy-meter-d3b8e",
 storageBucket:"smart-energy-meter-d3b8e.firebasestorage.app",
 messagingSenderId:"333350333438",
 appId:"1:333350333438:web:c029d9215fd62f74876eaf"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);