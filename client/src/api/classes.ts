import { http } from 'src/common/utils'
import { Classes as ClassesModel } from 'src/models'
const fetchClassesURL = '/classes/getClasses'
const postClassesURL = '/classes/class'
const delClassesURL = '/classes/class'
export const fetchClasses = ({ id, child = 0 }: { id: string, child?: number }) => http.get(`${fetchClassesURL}/${id}/${child}`)
export const postClasses = (classes: ClassesModel) => http.post(`${postClassesURL}`, classes)
export const delClasses = (classes: ClassesModel) => http.delete(`${delClassesURL}`, classes)
