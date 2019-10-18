""" Quickstart script for InstaPy usage """
# imports

from Crypto.Cipher import AES
from json import dumps
from flask import Flask, make_response


from instapy.instapy import InstaPy
from instapy.util import smart_run
from instapy.dbb import  cursor

from selenium import webdriver


import threading
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
#import MySQLdb
import requests
import pymysql
import random
import itertools
import datetime
import time
from time import sleep
from flask import Flask , redirect, url_for, request
from flask_restful import Api, Resource, reqparse

from multiprocessing import Process
import multiprocessing
import os, errno
import signal



############   APP SYSTEME  --APP SYSTEME  -- #####################


app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

#api= API(app)
api= CORS(app, resources={r"/process": {"origins": "http://localhost:8001"}})


##############  PROCESS SYSTEME --PROCESS SYSTEME --  ######################
jobs = []
childprocess={}




####################################################################################
##############  FONCTIONS METIERS -- FONCTIONS METIERS  ############################
####################################################################################



def instapassword(id_insta):
    cur=cursor()
    sql = """SELECT pass FROM instausers WHERE instauser_id=%s """
    val = (id_insta)
    cur.execute(sql, val)
    myresult = cur.fetchall()
    for row in myresult:
        insta_password = " | ".join(row)
    print(insta_password)

    cur = cursor()
    sql = """SELECT passcipher FROM instausers WHERE instauser_id=%s """
    val = (id_insta)
    cur.execute(sql, val)
    myresult = cur.fetchall()
    for row in myresult:
        passcipher = " | ".join(row)


    #DECRYPT
    key = b'jimTHEbot isCOOL'

    #cipherpass
    arrcypher = bytes(passcipher, encoding='utf8')
    #print(arrcypher)
    arrcypherbytes= arrcypher.decode('unicode-escape').encode('ISO-8859-1')
    #print(arrcypherbytes)

    # pass
    arr = bytes(insta_password, encoding='utf8')
    decrypt = arr.decode('unicode-escape').encode('ISO-8859-1')
    d_cipher = AES.new(key, AES.MODE_EAX, arrcypherbytes)
    d_data = str(d_cipher.decrypt(decrypt))[2:-1]

    #print(d_data)

    return d_data


def create_config(id_insta):
    cur = cursor()
    sql_insert_query = """ INSERT INTO instaconfig (id_userinsta,n_config,likes,comments,follows,unfollows,min_follows,max_follows,min_followers,max_followers) VALUES (%s,%s, %s,%s,%s, %s, %s,%s, %s, %s)"""
    val = (id_insta, 1, 1, 0, 0, 0, 50, 1500, 200, 8000)
    print(sql_insert_query)
    print(val)
    result = cur.execute(sql_insert_query, val)

def instausername(id_insta):
    #SELECT USER AND PASS
    cur = cursor()
    sql = """SELECT user FROM instausers WHERE instauser_id=%s """
    val = (id_insta)
    cur.execute(sql, val)
    myresult = cur.fetchall()
    for row in myresult:
        insta_username = " | ".join(row)
    return insta_username


def configuser(id_insta, n_config):

    # SELECT CONFIG
    cur = cursor()
    sql = """SELECT id_instaconfig, n_config,likes,comments,follows,unfollows,min_follows,max_follows,min_followers,max_followers FROM instaconfig WHERE id_userinsta=%s and n_config=%s """
    val = (id_insta, n_config)
    cur.execute(sql, val)
    myresult = cur.fetchall()
    return myresult


def nb_configuser(id_insta):
    # SELECT les numeros des configs actives
    cur = cursor()
    sql = """SELECT COUNT(id_instaconfig) FROM instaconfig WHERE  likes = 1 and id_userinsta=%s or comments = 1 and id_userinsta=%s or follows and id_userinsta=%s = 1 or unfollows = 1 and id_userinsta=%s """
    val = (id_insta,id_insta,id_insta,id_insta)
    cur.execute(sql, val)
    myresult = cur.fetchone()
    return myresult[0]



