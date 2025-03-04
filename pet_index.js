const fs = require('fs');
function readJSON(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}
function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}
function addPet(filePath, userId, pet) {
  const data = readJSON(filePath);
  const user = data.users.find(u => u.id === userId);

  if (user) {
    user.pets.push(pet);
    writeJSON(filePath, data);
    console.log(`Pet added to user ${user.name}`);
  } else {
    console.log('User not found');
  }
}
function updatePet(filePath, userId, petId, updatedPetData) {
  const data = readJSON(filePath);
  const user = data.users.find(u => u.id === userId);

  if (user) {
    const pet = user.pets.find(p => p.pet_id === petId);

    if (pet) {
      Object.assign(pet, updatedPetData);
      writeJSON(filePath, data);
      console.log(`Pet updated: ${pet.pet_name}`);
    } else {
      console.log('Pet not found');
    }
  } else {
    console.log('User not found');
  }
}
function displayUsersAndPets(filePath) {
  const data = readJSON(filePath);
  data.users.forEach(user => {
    console.log(`User: ${user.name} (${user.email})`);
    console.log('Pets:');
    user.pets.forEach(pet => {
      console.log(`  - ${pet.pet_name} (${pet.pet_type}), Age: ${pet.age}`);
    });
    console.log('--------------------');
  });
}
const filePath = 'users_pets.json';

// Display all users and their pets
displayUsersAndPets(filePath);

// Add a new pet to the first user
const newPet = {
  pet_id: 103,
  pet_name: "Oscar",
  pet_type: "Parrot",
  age: 2
};
addPet(filePath, 1, newPet);

// Update a pet's details (e.g., changing age)
updatePet(filePath, 1, 101, { age: 4 });

// Display updated users and pets
displayUsersAndPets(filePath);
