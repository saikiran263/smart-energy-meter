import { useEffect, useState } from "react";
import { ref,onValue } from "firebase/database";
import { db } from "../firebase";

export type MeterReading = {
 voltage:number;
 current:number;
 power:number;
 timestamp:number;
};

export function useLiveMeter() {

const [reading,setReading]=useState<MeterReading>({
 voltage:0,
 current:0,
 power:0,
 timestamp:0
});

useEffect(()=>{

const meterRef=ref(db,"meter");

const unsubscribe=onValue(
 meterRef,
(snapshot)=>{
 const data=snapshot.val();

 if(data){
   setReading({
    voltage:data.voltage || 0,
    current:data.current || 0,
    power:data.power || 0,
    timestamp:data.timestamp || Date.now()
   });
 }
});

return ()=>unsubscribe();

},[]);

return { reading };

}