def getCommentsTags(id_insta, id_instaconfig):
    # get likesTags for the account
    cur = cursor()
    sql = """SELECT tagcomments FROM tagcomments WHERE id_userinsta=%s  and id_instaconfig=%s """
    val = (id_insta, id_instaconfig)
    cur.execute(sql, val)
    tagComments=[i[0] for i in list(cur.fetchall())]
    return tagComments



def getLikesTags( id_insta, id_instaconfig):
    # get likesTags for the account
    cur = cursor()
    sql = """SELECT tag FROM tagslikes WHERE instausers_id=%s and id_instaconfig=%s """
    print(sql)
    val = (id_insta,id_instaconfig)
    print(val)
    cur.execute(sql, val)
    tagLikes=[i[0] for i in list(cur.fetchall())]
    print("taaaaaaaaaaaaaaaags")
    print(tagLikes)
    return tagLikes



#TYPE 1 for NotLike
#TYPE 2 for NotInclude
def getNotLikeUser(id_insta):
    # get likesTags for the account
    cur = cursor()
    sql = """SELECT tag FROM tagsNot WHERE instausers_id=%s and type=1"""
    val = (id_insta)
    cur.execute(sql, val)
    tagNotLikes=[i[0] for i in list(cur.fetchall())]
    return  tagNotLikes



def getNotIncludeBio(id_insta):
    # get likesTags for the account
    cur = cursor()
    sql = """SELECT tag FROM tagsNot WHERE instausers_id=%s and type=2"""
    val = (id_insta)
    cur.execute(sql, val)
    tagNotInclude=[i[0] for i in list(cur.fetchall())]
    return  tagNotInclude



def getDateActuelle():
    currentDT = datetime.datetime.now()
    return currentDT.strftime("%Y-%m-%d")


def getBoostUser(id_insta):
    # DATE ACTUELLE
    dateActuelle=getDateActuelle()

    print("====================================================>ddddd")
    print(dateActuelle)




    # SELECT BOOST : on compte le nombre
    cur = cursor()
    sql = """SELECT COUNT(*)  FROM boost WHERE id_userinsta=%s and date_boost=%s and boost=1"""
    val = (id_insta,dateActuelle)
    cur.execute(sql, val)
    result = cur.fetchone()


    #si il ya une ligne en base pour le boost qui est activé
    if (result[0]>=1):
        return 1
    else:
        return 0


def updateBoostUser(id_insta, boost):
    # DATE ACTUELLE
    dateActuelle=getDateActuelle()

    # SELECT BOOST
    cur = cursor()
    sql = """update boost set boost=%s WHERE id_userinsta=%s and date_boost=%s """

    val = (0, id_insta,dateActuelle)
    cur.execute(sql, val)

    print(cur._last_executed)


############################################################################
################# CREATE PROCESS EACH USER  -- CREATE PROCESS EACH USER ####
############################################################################

