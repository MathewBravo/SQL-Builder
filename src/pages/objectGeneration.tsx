import {useEffect, useState} from "react";
import {router} from "next/client";
import {Button, Center, Grid, NumberInput, Select, Text} from "@mantine/core";
import {AZURE_TYPES, NUM_GENERATIONS, STRING_GENERATIONS} from "../assets/datatypes";

function ObjectGeneration() {
    let parsedInfo = JSON.parse(router.query.columnInfo as string);
    const [colInfo, setColInfo] = useState(
            [{
                colName: "",
                colType: "",
                generator: "",
                generate: "",
                min: 0,
                max: 1000,
            }
            ]
        )
    ;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(!isLoading){
            return;
        }
        let generators = generationCreator();
        console.log(generators);
        for (let i = 0; i < parsedInfo.length; i++) {
            parsedInfo[i].generator = generators[i];
        }
        setColInfo(parsedInfo);
        setIsLoading(false);
        console.log(colInfo);
    }, []);

    function generationCreator(){
        let generators = [];
        for (let i = 0; i < parsedInfo.length; i++) {
            for (let j = 0; j < AZURE_TYPES.length; j++) {
                if (AZURE_TYPES[j].value == parsedInfo[i].colType) {
                    generators.push(AZURE_TYPES[j].generatortype);
                }
            }
        }
        return generators;
    }

    function setGenerator(index, event) {
        console.log(event);
        let data = [...colInfo];
        data[index]["generate"] = event;
        setColInfo(data);
    }


    function minSetter(index, event) {
        let data = [...colInfo];
        data[index]["min"] = event;
        setColInfo(data);
    }

    function maxSetter(index, event) {
        let data = [...colInfo];
        data[index]["max"] = event;
        setColInfo(data);
    }


    function GenerateData() {
        for(let i = 0; i < colInfo.length; i++){
            if(colInfo[i].generate == ""){
                alert("Please ensure all generators are chosen");
                return;
            }
        }
        router.push({
            pathname: '/stringOutput',
            query: {type: router.query.type, name: router.query.name, columnInfo: JSON.stringify(colInfo)}
        })
    }


    return (
        <div>
            {isLoading ? <div>Loading</div> :
                <div>
                    <Center>
                        <div className="container">
                            <h1>Data Generation for <em>{router.query.name}</em> table</h1>
                        </div>

                    </Center>
                    <Grid columns={5} justify={"center"}>
                        <Grid.Col ml={30} span={4}>
                            {colInfo.map((item, index) => {
                                return (
                                    <Grid columns={4}>
                                        <Grid.Col span={1}>
                                            <Text fz={"xl"}>{item.colName}</Text>
                                        </Grid.Col>
                                        <Grid.Col span={1}>
                                            <Text fz={"xl"}>{item.colType}</Text>
                                        </Grid.Col>
                                        <Grid.Col span={1}>
                                            {colInfo[index].generator == "STRING" ? <Select
                                                placeholder="Pick Generator"
                                                data={STRING_GENERATIONS}
                                                onChange={event => setGenerator(index, event)}
                                            /> : <Select
                                                placeholder="Pick Generator"
                                                data={NUM_GENERATIONS}
                                                value={colInfo[index].generate}
                                                onChange={event => setGenerator(index, event)}
                                            />}
                                            {/*<SelectionCreator index={index}></SelectionCreator>*/}
                                        </Grid.Col>
                                        <Grid.Col span={1}>
                                            {colInfo[index].generator == "NUM" && <Grid columns={2}>
                                                <Grid.Col span={1}>
                                                    <NumberInput
                                                        placeholder="Min"
                                                        withAsterisk
                                                        value={colInfo[index].min}
                                                        onChange={(event) => minSetter(index, event)}
                                                    />
                                                </Grid.Col>
                                                <Grid.Col span={1}>
                                                    <NumberInput
                                                        placeholder="Max"
                                                        withAsterisk
                                                        value={colInfo[index].max}
                                                        min={colInfo[index].min}
                                                        onChange={(event) => maxSetter(index, event)}
                                                    />
                                                </Grid.Col>

                                            </Grid>}
                                        </Grid.Col>
                                    </Grid>
                                );
                            })}
                        </Grid.Col>
                    </Grid>
                    <Center mt={50}>
                        <Button onClick={GenerateData}>Generate Data</Button>
                    </Center>
                </div>
            }
        </div>


    );
}

export default ObjectGeneration;
