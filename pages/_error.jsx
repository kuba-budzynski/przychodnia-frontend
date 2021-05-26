import Head from 'next/head';
import React from 'react';
import SVG from '../utils/SVG';
import error from '../public/500.svg';

function Error() {
    return (
        <>
            <Head>
                <title>500 SERVER ERROR</title>
                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta
                    name="description"
                    content="Przepraszamy ale ta strona jest niedostępna. Kod 500 wygląda na bląd z Naszej strony - przeładuj stronę lub spróbuj ponownie później"
                />
            </Head>
            <SVG svg={error} size="screenSize" />
        </>
    );
}

export default Error;