def run_app1(id_insta):

    #childprocess.append(multiprocessing.current_process().pid)
    #print("list de child", childprocess)

    #print("le processur pour l'utilisateur", insta_username , "est : ", os.getpid())

    #print("pass", insta_username,insta_password )
    # get an InstaPy session!
    # set headless_browser=True to run InstaPy in the background

    print("MULTI - Started at", datetime.datetime.now().strftime("%H:%M:%S"))


    #on recupere toutes les données de l'user
    insta_username=instausername(id_insta)
    insta_password=instapassword(id_insta)


    session = InstaPy(username=insta_username,
                      password=insta_password,
                      headless_browser=True)

    with smart_run(session):
        """ Activity flow """
        # general settings

        ###############################################################################
        ################# BOUCLE -- BOUCLE -- BOUCLE -- BOUCLE -- BOUCLE ##############
        ###############################################################################
        while True:


            print("NOMBRE CONFIG==============>")
            #POUR N CONFIG : on parcoure
            n_config = nb_configuser(id_insta)
            print(n_config)


            #si aucune config (par precaution)
            if n_config==0:
                create_config(id_insta)

            # on recupere les infos a chaque fois pour updater le profil / en compélement du process stats
            session.getinfos(id_insta, insta_username)


            for x in range(0, n_config):

                #pour avoir le bon numero de config, on rajoute 1
                numConfig=x+1
                # ON CHERCHE LA CONFIG DE L'UTILISATEUR
                configuserinsta = configuser(id_insta, numConfig)

                #Boost a 0 de base
                boost = 0


                # ON REGARDE S'IL A UN BOOST (null : n'existe pas, 0 : deja utilisé dans la journée , 1: a utiliser
                if (getBoostUser(id_insta)>=1):
                    nbactions = random.randrange(80, 90)
                    nbactionsFollow = random.randrange(30, 40)
                    #on enleve donc un boost
                    boost=getBoostUser(id_insta)
                else:
                    nbactions = random.randrange(12, 16)
                    nbactionsFollow = random.randrange(5, 8)


                for row in configuserinsta:
                    id_instaconfig = row[0]
                    n_config = row[1]
                    actionL = row[2]
                    actionC = row[3]
                    actionF = row[4]
                    actionU = row[5]
                    minfollowing = row[6]
                    maxfollowing = row[7]
                    minfollowers = row[8]
                    maxfollowers = row[9]


                session.set_relationship_bounds(enabled=True,
                                                delimit_by_numbers=True,
                                                max_followers=maxfollowers,
                                                min_followers=minfollowers,
                                                max_following=maxfollowing,
                                                min_following=minfollowing)


                #session.set_dont_include(["friend1", "friend2", "friend3"])
                #session.set_dont_like(["pizza", "#store"])



                #NOT INCLUDE IN SESSION
               # notLike= getNotLikeUser(id_insta)
               # session.set_dont_like(notLike)
               # print('Not Likes like like sont [%s]' % ', '.join(map(str, notLike)))

               # notInclude=getNotIncludeBio(id_insta)
               # session.set_dont_include(notInclude)
               # print('Not include sont [%s]' % ', '.join(map(str, notInclude)))

                likesTags = getLikesTags(id_insta, numConfig)
                print('les tags de like sont [%s]' % ', '.join(map(str, likesTags)))

                commentTags = getCommentsTags(id_insta, numConfig)
                print('les tags de commentaires sont [%s]' % ', '.join(map(str, commentTags)))

                actionL = 0
                actionC = 0
                actionF = 0
                actionU = 0

                # pour le comment : implique que le like soit activé
                if actionC == 1:
                    print("COMMENT --------->")
                    session.set_do_comment(enabled=True, percentage=25)
                    session.set_comments(commentTags)

                #pour le like
                if actionL == 1:
                    print("LIKE --------->")
                    nblikes=nbactions
                    print('le nombre de likes sera de : ',nbactions )
                    session.like_by_tags(likesTags,id_insta, amount=nbactions)



                # pour le follow
                if actionF == 1:
                    print("FOLLOW --------->")
                    nbfollows=nbactionsFollow
                    print('le nombre de follow sera de : ', nbfollows)
                    session.follow_by_tags(likesTags, id_insta,amount=nbfollows)

                # pour le unfollow
                if actionU == 1:
                    print("UNFOLLOW --------->")
                    #pour ne pas enlever les followers actifs  des 15derniers posts
                    session.set_dont_unfollow_active_users(enabled=True, posts=15)
                    print("action Unfollow")


                    session.unfollow_users(id_insta,amount=2, InstapyFollowed=(True, "nonfollowers"), style="FIFO", unfollow_after=60*60, sleep_delay=501)


                # for unfollow, verify date of first follow
                # session.unfollow_users(amount=random.randint(7, 10), sleep_delay=(random.randint(44, 111)))
                # session.set_dont_unfollow_active_users(enabled=True, posts=7)
                # session.follow_by_list(followlist=['portraitographers'], times=2, sleep_delay=600, interact=True)


                #ON UPDATE LE BOOST A 0 POUR DIRE QU'IL A ETE VALDIDE
                if (boost >= 1):
                    updateBoostUser(id_insta, boost)

                ######################################################

                #pause et insertion de la pause dans les logs
                timeDelay = random.randrange(1000, 1300)
                print("-------> sleep while:", timeDelay/60, "minutes")
                cur=cursor()
                sql_insert_query = """ INSERT INTO `logs`(`type`,`user` ) VALUES (%s, %s)"""
                val = ("pause", timeDelay)
                result = cur.execute(sql_insert_query, val)
                time.sleep(timeDelay)


        ###############################################################################
        ################# FIN BOUCLE -- FIN BOUCLE -- FIN BOUCLE  #####################
        ###############################################################################


        #session.end()
        print("ERROR -finished with error at",datetime.datetime.now().strftime("%H:%M:%S"))




