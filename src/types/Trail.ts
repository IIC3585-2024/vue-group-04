export interface Trail {
    title: string;
    activity: string;
    description: string;
    pictures: string[];
    author: {
      name: string;
      avatar: string;
    };
    stats: {
      distance: string;
      elevation: string;
      rank: string;
    };
    id: number;
    latitude: number;
    longitude: number;
}