import datetime

from flask import Flask, request, render_template, jsonify
from machine_learning.predictFakeFollowers import predictFakeFollowers



from  machine_learning import predictFakeFollowers


application = Flask(__name__)


<<<<<<< HEAD
#PREDICT FAKE FOLLWOERS (MACHINE LEARNING)
@application.route('/predictFakeFollowers', methods = ['POST', 'GET'])
#@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
=======
#PREDICT FAKE FOLLOWERS (MACHINE LEARNING)
@application.route('/predictFakeFollowers', methods = ['POST', 'GET'])
>>>>>>> 6d575ad3c3254e0dc669c24f8a8d14242c958a63
def fakeFollowers():

    #get followers data
    if request.method == 'POST':
        req_data = request.get_json(force=True)
        dataFollowers= req_data['dataFollowers']
        iduserinsta = req_data['id']


        print("data vaut ==========>")
        print(dataFollowers)

        #ON FAIS APPEL A LA FONCTION DU MACHINE LEARNING
        score=predictFakeFollowers(dataFollowers)
        print("SCORE GLOBAL======>", score)

        #ON RENREGISTRE DANS LA BDD LE SCORE
<<<<<<< HEAD
        #cur = cursor()
        #dateNow = datetime.datetime.now()
        #sql_insert_query = """ INSERT INTO action_fakefollower(date,iduserinsta,score) VALUES (%s, %s,%s)"""
        #val = (dateNow, iduserinsta, score)
        #result = cur.execute(sql_insert_query, val)

        #return jsonify(score)
        return "sucess"

    #get followers data
    if request.method == 'GET':

        dataFollowers = [ [ 1, 0, 0, 0, 0, 170, 0, 0, 3, 145, 167, 0 ],
          [ 1, 0, 0, 0, 0, 74, 0, 0, 42, 3235, 923, 0 ],
          [ 1, 0, 0, 0, 0, 147, 0, 0, 265, 2905, 698, 0 ],
          [ 1, 0, 0, 0, 0, 42, 1, 0, 22, 198, 323, 0 ],
          [ 1, 0, 0, 0, 0, 128, 0, 0, 39, 459, 288, 0 ],
          [ 1, 0, 0, 0, 0, 149, 0, 0, 115, 29, 541, 0 ],
          [ 1, 0, 0, 0, 0, 149, 0, 0, 53, 346, 121, 0 ],
          [ 1, 0, 0, 0, 0, 149, 0, 0, 50, 386, 4658, 0 ],
          [ 1, 0, 0, 0, 0, 35, 0, 0, 54, 1138, 430, 0 ],
          [ 1, 0, 0, 0, 0, 15, 0, 0, 1, 65, 12, 0 ],
          [ 1, 0, 0, 0, 0, 6, 0, 1, 2, 11, 29, 0 ],
          [ 1, 0, 0, 0, 0, 181, 0, 0, 97, 2160, 2198, 0 ] ]

        print(dataFollowers)
        score=predictFakeFollowers(dataFollowers)
        print("SCORE GLOBAL======>", score)

        return jsonify(score)

=======
        cur = cursor()
        dateNow = datetime.datetime.now()
        sql_insert_query = """ INSERT INTO action_fakefollower(date,iduserinsta,score) VALUES (%s, %s,%s)"""
        val = (dateNow, iduserinsta, score)
        result = cur.execute(sql_insert_query, val)

        return jsonify(score)

    if request.method == 'GET':
        table = [ [ 1, 0, 0, 0, 0, 170, 0, 0, 3, 145, 167, 0 ],
              [ 1, 0, 0, 0, 0, 74, 0, 0, 42, 3235, 923, 0 ],
              [ 1, 0, 0, 0, 0, 147, 0, 0, 265, 2905, 698, 0 ],
              [ 1, 0, 0, 0, 0, 42, 1, 0, 22, 198, 323, 0 ],
              [ 1, 0, 0, 0, 0, 128, 0, 0, 39, 459, 288, 0 ],
              [ 1, 0, 0, 0, 0, 149, 0, 0, 115, 29, 541, 0 ],
              [ 1, 0, 0, 0, 0, 149, 0, 0, 53, 346, 121, 0 ],
              [ 1, 0, 0, 0, 0, 149, 0, 0, 50, 386, 4658, 0 ],
              [ 1, 0, 0, 0, 0, 35, 0, 0, 54, 1138, 430, 0 ],
              [ 1, 0, 0, 0, 0, 15, 0, 0, 1, 65, 12, 0 ],
              [ 1, 0, 0, 0, 0, 6, 0, 1, 2, 11, 29, 0 ],
              [ 1, 0, 0, 0, 0, 181, 0, 0, 97, 2160, 2198, 0 ] ]
        score=predictFakeFollowers(dataFollowers)
        print("SCORE GLOBAL======>", score)

        #ON RENREGISTRE DANS LA BDD LE SCORE
        cur = cursor()
        dateNow = datetime.datetime.now()
        sql_insert_query = """ INSERT INTO action_fakefollower(date,iduserinsta,score) VALUES (%s, %s,%s)"""
        val = (dateNow, iduserinsta, score)
        result = cur.execute(sql_insert_query, val)

        return jsonify(score)


>>>>>>> 6d575ad3c3254e0dc669c24f8a8d14242c958a63
    return "True"

@application.route("/boost", methods = ['POST', 'GET'])
def boost():
  return "success"



@application.route("/")
def index():
  return "Hello, welcome"



if __name__ == '__main__':
  application.run(host="0.0.0.0", port=80)
