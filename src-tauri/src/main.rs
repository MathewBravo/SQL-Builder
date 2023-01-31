#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use rand::Rng;
use bcrypt::{DEFAULT_COST, hash};
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command


fn get_prop_type(seed: usize) -> String {
    let prop_types: [&str; 6] = ["Residential", "Condo/Strata", "Multi Family", "Single Family", "Town House", "Farmland"];
    format!("{}", prop_types[seed])
}

fn get_parking_type(seed: usize) -> String {
    let prop_types: [&str; 5] = ["Garage", "Driveway", "Communal Uncovered", "Communal Garage", "None"];
    format!("{}", prop_types[seed])
}

fn get_build_type(seed: usize) -> String {
    let build_types: [&str; 11] = ["House", "Row / TownHouse", "Apartment", "Duplex", "Triplex", "Fourplex", "Garden Home", "Mobile Home", "Manufactured Home/Mobile", "Floathome", "Commercial"];
    format!("{}", build_types[seed])
}

fn get_community_name(seed: usize) -> String {
    let community_names: [&str; 140] = ["Agincourt North", "Agincourt South-Malvern West", "Alderwood", "Annex", "Banbury-Don Mills", "Bathurst Manor", "Bay Street Corridor", "Bayview Village", "Bayview Woods-Steeles", "Bedford Park-Nortown", "Beechborough-Greenbrook", "BendaleScarborough", "Birchcliffe-Cliffside", "Black CreekNorth", "Blake-Jones", "Briar Hill-Belgravia", "Bridle Path-Sunnybrook-York Mills", "Broadview North", "Brookhaven-Amesbury", "Cabbagetown-South St. James Town", "Caledonia-Fairbank", "Casa Loma", "Centennial Scarborough", "Church-Yonge Corridor", "Clairlea-Birchmount", "Clanton Park", "Cliffcrest", "Corso Italia-Davenport", "Crescent Town", "Danforth - East York", "Danforth", "Don Valley Village", "Dorset Park", "Dovercourt-Wallace ", "Downsview-Roding-CFB", "Dufferin Grove", "East End-Danforth", "Edenbridge-Humber Valley", "Eglinton East", "Elms-Old Rexdale", "Englemount-Lawrence", "Eringate-Centennial-West Deane", "Etobicoke West Mall", "Flemingdon Park", "Forest Hill North", "Forest Hill South", "Glenfield-Jane Heights", "Greenwood-Coxwell", "Guildwood", "Henry Farm", "High Park North", "High Park-Swansea", "Highland Creek", "Hillcrest Village", "Humber Heights-Westmount", "Humber SummitNorth York", "Humbermede", "Humewood-Cedarvale", "Ionview", "Islington-City", "Junction Area", "Keelesdale-Eglinton West", "Kennedy Park", "Kensington-Chinatown", "Kingsview Village-The Westway", "Kingsway South", "LAmoreaux", "Lambton Baby Point", "Lansing-Westgate", "Lawrence Park North", "Lawrence Park South", "Leaside-Bennington", "Little Portugal", "Long Branch", "Malvern", "Maple Leaf", "Markland Wood", "Milliken", "Mimico", "Morningside", "Moss Park", "Mount Dennis", "Mount Olive-Silverstone-Jamestown", "Mount Pleasant East", "Mount Pleasant West", "New TorontoEtobicoke", "Newtonbrook East", "Newtonbrook West", "Niagara", "North Riverdale", "North St. James Town", "O Connor-Parkview", "Oakridge", "Oakwood VillageYork", "Old East York", "Palmerston-Little Italy", "Parkwoods-Donalda", "Pelmo Park-Humberlea", "Playter Estates-Danforth", "Pleasant View", "Princess-Rosethorn", "Regent Park", "Rexdale-Kipling", "Rockcliffe-Smythe", "Roncesvalles", "Rosedale-Moore", "Rouge", "Runnymede-Bloor West Village", "Rustic", "Scarborough", "South Riverdale", "South Parkdale", "St. Andrew-Windfields", "SteelesScarborough", "Stonegate-QueenswayEtobicoke", "Tam O Shanter-Sullivan", "The Beaches", "Thistletown-Beaumond Heights", "Thorncliffe Park", "Trinity-Bellwoods", "University", "Victoria Village", "Waterfront Communities-The Island", "West Hill", "West Humber-Clairville", "Westminster-Branson", "Weston", "Weston-Pelham Park", "Wexford-Maryvale", "Willowdale East", "Willowdale West", "Willowridge-Martingrove-Richview", "Woburn", "Woodbine Corridor", "Woodbine-Lumsden", "Wychwood", "Yonge–Eglinton", "Yonge-St. Clair", "York University ", "Yorkdale-Glen Park"];
    format!("{}", community_names[seed])
}

