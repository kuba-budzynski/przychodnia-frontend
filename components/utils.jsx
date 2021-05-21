
import React from 'react'

export const Wrapper = (props) => <div className="bg-white whitespace-pre-wrap w-screen max-w-full h-screen flex justify-center justify-items-center align-middle place-items-center place-content-center" {...props} />

export const ErrorMessage = ({msg}) => <div className="w-full text-center text-red-600 my-1 text-xs">{msg}</div>

export const Astrisk = () => <span className="text-red-600 ">*</span>