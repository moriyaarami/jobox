export default async function SetStorage(data){
const storage=window.localStorage;
storage.setItem("userData",JSON.stringify(data));

console.log("User data saved to local storage:", data);
}