"""Module only used for the login part of the script"""
# import built-in & third-party module
from datetime import datetime

from Crypto.Cipher import AES
from pymysql import MySQLError

from selenium.webdriver.common.keys import Keys
from .xpath import read_xpath

import time
import pickle
from selenium.webdriver.common.action_chains import ActionChains
from .dbb import cursor



# import InstaPy modules
from .time_util import sleep
from .util import update_activity
from .util import web_address_navigator
from .util import reload_webpage
from .util import explicit_wait
from .util import click_element
from .util import check_authorization
from .util import save_account_progress
from .util import highlight_print
from selenium.common.exceptions import TimeoutException
# import exceptions
from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import WebDriverException
from selenium.common.exceptions import MoveTargetOutOfBoundsException

from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
#methode pour get les infos
from .like_util import get_user_infos

def bypass_suspicious_login(browser, bypass_with_mobile):
    """Bypass suspicious loggin attempt verification. This should be only
    enabled
    when there isn't available cookie for the username, otherwise it will and
    shows "Unable to locate email or phone button" message, folollowed by
    CRITICAL - Wrong login data!"""
    # close sign up Instagram modal if available
    try:
        close_button = browser.find_element_by_xpath(read_xpath(bypass_suspicious_login.__name__,"close_button"))

        (ActionChains(browser)
         .move_to_element(close_button)
         .click()
         .perform())

        # update server calls
        update_activity()

    except NoSuchElementException:
        pass

    try:
        # click on "This was me" button if challenge page was called
        this_was_me_button = browser.find_element_by_xpath(
            read_xpath(bypass_suspicious_login.__name__,"this_was_me_button"))

        (ActionChains(browser)
         .move_to_element(this_was_me_button)
         .click()
         .perform())

        # update server calls
        update_activity()

    except NoSuchElementException:
        # no verification needed
        pass

    try:
        choice = browser.find_element_by_xpath(
            read_xpath(bypass_suspicious_login.__name__,"choice")).text

    except NoSuchElementException:
        try:
            choice = browser.find_element_by_xpath(
                read_xpath(bypass_suspicious_login.__name__,"choice_no_such_element")).text

        except Exception:
            try:
                choice = browser.find_element_by_xpath(
                    read_xpath(bypass_suspicious_login.__name__,"choice_exception")).text

            except Exception:
                print("Unable to locate email or phone button, maybe "
                      "bypass_suspicious_login=True isn't needed anymore.")
                return False

    if bypass_with_mobile:
        choice = browser.find_element_by_xpath(
            read_xpath(bypass_suspicious_login.__name__,"bypass_with_mobile_choice")).text

        mobile_button = browser.find_element_by_xpath(
            read_xpath(bypass_suspicious_login.__name__,"bypass_with_mobile_button"))

        (ActionChains(browser)
         .move_to_element(mobile_button)
         .click()
         .perform())

        sleep(5)

    send_security_code_button = browser.find_element_by_xpath(
        read_xpath(bypass_suspicious_login.__name__,"send_security_code_button"))

    (ActionChains(browser)
     .move_to_element(send_security_code_button)
     .click()
     .perform())

    # update server calls
    update_activity()

    print('Instagram detected an unusual login attempt')
    print('A security code was sent to your {}'.format(choice))
    # on retourne aussi le message
    return ['False:suspicious', choice]










