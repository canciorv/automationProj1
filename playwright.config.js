// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  workers: 3,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },
  
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    browserName : 'chromium',
    headless : true,
    screenshot : 'only-on-failure',
    trace : 'on',//off,on
    
    
    
  },

  


};

module.exports = config;
