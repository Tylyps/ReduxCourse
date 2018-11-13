const person = {
  name: 'Jakub',
  age: 21,
  location: {
    city: 'Białystok',
    temp: 10,
  }
};

const { name: firstName = 'Anonymous', age } = person;

console.log(`${firstName} is ${age}`);


const { city, temp: temperature } = person.location;

if(city && temperature) {
  console.log(`It's ${temperature} in ${city}.`);
}


const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penguin'
  }
};
// const { name: publisherName = 'Self-Published' } = book.publisher;
const { publisher: { name: publisherName = 'Self-Published' } } = book;

console.log(publisherName);
