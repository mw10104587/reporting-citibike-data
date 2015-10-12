import csv

dataDir = "../raw_data/"

year = 2014
monthStr = "10"

with open(dataDir + str(year) + "-" + monthStr + " - Citi Bike trip data.csv") as f:

	weekendCount = 0

	monthFile = csv.DictReader(f)
	for i, ride in enumerate(monthFile):
		# print ride["starttime"].split()[0]
		if ride["starttime"].split()[0] == "10/11/2014" or ride["starttime"].split()[0] == "10/12/2014":
			weekendCount = weekendCount + 1


	print "that weekend has " + str(weekendCount) + " rides."