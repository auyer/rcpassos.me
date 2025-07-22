// URL of your website
export const website = 'https://rcpassos.me';

export const firstName = 'Rafael';
export const lastName = '"Auyer" Passos';
export const name = `${firstName} ${lastName}`;

// Used for the landing page & footer of posts
export const avatar_avif = '/assets/profile.avif';
export const avatar_png = '/assets/profile.png';

export const bio = `\
I'm Rafael Passos.
This blog is a place where I share fun experiences.
A personal incentive to keep learning.
100% human, no artificial anything.`;

export const bio_splitted = bio.split(/\n/).map((line) => line.replace(/\.$/, ""));

// Your social usernames, empty strings won't be used.
// For sake of the live demo, I'm using `username/repo` for github,
// but you can replace with just your username.
export const github = 'auyer';
export const linkedin = 'passosRafael';
export const medium = '@rcpassos';
export const bluesky = "auyer.rcpassos.me";
export const stackoverflow = '5621569/auyer?tab=profile';
