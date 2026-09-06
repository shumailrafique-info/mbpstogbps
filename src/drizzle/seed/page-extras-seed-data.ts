/**
 * FAQ and related-tool content for the page_content seed.
 *
 * Both are stored as jsonb on the page row and are editable in the dashboard,
 * so this is a starting point rather than a fixed list. Related slugs must
 * match the navigation registry - the save action rejects anything else.
 */

export type PageExtras = {
  faqs: { question: string; answer: string }[];
  related: string[];
};

export const PAGE_EXTRAS: Record<string, PageExtras> = {
  home: {
    faqs: [
      {
        question: "How many Mbps are in a Gbps?",
        answer:
          "Exactly 1,000. Networking uses decimal SI prefixes, so 1 Gbps is 1,000 Mbps, 1,000,000 Kbps and 1,000,000,000 bits per second.",
      },
      {
        question: "Is 1 Gbps the same as 1,024 Mbps?",
        answer:
          "No. The 1,024 multiplier belongs to binary prefixes, which are used for memory and sometimes for storage. Transmission rates have always been decimal, so a gigabit per second is 1,000 megabits per second.",
      },
      {
        question: "How do I convert Mbps to MB/s?",
        answer:
          "Divide by eight, because there are eight bits in a byte. A 100 Mbps connection downloads at up to 12.5 MB/s, and a 1 Gbps connection at up to 125 MB/s.",
      },
      {
        question: "Why does my gigabit connection test at 940 Mbps?",
        answer:
          "That is normal and expected. Gigabit Ethernet carries 1,000,000,000 bits per second of raw signalling, but Ethernet, IP and TCP headers take a share of it. Around 940 Mbps of usable throughput is a healthy result on a wired connection.",
      },
      {
        question: "Do I need a gigabit plan?",
        answer:
          "Most households do not. A single 4K stream needs about 25 Mbps, so even 100 Mbps handles several at once. Gigabit helps most with very large downloads and homes with many heavy users. The internet speed calculator will give you a figure based on what you actually run at the same time.",
      },
      {
        question: "Is Mbps the same as MBps?",
        answer:
          "No, and the capital letter is the whole difference. Mbps is megabits per second, the unit providers advertise in. MBps or MB/s is megabytes per second, the unit downloads are measured in, and it is eight times larger.",
      },
      {
        question: "Are these conversions exact?",
        answer:
          "Yes. The conversions themselves are exact arithmetic. The download times and capacity estimates elsewhere on the site are modelled with a real-world overhead factor, which is shown and adjustable.",
      },
      {
        question: "Is this converter free?",
        answer:
          "Yes, entirely. There is no account, no limit and nothing to install, and every calculation runs in your browser rather than on a server.",
      },
    ],
    related: [],
  },

  "gbps-to-mbps": {
    faqs: [
      {
        question: "How many Mbps is 1 Gbps?",
        answer:
          "1 Gbps is 1,000 Mbps. Multiply the gigabit figure by 1,000 to get megabits per second.",
      },
      {
        question: "How many Mbps is 2.5 Gbps?",
        answer:
          "2,500 Mbps. Multi-gig plans are usually quoted as 2, 2.5, 5 or 10 Gbps, which are 2,000, 2,500, 5,000 and 10,000 Mbps.",
      },
      {
        question: "Why does my gigabit plan never reach 1,000 Mbps?",
        answer:
          "Protocol overhead accounts for most of the gap. Ethernet, IP and TCP headers consume roughly six percent of a gigabit link, which puts the practical ceiling near 940 Mbps. Wi-Fi, an older router or a 100 Mbps network port will take considerably more.",
      },
      {
        question: "What speed do I need to get gigabit over Wi-Fi?",
        answer:
          "A single device rarely sees the full gigabit wirelessly. Wi-Fi 5 typically delivers 300 to 500 Mbps in good conditions, and Wi-Fi 6 or 6E rather more. Test wired first to confirm the line itself is delivering.",
      },
      {
        question: "How many MB/s is 1 Gbps?",
        answer:
          "125 MB/s at the advertised rate, and around 110 MB/s in practice once overhead is taken out.",
      },
      {
        question: "Is 1 Gbps enough for a large household?",
        answer:
          "Comfortably. A gigabit connection could carry roughly forty simultaneous 4K streams, which is far beyond any normal household. The limit is usually Wi-Fi coverage rather than the plan.",
      },
    ],
    related: [
      "home",
      "gbps-to-mbs",
      "mbps-to-mbs",
      "internet-speed-calculator",
      "download-time-calculator",
    ],
  },

  "mbps-to-mbs": {
    faqs: [
      {
        question: "How do I convert Mbps to MB/s?",
        answer:
          "Divide by eight. A 100 Mbps connection is 12.5 MB/s and a 400 Mbps connection is 50 MB/s.",
      },
      {
        question: "Why is my download eight times slower than my plan?",
        answer:
          "It is not slower - it is being reported in different units. Your plan is quoted in megabits per second and your browser reports megabytes per second, and there are eight bits in a byte.",
      },
      {
        question: "How many MB/s is 100 Mbps?",
        answer:
          "12.5 MB/s in theory, and typically 10.5 to 11.5 MB/s in practice once protocol overhead is accounted for.",
      },
      {
        question: "What is the difference between Mbps and MBps?",
        answer:
          "The case of the b. Mbps is megabits per second; MBps, usually written MB/s, is megabytes per second and is eight times larger.",
      },
      {
        question: "Should a download hit exactly the calculated MB/s?",
        answer:
          "It should get close on a healthy wired connection - roughly 85 to 95 percent of the figure. A download well below that is usually limited by the server, the distance to it, or Wi-Fi rather than by your line.",
      },
      {
        question: "Do providers advertise in bits to make plans sound faster?",
        answer:
          "The convention predates broadband marketing, since transmission has always been measured in bits per second. That the number is eight times larger has certainly not encouraged anyone to change it.",
      },
    ],
    related: [
      "home",
      "mbs-to-mbps",
      "gbps-to-mbs",
      "download-time-calculator",
      "data-transfer-calculator",
    ],
  },

  "mbs-to-mbps": {
    faqs: [
      {
        question: "How do I convert MB/s to Mbps?",
        answer:
          "Multiply by eight. A download running at 12.5 MB/s is using 100 Mbps of your connection.",
      },
      {
        question: "How many Mbps is 10 MB/s?",
        answer:
          "80 Mbps. Similarly, 25 MB/s is 200 Mbps and 125 MB/s is 1,000 Mbps.",
      },
      {
        question: "Can I use this to check my plan speed?",
        answer:
          "Yes. Start a large download from a fast source, let the rate settle for at least thirty seconds, then multiply the megabytes per second by eight and compare with your plan. Landing within about fifteen percent is normal.",
      },
      {
        question: "Why did my result come out higher than my plan speed?",
        answer:
          "Many providers provision slightly above the advertised rate so the plan speed is met rather than approached, and some plans burst faster for the first seconds of a transfer. A measurement averaged over a longer window is more reliable.",
      },
      {
        question: "Does this work for upload speeds too?",
        answer:
          "Yes. The conversion is the same in either direction - only the number you start from changes.",
      },
      {
        question: "Is MB/s the same as MBps?",
        answer:
          "Yes, they are two ways of writing megabytes per second. MB/s is clearer because it is harder to confuse with Mbps.",
      },
    ],
    related: [
      "mbps-to-mbs",
      "home",
      "gbps-to-mbs",
      "upload-time-calculator",
      "download-time-calculator",
    ],
  },

  "gbps-to-mbs": {
    faqs: [
      {
        question: "How many MB/s is 1 Gbps?",
        answer:
          "125 MB/s. Multiply gigabits by 1,000 to get megabits, then divide by eight to get megabytes.",
      },
      {
        question: "What does a gigabit connection download at in practice?",
        answer:
          "Around 105 to 115 MB/s on a wired connection. The gap between that and 125 MB/s is protocol overhead, which is normal rather than a fault.",
      },
      {
        question: "Why is my gigabit download slower than 100 MB/s?",
        answer:
          "At these speeds the connection is often not the bottleneck. A mechanical hard drive writes at 100 to 160 MB/s, Wi-Fi rarely carries a full gigabit, and many servers cap each connection well below it.",
      },
      {
        question: "How long does a 100 GB game take on a gigabit line?",
        answer:
          "About thirteen minutes at the full rate, and closer to fifteen once overhead is taken into account - assuming the server can send that fast.",
      },
      {
        question: "How much data does a gigabit line move in an hour?",
        answer: "About 450 GB at the advertised rate, running continuously.",
      },
      {
        question: "Is 10 Gbps worth it at home?",
        answer:
          "For almost nobody. A 10 Gbps line delivers 1,250 MB/s, which most home hardware cannot write to disk, let alone use. It belongs in server rooms rather than living rooms.",
      },
    ],
    related: [
      "gbps-to-mbps",
      "mbps-to-mbs",
      "home",
      "download-time-calculator",
      "data-transfer-calculator",
    ],
  },

  "kbps-to-mbps": {
    faqs: [
      {
        question: "How do I convert Kbps to Mbps?",
        answer:
          "Divide by 1,000. A 6,000 Kbps stream is 6 Mbps, and a 320 Kbps audio track is 0.32 Mbps.",
      },
      {
        question: "Is a kilobit 1,000 or 1,024 bits?",
        answer:
          "1,000. Transmission rates use decimal prefixes, so a kilobit per second is a thousand bits per second.",
      },
      {
        question: "What bitrate do I need for a 1080p live stream?",
        answer:
          "About 6,000 Kbps, or 6 Mbps of upload. For 720p60 the usual recommendation is 3,500 Kbps.",
      },
      {
        question: "How fast was a 56 Kbps modem in modern terms?",
        answer:
          "About 7 KB per second at its best, which is roughly one modest photograph a minute. It is a useful reminder of scale when a 100 Mbps line feels slow.",
      },
      {
        question: "Why are audio and video bitrates quoted in Kbps?",
        answer:
          "Because the numbers are convenient. A 320 Kbps track reads better than 0.32 Mbps, and codec settings have used kilobits since long before broadband.",
      },
      {
        question: "How many Kbps is 1 Mbps?",
        answer: "1,000 Kbps. And 1 Gbps is 1,000,000 Kbps.",
      },
    ],
    related: [
      "home",
      "mbps-to-mbs",
      "streaming-bandwidth-calculator",
      "upload-time-calculator",
      "bandwidth-calculator",
    ],
  },

  "download-time-calculator": {
    faqs: [
      {
        question: "How is download time calculated?",
        answer:
          "File size divided by speed, once both are in the same units. Converting the file to bits and dividing by the connection's bits per second gives the time in seconds.",
      },
      {
        question: "Why does my download take longer than the estimate?",
        answer:
          "The theoretical figure ignores overhead. Protocol headers, encryption and acknowledgements take a share, Wi-Fi takes more, and a server that limits per-connection speed can dominate everything else. The overhead setting on this page models that.",
      },
      {
        question: "How long does a 100 GB game take to download?",
        answer:
          "On a 100 Mbps connection at realistic efficiency, about two and a half hours. On a gigabit line, roughly fifteen minutes.",
      },
      {
        question: "What efficiency should I assume?",
        answer:
          "About 85 percent for a healthy wired connection. Drop to 60 percent for peak-hour Wi-Fi with several devices competing, and use 100 percent only when checking the arithmetic.",
      },
      {
        question: "Does the calculator use decimal or binary gigabytes?",
        answer:
          "Both are available. Decimal GB is the default because it matches how ISPs and most download pages count. Binary units are labelled GiB, MiB and KiB so the two are never mixed up.",
      },
      {
        question: "Will a faster plan always download faster?",
        answer:
          "Only up to the point where something else becomes the limit. Beyond a few hundred megabits, the server, the distance to it or your own disk usually decides the speed rather than your plan.",
      },
    ],
    related: [
      "upload-time-calculator",
      "mbps-to-mbs",
      "data-transfer-calculator",
      "home",
      "internet-speed-calculator",
    ],
  },

  "upload-time-calculator": {
    faqs: [
      {
        question: "Why are uploads so much slower than downloads?",
        answer:
          "Most cable and DSL plans are asymmetric: they allocate far more capacity to the download direction because that is what most people use. A 500/50 plan gives you a tenth of the download speed for uploads.",
      },
      {
        question: "Which speed should I enter here?",
        answer:
          "Your upload speed, from a speed test, not the headline number on your plan. Entering the download figure will make every estimate optimistic.",
      },
      {
        question: "How long does a first cloud backup take?",
        answer:
          "Longer than most people expect. A 500 GB backup over a 20 Mbps upstream is roughly 65 hours of continuous transfer, which is why backup software usually throttles itself during the day.",
      },
      {
        question: "Why do my video calls stutter while I upload?",
        answer:
          "Because the upstream is saturated. Calls need a steady 3 to 4 Mbps in each direction, and a large upload will take everything available unless it is throttled or scheduled overnight.",
      },
      {
        question: "Is fibre always symmetric?",
        answer:
          "Fibre to the home usually is, which is its main practical advantage over cable. Fibre to the cabinet, delivered over copper for the last stretch, generally is not.",
      },
      {
        question: "Can I speed up a large upload?",
        answer:
          "Use a wired connection, upload overnight, and compress or reduce the files where you can. Beyond that the upstream is a hard ceiling, and only a different plan raises it.",
      },
    ],
    related: [
      "download-time-calculator",
      "mbs-to-mbps",
      "data-transfer-calculator",
      "bandwidth-calculator",
      "internet-speed-calculator",
    ],
  },

  "bandwidth-calculator": {
    faqs: [
      {
        question: "How much bandwidth does one person need?",
        answer:
          "Around 10 Mbps for light use, 25 Mbps for a mix of HD streaming and video calls, and 50 Mbps for heavy use with 4K and large downloads. Those are per simultaneous user, not per person in the building.",
      },
      {
        question: "What is concurrency and why does it matter?",
        answer:
          "Concurrency is the share of your users pulling data at the same instant. Bandwidth is shared, so ten people who each use the connection occasionally need far less than ten people all streaming at once.",
      },
      {
        question: "How much headroom should I add?",
        answer:
          "Twenty to forty percent for most situations. Sizing a line to exactly the calculated average is how it ends up feeling slow on the busiest evenings.",
      },
      {
        question: "How much bandwidth does an office of 20 people need?",
        answer:
          "At moderate use and sixty percent concurrency, roughly 300 Mbps down with headroom. The upstream matters more: twenty people on video calls need around 80 Mbps up, which many asymmetric plans cannot provide.",
      },
      {
        question: "Does adding bandwidth fix a slow connection?",
        answer:
          "Only if bandwidth is the constraint. Latency, Wi-Fi coverage and an aging router all cause the same complaint, and none of them are improved by a larger plan.",
      },
      {
        question: "Should I plan for guest devices?",
        answer:
          "Yes, if guests are regular. A phone on a guest network still streams and still syncs, so count devices rather than people where the two differ.",
      },
    ],
    related: [
      "internet-speed-calculator",
      "streaming-bandwidth-calculator",
      "data-transfer-calculator",
      "home",
      "gbps-to-mbps",
    ],
  },

  "data-transfer-calculator": {
    faqs: [
      {
        question: "How much data does a 100 Mbps connection use in an hour?",
        answer:
          "About 45 GB if it runs flat out for the full hour. Very little actually does, which is why the overhead and duration settings matter here.",
      },
      {
        question: "How much data does 4K streaming use?",
        answer:
          "Roughly 7 GB per hour. HD is about 3 GB per hour and SD about 1 GB.",
      },
      {
        question: "How long does a 1 TB data cap last?",
        answer:
          "It depends entirely on video. Two hours of 4K a night is around 420 GB a month before anything else, so a terabyte disappears faster than it sounds in a household that watches in 4K.",
      },
      {
        question: "Do providers count in decimal or binary gigabytes?",
        answer:
          "Decimal - a gigabyte is a billion bytes. This calculator uses the same convention so the figures line up with your bill.",
      },
      {
        question: "What is the quickest way to cut data usage?",
        answer:
          "Lower the streaming resolution. Dropping from 4K to HD more than halves the data for the same viewing time, and on most screens the difference is far less noticeable than the saving.",
      },
      {
        question: "Does an idle connection use data?",
        answer:
          "A little. Background updates, cloud sync, smart home devices and security cameras all trickle continuously, which typically adds up to a few gigabytes a day rather than a few hundred.",
      },
    ],
    related: [
      "download-time-calculator",
      "streaming-bandwidth-calculator",
      "bandwidth-calculator",
      "mbps-to-mbs",
      "upload-time-calculator",
    ],
  },

  "streaming-bandwidth-calculator": {
    faqs: [
      {
        question: "How much speed do I need for Netflix in 4K?",
        answer:
          "Netflix recommends 15 Mbps per 4K stream. Other services quote up to 25 Mbps, so planning at 25 Mbps per 4K stream is the safer approach.",
      },
      {
        question: "Do simultaneous streams add up?",
        answer:
          "Yes. Streaming is one of the few kinds of traffic that genuinely does. Three 4K streams need three times the bandwidth of one, with no sharing benefit.",
      },
      {
        question: "How much speed do I need for four people streaming?",
        answer:
          "Four HD streams need about 20 Mbps and four 4K streams about 100 Mbps. Add headroom for everything else in the house and 50 Mbps or 150 Mbps respectively is a sensible target.",
      },
      {
        question: "Why does my stream drop to a lower quality?",
        answer:
          "Streaming services adapt rather than stop. If the picture softens during busy periods, the connection is running short of capacity at that moment - either the plan itself or the Wi-Fi carrying it.",
      },
      {
        question: "Does video calling count as streaming?",
        answer:
          "For planning purposes, yes, and it is worse than watching because it needs the same bandwidth in both directions. An HD call is about 3.8 Mbps up as well as down.",
      },
      {
        question: "Is buffering always a bandwidth problem?",
        answer:
          "No. If the calculated total sits well below your plan speed, look at Wi-Fi coverage, the number of devices on the 2.4 GHz band, and the age of the router before blaming the connection.",
      },
    ],
    related: [
      "internet-speed-calculator",
      "bandwidth-calculator",
      "data-transfer-calculator",
      "kbps-to-mbps",
      "home",
    ],
  },

  "internet-speed-calculator": {
    faqs: [
      {
        question: "What internet speed do I actually need?",
        answer:
          "It depends entirely on what runs at the same time. A single person streaming HD is fine on 25 Mbps; a family with 4K, gaming and video calls at once is comfortable around 200 to 300 Mbps. The calculator builds the figure from your own list rather than a generic recommendation.",
      },
      {
        question: "Is 100 Mbps enough for a family?",
        answer:
          "For most families, yes. It covers a 4K stream, a couple of HD streams, video calls and browsing at the same time. It gets tight only when large downloads run alongside all of that.",
      },
      {
        question: "Do I need gigabit for gaming?",
        answer:
          "No. Online gaming uses under 10 Mbps, and what determines how a game feels is latency rather than bandwidth. A 50 Mbps line with 10 ms of latency plays better than a gigabit line with 60 ms.",
      },
      {
        question: "Why does more speed stop making a difference?",
        answer:
          "Once the connection comfortably covers everything running at once, the extra capacity sits unused. What you notice past that point is latency, Wi-Fi coverage and the router.",
      },
      {
        question: "How much upload speed do I need?",
        answer:
          "Around 10 Mbps covers a household with video calls. More is needed for cloud backups, security cameras uploading continuously, or anyone sending large files regularly.",
      },
      {
        question: "Should I upgrade my plan or my router?",
        answer:
          "Test wired at the router, then wireless in the rooms that matter. A large gap between the two is a Wi-Fi problem, and a faster plan will not fix it.",
      },
    ],
    related: [
      "bandwidth-calculator",
      "streaming-bandwidth-calculator",
      "download-time-calculator",
      "home",
      "gbps-to-mbps",
    ],
  },

  "about-us": { faqs: [], related: [] },
  "contact-us": { faqs: [], related: [] },
  "privacy-policy": { faqs: [], related: [] },
  "terms-and-conditions": { faqs: [], related: [] },
};