####################################################################################
##############  FONCTIONS PROCESSUS -- FONCTIONS PROCESSUS #########################
####################################################################################



def get_process():
    print("PID of thuis second Main process is: {}".format(multiprocessing.current_process().pid))
    global childprocess
    childprocess["test"] =  multiprocessing.current_process().pid
    while True:
        time.sleep(10)
        for p in childprocess: print(p)


def check_pid(pid):
    """ Check For the existence of a unix pid. """
    print("Process p1 is alive: {}".format(pid.is_alive()))
    if(pid.is_alive()):
        return True
    else :
        return False


def PidIsAlive(pid):
    try:
        return os.waitpid(pid, os.WNOHANG) == (0, 0)
    except OSError as e:
        if e.errno != errno.ECHILD:
            raise

############################################################################
################# API ROUTES -- API ROUTES -- API ROUTES ###################
############################################################################





def process_actifs():

    # tableau de multiprocessing
    lst = []  # empty list of process
    for p in multiprocessing.active_children():
        # print('------>pid est',p.pid)
        lst.append(p.pid)
    return lst



###########################################################################################################################################################
###########################################################################################################################################################
###########################################################################################################################################################
###########################################################################################################################################################
###########################################################################################################################################################
######################################################################################################################################################

def suspiciousCode(id_user,id_check):
    # on check les infos en base

    cur = cursor()
    sql = """SELECT auth_code  FROM processlogin WHERE id_user=%s and id_check=%s order by start_date desc  limit 1 """
    val = (id_user, id_check)
    cur.execute(sql, val)
    record = cur.fetchall()
    for row in record:
        auth_code = row[0]


    #PAR DEFAUT ON RENVOIT 0, Sinan on renvoit le code
    if auth_code==0 :
        return 0
    else :
        print("CODE AUTHENTIFICATION")
        print(auth_code)
        return auth_code



