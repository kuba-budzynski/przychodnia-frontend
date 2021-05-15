export default function CallToAction() {
    return (
      <div className="bg-indigo-50">
        <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-500 sm:text-4xl">
            <span className="block">Masz dodatkowe pytania?</span>
            <span className="block text-indigo-400">Skontaktuj się z Nami</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400"
              >
                Kontakt
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-500 bg-white hover:bg-indigo-50"
              >
                Regulamin
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }