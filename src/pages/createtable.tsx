import {useState} from "react";
import {useRouter} from "next/router";
import {Progress, Title, Autocomplete, TextInput, Grid, Button, Flex, Center} from "@mantine/core";
import {AZURE_TYPES} from "../assets/datatypes";

function CreateTable() {
    const router = useRouter();
    const [colInfo, setColInfo] = useState(
        [
            {
                colName: "",
                colType: "",
                generator: "",
                generate:"",
                min: 0,
                max: 0,
            },
        ]
    );


    const [withDescription, setWithDescription] = useState(false);

    function descriptionHandler() {
        setWithDescription(!withDescription);
    }

    function formChange(index, event) {
        let data = [...colInfo];
        data[index][event.target.name] = event.target.value;
        setColInfo(data);
    }

    function setDataType(index, event) {
        console.log(event);
        let data = [...colInfo];
        data[index]["colType"] = event;
        setColInfo(data);
    }

    function addNewCol() {
        let newCol = {
            colName: "",
            colType: "",
            generator: "",
            generate:"",
            min: 0,
            max: 0,
        };
        setColInfo([...colInfo, newCol]);
    }

    function removeCol() {
        if (colInfo.length <= 1) {
            return;
        }
        setColInfo(colInfo.slice(0, -1));
    }

    function proceed() {
        console.log(colInfo);
        for (let i = 0; i < colInfo.length; i++) {
            if (colInfo[i].colName == "" || colInfo[i].colType == "") {
                return;
            }
        }
        router.push({
            pathname: '/objectGeneration',
            query: {type: router.query.type, name: router.query.name, columnInfo: JSON.stringify(colInfo)}
        })
    }


    return (
        <div className="container">
            <Progress
                m={20}
                radius="xl"
                size={24}
                sections={[
                    {value: 25, color: 'pink', label: 'Initial Setup', tooltip: 'Choose database type, and name'},
                    {
                        value: 25,
                        color: 'pink',
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
            <Title align={"center"} order={3}>Creating {router.query.type} database named: {router.query.name}</Title>
            <br/>
            <Grid columns={5} justify={"center"}>
                <Grid.Col ml={30} span={3}>
                    {colInfo.map((item, index) => {
                        return (
                            <Grid columns={2}>
                                <Grid.Col span={1}>
                                    <TextInput
                                        name={"colName"}
                                        value={item.colName}
                                        placeholder="Your name"
                                        label="Column Name"
                                        withAsterisk
                                        onChange={event => formChange(index, event)}
                                    />
                                </Grid.Col>
                                <Grid.Col span={1}>
                                    <Autocomplete
                                        label="Column Data Type"
                                        placeholder="Column Type"
                                        name={"colType"}
                                        // value={item.colType}
                                        data={AZURE_TYPES}
                                        withAsterisk
                                        onChange={event => setDataType(index, event)}
                                    />
                                </Grid.Col>
                            </Grid>
                        );
                    })}
                </Grid.Col>
                <Grid.Col span={1}>
                    <Flex
                        mih={50}
                        gap="lg"
                        justify="center"
                        align="center"
                        direction="column"
                        wrap="wrap"
                    >
                        <Button onClick={addNewCol}>
                            Add Row
                        </Button>
                        <Button color={"red"} onClick={removeCol}>
                            Remove Row
                        </Button>
                        <Button color={"pink"} onClick={proceed}>
                            Proceed
                        </Button>
                    </Flex>

                </Grid.Col>
            </Grid>
        </div>
    );
}


export default CreateTable;
