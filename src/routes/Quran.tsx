import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { SurahType } from "@/types/SurahTypes"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import { BookOpenText } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export const API_URL_SURAHS = "https://equran.id/api/v2/surat"
const Quran = () => {
  const [surahs, setSurahs] = useState<SurahType>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getSurahs = async () => {
      try {
        const response = await fetch(`${API_URL_SURAHS}`)
        const data = await response.json()
        setSurahs(data.data)
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    }
    
    getSurahs()
  }, [])

  const renderSkeleton = (count: number) => {
    const skeletonCards = [];

    for (let i = 0; i < count; i++) {
      skeletonCards.push(
        <div className="bg-primary/10 animate-pulse w-full h-fit rounded-xl flex flex-col" key={i}>
          <Skeleton className="h-6 w-1/2 mt-6 ml-6"/>
          <Skeleton className="h-10 w-1/3 mt-3 mr-6 self-end"/>
          <Skeleton className="h-7 w-[127px] my-6 ml-6 mx-auto"/>
          <Skeleton className="h-[22px] w-[105px] mt-3 ml-6 mb-6"/>
        </div>
      )
    }

    return skeletonCards
  }
  
  return (
    <>
      <h1 className="text-7xl text-center py-8">Noble Qur'an</h1>
        <main className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-8">
          {isLoading ? 
          <>
            {renderSkeleton(12)}            
          </> : 
            surahs.map(surah => (
              <Card key={surah.nomor}>
              <CardHeader>
                <CardTitle className="text-lg"><span className="font-bold">{surah.nomor}. {surah?.namaLatin}</span> {`(${surah.arti})`}</CardTitle>
                <CardDescription className="text-3xl text-gray-900 font-semibold dark:text-white font-mono text-end">{surah?.nama}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <NavLink to={`surah/${surah.nomor}`}>
                  <Button size="sm" className="text-base">Baca Surah <BookOpenText className="w-5 h-5 ml-1" /></Button>
                </NavLink>
              </CardContent>
              <CardFooter className="font-semibold">
                {surah?.jumlahAyat} Ayat | {surah?.tempatTurun}
              </CardFooter>
            </Card>
            ))}
        </main>
    </>
  )
}

export default Quran