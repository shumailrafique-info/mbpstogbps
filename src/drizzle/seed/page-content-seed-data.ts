/**
 * Content for the page_content seed: the home page and every tool.
 *
 * This is real, on-topic copy rather than filler, so the dashboard, the editor
 * round trip and the public rendering can all be exercised with something
 * representative. Every figure quoted here is a published average, not a
 * guarantee - review before treating any of it as final.
 */

export type PageSeedSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
  quote?: string;
};

export type PageSeed = {
  slug: string;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  sections: PageSeedSection[];
};

export const PAGE_SEEDS_TOOLS: PageSeed[] = [
  {
    slug: "home",
    title: "Mbps to Gbps Converter",
    description:
      "Turn a speed in megabits per second into gigabits per second, and see straight away what that number means for streaming, downloads and a house full of devices.",
    metaTitle: "Mbps to Gbps Converter - Convert Megabits to Gigabits Free",
    metaDescription:
      "Convert Mbps to Gbps instantly. Enter any megabit-per-second speed for the gigabit equivalent, plus MB/s, download times and conversion tables.",
    lead: "One gigabit per second is exactly 1,000 megabits per second, so converting Mbps to Gbps means dividing by 1,000 and nothing more. The reason the conversion trips people up is not the arithmetic - it is that internet plans, download managers and file sizes are quoted in three different units, and only one of them is the one on your bill.",
    sections: [
      {
        heading: "How to convert Mbps to Gbps",
        paragraphs: [
          "Type the speed you have into the box above and the gigabit figure appears as you type. The second box works the same way in reverse, so you can start from either end.",
          "If you would rather do it in your head, move the decimal point three places to the left. 940 Mbps becomes 0.94 Gbps, 100 Mbps becomes 0.1 Gbps, and 2,500 Mbps becomes 2.5 Gbps.",
        ],
        list: [
          "Mbps to Gbps: divide by 1,000",
          "Gbps to Mbps: multiply by 1,000",
          "1 Gbps = 1,000 Mbps = 1,000,000 Kbps",
          "1 Gbps = 125 MB/s, because there are eight bits in a byte",
        ],
      },
      {
        heading: "The formula",
        paragraphs: [
          "Gbps = Mbps / 1,000. The prefixes here are decimal SI prefixes, so kilo means 1,000, mega means 1,000,000 and giga means 1,000,000,000. Networking has always used them this way, which is one of the few places in computing where the powers of ten are the correct reading rather than a marketing simplification.",
          "That matters when you cross from speed into storage. A gigabyte on a hard drive is often counted in powers of 1,024, but a gigabit per second on a network link is always 1,000,000,000 bits per second. The converter above keeps the two systems separate and labels binary units as KiB, MiB and GiB so the distinction is never hidden.",
        ],
      },
      {
        heading: "Why plans are sold in bits and files are measured in bytes",
        paragraphs: [
          "A lowercase b is a bit; an uppercase B is a byte; there are eight bits in a byte. Internet providers advertise in bits per second because the number is eight times larger, and the convention has stuck since the days of dial-up. Operating systems and download managers count in bytes because that is how files are stored.",
          "That single factor of eight explains almost every confused speed question. A 1,000 Mbps line does not download at 1,000 MB/s - it tops out around 125 MB/s, and in practice a little less once protocol overhead is taken out. Our [Mbps to MB/s converter](/mbps-to-mbs) does that step on its own.",
        ],
      },
      {
        heading: "What each speed actually gets you",
        paragraphs: [
          "Bandwidth stops being the limiting factor sooner than most upgrade pages suggest. A single 4K stream needs around 25 Mbps and an HD stream around 5 Mbps, so even a 100 Mbps line handles several at once.",
        ],
        list: [
          "25 Mbps - one 4K stream, or a few HD streams and normal browsing",
          "100 Mbps - a typical family evening with streaming, calls and gaming",
          "300 Mbps - large game downloads without waiting all evening",
          "1 Gbps - multiple 4K streams, fast downloads and plenty of headroom",
          "2 Gbps and up - useful for many heavy users or large uploads, rarely for one household",
        ],
        quote:
          "Past the point where a connection comfortably covers everything running at once, extra megabits sit unused. What you notice after that is latency, Wi-Fi coverage and the router.",
      },
      {
        heading: "Common conversions at a glance",
        paragraphs: [
          "These are the figures people look up most often. The table above updates live, but these stay true whatever you type.",
        ],
        list: [
          "100 Mbps = 0.1 Gbps = 12.5 MB/s",
          "300 Mbps = 0.3 Gbps = 37.5 MB/s",
          "500 Mbps = 0.5 Gbps = 62.5 MB/s",
          "940 Mbps = 0.94 Gbps = 117.5 MB/s, the usual real-world ceiling of a gigabit line",
          "1,000 Mbps = 1 Gbps = 125 MB/s",
          "2,000 Mbps = 2 Gbps = 250 MB/s",
        ],
      },
    ],
  },
  {
    slug: "gbps-to-mbps",
    title: "Gbps to Mbps Converter",
    description:
      "Convert gigabits per second into megabits per second, the unit your router, speed test and streaming app all report in.",
    metaTitle: "Gbps to Mbps Converter - Convert Gigabits to Megabits",
    metaDescription:
      "Convert Gbps to Mbps instantly. 1 Gbps equals 1,000 Mbps. Enter any gigabit speed for the megabit equivalent, with tables and real-world comparisons.",
    lead: "A gigabit plan is sold as one number and measured as another. Providers advertise in gigabits per second, while speed tests, routers and streaming services all talk in megabits per second - so the first thing most people need after signing up for gigabit is this conversion.",
    sections: [
      {
        heading: "How to convert Gbps to Mbps",
        paragraphs: [
          "Multiply by 1,000. One gigabit per second is 1,000 megabits per second, two is 2,000, and half a gigabit is 500 Mbps.",
          "Enter the figure above and the megabit equivalent appears immediately, along with the megabytes-per-second rate a download manager would show.",
        ],
        list: [
          "0.5 Gbps = 500 Mbps",
          "1 Gbps = 1,000 Mbps",
          "1.5 Gbps = 1,500 Mbps",
          "2 Gbps = 2,000 Mbps",
          "10 Gbps = 10,000 Mbps",
        ],
      },
      {
        heading: "Why a gigabit plan tests at around 940 Mbps",
        paragraphs: [
          "Almost nobody sees a clean 1,000 Mbps on a gigabit connection, and nothing is wrong when they do not. Gigabit Ethernet carries 1,000,000,000 bits per second of raw signalling, but every packet also carries Ethernet, IP and TCP headers, plus inter-frame gaps. Once those are subtracted, the payload rate lands around 940 Mbps.",
          "Wi-Fi takes a further cut. Even on Wi-Fi 6, shared airtime, interference and retransmits mean a wireless device rarely matches what the same connection delivers over a cable. If you are testing a gigabit line, test it wired first.",
        ],
      },
      {
        heading: "What a gigabit actually buys",
        paragraphs: [
          "In megabytes, a gigabit connection moves about 125 MB every second at the advertised rate, or roughly 110 MB/s in practice. That is a 5 GB game update in under a minute and a 100 GB console game in about fifteen.",
          "Where it stops mattering is streaming. A gigabit line could carry roughly forty simultaneous 4K streams, which is far more than any household will ever run. Use the [streaming bandwidth calculator](/streaming-bandwidth-calculator) to check what you actually need before paying for headroom you will not use.",
        ],
      },
      {
        heading: "Getting the full speed to your devices",
        paragraphs: [
          "A gigabit plan is only as fast as the weakest link between the street and the device.",
        ],
        list: [
          "The router must have gigabit or multi-gig WAN and LAN ports - a 100 Mbps port caps everything behind it",
          "Cat5e cabling is fine for gigabit; older Cat5 may not be",
          "Wi-Fi 5 realistically delivers 300-500 Mbps, Wi-Fi 6 rather more",
          "An old laptop with a 100 Mbps network adapter will test at 94 Mbps no matter what you pay",
          "Test with a wired device before concluding the line is at fault",
        ],
      },
    ],
  },
  {
    slug: "mbps-to-mbs",
    title: "Mbps to MB/s Converter",
    description:
      "Convert megabits per second into megabytes per second - the download speed your browser, Steam client and file manager actually display.",
    metaTitle: "Mbps to MB/s Converter - Megabits to Megabytes per Second",
    metaDescription:
      "Convert Mbps to MB/s by dividing by 8. Enter your plan speed to see the real download rate your browser and download manager will show.",
    lead: "This is the conversion behind the most common complaint about internet speed: the plan says 100 Mbps but the download sits at 12 MB/s, and it looks like eight-tenths of the speed has gone missing. Nothing is missing. The two numbers are measuring the same thing in different units, and there are eight bits in a byte.",
    sections: [
      {
        heading: "How to convert Mbps to MB/s",
        paragraphs: [
          "Divide by eight. A 100 Mbps connection is 12.5 MB/s, a 500 Mbps connection is 62.5 MB/s, and a 1,000 Mbps connection is 125 MB/s.",
          "Enter your speed above to see the exact figure, along with what it means for a real download.",
        ],
        list: [
          "25 Mbps = 3.125 MB/s",
          "50 Mbps = 6.25 MB/s",
          "100 Mbps = 12.5 MB/s",
          "300 Mbps = 37.5 MB/s",
          "500 Mbps = 62.5 MB/s",
          "1,000 Mbps = 125 MB/s",
        ],
      },
      {
        heading: "Bits, bytes and the capital letter that changes everything",
        paragraphs: [
          "A bit is a single binary digit and is written with a lowercase b. A byte is eight bits and is written with an uppercase B. Mbps means megabits per second; MB/s means megabytes per second. The only difference in the notation is the case of one letter, which is why the two get mixed up constantly.",
          "Network engineers count in bits because that is how data crosses a wire. Software counts in bytes because that is how files are stored. Neither side is going to change, so the divide-by-eight step is permanent.",
        ],
      },
      {
        heading: "Why your download is a little slower than the maths says",
        paragraphs: [
          "Dividing by eight gives the theoretical ceiling. Real transfers lose a few percent to TCP and IP headers, TLS encryption, and the acknowledgements that flow back the other way. A healthy wired connection usually lands around 85 to 95 percent of the calculated figure.",
          "A download that is much slower than that is usually limited by something other than your line: a throttled server, a distant CDN edge, a single-threaded transfer, or Wi-Fi. The [download time calculator](/download-time-calculator) lets you model that overhead explicitly rather than pretending it does not exist.",
        ],
      },
      {
        heading: "Reading a speed test properly",
        paragraphs: [
          "Speed tests report in Mbps, matching the plan you bought, while browsers report in MB/s, matching the file being saved. When you compare the two, convert first.",
        ],
        quote:
          "A 100 Mbps plan downloading at 11 MB/s is performing normally. The same plan downloading at 1 MB/s is not, and the problem is almost never the conversion.",
      },
    ],
  },
  {
    slug: "mbs-to-mbps",
    title: "MB/s to Mbps Converter",
    description:
      "Convert a measured transfer rate in megabytes per second back into the megabits per second your provider advertises.",
    metaTitle: "MB/s to Mbps Converter - Megabytes to Megabits per Second",
    metaDescription:
      "Convert MB/s to Mbps by multiplying by 8. Turn the download speed shown in your browser back into the line speed your ISP quotes.",
    lead: "This is the conversion in the direction that actually settles arguments. You have a real measurement - the megabytes per second your download manager reported - and you want to know what line speed that corresponds to, so you can compare it against what you are paying for.",
    sections: [
      {
        heading: "How to convert MB/s to Mbps",
        paragraphs: [
          "Multiply by eight. A download running at 12.5 MB/s is using 100 Mbps; one running at 60 MB/s is using 480 Mbps.",
          "Enter the rate above and the megabit figure appears immediately.",
        ],
        list: [
          "1 MB/s = 8 Mbps",
          "5 MB/s = 40 Mbps",
          "12.5 MB/s = 100 Mbps",
          "25 MB/s = 200 Mbps",
          "62.5 MB/s = 500 Mbps",
          "125 MB/s = 1,000 Mbps, or 1 Gbps",
        ],
      },
      {
        heading: "Using it to check what you are paying for",
        paragraphs: [
          "Start a large download from a fast source, wait for the rate to settle, and note the megabytes per second. Multiply by eight and compare against your plan. Landing within about fifteen percent is normal; landing at half is worth investigating.",
          "Do this on a wired connection where you can. Wi-Fi introduces its own ceiling, and a result taken over a weak wireless signal tells you about the wireless link rather than about the line.",
        ],
      },
      {
        heading: "When the answer comes out higher than your plan",
        paragraphs: [
          "It happens, and it usually has an explanation. Many providers provision a few percent above the advertised rate so the plan speed is met rather than approached. Some cable and fibre plans include a short burst allowance that runs faster for the first few seconds of a transfer.",
          "The other possibility is that the file was partly cached closer to you than you assumed. A measurement taken over at least thirty seconds of steady transfer is far more reliable than a peak figure caught in the first moment.",
        ],
      },
    ],
  },
  {
    slug: "gbps-to-mbs",
    title: "Gbps to MB/s Converter",
    description:
      "Convert gigabits per second into megabytes per second and find the real ceiling of a gigabit connection.",
    metaTitle: "Gbps to MB/s Converter - Gigabits to Megabytes per Second",
    metaDescription:
      "Convert Gbps to MB/s instantly. 1 Gbps equals 125 MB/s. See what a gigabit connection really delivers to a download.",
    lead: "One gigabit per second is 125 megabytes per second. That single figure is the useful thing to remember about a gigabit connection, because it is the number that predicts how long anything will actually take.",
    sections: [
      {
        heading: "How to convert Gbps to MB/s",
        paragraphs: [
          "Multiply by 1,000 to get megabits, then divide by eight to get megabytes - or multiply by 125 and skip a step.",
          "The converter above does both directions, so you can also work backwards from a measured transfer rate.",
        ],
        list: [
          "0.5 Gbps = 62.5 MB/s",
          "1 Gbps = 125 MB/s",
          "2 Gbps = 250 MB/s",
          "2.5 Gbps = 312.5 MB/s",
          "10 Gbps = 1,250 MB/s",
        ],
      },
      {
        heading: "What 125 MB/s means in practice",
        paragraphs: [
          "At the full advertised rate, a gigabit line moves 7.5 GB a minute and 450 GB an hour. A 100 GB console game arrives in roughly thirteen minutes and a 25 GB 4K film in about three.",
          "Real transfers run a little below that. Take protocol overhead into account and 105 to 115 MB/s is a good working figure for a wired gigabit connection.",
        ],
      },
      {
        heading: "The bottleneck is rarely the line",
        paragraphs: [
          "At gigabit speeds the connection stops being the slowest part of the chain. A mechanical hard drive writes at 100 to 160 MB/s, which is roughly the same rate the connection delivers, so the disk becomes the limit. A SATA SSD manages around 500 MB/s and an NVMe drive far more.",
          "Servers matter too. A download is only as fast as the host is willing to send, and plenty of sources cap each connection well below 125 MB/s regardless of what you have at home.",
        ],
        quote:
          "If a gigabit line consistently delivers around 940 Mbps wired, it is working correctly. The missing sixty is protocol overhead, not a fault.",
      },
    ],
  },
  {
    slug: "kbps-to-mbps",
    title: "Kbps to Mbps Converter",
    description:
      "Convert kilobits per second into megabits per second - for audio bitrates, video encoder settings and older connection speeds.",
    metaTitle: "Kbps to Mbps Converter - Kilobits to Megabits per Second",
    metaDescription:
      "Convert Kbps to Mbps by dividing by 1,000. Useful for streaming bitrates, encoder settings, VoIP and legacy connection speeds.",
    lead: "Kilobits per second is the unit of bitrates rather than broadband. Audio codecs, video encoders, VoIP calls and IP cameras are all configured in Kbps, and turning those figures into megabits is how you find out whether a connection can carry them.",
    sections: [
      {
        heading: "How to convert Kbps to Mbps",
        paragraphs: [
          "Divide by 1,000. A 320 Kbps audio stream is 0.32 Mbps; a 6,000 Kbps video encode is 6 Mbps.",
          "The converter above handles both directions, and will show the equivalent in kilobytes and megabytes per second as well.",
        ],
        list: [
          "128 Kbps = 0.128 Mbps",
          "320 Kbps = 0.32 Mbps",
          "1,000 Kbps = 1 Mbps",
          "6,000 Kbps = 6 Mbps",
          "25,000 Kbps = 25 Mbps",
        ],
      },
      {
        heading: "Bitrates worth knowing",
        paragraphs: [
          "Most encoder and streaming settings are quoted in Kbps, so these are the numbers you will meet in practice.",
        ],
        list: [
          "Spotify at very high quality - 320 Kbps",
          "A VoIP call - 64 to 100 Kbps in each direction",
          "720p60 live stream - about 3,500 Kbps",
          "1080p60 live stream - about 6,000 Kbps",
          "4K streaming - 15,000 to 25,000 Kbps",
          "A 1080p security camera - 2,000 to 4,000 Kbps of upload, continuously",
        ],
      },
      {
        heading: "Kilobits, kibibits and dial-up",
        paragraphs: [
          "In networking a kilobit is 1,000 bits, not 1,024. That has always been true of transmission rates, even when file sizes on the same machine were being counted in powers of two.",
          "It is also why old modem speeds read oddly today. A 56 Kbps modem moved about 7 KB per second at its very best, which is roughly one modest photograph a minute - a useful reminder of scale when a 100 Mbps line feels slow.",
        ],
      },
    ],
  },
  {
    slug: "download-time-calculator",
    title: "Download Time Calculator",
    description:
      "Work out how long a file will take to download on your connection, with a realistic allowance for the overhead that never makes it into the advertised speed.",
    metaTitle: "Download Time Calculator - How Long Will My Download Take?",
    metaDescription:
      "Calculate download time from file size and internet speed. Includes real-world overhead, common file presets and a comparison across connection speeds.",
    lead: "Download time is file size divided by speed, once both are in the same units. The arithmetic is easy; getting a number you can trust means being honest about the difference between the speed on your bill and the speed that reaches the file.",
    sections: [
      {
        heading: "How the calculation works",
        paragraphs: [
          "The file size is converted to bits, the connection speed is already in bits per second, and dividing one by the other gives seconds. A 5 GB file is 40,000,000,000 bits; a 100 Mbps line carries 100,000,000 bits per second; the result is 400 seconds, or six minutes and forty seconds.",
          "That is the theoretical figure. The overhead setting above scales it to something closer to reality - around 85 percent of the advertised rate on a healthy wired connection, and rather less on busy Wi-Fi.",
        ],
      },
      {
        heading: "Where the missing speed goes",
        paragraphs: [
          "Nothing about a download is pure payload. Every packet carries Ethernet, IP and TCP headers. Encrypted connections add a TLS layer. Acknowledgements travel back the other way and consume upstream capacity. Wi-Fi adds contention and retransmits on top of all of it.",
        ],
        list: [
          "Protocol overhead - typically 5 to 10 percent",
          "Wi-Fi rather than a cable - often 20 to 50 percent on a congested band",
          "A server that limits per-connection speed - can be the whole story",
          "Distance to the origin, when there is no CDN edge nearby",
          "Other devices in the house pulling data at the same time",
        ],
      },
      {
        heading: "Typical download times on a 100 Mbps line",
        paragraphs: [
          "These assume the connection is otherwise idle and running at about 85 percent efficiency.",
        ],
        list: [
          "5 MB song - under a second",
          "150 MB app install - about 14 seconds",
          "1.5 GB TV episode - about two and a half minutes",
          "4 GB HD film - about six and a half minutes",
          "25 GB 4K film - about forty minutes",
          "100 GB console game - about two and a half hours",
        ],
      },
      {
        heading: "When the estimate is badly wrong",
        paragraphs: [
          "If a real download takes several times longer than the figure above, the connection speed is not the constraint. Check whether another device is saturating the line, whether the transfer is running over Wi-Fi at the far end of the house, and whether the source itself is slow. Running the same file from a different host is the quickest way to tell the two apart.",
        ],
      },
    ],
  },
  {
    slug: "upload-time-calculator",
    title: "Upload Time Calculator",
    description:
      "Estimate how long a backup, video or large file will take to upload, using the upstream speed rather than the download figure on your bill.",
    metaTitle: "Upload Time Calculator - How Long Will My Upload Take?",
    metaDescription:
      "Calculate upload time from file size and upload speed. Plan cloud backups, video uploads and large transfers with a realistic overhead allowance.",
    lead: "Uploads are where asymmetric connections show themselves. Most cable and DSL plans give you a fraction of the download speed in the other direction, so a file that downloads in five minutes can take an hour to send back.",
    sections: [
      {
        heading: "Use your upload speed, not your plan speed",
        paragraphs: [
          "The headline number on a broadband plan is the download figure. Upload is quoted separately and is often much smaller: a 500/50 cable plan gives you 50 Mbps upstream, a tenth of what comes down.",
          "Run a speed test and use the upload result. If you enter the download figure by mistake, every estimate here will be optimistic by roughly the ratio between the two.",
        ],
        list: [
          "Cable - typically 10 to 50 Mbps up against 300 to 1,000 down",
          "DSL - often 1 to 10 Mbps up",
          "Fibre to the home - frequently symmetric, so up matches down",
          "Fixed wireless and 5G home internet - highly variable, and worth measuring at different times of day",
        ],
      },
      {
        heading: "What slow uploads actually affect",
        paragraphs: [
          "Upstream capacity matters more than most people expect, because so much of it runs in the background.",
        ],
        list: [
          "Cloud backup and photo sync, which can run for days on a first upload",
          "Video calls, which need a steady 3 to 4 Mbps up for HD",
          "Sending large files to clients or collaborators",
          "Uploading video to YouTube or a client portal",
          "Security cameras streaming continuously to the cloud",
        ],
      },
      {
        heading: "A first cloud backup takes longer than you think",
        paragraphs: [
          "A 500 GB laptop backup over a 20 Mbps upstream link is around 65 hours of continuous transfer, and that is before anything else in the house wants bandwidth. Most backup software throttles itself during the day for exactly that reason.",
          "Plan the first run across several nights, and expect subsequent incremental backups to be a tiny fraction of it.",
        ],
        quote:
          "If video calls stutter while a backup runs, the upstream is saturated. Throttling the backup fixes it more reliably than upgrading the plan.",
      },
    ],
  },
  {
    slug: "bandwidth-calculator",
    title: "Bandwidth Calculator",
    description:
      "Size a connection for a household, office or venue based on how many people use it, how heavily, and how many are online at the same moment.",
    metaTitle: "Bandwidth Calculator - How Much Internet Speed Do You Need?",
    metaDescription:
      "Calculate the bandwidth a group needs. Enter people, usage level and peak concurrency for a recommended download and upload speed.",
    lead: "Bandwidth planning goes wrong in one of two ways: sizing a line to the headcount, which buys far too much, or sizing it to the average, which leaves nothing for the evenings when everyone is home. The useful figure sits between the two, and it depends on concurrency.",
    sections: [
      {
        heading: "How the calculation works",
        paragraphs: [
          "Bandwidth is shared, so what matters is not how many people could use the connection but how many are pulling data at the same instant. The calculator multiplies your headcount by a concurrency factor, multiplies that by a per-person requirement, and adds headroom for bursts.",
          "Forty to sixty percent concurrency is a reasonable planning assumption for a home or a small office. A classroom or a conference room where everyone starts the same video at once is closer to one hundred percent, and should be planned that way.",
        ],
      },
      {
        heading: "What each usage level covers",
        paragraphs: [
          "The three profiles are deliberately broad. If your group splits cleanly into different kinds of user, run the calculation once per group and add the results.",
        ],
        list: [
          "Light, about 10 Mbps each - browsing, email, messaging, music and occasional HD video",
          "Moderate, about 25 Mbps each - HD streaming, video calls, cloud sync and social apps",
          "Heavy, about 50 Mbps each - 4K streaming, large downloads, gaming and constant uploads",
        ],
      },
      {
        heading: "Do not forget the upstream",
        paragraphs: [
          "Download capacity gets all the attention, but the upstream is what fails first in an office. Every video call needs 3 to 4 Mbps in each direction, cloud backup runs continuously, and file sharing pushes data outward all day.",
          "On an asymmetric plan, ten simultaneous video calls will exhaust a 50 Mbps upstream long before the download side notices. If your work involves calls or backups, treat the upload figure as the constraint.",
        ],
      },
      {
        heading: "Bandwidth is only part of the experience",
        paragraphs: [
          "A connection can have plenty of capacity and still feel slow. Latency determines how responsive a call or a game feels, and it has nothing to do with megabits. Wi-Fi coverage decides whether the far bedroom sees any of the speed at all. An old router can be the ceiling for the entire building.",
        ],
        quote:
          "Before upgrading a plan, confirm the current one is actually being delivered. A wired speed test at the router settles it in thirty seconds.",
      },
    ],
  },
  {
    slug: "data-transfer-calculator",
    title: "Data Transfer Calculator",
    description:
      "Work out how much data moves across a connection over any period, and how long a monthly allowance will last at that rate.",
    metaTitle: "Data Transfer Calculator - How Much Data Will You Use?",
    metaDescription:
      "Calculate data transferred from speed and time. See usage per hour, day and month, and how quickly a data cap runs out.",
    lead: "Speed multiplied by time gives volume, and volume is the number that meets a data cap. This is the calculation for anyone on a metered plan, anyone planning a large sync, and anyone who has ever wondered how a month of streaming turned into a terabyte.",
    sections: [
      {
        heading: "How the calculation works",
        paragraphs: [
          "Multiply the sustained speed in bits per second by the number of seconds, then divide by eight to get bytes. A 100 Mbps connection running flat out for an hour moves 45 GB.",
          "Very little runs flat out for an hour, which is why the overhead setting matters here. The realistic figure allows for the protocol overhead that a raw multiplication ignores.",
        ],
      },
      {
        heading: "What uses the most data",
        paragraphs: [
          "Video dominates household usage by a wide margin. Everything else is rounding error next to a few hours of 4K a night.",
        ],
        list: [
          "4K streaming - about 7 GB per hour",
          "HD streaming - about 3 GB per hour",
          "SD streaming - about 1 GB per hour",
          "Video calls - about 1.5 GB per hour in HD",
          "Music streaming - about 150 MB per hour",
          "Cloud gaming - 7 to 12 GB per hour",
          "Browsing and social media - a few hundred megabytes per hour",
        ],
      },
      {
        heading: "Living with a data cap",
        paragraphs: [
          "A one terabyte monthly allowance sounds enormous until it meets a 4K habit. Two hours of 4K a night is around 420 GB a month before anything else happens; add a games console and a couple of large downloads and the cap is in sight.",
          "If you are close to a limit, the fastest saving is resolution rather than time. Dropping from 4K to HD more than halves the data for the same number of hours watched.",
        ],
        quote:
          "Providers count data in decimal gigabytes - a billion bytes - which is the same convention this calculator uses, so the figures line up with your bill.",
      },
    ],
  },
  {
    slug: "streaming-bandwidth-calculator",
    title: "Streaming Bandwidth Calculator",
    description:
      "Add up every screen streaming at once, by service and quality, and find the connection speed the household actually needs.",
    metaTitle: "Streaming Bandwidth Calculator - Netflix, YouTube, 4K and More",
    metaDescription:
      "Calculate streaming bandwidth for Netflix, YouTube, Disney+, Twitch and video calls. Count every simultaneous stream for a recommended speed.",
    lead: "Streaming is one of the few kinds of internet traffic that genuinely adds up. Two 4K films at once really do need twice the bandwidth of one, which makes counting screens the most reliable way to size a connection for a household.",
    sections: [
      {
        heading: "Bandwidth by service and quality",
        paragraphs: [
          "These are the providers' own published recommendations. Actual bitrates vary with the content - a still, dark scene needs far less than fast motion - but planning against the recommendation is the safe approach.",
        ],
        list: [
          "Netflix - 1 Mbps for SD, 5 Mbps for HD, 15 Mbps for 4K",
          "YouTube - 1.1 Mbps at 480p, 5 Mbps at 1080p, 20 Mbps at 4K, 50 Mbps at 8K",
          "Disney+ - 5 Mbps for HD, 25 Mbps for 4K",
          "Prime Video - 5 Mbps for HD, 15 Mbps for 4K",
          "Twitch - 3.5 Mbps at 720p60, 6 Mbps at 1080p60",
          "Zoom - about 3.8 Mbps for a 1080p call, in both directions",
          "Cloud gaming - 15 Mbps at 1080p60, 35 Mbps at 4K60",
        ],
      },
      {
        heading: "Why headroom matters more than the total",
        paragraphs: [
          "A connection sized to exactly the sum of its streams will buffer. Background traffic, software updates, a phone syncing photos and the natural variation in video bitrate all need somewhere to go.",
          "Twenty five to fifty percent above the calculated total is a sensible target, and it costs nothing to plan for.",
        ],
      },
      {
        heading: "What buffering is really telling you",
        paragraphs: [
          "Modern streaming services adapt rather than stop: when bandwidth tightens, they drop resolution. A picture that softens during a busy evening is the service protecting playback, and it is a capacity signal worth listening to.",
          "If that happens while the total above sits well below your plan speed, the constraint is not the line. Look at Wi-Fi coverage, the number of devices on the 2.4 GHz band, and whether the router is old enough to be the bottleneck itself.",
        ],
      },
    ],
  },
  {
    slug: "internet-speed-calculator",
    title: "Internet Speed Requirement Calculator",
    description:
      "Build a recommended plan from what your household actually does at the same time, then check it against the connection you already pay for.",
    metaTitle: "Internet Speed Calculator - What Speed Plan Do You Need?",
    metaDescription:
      "Find the internet speed you need. Count streaming, calls, gaming and smart home devices running at once for a recommended download and upload speed.",
    lead: "Choosing a plan by headline number is how people end up paying for a gigabit that sits mostly idle. The better approach is to describe a busy evening honestly - everything running at the same time - and size the connection to that.",
    sections: [
      {
        heading: "How to use it",
        paragraphs: [
          "Count what runs simultaneously on your worst-case night, not on an average one. If the television is on 4K while someone games, someone else is on a video call and the security cameras are uploading, that is the evening to plan for.",
          "Add headroom on top. Forty percent is a reasonable default: it covers background updates, guests and the fact that the estimates for each activity are averages rather than ceilings.",
        ],
      },
      {
        heading: "What each activity needs",
        paragraphs: [
          "Download and upload requirements differ sharply by activity, which is why both are shown.",
        ],
        list: [
          "Browsing and social - 3 to 5 Mbps",
          "HD video stream - 5 Mbps",
          "4K video stream - 25 Mbps",
          "HD video call - 4 Mbps in each direction",
          "Online gaming - 10 Mbps, but latency matters far more than speed",
          "Cloud gaming - 25 Mbps, sustained and uninterrupted",
          "4K security camera - 8 Mbps of upload, continuously",
          "Overnight cloud backup - as much upload as you will give it",
        ],
      },
      {
        heading: "Where more speed stops helping",
        paragraphs: [
          "Once a connection comfortably covers everything running at once, additional megabits change nothing you can feel. Most households reach that point somewhere between 200 and 500 Mbps.",
          "What you notice beyond it is latency, Wi-Fi coverage and the router. A well-configured 200 Mbps connection with a modern access point in the right place regularly feels faster than a gigabit line pushed through a decade-old router in a cupboard.",
        ],
        quote:
          "Gaming is the clearest example: a 1 Gbps line with 60 ms of latency plays worse than a 50 Mbps line with 10 ms. Bandwidth and responsiveness are different problems.",
      },
      {
        heading: "Before you upgrade",
        paragraphs: [
          "Confirm you are getting the plan you already pay for. Test wired at the router, then wireless in the rooms that matter, and compare. A large gap between the two is a Wi-Fi problem, and a faster plan will not fix it.",
        ],
      },
    ],
  },
];
