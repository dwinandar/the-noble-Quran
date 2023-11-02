import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { SurahType } from "@/types/SurahTypes"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import { BookOpenText } from "lucide-react"

export const API_URL_SURAHS = "https://equran.id/api/v2/surat"
const Quran = () => {
  const [surahs, setSurahs] = useState<SurahType>([])


  useEffect(() => {
    const getSurahs = async () => {
      const response = await fetch(`${API_URL_SURAHS}`)
      const data = await response.json()
      setSurahs(data.data)
    }
    
    getSurahs()
  }, [])
  
  return (
    <>
      <h1 className="text-7xl text-center py-8">Noble Qur'an</h1>
        <main className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-8">
          {surahs.map(surah => (
            <Card key={surah.nomor}>
            <CardHeader>
              <CardTitle className="text-lg"><span className="font-bold">{surah.nomor}. {surah?.namaLatin}</span> {`(${surah.arti})`}</CardTitle>
              <CardDescription className="text-3xl text-gray-900 font-semibold dark:text-white font-mono">{surah?.nama}</CardDescription>
            </CardHeader>
            <CardContent>
              <NavLink to={`surah/${surah.nomor}`}>
                <Button size="sm" className="text-base">Baca Surah <BookOpenText className="w-5 h-5 ml-1" /></Button>
              </NavLink>
            </CardContent>
            <CardFooter>
              {surah?.jumlahAyat} Ayat | {surah?.tempatTurun}
            </CardFooter>
          </Card>
          ))}
        </main>
    </>
  )
}

export default Quran