fn description_generator(rooms: i32, community: &str, prop_type: &str) -> String {
    let desc_seed = rand::thread_rng().gen_range(0..5);
    if desc_seed == 0 {
        format!("This bright and spacious {} bedroom {}, features great views from every angle of the house. With an  open concept floor plan with luxury flooring throughout & high-end finishes, custom kitchen cabinetry with quartz countertops, & 7 brand new Samsung appliances, led pot-lights featuring custom feature wall, upgraded washroom with chic porcelain tiles and new Moen fixtures. To add to this amazing property there are; Hospital, Park, Place of Worship, Public Transit, Schools located nearby.", rooms, prop_type)
    } else if desc_seed == 1 {
        format!("This {} is situated in the beautiful {}. Featuring {} Bedrooms, its perfect for all your family needs.Elegant custom home offers unparalleled craftsmanship and exceptional amenities! This French inspired design is truly remarkable inside and out. Features include cherry cabinets, quartz counter tops, crown molding, custom windows provide plenty of natural lighting.", prop_type, community, rooms)
    } else if desc_seed == 2 {
        format!("Remodeled to perfection! This beautiful home is located close to shopping and dining in beautiful {}. Here are just a few of its wonderful features: {} bedrooms, cozy fireplace, new kitchen cabinets, stainless steel sink, modern quartz counter tops, wood flooring, remodeled bathrooms, freshly painted, central a/c, attached two-car garage, large back yard, and so much more!", community, rooms)
    } else if desc_seed == 3 {
        format!("Walk to the beach from {}! Single-level upstairs {} with your own large private deck overlooking nature. Adorable home that is move-in ready and waiting for you to put your own personal touches on. Gorgeous and well-maintained landscaped park-like setting with lush green grasses with a community pool and spa to enjoy. Desirable location...walk to City Center, Gayles Bakery, restaurants, shopping, schools or on the Hwy right around the corner.", community, prop_type)
    } else{
       format!("This stunning Mid-Century Modern home is located in Elan, which is an exclusive community that was built by Keller Homes. The main level features an open floor plan complete with white oak hardwood flooring complimented with birch stain.  The remote-controlled blinds allow you to determine how much natural light is just right for whatever mood you find yourself in. The 42” fireplace is framed with stainless steel reflective black crushed glass. The gourmet kitchen is designed to be the heart of the home, which opens into the great room and dining area. The kitchen is complete with a walk-in pantry, full-extension, and slow-close maple cabinetry, Gray Lagoon quartz surfaces, and stainless steel appliances.")
    }
}

