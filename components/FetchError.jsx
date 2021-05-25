import React from 'react';

function FetchError({ message }) {
    return (
        <div className="w-screen h-screen max-w-full flex justify-center justify-items-center bg-coolGray-50">
            <h1 className="text-red-400 text-4xl px-4 text-center font-extrabold uppercase z-30">{message}</h1>
        </div>
    );
}

export default FetchError;
