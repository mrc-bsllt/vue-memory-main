import Vue from 'vue';
const axios = require('axios').default;

var app = new Vue(
  {
    el: "#app",
    data: {
      startGame: true,
      flip: false,
    },
    methods: {
      flipCard: function() {
        this.flip = true;
      }
    },
    mounted: function() {

    }
  }
);
