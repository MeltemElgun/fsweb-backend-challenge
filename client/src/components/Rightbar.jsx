import { BsSearch } from "react-icons/bs";

export default function Rightbar() {
  return (
    <div className="hidden lg:inline-block p-6 grow md:py-1  ">
      <div className=" w-[22rem]  flex items-center bg-gray-100 rounded-full p-3 cursor-text focus:bg-white ">
        <BsSearch className="h-5 w-5 cursor-default focus:bg-white" />
        <input
          type="text"
          placeholder="Twitter'da Ara"
          className="border-none bg-transparent ml-5 focus:bg-white focus:border-none "
        />
      </div>

      <div className="mt-4 bg-gray-100 p-5  w-[22rem] rounded-3xl">
        <h3 className="text-xl text-black font-bold font-[inherit]">
          İlgini çekebilecek gündemler
        </h3>

        <div className="mt-7">
          <p className="text-xs text-gray-600">Türkiye tarihinde gündemde</p>
          <h3 className="text-base text-black">Asgari</h3>
          <p className="text-xs text-gray-600">27.3k Tweet</p>
        </div>
        <div className="mt-7">
          <p className="text-xs text-gray-600">Türkiye tarihinde gündemde</p>
          <h3 className="text-base text-black">Asgari</h3>
          <p className="text-xs text-gray-600">27.3k Tweet</p>
        </div>
        <div className="mt-7">
          <p className="text-xs text-gray-600">Türkiye tarihinde gündemde</p>
          <h3 className="text-base text-black">Asgari</h3>
          <p className="text-xs text-gray-600">27.3k Tweet</p>
        </div>
        <div className="mt-7">
          <p className="text-xs text-gray-600">Türkiye tarihinde gündemde</p>
          <h3 className="text-base text-black">Asgari</h3>
          <p className="text-xs text-gray-600">27.3k Tweet</p>
        </div>
        <div className="mt-7">
          <p className="text-xs text-gray-600">Türkiye tarihinde gündemde</p>
          <h3 className="text-base text-black">Asgari</h3>
          <p className="text-xs text-gray-600">27.3k Tweet</p>
        </div>
        <div className="mt-7">
          <p className="text-xs text-gray-600">Türkiye tarihinde gündemde</p>
          <h3 className="text-base text-black">Asgari</h3>
          <p className="text-xs text-gray-600">27.3k Tweet</p>
        </div>
        <div className="mt-7">
          <p className="text-xs text-gray-600">Türkiye tarihinde gündemde</p>
          <h3 className="text-base text-black">Asgari</h3>
          <p className="text-xs text-gray-600">27.3k Tweet</p>
        </div>
        <div className="mt-7">
          <p className="text-xs text-gray-600">Türkiye tarihinde gündemde</p>
          <h3 className="text-base text-black">Asgari</h3>
          <p className="text-xs text-gray-600">27.3k Tweet</p>
        </div>
      </div>
    </div>
  );
}
