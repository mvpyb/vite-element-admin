import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import userMock from '../mock/user'
import demoMock from '../mock/demo'
import articleMock from '../mock/article'
export const mockModules = [...userMock, ...demoMock, ...articleMock]

export function setupProdMockServer() {
  createProdMockServer( mockModules )
}
