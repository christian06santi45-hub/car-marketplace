import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export function carsCol(uid) { return collection(db, "users", uid, "cars") }

export async function addCar(uid, car) { return addDoc(carsCol(uid), car) }
export async function getCars(uid) {
    const snap = await getDocs(carsCol(uid));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
export async function deleteCar(uid, id) { return deleteDoc(doc(db, "users", uid, "cars", id)) }
export async function updateCar(uid, id, data) { return updateDoc(doc(db, "users", uid, "cars", id), data) }