import {Progress, Title, Autocomplete, Button, Flex, TextInput, Center, Popover, Text} from '@mantine/core';
import {IconDatabase} from '@tabler/icons';
import {useRouter} from "next/router";
import {useState} from "react";

function App() {
    const router = useRouter();
    const [dbName, setDbName] = useState("");
    const [dbType, setDbType] = useState("");
    let isError = false;

    function databaseInitializer() {
        if (dbName == "") {
            isError = false;
            console.log(isError);
            return;
        }
        router.push({pathname: "/createtable", query: {type: dbType, name: dbName}});
    }

    function setType(event) {
        console.log(event.target);
    }

    function generateHousingData() {
        router.push({pathname: "/prebuildHousingData", query: {type: dbType}});
    }

    return (
        <div>
            <Progress
                m={20}
                radius="xl"
                size={24}
                sections={[
                    {value: 25, color: 'pink', label: 'Initial Setup', tooltip: 'Choose database type, and name'},
                    {
                        value: 25,
                        color: 'violet',
                        label: 'Create Table',
                        tooltip: 'Determine column datatypes and names'
                    },
                    {
                        value: 25,
                        color: 'violet',
                        label: 'Generate Data',
                        tooltip: 'Generate DUMMY Data for your SQL database'
                    },
                    {
                        value: 25,
                        color: 'violet',
                        label: 'Finished',
                        tooltip: 'Use your ready to go creation string and data filling strings in your database'
                    },
                ]}
            />
            <Flex
                ml={"10%"}
                mr={"10%"}
                direction={"column"}
                gap={"md"}
            >
                <Title align={"center"} order={1}>SQL Database Build Tool</Title>
                <Autocomplete label={"Pick your SQL Database Type"}
                              value={dbType}
                              onChange={setDbType}
                              mr={"40%"}
                              placeholder={"Choose SQL Database Type"}
                              data={['AWS Dynamo', 'Azure', 'Microsoft SQL', 'MySQL', 'PostgreSQL', 'Oracle']}></Autocomplete>

                <TextInput
                    placeholder={"DB Name"}
                    label={"Database Name"}
                    mr={"40%"}
                    withAsterisk
                    value={dbName}
                    onChange={(event) => setDbName(event.target.value)}
                />

                <Button ml={"30%"} mr={"30%"} leftIcon={<IconDatabase/>} color="grape"
                        onClick={() => databaseInitializer()}>
                    Create Columns
                </Button>
                <Center>
                    <Title order={2}>Or</Title>
                </Center>

                <Button ml={"30%"} mr={"30%"} leftIcon={<IconDatabase/>} color="grape"
                        onClick={() => generateHousingData()}>
                    Generate Preset Housing Data
                </Button>

            </Flex>
        </div>
    );
}

export default App;
