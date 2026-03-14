const axios = require('axios');

const baseURL = 'http://172.27.185.122:3000';

async function runTests() {
  try {
    // POST a workout
    const postRes = await axios.post(`${baseURL}/workouts`, {
      name: "Squats",
      duration: 20
    });
    console.log("Created:", postRes.data);

    const id = postRes.data._id;

    // GET by ID
    const getRes = await axios.get(`${baseURL}/workouts/${id}`);
    console.log("Fetched:", getRes.data);

    // PATCH
    const patchRes = await axios.patch(`${baseURL}/workouts/${id}`, { duration: 25 });
    console.log("Updated:", patchRes.data);

    // DELETE
   /* const deleteRes = await axios.delete(`${baseURL}/workouts/${id}`);
    console.log("Deleted:", deleteRes.data); */

    // GET all
    const allRes = await axios.get(`${baseURL}/workouts`);
    console.log("All workouts:", allRes.data);

  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}

runTests();