def addAccount(id_user, id_check):
    #STATUT retour statu en BDD
    #successconnection : connexion reussie
    #falseloginpass: login ou mot de passe faux
    #finishlimit: session fermé en raison d'inactivité
    #pushcode: besoin d'un code authentification
    #repushcode: erreur apres utilisation code authentification

    print("SELENIUM : CREATION SESSION + LACEMENT JUSQU'A ECRAN LOGIN")
    session = InstaPy(username="-",
                      password="-",
                      id_user=id_user,
                      headless_browser=True)

    session.login_create_home()
    login_temp=""
    pass_temp=""
    pid = ""


    currentDT = time.time()
    print("==============>000.1")
    print(str(currentDT))

    #timer pour ne pas depasser 300sec
    t0 = time.time()
    print("ON ATTEND ENSUITE QUE L'UTILISATEUR ENVOI SON LOGIN/PASS")
    while not login_temp:

        #on check les infos en base
        cur = cursor()
        sql = """SELECT login_temp,pass_temp,id_processpython  FROM processlogin WHERE id_user=%s and id_check=%s order by start_date desc  limit 1 """
        #print(sql)
        val = (id_user, id_check)
        cur.execute(sql, val)
        myresult = cur.fetchall()

        for row in myresult:
            login_temp = row[0]
            pass_temp = row[1]
            pid= row[2]

        #print(login_temp)
        #print(pass_temp)
        #print(pid)



        #si le temps depasse 5min, on kill le process
        t1 = time.time()
        if (t1 - t0) >300 :

            # UPDATE : TIMELIMIT
            cur = cursor()
            sql = """update processlogin set statut=%s WHERE id_user=%s and id_check=%s order by start_date desc  limit 1 """
            print("================>")
            val = ("finishlimit", id_user, id_check)
            cur.execute(sql, val)
            ############################
            print("On Kill d'abord la session selenium, puis le process python pour inactivité")
            session.end()
            os.kill(pid, signal.SIGTERM)

        time.sleep(1)


    currentDT = time.time()
    print("==============>000.2")
    print(str(currentDT))


    #on ajoute le login/mot de passe a la session
    session.username = login_temp.replace(" ", "")
    session.password = pass_temp.replace(" ", "")


    #dossier pour les cookies
    session.logfolder = '{0}{1}{2}{1}'.format(
        session.logfolderlocation, session.logfolderpath, session.username)
    if not os.path.exists(session.logfolder):
        os.makedirs(session.logfolder)



    currentDT =  time.time()
    print("==============>000.3")
    print(str(currentDT))
    #ON CREE LA SESSION
    result = session.login_create()

    #UPDATE DU MOT DE PASSE SI BON
    cur = cursor()
    sql = """update processlogin set pass_temp="" WHERE id_user=%s and id_check=%s order by start_date desc  limit 1 """
    print("================>")
    val = ( id_user, id_check)
    cur.execute(sql, val)
    #############################################################################


    print(result[0])
    #SI BESOIN AUTHENTIFICATION
    if result[0] == "False:suspicious":

        # UPDATE : ON UPDATE AVEC LE MESSAGE D'AUTHENTIFICATION
        cur = cursor()
        sql = """update processlogin set statut=%s, auth_message=%s WHERE id_user=%s and id_check=%s order by start_date desc  limit 1 """
        val = ("pushcode", result[1], id_user, id_check)
        cur.execute(sql, val)
        ############################
        
        
        # timer pour ne pas depasser 300sec
        t2 = time.time()
        print("ON ATTEND ENSUITE QUE L'UTILISATEUR ENVOI SON CODE D'AUTH")
        while 1:

            #APPEL A LA FONCTION POUR LE CODE
            auth_code = suspiciousCode(id_user, id_check)
            if auth_code!="0":

                print("Le code est bon")
                #ON ATTEND UN RESULTAT EN RETOUR POUR SAVOIR SI LE CODE A FONCTIONNE, ET DONC LE COMPTE EST LOGGÉ
                session.code=auth_code
                result = session.suspiciouscodeinsta()
                #si c'est bon

                #SI LE CODE EST BON : ON CLOS LA SESSION, SINAN ON ATTEND DE NOUVEAU UN CODE
                if result :
                    # UPDATE : FINISH
                    cur = cursor()
                    sql = """update processlogin set statut=%s WHERE id_user=%s and id_check=%s order by start_date desc  limit 1 """
                    val = ("successconnection", id_user, id_check)
                    cur.execute(sql, val)
                    ############################
                    print("On Kill d'abord la session selenium, puis le process python pour inactivité")
                    session.end()
                    os.kill(pid, signal.SIGTERM)
                else :
                    # UPDATE : statut + on remet le code a 0 e
                    cur = cursor()
                    sql = """update processlogin set statut=%s, auth_code=0 WHERE id_user=%s and id_check=%s order by start_date desc  limit 1 """
                    val = ("repushcode", id_user, id_check)
                    cur.execute(sql, val)

                    ##############################
                    print("CODE AUTH NE MARCHE PAS, A RETESTER")

            t3 = time.time()
            if (t2 - t3) > 300:
                # si le temps depasse 5min, on kill le process
                # UPDATE : TIMELIMIT
                cur = cursor()
                sql = """update processlogin set statut=%s WHERE id_user=%s and id_check=%s order by start_date desc  limit 1 """
                val = ("finishlimit", id_user, id_check)
                cur.execute(sql, val)
                ############################
                print("On Kill d'abord la session selenium, puis le process python pour inactivité")
                session.end()
                os.kill(pid, signal.SIGTERM)
            time.sleep(1)


    # UPDATE FINISH:message
    if result[0] == "True:success":
        cur = cursor()
        sql = """update processlogin set statut=%s WHERE id_user=%s and id_check=%s order by start_date desc  limit 1 """
        val = ("successconnection", id_user, id_check)
        cur.execute(sql, val)

    if result[0] == "False:loginpass":
        cur = cursor()
        sql = """update processlogin set statut=%s WHERE id_user=%s and id_check=%s order by start_date desc  limit 1 """
        val = ("falseloginpass", id_user, id_check)
        cur.execute(sql, val)

    #ON CLOS LA SESSION ET LE PROCESS
    ############################
    session.end()
    os.kill(pid, signal.SIGTERM)





