<script setup>
// 1. Importem ref (referència al DOM) i els hooks del cicle de vida de Vue 3
import { ref, watch, onMounted, onUnmounted } from 'vue';
// 2. Importem el motor Phaser 4 i la nostra escena personalitzada
import Phaser from 'phaser';
import { MainScene } from '../game/MainScene';
const props = defineProps(['nomUsuari', 'colorAvatar', 'estat', 'pausat']);

const contenidor = ref(null); // Apuntarà al <div ref="contenidor"> de sota
let game = null;              // Guardem la instància per destruir-la en sortir

// S'executa un sol cop quan el <div> ja existeix a la pàgina
onMounted(() => {
  game = new Phaser.Game({
    type: Phaser.AUTO,          // Tria WebGL automàticament (o Canvas 2D)
    width: 640, height: 400,    // Mides del llenç en píxels
    backgroundColor: '#1e293b', // Fons fosc per distingir l'àrea del joc
    parent: contenidor.value,   // Injecta el <canvas> dins del nostre <div>
    scene: [MainScene]          // Escena inicial que arrencarà el motor
  });
  game.events.once('ready', () => {
    const escena = game?.scene.getScene('MainScene');
    escena?.actualitzarNom(props.nomUsuari);
    escena?.canviarColor(props.colorAvatar);
    escena?.actualitzarEstat(props.estat);
    if (props.pausat) {
      escena?.scene.pause();
    }
  })
});

// IMPRESCINDIBLE: quan s'amaga (v-if="false"), atura el bucle a 60 FPS
onUnmounted(() => game?.destroy(true));

// Primer watch: canvis en el nom d'usuari
watch(() => props.nomUsuari, (nouNom) => {
  const escena = game?.scene.getScene('MainScene');
  escena?.actualitzarNom(nouNom);
});

// Segon watch: canvis en el color de l'avatar
watch(() => props.colorAvatar, (nouColor) => {
  const escena = game?.scene.getScene('MainScene');
  escena?.canviarColor(nouColor);
});

// Tercer watch: canvis en l'estat
watch(() => props.estat, (nouEstat) => {
  const escena = game?.scene.getScene('MainScene');
  escena?.actualitzarEstat(nouEstat);
});

// Quart watch: pausa o reprèn l'escena de Phaser
watch(() => props.pausat, (estaPausat) => {
  const escena = game?.scene.getScene('MainScene');
  if (estaPausat) {
    escena?.scene.pause();
  } else {
    escena?.scene.resume();
  }
});
</script>
<template><div ref="contenidor"></div></template> <!-- Aquí s'injecta el <canvas> -->