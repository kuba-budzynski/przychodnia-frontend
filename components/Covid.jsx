import React from 'react';
import covid from '../public/animations/covid.json';
import Lottie from 'lottie-react';

function Covid() {
    return (
        <div className="w-full h-full max-w-8xl mx-auto flex flex-col lg:flex-row lg:space-x-6 my-16">
            <div className="w-full h-full lg:w-1/2">
                <Lottie animationData={covid} />
            </div>
            <div className="w-full h-full lg:w-1/2 my-auto px-4 lg:px-8">
                <h3 className="text-indigo-500 leading-tight font-bold tracking-wide text-5xl text-center">
                    Pracujemy dla Was w dobie pandemii <span className="text-rose-400 font-extrabold">COVID-19</span>
                </h3>
                <h4 className="mt-6 text-gray-500 text-2xl text-center">
                    <span className="text-indigo-500 font-bold text-center">Bezpieczeństwo!</span> - wszystkie zalecenia Ministerstwa Zdrowia są przez
                    Nas zachowywane. Należy wypełnić odpowiednie ankiety oraz zastosować zalecane elementy ochrony osobistej takich jak np. maski lub
                    przyłbice
                </h4>
            </div>
        </div>
    );
}

export default Covid;
