export function getRandomCityAndState(): [string, string] {
  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
  ];
  const cities = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
  ];

  const stateIndex = Math.floor(Math.random() * states.length);
  const cityIndex = Math.floor(Math.random() * cities.length);

  const state = states[stateIndex];
  const city = cities[cityIndex];

  return [state, city];
}

export function getRandomFullNameAndEmail(): [string, string] {
  const firstNames = [
    "Lautaro",
    "Julian",
    "Nicolas",
    "Joaquín",
    "Paulo",
    "Lionel",
  ];
  const lastNames = ["Alvarez", "Gonzalez", "Correa", "Dybala", "Messi"];
  const emailProviders = [
    "@gmail.com",
    "@yahoo.com",
    "@hotmail.com",
    "@outlook.com",
  ];

  const firstNameIndex = Math.floor(Math.random() * firstNames.length);
  const lastNameIndex = Math.floor(Math.random() * lastNames.length);
  const emailProviderIndex = Math.floor(Math.random() * emailProviders.length);

  const firstName = firstNames[firstNameIndex];
  const lastName = lastNames[lastNameIndex];
  const emailProvider = emailProviders[emailProviderIndex];

  const fullName = `${firstName} ${lastName}`;
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${emailProvider}`;

  return [fullName, email];
}