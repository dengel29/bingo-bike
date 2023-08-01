<script setup>
// import { ref, watch } from 'vue'

defineProps({
  msg: {
    type: String,
    required: true
  }
})
const email = ""



const handleSendMagicLink = (event) => {
  const formData = getFormDataFromEvent(event)
  console.log(formData)
  return "not too bed"
}

const getFormDataFromEvent = (event) => {
  const formData = new FormData(event.target)
  return Object.fromEntries(formData);
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Enter your email for a magic link
      <form @submit.prevent="handleSendMagicLink" method="post" >
        <input :model="email" type="email" name="email" id="email-input">
        
        <input type="submit">
      </form>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
