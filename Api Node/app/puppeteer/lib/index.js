'use strict'
const delay = require('delay')
const faker = require('faker')
const ow = require('ow')
const puppeteer = require('puppeteer-extra')

const signup = require('./signup')
const signin = require('./signin')
const signout = require('./signout')
const verifyEmail = require('./verify-email')

puppeteer.use(require('puppeteer-extra-plugin-stealth')())

/**
 * [Instagram](https://instagram.com) automation driven by headless chrome.
 *
 * @param {Object} [opts={ }] - Options
 * @param {Object} [opts.browser] - Puppeteer browser instance to use
 * @param {Object} [opts.puppeteer] - Puppeteer [launch options](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions)
 */
class PuppeteerInstagram {
  constructor (opts = { }) {
    this._opts = opts
    this._user = null
  }

  /**
   * Whether or not this instance is authenticated with Instagram.
   * @member {boolean}
   */
  get isAuthenticated () { return !!this._user }
  /**
   * Authenticated user if authenticated with Instagram.
   * @member {Object}
   */
  get user () { return this._user }

  /**
   * Puppeteer Browser instance to use.
   *
   * @return {Promise<Object>}
   */
  async browser () {
    if (!this._browser) {
      this._browser =this._opts.browser || await puppeteer.launch(    {headless: true } )
    }
      //this._browser = this._opts.browser || await puppeteer.launch(this._opts.puppeteer)



    return this._browser
  }

  /**
   * Automates the creation of a new Instagram account.
   *
   * @param {object} user - User details for new account
   * @param {string} user.email - Email
   * @param {string} [user.username] - Username
   * @param {string} [user.firstName] - First name
   * @param {string} [user.lastName] - Last name
   * @param {string} [user.password] - Password
   * @param {object} [opts={ }] - Options
   * @param {boolean} [opts.verify] - Whether or not to verify email
   * @param {string} [opts.emailPassword] - Email password for verification
   * @return {Promise}
   */


  async signup (user, opts = { }) {


       console.log("0.1");


    if (this.isAuthenticated) throw new Error('"signup" requires no authentication')
    ow(user, ow.object.plain.nonEmpty.label('user'))
    ow(user.email, ow.string.nonEmpty.label('user.email'))

    user.username = user.username || user.email.split('@')[0]
    user.password = user.password || faker.internet.password()
    user.firstName = user.firstName || faker.name.firstName()
    user.lastName = user.lastName || faker.name.lastName()

    user.username = user.username
      .trim()
      .toLowerCase()
      .replace(/[^\d\w-]/g, '-')
      .replace(/_/g, '-')
      .replace(/^-/g, '')
      .replace(/-$/g, '')
      .replace(/--/g, '-')

    ow(user.username, ow.string.nonEmpty.label('user.username'))
    ow(user.password, ow.string.nonEmpty.label('user.password'))
    ow(user.firstName, ow.string.nonEmpty.label('user.firstName'))
    ow(user.lastName, ow.string.nonEmpty.label('user.lastName'))

    const browser = await this.browser()
    await signup(browser, user, opts)

    this._user = user

    if (opts.verify) {
      await this.verifyEmail(opts)
    }
  }

  /**
   * Signs into an existing Instagram account.
   *
   * Note: either username or email is required.
   *
   * @param {Object} user - User details for new account
   * @param {string} [user.username] - Username
   * @param {string} [user.email] - Email
   * @param {string} user.password - Password
   * @param {Object} [opts={ }] - Options
   * @return {Promise}
   */


  async signin (user, opts = { }) {
    console.log("1.1");
    if (this.isAuthenticated) throw new Error('"signin" requires no authentication')

    ow(user, ow.object.plain.nonEmpty.label('user'))
    ow(user.password, ow.string.nonEmpty.label('user.password'))

    if (user.email) {
          console.log("1.2");
      ow(user.email, ow.string.nonEmpty.label('user.email'))
    } else {
          console.log("1.3");
      ow(user.username, ow.string.nonEmpty.label('user.username'))
    }

    console.log("1.4");
    const browser = await this.browser()
    const page = await signin(browser, user, opts)

    this._user = user;
    return page
  }