#AJOUTER UN COMPTE
@app.route('/addAccount', methods = ['POST', 'GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def run_create_profil():

    #on recupere les donnees
    if request.method == 'POST':
        req_data = request.get_json(force=True)  # force=True will make sure this works even if a client does not specify application/json
        id_user= req_data['id_user']
        id_check = req_data['id_check']

        print("id user")
        print(id_user)
        print(type(id_user))
        print("id check")
        print(id_check)
        print(type(id_check))

        #on crée le processlogin
        p = multiprocessing.Process(target=addAccount, args=(id_user,id_check))
        p.start()

        #on insére en base de donnee le processlogin
        cur = cursor()

        print("id user")
        print(id_user)
        print(type(id_user))
        print("id check")
        print(id_check)
        print(type(id_check))


        dateNow = datetime.datetime.now()
        sql_insert_query = """ INSERT INTO processlogin(id_user,id_check ,id_processpython, statut,auth_code, start_date) VALUES (%s, %s,%s, %s, %s, %s)"""
        val = (id_user, id_check, format(p.pid),"start", 0, dateNow)
        result = cur.execute(sql_insert_query, val)


    print("RETOUR True")
    return "True"


###########################################################################################################################################################
###########################################################################################################################################################
###########################################################################################################################################################
###########################################################################################################################################################
###########################################################################################################################################################
###########################################################################################################################################################


@app.route('/check', methods = ['POST', 'GET'])
def start_checkuserprocess():
    return "true"


@app.route('/', methods = ['POST', 'GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def status():
    return jsonify(process_actifs())



@app.route('/killprocess', methods = ['POST', 'GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def killprocess():
    if request.method == 'GET':
        pid = int(request.args.get('id'))
        os.kill(pid, signal.SIGTERM)
    return "process detruit"



@app.route('/process', methods = ['POST', 'GET'])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
def start_process():
    #print("PID of PARENT process is: {}".format(multiprocessing.current_process().pid))

    #verify if process run and exist for user
    #kill priocess

    if request.method == 'GET':
        id_insta = request.args.get('id')

    # check process for user in database
    cur = cursor()
    sql = """SELECT num_process FROM process WHERE id_userinsta=%s  Order by process_id Desc limit 1"""
    val=(id_insta)
    cur.execute(sql, val)
    result_set = list(cur.fetchall())
    pid=[]

    for result in result_set :
        pid = int(result[0])
        print("le process enfant demmande est :", pid)

    #if process exists, kill to restart
    for p in multiprocessing.active_children():
        if (p.pid==pid):
            print('---->Chil is active for PID {}'.format(p.pid))
            os.kill(pid, signal.SIGTERM)
            print("---->le process:", pid, " a ete detruit")


    #create multi
    time.sleep(2)

    #rajouter dans les actions(likes, comment, follow, unfollow)
    p = multiprocessing.Process(target=run_app1, args=(id_insta,))
    p.start()


    # insert into base PID

    now = time.strftime('%Y-%m-%d %H-%M-%S')
    print(  "Now:", now)

    cur = cursor()
    sql_insert_query = """ INSERT INTO `process`(`num_process`,`id_userinsta` ) VALUES (%s, %s)"""
    val = (format(p.pid), id_insta)
    result = cur.execute(sql_insert_query, val)

    return "process lance"
    #METTRE LES CONFIGS (FOLLOW/UNFOLLOW/COMMENT/LIKE)




############################################################################
################# LAUCNH ALL PROCESS - LAUNCH ALL PROCESS    ###############
############################################################################


######## SOLUTION POUR UN SERVEUR ####################
######################################################
#CHECK L'ETAT DE CHAQUE PROCESS PUIS LE RELANCE
def start_checkUserProcees():

    print('PROCESSUS DE VERIFICCATION DES PROCESS UTILISATEUR LANCÉ')

    while True:
        actif_process = process_actifs()
        #create list
        listActifProcess = list()
        print("PROCESS ACTIFS ====>")
        for numProcess in actif_process:
            print(numProcess)
            curprocessactif = cursor()
            #CHECK ID DE L'USER EN BDD, PAR ORDER DECROISSANT DES PROCESS_ID (en cas de doublons)
            sql = """SELECT DISTINCT(id_userinsta) FROM process where num_process=%s order by process_id DESC"""
            val = (numProcess)
            curprocessactif.execute(sql, val)
            listActifProcess.append([i[0] for i in curprocessactif.fetchall()])


        # LES USERS QUI DOIVENT ETRE ACTIVES
        # route pour selectionner tous les ids de ceux qui ont au moins 1action active
        cur = cursor()
        sql = """SELECT DISTINCT(id_userinsta) FROM instaconfig WHERE likes = 1 or comments = 1 or follows = 1 or unfollows = 1"""
        cur.execute(sql)
        #VERIFIE LES PROCESS ACTIFS
        for allprocess in cur:
           actif="false"
           for actifprocess in listActifProcess:
                try:
                    if(int(allprocess[0])==int(actifprocess[0])):
                        actif="true"
                except IndexError:
                    #on ne fais rien
                    actif = " "
           if (actif=="false"):
               p = multiprocessing.Process(target=run_app1,args=(allprocess[0],))
               p.start()
               print("PROCESS PAS LANCE, RELANCE DU PROCESS : ")
               print(format(p.pid))
               #ENREGISTREMENT EN BDD DU NOUVEAU PROCESS
               cur = cursor()
               dateNow = datetime.datetime.now()
               sql_insert_query = """ INSERT INTO `process`(`num_process`,`id_userinsta`,`date_process`) VALUES (%s, %s, %s)"""
               val = (format(p.pid), allprocess[0],dateNow)
               result = cur.execute(sql_insert_query, val)
        sleep(10)


######################################################
#DEMARRAGE DE TOUS LES PROCESS AU LANCEMENT DU SERVEUR
def startAllProcess():
    print("start all users process")


    #plus tard (si plusieurs serveurs), ne pas lancer le process

    #PROCESS VALIDE
    #route pour selectionner tous les ids de ceux qui ont au moins 1(UNE) action en cours
    cur = cursor()
    sql = """SELECT DISTINCT(id_userinsta) FROM instaconfig WHERE likes = 1 or comments = 1 or follows = 1 or unfollows = 1"""
    cur.execute(sql)




    for row in cur:
        id_insta=row[0]
        print("process start")
        print(id_insta)

        p = multiprocessing.Process(target=run_app1, args=(id_insta,))
        p.start()

        cur = cursor()
        dateNow = datetime.datetime.now()
        sql_insert_query = """ INSERT INTO `process`(`num_process`,`id_userinsta`,`date_process`) VALUES (%s, %s, %s)"""
        val = (format(p.pid), id_insta, dateNow)
        result = cur.execute(sql_insert_query, val)



    #on peut lancer le THREAD POUR CHECKER LES PROCESSUS
    sleep(10)
    print('On lance le process de vérification Loop')
    thread = threading.Thread(target=start_checkUserProcees)
    thread.start()



######################################################
#PERMET DE LANCER LA FONCTION START ALL PROCESS DES DEMARRAGE DU SERVEUR
def start_runner():


        time.sleep(2)
        def start_loop():
            not_started = True

            while not_started:
                print('In start loop')
                try:
                    r = requests.get('http://localhost:40100/check')
                    if r.status_code == 200:
                        print('Server started, quiting start_loop')
                        # on lance le process des comptes autos
                        startAllProcess()
                        not_started = False
                    print(r.status_code)
                except:
                    print('Server not yet started')


        print('Started runner')
        time.sleep(2)
        thread = threading.Thread(target=start_loop)
        thread.start()


############################################################################
################# MAIN PROCESS --MAIN PROCESS --MAIN PROCESS ###############
############################################################################
if __name__ == '__main__':
    start_runner()

    #use_reloader=False in debug mode | don't forget in PROD to pass False debug
    app.run(host= 'localhost', port=40100,debug=True,  use_reloader=False)
    #app.run(host= '192.168.0.8', port=40100,debug=True)

