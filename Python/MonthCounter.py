import csv

dataDir = "../raw_data/"

month = 7
year = 2013


while True:
	if month < 12:
		month = month + 1
	else:
		month = 1
		year = year + 1	

	monthStr = str(month)
	if len(monthStr) == 1:
		monthStr = "0" + monthStr


	print str(year) + "-" + monthStr + " data:"
	with open(dataDir + str(year) + "-" + monthStr + " - Citi Bike trip data.csv") as f:
		monthFile = csv.DictReader(f)
		#print "		rides: " + str(len(list(monthFile)))
		tripDurationSum = 0
		# saves the station id as key, bikes undocked counts as value
		startStationDict = {};
		endStationDict = {};

		# 0 = unknown, 1 = man, 2 = woman
		man = 0
		woman = 0
		for i, ride in enumerate(monthFile):
			# print ride["tripduration"]
			tripDurationSum = tripDurationSum + int(ride["tripduration"])
			startStationId = ride["start station id"]
			endStationId = ride["end station id"]

			# record how many times each stop undocked
			if startStationId in startStationDict:
				startStationDict[startStationId] =  startStationDict[startStationId] + 1
			else:
				startStationDict[startStationId] = 1

			#record how many times each stop is docked
			if endStationId in endStationDict:
				endStationDict[endStationId] = endStationDict[endStationId] + 1
			else:
				endStationDict[endStationId] = 1


		print "		time : " + str(tripDurationSum) + " seconds"
		print "		time : " + str(tripDurationSum/60) + " minutes"
		print "		time : " + str(tripDurationSum/3600) + " hours"
		print "		trip : " + str(i)

		# get most undocked stop
		mostUndockStopId = max(startStationDict.iterkeys(), key= lambda x: startStationDict[x])
		print "		1 most undocked stop id: " + mostUndockStopId + ", undocked " + str(startStationDict[mostUndockStopId]) + " times"
		startStationDict.pop(mostUndockStopId, None)

		secMostUndockStopId = max(startStationDict.iterkeys(), key= lambda x: startStationDict[x])
		print "		2 most undocked stop id: " + secMostUndockStopId + ", undocked " + str(startStationDict[secMostUndockStopId]) + " times"
		startStationDict.pop(secMostUndockStopId, None)

		thirdMostUndockStopId = max(startStationDict.iterkeys(), key= lambda x: startStationDict[x])
		print "		3 most undocked stop id: " + thirdMostUndockStopId + ", undocked " + str(startStationDict[thirdMostUndockStopId]) + " times"
		startStationDict.pop(thirdMostUndockStopId, None)


		# get most docked stop
		mostDockStopId = max(endStationDict.iterkeys(), key= lambda x: endStationDict[x])
		print "		1 most docked stop id: " + mostDockStopId + ", docked " + str(endStationDict[mostDockStopId]) + " times"
		endStationDict.pop(mostDockStopId, None)

		secMostDockStopId = max(endStationDict.iterkeys(), key= lambda x: endStationDict[x])
		print "		2 most docked stop id: " + secMostDockStopId + ", docked " + str(endStationDict[secMostDockStopId]) + " times"
		endStationDict.pop(secMostDockStopId, None)

		thirdMostDockStopId = max(endStationDict.iterkeys(), key= lambda x: endStationDict[x])
		print "		3 most docked stop id: " + thirdMostDockStopId + ", docked " + str(endStationDict[thirdMostDockStopId]) + " times"
		endStationDict.pop(thirdMostDockStopId, None)




	if month == 12 & year == 2014:
		print "We are done with 2014"
		break

	if month == 8 and year == 2015:
		print "We're done"
		break
