import {router} from "next/client";
import {useEffect, useState} from "react";
import {invoke} from "@tauri-apps/api";

function StringOutput() {
    console.log(router.query);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (isLoading) {
            return;
        }
        invoke('init_db', {dbName: router.query.columnInfo}).then((res) => console.log(res));
        setIsLoading(true);
    }, [])

    return (
        <div className="container">
            <h1>Work In Progress</h1>
            <button type="button" onClick={() => router.push('/')}>Return To Menu</button>
        </div>
    );
}

export default StringOutput;
