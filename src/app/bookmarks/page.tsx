import CardBookWithDesc from "@/components/card/CardBookWithDesc";

const Bookmarks = () => {
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
  return (
    <div>
      {/* section bookmarks */}
      <section>
        <h1 className="text-xl font-bold py-2">Bookmarks</h1>
        <div className="grid grid-cols-4 flex flex-col gap-4">
          {bookList.map((book, index) => (
            <div
              key={index}
              className="col-span-4 lg:col-span-1 px-2 py-4 relative"
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
      </section>
    </div>
  );
};

export default Bookmarks;
