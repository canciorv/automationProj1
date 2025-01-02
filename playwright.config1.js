// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  retries: 2,
  workers:3,
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },
  
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {

        browserName : 'webkit',
        headless : false,
        screenshot : 'only-on-failure',
        trace : 'on',//off,on,
        ...devices['iPhone 11 Pro']
      }
    },
    {
      name: 'chrome',
      use: {

        browserName : 'chromium',
        headless : false,
        screenshot : 'only-on-failure',
        video: 'retain-on-failure',
        ignoreHttpsErrors:true,// if website has the advanced button to proceed
        permissions:['geolocation'],// allow geolocation in chrome
        trace : 'on',//off,on,
        // viewport: {width:720, height:720},
        // ...devices['iPad Pro 11 landscape']
      }
    }
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    browserName : 'webkit',
    headless : true,
    screenshot : 'only-on-failure',
    trace : 'on',//off,on
    
    
    
  },


};

module.exports = config;
