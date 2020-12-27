import Swal from 'sweetalert2'
import {translate} from 'redux/translator.js'

export var fireTimeUpSwal = function(callback){
  Swal.fire({
    title: "Your time is up on this task",
    html: translate('Move on to the next task.'),
    icon: '',
    showConfirmButton:false,
    timer: 2500,
    onClose: callback
  })
}
