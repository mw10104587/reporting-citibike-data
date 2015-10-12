import csv

dataDir = "../raw_data/"
outputDir = "../tourist_data/"

month = 8
year = 2015

getMaxCustomersList = []

# start station id | end station id
dockOrUndock = "start station id"
# dockOrUndock = "end station id"

outputFileSuffix = "-tourist-dock-data.csv" if (dockOrUndock == "end station id") else "-tourist-data.csv"

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
	

	# key is the stop id, values include total ride 
	touristMonthlyDict = {}

	with open(dataDir + str(year) + "-" + monthStr + " - Citi Bike trip data.csv") as f:
		monthFile = csv.DictReader(f)
		#print "		rides: " + str(len(list(monthFile)))
		tripDurationSum = 0
		# saves the station id as key, bikes undocked counts as value 
		startStationDict = {};
		endStationDict = {};

		for i, ride in enumerate(monthFile):
			# startId = ride["start station id"]
			# this one switched and we can generate a whole new different file.
			startId = ride[dockOrUndock]
			userType = ride["usertype"]
			
			# if ride["start station id"] in touristMonthlyDict:
			if ride[dockOrUndock] in touristMonthlyDict:
				touristMonthlyDict[startId][0] += 1
			else:
				touristMonthlyDict[startId] = [1,0,0]

			if userType == "Customer" or userType == "customer":
				touristMonthlyDict[startId][1] += 1
				touristMonthlyDict[startId][2] += int(ride["tripduration"])

		for station in touristMonthlyDict: 
			getMaxCustomersList.append(touristMonthlyDict[station][1]);

	with open( outputDir + str(year) + "-" + monthStr + outputFileSuffix , 'w') as csvMonthOutputfile:
		fieldnames = ['stop_id','month_total_ride', 'customer_ride_count', 'customer_duration_sum']
		writer = csv.DictWriter(csvMonthOutputfile, fieldnames=fieldnames)

		writer.writeheader()
		for stop in touristMonthlyDict:
			stopDataArray = touristMonthlyDict[stop]
			writer.writerow({
							'stop_id': stop,
							'month_total_ride': stopDataArray[0], 
							'customer_ride_count': stopDataArray[1],
							'customer_duration_sum': stopDataArray[2]}
							)

		print "output done"

	if month == 9 and year == 2015:
		print "We're done with toursit data"
		print str(max(getMaxCustomersList)) + " is the largest."
		break
			