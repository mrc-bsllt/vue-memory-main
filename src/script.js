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
      isFirstChoice: false,
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
        const card = this.playingCards[index];



        if(!this.isFirstChoice && !card.active) {
          let firstElement = card;
          this.isFirstChoice = true;
          card.active = true;
          //firstElement = card;
          console.log(`firstElement ${firstElement.class}`);

        } else if(!card.active) {
          let secondElement;
          this.isFirstChoice = false;
          card.active = true;
          //secondElement = card;
          console.log(`secondElement ${secondElement.class}`);
          //this.checkScore();
          if(firstElement.class === secondElement.class) {
            score++;
          } else {
            // firstElement.active = false;
            // secondElement.active = false;
            console.log("non sono uguali");
          }
        }

        this.$forceUpdate();
      }, //fine funzione

      // checkScore: function(first, second) {
      //   if([first].class === [second].class) {
      //     this.score++;
      //   } else {
      //     [first].active = false;
      //     [second].active = false;
      //   }
      // },

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
          active: false
        };

        self.playingCards.push(newElement);
        element.availability--;
      }
    };
  } //fine mounted

  }); //fine istanza vue
