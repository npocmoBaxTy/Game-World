export interface IGame {
  id: number;
  added: number;
  added_by_status: {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
  };
  background_image: string;
  clip: string;
  dominant_color: string;
  esrb_rating: {
    id: number;
    name: string;
    slug: string;
  };
  publishers: {
    games_count: number;
    id: number;
    image_background: string;
    name: string;
    slug: string;
  }[];
  description: string;
  description_raw: string;
  website: string;
  genres: {
    games_count: number;
    id: number;
    image_background: string;
    name: string;
    slug: string;
  }[];
  metacritic: number;
  name: string;
  parent_platforms: {
    id: number;
    name: string;
    slug: string;
  }[];
  platforms: {
    platform: {
      games_count: number;
      id: number;
      name: string;
      slug: string;
      image_background: string;
    };
    released_at: string;
    requirements_en: {
      minimum: string;
      recommended: string;
    };
  }[];
  playtime: number;
  rating: number;
  rating_top: number;
  ratings: {
    id: number;
    count: number;
    percent: number;
    title: string;
  }[];
  ratings_count: number;
  released: string;
  saturated_color: string;
  short_screenshots: {
    id: number;
    image: string;
  }[];
  slug: string;
  stores: {
    id: number;
    store: {
      domain: string;
      games_count: string;
      id: number;
      image_background: string;
      name: string;
      slug: string;
    };
  }[];
  suggestions_count: number;
  tags: {
    games_count: number;
    id: number;
    name: string;
    slug: string;
    image_background: string;
    language: string;
  }[];
  tba: boolean;
  updated: string;
}
