import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import { API_URL_SURAHS } from "./Quran";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataSurahType } from "@/types/SurahTypes";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactAudioPlayer from "react-audio-player";
import { Skeleton } from "@/components/ui/skeleton";

interface SurahNav {
  data: {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
} | undefined,
  direction: string
}

export default function Surah() {
  const [dataSurah, setDataSurah] = useState<DataSurahType | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  
  const params = useParams<string>()

  useEffect(() => {
    const getSurah= async () => {
      try {
        const response = await fetch(API_URL_SURAHS + `/${params.idsurah}`)
        const data = await response.json()
        setDataSurah(data);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false)
        }, 5000)
      }
    }
    
    getSurah()
  },[params])

  const SurahNavigationButton = ({ direction, data }: SurahNav) => {
    if (data) {
      return (
        <NavLink to={`/surah/${data.nomor}`}>
          <Button variant="ghost" aria-label={`${direction}-button`} className="py-7">
            {direction === "prev" && <ArrowLeft />}
            <div>
              <p className={direction === "prev" ? "pl-2" : "pr-2"}>QS. {data.nomor}</p>
              <p className={direction === "prev" ? "pl-2" : "pr-2"}>{data.namaLatin}</p>
            </div>
            {direction === "next" && <ArrowRight />}
          </Button>
        </NavLink>
      );
    }
    return <div></div>;
  }

  return (
    <>
      {isLoading ? 
          <>
            <Skeleton className="mt-6 w-9 h-9"/>
            <div className="flex flex-col items-center justify-center w-full gap-2 py-4 md:mx-auto md:w-2/3">
              <Skeleton className="w-1/3 h-10 mx-auto"/>
              <Skeleton className="h-[22px] w-28 "/>
              <Skeleton className="h-[22px] w-24 "/>
              <Skeleton className="h-[22px] w-40 "/>
              <Skeleton className="w-1/3 h-12 mt-4 rounded-full"/>
            </div>
          </>
         : <div className="grid grid-cols-1 gap-4 mb-8">
        <NavLink to="/" aria-label="link">
          <Button size="icon" variant="secondary" className="mt-6" aria-label="back-button">
            <ArrowLeft />
          </Button>
        </NavLink>
        <div className="flex items-center justify-center w-full py-4 md:mx-auto md:w-2/3">
          <div className="font-semibold text-center">
            <h1 className="text-4xl text-center">{dataSurah?.data.namaLatin}</h1>
            <section className="flex flex-col justify-center text-slate-950 dark:text-slate-50">
              <h2>{`(${dataSurah?.data.arti})`}</h2>
              <h2>Surah ke - {dataSurah?.data.nomor}</h2>
              <h2>{dataSurah?.data.jumlahAyat} Ayat 🔹 {dataSurah?.data.tempatTurun} 🔹 <span className="font-mono">{dataSurah?.data.nama}</span></h2>
              <ReactAudioPlayer src={dataSurah?.data.audioFull["05"]} controls className="flex mt-4"></ReactAudioPlayer>
            </section>
          </div>
        </div>
          <div className="flex items-center justify-between w-full py-2 md:mx-auto md:w-2/3">
          <SurahNavigationButton direction="prev" data={dataSurah?.data.suratSebelumnya} />
          <SurahNavigationButton direction="next" data={dataSurah?.data.suratSelanjutnya} />
          </div>
        {dataSurah?.data.ayat.map(ayat => (
          <Card key={ayat.nomorAyat} className="px-2 py-2 md:w-2/3 md:mx-auto scroll-ml-6 md:px-5" id={`${ayat.nomorAyat}`}>
          <CardHeader className="gap-4">
            <div className="flex justify-between gap-2">
              <h1 className="text-xl">{ayat.nomorAyat}.</h1>
              <CardTitle className="text-3xl md:text-4xl text-right font-mono font-bold !leading-[4rem]">{ayat?.teksArab}</CardTitle>
            </div>
            <div className="flex justify-end py-3">
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
      </div>}
    </>
)}