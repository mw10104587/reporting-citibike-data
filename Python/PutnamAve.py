import csv, json


# putnamData = []

# with open("../raw_data/2015-09 - Citi Bike trip data.csv", "r") as f:
# 	monthFile = csv.DictReader(f)
# 	for ride in monthFile:
# 		if	ride["start station id"] == "3050":
# 			putnamData.append(ride)



def getAddedStationBetween(formerYearStr, formerMonthStr, latterYearStr, latterMonthStr):
	# if the month is only one digit, include a zero before passing in as var
	formerFileName = "../raw_data/" + formerYearStr + "-" + formerMonthStr + " - Citi Bike trip data.csv"
	latterFileName = "../raw_data/" + latterYearStr + "-" + latterMonthStr + " - Citi Bike trip data.csv"

	# a dictionary saving the stations, get eliminated after parsing the former file
	diffStationDict = {}

	# read in all the station of the latter year first
	with open(latterFileName, "r") as lf:
		latterMonthFile = csv.DictReader(lf)
		for ride in latterMonthFile:
			if not (ride["start station id"] in diffStationDict):
				diffStationDict[ride["start station id"]] = ride["start station name"]
			if not (ride["end station id"] in diffStationDict):
				diffStationDict[ride["end station id"]] = ride["end station name"]

		# after going through all the latter file, we parse the former document
		with open(formerFileName, "r") as ff:
			formerMonthFile = csv.DictReader(ff)
			for ride in formerMonthFile:
				if ride["start station id"] in diffStationDict:
					del diffStationDict[ride["start station id"]]
				if ride["end station id"] in diffStationDict:
					del diffStationDict[ride["end station id"]]

	print json.dumps(diffStationDict, indent=4)


def getRidershipWithStationsDictInMonthFile(stationDict, monthFileName):
	# station dict is a dictionary saving all the id of stations.
	# we only count the ridership that starts from these place.
	totalCount = 0
	specificStationsCount = 0

	with open(monthFileName, "r") as f:
		monthFile = csv.DictReader(f)
		for ride in monthFile:
			totalCount += 1
			if ride["start station id"] in stationDict:
				specificStationsCount += 1


	print "the total ridership in this month are: " + str(totalCount)
	print "the ridership of the subset stations are: " + str(specificStationsCount)



def getSortedListOfStationsRidershipInMonthFile(stationDict, monthFileName):
	
	# make it all zero first
	for key in stationDict:
		stationDict[key] = 0

	with open(monthFileName, "r") as f:
		monthFile = csv.DictReader(f)
		for ride in monthFile:
			if ride["start station id"] in stationDict:
				stationDict[ride["start station id"]] += 1

		# ut.sort(key=lambda x: x.count, reverse=True)
		print json.dumps(stationDict, indent=4)


def getRidesStartingFromStation(stationId, monthFileName):

	ridesFromTheStation = []
	dayList = [0]*24

	with open(monthFileName, "r") as f:
		monthFile = csv.DictReader(f)
		for ride in monthFile:
			
			if ride["end station id"] == stationId and ride["gender"] == "2":
				ridesFromTheStation.append(ride["starttime"])
				time = ride["starttime"][ride["starttime"].find(" ") + 1: ride["starttime"].find(" ") + 3]

				dayList[int(time)] += 1
				# print ride["starttime"]

		print json.dumps(dayList, indent=4)

		# with open("../femaleRiderTimeAtSOHO.csv", "w") as oF:
		# 	print "numbers of rides: " + str(len(ridesFromTheStation)) 
		# 	fieldnames = ['starttime']
		# 	writer = csv.DictWriter(oF, fieldnames=fieldnames)
		# 	writer.writeheader()

		# 	for obj in ridesFromTheStation:
		# 		writer.writerow({'starttime': obj})



