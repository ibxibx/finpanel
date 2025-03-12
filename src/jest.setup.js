// Import React Testing Library's extensions for Jest
import "@testing-library/jest-dom";

// Mock localStorage
const localStorageMock = (function () {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

// Mock matchMedia (used by some responsive libraries)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Set default timeout for all tests
jest.setTimeout(10000);

// Mock for Date.now() to provide consistent results in tests
const originalDateNow = Date.now;
global.beforeEach(() => {
  // Mock Date.now but allow it to be overridden in specific tests
  global.Date.now = jest.fn(() => 1577836800000); // 2020-01-01
});

global.afterEach(() => {
  // Restore the original Date.now
  global.Date.now = originalDateNow;
});
