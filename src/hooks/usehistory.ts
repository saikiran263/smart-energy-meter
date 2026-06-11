import { useEffect, useState } from "react";
import { ref,onValue } from "firebase/database";
import { db } from "../firebase";

export function useHistory(){

const [hourly,setHourly]=useState([]);
const [daily,setDaily]=useState([]);

useEffect(()=>{

const hourlyRef=ref(db,"history/hourly");
const dailyRef=ref(db,"history/daily");

onValue(hourlyRef,(snap)=>{
 if(snap.exists()){
   setHourly(snap.val());
 }
});

onValue(dailyRef,(snap)=>{
 if(snap.exists()){
   setDaily(snap.val());
 }
});

},[]);

return {hourly,daily};

}