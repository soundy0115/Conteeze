export interface Songlist {
    id: string;
    title: string;
  }

export interface Song {
  songId: string;
  title: string;
  artist: string;
  album: string;
  album_img: string;
  lyrics: string;
  like: number;
}
