<script setup>
import { ref } from 'vue';
// Importem el component pont que conté el <canvas> de Phaser
import PhaserCanvas from './components/PhaserCanvas.vue';

// Variable reactiva que guarda el nom escrit a la caixa de text
const nom = ref('Anna');
// Variable reactiva per triar el color de l'avatar (per defecte el verd #10b981)
const colorAvatar = ref('#10b981');
// Variable reactiva per a l'estat de l'avatar
const estat = ref('Disponible');
// Booleà per pausar o reprendre l'animació a Phaser
const pausat = ref(false);
// Booleà per muntar/desmuntar el joc i verificar onMounted / onUnmounted
const mostrarJoc = ref(true);

const commutarPausa = () => {
  pausat.value = !pausat.value;
};
</script>

<template>
  <main class="contenidor-app">
    <!-- Tota la interfície d'usuari (inputs, botons) es fa en HTML/CSS dins de Vue -->
    <div class="controls">
      <input v-model="nom" placeholder="Escriu el teu nom d'usuari..." />

      <!-- Selector de color per a l'avatar -->
      <label class="control-color">
        Color:
        <input type="color" v-model="colorAvatar" />
      </label>

      <!-- Desplegable amb els 3 estats -->
      <select v-model="estat">
        <option value="Disponible">Disponible</option>
        <option value="Ocupat">Ocupat</option>
        <option value="Absent">Absent</option>
      </select>

      <!-- Botó Pausa / Reprèn -->
      <button @click="commutarPausa">
        {{ pausat ? 'Reprèn' : 'Pausa' }}
      </button>

      <button @click="mostrarJoc = !mostrarJoc">
        {{ mostrarJoc ? 'Amaga el llenç' : 'Mostra el llenç' }}
      </button>
    </div>

    <!-- Passem props cap avall i controlem el cicle amb v-if -->
    <PhaserCanvas
      v-if="mostrarJoc"
      :nomUsuari="nom"
      :colorAvatar="colorAvatar"
      :estat="estat"
      :pausat="pausat"
    />
  </main>
</template>
