import Vue from 'vue';
const axios = require('axios').default;

var app = new Vue(
  {
    el: "#app",
    data: {
      // mostro/nascondo il terreno di gioco
      startGame: true,

      // carte
      totalCards: [
        {
          class: "fas fa-cat",
          active: false,
        },
        {
          class: "fas fa-crow",
          active: false,
        },
        {
          class: "fas fa-dog",
          active: false,
        },
        {
          class: "fas fa-hippo",
          active: false,
        },
        {
          class: "fas fa-bicycle",
          active: false,
        },
        {
          class: "fas fa-car-side",
          active: false,
        },
        {
          class: "fas fa-helicopter",
          active: false,
        },
        {
          class: "fas fa-rocket",
          active: false,
        },
        {
          class: "fas fa-gift",
          active: false,
        },
        {
          class: "fas fa-tshirt",
          active: false,
        },
      ],
    },
    methods: {
      flipCard: function(index) {
        this.totalCards[index].active = true;
      }
    },
    mounted: function() {

    }
  }
);
