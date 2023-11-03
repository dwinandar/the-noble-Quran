import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import { API_URL_SURAHS } from "./Quran";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AyatType, DataSurahType } from "@/types/SurahTypes";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactAudioPlayer from "react-audio-player";

export default function Surah() {
  const [ayat, setAyat] = useState<AyatType[]>([])
  const [dataSurah, setDataSurah] = useState<DataSurahType | null>(null)
  const params = useParams<string>()

  useEffect(() => {
    const getSurah= async () => {
      const response = await fetch(API_URL_SURAHS + `/${params.idsurah}`)
      const data = await response.json()
      setAyat(data.data.ayat);
      setDataSurah(data);
    }
    
    getSurah()
  },[params])

    // const scrollToElement = (elementId: string) => {
    //   const element = document.getElementById(elementId);
  
    //   if (element) {
    //     element.scrollIntoView({ behavior: 'smooth' });
    //   }
    // };

  return (
    <div className="grid grid-cols-1 gap-4 mb-8">
      <NavLink to="/" aria-label="link">
        <Button size="icon" variant="secondary" className="mt-6" aria-label="back-button">
          <ArrowLeft />
        </Button>
      </NavLink>
        {/* <Button size="icon" variant="secondary" className="mt-4" aria-label="back-button" onClick={() => scrollToElement("10")}>
          <ArrowLeft />
        </Button> */}
      <div className="flex items-center justify-center w-full py-4 md:mx-auto md:w-2/3">
        <div className="font-semibold text-center">
          <h1 className="text-4xl text-center">{dataSurah?.data.namaLatin}</h1>
          <section className="flex flex-col justify-center text-slate-950 dark:text-slate-50">
            <h2>{`(${dataSurah?.data.arti})`}</h2>
            <h2>{dataSurah?.data.jumlahAyat} Ayat 🔹 {dataSurah?.data.tempatTurun} 🔹 <span className="font-mono">{dataSurah?.data.nama}</span></h2>
            <ReactAudioPlayer src={dataSurah?.data.audioFull["05"]} controls className="flex mt-4"></ReactAudioPlayer>
          </section>
        </div>
      </div>
        <div className="flex items-center justify-between w-full py-4 md:mx-auto md:w-2/3">
          <NavLink to={`/surah/${dataSurah?.data.suratSebelumnya.nomor}`}>
            <Button variant="ghost" aria-label="prev-button" className="sm:p-7">
              <ArrowLeft />
              <div>
                <p className="pl-2">QS. {dataSurah?.data.suratSebelumnya.nomor}</p>
                <p className="pl-2">{dataSurah?.data.suratSebelumnya.namaLatin}</p>
              </div>
            </Button>
          </NavLink>
          <NavLink to={`/surah/${dataSurah?.data.suratSelanjutnya.nomor}`}>
            <Button variant="ghost" aria-label="next-button" className="sm:p-7">
              <div>
                <p className="pr-2">QS. {dataSurah?.data.suratSelanjutnya.nomor}</p>
                <p className="pr-2">{dataSurah?.data.suratSelanjutnya.namaLatin}</p>
              </div>
              <ArrowRight />
            </Button>
          </NavLink>
        </div>
      {ayat.map(ayat => (
        <Card key={ayat.nomorAyat} className="py-2 md:w-2/3 md:mx-auto scroll-ml-6" id={`${ayat.nomorAyat}`}>
        <CardHeader className="gap-4">
          <div className="flex justify-between gap-2">
            <h1 className="text-xl">{ayat.nomorAyat}.</h1>
            <CardTitle className="text-3xl md:text-4xl text-right font-mono font-bold !leading-[4rem]">{ayat?.teksArab}</CardTitle>
          </div>
          <div className="flex justify-end py-4">
            <ReactAudioPlayer
              src={ayat.audio["05"]}
              controls
            />
          </div>
          <CardDescription className="text-xl font-semibold text-gray-900 dark:text-white">{ayat?.teksLatin}</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg">{ayat.teksIndonesia}</h2>
        </CardContent>
      </Card>
      ))}
    </div>
)}