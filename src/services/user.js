export function getUserList() {
  return fetch('http://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .catch(console.log);
}

