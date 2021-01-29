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
      score: 0,
      comparatorArray: [],
      //secondChoice: false,

      // carte
      totalCards: [
        {
          class: "fa-cat",
        },
        {
          class: "fa-crow",
        },
        {
          class: "fa-dog",
        },
        {
          class: "fa-hippo",
        },
        {
          class: "fa-bicycle",
        },
        {
          class: "fa-car-side",
        },
        {
          class: "fa-helicopter",
        },
        {
          class: "fa-rocket",
        },
        {
          class: "fa-gift",
        },
        {
          class: "fa-tshirt",
        },
        {
          class: "fa-dizzy",
        },
        {
          class: "fa-angry",
        },
        {
          class: "fa-grimace",
        },
        {
          class: "fa-grin-tears",
        },
        {
          class: "fa-grin-tongue-squint",
        },
        {
          class: "fa-surprise",
        },
        {
          class: "fa-anchor",
        },
        {
          class: "fa-ice-cream",
        },
        {
          class: "fa-lemon",
        },
        {
          class: "fa-fish",
        },
      ],
      chosenCards: [],
      playingCards: [],

    }, //fine data
    methods: {

      flipCard: function(index) {
        const self = this;
        const element = self.playingCards[index];

        if(!element.active){

          element.active = true;
          self.comparatorArray.push(element.class);

        }

        if(self.comparatorArray.length == 2) {

          self.checkResult();

        }

        this.$forceUpdate();
      }, //fine funzione

    randomNumber: function(min, max) {
      return Math.floor(Math.random()*(max - min + 1) + min);
    }, //fine funzione

    chooseCards: function () {
      const self = this;
      while(self.chosenCards.length < self.numberCardsToChoose) {

        let index = self.randomNumber(0, self.totalCards.length-1);
        const element = self.totalCards[index];

        if(!self.chosenCards.includes(element)) {
          element.availability = 2;
          self.chosenCards.push(element);
          //console.log(element);
        }
      }
    }, //fine funzione

    checkResult: function() {
      const self = this;

      if(self.comparatorArray[0] == self.comparatorArray[1]) {
        self.score++;

        self.playingCards.forEach(
          (element) => {
            if(element.class == self.comparatorArray[0]) {

              element.found = true;
              console.log(self.playingCards);
            }
          }
        );

        self.comparatorArray = [];

      } else {

        setTimeout(function() {
          self.playingCards.forEach(
            (element) => {
              if(!element.found) {
                element.active = false;
              }
            }
          );
          self.comparatorArray = [];
        }, 500)

      }
    } //fine funzione

  }, //fine methods

  mounted: function() {
    const self = this;


    self.chooseCards();

    while(self.playingCards.length < self.numberCardsToChoose*2) {

      let index = this.randomNumber(0, self.numberCardsToChoose-1);
      let element = self.chosenCards[index];


      if(element.availability != 0) {

        const newElement = {
          class: element.class,
          active: false,
          found: false
        };

        self.playingCards.push(newElement);
        element.availability--;
      }
    };
  } //fine mounted

  }); //fine istanza vue
