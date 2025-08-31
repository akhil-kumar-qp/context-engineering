// file path: src/msw/handlers/mswDevHandlers.ts
import {HttpResponse, http} from 'msw'
import {userMockDb} from '../mockDbs/userMockDb'
import type {IUser} from '../../types/IUser'

const sendResponse = <T>(res: T): HttpResponse<{data: T}> => {
  return HttpResponse.json({data: res})
}

export const mswDevHandlers = [
  // Handle both relative and absolute paths
  http.get('/api/user', (info) => {
    console.log('MSW intercepted request to:', info.request.url)
    const user = userMockDb.getUser()
    return sendResponse<IUser>(user)
  }),
  // Fallback for other patterns
  http.get('*/api/user', (info) => {
    console.log('MSW intercepted fallback request to:', info.request.url)
    const user = userMockDb.getUser()
    return sendResponse<IUser>(user)
  }),
]