fn first_name_generator(seed: usize) -> String{
    let first_names: [&str; 200] = ["James" , "Robert" , "John" , "Michael" , "David" , "William" , "Richard" , "Joseph" , "Thomas" , "Charles" , "Christopher" , "Daniel" , "Matthew" , "Anthony" , "Mark" , "Donald" , "Steven" , "Paul" , "Andrew" , "Joshua" , "Kenneth" , "Kevin" , "Brian" , "George" , "Timothy" , "Ronald" , "Edward" , "Jason" , "Jeffrey" , "Ryan" , "Jacob" , "Gary" , "Nicholas" , "Eric" , "Jonathan" , "Stephen" , "Larry" , "Justin" , "Scott" , "Brandon" , "Benjamin" , "Samuel" , "Gregory" , "Alexander" , "Frank" , "Patrick" , "Raymond" , "Jack" , "Dennis" , "Jerry" , "Tyler" , "Aaron" , "Jose" , "Adam" , "Nathan" , "Henry" , "Douglas" , "Zachary" , "Peter" , "Kyle" , "Ethan" , "Walter" , "Noah" , "Jeremy" , "Christian" , "Keith" , "Roger" , "Terry" , "Gerald" , "Harold" , "Sean" , "Austin" , "Carl" , "Arthur" , "Lawrence" , "Dylan" , "Jesse" , "Jordan" , "Bryan" , "Billy" , "Joe" , "Bruce" , "Gabriel" , "Logan" , "Albert" , "Willie" , "Alan" , "Juan" , "Wayne" , "Elijah" , "Randy" , "Roy" , "Vincent" , "Ralph" , "Eugene" , "Russell" , "Bobby" , "Mason" , "Philip" , "Louis" , "Mary" , "Patricia" , "Jennifer" , "Linda" , "Elizabeth" , "Barbara" , "Susan" , "Jessica" , "Sarah" , "Karen" , "Lisa" , "Nancy" , "Betty" , "Margaret" , "Sandra" , "Ashley" , "Kimberly" , "Emily" , "Donna" , "Michelle" , "Carol" , "Amanda" , "Dorothy" , "Melissa" , "Deborah" , "Stephanie" , "Rebecca" , "Sharon" , "Laura" , "Cynthia" , "Kathleen" , "Amy" , "Angela" , "Shirley" , "Anna" , "Brenda" , "Pamela" , "Emma" , "Nicole" , "Helen" , "Samantha" , "Katherine" , "Christine" , "Debra" , "Rachel" , "Carolyn" , "Janet" , "Catherine" , "Maria" , "Heather" , "Diane" , "Ruth" , "Julie" , "Olivia" , "Joyce" , "Virginia" , "Victoria" , "Kelly" , "Lauren" , "Christina" , "Joan" , "Evelyn" , "Judith" , "Megan" , "Andrea" , "Cheryl" , "Hannah" , "Jacqueline" , "Martha" , "Gloria" , "Teresa" , "Ann" , "Sara" , "Madison" , "Frances" , "Kathryn" , "Janice" , "Jean" , "Abigail" , "Alice" , "Julia" , "Judy" , "Sophia" , "Grace" , "Denise" , "Amber" , "Doris" , "Marilyn" , "Danielle" , "Beverly" , "Isabella" , "Theresa" , "Diana" , "Natalie" , "Brittany" , "Charlotte" , "Marie" , "Kayla" , "Alexis" , "Lori"];
    format!("{}", first_names[seed])
}

