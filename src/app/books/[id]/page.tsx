import Image from "next/image";

import Button from "@/components/common/Button";

interface BookPageProps {
  params: { id: string };
}

const BookDetail: React.FC<BookPageProps> = async ({ params }) => {
  const { id } = params;

  return (
    <div className="relative w-full py-2">
      <Image
        src={`/images/Hujan-Bulan-Juni-Sebuah-Novel.jpg`}
        alt="background blur"
        width={300}
        height={200}
        className="absolute bottom-0 left-0 w-full h-[68%] object-cover blur-sm"
      />

      <div className="absolute bottom-0 left-0 w-full h-[68%] bg-black bg-opacity-30 backdrop-blur-2xl rounded-xl"></div>
      <div className="grid grid-cols-2 min-h-full gap-2 px-4">
        <div
          className="col-span-1 flex items-end justify-center px-2 z-10 transition-transform duration-300 ease-in-out
      hover:translate-y-[-10px] will-change-transform"
        >
          <Image
            src={`/images/Hujan-Bulan-Juni-Sebuah-Novel.jpg`}
            alt="book cover"
            width={240}
            height={200}
            className="rounded-lg shadow-[-20px_20px_20px_rgba(0,0,0,0.3)]"
          />
        </div>

        <div className="col-span-1 flex flex-col justify-between h-full z-10">
          <div className="flex flex-col min-h-[70%]">
            <div className="py-4">
              <h3 className="font-bold text-4xl min-h-[112px] flex items-center py-4">
                Hujan Bulan Juni
              </h3>
              <span className="font-semibold text-xl py-4">
                Sapardi Djoko Damono
              </span>
            </div>
            <div className="py-2">
              <span className="font-semibold text-xl">
                10{" "}
                <span className="text-gray-700 text-base font-normal">
                  available copies
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between min-h-[30%] py-4 text-white border-b-2 border-white">
            <div className="flex">
              <Button className="rounded-full" color="white">
                Borrow
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                className="rounded-full"
                icon="BookmarkIcon"
                color="white"
                size="md"
              />
              <Button
                className="rounded-full"
                icon="ShareIcon"
                color="white"
                size="md"
              />
              <Button
                className="rounded-full"
                icon="ChatBubbleLeftEllipsisIcon"
                color="white"
                size="md"
              />
            </div>
          </div>
        </div>

        <div className="col-span-1 z-10 text-white p-6">
          <div>
            <h3 className="text-lg font-semibold py-2">Description</h3>
            <p className="text-justify text-sm leading-normal">
              Novel Hujan Bulan Juni mengisahkan tentang bagaimana mungkin
              seseorang mempunyai keinginan untuk mengurai kembali benang yang
              tidak terkira jumlahnya dalam selembar sapu tangan yang sudah
              ditenunnya sendiri. <br /> Bagaimana mungkin seseorang dapat
              mendadak terbebas dari jaringan benang yang silang-menyilang,
              susun-bersusun, dan timpa-menimpa dengan rapi di selembar sapu
              tangan yang telah bertahun-tahun lamanya ditenun dengan sabar oleh
              jari-jemarinya sendiri, oleh ketabahannya sendiri, oleh tarikan
              dan hembusan nafasnya sendiri, oleh kesunyiannya sendiri, oleh
              kerinduannya sendiri, oleh rintik waktu dalam benaknya sendiri,
              oleh penghayatannya sendiri mengenai hubungan-hubungan pelik
              antara laki-laki dan perempuan yang tinggal di sebuah ruangan
              kedap suara yang bernama kasih sayang.
            </p>
          </div>
        </div>
        <div className="col-span-1 z-10 text-white p-6">
          <div className="pb-2">
            <h3 className="text-lg font-semibold py-2">Publish Date</h3>
            <p className="text-justify text-sm leading-normal">15 Juni 2015</p>
          </div>
          <div className="pb-2">
            <h3 className="text-lg font-semibold py-2">Publisher</h3>
            <p className="text-justify text-sm leading-normal">
              Gramedia Pustaka Utama
            </p>
          </div>
          <div className="pb-2">
            <h3 className="text-lg font-semibold py-2">Language</h3>
            <p className="text-justify text-sm leading-normal">Indonesia</p>
          </div>
          <div className="pb-2">
            <h3 className="text-lg font-semibold py-2">Pages</h3>
            <p className="text-justify text-sm leading-normal">135</p>
          </div>
          <div className="pb-2">
            <h3 className="text-lg font-semibold py-2">ISBN</h3>
            <p className="text-justify text-sm leading-normal">9786029591545</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
