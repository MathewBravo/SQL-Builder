import type {AppProps} from "next/app";
import {MantineProvider} from '@mantine/core';

import "../style.css";
import "../App.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({Component, pageProps}: AppProps) {
    return (
        <MantineProvider theme={{colorScheme: 'dark'}} withGlobalStyles withNormalizeCSS>
            <Component {...pageProps} />
        </MantineProvider>

    );
}
