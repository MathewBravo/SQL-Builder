import {router} from "next/client";
import {useEffect, useRef, useState} from "react";
import {invoke} from "@tauri-apps/api";
import {
    ActionIcon,
    Button, Center, Container, CopyButton, Flex, Grid,
    Group,
    Modal,
    NumberInput,
    NumberInputHandlers,
    ScrollArea,
    Text
} from "@mantine/core";
import {CREATION_STRING} from "../assets/datatypes";

function PrebuildDataHousing() {
    const [isLoading, setIsLoading] = useState(false);
    const [opened, setOpened] = useState(false);
    const [response, setResponse] = useState<string>("No Data");
    const [userResp, setUserResp] = useState<string>("No Data");
    const handlers = useRef<NumberInputHandlers>();

    const [value, setValue] = useState(20);
    useEffect(() => {
        if (isLoading) {
            return;
        }
        setIsLoading(true);
    }, [])


    function FetchListingCreationString() {
        console.log("const");
        if (response == "No Data") {
            invoke<string>('generate_rows', {rows: value}).then((res) => {
                setResponse(res)
            });
        }
        console.log(response);
    }


    return (
        <Container m={40} fluid className="container">
            <h1>Creation String</h1>
            <Grid columns={2}>
                <Grid.Col span={1}>

                    <Flex direction={"column"} ml={30}>
                        <CopyButton value={CREATION_STRING}>
                            {({copied, copy}) => (
                                <Button mb={30} style={{width: 200}} color={copied ? 'teal' : 'blue'} onClick={copy}>
                                    {copied ? 'Copied String' : 'Copy String'}
                                </Button>
                            )}
                        </CopyButton>
                        <Group spacing={5}>
                            <ActionIcon size={42} variant="default" onClick={() => handlers.current.decrement()}>
                                –
                            </ActionIcon>

                            <NumberInput
                                hideControls
                                value={value}
                                onChange={(val) => setValue(val)}
                                handlersRef={handlers}
                                max={1000}
                                min={0}
                                step={10}
                                styles={{input: {width: 100, textAlign: 'center'}}}
                            />

                            <ActionIcon size={42} variant="default" onClick={() => handlers.current.increment()}>
                                +
                            </ActionIcon>
                        </Group>
                        <Grid>
                            <Grid.Col>
                                <br/>
                                <Button mt={10} style={{width: 200}} onClick={() => {
                                    setOpened(true);
                                    FetchListingCreationString();
                                }}>Generate Fake Data</Button>
                            </Grid.Col>

                        </Grid>
                    </Flex> </Grid.Col>
            </Grid>
            <br/>
            <hr></hr>
            <br/>
            {opened && <div>
                {response == "No Data" ? <h1>Loading</h1> : <CopyButton value={response}>
                    {({copied, copy}) => (
                        <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                            {copied ? 'Copied Listing Creation String' : 'Copy Listing Creation String'}
                        </Button>
                    )}
                </CopyButton>}
            </div>}


        </Container>
    );
}

export default PrebuildDataHousing;
