<script setup>
import {ref} from "vue";
import {useLogin} from "@/useLogin.js";
import { useRouter } from 'vue-router'

const router = useRouter();
const {login} = useLogin();

const email = ref('');
const password = ref('');

async function handleLogin() {
  await login(email.value, password.value);
  await router.push('/home');
}
</script>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center bg-stone-100 px-4 background">

      <h1 class="text-4xl font-bold leading-tight my-4 text-center">
        Welcome back to <span class="text-blue-950">MoodCloud</span>.
      </h1>
<!--      <img src="../../src/assets/img/loginImage.jpeg" class="w-9/12 h-full object-cover" />-->
      <!-- RIGHT: Login Form -->
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

        <button class="btn w-full btn-primary hover:bg-blue-950" @click="handleLogin">
          Log In
        </button>
      </div>
  </section>
</template>

<style scoped>
.background {
  background-image: url('/src/assets/img/clouds2.png');
  background-color: rgba(174, 162, 149, 0.3); /* leichter, beiger Overlay */
  background-blend-mode: lighten;
  background-size: contain;
  background-repeat: repeat;
  min-height: 100vh;
}
</style>
