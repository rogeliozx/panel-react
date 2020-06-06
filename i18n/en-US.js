{
    "app-title":
    {
        "Texas MapRaid 2019"
    }
}

{
    "env":
    {
        "NA"
    }
}

{
    "road_types":
    {
        "1": "Local Street",
        "2": "Primary Street",
        "3": "Freeway (Interstate / Other)",
        "4": "Ramp",
        "5": "Routable Pedestrian Path",
        "6": "Major Highway",
        "7": "Minor Highway",
        "8": "Off-road / Not maintained",
        "10": "Non-Routable Pedestrian Path",
        "15": "Ferry",
        "16": "Stairway",
        "17": "Private Road",
        "18": "Railroad",
        "19": "Runway",
        "20": "Parking Lot Road",
        "22": "Passageway"
    }
}

{
    "map_problems":
    {
        "types":
        {
            "1":
            {
                "title": "Segment with abnormal geometry detected",
                "description": "The segment geometry appears to contain too many sharp angles which is not normal in road design.",
                "solution": "Modify the geometry of the segment to remove sharp angles and to better match the actual road shape."
            },
            "2":
            {
                "title": "Segment with no connections detected",
                "description": "Segment is not connected at both ends",
                "solution": "Connect segment on at least one end."
            },
            "3":
            {
                "title": "Missing junction detected",
                "description": "Segments at the same elevation cross without a junction",
                "solution": "Adjust elevation or add a junction."
            },
            "5":
            {
                "title": "Overlapping segments detected",
                "description": "Two or more segments overlap",
                "solution": "Check that all segments are correct. Move or delete as necessary."
            },
            "6":
            {
                "title": "Routing problem detected (segment with no exit)",
                "description": "All turns from this segment are restricted",
                "solution": "Allow outbound turns, or possibly the segment needs to be set to two-way.."
            },
            "7":
            {
                "title": "Inconsistent road type detected",
                "description": "Segments with the same name have different road types",
                "solution": "Verify road type is correct for all segments with this street name."
            },
            "8":
            {
                "title": "Short segment detected",
                "description": "Segment is less than 5 meters and not part of a junction",
                "solution": "Make the segment at least 5m long or delete it."
            },
            "10":
            {
                "title": "Junction with more than 5 connected segments detected",
                "description": "There are more than 5 segments connected to this single junction",
                "solution": "Verify that all segments are required at this junction, and delete any which are unnecessary."
            },
            "11":
            {
                "title": "Inconsistent segment direction detected",
                "description": "Segments with the same name have different traffic direction",
                "solution": "Verify that segments with the same name have the correction direction, and change as necessary."
            },
            "12":
            {
                "title": "Unnecessary junctions detected",
                "description": "These two segments appear identical and are have a junction between them.",
                "solution": "If the junction is not needed and the segments have the same speed limit, delete it."
            },
            "13":
            {
                "title": "Improper ramp connection detected",
                "description": "This ramp is connected to a road type other than Freeway or Highway",
                "solution": "Change ramp road type to the same as the type of connected segments."
            },
            "14":
            {
                "title": "Wrong road elevation detected",
                "description": "Connected segments should be within 2 elevation levels of each other.",
                "solution": "Adjust the elevations of connected segments to be within 2 levels of each other."
            },
            "15":
            {
                "title": "Very sharp turn detected",
                "description": "Segments are connected by a turn that is less than 30 degrees",
                "solution": "Verify and adjust the angle at which these segments meet, or restrict the turns between them."
            },
            "16":
            {
                "title": "Irregular toll road detected",
                "description": "Toll roads should be a Freeway or Highway road type.",
                "solution": "Remove the Toll Road option for these segments, or adjust the road type. You must also follow local guidelines for road types."
            },
            "17":
            {
                "title": "Segment without details detected",
                "description": "Segments require a name, city, state, and country",
                "solution": "Enter and apply the segment name, city, state and country."
            },
            "19":
            {
                "title": "Irregular roundabout segment detected",
                "description": "This roundabout contains a two-way or no-direction segment",
                "solution": "Verify the segment direction and adjust as necessary to be consistent across all roundabout segments."
            },
            "20":
            {
                "title": "Irregular roundabout segment detected",
                "description": "This roundabout contains a segment with an incorrect road direction",
                "solution": "Verify the segment direction and adjust as necessary to be consistent across all roundabout segments."
            },
            "21":
            {
                "title": "Wrong street name detected",
                "description": "The name of this segment does not match those around it",
                "solution": "Verify and correct street names as necessary."
            },
            "22":
            {
                "title": "Invalid dead end detected",
                "description": "This dead-end segment is set to one-way.",
                "solution": "All dead-end segments should be set to two-way. Change and save again."
            },
            "23":
            {
                "title": "Routing problem",
                "description": "All turns disabled into segment, impossible to route through.",
                "solution": "Validate that at least one of the connected segments has an enabled turn to the segment."
            },
            "50":
            {
                "title": "Parking Lot set as a Point",
                "description": "Parking Lot Place should be Area type",
                "solution": "Change to an Area and set navigation point close to a driveable segment"
            },
            "51":
            {
                "title": "Place not reachable",
                "description": "Navigation point for this Place is too far from the nearest segment.",
                "solution": "Move navigation point closer to a routeable segment."
            },
            "52":
            {
                "title": "Place missing from Waze map",
                "description": "Place missing from Waze map. Create a new place and set the navigation point close to the segment.",
                "solution": "Create a new place and set the navigation point close to the segment."
            },
            "53":
            {
                "title": "Unmatched Places",
                "description": "Waze and Google Places are too far apart.",
                "solution": "Link this Waze Place to a Google Place (L3+ editors)"
            },
            "70":
            {
                "title": "Missing Parking Lot Place",
                "description": "Drivers tend to park around this location. If there's a parking lot here, create one on the map. Entry point should be marked at the lot entrance."
            },
            "71":
            {
                "title": "Missing Parking Lot Place",
                "description": "If there's a parking lot around these parking-lot-road segments, create one on the map. Entry point should be marked at the lot entrance."
            },
            "101":
            {
                "title": "Driving direction mismatch",
                "description": "Drivers appear to be driving against the one-way direction of one or more segments.",
                "solution": "Determine if the Waze map is incorrect and update segment directionality as required."
            },
            "102":
            {
                "title": "Missing junction",
                "description": "The roads are close to each other, but they are not connected by a junction node",
                "solution": "Determine whether the roads actually intersect, and connect them as needed"
            },
            "103":
            {
                "title": "Missing road",
                "description": "Wazers appear to be driving between two roads, and there could be a road missing in between",
                "solution": "If a road really is missing, draw a new road connecting the two segments"
            },
            "104":
            {
                "title": "Crossing roads with no junction node",
                "description": "The roads cross each other, but there is no junction node at the intersection point",
                "solution": "If the roads do actually intersect, select them both and click the button which appears above the intersection to create a junction node. If they do not intersect, then adjust the Elevation of at least one segment"
            },
            "105":
            {
                "title": "Road type mismatch",
                "description": "Wazers' drives appear to go through some unnavigable roads types, such as railroad or walking trail",
                "solution": "Determine if the route is accurate and change road type on segments as necessary. Ignore this error if the Waze route is not accurately located"
            },
            "106":
            {
                "title": "Disallowed turn might be allowed",
                "description": "The route goes through a turn which is marked as not allowed",
                "solution": "If the turn is allowed, set it as Allowed. Otherwise, choose 'Not identified'"
            },
            "200":
            {
                "title": "Suggested route frequently ignored",
                "description": "Many Wazers do not follow the suggested route in this area",
                "solution": "Check along the route ahead, including alternate routes, and determine if there is a map error which is causing the drivers to deviate from the suggested route"
            },
            "300":
            {
                "title": "Road Closure Request",
                "description": "A closure is requested on this segment.",
                "solution": "Create closures on this segment as needed"
            }
        }
    }
}

