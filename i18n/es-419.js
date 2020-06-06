{
    "app-title":
    {
        "MapRaid San Luis Potosí 2019"
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
        "1": "Calle",
        "2": "Calle Principal",
        "3": "Autopista",
        "4": "Rampa",
        "5": "Sendero",
        "6": "Carretera Primaria",
        "7": "Carretera Secundaria",
        "8": "Sendero 4x4 / Sin mantenimiento",
        "10": "Paseo Peatonal",
        "15": "Transbordador",
        "16": "Escaleras",
        "17": "Vía Privada",
        "18": "Vía Férrea",
        "19": "Pista de aterrizaje / Rodaje",
        "20": "Vía de Estacionamiento",
        "22": "Callejón"
    }
}

{
    "map_problems":
    {
        "types":
        {
            "1":
            {
                "title": "Segmento torcido detectado",
                "description": "La geometría vial indica giros difíciles",
                "solution": "Agrega, ajusta o borra nodos de geometría para que coincida con la forma del camino"
            },
            "2":
            {
                "title": "Segmento flotante detectado",
                "description": "El segmento no está conectado en ambos extremos",
                "solution": "Conecta el segmento en ambos extremos"
            },
            "3":
            {
                "title": "Intersección faltante detectada",
                "description": "Segmentos se cruzan al mismo nivel de camino sin tener una intersección",
                "solution": "Ajusta los segmentos a diferentes elevaciones o agrega una intersección"
            },
            "5":
            {
                "title": "Superposición de segmentos detectada",
                "description": "Dos o más segmentos se superponen",
                "solution": "Verifica que todos los segmentos están correctos. Mueve o borra según sea necesario."
            },
            "6":
            {
                "title": "Problema de enrutamiento detectado (segmento sin salida)",
                "description": "El segmento no tiene un punto de salida habilitado (todos los giros prohibidos)",
                "solution": "Habilita las flechas de giro en el nodo de intersección, o ajusta la dirección a doble sentido"
            },
            "7":
            {
                "title": "Tipo de camino inconsistente detectado",
                "description": "Segmentos que comparten el mismo nombre tienen tipo de camino distinto",
                "solution": "Revisa que el tipo de camino es el correcto para todos los segmentos con el mismo nombre"
            },
            "8":
            {
                "title": "Segmento muy corto detectado",
                "description": "El segmento tiene menos de 5 metros y no es parte de una intersección",
                "solution": "Alarga o borra el segmento"
            },
            "10":
            {
                "title": "Demasiados segmentos conectados a una intersección",
                "description": "La intersección conecta más de 5 segmentos",
                "solution": "Revisa que todas las conexiones que sean necesarias, borra las innecesarias."
            },
            "11":
            {
                "title": "Dirección de segmento inconsistente detectada",
                "description": "Segmentos con ID de segmento compartida tienen dirección de tránsito diferente",
                "solution": "Ajustar segmentos con ID de segmento compartida a la misma dirección de tránsito"
            },
            "12":
            {
                "title": "Nodos de intersección innecesarios detectados",
                "description": "Segmentos conectados tienen el mismo ID de segmento y tipo de camino",
                "solution": "Elimina nodos de intersección innecesarios"
            },
            "13":
            {
                "title": "Conexión de rampa inapropiada detectada",
                "description": "Rampa conectada a un tipo de camino que no es carretera o autopista",
                "solution": "Cambia el tipo de vía de la rampa, o el tipo de camino de los segmentos que la conectan"
            },
            "14":
            {
                "title": "Se detectó elevación vial equivocada",
                "description": "Los segmentos conectados tienen una diferencia en elevación superior a 2",
                "solution": "Ajustar la elevación para empatar el segmento conectado"
            },
            "15":
            {
                "title": "Giro brusco detectado",
                "description": "Los segmentos están conectados por giros con menos de 30 grados",
                "solution": "Ajusta o cierra giros difíciles en la intersección"
            },
            "16":
            {
                "title": "Ruta con peaje irregular detectada",
                "description": "El tipo de camino es inconsistente con el tipo recomendado para peajes",
                "solution": "Desmarca peaje o ajusta el tipo de segmento a Carretera/Autopista"
            },
            "17":
            {
                "title": "Segmento sin detalles detectado",
                "description": "Segmento requiere nombre de ciudad y/o nombre de calle",
                "solution": "Agrega el nombre de calle y nombre de ciudad para el segmento"
            },
            "19":
            {
                "title": "Se detectó un segmento irregular en la rotonda",
                "description": "Rotonda contiene segmento de doble sentido o sin dirección",
                "solution": "Ajusta la dirección del segmento para que sea consistente con la dirección de la rotonda"
            },
            "20":
            {
                "title": "Se detectó un segmento irregular en la rotonda",
                "description": "La rotonda contiene segmentos con sentido vial incorrecto",
                "solution": "Ajusta la dirección del segmento para que sea consistente con la dirección de la rotonda"
            },
            "21":
            {
                "title": "Nombre de calle incorrecto detectado",
                "description": "Nombre del segmento no coincide con la información circundante",
                "solution": "Corrige los nombres de calle de los segmentos, según sea necesario"
            },
            "22":
            {
                "title": "Callejón sin salida no válido detectado",
                "description": "Un segmento de un sólo sentido contiene un final de camino que no tiene salida habilitada",
                "solution": "Revisa los giros a los segmentos de los alrrededores o cambia la dirección a dos sentidos"
            },
            "23":
            {
                "title": "Problema de ruteo",
                "description": "Segmento con todos los giros de acceso deshabilitados, imposible rutear a través de él.",
                "solution": "Valida que al menos uno  de los segmentos conectados tienen un giro habilitado hacia el segmento"
            },
            "50":
            {
                "title": "Estacionamiento puesto como punto",
                "description": "Los estacionamientos deben ser creados como polígonos de área",
                "solution": "Convierte el área en un polígono y establece el punto de navegación cercano al segmento."
            },
            "51":
            {
                "title": "Lugar inalcanzable",
                "description": "El punto de navegación para este lugar está muy lejos del segmento más cercano.",
                "solution": "Mueve el punto de navegación más cerca del segmento."
            },
            "52":
            {
                "title": "Lugar faltante del mapa de Waze",
                "description": "Lugar faltante del mapa de Waze, crea un nuevo lugar y establece su punto de navegación cercano a un segmento.",
                "solution": "Crea un nuevo lugar y establece su punto de navegación cercano a un segmento."
            },
            "53":
            {
                "title": "Lugares no concordantes",
                "description": "Los lugares de Waze y Google no coinciden.",
                "solution": "Agrega un Lugar de Google vinculado a esta ubicación."
            },
            "70":
            {
                "title": "Lugar de Estacionamiento Faltante",
                "description": "Los conductores tienden a estacionarse alrededor de esta ubicación. Si hay un estacionamiento aquí, crea uno en el mapa. El punto de entrada debe ser marcado en la entrada del lote."
            },
            "71":
            {
                "title": "Lugar de Estacionamiento Faltante",
                "description": "Si hay un estacionamiento alrededor de estos segmentos de estacionamiento, crea uno en el mapa. El punto de entrada debe ser marcado en la entrada del lote."
            },
            "101":
            {
                "title": "Incongruencia en dirección de conducción",
                "description": "Parte de la ruta está en la dirección de conducción equivocada",
                "solution": "Cambia la dirección de conducción para que coincida con la de las rutas"
            },
            "102":
            {
                "title": "Intersección faltante",
                "description": "Los caminos están cerca entre si, sin embargo no están conectados por una intersección",
                "solution": "Arrastra la orilla de una calle para que toque la otra"
            },
            "103":
            {
                "title": "Falta calle",
                "description": "Las calles están demasiado lejanas entre si y probablemente falte una calle entre ellas",
                "solution": "Dibuja una nueva calle conectando las dos calles no conectadas"
            },
            "104":
            {
                "title": "Intersección de cruce de vías faltante",
                "description": "Los caminos se cruzan entre si, sin embargo no hay una unión en el punto de cruce",
                "solution": "Selecciona ambas vías y crea una intersección usando el ícono de intersección"
            },
            "105":
            {
                "title": "Incongruencia de tipo de vía",
                "description": "La ruta pasa por algunas vías no navegables como rieles o vías privadas",
                "solution": "Selecciona las vías no navegables y cambia su tipo"
            },
            "106":
            {
                "title": "Giro restringido podría estar permitido",
                "description": "La ruta pasa a través de un giro que está marcado como no permitido",
                "solution": "Si el giro está permitido, márcalo así, de lo contrario, escoge 'No es un problema'"
            },
            "200":
            {
                "title": "Ruta sugerida ignorada frecuentemente",
                "description": "La mayoría de los usuarios no siguieron la ruta sugerida",
                "solution": "Revisa si la ruta es premitida"
            },
            "300":
            {
                "title": "Solicitud de Cierre Vial",
                "description": "Se solicita un cierre en el segmento",
                "solution": "Crea cierres en el segmento según sea necesario"
            }
        }
    }
}

