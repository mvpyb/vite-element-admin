import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer"
import userMock from "../mock/user"
import demoMock from "../mock/demo"
export const mockModules = [ ...userMock, ...demoMock ]

export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
