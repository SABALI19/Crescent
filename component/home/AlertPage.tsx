"use client";

import { useState, useEffect, useCallback } from "react";
import useSound from "use-sound";

interface Participant {
  name: string;
  country: string;
}

interface Activity {
  text: string;
  hasAmount: boolean;
  min?: number;
  max?: number;
}

interface Notification {
  id: string;
  name: string;
  country: string;
  activity: string;
  time: string;
}

const PARTICIPANTS: Participant[] = [
  // North America
  { name: "Madison Carter", country: "United States" },
  { name: "Brandon Mitchell", country: "United States" },
  { name: "Avery Cooper", country: "United States" },
  { name: "Chloe Walker", country: "Canada" },
  { name: "Nathan Brooks", country: "Canada" },
  { name: "Evelyn Morin", country: "Canada" },
  { name: "Fernando Castillo", country: "Mexico" },
  { name: "Sofia Ramirez", country: "Mexico" },
  { name: "Carlos Ortega", country: "Mexico" },

  // South America
  { name: "Larissa Alves", country: "Brazil" },
  { name: "Felipe Moreira", country: "Brazil" },
  { name: "Marcos Duarte", country: "Brazil" },
  { name: "Rocio Fernandez", country: "Argentina" },
  { name: "Ignacio Alvarez", country: "Argentina" },
  { name: "Camila Rojas", country: "Argentina" },
  { name: "Francisca Herrera", country: "Chile" },
  { name: "Nicolas Reyes", country: "Chile" },
  { name: "Juan Camilo Arias", country: "Colombia" },
  { name: "Andrea Moreno", country: "Colombia" },
  { name: "Sofia Paredes", country: "Peru" },
  { name: "Miguel Vargas", country: "Peru" },

  // Europe
  { name: "Jonas Fischer", country: "Germany" },
  { name: "Clara Weber", country: "Germany" },
  { name: "Mathieu Dubois", country: "France" },
  { name: "Claire Fournier", country: "France" },
  { name: "Matteo Bianchi", country: "Italy" },
  { name: "Chiara Conti", country: "Italy" },
  { name: "Oliver Wright", country: "United Kingdom" },
  { name: "Amelia Harris", country: "United Kingdom" },
  { name: "Katerina Vesela", country: "Czech Republic" },
  { name: "Jan Novak", country: "Czech Republic" },
  { name: "Piotr Kowalski", country: "Poland" },
  { name: "Zofia Lewandowska", country: "Poland" },
  { name: "Stefan Markovic", country: "Serbia" },
  { name: "Jovana Milenkovic", country: "Serbia" },
  { name: "Marko Horvat", country: "Croatia" },
  { name: "Ivana Marin", country: "Croatia" },
  { name: "Yelena Smirnova", country: "Russia" },
  { name: "Dmitry Ivanov", country: "Russia" },
  { name: "Freja Lindberg", country: "Sweden" },
  { name: "Oscar Lindqvist", country: "Sweden" },
  { name: "Anders Kristensen", country: "Denmark" },
  { name: "Sofie Madsen", country: "Denmark" },
  { name: "Javier Morales", country: "Spain" },
  { name: "Laura Torres", country: "Spain" },
  { name: "Nikos Papadopoulos", country: "Greece" },
  { name: "Eleni Karagianni", country: "Greece" },
  { name: "João Ferreira", country: "Portugal" },
  { name: "Marta Rocha", country: "Portugal" },
  { name: "Ádám Kovács", country: "Hungary" },
  { name: "Réka Tóth", country: "Hungary" },
  { name: "Mihai Ionescu", country: "Romania" },
  { name: "Elena Stan", country: "Romania" },
  { name: "Martin Balaz", country: "Slovakia" },
  { name: "Zuzana Kralova", country: "Slovakia" },
  { name: "Oskari Laine", country: "Finland" },
  { name: "Aino Niemi", country: "Finland" },
  { name: "Bjorn Sigurdsson", country: "Iceland" },
  { name: "Sigrun Olafsdottir", country: "Iceland" },
  { name: "Nika Hribar", country: "Slovenia" },
  { name: "Tina Zupan", country: "Slovenia" },

  // Africa
  { name: "Kwame Mensah", country: "Ghana" },
  { name: "Ama Serwaa", country: "Ghana" },
  { name: "Chinedu Okafor", country: "Nigeria" },
  { name: "Ngozi Eze", country: "Nigeria" },
  { name: "Moussa Diop", country: "Senegal" },
  { name: "Fatoumata Ba", country: "Senegal" },
  { name: "Ousmane Traore", country: "Mali" },
  { name: "Salimata Keita", country: "Mali" },
  { name: "Sipho Nkosi", country: "South Africa" },
  { name: "Nomvula Dlamini", country: "South Africa" },
  { name: "Patrick Zulu", country: "Zambia" },
  { name: "Chipo Phiri", country: "Zambia" },
  { name: "Peter Njoroge", country: "Kenya" },
  { name: "Grace Wanjiru", country: "Kenya" },
  { name: "Abdirahman Warsame", country: "Somalia" },
  { name: "Ayaan Hassan", country: "Somalia" },
  { name: "Hichem Ben Salah", country: "Tunisia" },
  { name: "Nadia Gharbi", country: "Tunisia" },
  { name: "Omar Hassan", country: "Egypt" },
  { name: "Salma Farouk", country: "Egypt" },
  { name: "Hind El Fassi", country: "Morocco" },
  { name: "Yassine Ait Benhaddou", country: "Morocco" },
  { name: "Abdelkader Mansouri", country: "Algeria" },
  { name: "Farida Haddad", country: "Algeria" },

  // Asia
  { name: "Ravi Kapoor", country: "India" },
  { name: "Neha Sharma", country: "India" },
  { name: "Chen Liang", country: "China" },
  { name: "Li Mei", country: "China" },
  { name: "Ren Takahashi", country: "Japan" },
  { name: "Aiko Nakamura", country: "Japan" },
  { name: "Hassan Javed", country: "Pakistan" },
  { name: "Sana Iqbal", country: "Pakistan" },
  { name: "Nguyen Van Minh", country: "Vietnam" },
  { name: "Tran Thi Hoa", country: "Vietnam" },
  { name: "Dilshan Perera", country: "Sri Lanka" },
  { name: "Anjali Perera", country: "Sri Lanka" },
  { name: "Putri Wijaya", country: "Indonesia" },
  { name: "Rizky Santoso", country: "Indonesia" },
  { name: "Aung Kyaw", country: "Myanmar" },
  { name: "Hnin Htet", country: "Myanmar" },
  { name: "Kim Min-seok", country: "South Korea" },
  { name: "Seo Ji-yeon", country: "South Korea" },
  { name: "Abdul Rahman", country: "Bangladesh" },
  { name: "Rafiqa Begum", country: "Bangladesh" },
  { name: "Tenzin Choden", country: "Bhutan" },
  { name: "Sonam Wangchuk", country: "Bhutan" },
  { name: "Sanjay Rai", country: "Nepal" },
  { name: "Puja Shrestha", country: "Nepal" },
  { name: "Bekzod Rakhimov", country: "Uzbekistan" },
  { name: "Dilnoza Karimova", country: "Uzbekistan" },
  { name: "Nguyen Phuoc", country: "Malaysia" },
  { name: "Nurul Huda", country: "Malaysia" },
  { name: "Preecha Srisuk", country: "Thailand" },
  { name: "Chanthira Wong", country: "Thailand" },

  // Middle East
  { name: "Fahad Al-Harbi", country: "Saudi Arabia" },
  { name: "Aisha Al-Qahtani", country: "Saudi Arabia" },
  { name: "Rami Karam", country: "Lebanon" },
  { name: "Joumana Saad", country: "Lebanon" },
  { name: "Said Al-Maawali", country: "Oman" },
  { name: "Layla Al-Harthy", country: "Oman" },
  { name: "Zain Abbas", country: "Iraq" },
  { name: "Huda Al-Samarrai", country: "Iraq" },
  { name: "Fares Haddad", country: "Jordan" },
  { name: "Reem Al-Mutairi", country: "Jordan" },
  { name: "Hamad Al-Kuwari", country: "Qatar" },
  { name: "Fatima Al-Marri", country: "Qatar" },
  { name: "Omar Barakat", country: "Palestine" },
  { name: "Rania Saleh", country: "Palestine" },

  // Oceania
  { name: "Liam Edwards", country: "Australia" },
  { name: "Sophie Wilson", country: "Australia" },
  { name: "Harrison Clarke", country: "New Zealand" },
  { name: "Isla Thompson", country: "New Zealand" },
  { name: "Merewai Nasilasila", country: "Fiji" },
  { name: "Tevita Rokotui", country: "Fiji" },
  { name: "Tasi Leota", country: "Samoa" },
  { name: "Moana Faumuina", country: "Samoa" },
  { name: "Kava Latu", country: "Tonga" },
  { name: "Mele Vea", country: "Tonga" },

  // Caribbean
  { name: "Andre Campbell", country: "Jamaica" },
  { name: "Keisha Brown", country: "Jamaica" },
  { name: "Darren Charles", country: "Trinidad and Tobago" },
  { name: "Kiana Peters", country: "Trinidad and Tobago" },
  { name: "Dwayne Griffith", country: "Barbados" },
  { name: "Aaliyah Clarke", country: "Barbados" },
  { name: "Jean-Marc Laurent", country: "Saint Lucia" },
  { name: "Alana Baptiste", country: "Saint Lucia" },

  // Eastern Europe / Central Asia
  { name: "Olena Bondarenko", country: "Ukraine" },
  { name: "Taras Shevchenko", country: "Ukraine" },
  { name: "Sergey Morozov", country: "Belarus" },
  { name: "Anna Kovalenko", country: "Belarus" },
  { name: "Giorgi Lomidze", country: "Georgia" },
  { name: "Mariam Gelashvili", country: "Georgia" },
  { name: "Bakytbek Mamatov", country: "Kyrgyzstan" },
  { name: "Aizada Sadykova", country: "Kyrgyzstan" },
  { name: "Yerlan Nurtayev", country: "Kazakhstan" },
  { name: "Aigerim Saparova", country: "Kazakhstan" },
];


