<script setup>
import { ref } from 'vue'
import { useLogin } from '@/useLogin.js'
import { useRouter } from 'vue-router'

const {register} = useLogin();
const router = useRouter();

const email = ref('');
const name = ref('');
const password = ref('');
const passwordRepeat = ref('');
const errorMessage = ref('');

async function handleRegister() {
  errorMessage.value = '';

  if (!email.value || !password.value || !name.value) {
    errorMessage.value = 'Please enter valid email, name and password.';
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Please enter a valid email address.';
    return;
  }
  if(password.value.length < 8) {
    errorMessage.value = 'Passwords must be at least 8 characters';
    return;
  }
  if (password.value !== passwordRepeat.value) {
    errorMessage.value = 'Passwords must match';
    return;
  }
  try {
    await register(email.value, name.value, password.value, passwordRepeat.value);
    await router.push({ path: '/', query: { registered: 'true' } });
  }catch {
    errorMessage.value = 'Registration failed';
  }
}

function login() {
  router.push('/');
}
</script>


<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-stone-100 px-4 background">

    <h1 class="text-4xl font-bold leading-tight my-4 text-center">
      Let's get started
    </h1>
    <div class="bg-white backdrop-blur-sm border border-[#EADDC8]/20 text-black shadow-xl rounded-2xl p-8 w-full max-w-md">
      <h2 class="text-2xl font-semibold mb-6">Register</h2>

      <label class="block mb-4">
        <span class="text-sm mb-1 block">Email</span>
        <input v-model="email" type="email" placeholder="you@gmail.com"
               class="input input-bordered w-full  text-blue-950 border-[#EADDC8]/40 placeholder:text-stone-500" />
      </label>
      <label class="block mb-4">
        <span class="text-sm mb-1 block">Name</span>
        <input v-model="name" type="text" placeholder="Jane Doe"
               class="input input-bordered w-full  text-blue-950 border-[#EADDC8]/40 placeholder:text-stone-500" />
      </label>

      <label class="block mb-6">
        <span class="text-sm mb-1 block">Password</span>
        <input v-model="password" type="password" placeholder="••••••••"
               class="input input-bordered w-full  text-blue-950 border-[#EADDC8]/40 placeholder:text-stone-500" />
      </label>
      <label class="block mb-6">
        <span class="text-sm mb-1 block">Password repeat</span>
        <input v-model="passwordRepeat" type="password" placeholder="••••••••"
               class="input input-bordered w-full  text-blue-950 border-[#EADDC8]/40 placeholder:text-stone-500" />
      </label>
      <p v-if="errorMessage" class="text-red-600 mb-4 text-sm">{{ errorMessage }}</p>
      <button class="btn w-full btn-primary hover:bg-blue-950" @click="handleRegister">
        Register
      </button>
      <div class="divider">OR</div>
      <div class="btn btn-primary btn-outline grid place-items-center" @click="login">Login</div>
    </div>
  </section>
</template>


<style scoped>
.background {
  background-image: url('/src/assets/img/clouds2.png');
  background-color: rgba(174, 162, 149, 0.3);
  background-blend-mode: lighten;
  background-size: contain;
  background-repeat: repeat;
  min-height: 100vh;
}
</style>
