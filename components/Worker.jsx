import React from 'react'
import smartTruncate from 'smart-truncate'
import Link from 'next/link'

function Worker({doctor}) {

    const url = process.env.IMAGEKIT_URL
    const imageUrl = `${url}/tr:w-100/${doctor.profile.handle}`
    console.log(imageUrl)

    return (
        <Link href={`/pracownik/${doctor.slug}`}>
            <div className="group flex flex-row space-x-4 p-2 hover:bg-gray-50 cursor-pointer">
                <div className="w-16 h-16 bg-cover">
                    <img src={imageUrl} className="rounded h-full w-full overflow-hidden shadow-md" alt={doctor.name + "-" + doctor.surname} />
                </div>
                <div className="flex space-y-1 self-center flex-col">
                    <p className="text-gray-500 group-hover:text-indigo-400 text-2xl font-medium">{smartTruncate(`${doctor.title} ${doctor.surname} ${doctor.name}`, 25)}</p>
                    <p className="text-gray-400 group-hover:text-indigo-400 italic text-sm">{smartTruncate(doctor.specializations.join(', '), 45)}</p>
                </div>    
            </div>
        </Link>
    )
}

export default Worker
