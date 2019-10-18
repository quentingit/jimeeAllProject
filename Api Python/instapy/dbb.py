#import MySQLdb
import pymysql
def cursor():
    db = pymysql.connect(host="62.210.72.103",  # your host, usually localhost
                         user = "kray",  # your username
                         passwd = "flywithm3",  # your password
                         db = "db_prod")  # name of the data base
                         #db = "db_dev")  # name of the data base

    db.autocommit(True)

    # you must create a Cursor object. It will let
    #  you execute all the queries you need
    return db.cursor()

