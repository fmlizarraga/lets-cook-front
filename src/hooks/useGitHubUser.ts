import { useEffect, useState } from "react";
import axios from "axios";

type GitHubPlan = {
    collaborators: number;
    name: string;
    space: number;
    private_repos: number;
};
  
type GitHubUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string | null;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    notification_email?: string | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
    private_gists?: number;
    total_private_repos?: number;
    owned_private_repos?: number;
    disk_usage?: number;
    collaborators?: number;
    two_factor_authentication?: boolean;
    plan?: GitHubPlan;
    suspended_at?: string | null;
    business_plus?: boolean;
    ldap_dn?: string;
};
  
type GitHubPrivateUser = GitHubUser & {
    bio: string | null;
    blog: string | null;
    company: string | null;
    email: string | null;
    followers: number;
    following: number;
    hireable: boolean | null;
    location: string | null;
    name: string | null;
    public_gists: number;
    public_repos: number;
    created_at: string;
    updated_at: string;
    collaborators: number;
    disk_usage: number;
    owned_private_repos: number;
    private_gists: number;
    total_private_repos: number;
    two_factor_authentication: boolean;
    plan?: GitHubPlan;
};
  
type GitHubResponse = GitHubUser | GitHubPrivateUser;
  
const fetchGitHubUser = async (username: string): Promise<GitHubResponse | null> => {
    try {
        const response = await axios.get<GitHubResponse>(`https://api.github.com/users/${username}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const useGitHubUser = (username: string) => {
    const [user, setUser] = useState<GitHubResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const getGitHubUser = async () => {
        setLoading(true);
        const user = await fetchGitHubUser(username);
        setUser(user);
        setLoading(false);
      };
  
      getGitHubUser();
    }, [username]);
  
    return { user, loading };
  };