sepNewStationsDict = {
    "3141": "1 Ave & E 68 St", 
    "3142": "1 Ave & E 62 St", 
    "3147": "E 85 St & 3 Ave", 
    "3150": "E 85 St & York Ave", 
    "3156": "E 72 St & York Ave", 
    "3159": "W 67 St & Broadway", 
    "3085": "Roebling St & N 4 St", 
    "3080": "S 4 St & Rodney St", 
    "3082": "Hope St & Union Ave", 
    "3140": "1 Ave & E 78 St", 
    "3144": "E 81 St & Park Ave", 
    "3145": "E 84 St & Park Ave", 
    "3146": "E 81 St & 3 Ave", 
    "3148": "E 84 St & 1 Ave", 
    "3149": "E 82 St & 2 Ave", 
    "3232": "Bond St & Fulton St", 
    "3230": "Penn Station Valet", 
    "3231": "E 67 St & Park Ave", 
    "3178": "Riverside Dr & W 78 St", 
    "3170": "W 84 St & Columbus Ave", 
    "3135": "E 75 St & 3 Ave", 
    "3134": "3 Ave & E 62 St", 
    "3226": "W 82 St & Central Park West", 
    "3221": "47 Ave & 31 St", 
    "3137": "5 Ave & E 73 St", 
    "3132": "E 59 St & Madison Ave", 
    "3139": "E 72 St & Park Ave", 
    "3169": "Riverside Dr & W 82 St", 
    "3166": "Riverside Dr & W 72 St ", 
    "3167": "Amsterdam Ave & W 73 St", 
    "3172": "W 74 St & Columbus Ave", 
    "3163": "Central Park West & W 68 St", 
    "3160": "Central Park West & W 76 St", 
    "3177": "W 84 St & Broadway", 
    "3176": "W 64 St & West End Ave", 
    "3136": "5 Ave & E 63 St", 
    "3175": "W 70 St & Amsterdam Ave"
}

sepNewStationsInQueensAndBrooklynDict = {
	"3085": "Roebling St & N 4 St",
	"3082": "Hope St & Union Ave",
	"3080": "S 4 St & Rodney St",
	"3232": "Bond St & Fulton St"
}

