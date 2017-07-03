const config = require('../../../nightwatch.conf.js');

module.exports = { // adapted from: https://git.io/vodU0
  'Login tests': function (browser) {
    browser
      .url('http://localhost:7000/#/login')
      .waitForElementVisible('body')
      .assert.title('Document Management System')
      .waitForElementVisible('input[name=email]', 5000)
      .setValue('input[name=email]', 'tedddddst@test.com')
      .waitForElementVisible('input[name=password]', 1000)
      .setValue('input[name=password]', 'password')
      .click('button[type=submit]')
      .pause(1000)
      .waitForElementVisible('.custom-error-login', 5000)
      .assert.containsText('.custom-error-login', 'email not found')
      .clearValue('input[name=email]')
      .clearValue('input[name=password]')
      .pause(1000)
      .saveScreenshot('login')
      .setValue('input[name=email]', 'mure@gmil.com')
      .setValue('input[name=password]', 'password')
      .click('button[type=submit]')
      .waitForElementVisible('.custom-error-login', 5000)
      .pause(1000)
      .assert.containsText('.custom-error-login', 'invalid password')
      .clearValue('input[name=email]')
      .setValue('input[name=email]', 'mure@gmil.com')
      .clearValue('input[name=password]')
      .setValue('input[name=password]', 'users')
      .click('button[type=submit]')
      .waitForElementNotPresent('.loginForm', 100000)
      .waitForElementPresent('nav', 100000)
      .pause(1000)
      .assert.urlEquals('http://localhost:7000/#/dashboard')
      .pause(1000)
      .end();
  }
};
