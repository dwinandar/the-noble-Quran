import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { AyatType, SurahType } from "@/types/SurahTypes"
import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom"
import { ArrowDownRight, BookOpenText } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export const API_URL_SURAHS = "https://equran.id/api/v2/surat"
const Quran = () => {
  const [surahs, setSurahs] = useState<SurahType>([])
  const storedBookmarks = localStorage.getItem("bookmark");
  const initialBookmarked: AyatType[] = storedBookmarks ? JSON.parse(storedBookmarks) : [];
  const bookmarked: AyatType[] = initialBookmarked;
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const {toast} = useToast()

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
        <div className="flex flex-col w-full bg-primary/10 animate-pulse h-fit rounded-xl" key={i}>
          <Skeleton className="w-1/2 h-6 mt-6 ml-6"/>
          <Skeleton className="self-end w-1/3 h-10 mt-3 mr-6"/>
          <Skeleton className="h-8 w-[127px] mb-6 mt-4 ml-6 mx-auto"/>
          <Skeleton className="h-[22px] w-[105px] ml-6 mb-6"/>
        </div>
      )
    }

    return skeletonCards
  }

  function handleToBookmark() {
    if(bookmarked.length <= 0 || bookmarked.length === 1) {
      toast({
        title: "Belum Ada Ayat Yang Di Tandai",
        variant: "destructive"
      })
    }
  }

  return (
    <>
      <div className="flex justify-center mt-5">
        <Badge className="text-lg">#FreePalestine</Badge>
      </div>
      <h1 className="py-12 text-center select-none text-7xl">The Noble Qur'an</h1>
      <NavLink to={bookmarked.length > 1 ? `/surah/${bookmarked[1]}`: ""}>
        <Button onClick={handleToBookmark} className="my-7">Ke Terakhir Di Baca <ArrowDownRight className="-rotate-90" /></Button>
      </NavLink>
      <h2 className="mx-auto text-center text-2xl mt-2 font-semibold border-b-2 max-w-[13rem] border-b-black dark:border-b-slate-100">List Of Surah</h2>
      <main className="grid grid-cols-1 gap-5 my-5 lg:grid-cols-3 md:grid-cols-2">
        {isLoading ? 
        <>
          {renderSkeleton(12)}            
        </> : 
          surahs.map(surah => (
            <Card key={surah.nomor}>
            <CardHeader>
              <CardTitle className="text-lg">
                <span className="font-bold">{surah.nomor}. {surah?.namaLatin}</span> {`(${surah.arti})`}
              </CardTitle>
              <CardDescription className="font-mono text-3xl font-semibold text-gray-900 dark:text-white text-end">{surah?.nama}
              </CardDescription>
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