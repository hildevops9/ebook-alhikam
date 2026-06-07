// Sample data Al-Hikam - ini akan digantikan dengan data dari Supabase
// Tapi bisa digunakan sebagai fallback / seed data

export const hikamData = [
  {
    id: 1,
    nomor: 1,
    bab: "Tanda-tanda Bergantung kepada Amal",
    arab: "مِنْ عَلَامَةِ الاِعْتِمَادِ عَلَى الْعَمَلِ، نُقْصَانُ الرَّجَاءِ عِنْدَ وُجُودِ الزَّلَلِ",
    latin: "Min 'alāmatil i'timādi 'alal 'amal, nuqṣānur rajā'i 'inda wujūdiz zallal",
    terjemahan: "Di antara tanda-tanda bergantung kepada amal adalah berkurangnya harapan (kepada Allah) ketika terjadi kesalahan.",
    penjelasan: "Hikmah pertama ini menjelaskan bahwa orang yang bergantung kepada amal ibadahnya, ketika ia melakukan kesalahan atau dosa, harapannya kepada Allah akan berkurang. Padahal seharusnya harapan kepada Allah tidak bergantung pada amal, melainkan pada kemurahan dan rahmat-Nya semata. Orang yang arif mengetahui bahwa amal mereka tidak pernah layak di hadapan Allah, sehingga harapan mereka selalu tertumpu pada anugerah-Nya.",
    tags: ["tawakkal", "amal", "raja", "harapan"]
  },
  {
    id: 2,
    nomor: 2,
    bab: "Mengenal Hakikat Diri",
    arab: "إِرَادَتُكَ التَّجْرِيدَ مَعَ إِقَامَةِ اللهِ إِيَّاكَ فِي الأَسْبَابِ مِنَ الشَّهْوَةِ الْخَفِيَّةِ",
    latin: "Irādatukat tajrīda ma'a iqāmatillāhi iyyāka fil asbābi minash shahwatil khafiyyah",
    terjemahan: "Keinginanmu untuk hidup dalam keterasingan (tawakkal total), padahal Allah menempatkanmu dalam alam sebab-akibat, adalah termasuk syahwat (nafsu) yang tersembunyi.",
    penjelasan: "Hikmah ini mengajarkan bahwa menginginkan kondisi spiritual tertentu tanpa mengikuti ketentuan Allah adalah bentuk nafsu yang halus. Allah menempatkan setiap hamba dalam kondisi tertentu—ada yang ditakdirkan bekerja keras, ada yang diberikan kelapangan. Menentang penempatan Allah demi keinginan 'zuhud' sendiri sesungguhnya adalah egois rohani.",
    tags: ["zuhud", "syahwat", "takdir", "asbab"]
  },
  {
    id: 3,
    nomor: 3,
    bab: "Cahaya dan Kegelapan Hati",
    arab: "سَوَابِقُ الْهِمَمِ لَا تَخْرِقُ أَسْوَارَ الأَقْدَارِ",
    latin: "Sawābiqul himami lā takhriqu aswāral aqdār",
    terjemahan: "Lajunya tekad dan semangat yang kuat sekalipun tidak akan mampu menembus tembok-tembok takdir.",
    penjelasan: "Hikmah ketiga ini mengingatkan kita bahwa betapapun kuatnya tekad, semangat, dan usaha manusia, semuanya tidak akan mampu melampaui apa yang telah Allah tentukan. Ini bukan mengajak kita untuk malas, melainkan untuk memahami bahwa hasil akhir ada di tangan Allah. Tugas kita adalah berusaha dengan sungguh-sungguh, sedangkan hasilnya kita serahkan kepada-Nya.",
    tags: ["takdir", "qada", "semangat", "tawakkal"]
  },
  {
    id: 4,
    nomor: 4,
    bab: "Istirahat Jiwa",
    arab: "أَرِحْ نَفْسَكَ مِنَ التَّدْبِيرِ، فَمَا قَامَ بِهِ غَيْرُكَ عَنْكَ لَا تَقُمْ بِهِ لِنَفْسِكَ",
    latin: "Ariḥ nafsaka minat tadbīr, famā qāma bihi ghayruka 'anka lā taqum bihi linafsik",
    terjemahan: "Istirahatkanlah dirimu dari mengatur (segala urusan), karena apa yang telah diurus oleh selain dirimu (Allah) untukmu, maka janganlah kamu mengurus hal itu untuk dirimu sendiri.",
    penjelasan: "Hikmah yang sangat menenangkan jiwa. Ibnu Athaillah mengajak kita untuk tidak terlalu sibuk mengatur dan merencanakan segala sesuatu hingga melupakan bahwa Allah-lah yang sesungguhnya mengurus semuanya. Bukan berarti kita tidak boleh berencana, namun ketegangan dan kecemasan yang berlebihan dalam mengatur urusan dunia adalah tanda kurangnya kepercayaan kepada Allah.",
    tags: ["tawakal", "tawakkal", "istirahat", "jiwa", "ketenangan"]
  },
  {
    id: 5,
    nomor: 5,
    bab: "Cahaya Ma'rifat",
    arab: "عَمَلُكَ لَا يَنْفَعُكَ حَتَّى تَعْلَمَ أَنَّ اللهَ هُوَ الْمُعِينُ لَكَ عَلَيْهِ وَالْمُوَفِّقُ لَكَ فِيهِ",
    latin: "Amaluka lā yanfa'uka ḥattā ta'lama annallāha huwal mu'īnu laka 'alayhi wal muwaffiqu laka fīh",
    terjemahan: "Amalmu tidak akan memberimu manfaat sampai kamu mengetahui bahwa Allah-lah yang membantu dan memberikan taufik kepadamu dalam beramal tersebut.",
    penjelasan: "Hikmah ini mengajarkan pentingnya ma'rifat (pengenalan) dalam beramal. Amal tanpa kesadaran bahwa Allah-lah pemberi kemampuan dan taufik adalah amal yang hampa dari ruh. Ketika seseorang menyadari bahwa kemampuan beramal itu sendiri adalah karunia Allah, maka ia akan semakin tawadhu' dan bersyukur.",
    tags: ["marifat", "amal", "taufik", "syukur", "pertolongan"]
  },
  {
    id: 6,
    nomor: 6,
    bab: "Pintu Taubat",
    arab: "مَتَى أَظْلَمَ عَلَيْكَ وَقْتُكَ فَاعْلَمْ أَنَّ اللهَ أَرَادَ أَنْ يُعَرِّفَكَ قَدْرَ نِعْمَتِهِ عَلَيْكَ فِي الأَوْقَاتِ الْمُضِيئَةِ",
    latin: "Matā aẓlama 'alayka waqtuka fa'lam annallāha arāda an yu'arrifaka qadra ni'matihi 'alayka fil awqātil muḍī'ah",
    terjemahan: "Apabila waktumu menjadi gelap (penuh kesulitan dan kegelapan), ketahuilah bahwa Allah ingin mengenalkan kepadamu betapa berharganya nikmat-Nya pada saat-saat yang bercahaya (penuh kemudahan).",
    penjelasan: "Hikmah yang sangat bijak tentang cara memandang kesulitan. Kegelapan dan kesulitan hidup bukan semata azab, namun bisa jadi cara Allah mengenalkan kita pada nilai nikmat-nikmat yang selama ini kita anggap biasa. Tanpa sakit, kita tidak tahu nilai sehat. Tanpa kesempitan, kita tidak tahu nilai kelapangan.",
    tags: ["nikmat", "syukur", "musibah", "ujian", "hikmah"]
  },
  {
    id: 7,
    nomor: 7,
    bab: "Hakikat Zuhud",
    arab: "لَا تَسْتَغْرِبْ وُقُوعَ الأَكْدَارِ مَا دُمْتَ فِي هَذِهِ الدَّارِ",
    latin: "Lā tastagrib wuqū'al akdāri mā dumta fī hāẓihid dār",
    terjemahan: "Janganlah kamu merasa heran dengan datangnya berbagai keruh dan duka selama kamu masih berada di alam dunia ini.",
    penjelasan: "Dunia ini memang bukan tempat sempurna. Mengeluh tentang kesulitan dunia layaknya mengeluh tentang basahnya air. Ibnu Athaillah mengajak kita untuk memiliki ekspektasi yang realistis tentang dunia—bahwa ia adalah tempat yang penuh cobaan dan ketidaksempurnaan, agar kita tidak kecewa dan selalu mempersiapkan diri untuk akhirat.",
    tags: ["dunia", "zuhud", "sabar", "ujian", "akhirat"]
  },
  {
    id: 8,
    nomor: 8,
    bab: "Maqam Ridha",
    arab: "لَا يَكُنْ تَأَخُّرُ أَمَدِ الْعَطَاءِ مَعَ الإِلْحَاحِ فِي الدُّعَاءِ مُوجِباً لِيَأسِكَ",
    latin: "Lā yakun ta'akhkhuru amadil 'aṭā'i ma'al ilḥāḥi fid du'ā'i mūjiban liya'sik",
    terjemahan: "Janganlah tertundanya pemberian (dari Allah), meski kamu terus-menerus berdoa, menjadi penyebab putus asamu.",
    penjelasan: "Hikmah tentang doa dan kesabaran. Allah tidak pernah lalai dengan doa hamba-Nya, namun pengabulan doa memiliki waktu yang Allah tentukan sendiri. Terkadang Allah menunda pengabulan karena kasih sayang-Nya, bukan karena melupakan. Yang terpenting adalah terus berdoa dengan penuh harapan dan tidak putus asa.",
    tags: ["doa", "sabar", "harapan", "raja", "ridha"]
  },
  {
    id: 9,
    nomor: 9,
    bab: "Perjalanan Menuju Allah",
    arab: "وَاصِلُوهُ أَعْرَفُ بِمَا يُصْلِحُكُمْ مِنْكُمْ",
    latin: "Wāṣilūhu a'rafu bimā yuṣliḥukum minkum",
    terjemahan: "Allah yang mempertemukan kamu dengan-Nya lebih mengetahui apa yang mendatangkan kebaikan bagimu daripada dirimu sendiri.",
    penjelasan: "Hikmah yang mengajarkan kepasrahan total kepada Allah. Allah yang Maha Mengetahui lebih tahu apa yang terbaik untuk hamba-Nya. Terkadang apa yang kita anggap baik sesungguhnya tidak baik, dan apa yang kita hindari justru membawa kebaikan. Oleh karena itu, berserah diri kepada Allah dalam setiap keadaan adalah puncak kearifan.",
    tags: ["marifat", "tawakkal", "pasrah", "ilmu", "hikmah"]
  },
  {
    id: 10,
    nomor: 10,
    bab: "Adab kepada Allah",
    arab: "مَنِ اسْتَغْرَبَ أَنْ يُنْقِذَهُ اللهُ مِنْ شَهْوَتِهِ وَأَنْ يُخْرِجَهُ مِنْ وُجُودِ غَفْلَتِهِ، فَقَدِ اسْتَبَعْدَ مَا لَيْسَ بِبَعِيدٍ",
    latin: "Manistagraba an yunqiẑahullāhu min shahwatihi wa an yukhrijahu min wujūdi ghaflatihi, faqadista'bada mā laysa biba'īd",
    terjemahan: "Barangsiapa menganggap mustahil Allah menyelamatkannya dari syahwatnya dan mengeluarkannya dari kelalaian, maka ia telah menganggap jauh sesuatu yang sesungguhnya tidak jauh.",
    penjelasan: "Hikmah tentang husnu dzann (prasangka baik) kepada Allah. Tidak ada yang mustahil bagi Allah. Menganggap diri terlalu berdosa untuk bertaubat atau terlalu jauh untuk dekat dengan Allah adalah bentuk meremehkan kekuasaan dan rahmat Allah yang tak terbatas.",
    tags: ["taubat", "rahmat", "husnu-dzann", "harapan", "kelalaian"]
  }
]

export const babList = [
  { id: 1, nama: "Tanda-tanda Bergantung kepada Amal", jumlahHikam: 5 },
  { id: 2, nama: "Mengenal Hakikat Diri", jumlahHikam: 4 },
  { id: 3, nama: "Cahaya dan Kegelapan Hati", jumlahHikam: 6 },
  { id: 4, nama: "Istirahat Jiwa", jumlahHikam: 3 },
  { id: 5, nama: "Cahaya Ma'rifat", jumlahHikam: 7 },
  { id: 6, nama: "Pintu Taubat", jumlahHikam: 5 },
  { id: 7, nama: "Hakikat Zuhud", jumlahHikam: 4 },
  { id: 8, nama: "Maqam Ridha", jumlahHikam: 6 },
  { id: 9, nama: "Perjalanan Menuju Allah", jumlahHikam: 8 },
  { id: 10, nama: "Adab kepada Allah", jumlahHikam: 5 },
]
