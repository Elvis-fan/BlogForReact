import { http } from 'src/common/utils'
const fetchClassesURL = '/classes/getClasses'
export const fetchClasses = (classes: string) => http.get(`${fetchClassesURL}/${classes}`)