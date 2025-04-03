export function Footer() {
  return (
    <div className="bg-gray-600 text-white">
      <footer className="custom-container pt-8 pb-20">
        <ul className="flex flex-wrap items-center gap-4">
          <li className="pr-4 border-r ">Home</li>
          <li className="pr-4 border-r ">Terms and Conditions</li>
          <li className="pr-4 border-r ">Privacy Policy</li>
          <li className="pr-4 border-r ">Collection Statement</li>
          <li className="pr-4 border-r ">Help</li>
          <li>Manage Account</li>
        </ul>
        <div className="mt-10 md:mt-4">
          <p className="text-stone-300">
            Copyright &copy; 2016 DEMO Streaming. All Rights Reserved.
          </p>
        </div>

        <div className="flex items-center justify-between mt-10">
          <div className="flex items-center gap-4">
            <img
              src="/src/assets/social/facebook-white.svg"
              alt="Facebook"
              className="w-8 h-8"
            />
            <img
              src="/src/assets/social/twitter-white.svg"
              alt="Twitter"
              className="w-8 h-8"
            />
            <img
              src="/src/assets/social/instagram-white.svg"
              alt="Instagram"
              className="w-8 h-8"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full h-10 flex justify-center">
              <img
                src="/src/assets/store/app-store.svg"
                alt="App Store"
                className="h-full w-full object-cover max-w-full"
              />
            </div>
            <div className="w-full h-10 flex justify-center">
              <img
                src="/src/assets/store/play-store.svg"
                alt="Google Play"
                className="h-full w-full object-cover max-w-full"
              />
            </div>
            <div className="w-full h-10 flex justify-center">
              <img
                src="/src/assets/store/windows-store.svg"
                alt="Microsoft Store"
                className="h-full w-full object-cover max-w-full"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
