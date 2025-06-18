<script setup>
import { useBoards } from '@/useBoards.js'
import ElementItems from '@/components/ElementItems.vue'
import { useLogin } from '@/useLogin.js'
import { ref } from 'vue'
import Modal from '@/components/Modal.vue'

const {currentBoard, elements, createElement} = useBoards();
const {currentUser} = useLogin();

const xPos = ref('');
const yPos = ref('');
const height = ref('');
const width = ref('');
const elementType = ref('');
const elementText = ref('');
const elementColor = ref('');
const elementSong = ref('');
const newImageInput = ref(null);
const imageUrl = ref('');
let image = '';
function handleAddNewElement() {
  if(!xPos.value || !yPos.value || !elementType.value) {
    alert('xPos, yPos and Element Type must be filled in!');
    return
  }
  if(newImageInput.value) {
    image = newImageInput.value?.files[0] ?? null
  }

  if (elementType.value === 'image' && (!height.value || (!image && !imageUrl.value))) {
    alert('Image und height are mandatory for type=image')
    return
  }
  if (elementType.value === 'song'&& (!elementSong.value)) {
    alert('URL is mandatory for type=song');
    return;
  }
  if (elementType.value === 'color' && (!elementColor.value || !height.value || !width.value)) {
    alert('Color, height and width are mendatory for type=color');
    return;
  }
  if (elementType.value === 'text' && (!elementText.value)) {
      alert('Text is mandatory for type=text');
      return;
    }
  console.log("Color:",elementColor.value);

  createElement(xPos.value, yPos.value, height.value, width.value, elementType.value,
    elementText.value, elementColor.value, elementSong.value,  image, imageUrl.value);
    xPos.value = '';
    yPos.value = '';
    elementType.value = '';
    height.value = '';
    width.value = '';
    elementText.value = '';
    elementColor.value = '';
    elementSong.value = '';
    newImageInput.value = '';
    imageUrl .value = '';

}
</script>

<template>
  <div v-if="!currentBoard" class="bg-stone-100">
    <p>Wähle ein Board aus</p>
  </div>
  <div v-if="currentBoard" class="w-full bg-stone-100">
    <div class="flex justify-center align-middle items-center flex-col">
      <h1 class="text-center text-4xl pt-10 pb-2">{{ currentBoard.title }}</h1>
      <Modal btnClass="btn btn-secondary rounded-full w-12 h-12 text-2xl" btnText="+">
        <div class="flex flex-col gap-5">
          <h2 class="text-lg font-bold">Create new element</h2>

          <label class="w-full input">
            <span class="label">x Position</span>
            <input v-model="xPos" type="text" placeholder="240" class=" input-sm w-full" />
          </label>
          <label class="w-full input">
            <span class="label">y Position</span>
            <input v-model="yPos" type="text" placeholder="240" class=" input-sm w-full" />
          </label>
          <label class="w-full input">
            <span class="label">Type</span>
            <input
              v-model="elementType"
              type="text"
              placeholder="image, song, text, color"
              class=" input-sm w-full"
            />
          </label>

          <!-- Height -->
          <label v-if="elementType === 'image' || elementType === 'color'" class="w-full input">
            <span class="label">Height</span>
            <input v-model="height" type="text" placeholder="100" class="" />
            <span class="label">px</span>
          </label>

          <!-- Width -->
          <label v-if="elementType === 'color'" class="w-full input">
            <span class="label">Width</span>
            <input v-model="width" type="text" placeholder="100" class="" />
            <span class="label">px</span>
          </label>

          <!-- Song URL -->
          <label v-if="elementType === 'song'" class="w-full input">
            <span class="label">Song URL</span>
            <input
              v-model="elementSong"
              type="text"
              placeholder="https://open.spotify.com/embed/track/..."
              class=" input-sm w-full"
            />
          </label>

          <!-- Image URL -->
          <label v-if="elementType === 'image'" class="w-full input">
            <span class="label">Image URL</span>
            <input
              v-model="imageUrl"
              type="text"
              placeholder="https://image.com/image.jpg"
              class=" input-sm w-full"
            />
          </label>

          <div v-if="elementType === 'image'" class="divider">OR</div>

          <!-- Image -->
          <label v-if="elementType === 'image'" class="w-full floating-label">
            <span>Image Upload</span>
            <input
              ref="newImageInput"
              type="file"
              class="file-input file-input-sm w-full"
            />
          </label>


          <!-- Color -->
          <label v-if="elementType === 'color'" class="w-full input">
            <span class="label">Color Code</span>
            <input
              v-model="elementColor"
              type="color"
              placeholder="#FF0000"
              class=" input-sm w-full"
            />
          </label>
          <label v-if="elementType === 'text'" class="w-full input">
            <span class="label">Content</span>
            <input
              v-model="elementText"
              type="text"
              placeholder="Text"
              class=" input-sm w-full"
            />
          </label>

          <button class="btn btn-secondary" @click="handleAddNewElement">Create Element</button>
        </div>
      </Modal>
    </div>
    <div v-if="elements" class="w-full h-screen">
      <!--  relative-->
      <ElementItems
        v-for="element in elements"
        :key="element.id"
        :currentUserId="currentUser?.id ?? ''"
        :element="element"
      ></ElementItems>
    </div>
    <p v-if="!elements">Wo sind die Elemente</p>
  </div>
</template>

<style scoped></style>
