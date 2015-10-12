import json

outPutDict = {}

with open("../bike_station_data.json", "r") as stationsFile:
	myJson = json.load(stationsFile)
	del myJson["executionTime"]
	for station in myJson["stationBeanList"]:
		print station
		for key in station:
			print key
		outPutDict[station["id"]] = {}
		outPutDict[station["id"]]["lat"] = station["latitude"]
		outPutDict[station["id"]]["lng"] = station["longitude"]
		outPutDict[station["id"]]["stop_name"] = station["stationName"]
		outPutDict[station["id"]]["address"] = station["stAddress1"]

with open("../bike_stop_id_to_geodat.json", "w") as outFile:
	json.dump(outPutDict, outFile)
