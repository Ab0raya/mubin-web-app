import dosariImg from "../assets/reciters/icfe-الدوسري.png";
import minshawiImg from "../assets/reciters/icfe-المنشاوي.png";
import basitImg from "../assets/reciters/icfe-عبدالباسط.png";
import tablawiImg from "../assets/reciters/icfe-الطبلاوي.png";
import ghamdiImg from "../assets/reciters/icfe-الغامدي.png";
import husaryImg from "../assets/reciters/icfe-الحصري.png";
import sudaisImg from "../assets/reciters/icfe-السديس.png";
import alafasyImg from "../assets/reciters/icfe-العفاسي.png";
import muaiqlyImg from "../assets/reciters/icfe-المعيقلي.png";
import mustafaImg from "../assets/reciters/icfe-مصطفي إسماعيل.png";
import ajmImg from "../assets/reciters/icfe-العجمي.png";
import shurImg from "../assets/reciters/icfe-الشريم.png";
import soufiImg from "../assets/reciters/icfe-راشد الصوفي.png";
import jalilImg from "../assets/reciters/icfe-خالد جليل.png";
import qatamiImg from "../assets/reciters/icfe-القطامي.png";
import abbadImg from "../assets/reciters/icfe-فارس عباد.png";
import lhdanImg from "../assets/reciters/icfe-اللحيدان.png";
import islamImg from "../assets/reciters/icfe-إسلام صبحي.png";
import bandarImg from "../assets/reciters/icfe-بدر بليله.png";
import ayyubImg from "../assets/reciters/icfe-محمد ايوب.png";

export const RECITERS = [
  { id: 1, key: "dosari", name: 'Yasser Al-Dosari', arabicName: 'ياسر الدوسري', server: 'https://server11.mp3quran.net/yasser/', image: dosariImg, narration: 'رواية حفص عن عاصم' },
  { id: 2, key: "minshawi", name: 'Mohamed Siddiq El-Minshawi (Mujawwad)', arabicName: 'محمد صديق المنشاوي (مجود)', server: 'https://server10.mp3quran.net/minsh/minh-old-with-echo/', image: minshawiImg, narration: 'رواية حفص عن عاصم' },
  { id: 3, key: "basit", name: 'Abdul Basit Abdul Samad', arabicName: 'عبد الباسط عبد الصمد', server: 'https://server7.mp3quran.net/basit/', image: basitImg, narration: 'رواية حفص عن عاصم' },
  { id: 4, key: "tblawi", name: 'Mohammad Mahmoud Al-Tablawi', arabicName: 'محمد محمود الطبلاوي', server: 'https://server12.mp3quran.net/tblawi/', image: tablawiImg, narration: 'رواية حفص عن عاصم' },
  { id: 5, key: "s_gmd", name: 'Saad Al-Ghamdi', arabicName: 'سعد الغامدي', server: 'https://server7.mp3quran.net/s_gmd/', image: ghamdiImg, narration: 'رواية حفص عن عاصم' },
  { id: 6, key: "husr", name: 'Mahmoud Khalil Al-Hussary', arabicName: 'محمود خليل الحصري', server: 'https://server13.mp3quran.net/husr/Rewayat-Qalon-A-n-Nafi/', image: husaryImg, narration: 'رواية قالون عن نافع' },
  { id: 7, key: "sds", name: 'Abdul Rahman Al-Sudais', arabicName: 'عبد الرحمن السديس', server: 'https://server11.mp3quran.net/sds/', image: sudaisImg, narration: 'رواية حفص عن عاصم' },
  { id: 8, key: "afs", name: 'Mishary Rashid Alafasy', arabicName: 'مشاري راشد العفاسي', server: 'https://server8.mp3quran.net/afs/', image: alafasyImg, narration: 'رواية حفص عن عاصم' },
  { id: 9, key: "maher", name: 'Maher Al-Muaiqly', arabicName: 'ماهر المعيقلي', server: 'https://server12.mp3quran.net/maher/', image: muaiqlyImg, narration: 'رواية حفص عن عاصم' },
  { id: 10, key: "mustafa", name: 'Mustafa Ismail', arabicName: 'مصطفى إسماعيل', server: 'https://server8.mp3quran.net/mustafa/', image: mustafaImg, narration: 'رواية حفص عن عاصم' },
  { id: 11, key: "ajm", name: 'Ahmed Al-Ajmi', arabicName: 'أحمد العجمي', server: 'https://server10.mp3quran.net/ajm/', image: ajmImg, narration: 'رواية حفص عن عاصم' },
  { id: 12, key: "shur", name: 'Saud Al-Shuraim', arabicName: 'سعود الشريم', server: 'https://server7.mp3quran.net/shur/', image: shurImg, narration: 'رواية حفص عن عاصم' },
  { id: 13, key: "soufi", name: 'Rashid Al-Soufi (Hafs)', arabicName: 'راشد الصوفي (حفص)', server: 'https://server16.mp3quran.net/soufi/Rewayat-Hafs-A-n-Assem/', image: soufiImg, narration: 'رواية حفص عن عاصم' },
  { id: 14, key: "jleel", name: 'Khalid Al-Jalil', arabicName: 'خالد الجليل', server: 'https://server10.mp3quran.net/jleel/', image: jalilImg, narration: 'رواية حفص عن عاصم' },
  { id: 15, key: "qtm", name: 'Nasser Al-Qatami', arabicName: 'ناصر القطامي', server: 'https://server6.mp3quran.net/qtm/', image: qatamiImg, narration: 'رواية حفص عن عاصم' },
  { id: 16, key: "frs_a", name: 'Fares Abbad', arabicName: 'فارس عباد', server: 'https://server8.mp3quran.net/frs_a/', image: abbadImg, narration: 'رواية حفص عن عاصم' },
  { id: 17, key: "lhdan", name: 'Mohamed Al-Luhaidan', arabicName: 'محمد اللحيدان', server: 'https://server8.mp3quran.net/lhdan/', image: lhdanImg, narration: 'رواية حفص عن عاصم' },
  { id: 18, key: "islam", name: 'Islam Sobhi', arabicName: 'إسلام صبحي', server: 'https://server14.mp3quran.net/islam/Rewayat-Hafs-A-n-Assem/', image: islamImg, narration: 'رواية حفص عن عاصم' },
  { id: 19, key: "bna", name: 'Bandar Baleila', arabicName: 'بندر بليلة', server: 'https://server8.mp3quran.net/bna/', image: bandarImg, narration: 'رواية حفص عن عاصم' },
  { id: 20, key: "ayyub", name: 'Muhammad Ayyub', arabicName: 'محمد أيوب', server: 'https://server8.mp3quran.net/ayyub/', image: ayyubImg, narration: 'رواية حفص عن عاصم' }
];

