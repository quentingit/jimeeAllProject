'use strict'

const delay = require('delay')

module.exports = async (browser, user, opts) => {
  const page = await browser.newPage()
  await page.setExtraHTTPHeaders({
	'Accept-Language': 'en-US'
  });

  await page.goto('https://www.instagram.com/accounts/login/')

  await page.waitFor('input[name=username]', { visible: true })
  await delay(300)
  await page.type('input[name=username]', user.email || user.username, { delay: 27 })

  await delay(520)
  await page.type('input[name=password]', user.password, { delay: 42 })

  await delay(700)





    let  signup ;





    if (await page.$x('//button[contains(.,"Log")]') !== null) {
         [ signup ] =await page.$x('//button[contains(.,"Log")]');
    }
    else {
         [ signup ] = await page.$x('//button[contains(.,"Log")]');
    }






    await Promise.all([
    page.waitForNavigation(),
    signup.click({ delay: 1000 })
  ])


  return page

}
