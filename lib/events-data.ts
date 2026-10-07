export type EventCategory = "ingame" | "tournament" | "free" | "community";
export type EventStatus = "ongoing" | "upcoming" | "ended";
export type RewardRarity = "legendary" | "epic" | "rare" | "normal";

export interface EventReward {
  name: { en: string; th: string };
  detail: { en: string; th: string };
  rarity: RewardRarity;
  badgeText: { en: string; th: string };
}

export interface EventMission {
  step: number;
  title: { en: string; th: string };
  desc: { en: string; th: string };
}

export interface EventItem {
  id: string;
  slug: string;
  category: EventCategory;
  status: EventStatus;
  featured?: boolean;
  tag: { en: string; th: string };
  badgeTheme: "gold" | "purple" | "cyan" | "green" | "orange";
  dateRange: { en: string; th: string };
  countdownDate?: string;
  image: string;
  title: { en: string; th: string };
  subtitle: { en: string; th: string };
  shortDesc: { en: string; th: string };
  fullDesc: { en: string; th: string };
  rewards: EventReward[];
  missions: EventMission[];
  rules: { en: string; th: string }[];
  ctaUrl?: string;
}

export const eventsList: EventItem[] = [
  {
    id: "starfront-championship-2026",
    slug: "starfront-championship-2026",
    category: "tournament",
    status: "ongoing",
    featured: true,
    tag: { en: "SEASON 3 MAJOR", th: "เมเจอร์ซีซัน 3" },
    badgeTheme: "gold",
    dateRange: { en: "Oct 15 - Nov 15, 2026", th: "15 ต.ค. - 15 พ.ย. 2026" },
    countdownDate: "2026-11-15T23:59:59+07:00",
    image: "/images/event/bg.png",
    title: {
      en: "Starfront Sky Championship 2026",
      th: "Starfront Sky Arena ศึกชิงแชมป์ลอยฟ้า 2026",
    },
    subtitle: {
      en: "The ultimate 4v4 competitive dogfight across the sky harbor",
      th: "สุดยอดสมรภูมิลอยฟ้า 4v4 ชิงเงินรางวัลและเกียรติยศระดับประเทศ",
    },
    shortDesc: {
      en: "Assemble your 4-player squad and battle through the floating island arenas. Compete for the Golden Starfront arsenal and 100,000 THB prize pool!",
      th: "รวบรวมทีม 4 คน ทะยานสู่สมรภูมิเกาะลอยฟ้า ประชันฝีมือชิงคลังแสงปืนทอง Starfront และเงินรางวัลรวมกว่า 100,000 บาท!",
    },
    fullDesc: {
      en: "The grandest Avatar Star tournament of Season 3 has arrived! 64 registered squads will clash in high-octane 4v4 Team Deathmatch and King of the Hill modes. The champions will etch their names into the official Hall of Fame forever.",
      th: "ทัวร์นาเมนต์การแข่งขันที่ยิ่งใหญ่ที่สุดแห่งซีซัน 3 เปิดศึกให้ 64 ทีมชั้นนำเข้าประลองฝีมือในโหมด Team Deathmatch และชิงพื้นที่ลอยฟ้า ทีมชนะเลิศจะได้รับการจารึกชื่อลงบนหอเกียรติยศ Hall of Fame ตลอดกาล",
    },
    rewards: [
      {
        name: { en: "100,000 THB Prize Pool", th: "เงินรางวัลรวม 100,000 บาท" },
        detail: { en: "1st: 50,000 THB | 2nd: 25,000 THB | 3rd: 10,000 THB", th: "อันดับ 1: 50,000 บาท | อันดับ 2: 25,000 บาท | อันดับ 3: 10,000 บาท" },
        rarity: "legendary",
        badgeText: { en: "Grand Cash", th: "เงินรางวัล" },
      },
      {
        name: { en: "Golden Starfront Arsenal", th: "คลังแสงปืนทอง Starfront (ถาวร)" },
        detail: { en: "Exclusive golden glow weapon set for all class roles", th: "เซ็ตอาวุธทองคำเปล่งประกายสุดเอ็กซ์คลูซีฟสำหรับทุกสายอาชีพ" },
        rarity: "legendary",
        badgeText: { en: "Permanent", th: "ไอเทมถาวร" },
      },
      {
        name: { en: "Star Champion Halo & Title", th: "ฉายาและมงกุฎแสงแชมเปี้ยน" },
        detail: { en: "Floating celestial crown visible in town and matches", th: "เอฟเฟกต์มงกุฎแสงลอยเหนือศีรษะ แสดงในเมืองและสมรภูมิ" },
        rarity: "epic",
        badgeText: { en: "Aura Title", th: "ฉายาพิเศษ" },
      },
      {
        name: { en: "Participation Supply Crate", th: "กล่องเสบียงผู้เข้าร่วมทุกคน" },
        detail: { en: "5,000 Star Points + 10x Revive Medkits for all registered teams", th: "5,000 Star Points พร้อมยาฟื้นพลัง 10 ชิ้น สำหรับทุกทีมที่เข้าร่วม" },
        rarity: "rare",
        badgeText: { en: "All Teams", th: "รับทุกคน" },
      },
    ],
    missions: [
      {
        step: 1,
        title: { en: "Team Registration", th: "ลงทะเบียนสมาชิกทีม" },
        desc: { en: "Form a squad of 4 players (Level 20+) and register via the official form before Oct 20.", th: "รวมทีมครบ 4 คน (เลเวล 20 ขึ้นไป) และกรอกข้อมูลสมัครผ่านหน้าเว็บไซต์ก่อน 20 ต.ค." },
      },
      {
        step: 2,
        title: { en: "Group Stage Knockouts", th: "รอบคัดเลือกแบ่งกลุ่ม" },
        desc: { en: "Battle in best-of-3 matches every Saturday at 19:00 (UTC+7).", th: "แข่งขันเก็บคะแนนแบบ Best-of-3 ทุกวันเสาร์ เวลา 19:00 น." },
      },
      {
        step: 3,
        title: { en: "Grand Finals & Live Broadcast", th: "รอบชิงชนะเลิศถ่ายทอดสด" },
        desc: { en: "Top 8 squads clash on the final Sunday with live caster commentary.", th: "8 ทีมสุดท้ายชิงชัยในวันอาทิตย์ พร้อมนักพากย์และการถ่ายทอดสดเต็มรูปแบบ" },
      },
    ],
    rules: [
      {
        en: "Official PC client only. Third-party macros or modified game files will result in instant disqualification.",
        th: "ต้องเล่นผ่านตัวเกม PC ทางการเท่านั้น ห้ามใช้โปรแกรมมาโครหรือดัดแปลงไฟล์เกมโดยเด็ดขาด",
      },
      {
        en: "Each player can only register under a single team and character UID.",
        th: "ผู้เล่น 1 คนสามารถลงแข่งขันได้เพียง 1 ทีมและ 1 ตัวละคร UID เท่านั้น",
      },
      {
        en: "Teams must be present in the designated Discord tournament channel 15 minutes before match time.",
        th: "นักแข่งต้องมารายงานตัวในห้อง Discord ประจำทัวร์นาเมนต์ก่อนเวลาเริ่มแข่ง 15 นาที",
      },
    ],
  },
  {
    id: "autumn-sky-carnival",
    slug: "autumn-sky-carnival",
    category: "ingame",
    status: "ongoing",
    tag: { en: "FESTIVAL EVENT", th: "เทศกาลจำกัดเวลา" },
    badgeTheme: "orange",
    dateRange: { en: "Oct 10 - Oct 31, 2026", th: "10 ต.ค. - 31 ต.ค. 2026" },
    image: "/images/event/bg.png",
    title: {
      en: "Autumn Sky Harbor Carnival",
      th: "เทศกาลบอลลูนฤดูใบไม้ร่วง 2026",
    },
    subtitle: {
      en: "Collect golden maple tokens and exchange for limited festival cosmetics",
      th: "สะสมใบไม้ทองคำและบอลลูนเทศกาล แลกรับคอสตูมสุดคิวท์",
    },
    shortDesc: {
      en: "Complete matches in Team Deathmatch to collect Maple Tokens from festive air drops. Exchange them for the limited Maple Voyager outfit and Robo-Owl companion!",
      th: "ลงเล่นโหมดใดก็ได้เพื่อเก็บใบไม้ทองคำจากกล่องแอร์ดรอปเทศกาล นำมาแลกชุดคอสตูม Maple Voyager และสัตว์เลี้ยงหุ่นยนต์นกฮูกฟรี!",
    },
    fullDesc: {
      en: "The islands of Avatar Star have donned golden autumn colors! Throughout October, celebratory balloons float above the floating harbor. Shoot down mystery balloons during matches to reveal bonus tokens and rare exchange vouchers.",
      th: "เกาะลอยฟ้าถูกประดับประดาด้วยสีสันแห่งฤดูใบไม้ร่วง ตลอดเดือนตุลาคมจะมีบอลลูนเทศกาลลอยเหนือน่านฟ้า ยิงบอลลูนระหว่างการต่อสู้เพื่อลุ้นรับเหรียญทองพิเศษและใบแลกชุดแฟชั่นลิมิเต็ด",
    },
    rewards: [
      {
        name: { en: "Maple Voyager Costume Set", th: "ชุดคอสตูม Maple Voyager (ถาวร)" },
        detail: { en: "Warm autumn hoodie with aviator goggles", th: "เสื้อฮู้ดลายใบไม้สุดอบอุ่นพร้อมแว่นนักบินลอยฟ้า" },
        rarity: "epic",
        badgeText: { en: "Costume", th: "แฟชั่นถาวร" },
      },
      {
        name: { en: "Robo-Owl Pet Companion", th: "สัตว์เลี้ยงหุ่นยนต์นกฮูก Robo-Owl" },
        detail: { en: "Collects ammunition and drops automatically", th: "ช่วยเก็บกระสุนและกล่องเสบียงในสนามรบโดยอัตโนมัติ" },
        rarity: "rare",
        badgeText: { en: "Pet", th: "สัตว์เลี้ยง" },
      },
      {
        name: { en: "Autumn Leaf Gun Skin Voucher", th: "ตั๋วแลกลายปืนใบไม้ร่วง" },
        detail: { en: "Applies animated maple leaf particle FX to your primary weapon", th: "เปลี่ยนลายปืนให้มีใบไม้สีส้มปลิวไสวขณะยิง" },
        rarity: "rare",
        badgeText: { en: "Weapon Skin", th: "สกินปืน" },
      },
    ],
    missions: [
      {
        step: 1,
        title: { en: "Daily Battle Participation", th: "ลงสมรภูมิประจำวัน" },
        desc: { en: "Play 3 matches daily in any game mode to receive 50 Maple Tokens.", th: "เล่นครบ 3 แมตช์ในโหมดใดก็ได้ รับ 50 เหรียญใบไม้ทองคำต่อวัน" },
      },
      {
        step: 2,
        title: { en: "Pop Sky Balloons", th: "ยิงบอลลูนเทศกาล" },
        desc: { en: "Find and destroy 5 festival balloons floating across harbor maps.", th: "ค้นหาและทำลายบอลลูนเทศกาล 5 ลูกที่ลอยในแผนที่ท่าเรือลอยฟ้า" },
      },
      {
        step: 3,
        title: { en: "Event Shop Exchange", th: "แลกของรางวัลที่ร้านค้า" },
        desc: { en: "Open the Event Exchange Shop and choose your permanent rewards.", th: "เปิดหน้าต่างร้านค้ากิจกรรม แล้วกดแลกรับของรางวัลที่ต้องการได้ทันที" },
      },
    ],
    rules: [
      {
        en: "Maple Tokens expire on October 31, 23:59. Unused tokens cannot be refunded.",
        th: "เหรียญใบไม้ทองคำจะหมดอายุในวันที่ 31 ต.ค. เวลา 23:59 น. กรุณาแลกของก่อนหมดเวลา",
      },
      {
        en: "Daily mission counters reset every morning at 06:00 (UTC+7).",
        th: "ภารกิจประจำวันจะรีเซ็ตทุกเช้าเวลา 06:00 น.",
      },
    ],
  },
  {
    id: "super-weekend-double-boost",
    slug: "super-weekend-double-boost",
    category: "ingame",
    status: "ongoing",
    tag: { en: "2X BOOST", th: "คูณสองสุดสัปดาห์" },
    badgeTheme: "purple",
    dateRange: { en: "Every Fri - Sun (18:00 - 24:00)", th: "ทุกวันศุกร์ - อาทิตย์ (18:00 - 24:00)" },
    image: "/images/characters/bg.png",
    title: {
      en: "Super Weekend Double EXP & Gold",
      th: "สุดสัปดาห์ EXP & Gold คูณสอง",
    },
    subtitle: {
      en: "Level up twice as fast and stock up on gold with your full squad",
      th: "อัปเลเวลไวขึ้น 2 เท่า พร้อมกอบโกย Gold กันแบบจุใจทั้งกิลด์",
    },
    shortDesc: {
      en: "Enjoy 200% EXP and Gold bonuses automatically in all game modes every weekend! Extra +20% bonus when playing in a party with squadmates.",
      th: "เปิดระบบคูณค่าประสบการณ์ (EXP) และเงิน (Gold) 200% อัตโนมัติทุกโหมดช่วงสุดสัปดาห์ พิเศษ! ปาร์ตี้กับเพื่อนรับโบนัสเพิ่มอีก 20%",
    },
    fullDesc: {
      en: "Ready to push your classes to Level 50? Every Friday through Sunday evening, the server enters Super Boost mode. Stack your boost cards for up to 400% experience gains!",
      th: "เตรียมพร้อมดันตัวละครสู่เลเวล 50! ทุกค่ำวันศุกร์ถึงวันอาทิตย์ เซิร์ฟเวอร์จะเปิดโหมด Super Boost สามารถใช้การ์ดคูณในเกมทับซ้อนเพื่อรับ EXP สูงสุดถึง 400%!",
    },
    rewards: [
      {
        name: { en: "200% EXP Multiplier", th: "โบนัส EXP คูณ 200%" },
        detail: { en: "Applies to all character classes and kill rewards", th: "ได้รับค่าประสบการณ์สองเท่าทุกการสังหารและชัยชนะ" },
        rarity: "rare",
        badgeText: { en: "Server Boost", th: "ทั้งเซิร์ฟเวอร์" },
      },
      {
        name: { en: "200% Gold Multiplier", th: "โบนัสเงิน Gold คูณ 200%" },
        detail: { en: "Earn double battle payout to upgrade abilities and weapons", th: "รับเงินรางวัลหลังจบเกมคูณสอง สำหรับอัปเกรดสกิลและอาวุธ" },
        rarity: "rare",
        badgeText: { en: "Gold Boost", th: "เงินคูณ 2" },
      },
      {
        name: { en: "Squad Harmony Buff", th: "บัฟพลังทีมสามัคคี" },
        detail: { en: "+20% additional EXP when queuing with 2 or more friends", th: "ลงเล่นพร้อมเพื่อนในปาร์ตี้ 2 คนขึ้นไป รับโบนัสเพิ่มอีก 20%" },
        rarity: "normal",
        badgeText: { en: "Party Buff", th: "โบนัสปาร์ตี้" },
      },
    ],
    missions: [
      {
        step: 1,
        title: { en: "Log In on Friday Evening", th: "เข้าเกมวันศุกร์ตั้งแต่ 18:00 น." },
        desc: { en: "Check your server status icon to confirm Double Boost is active.", th: "สังเกตไอคอนสายฟ้าสีม่วงข้างแถบเลเวล แสดงว่าสถานะคูณ 2 ทำงานแล้ว" },
      },
      {
        step: 2,
        title: { en: "Squad Up with Friends", th: "รวมกลุ่มเพื่อนร่วมรบ" },
        desc: { en: "Invite guildmates or friends to party to maximize your payout.", th: "ชวนเพื่อนหรือสมาชิกกิลด์เข้าปาร์ตี้เพื่อรับโบนัสทวีคูณ" },
      },
    ],
    rules: [
      {
        en: "Boost automatically applies during active hours without requiring manual redemption.",
        th: "ระบบจะเปิดการคูณให้อัตโนมัติตามช่วงเวลา ไม่ต้องกดรับไอเทม",
      },
    ],
  },
  {
    id: "7-day-cadet-checkin",
    slug: "7-day-cadet-checkin",
    category: "free",
    status: "ongoing",
    tag: { en: "FREE LOGIN", th: "ล็อกอินรับฟรี" },
    badgeTheme: "green",
    dateRange: { en: "Active All Month (Oct 2026)", th: "ตลอดเดือนตุลาคม 2026" },
    image: "/images/backgrounds/hero.png",
    title: {
      en: "7-Day Star Cadet Daily Check-In",
      th: "เช็กอิน 7 วัน รับอาวุธแรร์และเพชรฟรี",
    },
    subtitle: {
      en: "Claim free weapon chests, Star Gems, and avatar wings just for logging in",
      th: "เพียงเปิดเกมเข้ามาเช็กอิน รับกล่องสุ่มอาวุธแรร์ เพชร และปีกนีออนฟรี",
    },
    shortDesc: {
      en: "Login daily to unlock progressive rewards! Day 7 unlocks the permanent Neon Aviator Wings accessory for all your characters.",
      th: "ล็อกอินเข้าสู่ระบบทุกวันเพื่อปลดล็อกของรางวัลตามลำดับ วันที่ 7 รับปีกนางฟ้าเรืองแสง Neon Aviator Wings ถาวรทันที!",
    },
    fullDesc: {
      en: "Whether you are a new cadet or a seasoned veteran, the 7-Day Check-in calendar gives you everything needed to dominate. Missed a day? Complete 2 weekend matches to make up for missed check-ins!",
      th: "ไม่ว่าคุณจะเป็นทหารใหม่หรือผู้เล่นรุ่นเก๋า ปฏิทินเช็กอิน 7 วันจัดเต็มของรางวัลจำเป็น หากลืมล็อกอินวันใด สามารถเล่น 2 แมตช์ในวันหยุดเพื่อเช็กอินย้อนหลังได้!",
    },
    rewards: [
      {
        name: { en: "Neon Aviator Wings (Permanent)", th: "ปีกนีออน Neon Aviator Wings (ถาวร)" },
        detail: { en: "Glowing cybernetic wings that flap smoothly when jumping", th: "ปีกจักรกลเรืองแสงพร้อมแอนิเมชันขยับปีกขณะกระโดด" },
        rarity: "legendary",
        badgeText: { en: "Day 7", th: "วันที่ 7" },
      },
      {
        name: { en: "500 Star Gems", th: "500 Star Gems" },
        detail: { en: "Premium currency for avatar hairstyles and gacha capsules", th: "เพชรพรีเมียมสำหรับซื้อทรงผมและหมุนตู้สุ่มแฟชั่น" },
        rarity: "epic",
        badgeText: { en: "Day 5", th: "วันที่ 5" },
      },
      {
        name: { en: "Rare Weapon Blueprint Crate", th: "กล่องแปลนอาวุธระดับแรร์" },
        detail: { en: "Guaranteed purple-grade weapon blueprint", th: "การันตีแปลนอาวุธระดับสีม่วง 1 ชิ้น" },
        rarity: "rare",
        badgeText: { en: "Day 3", th: "วันที่ 3" },
      },
      {
        name: { en: "Starter Supply Pack", th: "ชุดเสบียงเริ่มต้น" },
        detail: { en: "20x Medkits + 50x High-Velocity Ammo", th: "ยาฟื้นฟู 20 ชิ้น พร้อมกระสุนพิเศษ 50 นัด" },
        rarity: "normal",
        badgeText: { en: "Day 1", th: "วันที่ 1" },
      },
    ],
    missions: [
      {
        step: 1,
        title: { en: "Open Game Client", th: "เปิดตัวเกมและเข้าสู่ระบบ" },
        desc: { en: "Launch Avatar Star and navigate to the Daily Attendance popup.", th: "เปิดเกม Avatar Star หน้าต่างปฏิทินเช็กอินจะปรากฏขึ้นอัตโนมัติ" },
      },
      {
        step: 2,
        title: { en: "Click Claim Reward", th: "กดปุ่มรับของรางวัล" },
        desc: { en: "Items are transferred instantly to your in-game inventory mailbox.", th: "ของรางวัลจะถูกส่งตรงเข้าสู่กล่องจดหมายในเกมทันที" },
      },
    ],
    rules: [
      {
        en: "One claim per account UID per day.",
        th: "สามารถรับของรางวัลได้ 1 ครั้งต่อบัญชี UID ต่อวัน",
      },
      {
        en: "Day cycle resets at 00:00 midnight (UTC+7).",
        th: "รอบวันจะรีเซ็ตทุกเที่ยงคืน 00:00 น.",
      },
    ],
  },
  {
    id: "avatar-creator-video-contest",
    slug: "avatar-creator-video-contest",
    category: "community",
    status: "ongoing",
    tag: { en: "COMMUNITY SHOWCASE", th: "ประกวดคลิปสเต็ปเทพ" },
    badgeTheme: "cyan",
    dateRange: { en: "Oct 1 - Oct 25, 2026", th: "1 ต.ค. - 25 ต.ค. 2026" },
    image: "/images/backgrounds/hero.png",
    title: {
      en: "Avatar Star Creator Video Contest",
      th: "ประกวดคลิปสเต็ปเทพ & คอนเทนต์สุดฮา",
    },
    subtitle: {
      en: "Showcase your sick clutch plays or hilarious fails on TikTok / Shorts",
      th: "อวดลีลายิงสุดเทพหรือจังหวะชวนขำบน TikTok และ YouTube Shorts",
    },
    shortDesc: {
      en: "Post your Avatar Star short videos on TikTok, YouTube Shorts, or Facebook Reels with hashtag #AvatarStarTH. Win 10,000 Star Gems and the verified Creator Badge!",
      th: "โพสต์คลิปสั้นไฮไลต์การเล่นบน TikTok, YouTube Shorts หรือ Reels พร้อมติดแฮชแท็ก #AvatarStarTH ชิงเงินรางวัล 10,000 เพชรและตรานักสร้างสรรค์อย่างเป็นทางการ!",
    },
    fullDesc: {
      en: "Are you a sharpshooting sniper assassin or the king of funny grenade bounces? Share your best 15-60 second clips with the Avatar Star community. The top 10 most viral and creative clips will be spotlighted on the official website!",
      th: "ไม่ว่าคุณจะเป็นสไนเปอร์มือแม่นยำล่องหน หรือจอมปาระเบิดสายฮา มาร่วมแชร์คลิปความยาว 15-60 วินาทีให้คอมมูนิตี้ได้ชม คลิปที่โดนใจทีมงานและมียอดเอนเกจเมนต์สูงสุด 10 อันดับแรกจะได้รับการโปรโมตบนหน้าเว็บทางการ!",
    },
    rewards: [
      {
        name: { en: "10,000 Star Gems + Official Creator Halo", th: "10,000 Star Gems + ตราครีเอเตอร์ทางการ" },
        detail: { en: "Top 3 creators also receive exclusive developer game merch", th: "3 อันดับแรกรับของที่ระลึกสุดพรีเมียมจากทีมผู้พัฒนา" },
        rarity: "legendary",
        badgeText: { en: "Top 3", th: "อันดับ 1-3" },
      },
      {
        name: { en: "5,000 Star Gems + Special Title", th: "5,000 Star Gems + ฉายา Viral Star" },
        detail: { en: "Awarded to 4th - 10th place creators", th: "มอบให้ครีเอเตอร์อันดับ 4 - 10" },
        rarity: "epic",
        badgeText: { en: "Top 10", th: "อันดับ 4-10" },
      },
      {
        name: { en: "Official Website Spotlight", th: "ขึ้นโชว์หน้าเว็บไซต์ทางการ" },
        detail: { en: "Featured in our upcoming Community Reel hub", th: "นำคลิปไปเผยแพร่ในส่วนไฮไลต์คอมมูนิตี้ของเว็บไซต์" },
        rarity: "rare",
        badgeText: { en: "Feature", th: "โปรโมตช่อง" },
      },
    ],
    missions: [
      {
        step: 1,
        title: { en: "Record Your Gameplay", th: "อัดคลิปการเล่นของคุณ" },
        desc: { en: "Capture your best moments in 1080p, 60fps.", th: "บันทึกคลิปจังหวะการเล่นสุดประทับใจ ความยาว 15-60 วินาที" },
      },
      {
        step: 2,
        title: { en: "Upload with Hashtags", th: "โพสต์คลิปพร้อมติดแท็ก" },
        desc: { en: "Tag #AvatarStarTH #AvatarStar2026 and include your UID in the caption.", th: "โพสต์ลงโซเชียลพร้อมติดแฮชแท็ก #AvatarStarTH และระบุ UID ตัวละครในคำบรรยาย" },
      },
      {
        step: 3,
        title: { en: "Submit Form", th: "ส่งลิงก์คลิปเข้าประกวด" },
        desc: { en: "Paste your video link into the community submissions channel on Discord.", th: "ส่งลิงก์คลิปของคุณผ่านห้อง #creator-contest ใน Discord ทางการ" },
      },
    ],
    rules: [
      {
        en: "Videos must be original content created by the submitter.",
        th: "คลิปวิดีโอต้องเป็นผลงานที่ผู้เข้าประกวดสร้างสรรค์ขึ้นมาเอง",
      },
      {
        en: "No toxic language, harassment, or inappropriate conduct in the footage.",
        th: "ห้ามใช้ถ้อยคำหยาบคาย พฤติกรรมคุกคาม หรือเนื้อหาที่ไม่เหมาะสม",
      },
    ],
  },
  {
    id: "guild-sky-fortress-wars",
    slug: "guild-sky-fortress-wars",
    category: "tournament",
    status: "upcoming",
    tag: { en: "COMING SOON", th: "เร็วๆ นี้" },
    badgeTheme: "purple",
    dateRange: { en: "Starts Nov 1, 2026", th: "เปิดศึก 1 พ.ย. 2026" },
    countdownDate: "2026-11-01T00:00:00+07:00",
    image: "/images/event/bg.png",
    title: {
      en: "Guild Sky Fortress Wars (Pre-Season)",
      th: "สงครามกิลด์ชิงป้อมปราการลอยฟ้า (พรีซีซัน)",
    },
    subtitle: {
      en: "8v8 guild territorial dominance for city square banners and castle pride",
      th: "การปะทะระดับ 8v8 เพื่อยึดครองธงกลางเมืองและเกียรติยศแห่งกิลด์",
    },
    shortDesc: {
      en: "Form an 8-warrior guild force to capture strategic cannon control towers on the floating fortress! Pre-registrations for guild leaders open on October 25.",
      th: "จัดทัพกิลด์ 8 นักรบ เข้ายึดหอคอยปืนใหญ่ยุทธศาสตร์บนป้อมปราการลอยฟ้า! เปิดรับสมัครหัวหน้ากิลด์ล่วงหน้าวันที่ 25 ต.ค. นี้",
    },
    fullDesc: {
      en: "The skies tremble as rival guilds prepare to claim sovereignty over the central Sky Citadel. Guild commanders must coordinate capture points, aerial airstrikes, and barricade defenses. The winning guild will have their emblem hoisted high above the main town plaza!",
      th: "น่านฟ้าสะเทือนเมื่อเหล่ากิลด์ชั้นนำเตรียมเข้าแย่งชิงกรรมสิทธิ์เหนือปราการลอยฟ้าส่วนกลาง หัวหน้ากิลด์ต้องวางแผนประสานงานยึดจุดยุทธศาสตร์ เรียกกำลังเสริมทางอากาศ และตั้งแนวรับ กิลด์ที่คว้าชัยจะได้ปักธงสัญลักษณ์กิลด์กลางลานเมืองหลัก!",
    },
    rewards: [
      {
        name: { en: "Main Plaza Guild Crest Banner", th: "ธงสัญลักษณ์กิลด์กลางลานเมือง" },
        detail: { en: "Hoisted high in town for 1 full month of fame", th: "ประดับธงกิลด์กลางเมืองตลอดระยะเวลา 1 เดือนเต็ม" },
        rarity: "legendary",
        badgeText: { en: "Honor", th: "เกียรติยศกิลด์" },
      },
      {
        name: { en: "Guild Glory Vault (50,000 Points)", th: "คลังแต้มกิลด์ 50,000 แต้ม" },
        detail: { en: "Used to unlock guild passive stat boosts and slots", th: "สำหรับอัปเกรดบัฟสถานะกิลด์และเพิ่มจำนวนสมาชิก" },
        rarity: "epic",
        badgeText: { en: "Guild Points", th: "แต้มกิลด์" },
      },
      {
        name: { en: "Citadel Conqueror Guild Aura", th: "ออร่าแสงผู้พิชิตปราการลอยฟ้า" },
        detail: { en: "Exclusive glowing footprint FX for all guild members", th: "เอฟเฟกต์รอยเท้าเรืองแสงสีม่วงทองสำหรับสมาชิกกิลด์ทุกคน" },
        rarity: "legendary",
        badgeText: { en: "Aura FX", th: "เอฟเฟกต์กิลด์" },
      },
    ],
    missions: [
      {
        step: 1,
        title: { en: "Guild Registration", th: "ลงทะเบียนกิลด์" },
        desc: { en: "Guild masters of level 3+ guilds register the 8-player main roster + 2 substitutes.", th: "หัวหน้ากิลด์ (กิลด์เลเวล 3 ขึ้นไป) ส่งรายชื่อนักแข่งตัวจริง 8 คนและตัวสำรอง 2 คน" },
      },
      {
        step: 2,
        title: { en: "Fortress War Saturday", th: "ศึกชิงป้อมวันเสาร์" },
        desc: { en: "8v8 tactical conquest on the Sky Citadel map.", th: "การแข่งขันโหมดยึดฐานยุทธศาสตร์ 8v8 ในแผนที่ปราการลอยฟ้า" },
      },
    ],
    rules: [
      {
        en: "Guilds must have at least 15 active members to be eligible.",
        th: "กิลด์ต้องมีสมาชิกที่แอ็กทีฟอย่างน้อย 15 คนจึงจะมีสิทธิ์เข้าร่วม",
      },
      {
        en: "Roster locks 24 hours prior to tournament kickoff.",
        th: "รายชื่อนักแข่งจะถูกล็อก 24 ชั่วโมงก่อนเริ่มการแข่งขัน",
      },
    ],
  },
];
