// All invitation content lives here — edit this file to personalise the template.

export const C = {
  bg: "#FBF8F1",
  ink: "#36404D",
  green: "#3D5A80",
  greenDark: "#23395B",
  greenMid: "#5477A0",
  greenDeep: "#2E4A70",
  sage: "#8FAACB",
  gold: "#C7A24B",
  goldLight: "#D8BE84",
  muted: "#77808C",
  card: "#FFFDF8",
  cream: "#F6EFDD",
};

export const F = {
  body: 'var(--font-sn-body), "Cormorant Garamond", Georgia, serif',
  script: 'var(--font-mea), "Mea Culpa", cursive',
  sans: 'var(--font-montserrat), "Montserrat", sans-serif',
  deco: 'var(--font-cinzel-decorative), "Cinzel Decorative", serif',
  serif: 'var(--font-serif), "Playfair Display", serif',
  marcellus: 'var(--font-marcellus), "Marcellus", serif',
};

export const invitation = {
  bride: "Dinithi",
  groom: "Chamath",
  initials: ["D", "C"] as const,
  // ISO date-time with Sri Lanka offset — drives the countdown & calendar links
  weddingStart: "2027-08-21T10:15:00+05:30",
  weddingEnd: "2027-08-21T23:00:00+05:30",
  dateLong: "Saturday, August 21, 2027",
  dateShort: "21 . 08 . 27",
  rsvpBy: "Kindly respond by the 20th of July 2027",
  maxGuests: 3,

  // Photos (set to null to show the "Your photo" placeholder)
  heroPhoto: "/photos/hero.webp" as string | null,
  storyPhoto: "/photos/story.webp" as string | null,

  // Full-screen intro video played before the curtain opens
  introVideo: "/photos/i_want_to_add_a_pink_touch_to.mp4",


  events: [
    { icon: "rings", title: "PORUWA CEREMONY", time: "10:15 AM", place: "Cinnamon Grand, Colombo", detail: "Traditional Poruwa ceremony in the Lotus Garden" },
    { icon: "utensils", title: "RECEPTION", time: "7:00 PM", place: "Cinnamon Grand, Colombo", detail: "Dinner, music and dancing in the Oak Room" },
  ],

  dressCode: {
    title: "Formal / Pastel",
    text: "Sarees, osariyas and suits in powder blue, navy, ivory, silver or soft gold would be lovely.",
    palette: ["#2E4A70", "#8FAACB", "#F8F3EA", "#C9CED6", "#D8BE84"],
  },

  venue: {
    name: "Cinnamon Grand Colombo",
    address: "77 Galle Road, Colombo 00300, Sri Lanka",
  },

};
