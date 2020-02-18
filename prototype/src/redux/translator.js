import React, { Component } from 'react'

const LOCALE = 'fr'

export var translate = function(input){
  const dict = getDictionary(LOCALE)
  if(input in dict) {
    return dict[input]
  }
  // default to returning what you were passed
  return input
}

function getDictionary(lang) {
  if(lang === 'fr') return fr
  if(lang === 'en') return en
}

const fr = {
  //pre
  'Karel can pick stones':<span>Karel peut <span style={{color:'blue'}}>ramasser des pierres</span></span>,
  'Karel can place stones':<span>Karel peut <span style={{color:'blue'}}>placer des pierres</span></span>,
  'Karel can perform many commands':'Karel peut exécuter de nombreuses commandes',
  "Next":"Prochain",
  "Run":"Exécuter",
  "World":"Monde",
  "Goal":"Objectif",
  "move":"advancer",
  "turnLeft":"tournez à gauche",
  "pickStone":"ramasser la pierre",
  "placeStone":"placer la pierre",
  "You can program Karel":<span>Tu peux <span className="blue">programmer</span> Karel</span>,
  "RunInstructions": "Appuyez sur le bouton Exécuter et le programme s'exécutera ligne par ligne",
  "This is a program": "Ceci est un programme",
  "Use these buttons to make the World match the Goal":"Utilisez ces boutons pour faire correspondre le monde à l'objectif",
  "Drag the move from here":"Faites glisser le advancer à partir d'ici",
  "Put the move here":"Mettez le advancer ici",
  "Click to work on a challenge":"Cliquez pour travailler sur une pratique",
  "Reset":"Réinit",
  "Challenge":"Pratique",

  // success swal
  "You solved the puzzle":"Tu as résolu le puzzle",
  'Great work':'Bon travail',
  'Amazing':'Incroyable',
  'Wonderful':'Merveilleux',
  'Awesome':'Impressionnant',

  //welcome
  "Meet Karel the turtle":"Rencontrez Karel la tortue!",
  "MeetKarelSub":"Voici à quoi ressemble Karel d'en haut:",
  "MeetKarelClickHelp":"Cliquez sur ce bouton pour continuer",
    
}

const en = {
  "RunInstructions":'Hit the run button, and the program will run line by line'
}