augustNewStationsInQueensAndBrooklynDict = {
        "3092": "Berry St & N 8 St", 
        "3093": "N 6 St & Bedford Ave", 
        "3090": "N 8 St & Driggs Ave", 
        "3091": "Frost St & Meeker St", 
        "3097": "N Henry St & Richardson St", 
        "3067": "Broadway & Whipple St", 
        "3066": "Tompkins Ave & Hopkins St", 
        "3063": "Nostrand Ave & Myrtle Ave", 
        "3062": "Myrtle Ave & Marcy Ave", 
        "3061": "Throop Ave & Myrtle Ave", 
        "3060": "Willoughby Ave & Tompkins Ave", 
        "3065": "Union Ave & Wallabout St", 
        "3064": "Myrtle Ave & Lewis Ave", 
        "3069": "Lorimer St & Broadway", 
        "3068": "Humboldt St & Varet St", 
        "3119": "Vernon Blvd & 50 Ave", 
        "3118": "McGuinness Blvd & Eagle St", 
        "3117": "Franklin St & Dupont St", 
        "3115": "India St & Manhattan Ave", 
        "3114": "India St & East River", 
        "3113": "Greenpoint Ave & Manhattan Ave", 
        "3112": "Milton St & Franklin St", 
        "3111": "Norman Ave & Leonard St", 
        "3110": "Meserole Ave & Manhattan Ave", 
        "3016": "Mobile 01", 
        "3014": "E.T. Bike-In Movie Valet Station ", 
        "3088": "Union Ave & Jackson St", 
        "3084": "Devoe St & Leonard St", 
        "3087": "Metropolitan Ave & Meeker Ave", 
        "3086": "Graham Ave & Conselyea St", 
        "3081": "Graham Ave & Grand St", 
        "3083": "Bushwick Ave & Powers St", 
        "3058": "Lewis Ave & Kosciuszko St", 
        "3059": "Pulaski St & Marcus Garvey Blvd", 
        "3056": "Kosciuszko St & Nostrand Ave", 
        "3057": "Kosciuszko St & Tompkins Ave", 
        "3054": "Greene Ave & Throop Ave", 
        "3055": "Greene Ave & Nostrand Ave", 
        "3052": "Lewis Ave & Madison St", 
        "3053": "Marcy Ave & Lafayette Ave", 
        "3179": "Park Ave & Marcus Garvey Blvd", 
        "3076": "Scholes St & Manhattan Ave", 
        "3077": "Stagg St & Union Ave", 
        "3128": "21 St & 43 Ave", 
        "3129": "Queens Plaza North & Crescent St", 
        "3123": "31 St & Thomson Ave", 
        "3120": "Center Blvd\u00a0& Borden Ave", 
        "3121": "Jackson Ave & 46 Rd", 
        "3126": "44 Dr & Jackson Ave", 
        "3127": "9 St & 44 Rd", 
        "3124": "46 Ave & 5 St", 
        "3125": "45 Rd & 11 St", 
        "384": "Fulton St & Washington Ave", 
        "3181": "Soissons Landing", 
        "3182": "Yankee Ferry Terminal", 
        "3094": "Graham Ave & Withers St", 
        "3095": "Graham Ave & Herbert St", 
        "3098": "Leonard St & Bayard St", 
        "3222": "Hanson Pl & St Felix St", 
        "3130": "21 St & Queens Plaza North", 
        "3133": "E 67 St & Park Ave", 
        "3101": "N 12 St & Bedford Ave", 
        "3049": "Cambridge Pl & Gates Ave", 
        "3048": "Putnam Ave & Nostrand Ave", 
        "3041": "Kingston Ave & Herkimer St", 
        "3043": "Lewis Ave & Decatur St", 
        "3042": "Fulton St & Utica Ave", 
        "3044": "Albany Ave & Fulton St", 
        "3047": "Halsey St & Tompkins Ave", 
        "3046": "Marcus Garvey Blvd & Macon St", 
        "3050": "Putnam Ave & Throop Ave", 
        "3070": "McKibbin St & Manhattan Ave", 
        "3071": "Boerum St & Broadway", 
        "3072": "Leonard St & Boerum St", 
        "3073": "Division Ave & Hooper St", 
        "3074": "Montrose Ave & Bushwick Ave", 
        "3075": "Division Ave & Marcy Ave", 
        "3079": "Leonard St & Grand St", 
        "3108": "Nassau Ave & Russell St", 
        "3109": "Banker St & Meserole Ave", 
        "3104": "Kent Ave & N 7 St", 
        "3105": "N 15 St & Wythe Ave", 
        "3106": "Driggs Ave & N Henry St", 
        "3107": "Bedford Ave & Nassau Ave", 
        "3102": "Driggs Ave & Lorimer St", 
        "3103": "N 11 St & Wythe Ave"
    }

# syntax of merging two dictionaries
# z = x.copy()
# z.update(y)

newStationsDictInQueensAndBrooklyn = augustNewStationsInQueensAndBrooklynDict.copy()
newStationsDictInQueensAndBrooklyn.update(sepNewStationsInQueensAndBrooklynDict)

# print "number of new stations are: " + str(len(newStationsDictInQueensAndBrooklyn.keys()))
# getAddedStationBetween("2015", "07", "2015", "08")
# getRidershipWithStationsDictInMonthFile(augustNewStationsInQueensAndBrooklynDict, "../raw_data/2015-09 - Citi Bike trip data.csv")

# getSortedListOfStationsRidershipInMonthFile(newStationsDictInQueensAndBrooklyn, "../raw_data/2015-09 - Citi Bike trip data.csv")
getRidesStartingFromStation("250", "../raw_data/2015-09 - Citi Bike trip data.csv")



