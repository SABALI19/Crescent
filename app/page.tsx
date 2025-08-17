import ActivityNotification from "@/component/home/AlertPage";
import ContactUs from "@/component/home/contact/ContactIndex";
import HeroPage from "@/component/home/HeroPage";
import PricingSection from "@/component/home/PricingPlans";
import ProfitCalculator from "@/component/home/ProfitCalculator";
import FAQPage from "@/component/home/QuestionAndAnswer";
import StatsPage from "@/component/home/stats/Stats";


export default function HomePage() {
  return (
    <>

            <section>
   <HeroPage/>
   <StatsPage/>
       <ActivityNotification /> 
       <ProfitCalculator/>
       <FAQPage/>
       <PricingSection/>
       <ContactUs/>
            </section>
    
    </>
  )
}
