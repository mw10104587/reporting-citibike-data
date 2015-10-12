# remove useless data, like station name and lat lon address
import csv

dataDir = "../raw_data/"
inputFileSuffix = " - Citi Bike trip data.csv"

simpleOutputDir = "../simple_data/"
simpleOutPutSuffix = "-citibike-simple-data.csv"

month = 8
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

	with open(dataDir + str(year) + "-" + monthStr + inputFileSuffix) as f:
		
		# read in the csv file as a reader instead of a DictReader so that by cutting down the array, we can write a new csv file
		monthFile = csv.reader(f)

		# print monthFile.fieldnames[0:4] + [monthFile.fieldnames[7]] + monthFile.fieldnames[11:]

		with open( simpleOutputDir + str(year) + "-" + monthStr + simpleOutPutSuffix , 'w') as csvMonthOutputfile:
			writer = csv.writer(csvMonthOutputfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
			# writer.writerow(['tripduration', 'starttime', 'stoptime', 'start station id', 'end station id', 'bikeid', 'usertype', 'birth year', 'gender'])

			for i, ride in enumerate(monthFile):

				newRow = ride[0:4] + [ride[7]] + ride[11:]
				if len(newRow) != 9:
					print "the length is not 9"
					break
				writer.writerow(newRow)

			print "output done"

	if month == 9 and year == 2015:
		# print "We're done with simplifying data from"
		break


print "we're all done"