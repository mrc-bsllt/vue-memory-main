import Vue from 'vue';
const axios = require('axios').default;

var app = new Vue(
  {
    el: "#app",
    data: {
      // mostro/nascondo il terreno di gioco
      startGame: true,
      fieldWidth: 40,
      cardsDivider: 5,
      numberCardsToChoose: 10,

      // carte
      totalCards: [
        {
          class: "fas fa-cat",
        },
        {
          class: "fas fa-crow",
        },
        {
          class: "fas fa-dog",
        },
        {
          class: "fas fa-hippo",
        },
        {
          class: "fas fa-bicycle",
        },
        {
          class: "fas fa-car-side",
        },
        {
          class: "fas fa-helicopter",
        },
        {
          class: "fas fa-rocket",
        },
        {
          class: "fas fa-gift",
        },
        {
          class: "fas fa-tshirt",
        },
        {
          class: "fas fa-dizzy",
        },
        {
          class: "fas fa-angry",
        },
        {
          class: "fas fa-grimace",
        },
        {
          class: "fas fa-grin-tears",
        },
        {
          class: "fas fa-grin-tongue-squint",
        },
        {
          class: "fas fa-surprise",
        },
        {
          class: "fas fa-anchor",
        },
        {
          class: "fas fa-ice-cream",
        },
        {
          class: "fas fa-lemon",
        },
        {
          class: "fas fa-fish",
        },
      ],
      chosenCards: [],
      playingCards: [],

    }, //fine data
    methods: {

      flipCard: function(index) {
        this.playingCards[index].active = true;
        this.$forceUpdate();
      }, //fine funzione

    randomNumber: function(min, max) {
      return Math.floor(Math.random()*(max - min + 1) + min);
    }, //fine funzione

    chooseCards: function () {
      const self = this;

      while(self.chosenCards.length < self.numberCardsToChoose) {

        let number = self.randomNumber(0, self.totalCards.length-1);
        const element = self.totalCards[number];

        if(!self.chosenCards.includes(element)) {
          element.active = false;
          element.availability = 2;
          self.chosenCards.push(element);
        }
      };
    } //fine funzione

  }, //fine methods

    mounted: function() {

      this.chooseCards();
      const self = this;

      while(self.playingCards.length < self.numberCardsToChoose*2) {

        let number = this.randomNumber(0, self.numberCardsToChoose-1);
        let element = self.chosenCards[number];

        if(element.availability != 0) {

          self.playingCards.push(element);
          element.availability--;
        }
      };
    } //fine mounted

  }); //fine istanza vue
