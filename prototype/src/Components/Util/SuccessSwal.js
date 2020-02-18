import Swal from 'sweetalert2'
import {translate} from 'redux/translator.js'


function motivation() {
  let options = [
    translate('Great work'),
    translate('Amazing'),
    translate('Wonderful'),
    translate('Awesome')
  ]
  return options[Math.floor(Math.random() * options.length)];
}

export var fireSuccessSwal = function(callback){
  Swal.fire({
    title: motivation(),
    html: translate('You solved the puzzle'),
    icon: 'success',
    showConfirmButton:false,
    timer: 2500,
    onClose: callback
  })
}


