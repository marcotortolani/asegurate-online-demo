export default function BannerBancoDelSol() {
  return (
    <div className="container mx-auto px-4 py-4 ">
      <div className="w-5/6 my-10 max-w-xs md:max-w-screen-md lg:max-w-screen-xl mx-auto bg-purple-700 text-white px-10 py-4 rounded-[3rem] flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <svg
              viewBox="0 0 24 24"
              width="40"
              height="40"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
          </div>
          <div className="font-bold text-xl">BANCO DEL SOL</div>
        </div>
        <div className=" w-1 h-20 bg-white content-normal" />
        <p className="text-sm">
          El Banco digital de
          <br />
          SANCOR SEGUROS
        </p>
      </div>
    </div>
  )
}
