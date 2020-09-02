import React, { Component } from 'react'

const LOCALE = 'en'

export var translate = function(input){
  const dict = getDictionary(LOCALE)
  if(input in dict) {
    return dict[input]
  }
  // default to returning what you were passed
  return input
}

export var translateAllParts = function(input, part) {
  let parts = input.split(part)
  return parts.join(translate(part))
}

function getDictionary(lang) {
  if(lang === 'fr') return fr
  if(lang === 'en') return en
}

const fr = {
  // Controls
  'End Session': 'Fin de Session',

  // some fn names
  'turn right':'tourner à droite',
  'turn around':'faire demi-tour',
  'place 2':'placer 2',
  'pickup 5':'ramasser 5',

  //learning
  'Challenge':'Puzzle',
  'Example':'Exemple',
  'Good Example':'Bon Exemple',
  'Bad Example':'Mauvais Exemple',
  'Write a program from scratch that makes Karel move to the position shown in the "Goal" world':'Écrivez un programme à partir de zéro qui fait passer Karel à la position indiquée dans le monde "Objectif"',
  'This example program makes Karel walk out of her house':'Cet exemple de programme fait sortir Karel de sa maison',
  'It is broken since the commands are outside the define block':'Il est cassé car les commandes sont en dehors du bloc \"définir\"',
  "Great work! You have earned 100 points. Click on an activity!": "Bon travail! Vous avez gagné 100 points. Cliquez sur une activité!",
  "Commands 1": "Commandes 1",
  "Big Challenge Problem #1": "Grand defi #1",
  "Big Challenge Problem #2": "Grand defi #2",
  "Teach 1": "Enseigner 1",
  "Teach 2": "Enseigner 2",
  "Repeat 1": "Répétez 1",
  "Repeat 2": "Répétez 2",
  "Repeat 3": "Répétez 3",
  "Welcome": "Bienvenue",
  "You are going to learn how to program":"Vous allez apprendre à programmer!",
  "Meet Karel the turtle":"Rencontrez Karel la tortue!",
  "MeetKarelSub":"Voici à quoi ressemble Karel d'en haut:",
  "MeetKarelClickHelp":"Cliquez sur ce bouton pour continuer",
  'This program has karel pick up a stone and move it around a corner. It creates a new command to "turn right"':
    'Ce programme demande à Karel de ramasser une pierre et de la déplacer dans une cellule. Il crée une nouvelle commande pour "tourner à droite"',
  'This program teaches Karel a new command: turn around':
    'Ce programme enseigne à Karel une nouvelle commande: faire demi-tour',
  'Although this program solves the problem, it is harder to read':
    'Bien que ce programme résout le problème, il est plus difficile à lire',
  'Write a program that has karel turn right around this wall. You should define a "turn right" command to be three "turn left" commands':
    'Écrivez un programme qui fait tourner Karel à droite autour de ce mur. Vous devez définir une commande "tourner à droite" comme étant trois commandes "tourner à gauche"',
  'Once "place 2" is defined we can use the command as much as we like':
    'Dès que "placer 2" est défini, nous pouvons utiliser la commande autant que nous le voulons',
  'Use a repeat to place 9 stones':
    'Utilisez une répétition pour placer 9 pierres',
  'This program uses a repeat to place 5 stones':
    'Ce programme utilise une répétition pour placer 5 pierres',
  "This program doesn't use a repeat":
    "Ce programme n'utilise pas de répétition",
  'Use a repeat to place a row of stones':
    'Utilisez une répétition pour placer une rangée de pierres',
  'This program uses a repeat with several commands':
    'Ce programme utilise une répétition avec plusieurs commandes',
  'Use a repeat to place 9 stones in each corner':
    'Utilisez une répétition pour placer 9 pierres dans chaque cellule',
  'This program combines a repeat with a new command':
    'Ce programme combine une répétition avec une nouvelle commande',

  "KarelCanMove":"Karel peut avancer:",
  "KarelCanTurnLeft":"Karel peut tourner à gauche:",
  "world":"Monde",
  "goal":"Objectif",
  "move":"avancer",
  "turnLeft":"tourner à gauche",
  "pickStone":"ramasser une pierre",
  "placeStone":"placer une pierre",
  "clickMoveHelp":"Cliquez sur ce bouton pour faire avancer Karel",


  //pre
  'Karel can pick stones':<span>Karel peut <span style={{color:'blue'}}>ramasser des pierres</span></span>,
  'Karel can place stones':<span>Karel peut <span style={{color:'blue'}}>placer des pierres</span></span>,
  'Karel can perform many commands':'Karel peut exécuter de nombreuses commandes',
  "Next":"Suivant",
  "Run":"Exécuter",
  "World":"Monde",
  "Goal":"Objectif",
  "move":"avancer",
  "turnLeft":"tourner à gauche",
  "pickStone":"ramasser une pierre",
  "placeStone":"placer une pierre",
  "You can program Karel":<span>Tu peux <span className="blue">programmer</span> Karel</span>,
  "RunInstructions": "Appuyez sur le bouton Exécuter et le programme s'exécutera ligne par ligne",
  "This is a program": "Ceci est un programme",
  "Use these buttons to make the World match the Goal":"Utilisez ces boutons pour faire correspondre le monde à l'objectif",
  "Drag the move from here":"Faites glisser \"avancer\" à partir d'ici",
  "Put the move here":"Mettez \"avancer\" ici",
  "Click to work on a challenge":"Cliquez pour travailler sur une pratique.",
  "Reset":"Réinit",
  'Instructions':'Instructions',
  'Add another move to the program':'Ajouter un autre "avancer" au programme',
  'You have finished the warmup':"Tu as terminé l'échauffement",

  // success swal
  "You solved the puzzle":"Tu as résolu le puzzle",
  'Great work':'Bon travail',
  'Amazing':'Incroyable',
  'Wonderful':'Merveilleux',
  'Awesome':'Impressionnant',
  "Not quite!":'Bon effort!',

  // challenge
  'Pick up all the stones':'Ramassez toutes les pierres',
  'Tries to pick up the stones without defining new commands':'Tente de ramasser les pierres sans définir de nouvelles commandes',

  //welcome
  "Meet Karel the turtle":"Rencontrez Karel la tortue!",
  "MeetKarelSub":"Voici à quoi ressemble Karel d'en haut:",
  "MeetKarelClickHelp":"Cliquez sur ce bouton pour continuer",

}

const en = {
  "RunInstructions":'Hit the run button, and the program will run line by line',
  "clickMoveHelp":"Click this button to make Karel move",
  "MeetKarelSub":"This is what Karel looks like from the top:",
  "MeetKarelClickHelp":"Click this button to continue",
}
