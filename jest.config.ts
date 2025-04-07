// /** @type {import('ts-jest').JestConfigWithTsJest} */
// export default {
//   testEnvironment: "jsdom", // ✅ necesario para testear cosas del DOM (React)
//   transform: {
//     "^.+\\.tsx?$": ["ts-jest", {}], // ojo: escapá bien el punto (\\.)
//   },
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // ✅ si usás jest-dom
// };

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.app.json',
    },
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};