def login_user(browser,
               username,
               password,
               logger,
               logfolder,
               bypass_suspicious_attempt=False,
               bypass_with_mobile=False):
    """Logins the user with the given username and password"""

    time.sleep(2)
    assert username, 'Username not provided'
    assert password, 'Password not provided'

    ig_homepage = "https://www.instagram.com"
    #web_address_navigator(browser, ig_homepage)
    browser.get(ig_homepage)
    cookie_loaded = False

    time.sleep(2)
    # try to load cookie from username
    try:
        print("on verifie si un cookie existe")
        print('{0}{1}_cookie.pkl'.format(logfolder, username))

        for cookie in pickle.load(open('{0}{1}_cookie.pkl'
                                       .format(logfolder, username), 'rb')):
            print("avant1")
            print(cookie_loaded)
            print(cookie)
            browser.add_cookie(cookie)
            cookie_loaded = True
            print("appres2")
            print(cookie_loaded)

    except (WebDriverException, OSError, IOError):
        print("============>")
        print(cookie_loaded)
        print("Cookie file not found, creating cookie...")

    # force refresh after cookie load or check_authorization() will FAIL
    reload_webpage(browser)

    # cookie has been LOADED, so the user SHOULD be logged in
    # check if the user IS logged in
    login_state = check_authorization(browser,
                                      username,
                                      "activity counts",
                                      logger,
                                      False)
    if login_state is True:
        dismiss_notification_offer(browser, logger)
        return True

    # if user is still not logged in, then there is an issue with the cookie
    # so go create a new cookie..
    if cookie_loaded:
        print("Issue with cookie for user {}. Creating "
              "new cookie...".format(username))

    # Check if the first div is 'Create an Account' or 'Log In'
    try:
        login_elem = browser.find_element_by_xpath(
            read_xpath(login_user.__name__,"login_elem"))
    except NoSuchElementException:
        print("Login A/B test detected! Trying another string...")
        try:
            login_elem = browser.find_element_by_xpath(
                read_xpath(login_user.__name__,"login_elem_no_such_exception"))
        except NoSuchElementException:
            return False

    if login_elem is not None:
        try:
            (ActionChains(browser)
             .move_to_element(login_elem)
             .click()
             .perform())
        except MoveTargetOutOfBoundsException:
            login_elem.click()

        # update server calls
        update_activity()

    # Enter username and password and logs the user in
    # Sometimes the element name isn't 'Username' and 'Password'
    # (valid for placeholder too)

    # wait until it navigates to the login page
    login_page_title = "Login"
    explicit_wait(browser, "TC", login_page_title, logger)

    # wait until the 'username' input element is located and visible
    input_username_XP = read_xpath(login_user.__name__,"input_username_XP")
    explicit_wait(browser, "VOEL", [input_username_XP, "XPath"], logger)

    input_username = browser.find_element_by_xpath(input_username_XP)

    (ActionChains(browser)
     .move_to_element(input_username)
     .click()
     .send_keys(username)
     .perform())

    # update server calls for both 'click' and 'send_keys' actions
    for _ in range(2):
        update_activity()

    sleep(1)
    #  password
    input_password = browser.find_elements_by_xpath(
        read_xpath(login_user.__name__,"input_password"))

    if not isinstance(password, str):
        password = str(password)

    (ActionChains(browser)
     .move_to_element(input_password[0])
     .click()
     .send_keys(password)
     .perform())

    sleep(1)

    (ActionChains(browser)
     .move_to_element(input_password[0])
     .click()
     .send_keys(Keys.ENTER)
     .perform())

    # update server calls for both 'click' and 'send_keys' actions
    for i in range(4):
        update_activity()

    dismiss_get_app_offer(browser, logger)
    dismiss_notification_offer(browser, logger)

    if bypass_suspicious_attempt is True:
        bypass_suspicious_login(browser, bypass_with_mobile)

    # wait until page fully load
    explicit_wait(browser, "PFL", [], logger, 5)

    # Check if user is logged-in (If there's two 'nav' elements)
    nav = browser.find_elements_by_xpath(read_xpath(login_user.__name__,"nav"))
    if len(nav) == 2:
        # create cookie for username

        print("quelles sont les cookies ==================================================>")

        print(browser.get_cookies())


        pickle.dump(browser.get_cookies(), open(
            '{0}{1}_cookie.pkl'.format(logfolder, username), 'wb'))
        return True
    else:
        return False


def dismiss_get_app_offer(browser, logger):
    """ Dismiss 'Get the Instagram App' page after a fresh login """
    offer_elem = read_xpath(dismiss_get_app_offer.__name__,"offer_elem")
    dismiss_elem = read_xpath(dismiss_get_app_offer.__name__,"dismiss_elem")

    # wait a bit and see if the 'Get App' offer rises up
    offer_loaded = explicit_wait(
        browser, "VOEL", [offer_elem, "XPath"], logger, 5, False)

    if offer_loaded:
        dismiss_elem = browser.find_element_by_xpath(dismiss_elem)
        click_element(browser, dismiss_elem)

def dismiss_notification_offer(browser, logger):
    """ Dismiss 'Turn on Notifications' offer on session start """
    offer_elem_loc = read_xpath(dismiss_notification_offer.__name__,"offer_elem_loc")
    dismiss_elem_loc = read_xpath(dismiss_notification_offer.__name__,"dismiss_elem_loc")

    # wait a bit and see if the 'Turn on Notifications' offer rises up
    offer_loaded = explicit_wait(
        browser, "VOEL", [offer_elem_loc, "XPath"], logger, 4, False)

    if offer_loaded:
        dismiss_elem = browser.find_element_by_xpath(dismiss_elem_loc)
        click_element(browser, dismiss_elem)