const ACTIVITIES: Activity[] = [
  { text: "acquired the [signal] trading package", hasAmount: true, min: 1000, max: 15900 },
  { text: "joined [plan] membership", hasAmount: true, min: 1000, max: 25000 },
  { text: "funded [property] development", hasAmount: true, min: 12000, max: 33000 },
  { text: "committed [amount] to [crypto] staking", hasAmount: true, min: 1, max: 200 },
  { text: "gained [amount] from staking returns", hasAmount: true, min: 0.1, max: 10 },
  { text: "completed identity verification", hasAmount: false },
  { text: "updated profile information", hasAmount: false },
  { text: "modified security settings", hasAmount: false },
  { text: "added [amount] to balance", hasAmount: true, min: 100, max: 50000 },
  { text: "withdrew [amount] funds", hasAmount: true, min: 50, max: 20000 },
  { text: "sent [amount] to another member", hasAmount: true, min: 10, max: 5000 },
  { text: "earned [amount] through referrals", hasAmount: true, min: 10, max: 500 },
  { text: "invited a new member", hasAmount: false },
];

const SIGNAL_PACKAGES = ["TradeMaster Pro", "Alpha Signals", "Quantum Trading", "Pip Hunter", "Elite Trader Suite", "Market Navigator"];
const MEMBERSHIPS = ["Gold", "Diamond", "Executive", "Basic"];
const DEVELOPMENTS = ["Harbor View Towers", "Tech Park Silicon Valley", "Storage Solutions Austin", "University Heights Dorms", "Greenfield Industrial Zone", "Innovation Hub Dallas"];
const CRYPTO_ASSETS = ["Bitcoin", "Ethereum", "Cardano", "Solana", "Polkadot", "Avalanche", "Chainlink", "Litecoin", "Ripple"];

