import Phaser from 'phaser';

export class MainScene extends Phaser.Scene {
  constructor() {
    // Registrem l'escena amb la clau 'MainScene' per recuperar-la des de Vue
    super('MainScene');
  }

  // 1. S'executa UN SOL COP en iniciar l'escena: creem els GameObjects
  create() {
    // Dibuixem un cercle verd al centre (x=320, y=200, radi=24px)
    this.avatar = this.add.circle(320, 200, 24, 0x10b981);

    // Afegim un text flotant damunt l'avatar i el centrem amb .setOrigin(0.5)
    this.etiqueta = this.add.text(320, 155, 'Anna', {
      fontSize: '18px', fontFamily: 'sans-serif', color: '#ffffff'
    }).setOrigin(0.5);

    // Text amb l'estat situat just sota el nom
    this.textEstat = this.add.text(320, 173, 'Disponible', {
      fontSize: '13px', fontFamily: 'sans-serif', color: '#cbd5e1'
    }).setOrigin(0.5);
  }

  // 2. Bucle continu a 60 FPS: s'executa 60 vegades per segon
  update(time) {
    // Fem oscil·lar l'avatar amunt i avall per verificar que el Game Loop batega
    this.avatar.y = 200 + Math.sin(time * 0.004) * 8;
    // Actualitzem la posició del nom i de l'estat perquè segueixin sempre l'avatar
    this.etiqueta.setPosition(this.avatar.x, this.avatar.y - 55);
    this.textEstat.setPosition(this.avatar.x, this.avatar.y - 35);
  }

  actualitzarNom(nouNom) {
    this.etiqueta.setText(nouNom || 'Anònim');
  }

  actualitzarEstat(nouEstat) {
    this.textEstat?.setText(nouEstat || 'Disponible');
  }

  canviarColor(hexColor) {
    // Si és una cadena hexadecimal d'HTML (ex: '#10b981'), la convertim a enter (0x10b981) per a Phaser
    const color = typeof hexColor === 'string' && hexColor.startsWith('#')
      ? parseInt(hexColor.replace('#', '0x'), 16)
      : hexColor;
    this.avatar?.setFillStyle(color);
  }
}
