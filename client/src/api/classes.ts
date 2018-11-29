import { http } from 'src/common/utils'
const fetchClassesURL = '/classes/getClasses'
export const fetchClasses = ({ id, child = 0 }: { id: string, child?: number }) => http.get(`${fetchClassesURL}/${id}/${child}`)