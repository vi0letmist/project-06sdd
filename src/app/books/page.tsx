"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import CardBookWithDesc from "@/components/card/CardBookWithDesc";
import Dropdown from "@/components/common/Dropdown";
import Select from "@/components/common/Select";
import Button from "@/components/common/Button";

const options = [
  { name: "Option 1", icon: "CheckIcon" },
  { name: "Option 2", icon: "XMarkIcon" },
  { name: "Option 3", icon: "StarIcon" },
];

const options1 = [
  { label: "Option 1", value: "option1", icon: "CheckIcon" },
  { label: "Option 2", value: "option2", icon: "XMarkIcon" },
  { label: "Option 3", value: "option3", icon: "StarIcon" },
];

const Books = () => {
  const router = useRouter();
  const { isSidebarOpen } = useSidebar();

  const bookList = [
    {
      id: "1001",
      title: "Hujan Bulan Juni",
      author: "Sapardi Djoko Damono",
      description: `Novel Hujan Bulan Juni mengisahkan tentang bagaimana mungkin seseorang mempunyai keinginan untuk 
        mengurai kembali benang yang tidak terkira jumlahnya dalam selembar sapu tangan yang sudah ditenunnya sendiri. 
        Bagaimana mungkin seseorang dapat mendadak terbebas dari jaringan benang yang silang-menyilang, susun-bersusun, 
        dan timpa-menimpa dengan rapi di selembar sapu tangan yang telah bertahun-tahun lamanya ditenun dengan sabar oleh jari-jemarinya sendiri, 
        oleh ketabahannya sendiri, oleh tarikan dan hembusan nafasnya sendiri, oleh kesunyiannya sendiri, oleh kerinduannya sendiri, oleh rintik waktu 
        dalam benaknya sendiri, oleh penghayatannya sendiri mengenai hubungan-hubungan pelik antara laki-laki dan perempuan yang tinggal di sebuah 
        ruangan kedap suara yang bernama kasih sayang.`,
      imageSrc: "Hujan-Bulan-Juni-Sebuah-Novel.jpg",
    },
    {
      id: "1002",
      title: "A Song of Ice and Fire: A Game of Thrones",
      author: "George R. R. Martin",
      description: `A Song of Ice and Fire takes place in a fictional world in which seasons last 
      for years and end unpredictably. Nearly three centuries before the events of the first novel, the Seven Kingdoms of 
      Westeros were united under the Targaryen dynasty, establishing military supremacy through their control of dragons. The 
      Targaryens ruled for three hundred years, continuing beyond the extinction of the dragons. Their dynasty eventually ended with a 
      rebellion led by Lord Robert Baratheon, in which Aerys II "the Mad King" Targaryen was killed and Robert proclaimed king of the Seven Kingdoms. 
      At the beginning of A Game of Thrones, 15 years have passed since Robert's rebellion, with a nine-year-long summer coming to an end.`,
      imageSrc: "GOThcEng.jpg",
    },
    {
      id: "1003",
      title: "1984",
      author: "George Orwell",
      description: `The story takes place in an imagined future. The current year is uncertain, but believed to be 1984. 
      Much of the world is in perpetual war. Great Britain, now known as Airstrip One, has become a province of the 
      totalitarian superstate Oceania, which is led by Big Brother, a dictatorial leader supported by an intense cult of 
      personality manufactured by the Party's Thought Police. The Party engages in omnipresent government surveillance and, 
      through the Ministry of Truth, historical negationism and constant propaganda to persecute individuality and independent 
      thinking.`,
      imageSrc: "1984 - george orwell2.jpg",
    },
  ];

  const [selected, setSelected] = useState("sorting by");

  const handleSelection = (selectedItem: string) => {
    setSelected(selectedItem);
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (value: string) => {
    setSelectedOption(value);
  };

  const toCreate = () => {
    router.push(`/books/create`);
  };
  return (
    <div>
      {/* section recommended books */}
      <section>
        <div className="grid grid-cols-2 gap-4 pb-4">
          <div
            className={`${isSidebarOpen ? "col-span-2" : "col-span-1"} md:col-span-1`}
          >
            <h1 className="text-xl font-bold py-2">Book Collections</h1>
          </div>
          <div
            className={`${isSidebarOpen ? "col-span-2" : "col-span-1"} md:col-span-1 flex justify-end`}
          >
            <Button className="rounded-full" color="rose" onClick={toCreate}>
              Create Book
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 flex flex-col gap-4">
          {bookList.slice(0, 2).map((book, index) => (
            <div
              key={index}
              className="col-span-2 lg:col-span-1 px-2 py-4 relative"
            >
              <CardBookWithDesc
                id={book.id}
                title={book.title}
                author={book.author}
                description={book.description}
                imageSrc={book.imageSrc}
                lineClamp={5}
                size="md"
              />
            </div>
          ))}
        </div>
      </section>

      {/* list of all books and filter */}
      <section className="py-4">
        <div className="grid grid-cols-2 justify-between bg-gray-200 p-4 rounded-full">
          <div
            className={`${isSidebarOpen ? "col-span-2 py-1" : "col-span-1"} md:col-span-1 flex items-center`}
          >
            <Dropdown
              defaultText={selected}
              list={options}
              withBackground
              withIcons={false}
              hideOnMd={false}
              onSelect={handleSelection}
            />
          </div>
          <div
            className={`${isSidebarOpen ? "col-span-2 py-1" : "col-span-1"} md:col-span-1 flex justify-end`}
          >
            <Select
              className="w-full md:w-1/2"
              options={options1}
              withIcons={false}
              defaultOption="Choose one"
              onChange={handleSelect}
            />
          </div>
        </div>

        <div className="py-4">
          <div className="grid grid-cols-3 flex flex-col gap-4">
            {bookList.map((book, index) => (
              <div
                key={index}
                className="col-span-3 lg:col-span-1 px-2 py-4 relative"
              >
                <CardBookWithDesc
                  id={book.id}
                  title={book.title}
                  author={book.author}
                  description={book.description}
                  imageSrc={book.imageSrc}
                  lineClamp={2}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Books;