    async fakeDetect(page) {

      console.log("DETECTION DES FAKES");
      await page.goto('https://www.instagram.com/parisianlayers');


      const query = "followers";

      console.log("evaluate");

      await page.$eval('a.-nal3', e => e.click());

    //PAUSE TO LOAD DIALOG WINDOW
    await delay(500);
    const followersName = await page.evaluate(() => Array.from(document.querySelectorAll('a._0imsa'), element => element.textContent));

    console.log(followersName);
    await delay(300);


    let tabFollowers=[];
    for (let i = 0; i < followersName.length; i++) {
        await page.goto('https://www.instagram.com/'+followersName[i]);



        //GET PROFIL POSTS / FOLLOWERS / FOLLOWS  /GET DESCRIPTION LENGTH  /GET PROFIL EXTERNAL URL  /GET PROFIL PIC   /GET PROFIL PRIVATE
        const text3 = await page.evaluate(() => Array.from(document.querySelectorAll('span.g47SY'), element => element.textContent));
        let nbPosts=parseInt(text3[0].split(' ').join('').split(',').join(''));
        let nbFollowers=parseInt(text3[1].split(' ').join('').split(',').join(''));
        let nbFollowings=parseInt(text3[2].split(' ').join('').split(',').join(''));
        const description = await page.evaluate(() => Array.from(document.querySelectorAll('div.-vDIg'), element => element.textContent));
        const url = await page.evaluate(() => Array.from(document.querySelectorAll('a.yLUwa'), element => element.textContent));
        let profilpic = await page.$$eval('img._6q-tv[src]',  imgs => imgs.map(img => img.getAttribute('src')));
        let profileprivate = await page.evaluate(() => window.find("private"));

        if(profilpic[0]!==undefined){
          if(profilpic[0].includes('44884218_345707102882519_2446069589734326272_n') ){
            profilpic=0;
          }else{
            profilpic=1;
          }
        }else{
            profilpic=1;
        }

        if(profileprivate===true){
          profileprivate=1;
        }else{
            profileprivate=0;
        }



        // ON AJOUTE LE RESULTAT AU TABLEAU

        tabFollowers.push( [profilpic, 0.0, 0, 0.0, 0, description[0].length, url.length, profileprivate, nbPosts, nbFollowers, nbFollowings, 0]);

        await delay(100)
    }

    console.log(tabFollowers);

    return tabFollowers;





    }


  /**
   * Signs out of the currently authenticated Instagram account.
   * @return {Promise}
   */
  async signout () {
    if (!this.isAuthenticated) throw new Error('"signout" requires authentication')
    const browser = await this.browser()

    await signout(browser, this._user)
    this._user = null
  }

  /**
   * Verifies the authenticated Instagram account's email via `puppeteer-email`.
   *
   * @param {Object} opts - Options
   * @param {string} opts.emailPassword - Email password for verification
   * @param {string} [opts.email] - Email verification (defaults to user's GitHub email)
   * @return {Promise}
   */
  async verifyEmail (opts) {
    ow(opts, ow.object.plain.nonEmpty.label('opts'))
    ow(opts.emailPassword, ow.string.nonEmpty.label('opts.emailPassword'))




    const browser = await this.browser()
    await verifyEmail(browser, {
      email: opts.email || this.user.email,
      password: opts.emailPassword
    }, opts)
  }

  /**
   * Closes the underlying browser instance, effectively ending this session.
   *
   * @return {Promise}
   */
  async close () {
    const browser = await this.browser()
    await browser.close()

    this._browser = null
    this._user = null
  }
}

module.exports = PuppeteerInstagram