const INITIAL_DELAY = 3000;
const DISPLAY_DURATION = 7000;
const TRANSITION_DURATION = 1000;

const ActivityNotification = () => {
  const [currentNotification, setCurrentNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const [play] = useSound("/sound/alert.wav", { volume: 0.5 });

  const formatValue = (min: number, max: number, isCrypto = false): string => {
    const value = Math.random() * (max - min) + min;
    if (isCrypto) {
      const decimals = Math.floor(Math.random() * 7) + 2;
      return value.toFixed(decimals);
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: value < 1 ? 2 : 0,
    }).format(value);
  };

  const createRandomNotification = useCallback((): Notification => {
    const randomParticipant = PARTICIPANTS[Math.floor(Math.random() * PARTICIPANTS.length)];
    const randomActivity = ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)];
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    let activityText = randomActivity.text;
    if (randomActivity.hasAmount && randomActivity.min !== undefined && randomActivity.max !== undefined) {
      const isCrypto = activityText.includes("staking") || activityText.includes("committed");
      const value = formatValue(randomActivity.min, randomActivity.max, isCrypto);
      activityText = activityText.replace("[amount]", value);

      if (activityText.includes("[signal]")) {
        activityText = activityText.replace("[signal]", SIGNAL_PACKAGES[Math.floor(Math.random() * SIGNAL_PACKAGES.length)]);
      }
      if (activityText.includes("[plan]")) {
        activityText = activityText.replace("[plan]", MEMBERSHIPS[Math.floor(Math.random() * MEMBERSHIPS.length)]);
      }
      if (activityText.includes("[property]")) {
        activityText = activityText.replace("[property]", DEVELOPMENTS[Math.floor(Math.random() * DEVELOPMENTS.length)]);
      }
      if (activityText.includes("[crypto]")) {
        activityText = activityText.replace("[crypto]", CRYPTO_ASSETS[Math.floor(Math.random() * CRYPTO_ASSETS.length)]);
      }
    }

    return {
      id: Math.random().toString(36).substring(2, 9),
      name: randomParticipant.name,
      country: randomParticipant.country,
      activity: activityText,
      time,
    };
  }, []);

  useEffect(() => {
    const handleInteraction = () => {
      setHasUserInteracted(true);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (!hasUserInteracted) return;

    let hideTimeout: NodeJS.Timeout;

    const displayNewNotification = () => {
      const newNotification = createRandomNotification();
      setCurrentNotification(newNotification);
      setIsVisible(true);
      play();

      hideTimeout = setTimeout(() => {
        setIsVisible(false);
        setTimeout(displayNewNotification, TRANSITION_DURATION);
      }, DISPLAY_DURATION);
    };

    const initialDelayTimer: NodeJS.Timeout = setTimeout(displayNewNotification, INITIAL_DELAY);

    return () => {
      clearTimeout(initialDelayTimer);
      clearTimeout(hideTimeout);
    };
  }, [hasUserInteracted, play, createRandomNotification]);

  return (
<div className="fixed left-4 bottom-4 z-50 w-64 sm:w-72 md:w-80">
  <div
    className={`transition-all duration-300 ease-in-out ${
      isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
    }`}
  >
    {currentNotification && (
      <div className="bg-slate-800 shadow-lg border border-transparent rounded-tl-xl rounded-br-xl relative overflow-hidden">
        
        {/* Gradient Border Glow */}
        <div className="absolute inset-0 rounded-tl-xl rounded-br-xl p-[1px] bg-gradient-to-r from-purple-500 via-pink-500 to-green-400 animate-gradient"></div>
        
        {/* Inner Container */}
        <div className="relative bg-slate-800 rounded-tl-xl rounded-br-xl p-3">
          <div className="flex items-start">
            {/* Avatar Circle */}
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-green-900 flex items-center justify-center text-green-300 font-bold shadow-md">
              {currentNotification.name.charAt(0)}
            </div>
            
            {/* Notification Text */}
            <div className="ml-2">
              <p className="text-xs font-medium text-slate-100">
                {currentNotification.name}{" "}
                <span className="text-xs text-slate-400">
                  ({currentNotification.country})
                </span>
              </p>
              <p className="text-xs text-green-300">{currentNotification.activity}</p>
              <p className="text-xs text-slate-500 mt-1">{currentNotification.time}</p>
            </div>
          </div>
        </div>

        {/* Gradient Progress Bar */}
        <div
          className="h-0.5 w-full bg-gradient-to-r from-green-400 via-pink-400 to-purple-500 animate-progress"
          style={{ animationDuration: `${DISPLAY_DURATION}ms` }}
        ></div>
      </div>
    )}
  </div>
</div>

  );
};

export default ActivityNotification;