##############################
###### LOGIN CREATE ##########
##############################

def login_create_user_home(browser,
               username,
               password,
               logger,
               logfolder,
               switch_language=True,
               bypass_suspicious_attempt=True,
               bypass_with_mobile=False):
    """Logins the user with the given username and password"""

    ig_homepage = "https://www.instagram.com/accounts/login/?source=auth_switcher"
    web_address_navigator(browser, ig_homepage)



    return "Good"



def login_create_user(browser,
               username,
               password,
               id_user,
               logger,
               logfolder,
               switch_language=True,
               bypass_suspicious_attempt=True,
               bypass_with_mobile=True,
               ):

    #print("liste-------------------------------->")

    #print(id_user)
    #print(username)
    #print(password)

    currentDT = datetime.now()
    print("==============>1")
    print(str(currentDT))

    """Logins the user with the given username and password"""
    assert username, 'Username not provided'
    assert password, 'Password not provided'

    cookie_loaded = False

    # try to load cookie from username
    try:
        for cookie in pickle.load(open('{0}{1}_cookie.pkl'
                                               .format(logfolder, username), 'rb')):
            browser.add_cookie(cookie)
            cookie_loaded = True
    except (WebDriverException, OSError, IOError):

        print("Cookie file not found, creating cookie...")




    currentDT = datetime.now()
    print("============>2")
    print(str(currentDT))

    # force refresh after cookie load or check_authorization() will FAIL
    reload_webpage(browser)

    # cookie has been LOADED, so the user SHOULD be logged in
    # check if the user IS logged in
    login_state = check_authorization(browser,
                                      username,
                                      "activity counts",
                                      logger,
                                      False)


    currentDT = datetime.now()
    print("============>3.1")
    print(str(currentDT))

    # wait until the 'username' input element is located and visible
    input_username_XP = "//input[@name='username']"
    explicit_wait(browser, "VOEL", [input_username_XP, "XPath"], logger)

    input_username = browser.find_element_by_xpath(input_username_XP)

    (ActionChains(browser)
     .move_to_element(input_username)
     .click()
     .send_keys(username)
     .perform())

    # update server calls for both 'click' and 'send_keys' actions
    for i in range(2):
        update_activity()


    currentDT = datetime.now()
    print("============>3.2")
    print(str(currentDT))
    #sleep(1)


    #  password
    input_password = browser.find_elements_by_xpath(
        "//input[@name='password']")

    if not isinstance(password, str):
        password = str(password)

    (ActionChains(browser)
     .move_to_element(input_password[0])
     .click()
     .send_keys(password)
     .perform())



    currentDT = datetime.now()
    print("============>4")
    print(str(currentDT))


    #sleep(1)

    (ActionChains(browser)
     .move_to_element(input_password[0])
     .click()
     .send_keys(Keys.ENTER)
     .perform())

    # update server calls for both 'click' and 'send_keys' actions
    for i in range(4):
        update_activity()



    currentDT = datetime.now()
    print("============>5")
    print(str(currentDT))




    #dismiss_get_app_offer(browser, logger)
    #dismiss_notification_offer(browser, logger)

    # VERIFICATION
    message=0

    #print("steeeeeeep =================> 1")
    #try:
    #    dismiss_elem_loc = "//button[text()='Not Now']"
    #    dismiss_elem = browser.find_element_by_xpath(dismiss_elem_loc)
    #    click_element(browser, dismiss_elem)
    #    message=0
    #    print("steeeeeeep =================> 2")
    #except NoSuchElementException:
    #    message=1
    #    print("steeeeeeep =================> 3")


    if message==0:

        ###########################
        #NOUVELLE ETAPE DE BY PASS
        i = 0
        while (i < 1):
            try:


                WebDriverWait(browser, 0).until(EC.presence_of_element_located((By.XPATH, read_xpath(bypass_suspicious_login.__name__, "close_button") )))
                close_button = browser.find_element_by_xpath(read_xpath(bypass_suspicious_login.__name__, "close_button"))

                (ActionChains(browser)
                 .move_to_element(close_button)
                 .click()
                 .perform())

                # update server calls
                update_activity()
                break
            except:
                browser.implicitly_wait(1)
                i = i + 1

        currentDT = datetime.now()
        print("============>6")
        print(str(currentDT))




        i = 0
        while (i < 1):
            print("i vaut")
            print(i)
            try:

                currentDT = datetime.now()
                print("============>6.1")
                print(str(currentDT))

                WebDriverWait(browser, 0).until(EC.presence_of_element_located((By.XPATH, read_xpath(bypass_suspicious_login.__name__, "this_was_me_button"))))
                print("la non normalement")
                this_was_me_button = browser.find_element_by_xpath(read_xpath(bypass_suspicious_login.__name__, "this_was_me_button"))

                (ActionChains(browser)
                 .move_to_element(this_was_me_button)
                 .click()
                 .perform())

                # update server calls
                update_activity()



                print("============>THIS WAS ME")


                break
            except:
                try:

                    currentDT = datetime.now()
                    print("============>6.2")
                    print(str(currentDT))

                    WebDriverWait(browser, 0).until(EC.presence_of_element_located((By.XPATH, "//button[text()='Send Security Code']")))
                    dismiss_elem_loc = "//button[text()='Send Security Code']"
                    dismiss_elem = browser.find_element_by_xpath(dismiss_elem_loc)
                    click_element(browser, dismiss_elem)

                    currentDT = datetime.now()
                    print("============>6.3")
                    print(str(currentDT))


                    print("---------------------------->suspicious on check")
                    message = browser.find_element_by_class_name('SVI5E').text
                    print("texte a afficher polololo  =============================================>")
                    print(message)

                    # on retourne aussi le message
                    return ['False:suspicious', message]
                except:
                    #browser.implicitly_wait(1)
                    currentDT = datetime.now()
                    print("============>6.4")
                    print(str(currentDT))

                    i = i + 1



    currentDT = datetime.now()
    print("============>7")
    print(str(currentDT))




    #error_login_form = browser.find_element_by_id('slfErrorAlert')
    #if (error_login_form):
    #    return False
    #dismiss_notification_offer(browser, logger)
    update_activity()

    currentDT = datetime.now()
    print("============>7.1")
    print(str(currentDT))


    # wait until page fully load
    explicit_wait(browser, "PFL", [], logger, 1)

    currentDT = datetime.now()
    print("============>7.2")
    print(str(currentDT))

    # Check if user is logged-in (If there's two 'nav' elements)
    nav = browser.find_elements_by_xpath('//nav')



    currentDT = datetime.now()
    print("============>8")
    print(str(currentDT))



    if len(nav) == 2:


        # create cookie for username
        pickle.dump(browser.get_cookies(), open(
            '{0}{1}_cookie.pkl'.format(logfolder, username), 'wb'))


        # ON CRYPTE
        key = b'jimTHEbot isCOOL'
        data = password.encode()

        e_cipher = AES.new(key, AES.MODE_EAX)
        cipherpassword = str(e_cipher.nonce)[2:-1]

        e_datapasswordencrypt = e_cipher.encrypt(data)
        password = str(e_datapasswordencrypt)[2:-1]
        # , encoding='utf8'

        currentDT = datetime.now()
        print("============>9")
        print(str(currentDT))



        #INSERTION DE L'USER INSTAGRAM
        cur = cursor()
        sql_insert_query = """ INSERT INTO `instausers`(`user`,`pass`,`passcipher`,`users_id`,`actif`) VALUES (%s,%s, %s, %s, %s)"""
        val = (username,password, cipherpassword, id_user, 1)
        result = cur.execute(sql_insert_query, val)

        #ON RECUPERE L'ID CREE
        id_insta=cur.lastrowid

        #si probleme dans recuperation id derniere insertion
        if id_insta <=0 :
            cur = cursor()
            sql = """SELECT instauser_id FROM instausers WHERE user='%s' """
            val = (username)
            cur.execute(sql, val)
            myresult = cur.fetchall()
            for row in myresult:
                id_insta = " | ".join(row)


        #ON CREE LA CONFIG DE BASE
        print("CREATION DE LA CONFIG DE BASE !!!!!!!!!!")
        cur = cursor()
        sql_insert_query = """ INSERT INTO `instaconfig`(`id_userinsta`,`n_config`,`likes`,`comments`,`follows`,`unfollows`,`min_follows`,`max_follows`,`min_followers`,`max_followers`) VALUES (%s,%s, %s,%s,%s, %s, %s, %s, %s, %s)"""
        val = (id_insta, 1 ,1,0,0,0, 50,1500,200,8000)
        result = cur.execute(sql_insert_query, val)

        currentDT = datetime.now()
        print("============>10")
        print(str(currentDT))

        #try to save account progress
        try:
            #permet aussi d'aller sur le profil
            #save_account_progress(browser,
            #                      username,
            #                      logger)

            url = "https://www.instagram.com/{}".format(username)
            browser.get(url)



            currentDT = datetime.now()
            print("============>10.1")
            print(str(currentDT))

            # ON UPDATE EN BDD LES INFOS UTILISATEURS
            get_user_infos(browser, id_insta, username,1)

            currentDT = datetime.now()
            print("============>11")
            print(str(currentDT))

        except Exception:
            logger.warning(
                'Unable to save account progress, skipping data update')

        currentDT = datetime.now()
        print("============>12")
        print(str(currentDT))
        return ["True:success"]

    else:
        return ["False:loginpass"]