{
    "userrequest_types":
    {
        "6": "Giro incorrecto",
        "7": "Dirección incorrecta",
        "8": "Ruta incorrecta",
        "9": "Falta rotonda",
        "10": "Error general",
        "11": "Giro no permitido",
        "12": "Intersección incorrecta",
        "13": "Puente faltante",
        "14": "Instrucción de conducción incorrecta",
        "15": "Falta salida",
        "16": "Falta calle",
        "18": "Punto de Interés faltante",
        "19": "Camino bloqueado",
        "21": "Nombre de calle faltante",
        "22": "Prefijo o sufijo de calle incorrecto",
        "23": "Falta límite de velocidad o es inválido"
    }
}

{
    "place_categories":
    {
        "CAR_SERVICES": "Servicios de vehículos",
        "GAS_STATION": "Gasolinera",
        "PARKING_LOT": "Estacionamiento",
        "GARAGE_AUTOMOTIVE_SHOP": "Taller / Tienda Automotriz",
        "CAR_WASH": "Lavado de autos",
        "TRANSPORTATION": "Transporte",
        "AIRPORT": "Aeropuerto",
        "BUS_STATION": "Estación de Autobuses",
        "FERRY_PIER": "Muelle de Transbordador/Ferry",
        "SEAPORT_MARINA_HARBOR": "Puerto Marítimo / Marina / Bahía",
        "SUBWAY_STATION": "Estación de Subterraneo",
        "TRAIN_STATION": "Estación de Tren",
        "BRIDGE": "Puente",
        "TUNNEL": "Túnel",
        "TAXI_STATION": "Parada de Taxis",
        "JUNCTION_INTERCHANGE": "Intersección / Intercambio",
        "PROFESSIONAL_AND_PUBLIC": "Profesional y público",
        "COLLEGE_UNIVERSITY": "Universidad",
        "SCHOOL": "Escuela / Centro Educativo",
        "CONVENTIONS_EVENT_CENTER": "Centro de Eventos / Convenciones",
        "GOVERNMENT": "Gobierno",
        "LIBRARY": "Biblioteca",
        "CITY_HALL": "Municipalidad / Ayuntamiento",
        "ORGANIZATION_OR_ASSOCIATION": "Organización o Asociación",
        "PRISON_CORRECTIONAL_FACILITY": "Cárcel / Correccional",
        "COURTHOUSE": "Juzgado",
        "CEMETERY": "Cementerio",
        "FIRE_DEPARTMENT": "Bomberos",
        "POLICE_STATION": "Estación de Policía",
        "MILITARY": "Militar",
        "HOSPITAL_URGENT_CARE": "Hospital / Atención de Urgencias",
        "DOCTOR_CLINIC": "Médico / Clínica",
        "OFFICES": "Oficinas",
        "POST_OFFICE": "Oficina de Correos",
        "RELIGIOUS_CENTER": "Centro Religioso",
        "KINDERGARDEN": "Jardín de Niños",
        "FACTORY_INDUSTRIAL": "Fábrica / Industria",
        "EMBASSY_CONSULATE": "Embajada / Consulado",
        "INFORMATION_POINT": "Punto de Información",
        "SHOPPING_AND_SERVICES": "Tiendas y servicios",
        "ARTS_AND_CRAFTS": "Arte y Artesanías",
        "BANK_FINANCIAL": "Banco / Financiera",
        "SPORTING_GOODS": "Artículos Deportivos",
        "BOOKSTORE": "Librería",
        "PHOTOGRAPHY": "Fotografía",
        "CAR_DEALERSHIP": "Concesionario de automóviles",
        "FASHION_AND_CLOTHING": "Moda y Vestimenta",
        "CONVENIENCE_STORE": "Tienda de Conveniencia",
        "PERSONAL_CARE": "Cuidado Personal",
        "DEPARTMENT_STORE": "Tienda Departamental",
        "PHARMACY": "Farmacia",
        "ELECTRONICS": "Electrónica",
        "FLOWERS": "Flores",
        "FURNITURE_HOME_STORE": "Muebles / Artículos del Hogar",
        "GIFTS": "Regalos",
        "GYM_FITNESS": "Gimnasio / Condición Física",
        "SWIMMING_POOL": "Piscina",
        "HARDWARE_STORE": "Ferretería",
        "MARKET": "Mercado",
        "SUPERMARKET_GROCERY": "Supermercado / Abarrotes",
        "JEWELRY": "Joyería",
        "LAUNDRY_DRY_CLEAN": "Lavandería / Tintorería",
        "SHOPPING_CENTER": "Centro Comercial",
        "MUSIC_STORE": "Tienda de Música",
        "PET_STORE_VETERINARIAN_SERVICES": "Tienda de Mascotas / Servicios Veterinarios",
        "TOY_STORE": "Juguetería",
        "TRAVEL_AGENCY": "Agencia de Viajes",
        "ATM": "Cajero Automático",
        "CURRENCY_EXCHANGE": "Casa de Cambio",
        "CAR_RENTAL": "Alquiler de Automóviles",
        "FOOD_AND_DRINK": "Comida y Bebida",
        "RESTAURANT": "Restaurante",
        "BAKERY": "Panadería",
        "DESSERT": "Postre",
        "CAFE": "Cafetería",
        "FAST_FOOD": "Comida Rápida",
        "FOOD_COURT": "Área de Comidas",
        "BAR": "Bar",
        "ICE_CREAM": "Helado",
        "CULTURE_AND_ENTERTAINEMENT": "Cultura y Entretenimiento",
        "ART_GALLERY": "Galería de Arte",
        "CASINO": "Casino",
        "CLUB": "Club nocturno / Discoteca",
        "TOURIST_ATTRACTION_HISTORIC_SITE": "Atracción Turística / Sitio Histórico",
        "MOVIE_THEATER": "Cine",
        "MUSEUM": "Museo",
        "MUSIC_VENUE": "Lugar de Música",
        "PERFORMING_ARTS_VENUE": "Lugar de Artes Escénicas",
        "GAME_CLUB": "Club social / Sala de juegos",
        "STADIUM_ARENA": "Estadio / Arena",
        "THEME_PARK": "Parque Temático",
        "ZOO_AQUARIUM": "Zoológico / Acuario",
        "RACING_TRACK": "Pista de Carreras",
        "THEATER": "Teatro",
        "OTHER": "Otro",
        "RESIDENCE_HOME": "Residencia / Casa",
        "CONSTRUCTION_SITE": "Sitio de Construcción",
        "LODGING": "Alojamiento",
        "HOTEL": "Hotel",
        "HOSTEL": "Hostal",
        "CAMPING_TRAILER_PARK": "Parque de Acampar / Remolques",
        "COTTAGE_CABIN": "Cabaña / Casa de Campo",
        "BED_AND_BREAKFAST": "Bed & Breakfast",
        "OUTDOORS": "Exteriores",
        "PARK": "Parque",
        "PLAYGROUND": "Patio de Juegos",
        "BEACH": "Playa",
        "SPORTS_COURT": "Cancha Deportiva",
        "GOLF_COURSE": "Campo de Golf",
        "PLAZA": "Plaza",
        "PROMENADE": "Paseo marítimo",
        "POOL": "Estanque",
        "SCENIC_LOOKOUT_VIEWPOINT": "Mirador / Punto Panorámico",
        "SKI_AREA": "Área de Esquí",
        "NATURAL_FEATURES": "Características Naturales",
        "ISLAND": "Isla",
        "SEA_LAKE_POOL": "Mar / Lago / Laguna",
        "RIVER_STREAM": "Río / Arroyo",
        "FOREST_GROVE": "Bosque / Arboleda",
        "FARM": "Granja",
        "CHARGING_STATION": "Estación de Recarga",
        "CANAL": "Canal",
        "SWAMP_MARSH": "Pantano / Marisma",
        "DAM": "Presa",
        "EMERGENCY_SHELTER": "Refugio de Emergencia",
        "REST_AREAS": "Área de descanso",
        "TRASH_AND_RECYCLING_FACILITIES": "Centro de reciclaje",
        "TELECOM": "Telecomunicaciones",
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
                "IMAGE": "Foto denunciada",
                "VENUE": "Lugar denunciado"
            },
            "title":
            {
                "MAIN_TITLE": "Solicitud de actualización de lugar",
                "ADD_VENUE": "Nuevo lugar",
                "DELETE_VENUE": "Lugar eliminado",
                "UPDATE_VENUE": "Nuevos detalles del lugar",
                "ADD_IMAGE": "Nueva foto"
            }
        }
    }
}