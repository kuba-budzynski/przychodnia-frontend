import { BiLoaderCircle } from 'react-icons/bi';
import React from 'react';

export const Wrapper = (props) => (
    <div
        className="bg-white whitespace-pre-wrap w-screen max-w-full h-screen flex justify-center justify-items-center align-middle place-items-center place-content-center"
        {...props}
    />
);

export const ErrorMessage = ({ msg }) => <div className="w-full text-center text-red-600 my-1 text-xs">{msg}</div>;

export const Astrisk = () => <span className="text-red-600 ">*</span>;

export const Loader = ({ color }) => (
    <div className="w-full h-full mx-auto flex justify-center justify-items-center">
        <BiLoaderCircle className={`w-12 h-12 animate-spin ${color ? color : 'text-white'}`} />
    </div>
);
