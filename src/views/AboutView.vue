<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script setup>
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

function request(url, options) {
  // get cookie
  const csrfToken = getCookie('XSRF-TOKEN');
  console.log('token', csrfToken);
  return fetch(url, {
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json',
      'X-XSRF-TOKEN': decodeURIComponent(csrfToken),
    },
    credentials: 'include',
    ...options,
  })
}
/*
function logout() {
  return request('http://localhost:8000/logout', {
    method: 'POST'
  });
}

function login() {
  return request('http://localhost:8000/login', {
    method: "POST",
    body: JSON.stringify({
      email: 'hakmi5508@gmail.com',
      'password': '67044055'
    })
  })
}*/
(async () => {
  const res = await request('http://localhost:8000/api/user');
  const data = await res.json();
  console.log(data);
})();
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
