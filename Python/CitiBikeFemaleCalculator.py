import csv
import json
from dateutil.parser import parse
from datetime import datetime

def getWomanCountWith(fileName):

	# 0 is unknow, 1 is male, 2 is female

	with open(fileName, "r") as f:

		countList = [0,0,0]
		monthData = csv.DictReader(f)
		for ride in monthData:
			countList[int(ride["gender"])] += 1

		return countList


def getFileDateString(_month, _year):

	monthStr = str(_month)

	if len(monthStr) == 1:
		monthStr = "0" + monthStr

	return str(_year) + "-" + monthStr


def getGenderCountToStopIdWith(fileName):

	# a dictionary with key: station_id, and value 
	# {
	# man: count,
	# woman: count,
	# unknown: count
	# }


	outputDir = "../gender_data/"
	stationDict = {}

	with open(fileName, "r") as f:
		monthFile = csv.DictReader(f)
		for ride in monthFile:
			
			startStationId = ride["start station id"]
			if not (startStationId in stationDict):
				stationDict[startStationId] = {"male": 0, "female": 0, "unknown": 0}
			else:
				if int(ride["gender"]) == 0:
					stationDict[startStationId]["unknown"] += 1
				elif int(ride["gender"]) == 1:	
					stationDict[startStationId]["male"] += 1
				else:
					stationDict[startStationId]["female"] += 1

		fileName = fileName.replace("../simple_data/", "")
		print fileName
		monthAndYear = fileName[0:7]

		with open(outputDir + monthAndYear + fileName[7:].replace("citibike-simple-data.csv", "station-gender-data.csv"), "w") as outFile:
			# json.dump(stationDict, outFile)
			print json.dumps(stationDict, indent=4)

			return stationDict

def getDailyFemaleRidershipWith(fileName):
	# a function that returns an array with length = 7.
	# indicating Monday to Sunday.
	# you sum them up in the main function

	dailyList = [0, 0, 0, 0, 0, 0, 0]

	with open(fileName, "r") as f:
		monthFile = csv.DictReader(f)
		for ride in monthFile:
			if int(ride["gender"]) == 2:
				dayIndex = parse(ride["starttime"]).date().weekday()
				dailyList[dayIndex] += 1
			else:
				continue

	return dailyList


def getTotalRidershipWith(fileName):
	with open(fileName, "r") as f:
		monthFile = csv.DictReader(f)
		rideCount = 0
		for ride in monthFile:
			rideCount += 1

		return rideCount







def main():
	fileDir = "../simple_data/"
	simpleFileSuffix = "-citibike-simple-data.csv"


	month = 8
	year = 2015

	femaleWeeklyData = [0, 0, 0, 0, 0, 0, 0]


	while True:

		if month < 12:
			month = month + 1
		else:
			month = 1
			year = year + 1		

		fileName = fileDir + getFileDateString(month, year) + simpleFileSuffix

		# monthlyWeekData = getDailyFemaleRidershipWith(fileName)
		# for x in xrange(0,7):
		# 	femaleWeeklyData[x] += monthlyWeekData[x]

		tempDict = getGenderCountToStopIdWith(fileName)
		print tempDict["3232"]
		print tempDict["3050"]
		print tempDict["3054"]
		print tempDict["3072"]
		print tempDict["3094"]
		print tempDict["3117"]

		# if month == 9 and year == 2015:
			
		# 	print "result is: ", femaleWeeklyData
		# 	break

		# print getFileDateString(month, year)
		# threeType = getWomanCountWith(fileName)
		# print getFileDateString(month, year) +  "," + str(threeType[0]) + "," + str(threeType[1]) + "," + str(threeType[2])


main()