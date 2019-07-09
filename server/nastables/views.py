from flask import render_template, Blueprint
from flask import request, jsonify
from .Query7Mode import Query7Mode
from .QueryCDOT import QueryCDOT
from .filerTypeQuery import FilerType


nastables_blueprint = Blueprint('nastables',__name__)



@nastables_blueprint.route('/')
@nastables_blueprint.route('/nas')
@nastables_blueprint.route('/7Mode')
def index():
	return render_template("index.html")



@nastables_blueprint.route('/queryFilerType', methods=['GET', 'POST'])
def queryFilerType():
	result = []
	if request.method == 'POST':
		filer = request.json["filer"]
		queryObject = FilerType(filer)
		result = queryObject.query()
	return jsonify({'data': result})

@nastables_blueprint.route('/query7mode', methods = ['GET', 'POST'])
def query7Mode():
	result = []
	if request.method == 'POST':
		table = request.json["table"]
		filer = request.json["filer"]
		volume = request.json['volume']
		qtree = request.json['qtree']
		queryObject = Query7Mode(table, filer, volume, qtree)
		result = queryObject.queryReports()
	return jsonify(result)
	#return result.to_json()
	#return result.T.to_json()


@nastables_blueprint.route('/queryCDOT', methods= ['GET', 'POST'])
def queryCDOT():
	result = []
	if request.method == 'POST':
		table = request.json["table"]
		filer = request.json["filer"]
		volume = request.json['volume']
		qtree = request.json['qtree']
		queryObject = Query7Mode(table, filer, volume, qtree)
		result = queryObject.queryReports()

	a = jsonify(result)
	return a


@nastables_blueprint.route('/queryDistinctVolumes7Mode', methods=['GET', 'POST'])
def queryDistinctVolumes7Mode():
	result = []
	if request.method == 'POST':
		table = request.json["table"]
		filer = request.json["filer"]
		queryObject = Query7Mode(table, filer, "", "")
		result = queryObject.queryDistinctVolumes()
	return jsonify(result)


@nastables_blueprint.route('/queryDistinctQtrees7Mode', methods=['GET', 'POST'])
def queryDistinctQtrees7Mode():
	result = []
	if request.method =='POST':
		table = request.json["table"]
		filer = request.json["filer"]
		volume = request.json["volume"]
		queryObject = Query7Mode(table, filer, volume, "")
		result = queryObject.queryDistinctQtrees()
	return jsonify(result)


@nastables_blueprint.route('/queryDistinctVolumesCDOT', methods=['GET', 'POST'])
def queryDistinctVolumesCDOT():
	result = []
	if request.method == 'POST':
		table = request.json["table"]
		filer = request.json["filer"]
		queryObject = QueryCDOT(table, filer, '', "", "")
		result = queryObject.queryDistinctVolumes()
	return jsonify(result)


@nastables_blueprint.route('/queryDistinctQtreesCDOT', methods=['GET', 'POST'])
def queryDistinctQtreesCDOT():
	result = []
	if request.method =='POST':
		table = request.json["table"]
		filer = request.json["filer"]
		volume = request.json["volume"]
		queryObject = QueryCDOT(table, filer, '', volume, "")
		result = queryObject.queryDistinctQtrees()
	return jsonify(result)

@nastables_blueprint.route('/parseFile', methods=['GET', 'POST'])
def parseFile():
	result = []
	if request.method == 'POST':
		text = request.json["text"]
		result = checkTextFile(text)
		try:
			#this is a check to see if the file is clean without gettig an error
			result["Success"]
			return jsonify(querysForTextFile(text))
		except:
		 	return jsonify(result)

	return jsonify(result)



def checkTextFile(text):
	lines = text.split("\n")
	lines = lines[:-1]

	#Run all of the error checks on the file first before Aggregating query data for export
	for index in range(len(lines)):
		item = lines[index].split(";")
		queryObject = FilerType(item[0])
		result = queryObject.query()
		try:
			if result['filerType'] == "7Mode":
				#At least has the volume
				if len(item) >= 2: 
					queryObject = Query7Mode('OCI7Mode', item[0], item[1], "")
					result = queryObject.queryReports()
					
					if not result:
						return {"error": f"line {index + 1} has an invalid Volume"}
				#Has all three items Filer, Volume, Qtree
				if len(item) >= 3:
					queryObject = Query7Mode('OCI7Mode', item[0], item[1], item[2])
					result = queryObject.queryReports()

					if not result:
						return {"error": f"line {index + 1} has an invalid Qtree"}

				print("7Mode Line Is Good")


			elif result['filerType'] == "CDOT":
				#Volume
				if len(item) >= 2: 
					queryObject = Query7Mode('OCICDOT', item[0], item[1], "")
					result = queryObject.queryReports()

					if not result:
						return {"error": f"line {index + 1} has an invalid Volume"}
				#Qtree
				if len(item) >= 3:
					queryObject = Query7Mode('OCICDOT', item[0], item[1], item[2])
					result = queryObject.queryReports()

					if not result:
						return {"error": f"line {index + 1} has an invalid Qtree"}

				print("CDOT line is good")

			else:
				return {"error": f"line {index +1} has an invalid Filer"}

		except:
			return {"error": f"line {index + 1} experience a connection issue with the Database"}

	return {"Success": "Text File is clean. Ready to process data views"}


#In this method we are going to aggregate data based off of the text param passed
def querysForTextFile(text):
	lines = text.split("\n")
	lines = lines[:-1]

	ociData7Mode = []
	ociDataCDOT = []

	for index in range(len(lines)):
		item = lines[index].split(";")
		queryObject = FilerType(item[0])
		result = queryObject.query()
		if result['filerType'] == "7Mode":
			if len(item) == 1:
				ociData7Mode.append(Query7Mode('OCI7Mode', item[0]).queryReports()[0])
			elif len(item) == 2:
				ociData7Mode.append(Query7Mode('OCI7Mode', item[0], item[1]).queryReports()[0])
			else:
				ociData7Mode.append(Query7Mode('OCI7Mode', item[0], item[1], item[2]).queryReports()[0])


		elif result['filerType'] == "CDOT":
			if len(item) == 1:
				ociDataCDOT.append(Query7Mode('OCICDOT', item[0]).queryReports()[0])
			elif len(item) == 2:
				ociDataCDOT.append(Query7Mode('OCICDOT', item[0], item[1]).queryReports()[0])
			else:
				ociDataCDOT.append(Query7Mode('OCICDOT', item[0], item[1], item[2]).queryReports()[0])

		else:
			return {"error": "We reached an issue when aggregating data for the text file"}


	a = {"ociData7Mode": ociData7Mode, "ociDataCDOT": ociDataCDOT}

	return a







