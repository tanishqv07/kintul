import React from 'react';

const TitleBar = () => {
  return (
    <>
      {/* TitleBar*/}
      <div className="w-screen fixed top-0 left-0 block md:hidden shadow-sm shadow-gray-900">
        <div className="flex w-full font-serif bg-gradient-to-t from-red-600 to-orange-500 text-[2.1rem] text-black justify-around items-center py-3 mx-0">
          <h1>Kintul</h1>
        </div>
      </div>

      {/* Footer */}
      <footer className="hidden md:block text-center text-white text-lg py-3">
        <p>@kintul.com</p>
      </footer>
    </>
  );
};

export default TitleBar;
