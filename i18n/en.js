{
    "app-title":
    {
        "Puerto Rico MapRaid 2019"
    }
}

{
    "env":
    {
        "ROW"
    }
}

{
    "road_types":
    {
        "1": "Street",
        "2": "Primary Street",
        "3": "Freeway",
        "4": "Ramp",
        "5": "Walking Trail",
        "6": "Major Highway",
        "7": "Minor Highway",
        "8": "Off-road / Not maintained",
        "10": "Pedestrian Boardwalk",
        "15": "Ferry",
        "16": "Stairway",
        "17": "Private Road",
        "18": "Railroad",
        "19": "Runway/Taxiway",
        "20": "Parking Lot Road",
        "22": "Narrow Street"
    },
}

{
    "map_problems":
    {
        "types":
        {
            "1":
            {
                "title": "Crooked segment detected",
                "description": "Road geometry indicates difficult turns",
                "solution": "Add, adjust, or delete geometry nodes to match road shape"
            },
            "2":
            {
                "title": "Floating segment detected",
                "description": "Segment is not connected on both sides",
                "solution": "Connect segment on both ends"
            },
            "3":
            {
                "title": "Missing junction detected",
                "description": "Segments crossing at same road level without junction present",
                "solution": "Adjust segments to different road levels, or add a junction"
            },
            "5":
            {
                "title": "Overlapping segments detected",
                "description": "Two or more segments overlap",
                "solution": "Check that all segments are correct. Move or delete as needed."
            },
            "6":
            {
                "title": "Routing problem detected (unexitable segment)",
                "description": "Segment does not have an allowed exit point (all turns closed)",
                "solution": "Open turn arrows at junction node, or adjust road direction to two-way"
            },
            "7":
            {
                "title": "Inconsistent road type detected",
                "description": "Segments with shared street name have different road type",
                "solution": "Check road type is correct for all segments with this street name"
            },
            "8":
            {
                "title": "Short segment detected",
                "description": "Segment is less than 5 meters and not part of a junction",
                "solution": "Either lengthen or delete segment"
            },
            "10":
            {
                "title": "Too many segments connecting at junction detected",
                "description": "Junction connects more than 5 segments",
                "solution": "Check that all connections are needed, delete any unnecessary."
            },
            "11":
            {
                "title": "Inconsistent segment direction detected",
                "description": "Segments with shared street ID have different traffic direction",
                "solution": "Adjust segments with shared street ID to same road direction"
            },
            "12":
            {
                "title": "Unnecessary junction nodes detected",
                "description": "Connected segments have same street ID and road type",
                "solution": "Delete unnecessary junction nodes"
            },
            "13":
            {
                "title": "Improper ramp connection detected",
                "description": "Ramp connected to road type other than highway/freeway",
                "solution": "Change ramp road type, or connecting segments road type"
            },
            "14":
            {
                "title": "Wrong road level detected",
                "description": "Connected segments have difference in road level greater than 2",
                "solution": "Adjust road level to match the connecting segment"
            },
            "15":
            {
                "title": "Sharp turn detected",
                "description": "Segments are connected by a turn that’s less than 30 degrees",
                "solution": "Adjust or close difficult turns at junction"
            },
            "16":
            {
                "title": "Irregular toll road detected",
                "description": "Road type is inconsistent with type recommended for toll roads",
                "solution": "Uncheck toll road or adjust segment type to Highway/Freeway"
            },
            "17":
            {
                "title": "Segment without details detected",
                "description": "Segment requires city and/or street name",
                "solution": "Set street and city name for segment"
            },
            "19":
            {
                "title": "Irregular roundabout segment detected",
                "description": "Roundabout contains two way or no direction segment",
                "solution": "Adjust segment direction to be consistent with roundabout direction"
            },
            "20":
            {
                "title": "Irregular roundabout segment detected",
                "description": "Roundabout contains segment with incorrect road direction",
                "solution": "Adjust segment direction to be consistent with roundabout direction"
            },
            "21":
            {
                "title": "Wrong street name detected",
                "description": "Segment street name does not match surrounding information",
                "solution": "Correct street names for segments, as needed"
            },
            "22":
            {
                "title": "Invalid dead end detected",
                "description": "One way segment contains a dead end with no allowed exit",
                "solution": "Check that nearby segments should not be connected or change road direction to two way"
            },
            "23":
            {
                "title": "Routing problem",
                "description": "All turns closed into segment, impossible to route through.",
                "solution": "Validate that at least one of the connected segments have an open turn to the segment."
            },
            "50":
            {
                "title": "Parking Lot input as point",
                "description": "Parking Lot should be input as area polygon",
                "solution": "Convert to area polygon and set navigation point close to segment"
            },
            "51":
            {
                "title": "Place not reachable",
                "description": "Navigation point for this Place is too far from the nearest segment.",
                "solution": "Move navigation point closer to segment."
            },
            "52":
            {
                "title": "Place missing from Waze map",
                "description": "Place missing from Waze map, create a new place and set navigation point close to segment.",
                "solution": "Create a new place and set navigation point close to segment."
            },
            "53":
            {
                "title": "Unmatched Places",
                "description": "Waze and Google Places are not matched.",
                "solution": "Add a linked Google Place to this location."
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
                "description": "Part of the route is in the wrong driving direction",
                "solution": "Change the driving direction to match that of the routes"
            },
            "102":
            {
                "title": "Missing junction",
                "description": "The roads are close to each other, however, they are not connected by a junction",
                "solution": "Drag the edge of one road so that it touches the other"
            },
            "103":
            {
                "title": "Missing road",
                "description": "The roads are too far apart from each other and most likely a road is missing in between",
                "solution": "Draw a new road connecting the two disconnected roads"
            },
            "104":
            {
                "title": "Cross roads junction missing",
                "description": "The roads intersect each other, however, there is no junction in the intersection point",
                "solution": "Select both roads and create a junction by clicking the junction icon"
            },
            "105":
            {
                "title": "Road type mismatch",
                "description": "The route goes through some unnavigable roads such as rails or private roads",
                "solution": "Select the unnavigable roads and change its type"
            },
            "106":
            {
                "title": "Restricted turn might be allowed",
                "description": "The route goes through a turn which is marked as not allowed",
                "solution": "If the turn is allowed, mark it as such, otherwise, choose 'Not identified'"
            },
            "200":
            {
                "title": "Suggested route frequently ignored",
                "description": "Most users did not follow the suggested route",
                "solution": "Check whether the route is allowed"
            },
            "300":
            {
                "title": "Road Closure Request",
                "description": "A closure is requested on the segment",
                "solution": "Create closures on the segment as needed"
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
        "14": "Wrong driving direction",
        "15": "Missing exit",
        "16": "Missing road",
        "18": "Missing landmark",
        "19": "Blocked road",
        "21": "Missing street name",
        "22": "Incorrect street prefix or suffix",
        "23": "Missing or invalid speed limit"
    }
}

{
    "place_categories":
    {
        "CAR_SERVICES": "Car services",
        "GAS_STATION": "Gas Station",
        "PARKING_LOT": "Parking Lot",
        "GARAGE_AUTOMOTIVE_SHOP": "Garage / Automotive Shop",
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
        "PROFESSIONAL_AND_PUBLIC": "Professional and public",
        "COLLEGE_UNIVERSITY": "College / University",
        "SCHOOL": "School",
        "CONVENTIONS_EVENT_CENTER": "Conventions / Event Center",
        "GOVERNMENT": "Government",
        "LIBRARY": "Library",
        "CITY_HALL": "City Hall",
        "ORGANIZATION_OR_ASSOCIATION": "Organization or Association",
        "PRISON_CORRECTIONAL_FACILITY": "Prison / Correctional Facility",
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
        "KINDERGARDEN": "Kindergarten",
        "FACTORY_INDUSTRIAL": "Factory / Industrial",
        "EMBASSY_CONSULATE": "Embassy / Consulate",
        "INFORMATION_POINT": "Information Point",
        "SHOPPING_AND_SERVICES": "Shopping and services",
        "ARTS_AND_CRAFTS": "Arts & Crafts",
        "BANK_FINANCIAL": "Bank / Financial",
        "SPORTING_GOODS": "Sporting Goods",
        "BOOKSTORE": "Bookstore",
        "PHOTOGRAPHY": "Photography",
        "CAR_DEALERSHIP": "Car Dealership",
        "FASHION_AND_CLOTHING": "Fashion and Clothing",
        "CONVENIENCE_STORE": "Convenience Store",
        "PERSONAL_CARE": "Personal Care",
        "DEPARTMENT_STORE": "Department Store",
        "PHARMACY": "Pharmacy",
        "ELECTRONICS": "Electronics",
        "FLOWERS": "Flowers",
        "FURNITURE_HOME_STORE": "Furniture / Home Store",
        "GIFTS": "Gifts",
        "GYM_FITNESS": "Gym / Fitness",
        "SWIMMING_POOL": "Swimming Pool",
        "HARDWARE_STORE": "Hardware Store",
        "MARKET": "Market",
        "SUPERMARKET_GROCERY": "Supermarket / Grocery",
        "JEWELRY": "Jewelry",
        "LAUNDRY_DRY_CLEAN": "Laundry / Dry Clean",
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
        "CAFE": "Coffee shop",
        "FAST_FOOD": "Fast Food",
        "FOOD_COURT": "Food Court",
        "BAR": "Bar",
        "ICE_CREAM": "Ice Cream",
        "CULTURE_AND_ENTERTAINEMENT": "Culture & entertainment",
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
        "RACING_TRACK": "Racing Track",
        "THEATER": "Theater",
        "OTHER": "Other",
        "RESIDENCE_HOME": "Residence / Home",
        "CONSTRUCTION_SITE": "Construction Site",
        "LODGING": "Lodging",
        "HOTEL": "Hotel",
        "HOSTEL": "Hostel",
        "CAMPING_TRAILER_PARK": "Camping / Trailer Park",
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
        "SCENIC_LOOKOUT_VIEWPOINT": "Scenic Lookout / Viewpoint",
        "SKI_AREA": "Ski Area",
        "NATURAL_FEATURES": "Natural Features",
        "ISLAND": "Island",
        "SEA_LAKE_POOL": "Sea / Lake / Pool",
        "RIVER_STREAM": "River / Stream",
        "FOREST_GROVE": "Forest / Grove",
        "FARM": "Farm",
        "CHARGING_STATION": "Charging Station",
        "CANAL": "Canal",
        "SWAMP_MARSH": "Swamp / Marsh",
        "DAM": "Dam",
        "EMERGENCY_SHELTER": "Emergency Shelter",
        "REST_AREAS": "Rest area",
        "TRASH_AND_RECYCLING_FACILITIES": "Trash & recycling facility",
        "TELECOM": "Telecom",
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
                "VENUE": "Flagged Place"
            },
            "title":
            {
                "MAIN_TITLE": "Place update request",
                "ADD_VENUE": "New Place",
                "DELETE_VENUE": "Removed Place",
                "UPDATE_VENUE": "New details for Place",
                "ADD_IMAGE": "New picture"
            }
        }
    }
}