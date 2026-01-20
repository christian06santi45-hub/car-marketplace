const BASE="https://vpic.nhtsa.dot.gov/api";

export async function getMakes(){
  const r=await fetch(`${BASE}/vehicles/getallmakes?format=json`);
  const j=await r.json();
  return j.Results.map(m=>m.Make_Name).sort();
}

export async function getModelsForMakeYear(make,year){
  const r=await fetch(`${BASE}/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`);
  const j=await r.json();
  return j.Results.map(m=>m.Model_Name).sort();
}