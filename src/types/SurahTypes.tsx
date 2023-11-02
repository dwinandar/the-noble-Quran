export type SurahType = {
  nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    audioFull: {
        "01": string;
        "02": string;
        "03": string;
        "04": string;
        "05": string;
}
}[]

export type AyatType = 
  {
    nomorAyat: number;
    teksArab: string;
    teksLatin: string;
    teksIndonesia: string;
    audio: {
        "01": string;
        "02": string;
        "03": string;
        "04": string;
        "05": string;
    };
  }
 