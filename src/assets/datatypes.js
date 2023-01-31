export const AZURE_TYPES = [
    {value: 'bigint', group: 'Exact Numerics', generatortype: 'NUM'},
    {value: 'numeric', group: 'Exact Numerics', generatortype: 'NUM'},
    {value: 'bit', group: 'Exact Numerics', generatortype: 'NUM'},
    {value: 'smallint', group: 'Exact Numerics', generatortype: 'NUM'},
    {value: 'decimal', group: 'Exact Numerics', generatortype: 'NUM'},
    {value: 'smallmoney', group: 'Exact Numerics', generatortype: 'NUM'},
    {value: 'int', group: 'Exact Numerics', generatortype: 'NUM'},
    {value: 'tinyint', group: 'Exact Numerics', generatortype: 'NUM'},
    {value: 'money', group: 'Exact Numerics', generatortype: 'NUM'},
    {value: 'float', group: 'Approximate Numerics', generatortype: 'NUM'},
    {value: 'real', group: 'Approximate Numerics', generatortype: 'NUM'},
    {value: 'date', group: 'Date and time', generatortype: 'STRING'},
    {value: 'datetimeoffset', group: 'Date and time', generatortype: 'STRING'},
    {value: 'datetime2', group: 'Date and time', generatortype: 'STRING'},
    {value: 'smalldatetime', group: 'Date and time', generatortype: 'STRING'},
    {value: 'datetime', group: 'Date and time', generatortype: 'STRING'},
    {value: 'time', group: 'Date and time', generatortype: 'STRING'},
    {value: 'char', group: 'Character Strings', generatortype: 'STRING'},
    {value: 'varchar', group: 'Character Strings', generatortype: 'STRING'},
    {value: 'text', group: 'Character Strings', generatortype: 'STRING'},
    {value: 'nchar', group: 'Unicode Character Strings', generatortype: 'STRING'},
    {value: 'nvarchar', group: 'Unicode Character Strings', generatortype: 'STRING'},
    {value: 'ntext', group: 'Unicode Character Strings', generatortype: 'STRING'},
    {value: 'binary', group: 'Unicode Character Strings', generatortype: 'STRING'},
    {value: 'varbinary', group: 'Unicode Character Strings', generatortype: 'STRING'},
    {value: 'image', group: 'Binary Strings', generatortype: 'STRING'},
];

export const NUM_GENERATIONS = [
    { value: 'id', label: 'ID' },
    { value: 'number', label: 'Number' },
    { value: 'price', label: 'Price'},
];

export const STRING_GENERATIONS = [
    {value: 'userName', label: 'User Name'},
    { value: 'address', label: 'Address' },
    { value: 'email', label: 'Email' },
    { value: 'fName', label: 'First Name' },
    { value: 'lName', label: 'Last Name' },
    { value: 'gender', label: 'Gender' },
    { value: 'dateLong', label: 'Date Long(January 1st, 2023)' },
    { value: 'dateShort', label: 'Date Short(1/1/23)' },
    { value: 'propertyType', label: 'Property Type'},
    { value: 'community', label: 'Community'},
    { value: 'buildingType', label: 'Building Type'},
    { value: 'exteriorFinish', label: 'ExteriorFinish'},
    { value: 'roomSize', label: 'Room Size'},
    { value: 'neighbourhoodFeatures', label: 'Neighbourhood Features'},
    { value: 'description', label: 'House Description'},
];

export const CREATION_STRING = "CREATE TABLE Users(\n" +
    "  UserID int NOT NULL AUTO_INCREMENT,\n" +
    "  FirstName varchar(255),\n" +
    "  LastName varchar(255), \n" +
    "  UserName varchar(255),\n" +
    "  PassHash varchar(255),\n" +
    "  PRIMARY KEY (UserID)\n" +
    ");\n" +
    "\n" +
    "CREATE TABLE listings (\n" +
    "  ListingID int NOT NULL AUTO_INCREMENT,\n" +
    "  ListedBy int NOT NULL,\n" +
    "  Price DECIMAL(13, 4),\n" +
    "  Rooms int,\n" +
    "  Bathrooms int,\n" +
    "  Description text,\n" +
    "  PropertyType varchar(255),\n" +
    "  BuildingType varchar(255),\n" +
    "  Storeys int,\n" +
    "  CommunityName varchar(255),\n" +
    "  LandSize varchar(255),\n" +
    "  PropTax DECIMAL(13, 4),\n" +
    "  ParkingType varchar(255),\n" +
    "  HeatingType varchar(255),\n" +
    "  Cooling varchar(255),\n" +
    "  AmenitiesNearby text,\n" +
    "  PRIMARY KEY (ListingID),\n" +
    "  FOREIGN KEY (ListedBy) REFERENCES Users(UserID)\n" +
    ");"