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
      maxScore: null,
      score: 0,
      comparatorArray: [],
      startActive: false,
      counter: null,
      minutes: null,
      decimalSeconds: 0,
      second: 0,


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

        // Cambio i parametri di gioco in base alla difficoltà scelta
        switch(self.options[index]) {
          case "Normal":
            self.fieldWidth = 40;
            self.cardsDivider = 5;
            self.numberCardsToChoose = 10;
            self.timeoutSeconds = 2000;
            self.minutes = 3;
            self.maxScore = 10;
            break;

          case "Hard":
            self.fieldWidth = 80;
            self.cardsDivider = 10;
            self.numberCardsToChoose = 20;
            self.timeoutSeconds = 5000;
            self.minutes = 5;
            self.maxScore = 20;
            break;
        }

        self.startActive = true; //Attivo l'animazione al click della modalità
        setTimeout(
          function() {
            self.startGame = true; //Mostro il terreno di gioco dopo un secodo dal click
            self.prepareField();
          }, 1000);

      }, //fine funzinoe

      flipCard: function(index) {
        const self = this;
        const element = self.playingCards[index]; //Carta cliccata

        // se la carta non risulta attiva la giro e la pusho nell'array di comparazione di coppia
        if(!element.active){

          element.active = true;
          self.comparatorArray.push(element.class);

        }

        // se l'array di comparazione coppia ha due elementi controllo se sono uguali
        if(self.comparatorArray.length == 2) {

          self.checkResult();

        }

        this.$forceUpdate();
      }, //fine funzione

      randomNumber: function(min, max) {
        return Math.floor(Math.random()*(max - min + 1) + min);
      }, //fine funzione

      // funzione per scegliere le carte da utilizzare nella partita corrente
      chooseCards: function () {
        const self = this;
        while(self.chosenCards.length < self.numberCardsToChoose) {

          let index = self.randomNumber(0, self.totalCards.length-1);
          const element = self.totalCards[index];

          if(!self.chosenCards.includes(element)) {
            element.availability = 2;
            self.chosenCards.push(element);
          }
        }
      }, //fine funzione

      //funzione che controlla se le due carte cliccato sono uguali
      checkResult: function() {
        const self = this;

        //se le carte sono uguali, aumento il punteggio di 1
        if(self.comparatorArray[0] == self.comparatorArray[1]) {
          self.score++;

          //se il giocatore non ha anora raggiunto il punteggio massimo, cambio il valore found delle carte a true, per lasciarle girate nel campo di gioco
          if(self.score != self.maxScore) {
            self.playingCards.forEach(
              (element) => {
                if(element.class == self.comparatorArray[0]) {
                  element.found = true;
                }
              }
            );
          } else { //se il giocatore raggiunge il punteggio massimo, ha vinto la partita
            self.activeFinal = true;
            self.message = "Hai vinto!";
          }

          self.comparatorArray = [];

        } else {
          //se le carte non sono uguali, si rigirano dopo 0.7 secondi
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

      //funzione attivabile al bottone Aiuto!, gira tutte le carte di faccia, dopo tot secondi le coppie di carte non trovare in precedenza, si rigirano di dorso
      flipAllCards: function () {
        //ciclo tutte le carte e le giro
        this.playingCards.forEach(
          (element) => {
            element.active = true;

            //dopo 2 secondi, rigiro tutte le carte di dorso, tranne quelle che sono già state trovate
            setTimeout(function() {
                if(!element.found) {
                  element.active = false;
                }
              }, 2000);
          }
        );


      } // fine funzione

    }, //fine methods

    mounted: function() {
    } //fine mounted

  }); //fine istanza vue