{
    "userrequest_types":
    {
        "6": "Incorrect turn",
        "7": "Incorrect address",
        "8": "Incorrect route",
        "9": "Missing roundabout",
        "10": "General error",
        "11": "Turn not allowed",
        "12": "Incorrect junction",
        "13": "Missing bridge overpass",
        "14": "Improper / Poor navigation instructions",
        "15": "Missing exit",
        "16": "Missing road",
        "18": "Missing Place",
        "19": "Closed road",
        "21": "Missing street name",
        "22": "Incorrect street prefix or suffix",
        "23": "Missing or invalid speed limit"
    }
}
}

{
    "place_categories":
    {
        "CAR_SERVICES": "Car Services",
        "GAS_STATION": "Gas Station",
        "PARKING_LOT": "Parking Lot",
        "GARAGE_AUTOMOTIVE_SHOP": "Garage / Auto Shop",
        "CAR_WASH": "Car Wash",
        "TRANSPORTATION": "Transportation",
        "AIRPORT": "Airport",
        "BUS_STATION": "Bus Station",
        "FERRY_PIER": "Ferry Pier",
        "SEAPORT_MARINA_HARBOR": "Seaport / Marina / Harbor",
        "SUBWAY_STATION": "Subway Station",
        "TRAIN_STATION": "Train Station",
        "BRIDGE": "Bridge",
        "TUNNEL": "Tunnel",
        "TAXI_STATION": "Taxi Station",
        "JUNCTION_INTERCHANGE": "Junction / Interchange",
        "PROFESSIONAL_AND_PUBLIC": "Professional and Public",
        "COLLEGE_UNIVERSITY": "College / University",
        "SCHOOL": "School",
        "CONVENTIONS_EVENT_CENTER": "Conventions / Event Center",
        "GOVERNMENT": "Government",
        "LIBRARY": "Library",
        "CITY_HALL": "City Hall",
        "ORGANIZATION_OR_ASSOCIATION": "Organization / Association",
        "PRISON_CORRECTIONAL_FACILITY": "Jail / Prison / Correctional Facility",
        "COURTHOUSE": "Courthouse",
        "CEMETERY": "Cemetery",
        "FIRE_DEPARTMENT": "Fire Department",
        "POLICE_STATION": "Police Station",
        "MILITARY": "Military",
        "HOSPITAL_URGENT_CARE": "Hospital / Urgent Care",
        "DOCTOR_CLINIC": "Doctor / Clinic",
        "OFFICES": "Offices",
        "POST_OFFICE": "Post Office",
        "RELIGIOUS_CENTER": "Religious Center",
        "KINDERGARDEN": "Preschool / Daycare",
        "FACTORY_INDUSTRIAL": "Factory / Industrial",
        "EMBASSY_CONSULATE": "Embassy / Consulate",
        "INFORMATION_POINT": "Information Point",
        "SHOPPING_AND_SERVICES": "Shopping / Services",
        "ARTS_AND_CRAFTS": "Arts & Crafts",
        "BANK_FINANCIAL": "Bank / Financial",
        "SPORTING_GOODS": "Sporting Goods",
        "BOOKSTORE": "Bookstore",
        "PHOTOGRAPHY": "Photography",
        "CAR_DEALERSHIP": "Car Dealership",
        "FASHION_AND_CLOTHING": "Clothing / Fashion",
        "CONVENIENCE_STORE": "Convenience Store",
        "PERSONAL_CARE": "Personal Care",
        "DEPARTMENT_STORE": "Department Store",
        "PHARMACY": "Pharmacy",
        "ELECTRONICS": "Electronics",
        "FLOWERS": "Florist",
        "FURNITURE_HOME_STORE": "Home Furnishing",
        "GIFTS": "Gift Shop",
        "GYM_FITNESS": "Gym / Fitness",
        "SWIMMING_POOL": "Swimming Pool",
        "HARDWARE_STORE": "Hardware Store",
        "MARKET": "Market",
        "SUPERMARKET_GROCERY": "Supermarket / Grocery",
        "JEWELRY": "Jewelry",
        "LAUNDRY_DRY_CLEAN": "Laundromat / Dry Cleaner",
        "SHOPPING_CENTER": "Shopping Center",
        "MUSIC_STORE": "Music Store",
        "PET_STORE_VETERINARIAN_SERVICES": "Pet Store / Veterinarian Services",
        "TOY_STORE": "Toy Store",
        "TRAVEL_AGENCY": "Travel Agency",
        "ATM": "ATM",
        "CURRENCY_EXCHANGE": "Currency Exchange",
        "CAR_RENTAL": "Car Rental",
        "FOOD_AND_DRINK": "Food and Drink",
        "RESTAURANT": "Restaurant",
        "BAKERY": "Bakery",
        "DESSERT": "Dessert",
        "CAFE": "Coffee Shop",
        "FAST_FOOD": "Fast Food",
        "FOOD_COURT": "Food Court",
        "BAR": "Bar / Winery / Tasting Room",
        "ICE_CREAM": "Ice Cream",
        "CULTURE_AND_ENTERTAINEMENT": "Culture / Entertainment",
        "ART_GALLERY": "Art Gallery",
        "CASINO": "Casino",
        "CLUB": "Club",
        "TOURIST_ATTRACTION_HISTORIC_SITE": "Tourist Attraction / Historic Site",
        "MOVIE_THEATER": "Movie Theater",
        "MUSEUM": "Museum",
        "MUSIC_VENUE": "Music Venue",
        "PERFORMING_ARTS_VENUE": "Performing Arts Venue",
        "GAME_CLUB": "Game Club",
        "STADIUM_ARENA": "Stadium / Arena",
        "THEME_PARK": "Theme Park",
        "ZOO_AQUARIUM": "Zoo / Aquarium",
        "RACING_TRACK": "Race Track",
        "THEATER": "Theater",
        "OTHER": "Other",
        "RESIDENCE_HOME": "Residence / Home",
        "CONSTRUCTION_SITE": "Construction Site",
        "LODGING": "Lodging",
        "HOTEL": "Hotel",
        "HOSTEL": "Hostel",
        "CAMPING_TRAILER_PARK": "Campground / RV Park",
        "COTTAGE_CABIN": "Cottage / Cabin",
        "BED_AND_BREAKFAST": "Bed & Breakfast",
        "OUTDOORS": "Outdoors",
        "PARK": "Park",
        "PLAYGROUND": "Playground",
        "BEACH": "Beach",
        "SPORTS_COURT": "Sports Court",
        "GOLF_COURSE": "Golf Course",
        "PLAZA": "Plaza",
        "PROMENADE": "Promenade",
        "POOL": "Pool",
        "SCENIC_LOOKOUT_VIEWPOINT": "Scenic Overlook",
        "SKI_AREA": "Ski Area",
        "NATURAL_FEATURES": "Natural Feature",
        "ISLAND": "Island",
        "SEA_LAKE_POOL": "Sea / Lake / Pond",
        "RIVER_STREAM": "River / Stream",
        "FOREST_GROVE": "Forest / Grove",
        "FARM": "Farm",
        "CHARGING_STATION": "EV Charging Station",
        "CANAL": "Canal",
        "SWAMP_MARSH": "Swamp / Marsh",
        "DAM": "Dam",
        "EMERGENCY_SHELTER": "Emergency Shelter",
        "REST_AREAS": "Rest Area",
        "TRASH_AND_RECYCLING_FACILITIES": "Landfill / Recycling Facility",
        "TELECOM": "Cell Phones",
        "CARPOOL_SPOT": "Carpool Spot"
    }
}

{
    "place_update_requests":
    {
        "panel":
        {
            "flag_title":
            {
                "IMAGE": "Flagged picture",
                "VENUE": "Flagged place"
            },
            "title":
            {
                "MAIN_TITLE": "Place Update Request",
                "ADD_VENUE": "New place",
                "DELETE_VENUE": "Removed place",
                "UPDATE_VENUE": "New details for place",
                "ADD_IMAGE": "New picture"
            }
        }
    }
}