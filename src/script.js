import Vue from 'vue';
const axios = require('axios').default;

var app = new Vue(
  {
    el: "#app",
    data: {
      
      // mostro/nascondo il terreno di gioco
      options: ["Normal", "Hard"],
      startGame: false,
      fieldWidth: null,
      cardsDivider: null,
      numberCardsToChoose: null,
      timeoutSeconds: null,
      score: 0,
      comparatorArray: [],
      startActive: false,
      counter: null,
      minutes: 10,
      decimalSeconds: 0,
      second: 5,


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

      // schermata finale
      activeFinal: false,
      message: "",

    }, //fine data
    methods: {

      startGameFunction: function(index) {
        const self = this;

        switch(self.options[index]) {
          case "Normal":
            self.fieldWidth = 40;
            self.cardsDivider = 5;
            self.numberCardsToChoose = 10;
            self.timeoutSeconds = 2000;
            break;

          case "Hard":
            self.fieldWidth = 80;
            self.cardsDivider = 10;
            self.numberCardsToChoose = 20;
            self.timeoutSeconds = 5000;
            break;
        }

        self.startActive = true;
        setTimeout(
          function() {
            self.startGame = true;
            self.prepareField();
          }, 1000);

      }, //fine funzinoe

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
          }, 700)

        }
      }, //fine funzione

      prepareField: function() {
        const self = this;


        self.chooseCards();

        while(self.playingCards.length < self.numberCardsToChoose*2) {

          let index = this.randomNumber(0, self.numberCardsToChoose-1);
          let element = self.chosenCards[index];


          if(element.availability != 0) {

            const newElement = {
              class: element.class,
              active: true,
              found: false
            };

            self.playingCards.push(newElement);
            element.availability--;
          }
        };

        setTimeout(function() {
          self.playingCards.forEach(
            (element) => {

              element.active = false;

            }
          );

          self.counter = setInterval(self.timer, 1000);

        }, self.timeoutSeconds)
      }, //fine funzione

      timer: function() {

        let min = this.minutes;
        let dSec = this.decimalSeconds;
        let sec = this.second;

        if(sec == 0 && dSec == 0 && min != 0) {
          this.minutes--;
          this.decimalSeconds = 5;
          this.second = 9;
        } else if ((sec != 0 && dSec != 0) || (sec != 0 && dSec == 0)) {
          this.second--;
        } else if (sec == 0 && dSec != 0) {
          this.decimalSeconds--;
          this.second = 9;
        } else if (min == 0 && dSec == 0 && sec == 0) {
          clearInterval(this.counter);
          this.message = "Hai perso!";
          this.activeFinal = true;
        }
      },

    }, //fine methods

    mounted: function() {
    } //fine mounted

  }); //fine istanza vue
