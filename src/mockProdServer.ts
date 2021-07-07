import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";
import userMock from "../mock/user";

export const mockModules = [ ...userMock ];

export function setupProdMockServer() {
  createProdMockServer(mockModules);
}
