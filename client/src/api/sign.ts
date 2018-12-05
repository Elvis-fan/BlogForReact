import { http } from 'src/common/utils'
import { User } from 'src/models'
const fetchSignInURL = '/sign/in'
export const fetchSignIn = (user: User) => http.post(`${fetchSignInURL}`, user)