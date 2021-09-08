export function getPostList() {
  return fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .catch(console.log);
}

export function getPostByPostId(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then((res) => res.json())
    .catch(console.log);
}

export function getPostByUserId(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then((res) => res.json())
    .catch(console.log);
}

export function getCommentList(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then((res) => res.json())
    .catch(console.log);
}
