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
  'Karel can pick stones':<span>Karel peut <span style={{color:'blue'}}>ramasser des pierres</span></span>,
  'Karel can place stones':<span>Karel peut <span style={{color:'blue'}}>placer des pierres</span></span>,
  'Karel can perform many commands':'Karel peut exécuter de nombreuses commandes'
}

const en = {

}