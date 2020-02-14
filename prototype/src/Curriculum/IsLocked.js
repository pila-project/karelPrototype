
export function isLocked(curriculum, studentState, item){
  
  studentState = {
    'cmd1':true,
  }

  if('prereq' in item){
    let prereq = item['prereq']
    return !(prereq in studentState)
  }

  // no prereq
  return false

}