def suspiciouscodefinish(browser,
               username,
               password,
               id_user,
               logger,
               logfolder,
               code
               ):



    #on rentre le code
    addcode = browser.find_element_by_name('security_code')
    addcode.send_keys(Keys.CONTROL + "a")
    addcode.send_keys(Keys.DELETE)
    addcode.send_keys(code)

    # update server calls for both 'click' and 'send_keys' actions
    for i in range(2):
        update_activity()

    try:
        submit_button = browser.find_element_by_xpath(
            "//*[text()='Submit']")
    except NoSuchElementException:
        print("Login A/B test detected! Trying another string...")

    (ActionChains(browser)
     .move_to_element(submit_button)
     .click()
     .perform())



    # wait until page fully load
    explicit_wait(browser, "PFL", [], logger, 5)

    # Check if user is logged-in (If there's two 'nav' elements)
    nav = browser.find_elements_by_xpath('//nav')


    print("suite 1 ")
    if len(nav) == 2:

        print("suite 2 ")
        # ON CRYPTE
        key = b'jimTHEbot isCOOL'
        data = password.encode()

        e_cipher = AES.new(key, AES.MODE_EAX)
        cipherpassword = str(e_cipher.nonce)[2:-1]

        e_datapasswordencrypt = e_cipher.encrypt(data)
        password = str(e_datapasswordencrypt)[2:-1]
        # , encoding='utf8'


        # create cookie for username
        pickle.dump(browser.get_cookies(), open(
            '{0}{1}_cookie.pkl'.format(logfolder, username), 'wb'))

        print("suite 3 ")

        #INSERTION DE L'USER INSTAGRAM
        cur = cursor()
        sql_insert_query = """ INSERT INTO `instausers`(`user`,`pass`,`passcipher`,`users_id`,`actif`) VALUES (%s,%s, %s, %s, %s)"""
        val = (username, password, cipherpassword, id_user, 1)
        result = cur.execute(sql_insert_query, val)

        #ON RECUPERE L'ID CREE
        id_insta=cur.lastrowid


        #ON CREE LA CONFIG DE BASE
        print("CREATION DE LA CONFIG DE BASE !!!!!!!!!!")
        try:
            cur = cursor()
            sql_insert_query = """ INSERT INTO instaconfig (id_userinsta,n_config,likes,comments,follows,unfollows,min_follows,max_follows,min_followers,max_followers) VALUES (%s,%s, %s,%s,%s, %s, %s,%s, %s, %s)"""
            val = (id_insta, 1 ,1,0,0,0, 50,1500,200,8000)
            print(sql_insert_query)
            print(val)
            result = cur.execute(sql_insert_query, val)
        except (MySQLError) as e:
            print(e)
            print("y a un prob qui fais chier a l'insertion de la config de base")




        #try to save account progress
        try:
            #permet aussi d'aller sur le profil
            save_account_progress(browser,
                                  username,
                                  logger)
            # ON UPDATE EN BDD LES INFOS UTILISATEURS
            get_user_infos(browser, id_insta, username,1)
            print("suite 5 ")
        except Exception:
            print("suite 6 ")
            logger.warning(
                'Unable to save account progress, skipping data update')
        return True

    else:
        print("suite 7 ")
        return False
