export const RECITER_BIOS = {
  dosari: {
    description: "Beloved for his resonant baritone voice and excellent tajweed, he is a leading Imam of the Grand Mosque in Makkah.",
    recommended: "Mishary Rashid Alafasy",
    recDescription: "Famous for his beautiful melodic voice, Alafasy is an internationally acclaimed reciter and nasheed artist from Kuwait.",
    stats: { surahs: 114, listenings: "7.1M", playlists: 15 }
  },
  minshawi: {
    description: "One of the most legendary Egyptian Quran reciters, recognized for his unparalleled spirituality, sadness in tone, and mastery of the rules of recitation.",
    recommended: "Abdul Basit Abdul Samad",
    recDescription: "A legendary Egyptian reciter celebrated for his powerful vocal range and emotional delivery that popularized Quranic recitation internationally.",
    stats: { surahs: 114, listenings: "10.4M", playlists: 30 }
  },
  basit: {
    description: "Renowned as the 'Golden Throat', his style is marked by breathtaking breath length, spectacular vocal reach, and deep emotional resonance.",
    recommended: "Mohamed Siddiq El-Minshawi (Mujawwad)",
    recDescription: "Recognized for his unparalleled spirituality, sadness in tone, and mastery of the rules of recitation.",
    stats: { surahs: 114, listenings: "15.8M", playlists: 40 }
  },
  tblawi: {
    description: "A prominent Egyptian reciter known for his unique, powerful vocal transitions and highly expressive rendering of the Quranic text.",
    recommended: "Mahmoud Khalil Al-Hussary",
    recDescription: "Considered one of the leading figures in Quranic recitation, known for his extremely precise articulation and mastery of rules.",
    stats: { surahs: 114, listenings: "3.2M", playlists: 8 }
  },
  s_gmd: {
    description: "A highly popular Saudi reciter and imam, famous for his soothing, gentle vocal tone and accessible, melodic style.",
    recommended: "Ahmed Al-Ajmi",
    recDescription: "Renowned for his smooth, emotional recitation style, Al-Ajmi is a beloved figure across the Muslim world.",
    stats: { surahs: 114, listenings: "6.9M", playlists: 16 }
  },
  husr: {
    description: "A master of tajweed, Hussary's recordings are the reference standard for precision in letter pronunciation and vocal regulation.",
    recommended: "Mustafa Ismail",
    recDescription: "An Egyptian master of maqamat, known for his vocal agility and complex, beautifully improvised recitation structures.",
    stats: { surahs: 114, listenings: "5.5M", playlists: 14 }
  },
  sds: {
    description: "The long-time chief Imam of the Grand Mosque in Makkah, famous for his fast-paced, emotional recitation and distinct voice.",
    recommended: "Saud Al-Shuraim",
    recDescription: "A highly respected scholar and former Imam of the Grand Mosque in Makkah, known for his firm and rhythmic recitation style.",
    stats: { surahs: 114, listenings: "12.2M", playlists: 25 }
  },
  afs: {
    description: "Beloved Kuwaiti imam and nasheed artist, world-famous for his melodic voice, slow emotional pacing, and warm tone.",
    recommended: "Yasser Al-Dosari",
    recDescription: "Renowned for his captivating baritone voice and impeccable tajweed, Yasser Al-Dosari is one of the most respected Quranic reciters in the Arab world.",
    stats: { surahs: 114, listenings: "9.8M", playlists: 20 }
  },
  maher: {
    description: "Beloved Imam of the Grand Mosque in Makkah, renowned for his clear, warm, and comforting tone that inspires contemplation.",
    recommended: "Bandar Baleila",
    recDescription: "Beloved Imam of the Grand Mosque in Makkah, known for his calm, smooth, and pleasant voice.",
    stats: { surahs: 114, listenings: "8.5M", playlists: 18 }
  },
  mustafa: {
    description: "A giant of Egyptian recitation, widely considered one of the greatest masters of melodic interpretation (maqamat) of the Quran.",
    recommended: "Abdul Basit Abdul Samad",
    recDescription: "A legendary Egyptian reciter celebrated for his powerful vocal range and emotional delivery that popularized Quranic recitation internationally.",
    stats: { surahs: 114, listenings: "4.1M", playlists: 10 }
  },
  ajm: {
    description: "Saudi imam and reciter, highly popular for his touching, emotional, and rhythmic delivery of the holy verses.",
    recommended: "Saad Al-Ghamdi",
    recDescription: "A highly popular Saudi reciter and imam, famous for his soothing, gentle vocal tone and accessible, melodic style.",
    stats: { surahs: 114, listenings: "5.7M", playlists: 12 }
  },
  shur: {
    description: "Distinguished former Imam of the Grand Mosque in Makkah, known for his deep, firm, and academic style of recitation.",
    recommended: "Abdul Rahman Al-Sudais",
    recDescription: "The long-time chief Imam of the Grand Mosque in Makkah, famous for his fast-paced, emotional recitation and distinct voice.",
    stats: { surahs: 114, listenings: "6.8M", playlists: 14 }
  },
  soufi: {
    description: "A prominent scholar of Quranic readings, known for his precise and beautiful recitation in multiple narrations including Khalaf and Hafs.",
    recommended: "Mahmoud Khalil Al-Hussary",
    recDescription: "Considered one of the leading figures in Quranic recitation, known for his extremely precise articulation and mastery of rules.",
    stats: { surahs: 114, listenings: "1.9M", playlists: 6 }
  },
  jleel: {
    description: "Saudi reciter whose deeply humble and emotional style has gained immense popularity on media platforms worldwide.",
    recommended: "Nasser Al-Qatami",
    recDescription: "One of the most famous young reciters in the Gulf, known for his unique emotional tone and expressive style.",
    stats: { surahs: 114, listenings: "4.5M", playlists: 11 }
  },
  qtm: {
    description: "One of the most popular imams in Riyadh, known for his smooth, melodic voice and expressive, touching delivery.",
    recommended: "Khalid Al-Jalil",
    recDescription: "Saudi reciter whose deeply humble and emotional style has gained immense popularity on media platforms worldwide.",
    stats: { surahs: 114, listenings: "5.1M", playlists: 13 }
  },
  frs_a: {
    description: "A prominent Yemeni reciter, celebrated for his calm, clear, and steady voice that makes listening a serene experience.",
    recommended: "Mohamed Al-Luhaidan",
    recDescription: "A Saudi judge and reciter, known for his passionate and powerful voice that evokes deep contemplation.",
    stats: { surahs: 114, listenings: "4.7M", playlists: 9 }
  },
  lhdan: {
    description: "A Saudi judge and reciter, known for his passionate and powerful voice that evokes deep contemplation.",
    recommended: "Fares Abbad",
    recDescription: "A prominent Yemeni reciter, celebrated for his calm, clear, and steady voice that makes listening a serene experience.",
    stats: { surahs: 114, listenings: "3.9M", playlists: 8 }
  },
  islam: {
    description: "A young Egyptian reciter whose viral recordings have reached millions, beloved for his peaceful, quiet, and calming voice.",
    recommended: "Mishary Rashid Alafasy",
    recDescription: "Famous for his beautiful melodic voice, Alafasy is an internationally acclaimed reciter and nasheed artist from Kuwait.",
    stats: { surahs: 114, listenings: "9.1M", playlists: 15 }
  },
  bna: {
    description: "Beloved Imam of the Grand Mosque in Makkah, known for his calm, smooth, and pleasant voice.",
    recommended: "Maher Al-Muaiqly",
    recDescription: "Beloved Imam of the Grand Mosque in Makkah, renowned for his clear, warm, and comforting tone that inspires contemplation.",
    stats: { surahs: 114, listenings: "4.8M", playlists: 11 }
  },
  ayyub: {
    description: "A legendary Imam of the Prophet's Mosque in Madinah, celebrated for his Hijazi style and classical, spiritual voice.",
    recommended: "Mahmoud Khalil Al-Hussary",
    recDescription: "Considered one of the leading figures in Quranic recitation, known for his extremely precise articulation and mastery of rules.",
    stats: { surahs: 114, listenings: "6.2M", playlists: 15 }
  }
};