fn last_name_generator(seed: usize) -> String{
    let last_names: [&str; 101] = ["Smith" , "Johnson" , "Williams" , "Brown" , "Jones" , "Garcia" , "Miller" , "Davis" , "Rodriguez" , "Martinez" , "Hernandez" , "Lopez" , "Gonzalez" , "Wilson" , "Anderson" , "Thomas" , "Taylor" , "Moore" , "Jackson" , "Martin" , "Lee" , "Perez" , "Thompson" , "White" , "Harris" , "Sanchez" , "Clark" , "Ramirez" , "Lewis" , "Robinson" , "Walker" , "Young" , "Allen" , "King" , "Wright" , "Scott" , "Torres" , "Nguyen" , "Hill" , "Flores" , "Green" , "Adams" , "Nelson" , "Baker" , "Hall" , "Rivera" , "Campbell" , "Mitchell" , "Carter" , "Roberts" , "Gomez" , "Phillips" , "Evans" , "Turner" , "Diaz" , "Parker" , "Cruz" , "Edwards" , "Collins" , "Reyes" , "Stewart" , "Morris" , "Morales" , "Murphy" , "Cook" , "Rogers" , "Gutierrez" , "Ortiz" , "Morgan" , "Cooper" , "Peterson" , "Bailey" , "Reed" , "Kelly" , "Howard" , "Ramos" , "Kim" , "Cox" , "Ward" , "Richardson" , "Watson" , "Brooks" , "Chavez" , "Wood" , "James" , "Bennett" , "Gray" , "Mendoza" , "Ruiz" , "Hughes" , "Price" , "Alvarez" , "Castillo" , "Sanders" , "Patel" , "Myers" , "Long" , "Ross" , "Foster" , "Jimenez" , "Powell"];
    format!("{}", last_names[seed])
}

fn generate_users(rows:usize) -> String{
    let mut user_string: String = String::new();
    user_string.push_str("INSERT INTO USERS (FirstName, LastName, UserName, PassHash)\nValues\n");
    for i in 0 .. rows {
        let first_name = first_name_generator(rand::thread_rng().gen_range(0..200));
        let last_name = last_name_generator(rand::thread_rng().gen_range(0..100));
        let mut user_name: String = String::new();
        user_name.push_str(&*format!("{}.{}", first_name, last_name));
        let first_copy = user_name.clone();
        let copy_user_name = user_name.clone();
        let mut row_string: String = format!("('{}', '{}', '{}', '{}')", first_name, last_name, first_copy,  hash(copy_user_name, DEFAULT_COST).unwrap().as_str());
        if i != rows-1{
            row_string.push(',');
        }
        if i == rows-1{
            row_string.push(';');
        }
        user_string.push_str(&*row_string);
    }
    format!("{}\n", user_string)
}

#[tauri::command]
fn generate_rows(rows: usize) -> String {
    let mut table_create_string: String = String::new();
    table_create_string.push_str(&*generate_users(rows));
    table_create_string.push_str("INSERT INTO listings (ListedBy,Price,Rooms,Bathrooms,Description,PropertyType,BuildingType,Storeys,CommunityName,LandSize,PropTax,ParkingType,HeatingType,Cooling,AmenitiesNearby)\nVALUES\n");
    for i in 0..rows {
        let listed_by: usize = rand::thread_rng().gen_range(1..rows);
        let mut price = rand::thread_rng();
        let rooms = rand::thread_rng().gen_range(1..6);
        let mut bathrooms = rand::thread_rng();
        let property_type = get_prop_type(rand::thread_rng().gen_range(0..6));
        let build_type = get_build_type(rand::thread_rng().gen_range(0..11));
        let story = rand::thread_rng().gen_range(1..3);
        let com_name = get_community_name(rand::thread_rng().gen_range(0..140));
        let land_size: String = format!("{}m x {}m", rand::thread_rng().gen_range(5..25), rand::thread_rng().gen_range(5..25));
        let prop_tax = rand::thread_rng().gen_range(500..4000);
        let parking_type = get_parking_type(rand::thread_rng().gen_range(0..5));
        let description: String = description_generator(rooms, &*com_name, &*property_type);
        let mut row_string: String = format!("( {}, {}, {}, {}, '{}', '{}', '{}', {},'{}', '{}', {}, '{}', 'Natural Gas', 'Central Air', 'Hospital, Park, Place of Worship, Public Transit, Schools')", listed_by, price.gen_range(600000..4000000), rooms, bathrooms.gen_range(1..6), description, property_type,build_type,story, com_name, land_size, prop_tax, parking_type, );
        if i != rows-1{
            row_string.push(',');
        }
        table_create_string.push_str(&*row_string);
    }
    format!("{}", table_create_string)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![generate_rows])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
