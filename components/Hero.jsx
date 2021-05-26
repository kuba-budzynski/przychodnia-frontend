import patterns from '../styles/patterns.module.scss';

export default function Example() {
    return (
        <div className={`min-h-screen min-w-full flex flex-col justify-center mt-8 ${patterns.pattern}`}>
            <div className="relative w-11/12 xl:w-full h-full max-w-full xl:max-w-6xl xxl:max-w-screen-2xl mx-auto flex flex-col justify-center">
                <div className="absolute inset-0 -mr-0 bg-gradient-to-r from-indigo-100 to-fuchsia-600 shadow-lg transform skew-y-0 rotate-3 rounded-3xl"></div>
                <div className="relative h-full shadow-xl rounded-3xl w-full bg-white flex" style={{ maxHeight: '75vh', height: '100vh' }}>
                    <div className="relative w-1/2 h-full">
                        <div className="flex items-center justify-start pt-6 pl-6 absolute top-0">
                            <span className="w-4 h-4 bg-red-400 rounded-full mr-2"></span>
                            <span className="w-4 h-4 bg-yellow-400 rounded-full mr-2"></span>
                            <span className="w-4 h-4 bg-green-400 rounded-full mr-2"></span>
                        </div>
                        <div className="w-full h-full flex flex-col justify-center justify-items-center px-6">
                            <h2 className="text-5xl font-bold text-center text-indigo-500 uppercase border-b-2 border-dashed border-indigo-200 pb-6">
                                Zaufaj doświadczeniu
                            </h2>
                            <p className="text-gray-400 mt-6 text-justify px-8">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tincidunt imperdiet congue. Nulla sodales felis et
                                nisl placerat dapibus. <span className="text-indigo-500 font-bold">Pellentesque quis hendrerit diam.</span> Ut
                                tristique maximus libero non scelerisque. Curabitur et varius mauris, vitae accumsan leo. Proin pellentesque lectus
                                justo, ut molestie quam pharetra quis. Phasellus cursus orci sed scelerisque finibus. Interdum et malesuada fames ac
                                ante ipsum primis in faucibus. Etiam laoreet ornare imperdiet. Ut lacinia arcu ex, et molestie turpis molestie non.
                                Nulla at accumsan nibh. Morbi interdum quis enim dignissim viverra.
                            </p>
                        </div>
                        <div className="absolute inset-x-2 bottom-2 h-12">
                            <bottom
                                type="button"
                                className="flex items-center justify-center w-12 h-12 rounded-full bg-cool-gray-100 text-indigo-500 animate-bounce hover:text-indigo-500 hover:bg-cool-gray-50 transition duration-300 ease-in-out cursor-pointer">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                </svg>
                            </bottom>
                        </div>
                    </div>
                    <div className="relative w-1/2 h-full bg-hero-image bg-no-repeat bg-cover rounded-r-3xl"></div>
                </div>
            </div>
        </div>
    );
}
