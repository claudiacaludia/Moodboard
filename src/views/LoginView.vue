<script setup>
import {ref} from "vue";
import {useLogin} from "@/useLogin.js";
import { useRouter } from 'vue-router'

const router = useRouter();
const {login} = useLogin();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

async function handleLogin() {
  errorMessage.value = '';

  if (!email.value || !password.value) {
    errorMessage.value = 'Please enter valid email and password.';
    return;
  }
  try {
    await login(email.value, password.value);
    await router.push('/home');
  }catch {
    errorMessage.value = 'Login failed. Please check your access data.';
  }

}
</script>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-stone-100 px-4 background">

      <h1 class="text-4xl font-bold leading-tight my-4 text-center">
        Welcome back to <span class="text-blue-950"><br>MoodCloud</span>.
      </h1>
      <div class="bg-white backdrop-blur-sm border border-[#EADDC8]/20 text-black shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 class="text-2xl font-semibold mb-6">Log in</h2>

        <label class="block mb-4">
          <span class="text-sm mb-1 block">Email</span>
          <input v-model="email" type="email" placeholder="you@example.com"
                 class="input input-bordered w-full  text-blue-950 border-[#EADDC8]/40 placeholder:text-stone-500" />
        </label>

        <label class="block mb-6">
          <span class="text-sm mb-1 block">Password</span>
          <input v-model="password" type="password" placeholder="••••••••"
                 class="input input-bordered w-full  text-blue-950 border-[#EADDC8]/40 placeholder:text-stone-500" />
        </label>
        <p v-if="errorMessage" class="text-red-600 mb-4 text-sm">{{ errorMessage }}</p>
        <button class="btn w-full btn-primary hover:bg-blue-950" @click="handleLogin">
          Log In
        </button>
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
