import ActivityNotification from "@/component/home/AlertPage";
import HeroPage from "@/component/home/HeroPage";
import ProfitCalculator from "@/component/home/ProfitCalculator";
import StatsPage from "@/component/home/stats/Stats";


export default function HomePage() {
  return (
    <>

            <section>
   <HeroPage/>
   <StatsPage/>
       <ActivityNotification /> 
       <ProfitCalculator/>
            </section>
    
    </>
  )
}
