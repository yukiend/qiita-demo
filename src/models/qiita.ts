export type Tag = {
  name: string;
  versions: string[];
};

export type User = {
  description: string | null;
  facebook_id: string | null;
  followees_count: number;
  followers_count: number;
  github_login_name: string | null;
  id: string;
  items_count: number;
  linkedin_id: string | null;
  location: string | null;
  name: string;
  organization: string | null;
  permanent_id: number;
  profile_image_url: string;
  team_only: boolean;
  twitter_screen_name: string;
  website_url: string | null;
};

export type QiitaPost = {
  rendered_body: string;
  body: string;
  coediting: boolean;
  comments_count: number;
  created_at: string;
  group: QiitaGroup;
  id: string;
  likes_count: number;
  private: boolean;
  reactions_count: number;
  stocks_count: number;
  tags: Tag[];
  title: string;
  updated_at: string;
  url: string;
  user: User;
  page_views_count: number | null;
  team_membership: QiitaTeamMemberShip;
  organization_url_name: string | null;
};

export type QiitaGroup = {
  created_at: string;
  id: number;
  description: string;
  name: string;
  private: boolean;
  updated_at: string;
  url_name: string;
};

export type QiitaTeamMemberShip = {
  name: string;
  id: string;
  description: string;
  email: string;
  last_accessed_at: string;
};
