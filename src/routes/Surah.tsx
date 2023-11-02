import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import { API_URL_SURAHS } from "./Quran";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AyatType } from "@/types/SurahTypes";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ReactAudioPlayer from "react-audio-player";

export default function Surah() {
  const [surah, setSurah] = useState<AyatType[]>([])
  const [namaSurah, setNamaSurah] = useState<string>("")
  const params = useParams<string>()

  useEffect(() => {
    const getSurah= async () => {
      const response = await fetch(API_URL_SURAHS + `/${params.idsurah}`)
      const data = await response.json()
      setSurah(data.data.ayat);
      setNamaSurah(data.data.namaLatin);
    }

    getSurah()
  },[params])

    const scrollToElement = (elementId: string) => {
      const element = document.getElementById(elementId);
  
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    };

  return (
    <div className="grid gap-4 mb-8 grid-cols-1">
      <NavLink to="/" aria-label="link">
        <Button size="icon" variant="secondary" className="mt-4" aria-label="back-button">
          <ArrowLeft />
        </Button>
      </NavLink>
        <Button size="icon" variant="secondary" className="mt-4" aria-label="back-button" onClick={() => scrollToElement("10")}>
          <ArrowLeft />
        </Button>
      <div className="py-4 mx-auto">
        <h1 className="text-4xl font-semibold text-center mb-4">{namaSurah}</h1>
        {/* <audio src={audioFull} controls></audio> */}
      </div>
      {surah.map(ayat => (
        <Card key={ayat.nomorAyat} className="md:w-2/3 md:mx-auto py-2 scroll-ml-6" id={`${ayat.nomorAyat}`}>
        <CardHeader className="gap-4">
          <div className="flex justify-between gap-2">
            <h1 className="text-xl">{ayat.nomorAyat}.</h1>
            <CardTitle className="text-3xl md:text-4xl text-right font-mono font-bold !leading-[4rem]">{ayat?.teksArab}</CardTitle>
          </div>
          <div className="flex justify-end py-4">
            <ReactAudioPlayer
              src={ayat.audio["05"]}
              controls
              className="items-end"
            />
          </div>
          <CardDescription className="text-xl text-gray-900 font-semibold dark:text-white">{ayat?.teksLatin}</CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg">{ayat.teksIndonesia}</h2>
        </CardContent>
      </Card>
      ))}
    </div>
)}